import { MapPin } from "lucide-react";
import RippleButton from "./animata/button/ripple-button";
import { Link } from "react-router-dom";
import HandWrittenTitle from "./ui/hand-writing-text";
export function Navigation() {
  return (
    <nav className="px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <MapPin className="h-8 w-8 text-primary" />
          <HandWrittenTitle title="CivicReport" />
        </div>

        {/* Links with Hover Effect */}
        {/* Increased spacing from space-x-6 to space-x-8 for better visual separation */}
        <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
          <a
            href="#how-it-works"
            // 1. Added 'relative' and 'group' to enable the hover effect on a child element.
            // 2. Kept transition-colors for the text color change.
            className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
          >
            How It Works
            {/* 3. This span creates the animated underline. */}
            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
          </a>
          <a
            href="#features"
            className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
          >
            Features
            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
          </a>
          <a
            href="#contact"
            className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
          >
            Contact
            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/login">
            <RippleButton>Login</RippleButton>
          </Link>
          <Link to="/Signup">
            <RippleButton>SignUp</RippleButton>
          </Link>
        </div>
      </div>
    </nav>
  );
}
