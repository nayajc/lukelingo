import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:   'bg-ink-950 text-white hover:bg-ink-800 border border-ink-950',
  secondary: 'bg-white text-ink-900 hover:bg-ink-100 border border-ink-200',
  ghost:     'text-ink-600 hover:text-ink-950 hover:bg-ink-100 border border-transparent',
  danger:    'bg-ink-950 text-white hover:bg-ink-800 border border-ink-950',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-sm',
};

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: Props) {
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 font-medium transition-colors rounded-sm disabled:opacity-40 disabled:cursor-not-allowed tracking-tight ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
