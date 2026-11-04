# Gold Gym - Team Project

Responsive six-page fitness club website created by **Yelnur Akhmetzhan, Akejan Ahmetov and Alikhan Yertaiuly** (AITU, SE-2504).

**Live site:** (https://alikhan960.github.io/asignment-6-web/index.html)

## Team and pages

| Member | Role | Pages |
| --- | --- | --- |
| Yelnur Akhmetzhan | Frontend Developer | `index.html`, `about.html` |
| Akejan Ahmetov | UI & CSS Developer | `prices.html`, `trainers.html` |
| Alikhan Yertaiuly | Content & QA Developer | `locations.html`, `contact.html` |

## Page features

| Page | Features |
| --- | --- |
| Home | Responsive typography, CSS-only 3-card group (media queries, Flexbox inside cards), Bootstrap grid hero |
| About | Two-column grid (`col-lg-6`), Bootstrap cards with circular team photos |
| Prices | Responsive table, `btn-group`, button sizes and disabled state, Flexbox utilities |
| Trainers | Bootstrap card grid (`row-cols-*`), Flexbox card bodies with equal height |
| Locations | Nine-image carousel, three-column grid (`col-lg-4`), `container-fluid` |
| Contact | Bootstrap form: `form-control`, `input-group`, `form-select`, radio buttons, checkbox |

## Technologies

HTML5 semantic elements, CSS media queries (breakpoints 576 px and 992 px), CSS Grid, Flexbox, Bootstrap 5.3.3 from the official CDN (grid, spacing utilities, navbar, buttons, carousel, cards, form controls). The gold theme is applied to Bootstrap through its own CSS variables (`--bs-btn-*`, `--bs-link-color-rgb`), so Bootstrap components keep their standard classes (`btn-warning`, `btn-outline-warning`).

## Structure

```
index.html  about.html  prices.html  trainers.html  locations.html  contact.html
css/styles.css
images/
```

## How to run

Open `index.html` in a browser (internet is needed for the Bootstrap CDN), or publish the repository root with GitHub Pages (Settings, Pages, Deploy from a branch, `main`, `/ (root)`). All project files use relative paths.

## Accessibility

Semantic `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`; `alt` text on every image; `label` for every form field; `aria-label` on the navigation and its toggle button; visually hidden text on carousel controls; text contrast is above 6.8:1 everywhere.

## Assignment 4 - JavaScript

| Task | File | Where | Author |
| --- | --- | --- | --- |
| 1. Form validation (name, email, password length, confirmation, message, consent) | `js/validation.js` | `contact.html` | Alikhan Yertaiuly |
| 2. FAQ accordion with smooth transition | `js/accordion.js` | `prices.html` | Yelnur Akhmetzhan |
| 3. Popup subscription form | `js/popup.js` | button "Subscribe" on every page | Akejan Ahmetov |
| 4. Change background colour | `js/background.js` | button on every page | Akejan Ahmetov |
| 5. Current date and time | `js/datetime.js` | tools bar on every page | Yelnur Akhmetzhan |

## Assignment 5 - Advanced JavaScript and DOM manipulation

| Task | File | Where |
| --- | --- | --- |
| Day / Night theme switch (class toggle + CSS variables) | `js/theme.js` | button in the tools bar, every page |
| Sound effects (Web Audio API, one sound at a time, on/off button) | `js/sound.js` | every page |
| Arrow-key navigation in the menu (`keydown`, `switch`) | `js/keyboard-nav.js` | every page |
| Greeting by time of day + name input (`switch`, `getElementById`) | `js/greeting.js` | `index.html` |
| Workout of the day (objects, arrays, loops, filter / reduce / forEach) | `js/workout.js` | `index.html` |
| BMI calculator (object with methods, `switch`, reset button) | `js/bmi.js` | `index.html` |
| Coach filter (`switch`) and star ratings (`querySelectorAll`) | `js/trainers.js` | `trainers.html` |
| Multi-step membership form (Next / Back with a callback, Reset) | `js/membership.js` | `prices.html` |
| Reset button for the contact form | `js/contact-reset.js` | `contact.html` |

All new styling is in `css/styles.css` (section "Assignment 5"); no inline styles or scripts in the HTML.

## Assignment 6 - jQuery

jQuery 3.7.1 (`js/vendor/jquery-3.7.1.min.js`) is loaded on every page, followed by `js/jq-core.js` and the script of the page.

| Task | File | Where | Author |
| --- | --- | --- | --- |
| 1. Reading progress bar and back-to-top button | `js/jq-core.js` | every page | Yelnur Akhmetzhan |
| 2. Toast notifications (`GGToast`) | `js/jq-core.js` | every page | Yelnur Akhmetzhan |
| 3. Animated statistics counters | `js/jq-counters.js` | `index.html` | Yelnur Akhmetzhan |
| 4. Live coach search with highlighting | `js/jq-trainers.js` | `trainers.html` | Akejan Ahmetov |
| 5. Coach details with `slideToggle` | `js/jq-trainers.js` | `trainers.html` | Akejan Ahmetov |
| 6. Monthly / yearly price switch | `js/jq-prices.js` | `prices.html` | Akejan Ahmetov |
| 7. Click a table row to choose a plan | `js/jq-prices.js` | `prices.html` | Alikhan Yertaiuly |
| 8. FAQ expand all / collapse all | `js/jq-prices.js` | `prices.html` | Alikhan Yertaiuly |
| 9. Contact form: character counter and phone field | `js/jq-contact.js` | `contact.html` | Alikhan Yertaiuly |
| 10. Team cards fade effect | `js/jq-about.js` | `about.html` | Yelnur Akhmetzhan |

All new styling is in `css/styles.css` (section "Assignment 6"); no inline styles or scripts in the HTML.
