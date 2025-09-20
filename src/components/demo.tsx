import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/3d-testimonial";

// Civic reporting themed testimonials
const testimonials = [
  {
    name: "Sarah Chen",
    username: "@sarahc",
    body: "Reported a broken streetlight and it was fixed within 48 hours!",
    img: "/professional-woman-smiling.png",
    country: "🇺🇸 USA",
  },
  {
    name: "Marcus Johnson",
    username: "@marcus",
    body: "No more calling city hall for hours. Just snap and report!",
    img: "/middle-aged-man-professional.jpg",
    country: "🇺🇸 USA",
  },
  {
    name: "Elena Rodriguez",
    username: "@elena",
    body: "Love the transparency - I can track my reports in real-time.",
    img: "/young-latina-woman-smiling.png",
    country: "🇺🇸 USA",
  },
  {
    name: "David Kim",
    username: "@david",
    body: "Reported graffiti and watched the city respond immediately.",
    img: "/asian-man-professional-headshot.png",
    country: "🇺🇸 USA",
  },
  {
    name: "Jennifer Walsh",
    username: "@jen",
    body: "Perfect tool for community organizing and tracking issues.",
    img: "/professional-woman-business-attire.png",
    country: "🇺🇸 USA",
  },
  {
    name: "Ahmed Hassan",
    username: "@ahmed",
    body: "Simple, fast, effective civic engagement platform.",
    img: "/middle-eastern-professional.png",
    country: "🇺🇸 USA",
  },
  {
    name: "Maria Santos",
    username: "@maria",
    body: "Finally, a way to make our voices heard by local government.",
    img: "/professional-woman-diverse.png",
    country: "🇺🇸 USA",
  },
  {
    name: "Robert Taylor",
    username: "@rob",
    body: "Neighborhood safety improved thanks to easy reporting.",
    img: "/professional-man.png",
    country: "🇺🇸 USA",
  },
  {
    name: "Lisa Park",
    username: "@lisa",
    body: "Great for coordinating community improvement projects.",
    img: "/asian-woman-professional.png",
    country: "🇺🇸 USA",
  },
];

function TestimonialCard({
  img,
  name,
  username,
  body,
  country,
}: (typeof testimonials)[number]) {
  return (
    <Card className="w-50 bg-white text-black shadow-md">
      <CardContent>
        <div className="flex items-center gap-2.5">
          <Avatar className="size-9">
            <AvatarImage src={img || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium text-foreground flex items-center gap-1">
              {name} <span className="text-xs">{country}</span>
            </figcaption>
            <p className="text-xs font-medium text-muted-foreground">
              {username}
            </p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm text-secondary-foreground">
          {body}
        </blockquote>
      </CardContent>
    </Card>
  );
}

export default function ThreeDTestimonials() {
  return (
    <div className="border border-border rounded-lg relative flex h-96 w-full max-w-[1100px] flex-row items-center justify-center overflow-hidden gap-1.5 [perspective:800px] mx-auto">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        {/* Vertical Marquee (downwards) */}
        <Marquee
          vertical
          pauseOnHover
          repeat={3}
          className="[--duration:18s] [--gap:2rem]"
        >
          {testimonials.map((review) => (
            <TestimonialCard key={review.username} {...review} />
          ))}
        </Marquee>
        {/* Vertical Marquee (upwards) */}
        <Marquee
          vertical
          pauseOnHover
          reverse
          repeat={3}
          className="[--duration:18s] [--gap:2rem]"
        >
          {testimonials.map((review) => (
            <TestimonialCard key={review.username} {...review} />
          ))}
        </Marquee>
        {/* Vertical Marquee (downwards) */}
        <Marquee
          vertical
          pauseOnHover
          repeat={3}
          className="[--duration:18s] [--gap:2rem]"
        >
          {testimonials.map((review) => (
            <TestimonialCard key={review.username} {...review} />
          ))}
        </Marquee>
        {/* Vertical Marquee (upwards) */}
        <Marquee
          vertical
          pauseOnHover
          reverse
          repeat={3}
          className="[--duration:18s] [--gap:2rem]"
        >
          {testimonials.map((review) => (
            <TestimonialCard key={review.username} {...review} />
          ))}
        </Marquee>
        {/* Gradient overlays for vertical marquee */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </div>
  );
}
