/** Decorative geometry derived from MagnaCap's shield and stepped brand marks. */
export function BrandEmblem() {
  return (
    <svg viewBox="0 0 480 560" fill="none" className="brand-emblem" aria-hidden="true">
      <path className="emblem-face" d="M95 139 287 68l105 25v190c0 104-72 176-154 219C153 458 95 389 95 291Z" />
      <path className="emblem-facet" d="m238 87 49-19 105 25v190c0 104-72 176-154 219Z" />
      <g className="emblem-contours">
        <path d="M67 119 286 38l134 32v213c0 120-86 202-182 248C137 482 67 405 67 291Z" />
        <path d="M39 99 285 8l163 39v236c0 138-101 227-210 277C121 507 39 421 39 291Z" />
        <path d="m123 159 162-60 79 19v165c0 86-57 148-126 187-70-40-115-98-115-179Z" />
        <path d="m151 179 132-49 53 13v140c0 67-42 119-98 156-55-35-87-82-87-148Z" />
      </g>
      <path className="emblem-stripe" d="m67 119 135-50v13L67 132Zm0 27 135-50v6L67 152Z" />
    </svg>
  );
}
