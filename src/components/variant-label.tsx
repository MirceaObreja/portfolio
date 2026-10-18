/** Vorübergehende Kennzeichnung für Designvarianten zur Auswahl. */
export function VariantLabel({ name, text }: { name: string; text: string }) {
  return (
    <div className="container-page mb-4 mt-10 flex flex-wrap items-center gap-3 first:mt-0">
      <span className="rounded-full bg-ink px-3 py-1 text-[13px] font-medium text-white">{name}</span>
      <span className="text-[14px] text-muted-foreground">{text}</span>
    </div>
  );
}
