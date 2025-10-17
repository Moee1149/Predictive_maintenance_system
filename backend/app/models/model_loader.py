import numpy as np
import pprint
import pickle
import pandas as pd
from tensorflow.keras.models import load_model
from app.config.config import Config


class LoadModel:
    @staticmethod
    def load_dataset(dataset_path):
        """
        Load and prepare the bearing dataset

        Args:
            dataset_path: Path to the pickle file containing the dataset

        Returns:
            dict with: dataset (DataFrame), scaler, target_type, feature_names
        """

        print(f"📁 Loading dataset from: {dataset_path}")

        with open(dataset_path, "rb") as f:
            data = pickle.load(f)

        # Combine train, val, test data
        X_all = np.vstack([data["X_train"], data["X_val"], data["X_test"]])
        y_target_all = np.concatenate([data["y_train"], data["y_val"], data["y_test"]])
        y_health_all = np.concatenate(
            [data["y_health_train"], data["y_health_val"], data["y_health_test"]]
        )

        # Get feature names
        feature_names = data.get(
            "feature_names", [f"feature_{i}" for i in range(X_all.shape[1])]
        )

        # Create DataFrame
        dataset = pd.DataFrame(X_all, columns=feature_names)
        dataset["target"] = y_target_all
        dataset["health_status"] = y_health_all

        # Sort by target (higher = healthier/earlier in time)
        dataset = dataset.sort_values("target", ascending=False).reset_index(drop=True)

        print(f"✅ Dataset loaded: {len(dataset)} rows, {len(feature_names)} features")
        print(f"   Target type: {data['target_type']}")

        return {
            "dataset": dataset,
            "scaler": data["scaler"],
            "target_type": data["target_type"],
            "feature_names": feature_names,
        }

    @staticmethod
    def load_model_components(model_path, components_path):
        """
        Load the trained model and its components

        Args:
            model_path: Path to the trained model (.keras file)
            components_path: Path to the model components (.pkl file)

        Returns:
            dict with: model, model_architecture, health_thresholds
        """
        print(f"🤖 Loading model from: {model_path}")
        model = load_model(model_path)

        with open(components_path, "rb") as f:
            components = pickle.load(f)

        model_architecture = components.get("model_architecture", "dense")
        health_thresholds = components.get("health_thresholds", {})

        print(f"✅ Model loaded: {model_architecture} architecture")

        return {
            "model": model,
            "model_architecture": model_architecture,
            "health_thresholds": health_thresholds,
        }

    @staticmethod
    def prepare_model_input(features, feature_names, model_architecture):
        """
        Prepare input data for the model prediction

        Args:
            features: DataFrame with feature values
            feature_names: List of feature column names
            model_architecture: 'dense' or 'lstm'

        Returns:
            numpy array ready for model.predict()
        """
        # Extract only feature columns (exclude target and health_status)
        X = features[feature_names].values

        # Reshape for LSTM if needed
        if model_architecture == "lstm":
            X = X.reshape((X.shape[0], 1, X.shape[1]))
            print(f"   Input shape (LSTM): {X.shape}")
        else:
            print(f"   Input shape (Dense): {X.shape}")

        return X

    @staticmethod
    def make_prediction(model, model_input):
        """
        Make a prediction using the trained model

        Args:
            model: Trained Keras model
            model_input: Prepared input array

        Returns:
            float: Raw prediction value
        """
        prediction = model.predict(model_input, verbose=0)[0][0]
        print(f"   Raw prediction: {prediction:.2f}")

        return prediction

    @staticmethod
    def get_single_row(dataset, row_index=5):
        """
        Get a single row from the dataset

        Args:
            dataset: DataFrame containing the data
            row_index: Index of the row to retrieve (default: 0 for first row)

        Returns:
            dict with: features (DataFrame), actual_target, actual_health_status
        """
        row_data = dataset.iloc[[row_index]]

        actual_target = row_data["target"].values[0]
        actual_health = row_data["health_status"].values[0]

        print(f"\n📊 Retrieved row {row_index}")
        print(f"   Actual target: {actual_target:.2f}")
        print(f"   Actual health status: {actual_health}")

        return {
            "features": row_data,
            "actual_target": actual_target,
            "actual_health_status": actual_health,
        }

    @staticmethod
    def convert_to_health_metrics(prediction, target_type, actual_target=None):
        """
        Convert raw prediction to health metrics and status

        Args:
            prediction: Raw model prediction
            target_type: 'rul' or 'health_percentage'
            actual_target: Actual target value (optional)

        Returns:
            dict with health metrics
        """
        # Convert to RUL
        if target_type == "health_percentage":
            predicted_rul = (prediction / 100) * 128
            actual_rul = (
                (actual_target / 100) * 128 if actual_target is not None else None
            )
        else:
            predicted_rul = prediction
            actual_rul = actual_target

        # Determine health status based on RUL
        if predicted_rul > 80:
            status = "HEALTHY"
            icon = "🟢"
        elif predicted_rul > 40:
            status = "DEGRADING"
            icon = "🟡"
        elif predicted_rul > 15:
            status = "NEAR_FAILURE"
            icon = "🟠"
        else:
            status = "CRITICAL"
            icon = "🔴"

        # Calculate health percentage and severity
        max_rul = 128
        health_percentage = prediction
        severity = 100 - health_percentage

        return {
            "predicted_rul": predicted_rul,
            "actual_rul": actual_rul,
            "health_status": status,
            "status_icon": icon,
            "health_percentage": health_percentage,
            "severity": severity,
            "raw_prediction": prediction,
        }

    @staticmethod
    def run_single_prediction(dataset_path, model_path, components_path, row_index=0):
        """
        Complete pipeline to run a single prediction

        Args:
            dataset_path: Path to dataset pickle file
            model_path: Path to model file
            components_path: Path to components pickle file
            row_index: Which row to predict (default: 0 for first row)
        """
        print("🚀 Starting Single Prediction Pipeline\n")

        # Step 1: Load dataset
        data_dict = LoadModel.load_dataset(dataset_path)
        dataset = data_dict["dataset"]
        scaler = data_dict["scaler"]
        target_type = data_dict["target_type"]
        feature_names = data_dict["feature_names"]

        # Step 2: Load model
        model_dict = LoadModel.load_model_components(model_path, components_path)
        model = model_dict["model"]
        model_architecture = model_dict["model_architecture"]

        # Step 3: Get single row
        row_dict = LoadModel.get_single_row(dataset, row_index)
        features = row_dict["features"]
        actual_target = row_dict["actual_target"]
        actual_health_status = row_dict["actual_health_status"]

        # Step 4: Prepare input
        print("\n🔧 Preparing model input...")
        model_input = LoadModel.prepare_model_input(
            features, feature_names, model_architecture
        )

        # Step 5: Make prediction
        print("\n🤖 Making prediction...")
        prediction = LoadModel.make_prediction(model, model_input)

        # Step 6: Convert to health metrics
        print("\n📊 Converting to health metrics...")
        metrics = LoadModel.convert_to_health_metrics(
            prediction, target_type, actual_target
        )

        # Step 7: Display results
        # LoadModel.display_results(metrics, actual_health_status)

        return metrics


# pprint.pprint(LoadModel.load_dataset(Config.DATASET_PATH))
# pprint.pprint(LoadModel.load_model_components(Config.MODEL_PATH, Config.COMPONENTS_PATH))
pprint.pprint(
    LoadModel.run_single_prediction(
        Config.DATASET_PATH, Config.MODEL_PATH, Config.COMPONENTS_PATH
    )
)
