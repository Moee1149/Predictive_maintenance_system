import { TrendingUp, Thermometer } from "lucide-react";

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
  ReferenceLine,
} from "recharts";

import VibrationTrend from "./vibrationTrend";
import { DegradationCurve } from "./degradationChart";

import type { TrendAnaylsisDataType } from "@/App";

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
  const degradationChartData = trends.map(
    ({ hour, predictedHealth, predictedRUL }) => ({
      hour,
      predictedHealth,
      predictedRUL,
    }),
  );

  const vibrationTrendData = trends.map((t) => {
    const {
      peakDetection,
      combined_rms: vibrationRMS,
      predictedHealth: healthPercent,
      hour,
    } = t;
    return { peakDetection, vibrationRMS, healthPercent, hour };
  });

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
          <VibrationTrend vibrationTrendData={vibrationTrendData} />
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
