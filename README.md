# Predictive Maintenance Dashboard

A compact end-to-end project that demonstrates building a predictive-maintenance pipeline: model evaluation, deployment, and a realtime dashboard to visualize sensor telemetry and model predictions.

I built the data pipeline, trained and integrated a Keras model, implemented evaluation tooling, created a small Flask + Socket.IO backend to stream predictions, and built a React + TypeScript frontend to visualize the results.

What the project does
- Loads a trained Keras model and preprocessing components.
- Streams periodic predictions over WebSockets (Flask + `flask-socketio`).
- Visualizes sensor data, health percentage, RUL and simple metrics in a React + TypeScript frontend (Vite + `socket.io-client`).
- Provides an evaluation script that computes regression metrics, a confusion matrix, and permutation-based feature importance.

Quick structure (important paths)
- `backend/app/app.py` — Flask + Socket.IO server (simulation control & streaming)
- `backend/app/models/model_loader.py` — model + dataset loader and prediction generator
- `backend/app/config/config.py` — paths and basic runtime settings
- `backend/app/test.py` — `ModelEvaluator` for metrics, confusion matrix, and feature importance
- `backend/*.keras`, `backend/*.pkl` — trained model and dataset/components artifacts
- `frontend/` — Vite + React + TypeScript dashboard

How to run (dev)
- Backend:
  - cd `backend`
  - python3 -m venv venv && . venv/bin/activate
  - pip install -r requirements.txt
  - python -m app.app
- Frontend:
  - cd `frontend`
  - `pnpm install` (or `npm install`)
  - `pnpm dev` (or `npm run dev`)

Notes
- Update file paths in `backend/app/config/config.py` if you move model/data files.
- Socket events:
  - `start_simulation` — start streaming (payload can include `step_size`, `delay`, `step_config`)
  - `stop_simulation` — stop streaming
  - `prediction_update` — server -> client message with prediction, sensor data, and metadata

Skills demonstrated
- ML: model training integration, evaluation (MSE, RMSE, MAE, R², MAPE), confusion matrix, permutation feature importance.
- Engineering: production-minded inference pipeline, streaming architecture (WebSockets), configuration management.
- Frontend: TypeScript + React visualizations, realtime data handling.
- Collaboration-ready: clear structure and small reproducible dev steps.
