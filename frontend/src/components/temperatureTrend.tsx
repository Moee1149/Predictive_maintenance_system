import { Activity, Thermometer } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

type ChartConfig = {
  bearing_temp: {
    label: "bearing_temp";
    color: string;
  };
  atmospheric_temp: {
    label: "atm_temp";
    color: string;
  };
};

type TemeratureTrendDataType = {
  hour: string;
  bearing_temp: number;
  atmospheric_temp: number;
};

type Props = {
  temperature_data: TemeratureTrendDataType[];
};

const chartConfig = {
  bearing_temp: {
    label: "bearing_temp",
    color: "rgb(249, 115, 22)",
  },
  atmospheric_temp: {
    label: "atm_temp",
    color: "rgb(59, 130, 246)",
  },
} satisfies ChartConfig;

export default function TemperatueTrend({ temperature_data }: Props) {
  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="mt-5">
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="h-5 w-5" />
          Temperature Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Bearing vs atmospheric temperature with health state transitions
        </p>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={temperature_data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour" // Use timestamp field (note the typo in your type)
              tickLine={false}
              axisLine={false}
              tickMargin={8}
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
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              strokeWidth="4"
              domain={[0, 110]}
              label={{
                value: "Temperature (%)",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
              }}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[180px]"
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
              dataKey="bearing_temp"
              type="monotone"
              stroke="var(--color-bearing_temp)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="atmospheric_temp"
              type="monotone"
              stroke="var(--color-atmospheric_temp)"
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
