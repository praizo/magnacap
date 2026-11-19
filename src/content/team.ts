/**
 * Team shown on the About page in two groups: leadership, then the wider team
 * (MagnaCap and LILY).
 *
 * Headshots: add to public/team/ (square, at least 600px) and set `photo`.
 * Entries without a photo render an avatar placeholder.
 */
export type TeamMember = {
  name: string;
  role: string;
  /** Path under public/, e.g. "/team/jane-doe.jpg". */
  photo?: string;
};

export const leads: TeamMember[] = [
  { name: "Olayinka Olonode", role: "MD/CEO" },
  { name: "Opeoluwa Olonode", role: "Head, Investment and Trading" },
  { name: "Funmi Sanni", role: "Lead, HR" },
];

export const staff: TeamMember[] = [
  { name: "Oluwaremilekun Adeleye", role: "Fixed Income Trader" },
  { name: "Falilat Ganiyu", role: "Operations Analyst" },
  { name: "Sochima Bireagu", role: "Backend Developer" },
  { name: "Roheemoh Mudashir", role: "Frontend Developer" },
  { name: "Praise Adekunle", role: "Full Stack Engineer" },
  { name: "Ore Afolayan", role: "Growth Marketer" },
    { name: "Omolola Oladiti", role: "HR Associate" },
  { name: "Ayo Dada", role: "Social Media / Content Creator" },
  { name: "Emmanuel Adelaja", role: "Graphics Designer" },
  { name: "Favour Agen", role: "Customer Support" },
];
