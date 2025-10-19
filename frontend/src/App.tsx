import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectOverview } from "@/components/project-overview";
import { ModelPerformance } from "@/components/model-perfomance";
import { RealTimeMonitoring } from "@/components/real-time-monitoring";
import { TrendsVisualization } from "@/components/trend-visualization";
import { MaintenanceInsights } from "@/components/maintenance-insights";
import { AdvancedAnalytics } from "@/components/advanced-analytics";
import { Activity, BarChart3, TrendingUp, Wrench, Brain } from "lucide-react";

const SOCKET_URL = "http://127.0.0.1:5000";

export type VibrationChartType = {
  vibration_x: number;
  vibration_y: number;
  timestmap: string;
  index: number;
};

export default function App() {
  const socketRef = useRef<Socket | null>(null);
  const [vibrationChartData, setVibrationChartData] = useState<
    Array<VibrationChartType>
  >([
    {
      vibration_x: 0,
      vibration_y: 0,
      timestmap: "",
      index: 0,
    },
  ]);

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

    socket.emit("start_simulation", { step_size: 20, delay: 1.0 });
    socket.on("prediction_update", (data) => {
      console.log(data);
      const filterVibrationChartData: VibrationChartType = {
        vibration_x: data?.sensor_data?.vibration_x_rms,
        vibration_y: data?.sensor_data?.vibration_y_rms,
        index: data?.row_index,
        timestmap: data?.timestmap,
      };
      setVibrationChartData((prev) => [...prev, filterVibrationChartData]);
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
          <TabsList className="glass-tabs grid w-full grid-cols-5 p-2 h-auto gap-2">
            <TabsTrigger
              value="monitoring"
              className="tab-trigger flex items-center justify-center"
            >
              <Activity className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="hidden sm:inline font-medium">Real-Time</span>
              <span className="sm:hidden font-medium">Live</span>
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="tab-trigger flex items-center justify-center"
            >
              <BarChart3 className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="hidden sm:inline font-medium">Performance</span>
              <span className="sm:hidden font-medium">Perf</span>
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className="tab-trigger flex items-center justify-center"
            >
              <TrendingUp className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="hidden sm:inline font-medium">Trends</span>
              <span className="sm:hidden font-medium">Trends</span>
            </TabsTrigger>
            <TabsTrigger
              value="maintenance"
              className="tab-trigger flex items-center justify-center"
            >
              <Wrench className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="hidden sm:inline font-medium">Maintenance</span>
              <span className="sm:hidden font-medium">Maint</span>
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="tab-trigger flex items-center justify-center"
            >
              <Brain className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="hidden sm:inline font-medium">Analytics</span>
              <span className="sm:hidden font-medium">AI</span>
            </TabsTrigger>
          </TabsList>

          <div className="tab-content-container">
            <TabsContent
              value="monitoring"
              className="space-y-6 animate-in fade-in-50 duration-200"
            >
              <RealTimeMonitoring vibrationData={vibrationChartData} />
            </TabsContent>

            <TabsContent
              value="performance"
              className="space-y-6 animate-in fade-in-50 duration-200"
            >
              <ModelPerformance />
            </TabsContent>

            <TabsContent
              value="trends"
              className="space-y-6 animate-in fade-in-50 duration-200"
            >
              <TrendsVisualization />
            </TabsContent>

            <TabsContent
              value="maintenance"
              className="space-y-6 animate-in fade-in-50 duration-200"
            >
              <MaintenanceInsights />
            </TabsContent>

            <TabsContent
              value="analytics"
              className="space-y-6 animate-in fade-in-50 duration-200"
            >
              <AdvancedAnalytics />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
