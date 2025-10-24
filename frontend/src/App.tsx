import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectOverview } from "@/components/project-overview";
import { RealTimeMonitoring } from "@/components/real-time-monitoring";
import { TrendsVisualization } from "@/components/trend-visualization";
import { MaintenanceInsights } from "@/components/maintenance-insights";
import { Activity, TrendingUp } from "lucide-react";

const SOCKET_URL = "http://127.0.0.1:5000";

export type VibrationChartType = {
  vibration_x: number;
  vibration_y: number;
  timestamp: string;
  index: number;
};

export type CurrentReadings = {
  bearingTemperature: number;
  atmosphericTemperature: number;
  vibrationX: number;
  vibrationY: number;
  rms: number;
};

export type HealthStatus = {
  healthPercentage?: number;
  predictedRul?: number;
  healthStatus?: "HEALTHY" | "DEGRADING" | "NEAR_FAILURE" | "CRITICAL";
  severity?: number;
};

export type PredcitionHistory = {
  timestamp: string;
  vibrationRMS: number;
  bearingTemp: number;
  healthPercent: number;
  healthState: "HEALTHY" | "DEGRADING" | "NEAR_FAILURE" | "CRITICAL";
  rul: number;
};

export type DegradationCurveDataType = {
  hour: string;
  predictedHealth: number;
  predictedRUL: number;
};

export type TrendAnaylsisDataType = {
  hour: string;
  predictedHealth: number;
  predictedRUL: number;
  temp_bearing: number;
  atmosphericTemperature: number;
  vibrationX_rms: number;
  vibrationY_rms: number;
  peakDetection: number;
  combined_rms: number;
};

export default function App() {
  const socketRef = useRef<Socket | null>(null);
  const [healthStatus, setHealthStatus] = useState<HealthStatus>({
    healthPercentage: 0,
    predictedRul: 0,
    healthStatus: "HEALTHY",
    severity: 0,
  });

  const [vibrationChartData, setVibrationChartData] = useState<
    VibrationChartType[]
  >([
    {
      vibration_x: 0,
      vibration_y: 0,
      timestamp: "",
      index: 0,
    },
  ]);

  const [currentReadings, setCurrentReadings] = useState<CurrentReadings>({
    vibrationX: 0,
    vibrationY: 0,
    bearingTemperature: 0,
    atmosphericTemperature: 0,
    rms: 0,
  });

  const [predictionHistory, setPredictionHistory] = useState<
    PredcitionHistory[]
  >([]);

  const [trends, setTrends] = useState<TrendAnaylsisDataType[]>([]);

  useEffect(() => {
    function connectSocket() {
      socketRef.current = io(SOCKET_URL);
      socketRef.current.on("connect", () => {
        console.log("Connected to server");
      });
      socketRef.current.on("message", (data) => console.log(data));
      socketRef.current.on("data", (data) => console.log(data));
    }

    connectSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.off("message");
        socketRef.current.off("data");
      }
    };
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    socket.emit("start_simulation", {
      step_size: 20,
      delay: 1.0,
      step_config: [
        [1000, 100],
        [1200, 20],
        [1500, 15],
        [1700, 10],
        [1800, 5],
      ],
    });
    socket.on("prediction_update", (data) => {
      console.log(data);

      const healthStatus: HealthStatus = {
        healthPercentage: data?.prediction.health_percentage,
        predictedRul: data?.prediction?.predicted_rul,
        healthStatus: data?.prediction?.health_status,
        severity: data?.prediction?.severity,
      };

      setHealthStatus(healthStatus);

      const filterVibrationChartData: VibrationChartType = {
        vibration_x: data?.sensor_data?.vibration_x_rms,
        vibration_y: data?.sensor_data?.vibration_y_rms,
        index: data?.row_index,
        timestamp: data?.timestamp,
      };
      setVibrationChartData((prev) => [...prev, filterVibrationChartData]);

      //current readings
      const currentReadings: CurrentReadings = {
        bearingTemperature: data?.sensor_data.temperature_bearing_mean,
        atmosphericTemperature: data?.sensor_data?.temperature_atmospheric_mean,
        vibrationX: data?.sensor_data?.vibration_x_rms,
        vibrationY: data?.sensor_data?.vibration_y_rms,
        rms: data?.sensor_data?.combined_vib_rms,
      };
      setCurrentReadings(currentReadings);

      const timestamp = data?.timestamp;
      const date = new Date(timestamp);

      // Manual formatting
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 0-indexed
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      const formatted = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      const predictionHistory: PredcitionHistory = {
        timestamp: formatted,
        vibrationRMS: data?.sensor_data?.combined_vib_rms?.toFixed(2),
        bearingTemp: data?.sensor_data.temperature_bearing_mean?.toFixed(2),
        healthPercent: data?.prediction.health_percentage?.toFixed(2),
        rul: data?.prediction?.predicted_rul?.toFixed(2),
        healthState: data?.prediction?.health_status,
      };
      setPredictionHistory((prev) => [...prev, predictionHistory]);

      const trendsData: TrendAnaylsisDataType = {
        hour: formatted,
        predictedHealth: data?.prediction?.health_percentage,
        predictedRUL: data?.metrics?.predicted_rul,
        temp_bearing: data?.sensor_data.temperature_bearing_mean?.toFixed(2),
        atmosphericTemperature:
          data?.sensor_data.temperature_atmospheric_mean?.toFixed(2),
        vibrationX_rms: data?.sensor_data?.vibration_x_rms?.toFixed(2),
        vibrationY_rms: data?.sensor_data?.vibration_x_rms?.toFixed(2),
        combined_rms: Math.abs(data?.sensor_data?.combined_vib_rms),
        peakDetection: data?.sensor_data?.vibration_y_peak,
      };

      setTrends((prev) => [...prev, trendsData]);
    });

    return () => {
      socket.off("prediction_update");
    };
  }, []);

  return (
    <div className="min-h-screen dashboard-gradient">
      <div className="mx-auto max-w-7xl p-8 space-y-10">
        <ProjectOverview />
        <Tabs defaultValue="monitoring" className="space-y-8">
          <TabsList className="glass-tabs grid w-full grid-cols-2 p-2 h-auto gap-2">
            <TabsTrigger
              value="monitoring"
              className="tab-trigger flex items-center justify-center"
            >
              <Activity className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="hidden sm:inline font-medium">Real-Time</span>
              <span className="sm:hidden font-medium">Live</span>
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className="tab-trigger flex items-center justify-center"
            >
              <TrendingUp className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="hidden sm:inline font-medium">Trends</span>
              <span className="sm:hidden font-medium">Trends</span>
            </TabsTrigger>
          </TabsList>

          <div className="tab-content-container">
            <TabsContent
              value="monitoring"
              className="space-y-6 animate-in fade-in-50 duration-200"
            >
              <RealTimeMonitoring
                vibrationData={vibrationChartData}
                currentReadings={currentReadings}
                healthStatus={healthStatus}
              />
              <MaintenanceInsights predictionHistory={predictionHistory} />
            </TabsContent>

            <TabsContent
              value="trends"
              className="space-y-6 animate-in fade-in-50 duration-200"
            >
              <TrendsVisualization trends={trends} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
