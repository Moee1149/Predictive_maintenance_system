import LiveVibrationGraph from "./LiveVibrationGraph";
import type {
  CurrentReadings as CurrentReadingsType,
  VibrationChartType,
} from "@/App";
import { CurrentReadings } from "./currentReading";
import { HealthStatus } from "./health-status";

type RealTimeMonitoringProps = {
  vibrationData: VibrationChartType[];
  currentReadings: CurrentReadingsType;
};

export function RealTimeMonitoring({
  vibrationData,
  currentReadings,
}: RealTimeMonitoringProps) {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-8">
        <CurrentReadings {...currentReadings} />
        <HealthStatus />
      </div>

      <LiveVibrationGraph vibrationData={vibrationData} />
    </div>
  );
}
