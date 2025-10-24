import { TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import VibrationTrend from "./vibrationTrend";
import { DegradationCurve } from "./degradationChart";

import type { TrendAnaylsisDataType } from "@/App";
import TemperatueTrend from "./temperatureTrend";

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

  const temperature_data = trends.map(
    ({ hour, temp_bearing, atmosphericTemperature }) => ({
      bearing_temp: temp_bearing,
      atmospheric_temp: atmosphericTemperature,
      hour,
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
          <TemperatueTrend temperature_data={temperature_data} />

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
