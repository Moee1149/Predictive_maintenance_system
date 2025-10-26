import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "John Chen",
    role: "Maintenance Director",
    company: "Advanced Manufacturing Co.",
    content:
      "This system has reduced our unplanned downtime by 40%. The RUL predictions are incredibly accurate.",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    role: "Operations Manager",
    company: "Industrial Solutions Inc.",
    content:
      "The real-time monitoring gives us peace of mind. We can now schedule maintenance proactively instead of reactively.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Plant Engineer",
    company: "Global Manufacturing Ltd.",
    content:
      "Outstanding accuracy and reliability. The system has paid for itself many times over in prevented failures.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what maintenance professionals are saying about our predictive
            maintenance system.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="space-y-4">
                {/* Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-accent">{testimonial.company}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
