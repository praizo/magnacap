/** Short list with orange check marks, used on the services pages. */
export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3 font-medium">
          <span aria-hidden="true" className="grid size-6 flex-none place-items-center rounded-full bg-signal text-ink">
            <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m4 8.5 2.5 2.5L12 5.5" /></svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
