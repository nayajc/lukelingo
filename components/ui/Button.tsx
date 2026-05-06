import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:   'bg-brand-purple text-white hover:bg-purple-600 border border-brand-purple shadow-sm',
  secondary: 'bg-white text-ink-900 hover:bg-brand-purple-light border border-brand-purple/30',
  ghost:     'text-ink-600 hover:text-brand-purple hover:bg-brand-purple-light border border-transparent',
  danger:    'bg-brand-coral text-white hover:bg-red-500 border border-brand-coral',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2 text-sm',
  lg: 'px-7 py-3 text-sm',
};

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: Props) {
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 font-bold transition-all rounded-full disabled:opacity-40 disabled:cursor-not-allowed tracking-tight ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
