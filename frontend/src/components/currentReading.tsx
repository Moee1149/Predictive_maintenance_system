import { Card } from "@/components/ui/card";
import { Thermometer, Activity, Zap } from "lucide-react";

interface CurrentReadingsProps {
  bearingTemperature: number;
  atmosphericTemperature: number;
  vibrationX: number;
  vibrationY: number;
  rms: number;
}

function getTemperatureColor(temp: number): string {
  if (temp < 70) return "text-[var(--color-success)]";
  if (temp < 80) return "text-[var(--color-warning)]";
  if (temp < 90) return "text-[var(--color-chart-4)]";
  return "text-red-300";
}

function getVibrationColor(vib: number): string {
  if (vib < 0.5) return "text-[var(--color-success)]";
  if (vib < 0.7) return "text-[var(--color-warning)]";
  if (vib < 0.9) return "text-[var(--color-chart-4)]";
  return "text-red-400";
}

export function CurrentReadings({
  bearingTemperature,
  atmosphericTemperature,
  vibrationX,
  vibrationY,
  rms,
}: CurrentReadingsProps) {
  return (
    <Card className="bg-[#0D0D0D] p-6 col-span-2">
      <h2 className="mb-6 text-lg font-semibold text-card-foreground">
        Current Readings
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Bearing Temperature */}
        <div className="flex items-center gap-4">
          <div
            className={`rounded-full bg-secondary p-4 ${getTemperatureColor(bearingTemperature)}`}
          >
            <Thermometer className="h-8 w-8" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-sm text-muted-foreground">Bearing Temp</div>
            <div
              className={`text-2xl font-bold tabular-nums ${getTemperatureColor(bearingTemperature)}`}
            >
              {bearingTemperature?.toFixed(1)}°F
            </div>
          </div>
        </div>

        {/* Atmospheric Temperature */}
        <div className="flex items-center gap-4">
          <div
            className={`rounded-full bg-secondary p-4 ${getTemperatureColor(atmosphericTemperature)}`}
          >
            <Thermometer className="h-8 w-8" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-sm text-muted-foreground">Atmos Temp</div>
            <div
              className={`text-2xl font-bold tabular-nums ${getTemperatureColor(atmosphericTemperature)}`}
            >
              {atmosphericTemperature?.toFixed(1)}°F
            </div>
          </div>
        </div>

        {/* Vibration RMS */}
        <div className="flex items-center gap-4">
          <div
            className={`rounded-full bg-secondary p-4 ${getVibrationColor(rms)}`}
          >
            <Activity className="h-8 w-8" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-sm text-muted-foreground">VIB RMS</div>
            <div
              className={`text-2xl font-bold tabular-nums ${getVibrationColor(rms)}`}
            >
              {rms?.toFixed(3)}
            </div>
            <div className="text-xs text-muted-foreground">g</div>
          </div>
        </div>

        {/* Vibration X */}
        <div className="flex items-center gap-4">
          <div
            className={`rounded-full bg-secondary p-4 ${getVibrationColor(vibrationX)}`}
          >
            <Zap className="h-8 w-8" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-sm text-muted-foreground">Vibration X</div>
            <div
              className={`text-2xl font-bold tabular-nums ${getVibrationColor(vibrationX)}`}
            >
              {vibrationX?.toFixed(3)}
            </div>
            <div className="text-xs text-muted-foreground">g</div>
          </div>
        </div>

        {/* Vibration Y */}
        <div className="flex items-center gap-4">
          <div
            className={`rounded-full bg-secondary p-4 ${getVibrationColor(vibrationY)}`}
          >
            <Zap className="h-8 w-8" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-sm text-muted-foreground">Vibration Y</div>
            <div
              className={`text-2xl font-bold tabular-nums ${getVibrationColor(vibrationY)}`}
            >
              {vibrationY?.toFixed(3)}
              <span className="text-xs text-muted-foreground">g</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
