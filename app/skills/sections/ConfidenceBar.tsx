export default function ConfidenceBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-background border border-border rounded-full h-3 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all"
        style={{ width: `${Math.max(4, Math.min(100, value))}%` }}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
