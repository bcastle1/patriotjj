# American Heritage Patriots Jiu-Jitsu App

This folder contains a static, embeddable prototype for American Heritage Patriots Jiu-Jitsu camp registration, Venmo checkout, team store ordering, reviews, Q&A, and admin management.

Open `index.html` or serve the folder locally. The app includes:

- Flyer-inspired public landing page with local flyer asset.
- Web-optimized realistic Jiu-Jitsu camp imagery, including younger students in red shirts, teenagers in blue shirts, white gi pants, a mirror wall, distant/back-facing trainers, and actual American Heritage Patriots logo overlays on visible shirts.
- Separate About Us page for Bradley Castle and Erik Castle, with instructor background, education notes, Jiu-Jitsu focus areas, source notes, and replaceable portrait assets.
- American Heritage School and American Heritage Patriots logo/campus imagery used on the public pages.
- Flyer/brochure library with the original flyer, active public flyer selection, upload, editable copy fields, generated printable flyer graphics, previews, and downloads.
- Camp event list for Session 1, Session 2, and the both-sessions discount.
- Participant signup form with age, gender, guardian, address, email, phone, session, and grade track.
- Required waiver/release during signup with typed electronic signature, electronic-record consent, signed waiver snapshot, and customer/admin print options.
- Venmo checkout links for `@bcastle1`, payment memo generation, payment history, and demo receipt recording.
- Team store with fit, size, quantity, and admin-editable pricing.
- Realistic team-store product mockups for each item, plus admin image upload, generated item graphics, logo/slogan fields, downloadable mockups, and suggested design ideas.
- Q&A, reviews, contact links, email link, website link, and Venmo link.
- Demo admin login, participant filters, CSV export, participant detail view, payment history, signed waiver view/print, waiver template editor, payment status toggles, event editor, store editor, flyer/brochure editor, media libraries, and 20 starter music tracks.

## Demo Admin

Admin section password:

```text
patriot
```

This is interface-level protection for the prototype only. A production version should use server-side authentication.

## Website Embed

Use `?embed=1` to hide the sticky navigation when embedding.

```html
<iframe
  id="patriot-jj-app"
  src="https://your-site.com/patriot-jj/index.html?embed=1"
  title="American Heritage Patriots Jiu-Jitsu signup and payment app"
  style="width:100%; min-height:980px; border:0;"
></iframe>
```

Optional auto-height listener:

```html
<script>
  window.addEventListener("message", (event) => {
    if (event.data?.type !== "patriotJj:height") return;
    const frame = document.querySelector("#patriot-jj-app");
    if (frame) frame.style.height = `${event.data.height}px`;
  });
</script>
```

## Production Notes

The prototype stores data in `localStorage`, so each browser has its own demo database. Real deployment should connect participants, orders, media, receipts, authentication, and payment reconciliation to a backend.

Venmo does not automatically confirm payment to this static app. The prototype records payment when the user or admin clicks the record/paid action. For production, use a supported payment workflow, backend reconciliation, or manual admin verification before sending final receipts.

The waiver is a practical prototype template, not legal advice. Have a Utah attorney review the final release language, electronic-signature workflow, retention policy, and minor/guardian signing process before production use.
