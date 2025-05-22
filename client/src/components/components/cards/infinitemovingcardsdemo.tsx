import { InfiniteMovingCards } from "./infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Every paper shared today becomes the torch that guides someone else tomorrow.",
    name: "BrightLore Community",
    title: "Together We Learn",
  },
  {
    quote:
      "The future of education is not just digital — it's collaborative, searchable, and intelligent.",
    name: "BrightLore AI",
    title: "Your Study Assistant",
  },
  {
    quote:
      "Behind every solved problem is a learner who dared to ask the right question.",
    name: "BrightLore Vision",
    title: "Learning Reimagined",
  },
  {
    quote:
      "A question asked by one student is a doubt clarified for thousands — that’s the power of shared knowledge.",
    name: "BrightLore Platform",
    title: "Built for You",
  },
  {
    quote:
      "AI is not here to replace hard work — it’s here to guide it more wisely.",
    name: "BrightLore Engine",
    title: "Smart Learning Core",
  },
  {
    quote:
      "Your struggle today becomes someone’s shortcut tomorrow. Keep sharing.",
    name: "BrightLore Uploads",
    title: "Community Driven",
  },
  {
    quote:
      "Every document is a spark, and BrightLore is the network that turns sparks into light.",
    name: "BrightLore Archive",
    title: "Illuminate Together",
  },
  {
    quote:
      "Don’t study harder — study brighter. Let AI simplify what’s complex.",
    name: "BrightLore AI",
    title: "Simplicity Meets Clarity",
  },
  {
    quote: "From confusion to clarity, one paper at a time.",
    name: "BrightLore Assistant",
    title: "Your AI Study Partner",
  },
  {
    quote:
      "Bright minds don’t compete, they collaborate. BrightLore was built for that.",
    name: "BrightLore Foundation",
    title: "Peer-powered Progress",
  },
];
