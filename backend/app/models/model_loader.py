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


# pprint.pprint(LoadModel.load_dataset(Config.DATASET_PATH))
# pprint.pprint(LoadModel.load_model_components(Config.MODEL_PATH, Config.COMPONENTS_PATH))
pprint.pprint(LoadModel.prepare_model_input())
