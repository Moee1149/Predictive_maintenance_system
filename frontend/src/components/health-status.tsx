import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Battery, AlertTriangle } from "lucide-react";

interface HealthStatusProps {
  healthPercentage?: number;
  predictedRul?: number;
  healthStatus?: "HEALTHY" | "DEGRADING" | "NEAR_FAILURE" | "CRITICAL";
  severity?: number;
}

const statusConfig = {
  HEALTHY: {
    color: "bg-[var(--color-success)]",
    text: "text-[var(--color-success)]",
    label: "🟢 HEALTHY",
  },
  DEGRADING: {
    color: "bg-[var(--color-warning)]",
    text: "text-[var(--color-warning)]",
    label: "🟡 DEGRADING",
  },
  NEAR_FAILURE: {
    color: "bg-[var(--color-chart-1)]",
    text: "text-[var(--color-chart-1)]",
    label: "🟠 NEAR FAILURE",
  },
  CRITICAL: {
    color: "bg-[var(--color-danger)]",
    text: "text-[var(--color-danger)]",
    label: "🔴 CRITICAL",
  },
};

function getBatteryColor(percentage: number): string {
  if (percentage > 60) return "text-[var(--color-success)]";
  if (percentage > 10) return "text-[var(--color-warning)]";
  return "text-[var(--color-danger)]";
}

export function HealthStatus({
  healthPercentage = 73,
  predictedRul = 100,
  healthStatus = "HEALTHY",
  severity = 2.3,
}: HealthStatusProps) {
  const maxRul = 128;
  const config = statusConfig[healthStatus];

  return (
    <Card className="bg-card p-6 ">
      <h2 className="mb-6 text-lg font-semibold text-card-foreground">
        Health Status
      </h2>

      <div className="space-y-6">
        {/* Life Expectancy */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Battery className="h-4 w-4" />
            <span className="text-sm">Life Expectancy</span>
          </div>

          <div className="relative mx-auto h-32 w-20">
            {/* Battery outline */}
            <div className="absolute inset-x-2 top-2 h-2 rounded-t-sm bg-secondary" />
            <div className="absolute inset-x-0 top-4 bottom-0 rounded-lg border-4 border-secondary bg-background">
              {/* Battery fill */}
              <div
                className={`absolute inset-x-0 bottom-0 rounded-md transition-all duration-500 ${
                  healthPercentage > 60
                    ? "bg-[var(--color-success)]"
                    : healthPercentage > 10
                      ? "bg-[var(--color-warning)]"
                      : "bg-[var(--color-danger)]"
                }`}
                style={{ height: `${healthPercentage}%` }}
              />
            </div>
            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={`text-xl font-bold tabular-nums text-white ${getBatteryColor(healthPercentage)}`}
              >
                {healthPercentage.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* RUL */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Remaining Useful Life (RUL)</span>
          </div>
          <div className="text-2xl font-semibold text-card-foreground tabular-nums">
            {predictedRul.toFixed(1)} hours
          </div>
          <div className="text-sm text-muted-foreground">
            Max: {maxRul} hours
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${healthPercentage}%` }}
            />
          </div>
        </div>

        {/* Status and Severity */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Current Status</div>
            <Badge
              variant="outline"
              className={`${config.text} border-current`}
            >
              {config.label}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">Severity Level</span>
            </div>
            <div className="text-xl font-semibold text-card-foreground tabular-nums">
              {severity.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
