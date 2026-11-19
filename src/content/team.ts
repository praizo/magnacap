/**
 * Team shown on the About page: staff listed as "Magnacap" or "Both" on the
 * company roster (LILY-only staff are left out).
 *
 * Headshots: add to public/team/ (square, at least 600px) and set `photo`.
 * Entries without a photo render a branded silhouette.
 */
export type TeamMember = {
  name: string;
  role: string;
  /** Path under public/, e.g. "/team/jane-doe.jpg". */
  photo?: string;
};

export const team: TeamMember[] = [
  { name: "Olayinka Olonode", role: "MD/CEO" },
  { name: "Opeoluwa Olonode", role: "Head, Investment and Trading" },
  { name: "Funmi Sanni", role: "Lead, HR" },
  { name: "Omolola Oladiti", role: "HR Support" },
  { name: "Falilat Ganiyu", role: "Operations Analyst" },
  { name: "Praise Adekunle", role: "Full Stack Engineer" },
  { name: "Oluwaremilekun Adeleye", role: "Fixed Income Trader" },
];
