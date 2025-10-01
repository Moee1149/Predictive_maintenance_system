import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Settings, Zap, Clock, Cpu } from "lucide-react"

export function ProjectOverview() {
  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-balance gradient-text leading-tight">Bearing Health Monitoring</h1>
          <h2 className="text-2xl font-medium text-muted-foreground/80">RUL Prediction System</h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Real-time predictive maintenance for NSK 6205 Ball Bearing with advanced analytics and health monitoring
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="status-indicator bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
            <Activity className="w-4 h-4" />
            System Active
          </Badge>
          <Badge className="status-indicator bg-blue-500/20 text-blue-300 border-blue-500/30">
            <Cpu className="w-4 h-4" />
            AI Monitoring
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="metric-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Bearing Type
            </CardTitle>
            <div className="icon-container bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/15">
              <Settings className="h-6 w-6 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-4xl font-bold gradient-text">NSK 6205</div>
            <p className="text-sm text-muted-foreground font-medium">Ball Bearing</p>
          </CardContent>
        </Card>

        <Card className="metric-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Operating Speed
            </CardTitle>
            <div className="icon-container bg-gradient-to-br from-chart-1/20 to-chart-1/10 group-hover:from-chart-1/30 group-hover:to-chart-1/15">
              <Zap className="h-6 w-6 text-chart-1" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-4xl font-bold text-chart-1">
              1775 <span className="text-xl text-muted-foreground font-medium">RPM</span>
            </div>
            <p className="text-sm text-muted-foreground font-medium">1770-1780 Range</p>
          </CardContent>
        </Card>

        <Card className="metric-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Load Conditions
            </CardTitle>
            <div className="icon-container bg-gradient-to-br from-chart-2/20 to-chart-2/10 group-hover:from-chart-2/30 group-hover:to-chart-2/15">
              <Activity className="h-6 w-6 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-4xl font-bold text-chart-2">
              5.88 <span className="text-xl text-muted-foreground font-medium">kN</span>
            </div>
            <p className="text-sm text-muted-foreground font-medium">Vertical: 5.88kN, Axial: 2.94kN</p>
          </CardContent>
        </Card>

        <Card className="metric-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Monitoring Duration
            </CardTitle>
            <div className="icon-container bg-gradient-to-br from-chart-3/20 to-chart-3/10 group-hover:from-chart-3/30 group-hover:to-chart-3/15">
              <Clock className="h-6 w-6 text-chart-3" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-4xl font-bold text-chart-3">
              164 <span className="text-xl text-muted-foreground font-medium">hrs</span>
            </div>
            <p className="text-sm text-muted-foreground font-medium">Start → Failure</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
