import {
  Activity,
  TrendingUp,
  Zap,
  BarChart3,
  Shield,
  Cpu,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Activity,
    title: "Real-time Health Monitoring",
    description:
      "Continuous monitoring of bearing vibration, temperature, and performance metrics with instant alerts.",
  },
  {
    icon: TrendingUp,
    title: "RUL Prediction",
    description:
      "Advanced AI algorithms predict remaining useful life with high accuracy, enabling proactive maintenance scheduling.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Comprehensive dashboards with detailed insights into bearing degradation patterns and maintenance trends.",
  },
  {
    icon: Zap,
    title: "AI-Powered System",
    description:
      "Machine learning models trained on thousands of bearing datasets for superior prediction accuracy.",
  },
  {
    icon: Shield,
    title: "Preventive Maintenance",
    description:
      "Reduce downtime and extend equipment lifespan by addressing issues before critical failures occur.",
  },
  {
    icon: Cpu,
    title: "Industrial IoT Integration",
    description:
      "Seamless integration with existing industrial systems and IoT sensors for comprehensive monitoring.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Powerful Features for Predictive Maintenance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to monitor, predict, and maintain bearing health
            with confidence.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:border-accent/50 transition-colors group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
