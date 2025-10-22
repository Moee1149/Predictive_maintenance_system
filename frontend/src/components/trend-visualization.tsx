import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  ReferenceLine,
} from "recharts";
import { TrendingUp, Activity, Thermometer } from "lucide-react";
import { DegradationCurve } from "./degradationChart";
import type { TrendAnaylsisDataType } from "@/App";

// Mock historical data
const vibrationTrendData = [
  { hour: 0, vibrationRMS: 0.12, healthPercent: 100, peakDetection: 0 },
  { hour: 10, vibrationRMS: 0.14, healthPercent: 98, peakDetection: 1 },
  { hour: 20, vibrationRMS: 0.16, healthPercent: 95, peakDetection: 0 },
  { hour: 30, vibrationRMS: 0.18, healthPercent: 92, peakDetection: 2 },
  { hour: 40, vibrationRMS: 0.21, healthPercent: 88, peakDetection: 1 },
  { hour: 50, vibrationRMS: 0.24, healthPercent: 84, peakDetection: 3 },
  { hour: 60, vibrationRMS: 0.27, healthPercent: 80, peakDetection: 2 },
  { hour: 70, vibrationRMS: 0.3, healthPercent: 75, peakDetection: 4 },
  { hour: 80, vibrationRMS: 0.33, healthPercent: 70, peakDetection: 3 },
  { hour: 90, vibrationRMS: 0.36, healthPercent: 65, peakDetection: 5 },
  { hour: 100, vibrationRMS: 0.39, healthPercent: 60, peakDetection: 4 },
  { hour: 110, vibrationRMS: 0.42, healthPercent: 55, peakDetection: 6 },
  { hour: 120, vibrationRMS: 0.45, healthPercent: 50, peakDetection: 5 },
];

const temperatureTrendData = [
  { hour: 0, bearingTemp: 45.2, atmosphericTemp: 22.1, healthState: 0 },
  { hour: 10, bearingTemp: 46.8, atmosphericTemp: 22.3, healthState: 0 },
  { hour: 20, bearingTemp: 48.5, atmosphericTemp: 22.0, healthState: 0 },
  { hour: 30, bearingTemp: 50.2, atmosphericTemp: 21.8, healthState: 1 },
  { hour: 40, bearingTemp: 52.1, atmosphericTemp: 22.5, healthState: 1 },
  { hour: 50, bearingTemp: 54.3, atmosphericTemp: 22.2, healthState: 1 },
  { hour: 60, bearingTemp: 56.8, atmosphericTemp: 21.9, healthState: 1 },
  { hour: 70, bearingTemp: 59.4, atmosphericTemp: 22.4, healthState: 2 },
  { hour: 80, bearingTemp: 62.1, atmosphericTemp: 22.1, healthState: 2 },
  { hour: 90, bearingTemp: 64.9, atmosphericTemp: 22.6, healthState: 2 },
  { hour: 100, bearingTemp: 67.8, atmosphericTemp: 22.3, healthState: 2 },
  { hour: 110, bearingTemp: 70.9, atmosphericTemp: 22.0, healthState: 3 },
  { hour: 120, bearingTemp: 74.2, atmosphericTemp: 22.2, healthState: 3 },
];

type Props = {
  trends: TrendAnaylsisDataType[];
};

