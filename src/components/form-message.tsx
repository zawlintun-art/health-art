import { cn } from "@/lib/utils";

type FormMessageProps = {
  message?: string;
  tone?: "default" | "error";
};

export function FormMessage({ message, tone = "default" }: FormMessageProps) {
  if (!message) return null;

  return (
    <p
      className={cn(
        "text-sm",
        tone === "error" ? "text-destructive" : "text-muted-foreground"
      )}
      aria-live="polite"
    >
      {message}
    </p>
  );
}
