interface InputType extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactElement;
}

export default function InputField({ label, icon, ...props }: InputType) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-text-muted">
        {label}
      </label>
      <div className="relative">
        <p className="absolute left-3 top-3 text-text-muted w-5 h-5">{icon}</p>
        <input
          {...props}
          required
          className="w-full pl-10 pr-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/40 focus:outline-none"
        />
      </div>
    </div>
  );
}
