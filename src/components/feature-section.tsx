import { MapIcon, Users, CheckCircle } from "lucide-react";
import featureImg from "@/assets/feature.png"; // ✅ Import image

export function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white">
                Built for Citizens, Trusted by Government
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Our platform bridges the communication gap between residents and
                local authorities with cutting-edge technology.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <MapIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    GPS-Powered Precision
                  </h3>
                  <p className="text-gray-300">
                    Automatic location detection ensures your reports reach the
                    right department instantly.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Community Dashboard
                  </h3>
                  <p className="text-gray-300">
                    See what issues your neighbors are reporting and track
                    community improvements.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Real-Time Updates
                  </h3>
                  <p className="text-gray-300">
                    Get notifications when your report is received, assigned,
                    and resolved.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Image */}
          <div className="relative">
            <img
              src={featureImg} // ✅ Fixed path
              alt="Civic reporting dashboard interface"
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
