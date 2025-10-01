import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, AlertTriangle, Clock, Wrench, Calendar, TrendingUp, FileText } from "lucide-react"

// Mock prediction history data
const predictionHistory = [
  {
    timestamp: "2024-01-15 14:30",
    vibrationRMS: 0.45,
    bearingTemp: 74.2,
    healthPercent: 50,
    healthState: "Critical",
    rul: 42,
  },
  {
    timestamp: "2024-01-15 13:30",
    vibrationRMS: 0.43,
    bearingTemp: 72.8,
    healthPercent: 52,
    healthState: "Critical",
    rul: 44,
  },
  {
    timestamp: "2024-01-15 12:30",
    vibrationRMS: 0.41,
    bearingTemp: 71.5,
    healthPercent: 55,
    healthState: "Near Failure",
    rul: 46,
  },
  {
    timestamp: "2024-01-15 11:30",
    vibrationRMS: 0.39,
    bearingTemp: 70.1,
    healthPercent: 58,
    healthState: "Near Failure",
    rul: 48,
  },
  {
    timestamp: "2024-01-15 10:30",
    vibrationRMS: 0.37,
    bearingTemp: 68.7,
    healthPercent: 61,
    healthState: "Near Failure",
    rul: 50,
  },
  {
    timestamp: "2024-01-15 09:30",
    vibrationRMS: 0.35,
    bearingTemp: 67.3,
    healthPercent: 64,
    healthState: "Degraded",
    rul: 52,
  },
  {
    timestamp: "2024-01-15 08:30",
    vibrationRMS: 0.33,
    bearingTemp: 65.9,
    healthPercent: 67,
    healthState: "Degraded",
    rul: 54,
  },
  {
    timestamp: "2024-01-15 07:30",
    vibrationRMS: 0.31,
    bearingTemp: 64.5,
    healthPercent: 70,
    healthState: "Degraded",
    rul: 56,
  },
  {
    timestamp: "2024-01-15 06:30",
    vibrationRMS: 0.29,
    bearingTemp: 63.1,
    healthPercent: 73,
    healthState: "Degraded",
    rul: 58,
  },
  {
    timestamp: "2024-01-15 05:30",
    vibrationRMS: 0.27,
    bearingTemp: 61.7,
    healthPercent: 76,
    healthState: "Degraded",
    rul: 60,
  },
]

const maintenanceActions = [
  {
    priority: "Critical",
    action: "Replace NSK 6205 Ball Bearing",
    timeframe: "Within 42 hours",
    reason: "RUL prediction indicates imminent failure",
    cost: "$450",
    downtime: "4 hours",
  },
  {
    priority: "High",
    action: "Inspect lubrication system",
    timeframe: "Within 24 hours",
    reason: "Elevated bearing temperature detected",
    cost: "$120",
    downtime: "1 hour",
  },
  {
    priority: "Medium",
    action: "Vibration analysis calibration",
    timeframe: "Within 1 week",
    reason: "Ensure sensor accuracy for predictions",
    cost: "$200",
    downtime: "2 hours",
  },
]

export function MaintenanceInsights() {
  const getHealthStateColor = (state: string) => {
    switch (state.toLowerCase()) {
      case "healthy":
        return "text-green-400 bg-green-500/10"
      case "degraded":
        return "text-yellow-400 bg-yellow-500/10"
      case "near failure":
        return "text-orange-400 bg-orange-500/10"
      case "critical":
        return "text-red-400 bg-red-500/10"
      default:
        return "text-gray-400 bg-gray-500/10"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "text-red-400 bg-red-500/10 border-red-500/20"
      case "high":
        return "text-orange-400 bg-orange-500/10 border-orange-500/20"
      case "medium":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      case "low":
        return "text-green-400 bg-green-500/10 border-green-500/20"
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20"
    }
  }

  const getCurrentRecommendation = () => {
    const currentHealth = 50
    if (currentHealth < 30) {
      return "Immediate bearing replacement required. System failure imminent."
    } else if (currentHealth < 60) {
      return "Schedule preventive maintenance within 48 hours. Bearing degradation accelerating."
    } else if (currentHealth < 80) {
      return "Monitor closely. Consider maintenance scheduling within next week."
    } else {
      return "Bearing operating normally. Continue routine monitoring."
    }
  }

  const handleExportData = (format: string) => {
    // Mock export functionality
    console.log(`Exporting data as ${format}`)
    // In a real application, this would trigger a download
  }

  return (
    <div className="space-y-6">
      {/* Current Status Alert */}
      <Alert className="border-red-500/20 bg-red-500/10">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <AlertDescription className="text-red-200">{getCurrentRecommendation()}</AlertDescription>
      </Alert>

      {/* Maintenance Actions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Recommended Maintenance Actions
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Prioritized maintenance tasks based on current bearing condition
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {maintenanceActions.map((action, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-4 rounded-lg border border-border bg-muted/20"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(action.priority)}>{action.priority}</Badge>
                    <h3 className="font-semibold">{action.action}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{action.reason}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {action.timeframe}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Cost: {action.cost}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Downtime: {action.downtime}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Schedule
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prediction History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Prediction History</CardTitle>
              <p className="text-sm text-muted-foreground">Last 10 health predictions and sensor readings</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportData("CSV")}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportData("PDF")}
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
                {predictionHistory.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-xs">{record.timestamp}</TableCell>
                    <TableCell>
                      <span className="font-mono">{record.vibrationRMS}g</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono">{record.bearingTemp}°C</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono">{record.healthPercent}%</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getHealthStateColor(record.healthState)}>{record.healthState}</Badge>
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
      </Card>

      {/* Maintenance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-red-400">42 hrs</div>
              <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
                Critical
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Bearing replacement required</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Estimated Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-orange-400">$770</div>
              <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/20">
                Total
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">All recommended actions</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Expected Downtime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-blue-400">7 hrs</div>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                Planned
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Including buffer time</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
