/**
 * Leadership and team shown on the About page.
 *
 * PLACEHOLDERS: no names, roles or photos were supplied. Replace each entry
 * with the real person and add their headshot to public/team/ (square, at
 * least 600px). Entries with `photo: undefined` render a branded silhouette.
 * Tracked in docs/LAUNCH-CHECKLIST.md.
 */
export type TeamMember = {
  name: string;
  role: string;
  /** Path under public/, e.g. "/team/jane-doe.jpg". */
  photo?: string;
};

export const team: TeamMember[] = Array.from({ length: 8 }, () => ({
  name: "Name to be confirmed",
  role: "Role to be confirmed",
}));
