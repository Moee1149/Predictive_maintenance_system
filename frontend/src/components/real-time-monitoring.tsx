import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangle,
  Activity,
  Thermometer,
  TrendingUp,
  Zap,
  Heart,
  LucideMoveVertical,
} from "lucide-react";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import LiveVibrationGraph from "./LiveVibrationGraph";
import type { VibrationChartType } from "@/App";

type HealthStatus = "healthy" | "degraded" | "warning" | "critical";

const getHealthColor = (status: string) => {
  switch (status) {
    case "healthy":
      return "rgb(34, 197, 94)"; // emerald-500
    case "degraded":
      return "rgb(251, 191, 36)"; // amber-500
    case "warning":
      return "rgb(251, 146, 60)"; // orange-400
    case "critical":
      return "rgb(239, 68, 68)"; // red-500
    default:
      return "rgb(107, 114, 128)"; // gray-500
  }
};

type RealTimeMonitoringProps = {
  vibrationData: VibrationChartType[];
};

export function RealTimeMonitoring({ vibrationData }: RealTimeMonitoringProps) {
  const currentHealth = 75;
  const rulHours = 42;
  const healthStatus: HealthStatus = "degraded";
  const bearingTemp = 68.5;
  const vibrationRMS = 0.31;

  const healthData = [
    { name: "Healthy", value: currentHealth, color: getHealthColor("healthy") },
    {
      name: "Degraded",
      value: 100 - currentHealth,
      color: getHealthColor(healthStatus),
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "degraded":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "warning":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "critical":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-10">
      {healthStatus !== ("healthy" as HealthStatus) && (
        /* Enhanced alert with better styling */
        <Alert className="border-amber-500/30 bg-gradient-to-r from-amber-500/20 to-amber-600/10 backdrop-blur-xl shadow-xl">
          <AlertTriangle className="h-6 w-6 text-amber-300" />
          <AlertDescription className="text-amber-200 font-semibold text-base">
            Bearing health degraded. Schedule maintenance in approximately{" "}
            {rulHours} hours.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="metric-card">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-4 text-xl font-bold">
              <div className="icon-container bg-gradient-to-br from-primary/20 to-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              Health Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={healthData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      {healthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{currentHealth}%</div>
                    <div className="text-xs text-muted-foreground">Health</div>
                  </div>
                </div>
              </div>
            </div>
            <Badge className={getStatusColor(healthStatus)}>
              <Activity className="w-3 h-3 mr-1" />
              {healthStatus.charAt(0).toUpperCase() + healthStatus.slice(1)}
            </Badge>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-4 text-xl font-bold">
              <div className="icon-container bg-gradient-to-br from-chart-1/20 to-chart-1/10">
                <TrendingUp className="h-6 w-6 text-chart-1" />
              </div>
              Remaining Useful Life
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center space-y-4">
              <div className="text-7xl font-bold text-chart-1">{rulHours}</div>
              <div className="text-base text-muted-foreground uppercase tracking-wider font-semibold">
                Hours Remaining
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-base font-semibold">
                <span>Life Consumed</span>
                <span className="text-chart-1">
                  {Math.round(((164 - rulHours) / 164) * 100)}%
                </span>
              </div>
              <Progress
                value={((164 - rulHours) / 164) * 100}
                className="h-4 bg-muted/30"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-4 text-xl font-bold">
              <div className="icon-container bg-gradient-to-br from-chart-2/20 to-chart-2/10">
                <Activity className="h-6 w-6 text-chart-2" />
              </div>
              Current Readings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="icon-container bg-gradient-to-br from-orange-500/20 to-orange-600/10">
                    <Thermometer className="h-5 w-5 text-orange-400" />
                  </div>
                  <span className="font-semibold text-base">Bearing Temp</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{bearingTemp}°C</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="icon-container bg-gradient-to-br from-blue-500/20 to-blue-600/10">
                    <Zap className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="font-semibold text-base">Vibration RMS</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{vibrationRMS} g</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <LiveVibrationGraph vibrationData={vibrationData} />
    </div>
  );
}
