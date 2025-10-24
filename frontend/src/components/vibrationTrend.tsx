import { Activity } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

type VibrationTrendData = {
  hour: string;
  vibrationRMS: number;
  healthPercent: number;
  peakDetection: number;
};

type Props = {
  vibrationTrendData: VibrationTrendData[];
};

type ChartConfig = {
  healthPercent: {
    label: "health_percent";
    color: string;
  };
  vibrationRMS: {
    label: "vibration_rms";
    color: string;
  };
  peakDetection: {
    label: "Anomaly Peaks";
    color: "rgb(239, 68, 68)";
  };
};

const chartConfig = {
  healthPercent: {
    label: "health_percent",
    color: "var(--chart-1)",
  },
  vibrationRMS: {
    label: "vibration_rms",
    color: "var(--chart-2)",
  },
  peakDetection: {
    label: "Anomaly Peaks",
    color: "rgb(239, 68, 68)",
  },
} satisfies ChartConfig;

export default function VibrationTrend({ vibrationTrendData }: Props) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Vibration RMS & Health Correlation
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Combined vibration RMS with health percentage overlay and anomaly
          peaks
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[450px] w-full"
        >
          <ComposedChart
            accessibilityLayer
            data={vibrationTrendData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: "Operating Hours",
                position: "insideBottom",
                offset: -15,
              }}
              tickFormatter={(value) => {
                // Format timestamp for X-axis display
                const date = new Date(value);
                return date.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }}
            />
            <YAxis
              yAxisId="vibration"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              strokeWidth={4}
              label={{
                value: "Vibration RMS",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
              }}
            />

            {/* Right Y-Axis for Health Percentage */}
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: "Health (%)",
                angle: 90,
                position: "insideRight",
                style: { textAnchor: "middle" },
              }}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              yAxisId="vibration"
              dataKey="vibrationRMS"
              type="monotone"
              stroke={chartConfig.vibrationRMS.color}
              strokeWidth={2}
              dot={false}
            />

            {/* Health Percentage Line - Right Y-Axis */}
            <Line
              yAxisId="right"
              dataKey="healthPercent"
              type="monotone"
              stroke={chartConfig.healthPercent.color}
              strokeWidth={2}
              dot={false}
              name="Health (%)"
            />

            <ChartLegend content={<ChartLegendContent />} className="mt-5" />
            <Bar
              yAxisId="vibration"
              dataKey="peakDetection"
              fill="rgb(239, 68, 68)"
              opacity={0.6}
              name="Anomaly Peaks"
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
