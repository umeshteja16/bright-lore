import * as ProgressPrimitive from "@radix-ui/react-progress";

interface ProgressProps {
  value: number;
  className?: string;
}

export const Progress = ({ value, className = "" }: ProgressProps) => {
  return (
    <ProgressPrimitive.Root
      className={`relative h-3 w-full overflow-hidden rounded-full bg-zinc-700 ${className}`}
      value={value}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-blue-500 transition-transform duration-300 ease-linear"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </ProgressPrimitive.Root>
  );
};