export function TrendsVisualization({ trends }: Props) {
  const getHealthStateColor = (state: number) => {
    switch (state) {
      case 0:
        return "rgba(34, 197, 94, 0.2)"; // Healthy - green
      case 1:
        return "rgba(251, 191, 36, 0.2)"; // Degraded - yellow
      case 2:
        return "rgba(249, 115, 22, 0.2)"; // Near Failure - orange
      case 3:
        return "rgba(239, 68, 68, 0.2)"; // Failure - red
      default:
        return "rgba(113, 113, 122, 0.2)";
    }
  };

  const degradationChartData = trends.map(
    ({ hour, predictedHealth, predictedRUL }) => ({
      hour,
      predictedHealth,
      predictedRUL,
    }),
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="vibration" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-card">
          <TabsTrigger value="vibration">Vibration Analysis</TabsTrigger>
          <TabsTrigger value="temperature">Temperature Trends</TabsTrigger>
          <TabsTrigger value="degradation">Degradation Curve</TabsTrigger>
        </TabsList>

        <TabsContent value="vibration" className="space-y-6">
          {/* Vibration Trends */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Vibration RMS & Health Correlation
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Combined vibration RMS with health percentage overlay and
                anomaly peaks
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={vibrationTrendData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgb(39, 39, 42)"
                    />
                    <XAxis
                      dataKey="hour"
                      stroke="rgb(113, 113, 122)"
                      fontSize={12}
                      label={{
                        value: "Operating Hours",
                        position: "insideBottom",
                        offset: -5,
                      }}
                    />
                    <YAxis
                      yAxisId="vibration"
                      stroke="rgb(113, 113, 122)"
                      fontSize={12}
                      label={{
                        value: "Vibration RMS (g)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <YAxis
                      yAxisId="health"
                      orientation="right"
                      stroke="rgb(113, 113, 122)"
                      fontSize={12}
                      label={{
                        value: "Health %",
                        angle: 90,
                        position: "insideRight",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgb(15, 15, 20)",
                        border: "1px solid rgb(39, 39, 42)",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      yAxisId="vibration"
                      type="monotone"
                      dataKey="vibrationRMS"
                      stroke="rgb(59, 130, 246)"
                      strokeWidth={2}
                      name="Vibration RMS"
                    />
                    <Line
                      yAxisId="health"
                      type="monotone"
                      dataKey="healthPercent"
                      stroke="rgb(34, 197, 94)"
                      strokeWidth={2}
                      name="Health %"
                    />
                    <Bar
                      yAxisId="vibration"
                      dataKey="peakDetection"
                      fill="rgb(239, 68, 68)"
                      opacity={0.6}
                      name="Anomaly Peaks"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Vibration Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Current RMS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-blue-400">0.45g</div>
                  <Badge
                    variant="outline"
                    className="bg-red-500/10 text-red-400 border-red-500/20"
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +15%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Peak Count (24h)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-orange-400">23</div>
                  <Badge
                    variant="outline"
                    className="bg-orange-500/10 text-orange-400 border-orange-500/20"
                  >
                    High
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Trend Direction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-red-400">
                    Increasing
                  </div>
                  <TrendingUp className="w-5 h-5 text-red-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="temperature" className="space-y-6">
          {/* Temperature Trends */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                Temperature Analysis
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Bearing vs atmospheric temperature with health state transitions
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={temperatureTrendData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgb(39, 39, 42)"
                    />
                    <XAxis
                      dataKey="hour"
                      stroke="rgb(113, 113, 122)"
                      fontSize={12}
                      label={{
                        value: "Operating Hours",
                        position: "insideBottom",
                        offset: -5,
                      }}
                    />
                    <YAxis
                      stroke="rgb(113, 113, 122)"
                      fontSize={12}
                      label={{
                        value: "Temperature (°C)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgb(15, 15, 20)",
                        border: "1px solid rgb(39, 39, 42)",
                        borderRadius: "8px",
                      }}
                    />
                    {/* Background shading for health states */}
                    {temperatureTrendData.map((point, index) => (
                      <ReferenceLine
                        key={index}
                        x={point.hour}
                        stroke="transparent"
                      />
                    ))}
                    <Line
                      type="monotone"
                      dataKey="bearingTemp"
                      stroke="rgb(249, 115, 22)"
                      strokeWidth={3}
                      name="Bearing Temperature"
                    />
                    <Line
                      type="monotone"
                      dataKey="atmosphericTemp"
                      stroke="rgb(59, 130, 246)"
                      strokeWidth={2}
                      name="Atmospheric Temperature"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Temperature Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Current Bearing Temp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-orange-400">
                    74.2°C
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-red-500/10 text-red-400 border-red-500/20"
                  >
                    Critical
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Temperature Rise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-red-400">+29°C</div>
                  <Badge
                    variant="outline"
                    className="bg-red-500/10 text-red-400 border-red-500/20"
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    64% increase
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Ambient Temp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-blue-400">22.2°C</div>
                  <Badge
                    variant="outline"
                    className="bg-green-500/10 text-green-400 border-green-500/20"
                  >
                    Stable
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="degradation" className="space-y-6">
          <DegradationCurve degradationCurveChartData={degradationChartData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
