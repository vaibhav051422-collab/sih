import { Card } from "@/components/ui/card";
import { MapPin, Smartphone, CheckCircle } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-6 py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-white">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Three simple steps to make your voice heard and improve your
            community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-card/95 backdrop-blur-sm border-gray-700 p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Smartphone className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-4">
              1. Spot & Snap
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              See a pothole, broken streetlight, or graffiti? Take a photo with
              our mobile app and your location is automatically captured.
            </p>
          </Card>

          <Card className="bg-card/95 backdrop-blur-sm border-gray-700 p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/30">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-4">
              2. Report & Route
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Your report is instantly routed to the right department. GPS
              coordinates ensure precise location tracking.
            </p>
          </Card>

          <Card className="bg-card/95 backdrop-blur-sm border-gray-700 p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-4">
              3. Track & Resolve
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Get real-time updates on your report's progress. See when it's
              assigned, in progress, and completed.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
