interface Props {
  icon: string;
  title: string;
  description: string;
  ctaLabel?: string;
  onCta?: () => void;
}

export default function EmptyState({ icon, title, description, ctaLabel, onCta }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
      <span className="text-4xl opacity-30">{icon}</span>
      <div>
        <h3 className="text-sm font-semibold text-ink-800">{title}</h3>
        <p className="text-xs text-ink-400 mt-1 max-w-xs">{description}</p>
      </div>
      {ctaLabel && onCta && (
        <button
          onClick={onCta}
          className="mt-2 px-4 py-2 bg-ink-950 hover:bg-ink-800 text-white text-xs font-semibold rounded-sm tracking-tight transition-colors"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
