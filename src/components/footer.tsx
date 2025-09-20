import { MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="px-6 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-white">CivicReport</span>
            </div>
            <p className="text-gray-400">
              Connecting citizens with local government for a better community.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white">Platform</h4>
            <div className="space-y-2 text-gray-400">
              <div>Mobile App</div>
              <div>Web Portal</div>
              <div>API Access</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white">Support</h4>
            <div className="space-y-2 text-gray-400">
              <div>Help Center</div>
              <div>Community Forum</div>
              <div>Contact Support</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>suryanshsingh13763@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>7080110640</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 CivicReport. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
