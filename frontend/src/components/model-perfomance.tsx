import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from "recharts"

// Mock model performance data
const metricsData = [
  { name: "MAE", value: 2.34, unit: "hours", color: "rgb(59, 130, 246)" },
  { name: "RMSE", value: 4.12, unit: "hours", color: "rgb(16, 185, 129)" },
  { name: "MSE", value: 16.97, unit: "hours²", color: "rgb(245, 158, 11)" },
  { name: "Accuracy", value: 94.2, unit: "%", color: "rgb(139, 92, 246)" },
]

const classificationMetrics = [
  { metric: "Precision", healthy: 0.96, degraded: 0.89, nearFailure: 0.92, failure: 0.98 },
  { metric: "Recall", healthy: 0.94, degraded: 0.91, nearFailure: 0.88, failure: 0.96 },
  { metric: "F1-Score", healthy: 0.95, degraded: 0.9, nearFailure: 0.9, failure: 0.97 },
]

const confusionMatrix = [
  { predicted: "Healthy", healthy: 245, degraded: 12, nearFailure: 3, failure: 0 },
  { predicted: "Degraded", healthy: 8, degraded: 189, nearFailure: 15, failure: 2 },
  { predicted: "Near Failure", healthy: 2, degraded: 18, nearFailure: 156, failure: 8 },
  { predicted: "Failure", healthy: 0, degraded: 1, nearFailure: 6, failure: 187 },
]

const rulPredictionData = [
  { actual: 45, predicted: 43 },
  { actual: 38, predicted: 41 },
  { actual: 52, predicted: 49 },
  { actual: 29, predicted: 32 },
  { actual: 67, predicted: 64 },
  { actual: 41, predicted: 39 },
  { actual: 55, predicted: 58 },
  { actual: 33, predicted: 35 },
  { actual: 48, predicted: 46 },
  { actual: 61, predicted: 59 },
  { actual: 37, predicted: 40 },
  { actual: 44, predicted: 42 },
  { actual: 56, predicted: 53 },
  { actual: 39, predicted: 37 },
  { actual: 49, predicted: 51 },
]

export function ModelPerformance() {
  const getIntensityColor = (value: number, max: number) => {
    const intensity = value / max
    if (intensity > 0.8) return "rgb(239, 68, 68)"
    if (intensity > 0.6) return "rgb(245, 158, 11)"
    if (intensity > 0.4) return "rgb(34, 197, 94)"
    if (intensity > 0.2) return "rgb(59, 130, 246)"
    return "rgb(75, 85, 99)"
  }

  return (
    <div className="space-y-6">
      {/* Model Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsData.map((metric) => (
          <Card key={metric.name} className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: metric.color }}>
                {metric.value}
              </div>
              <p className="text-xs text-muted-foreground">{metric.unit}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RUL Prediction Accuracy */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>RUL Prediction vs Actual</CardTitle>
            <p className="text-sm text-muted-foreground">Scatter plot showing regression reliability</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={rulPredictionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgb(39, 39, 42)" />
                  <XAxis dataKey="actual" stroke="rgb(113, 113, 122)" fontSize={12} name="Actual RUL (hours)" />
                  <YAxis dataKey="predicted" stroke="rgb(113, 113, 122)" fontSize={12} name="Predicted RUL (hours)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgb(15, 15, 20)",
                      border: "1px solid rgb(39, 39, 42)",
                      borderRadius: "8px",
                    }}
                    formatter={(value, name) => [
                      `${value} hours`,
                      name === "predicted" ? "Predicted RUL" : "Actual RUL",
                    ]}
                  />
                  <Scatter dataKey="predicted" fill="rgb(59, 130, 246)" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Classification Metrics */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Classification Performance</CardTitle>
            <p className="text-sm text-muted-foreground">Precision, Recall, and F1-Score by health state</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classificationMetrics.map((row) => (
                <div key={row.metric} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{row.metric}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-green-400 font-bold">{(row.healthy * 100).toFixed(0)}%</div>
                      <div className="text-muted-foreground">Healthy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-yellow-400 font-bold">{(row.degraded * 100).toFixed(0)}%</div>
                      <div className="text-muted-foreground">Degraded</div>
                    </div>
                    <div className="text-center">
                      <div className="text-orange-400 font-bold">{(row.nearFailure * 100).toFixed(0)}%</div>
                      <div className="text-muted-foreground">Near Failure</div>
                    </div>
                    <div className="text-center">
                      <div className="text-red-400 font-bold">{(row.failure * 100).toFixed(0)}%</div>
                      <div className="text-muted-foreground">Failure</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confusion Matrix */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Confusion Matrix</CardTitle>
          <p className="text-sm text-muted-foreground">Model classification accuracy across health states</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-5 gap-2 min-w-96">
              {/* Header row */}
              <div className="text-center text-sm font-medium text-muted-foreground p-2">Predicted →</div>
              <div className="text-center text-sm font-medium text-muted-foreground p-2">Healthy</div>
              <div className="text-center text-sm font-medium text-muted-foreground p-2">Degraded</div>
              <div className="text-center text-sm font-medium text-muted-foreground p-2">Near Failure</div>
              <div className="text-center text-sm font-medium text-muted-foreground p-2">Failure</div>

              {/* Matrix rows */}
              {confusionMatrix.map((row, rowIndex) => (
                <>
                  <div
                    key={`label-${rowIndex}`}
                    className="text-center text-sm font-medium text-muted-foreground p-2 flex items-center justify-center"
                  >
                    {row.predicted}
                  </div>
                  <div
                    key={`healthy-${rowIndex}`}
                    className="text-center p-2 rounded text-sm font-bold"
                    style={{
                      backgroundColor: getIntensityColor(row.healthy, 250) + "20",
                      color: getIntensityColor(row.healthy, 250),
                    }}
                  >
                    {row.healthy}
                  </div>
                  <div
                    key={`degraded-${rowIndex}`}
                    className="text-center p-2 rounded text-sm font-bold"
                    style={{
                      backgroundColor: getIntensityColor(row.degraded, 250) + "20",
                      color: getIntensityColor(row.degraded, 250),
                    }}
                  >
                    {row.degraded}
                  </div>
                  <div
                    key={`nearFailure-${rowIndex}`}
                    className="text-center p-2 rounded text-sm font-bold"
                    style={{
                      backgroundColor: getIntensityColor(row.nearFailure, 250) + "20",
                      color: getIntensityColor(row.nearFailure, 250),
                    }}
                  >
                    {row.nearFailure}
                  </div>
                  <div
                    key={`failure-${rowIndex}`}
                    className="text-center p-2 rounded text-sm font-bold"
                    style={{
                      backgroundColor: getIntensityColor(row.failure, 250) + "20",
                      color: getIntensityColor(row.failure, 250),
                    }}
                  >
                    {row.failure}
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
              Overall Accuracy: 94.2%
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
