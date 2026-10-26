# MagnaCap Limited — website

Next.js 16 (App Router, TypeScript, Tailwind CSS v4). All routes are statically prerendered.

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build && npm run start
```

- Company copy lives in `src/content/site.ts`. Claims awaiting confirmation are flagged there.
- Design direction and tokens are in `docs/DESIGN.md`.
- Outstanding items before go-live are in `docs/LAUNCH-CHECKLIST.md`.
- Optional: set `NEXT_PUBLIC_CONTACT_ENDPOINT` to send the contact form to a backend.
