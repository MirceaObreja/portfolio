/** Überschrift, deren Wörter beim Laden nacheinander auftauchen (reines CSS, funktioniert ohne JavaScript). */
export function HeroTitle({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <h1 className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="word" style={{ animationDelay: `${120 + i * 70}ms` }}>
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </h1>
  );
}
