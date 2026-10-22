# Bloom Taxonomy — Version 1

Static, mobile-first, installable reference web app. No accounts, backend, AI service, or database server.

## Run and publish

- Upload all files in this folder to a GitHub repository (repository root is simplest).
- In GitHub Settings → Pages, select **Deploy from a branch**, branch `main`, folder `/ (root)`.
- Visit the published `https://<your-username>.github.io/<repository>/` URL.
- On iPhone: open in Safari → Share → Add to Home Screen.
- For local testing, use a local HTTP server such as `python -m http.server 8000`, then open http://localhost:8000. Service workers require HTTP localhost or HTTPS.

## Taxonomy data

Source: user-provided `Blooms-Taxonomy-Indicator-v3.32-1.xls`. `taxonomy.json` is the editable reference file. `data.js` is the browser-consumed copy; regenerate it from `taxonomy.json` after editing. The master Sheet1 classifications are authoritative for this first version. Sheet4 was used as a cross-check. See `data-review.json` for discrepancy records.

The workbook is a legacy source, **not independently academically validated**. One discrepancy was detected: *order* is A4/C5 in master Sheet1 and A4/C6 in Sheet4. Some assessment methods from the workbook are broad or specialised, and may require updating for your institution. Existing workbook content is used for preliminary reference only.

## Important limitations

- CLO checker is rule-based: simple opening-verb search, vague-word flags, multiple-verb warnings and tentative level indications.
- A recognised verb is NOT proof that a CLO is measurable or aligned with assessment.
- A verb may legitimately align with multiple levels or domains depending on performance context.
- Legacy Excel macros are not used.
- Future changes to files are picked up by online-first caching; the home-screen app can work offline after its first successful online load.
