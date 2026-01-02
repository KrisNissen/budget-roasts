import { useSnark, SnarkLevel } from "@/lib/snark-context";
import { cn } from "@/lib/utils";
import { Flame, Zap, Skull } from "lucide-react";

const levels: { value: SnarkLevel; label: string; icon: React.ReactNode; description: string }[] = [
  { value: "low", label: "Gentle", icon: <Zap className="h-4 w-4" />, description: "Light teasing" },
  { value: "medium", label: "Spicy", icon: <Flame className="h-4 w-4" />, description: "Sarcastic jabs" },
  { value: "nuclear", label: "Nuclear", icon: <Skull className="h-4 w-4" />, description: "No mercy" },
];

export function SnarkToggle() {
  const { snarkLevel, setSnarkLevel } = useSnark();

  return (
    <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
      {levels.map((level) => (
        <button
          key={level.value}
          onClick={() => setSnarkLevel(level.value)}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
            snarkLevel === level.value
              ? level.value === "nuclear"
                ? "bg-destructive text-destructive-foreground shadow-lg shadow-destructive/30"
                : level.value === "medium"
                ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30"
                : "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label={`Set snark level to ${level.label}: ${level.description}`}
          title={level.description}
        >
          {level.icon}
          <span className="hidden sm:inline">{level.label}</span>
        </button>
      ))}
    </div>
  );
}
