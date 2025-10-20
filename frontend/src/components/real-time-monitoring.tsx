import LiveVibrationGraph from "./LiveVibrationGraph";
import type {
  CurrentReadings as CurrentReadingsType,
  HealthStatus as HealthStatusType,
  VibrationChartType,
} from "@/App";
import { CurrentReadings } from "./currentReading";
import { HealthStatus } from "./health-status";

type RealTimeMonitoringProps = {
  vibrationData: VibrationChartType[];
  currentReadings: CurrentReadingsType;
  healthStatus: HealthStatusType;
};

export function RealTimeMonitoring({
  vibrationData,
  currentReadings,
  healthStatus,
}: RealTimeMonitoringProps) {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-8">
        <CurrentReadings {...currentReadings} />
        <HealthStatus {...healthStatus} />
      </div>

      <LiveVibrationGraph vibrationData={vibrationData} />
    </div>
  );
}
