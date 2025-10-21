import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, FileText } from "lucide-react";
import type { PredcitionHistory } from "@/App";
import { useState } from "react";

type Props = {
  predictionHistory: PredcitionHistory[];
};

export function MaintenanceInsights({ predictionHistory }: Props) {
  const [showAllData, setShowAllData] = useState(false);
  const displayData =
    predictionHistory.length > 10 && !showAllData
      ? predictionHistory.slice(-10)
      : predictionHistory;

  const getHealthStateColor = (state: string) => {
    switch (state.toLowerCase()) {
      case "healthy":
        return "text-green-400 bg-green-500/10";
      case "degrading":
        return "text-yellow-400 bg-yellow-500/10";
      case "near_failure":
        return "text-orange-400 bg-orange-500/10";
      case "critical":
        return "text-red-400 bg-red-500/10";
      default:
        return "text-gray-400 bg-gray-500/10";
    }
  };

  return (
    <div className="space-y-6">
      {/* Prediction History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="mb-2">Prediction History</CardTitle>
              <p className="text-sm text-muted-foreground">
                Last 10 health predictions and sensor readings
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Vibration RMS</TableHead>
                  <TableHead>Bearing Temp</TableHead>
                  <TableHead>Health %</TableHead>
                  <TableHead>Health State</TableHead>
                  <TableHead>RUL (hrs)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {predictionHistory.length > 0 &&
                  displayData.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-xs">
                        {record.timestamp}
                      </TableCell>
                      <TableCell>
                        <span className="font-mono">
                          {record.vibrationRMS}g
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono">
                          {record.bearingTemp}°C
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono">
                          {record.healthPercent}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getHealthStateColor(record.healthState)}
                        >
                          {record.healthState}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono">{record.rul}</span>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="mx-auto ">
          <Button
            size="default"
            className="cursor-pointer"
            onClick={() => setShowAllData(!showAllData)}
          >
            {showAllData ? "Last 10 results" : "Show all"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
