import { Card } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Data Collection",
    description:
      "IoT sensors collect real-time vibration, temperature, and performance data from NSK 6205 bearings.",
  },
  {
    number: "02",
    title: "AI Analysis",
    description:
      "Advanced machine learning models analyze patterns and detect anomalies in bearing behavior.",
  },
  {
    number: "03",
    title: "RUL Prediction",
    description:
      "System calculates remaining useful life and generates predictive maintenance recommendations.",
  },
  {
    number: "04",
    title: "Actionable Insights",
    description:
      "Receive alerts and insights to schedule maintenance before failures occur, minimizing downtime.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A seamless process from data collection to actionable maintenance
            insights.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-8 h-full">
                <div className="space-y-4">
                  <div className="text-5xl font-bold text-accent/30">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Card>
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 w-8 h-0.5 bg-gradient-to-r from-accent/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
