import { Activity } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import type { VibrationChartType } from "@/App";

type ChartConfig = {
  vibration_x: {
    label: "Vib_x";
    color: string;
  };
  vibration_y: {
    label: "Vib_y";
    color: string;
  };
};

type Props = {
  vibrationData: VibrationChartType[];
};

const chartConfig = {
  vibration_x: {
    label: "Vib_x",
    color: "var(--chart-1)",
  },
  vibration_y: {
    label: "Vib_y",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function LiveVibrationGraph({ vibrationData }: Props) {
  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="p-5">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-card-foreground">
              Live Vibration Monitoring
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
            <span className="text-sm text-muted-foreground">Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={vibrationData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp" // Use timestamp field (note the typo in your type)
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                // Format timestamp for X-axis display
                const date = new Date(value);
                return date.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                });
              }}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    // Now value is the timestamp
                    return new Date(value).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="vibration_x"
              type="monotone"
              stroke="var(--color-vibration_x)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="vibration_y"
              type="monotone"
              stroke="var(--color-vibration_y)"
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
