import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type DegradationCurveData = {
  hour: string;
  predictedHealth: number;
  predictedRUL: number;
};

type Props = {
  degradationCurveChartData: DegradationCurveData[];
};

const chartConfig = {
  predictedHealth: {
    label: "Predicted Health",
    color: "var(--chart-1)",
  },

  predictedRUL: {
    label: "Predicted RUL",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function DegradationCurve({
  degradationCurveChartData: degradationCurveData,
}: Props) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Health Degradation & RUL Prediction</CardTitle>
        <p className="text-sm text-muted-foreground">
          Actual vs predicted health percentage and remaining useful life over
          time
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[450px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={degradationCurveData}
            margin={{
              left: 12,
              right: 12,
              top: 20,
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
            />
            {/* Left Y-Axis for Health % */}
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              strokeWidth="4"
              label={{
                value: "Health (%)",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
              }}
            />

            {/* Right Y-Axis for RUL */}
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: "RUL (hours)",
                angle: 90,
                position: "insideRight",
                style: { textAnchor: "middle" },
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* Health Lines - Left Y-Axis */}
            <Line
              yAxisId="left"
              dataKey="predictedHealth"
              type="monotone"
              stroke="var(--color-predictedHealth)"
              strokeWidth={2}
              dot={false}
            />

            {/* RUL Lines - Right Y-Axis */}
            <Line
              yAxisId="right"
              dataKey="predictedRUL"
              type="monotone"
              stroke="var(--color-predictedRUL)"
              strokeWidth={2}
              dot={false}
            />

            <ChartLegend content={<ChartLegendContent />} className="mt-5" />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
