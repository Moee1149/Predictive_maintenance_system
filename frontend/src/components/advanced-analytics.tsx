import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Brain, TrendingUp, Settings, AlertCircle } from "lucide-react"

// Mock feature importance data
const featureImportanceData = [
  { feature: "Vibration RMS", importance: 0.35, color: "rgb(59, 130, 246)" },
  { feature: "Bearing Temperature", importance: 0.28, color: "rgb(249, 115, 22)" },
  { feature: "Vibration Kurtosis", importance: 0.18, color: "rgb(34, 197, 94)" },
  { feature: "Peak Frequency", importance: 0.12, color: "rgb(139, 92, 246)" },
  { feature: "Atmospheric Temp", importance: 0.07, color: "rgb(251, 191, 36)" },
]

// Mock failure probability data
const failureProbabilityData = [
  { hours: 0, probability: 0.02 },
  { hours: 12, probability: 0.05 },
  { hours: 24, probability: 0.12 },
  { hours: 36, probability: 0.28 },
  { hours: 48, probability: 0.52 },
  { hours: 60, probability: 0.74 },
  { hours: 72, probability: 0.89 },
  { hours: 84, probability: 0.96 },
  { hours: 96, probability: 0.99 },
]

// Mock simulation results
const getSimulationResults = (vibration: number, temperature: number) => {
  // Simple mock calculation based on input values
  const baseHealth = 100
  const vibrationImpact = (vibration - 0.1) * 150
  const temperatureImpact = (temperature - 45) * 1.5

  const health = Math.max(0, Math.min(100, baseHealth - vibrationImpact - temperatureImpact))
  const rul = Math.max(0, Math.round(health * 1.6))

  return { health: Math.round(health), rul }
}

export function AdvancedAnalytics() {
  const [vibrationValue, setVibrationValue] = useState([0.31])
  const [temperatureValue, setTemperatureValue] = useState([68.5])

  const simulationResults = getSimulationResults(vibrationValue[0], temperatureValue[0])

  return (
    <div className="space-y-6">
      <Tabs defaultValue="importance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-card">
          <TabsTrigger value="importance">Feature Importance</TabsTrigger>
          <TabsTrigger value="probability">Failure Probability</TabsTrigger>
          <TabsTrigger value="simulation">What-If Simulation</TabsTrigger>
        </TabsList>

        <TabsContent value="importance" className="space-y-6">
          {/* Feature Importance */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Feature Importance Analysis
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                SHAP values showing which features contribute most to health predictions
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={featureImportanceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgb(39, 39, 42)" />
                    <XAxis
                      type="number"
                      stroke="rgb(113, 113, 122)"
                      fontSize={12}
                      tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                    />
                    <YAxis type="category" dataKey="feature" stroke="rgb(113, 113, 122)" fontSize={12} width={120} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgb(15, 15, 20)",
                        border: "1px solid rgb(39, 39, 42)",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => [`${(value * 100).toFixed(1)}%`, "Importance"]}
                    />
                    <Bar dataKey="importance" fill="rgb(59, 130, 246)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Feature Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureImportanceData.slice(0, 3).map((feature, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{feature.feature}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold" style={{ color: feature.color }}>
                      {(feature.importance * 100).toFixed(0)}%
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        index === 0
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                      }
                    >
                      {index === 0 ? "Primary" : index === 1 ? "Secondary" : "Tertiary"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {index === 0 && "Most critical predictor"}
                    {index === 1 && "Strong correlation with failure"}
                    {index === 2 && "Moderate predictive power"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="probability" className="space-y-6">
          {/* Failure Probability Curve */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Failure Probability Curve
              </CardTitle>
              <p className="text-sm text-muted-foreground">Probability of bearing failure within the next X hours</p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={failureProbabilityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgb(39, 39, 42)" />
                    <XAxis
                      dataKey="hours"
                      stroke="rgb(113, 113, 122)"
                      fontSize={12}
                      label={{ value: "Hours from Now", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis
                      stroke="rgb(113, 113, 122)"
                      fontSize={12}
                      tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                      label={{ value: "Failure Probability", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgb(15, 15, 20)",
                        border: "1px solid rgb(39, 39, 42)",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => [`${(value * 100).toFixed(1)}%`, "Failure Probability"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="probability"
                      stroke="rgb(239, 68, 68)"
                      fill="rgba(239, 68, 68, 0.2)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Probability Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">50% Failure Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-orange-400">48 hrs</div>
                  <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/20">
                    High Risk
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">75% Failure Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-red-400">60 hrs</div>
                  <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
                    Critical
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">90% Failure Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-red-400">72 hrs</div>
                  <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
                    Imminent
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-red-400">52%</div>
                  <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
                    Now
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="simulation" className="space-y-6">
          {/* What-If Simulation */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                What-If Simulation
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Adjust sensor values to see how they affect health predictions
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Input Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Vibration RMS (g)</label>
                    <div className="space-y-2">
                      <Slider
                        value={vibrationValue}
                        onValueChange={setVibrationValue}
                        max={0.8}
                        min={0.1}
                        step={0.01}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0.1</span>
                        <span className="font-mono">{vibrationValue[0].toFixed(2)}</span>
                        <span>0.8</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bearing Temperature (°C)</label>
                    <div className="space-y-2">
                      <Slider
                        value={temperatureValue}
                        onValueChange={setTemperatureValue}
                        max={90}
                        min={45}
                        step={0.5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>45</span>
                        <span className="font-mono">{temperatureValue[0].toFixed(1)}</span>
                        <span>90</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulation Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-muted/20 border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Predicted Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <div
                        className="text-3xl font-bold"
                        style={{
                          color:
                            simulationResults.health > 70
                              ? "rgb(34, 197, 94)"
                              : simulationResults.health > 50
                                ? "rgb(251, 191, 36)"
                                : simulationResults.health > 30
                                  ? "rgb(249, 115, 22)"
                                  : "rgb(239, 68, 68)",
                        }}
                      >
                        {simulationResults.health}%
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          simulationResults.health > 70
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : simulationResults.health > 50
                              ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                              : simulationResults.health > 30
                                ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                                : "bg-red-500/10 text-red-400 border-red-500/20"
                        }
                      >
                        {simulationResults.health > 70
                          ? "Healthy"
                          : simulationResults.health > 50
                            ? "Degraded"
                            : simulationResults.health > 30
                              ? "Near Failure"
                              : "Critical"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/20 border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Predicted RUL</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <div
                        className="text-3xl font-bold"
                        style={{
                          color:
                            simulationResults.rul > 100
                              ? "rgb(34, 197, 94)"
                              : simulationResults.rul > 50
                                ? "rgb(251, 191, 36)"
                                : simulationResults.rul > 20
                                  ? "rgb(249, 115, 22)"
                                  : "rgb(239, 68, 68)",
                        }}
                      >
                        {simulationResults.rul}
                      </div>
                      <span className="text-sm text-muted-foreground">hours</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Simulation Insights */}
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5" />
                  <div className="text-sm text-blue-200">
                    <strong>Simulation Insight:</strong>{" "}
                    {simulationResults.health > 80
                      ? "Current parameters indicate healthy operation. Continue monitoring."
                      : simulationResults.health > 60
                        ? "Moderate degradation detected. Consider scheduling maintenance."
                        : simulationResults.health > 40
                          ? "Significant degradation. Maintenance should be scheduled soon."
                          : "Critical condition detected. Immediate maintenance required."}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
