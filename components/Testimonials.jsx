import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
  {
    quote:
      "ZenCash gave me real-time visibility into our burn rate and cash flow. It’s become an essential tool for keeping our startup financially healthy.",
    name: "David Patel",
    designation: "Startup Founder",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Managing hundreds of transactions used to be overwhelming. Now I can easily track profits, expenses, and taxes — all in one place.",
    name: "Laura Kim",
    designation: "E-commerce Seller",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "ZenCash saves me hours of manual bookkeeping every month. I finally have a clear picture of where my money is going.",
    name: "James O'Connor",
    designation: "Consultant",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Traveling between countries is much easier now. ZenCash’s multi-currency support helps me manage finances without hidden fees or confusion.",
    name: "Sophia Müller",
    designation: "Digital Nomad",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

  return <AnimatedTestimonials testimonials={testimonials} />;
}
