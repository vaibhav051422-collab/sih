import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero.png"; // ✅ Import image

export function HeroSection() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight text-balance">
                Report Civic Problems in{" "}
                <span className="text-primary">Just One Click</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed text-pretty">
                Bridge the gap between citizens and local government. Make your
                city cleaner, safer, and smarter.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                >
                  Report an Issue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-sm text-gray-400">Issues Resolved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400">Cities Connected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24h</div>
                <div className="text-sm text-gray-400">Avg Response</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <Card className="bg-card/95 backdrop-blur-sm border-gray-700 p-8">
              <div className="space-y-6">
                <img
                  src={heroImg} // ✅ Fixed path
                  alt="Civic reporting mobile app interface"
                  className="w-full rounded-lg"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
