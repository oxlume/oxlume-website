# oxlume-website

Source of the [Oxlume](https://oxlume.com) website, oxlume.com, in English, Ukrainian, German and Spanish.

![Oxlume](https://raw.githubusercontent.com/oxlume/brand-assets/main/social-preview.png)

## What it is

The public site of Oxlume, an AI video host that turns a small business's phone photos into weekly, ready-to-post short videos. It explains the product, the technology, pricing, trust principles and roadmap, and has a live demo and a beta sign-up form.

## Technology

- Plain static HTML, CSS and JavaScript. No framework, no build step, no backend.
- Shared header, footer and language switcher are rendered by `site.js`.
- Fonts (Sora, Manrope, IBM Plex Mono) are loaded from Google Fonts.
- Forms do not send data to a server: they open the visitor's email app with a message to hello@oxlume.com.
- No cookies and no analytics. The browser's local storage keeps only the chosen language and any roadmap votes.

## Languages

All pages are written in English in the HTML. Ukrainian, German and Spanish are applied in the browser from dictionary files; the choice is remembered on the visitor's device.

| File | Language |
|---|---|
| `i18n.js` | English (default) |
| `i18n-uk.js` | Ukrainian (UA in the switcher) |
| `i18n-de.js` | German |
| `i18n-es.js` | Spanish |

## Structure

```
index.html        Home
product.html      Product, by type of business
technology.html   How the AI pipeline works
pricing.html      Plans and savings calculator
demo.html         Live demo in the browser
trust.html        Trust and safety, compliance
roadmap.html      Roadmap and changelog
about.html        Company and founder
faq.html          Questions and answers
contact.html      Beta sign-up and contacts
privacy.html      Privacy policy (draft)
terms.html        Terms (draft)
site.css          Styles
site.js           Header, footer, language switch, interactions
i18n*.js          Translations
img/              Sample photos used in the demo
```

## Run locally

```bash
git clone https://github.com/oxlume/oxlume-website.git
cd oxlume-website
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Licence

Copyright © 2026 Oxlume. All rights reserved. See [LICENSE](LICENSE). The fonts are loaded from Google Fonts and are licensed by their authors under the SIL Open Font License 1.1.

## Contact

[info@oxlume.com](mailto:info@oxlume.com). Found a typo or a broken link? Open an issue. Security issues go to [security@oxlume.com](mailto:security@oxlume.com).
