import { NavLink } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">
              AI-Powered Predictive Maintenance
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            Real-time Predictive Maintenance for NSK 6205 Ball Bearings
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Monitor bearing health in real-time, predict remaining useful life
            with AI precision, and prevent costly equipment failures before they
            happen.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <NavLink to="/dashboard">
              <Button
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </NavLink>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">93.2%</div>
              <p className="text-sm text-muted-foreground">
                Prediction Accuracy
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">Real-time</div>
              <p className="text-sm text-muted-foreground">Health Monitoring</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">24/7</div>
              <p className="text-sm text-muted-foreground">System Uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated bearing visualization */}
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10 pointer-events-none">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full animate-spin"
          style={{ animationDuration: "20s" }}
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="100" cy="100" r="20" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
