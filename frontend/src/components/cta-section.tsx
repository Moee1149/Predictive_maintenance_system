import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

export default function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 p-12 text-center space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Ready to Transform Your Maintenance Strategy?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start monitoring bearing health and predicting failures with our
            AI-powered system today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <NavLink to="/dashboard">
              <Button
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                Start Monitoring Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </NavLink>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
