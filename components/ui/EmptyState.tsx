interface Props {
  icon: string;
  title: string;
  description: string;
  ctaLabel?: string;
  onCta?: () => void;
}

export default function EmptyState({ icon, title, description, ctaLabel, onCta }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
      <span className="text-5xl">{icon}</span>
      <h3 className="text-lg font-semibold text-stone-700">{title}</h3>
      <p className="text-sm text-stone-400 max-w-xs">{description}</p>
      {ctaLabel && onCta && (
        <button
          onClick={onCta}
          className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
