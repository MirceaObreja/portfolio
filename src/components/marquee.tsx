export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <ul className="marquee-track flex w-max gap-12 py-2 text-[15px] font-medium text-muted-foreground" aria-label="Kunden und Branchen">
        {row.map((t, i) => (
          <li key={i} aria-hidden={i >= items.length} className="flex items-center gap-12 whitespace-nowrap">
            {t}
            <svg viewBox="0 0 64 24" className="h-2 w-5 opacity-40" aria-hidden><path d="M1 12 L16 1 L31 12 L16 23Z M33 12 L48 1 L63 12 L48 23Z" fill="currentColor" /></svg>
          </li>
        ))}
      </ul>
    </div>
  );
}
