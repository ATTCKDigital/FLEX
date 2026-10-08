# Changelog

All notable changes to FLEX. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and FLEX uses [Semantic Versioning](https://semver.org/). Upgrade steps for every breaking change: [UPGRADING.md](UPGRADING.md).

## [5.5.0] - 2026-10-07

The date is the release date; the `v5.5.0` tag is applied to the merge commit on `develop`. A minor release: additive and backwards-compatible. Names, attributes and PHP include paths are preserved, existing content stays valid, and the front-end output is unchanged. Optional consumer note: [UPGRADING.md § v5.5.0](UPGRADING.md#v550).

### Changed

- **`feed` and `quote` now register from a per-block `block.json` at `apiVersion` 3** (batch 2b of the `block.json` migration; same pattern as v5.3.0/v5.4.0). PHP registers with `register_block_type( __DIR__ . '/block.json', [ 'render_callback' => … ] )`; JS passes the imported `metadata` to `registerBlockType` with `useBlockProps()` on a single root. `save` stays `null`; render callbacks are untouched; the single `dist/admin.js` bundle is unchanged.
  - `feed` (66 attributes): the `withSelect`-wrapped editor is now a named `FeedEdit` that calls `useBlockProps()` before any early return, so its loading, empty and populated states all render inside the block root.
  - `quote` (94 attributes) is the first block to flatten the shared **`background-options`** component into `block.json`: the 15 keys its JS and PHP declarations share, plus the JS-only `backgroundImageWide` (boolean, no default) and `dataSectionId` (string; its default is kept as the literal `"undefined"` that the JS declaration has always evaluated to). No JS↔PHP default differed, so there is no editor-visible change.
- `quote.php` no longer imports `background_options_video_output`, which it never called. (The quote front end has never output background video; only the editor preview does. Unchanged.)

## [5.4.1] - 2026-10-06

The date is the release date; the `v5.4.1` tag is applied to the merge commit on `develop`. A patch release: bug fixes to the `feed` block only. No breaking changes, so no [UPGRADING.md](UPGRADING.md) steps.

### Fixed

- **`feed`: the excerpt-length setting now reaches the front end.** The editor wrote `excerptLength` (default 15) but the render read `excerptWordLimit` (default 19), so the setting never applied. Both sides now use `excerptWordLimit` (type `number`, default 19 — the value the front end has always used); `excerptLength` is removed.
- **`feed`: its settings panel appears in the editor again.** `edit` returned `( (<InspectorControls/>), (<div/>) )` — a comma operator that discarded the panel. It now returns both in a Fragment. Three inert dropdowns (post type, category, number of posts — hardcoded options, never wired to anything) are removed; only the excerpt-length control remains.
- **`feed`: balanced markup.** The render opened two wrapper `<div>`s but closed one.
- **`feed`: each item shows its own date** (`get_the_time()` was called without the post ID, so every item showed the current page's date) **and its own content when it has no manual excerpt** (`get_the_content()` was passed the post ID as its first argument — the "more" link text — instead of its third).
- Known limitation (unchanged): a post built only from dynamic blocks has no text in its raw content, so without a manual excerpt its feed excerpt is empty.

## [5.4.0] - 2026-10-06

The date is the release date; the `v5.4.0` tag is applied to the merge commit on `develop`. A minor release: additive and backwards-compatible. Names, attributes and PHP include paths are preserved, so existing posts stay valid and the front end is visually unchanged. The one optional consumer note is [UPGRADING.md § v5.4.0](UPGRADING.md#v540) (a child that overrides one of these block PHP files must ship its own `block.json`).

### Changed

- **The `paragraph`, `heading`, `image`, `share` and `animated-gif` blocks now register from a per-block `block.json` at `apiVersion` 3** (batch 2 of the `block.json` migration; same pattern as v5.3.0 — see [gutenberg/blocks/README.md](gutenberg/blocks/README.md#block-registration-blockjson--apiversion-3)). Each `block.json` carries the full flattened attribute union of the block's JS + PHP own attributes and its spread-in component sets (paragraph 75, heading 84, image 80, share 77, animated-gif 80), plus `supports`/`styles` where the block defined them (`paragraph` 9 styles, `heading` 6 styles + `supports.html: false`). PHP registers with `register_block_type( __DIR__ . '/block.json', [ 'render_callback' => … ] )`; JS passes the imported `metadata` to `registerBlockType` with `useBlockProps()` on a single Fragment root (multi-root `image`/`animated-gif` edits collapsed). `save` stays `null`; render callbacks are untouched; the single `dist/admin.js` bundle is unchanged.
- **Two reconciled defaults** (where the JS and PHP declarations disagreed):
  - `heading.hangingQuoteClass` defaults to `'hide-hanging-quote'` (the editor's value). The heading editor's on-load hook sets this value on every mount, so any other default would mark every post containing a heading as having unsaved changes. Server-side, headings that never stored the attribute now render with a `hide-hanging-quote` wrapper class — which has no CSS rule (only `.show-hanging-quote` is styled), so pages are visually unchanged.
  - `share`'s `facebook`/`twitter`/`linkedin`/`email` default to boolean `false` (PHP had the string `'false'` on a `boolean` attribute). Output-neutral: the render's `== 'true'` comparison treats both the same.
- `className` is declared with default `''` on all five (each render reads it unguarded); `animated-gif`'s `dataComponentName`/`dataComponentOptions` are now also registered server-side (its render already read them defensively).
- `feed` and `quote` are deferred to a later batch: `feed` has a pre-existing editor↔render attribute mismatch (`excerptLength` vs `excerptWordLimit`) that deserves a deliberate fix, and `quote` depends on the `background-options` component.

## [5.3.0] - 2026-10-06

The date is the release date; the `v5.3.0` tag is applied to the merge commit on `develop`. A minor release: additive and backwards-compatible. Names, attributes and PHP include paths are preserved, so existing posts stay valid and the **front-end output is unchanged**. The one optional consumer note is [UPGRADING.md § v5.3.0](UPGRADING.md#v530) (a child that overrides one of these block PHP files must ship its own `block.json`).

### Changed

- **The `hr`, `source`, `shortcode`, `list` and `button` blocks now register from a per-block `block.json` at `apiVersion` 3** (batch 1 of the `block.json` migration). Each block's metadata (unchanged `name`, `title`, `category`, `keywords`, `textdomain`, and the full flattened `attributes` set — own attributes plus the spread-in margin/padding/border/background-color/text-colors/data-component-name component sets) moves into `gutenberg/blocks/block_<x>/block.json`. PHP registers with `register_block_type( __DIR__ . '/block.json', [ 'render_callback' => … ] )`; JS passes the imported `metadata` to `registerBlockType( metadata, { icon, edit, save } )` and uses `useBlockProps()` on a single block-canvas root. `save` stays `null`; the single editor bundle (`dist/admin.js`) is unchanged (no `editorScript`, no new webpack entry). Every block **name** and **attribute** is preserved, so existing content stays valid (`isValid === true`) and the server render callbacks — and therefore the front-end output — are byte-identical. See [gutenberg/blocks/README.md](gutenberg/blocks/README.md#block-registration-blockjson--apiversion-3) for the pattern.
- **One editor-only reconciliation (`hr`):** `hr`'s `block.json` declares `align: center` and `HRWidth: 100%` — the PHP/server defaults the front end has always used. The editor preview of an `hr` block with no stored alignment now reflects these (centered, full width) instead of the previous blank preview. The front-end render is unchanged. The other four blocks have no editor-visible change. `className` is declared with default `''` on `source`/`shortcode`/`list`/`button` to match their render reading `$attributes['className']`.
- Subsequent block batches (quote/share/feed/animated-gif/paragraph/image/heading; then row/column/popup/video/posts), the ACF blocks, and the cleanup of the deprecated/orphan blocks are follow-up releases.

## [5.2.0] - 2026-09-30

The date is the release date; the `v5.2.0` tag is applied to the merge commit on `develop`. A minor release: additive and backwards-compatible, with **byte-identical compiled CSS** — no visible change for any consumer. No breaking changes; the one optional consumer step is [UPGRADING.md § v5.2.0](UPGRADING.md#v520) (dropping your own Sass deprecation silences).

### Changed

- **FLEX's internal Sass now uses the `sass:map`, `sass:string` and `sass:color` module functions instead of the deprecated global built-ins and legacy colour functions.** The eight global built-in calls in `scss/_colors.scss` and `scss/_sass-utils.scss` (`map-get` → `map.get`, `map-has-key` → `map.has-key`, `map-keys` → `map.keys`, `unquote` → `string.unquote`) and the thirty deprecated colour-function calls in the admin colour partials `scss/_admin-color-scheme.scss` and `scss/_admin-color-scheme-dev.scss` (`lighten` / `darken` → `color.adjust($lightness:)`, `mix` → `color.mix`, `desaturate` → `color.adjust($saturation:)`, `hue` → `color.hue`) now call the namespaced module functions. **The compiled CSS is unchanged (byte-identical for all five stylesheets).** Consumers can now drop the `global-builtin` and `color-functions` Dart Sass deprecation silences from their build; dropping `global-builtin` also requires `quietDeps: true` (or equivalent), because the bundled Font Awesome vendor SCSS still uses global built-ins we don't control ([UPGRADING.md § v5.2.0](UPGRADING.md#v520)). The `@import` → `@use`/`@forward` module migration — and the `import` deprecation silence it needs — remain for a future FLEX release.
- **Re-enabled the `scss/no-global-function-names` stylelint rule** (`stylelint.config.cjs`), now that FLEX's own SCSS calls only namespaced module functions. `scss/load-no-partial-leading-underscore` stays deferred to the `@use`/`@forward` migration.

## [5.1.0] - 2026-09-29

The date is the release date; the `v5.1.0` tag is applied to the merge commit on `develop`. A minor release: additive and backwards-compatible for consumers, except the intentional column-stacking change below, which is a visible layout fix (the reason for the minor bump rather than a patch). No breaking changes, so no [UPGRADING.md](UPGRADING.md) steps.

### Fixed

- **Centre- and bottom-aligned columns stack their blocks vertically again.** `.component-column-verticalAlignment-center` and `.component-column-verticalAlignment-bottom` set `flex-direction: column` (it had been commented out), so a column holding more than one block stacks them vertically instead of laying them out as a non-wrapping row that spilled out of the column and widened narrow viewports. The block editor now matches the front end: the editor-only `justify-content: center` override for bottom columns — which only made sense for the old row direction — is removed. No opt-out class. This is the one visible layout change for consumers: every layout that relied on the side-by-side row behaviour will now stack (on attck2026 it corrected 14 pages, all of which were already broken); compare centre/bottom columns after upgrading.
- **Long unbreakable strings wrap instead of widening the page on narrow viewports.** Raw URLs and non-breaking link chains in paragraph links (`.component-paragraph a`), raw-URL quote sources (`.component-quote .quote-company`), and a quote word too wide for its column in a wider fallback font (`.component-quote .quote-text`) now wrap with `overflow-wrap: break-word` rather than pushing the page past the viewport. `break-word` splits a word only when it cannot fit on a line by itself, so ordinary words, headings and labels lay out exactly as before (min-content sizing is unchanged). The rule is deliberately scoped to these elements rather than applied site-wide on `body`, so it never splits ordinary labels or headings that only just miss their column.
- **The quote closing mark stays inside the viewport on phones.** `.component-quote .quote-text` gets 12 px horizontal padding below the tablet-portrait breakpoint, so the opening and closing quote marks (offset 12 px) no longer sit past the edge in full-bleed columns. Tablet and desktop quotes are unchanged.

## [5.0.0] - 2026-09-26

The date is the release date; the `v5.0.0` tag is applied to the merge commit on `develop`. Upgrade steps: [UPGRADING.md § v5.0.0](UPGRADING.md#v500).

### Breaking

- three.js r125 is gone: the `three-js-global` handle, `js/three.min.js` and the global `window.THREE` are removed. Code that used them must import `three` and bundle it in the child build.
- The constellation no longer loads site-wide. FLEX enqueues nothing for it on `wp_enqueue_scripts`; a template that renders `#constellation-container` opts in with `flex_enqueue_constellation()`.
- The child build must emit the bundle: pin `"three": "0.186.1"` (exact) in the child `package.json` and add the `constellation` entry (`FLEX/js/constellation/index.js`), which produces `dist/constellation.js` and `dist/constellation.asset.php` ([build contract](UPGRADING.md#build-contract)).
- `js/constellation.js` is replaced by the ES modules in `js/constellation/`.

### Added

- `flex_enqueue_constellation()`: enqueues the `constellation` handle from the child's `dist/constellation.js` (dependencies and content-hash version from `constellation.asset.php`, footer). It enqueues nothing and returns `false` when the manifest is missing or invalid or the bundle file is missing, so the page renders without the animation and requests no missing file. FLEX never calls it, so other pages, the block editor and wp-admin never load the script.
- `flex_constellation_skip_concat()` on `js_do_concat`: keeps `constellation` out of Jetpack Boost's JS concatenation (a no-op without Boost or Page Optimize).
- WebGL2 check before the renderer is created: without WebGL2 the hero stays static, with no console errors.
- `pagehide` / `pageshow` lifecycle: the loop pauses when the page enters the back/forward cache and resumes from it (one loop, never two); a real leave removes every listener and disposes geometries, materials and the renderer. WebGL context loss pauses the loop; a restore resumes it.

### Changed

- three.js **0.186.1** from npm replaces the vendored r125 UMD build. The constellation is ten ES modules in `js/constellation/` with named `three` imports, compiled by the child build into `dist/constellation.js`. `package.json` declares `three` (exact pin, for lint only).
- The hero starts on `DOMContentLoaded`, or immediately when the DOM is already parsed.
- Motion runs on time since page load: the camera zooms in from radius 8 (towards 2), as written.
- At rest, dots and links breathe slowly and faintly (about ±5%, about ten times slower than the old twinkle) instead of twinkling, pulsing and shimmering.
- Hovering a dot sends one ripple outwards: each linked dot flashes once (50 ms later per hop) and one bright band travels along the links. The looping hover waves on dots and links are removed.
- Hover growth peaks at 3× the dot size (1.5× hover × a one-shot swell of up to 2×), half of the previous ≈ 6×.

### Removed

- `js/three.min.js` (three.js r125), `js/constellation.js`, the `three-js-global` handle and their ESLint / Prettier ignore entries.
- Unused shader uniforms (`linePositions`; particle `activeParticleIndex`, `effectRadius`, `maxEffectDistance`; line `effectRadius`).

### Fixed

- The twinkle, pulse and zoom-in were frozen: the shaders received epoch seconds (≈ 1.79e9) as a 32-bit float, which only changes every 128 s, so the motion jumped about every two minutes and the camera had long been clamped at its minimum radius. Time since page load fixes it.
- Pages without the hero no longer download three.js and the constellation script (≈ 655 KB uncompressed on attck).

## [4.0.2] - 2026-09-25

### Fixed

- `js/constellation.js`: pages without `#constellation-container` no longer throw a `TypeError`. The script loads on every page but only the hero has the container; it now returns before creating the scene, so non-hero pages also skip the WebGL renderer and the animation loop.

## [4.0.1] - 2026-09-24

### Fixed

- `component_wcag`: interactive **elements** registered by components (component_carousel's arrows and dots) now get `tabindex`, `role`, `aria-label` and Enter/Space handling. The handler referenced an undefined variable and threw a `ReferenceError` for every such registration; it also accepts nested arrays and skips missing nodes (a carousel without arrows).
- Front-end scripts no longer break when a third-party embed removes the global `jQuery`: Mailchimp's signup code calls `jQuery.noConflict(true)`, which strips WordPress's jQuery whenever its own `mc-validate.js` fails to load (ad blockers, network errors). Since v4.0.0 uses WordPress's jQuery, that stopped every theme component and the typing animation. `flex_protect_jquery_global()` captures the instance after `jquery-core` and restores it before `afp_script`.
- `component_cf7`: the double-submit guard (disabled submit button + `cta-disabled` class) could fail to apply because an unused waiting-label calculation read `.length` of an unset value and threw first. The unused calculation is removed; the button label stays unchanged by design.

## [4.0.0] - 2026-09-24

The date is the release date; the `v4.0.0` tag is applied to the merge commit on `develop`.

### Breaking

- FLEX ships source only: the standalone webpack 4 build (`webpack.config.babel.js`, Babel/PostCSS/legacy ESLint configs, Husky, BundleAnalyzer on port 8888) is removed; the child theme owns the build ([reference child build](UPGRADING.md#reference-child-build)).
- Node 24 LTS required (`.nvmrc`, `engines` `>=24.15.0 <25`, `engine-strict`).
- Enqueues read the child's `dist/*.asset.php` manifests; `dist/style.css` / `dist/print.css` load through the new `flex-style` / `flex-print` handles, and their `<link>`s are removed from `header.php` (child `header.php` overrides must drop theirs).
- jQuery is WordPress's external (no bundled copy, `window.jQuery` no longer overwritten); lodash `noConflict()` removed from the editor bundle.
- Font Awesome 6.7.2 from npm replaces the vendored Font Awesome 5 fonts; `$fa-font-path` defaults to `"fonts/fontawesome"` in the child's `dist/`; family `"Font Awesome 6 Free"`.
- Customizer colors are printed at runtime as inline CSS custom properties (`flex_customizer_colors_css()` on `flex-style`, the block editor settings/`block_editor_styles`, and TinyMCE); WordPress no longer writes `scss/_css-vars.scss`, which is deleted along with its imports. Child SCSS must drop any `_css-vars` import/forward ([details](UPGRADING.md#customizer-colors-are-printed-at-runtime)).
- IE-era polyfills and their call sites removed (`css-vars-ponyfill`, `es6-object-assign`, `string.prototype.repeat`, `babel-polyfill`, `fitie`).
- `__GET_STARTED_HERE/` starter kit, `.githooks/`, `gutenberg/blocks/example-blocks/` and the carousel/slides `block.json` files removed.

### Added

- `flex_customizer_colors_css()`.
- `flex_get_asset_manifest()` and `flex_versioned_asset_url()`; content-hash versions for theme CSS/JS, the TinyMCE editor style and the Dev admin color scheme.
- `gutenberg/editor-globals.js`: declares the WordPress editor handles FLEX editor code reads as `wp.*` globals.
- `!default` on every top-level configuration variable in `_sizing`, `_media-queries`, `_colors`, `_fonts`, `_layout`, `_admin-color-scheme-dev` and `_admin-color-scheme`, so children can configure FLEX before importing it.
- WordPress lint/format presets (`@wordpress/scripts` 36.0.0) with documented FLEX overrides: `eslint.config.cjs`, `stylelint.config.cjs`, `.prettierignore`, `.stylelintignore`; `.git-blame-ignore-revs` for the mechanical reformatting commits.
- `CHANGELOG.md` and `UPGRADING.md`.

### Changed

- `package.json` declares exactly the packages FLEX source imports (`@wordpress/*` at the WordPress 6.8 line, including the previously undeclared `@wordpress/hooks`; `classnames`, `jquery`, `lodash`, `@fortawesome/fontawesome-free`); `@wordpress/scripts` 36.0.0 is the only dev dependency.
- `afp_script`, `block_editor_scripts` and `block_editor_styles` take dependencies and versions from the manifests (handles unchanged).
- `_forms.scss` uses `$fa-style-family`; SCSS imports use bare package names without `.scss` extensions.
- FLEX JS, SCSS and Markdown reformatted with wp-prettier and brought to 0 ESLint / Stylelint / Prettier findings (behaviour-neutral; see [UPGRADING.md § Lint presets](UPGRADING.md#lint-presets) for the few rendered-CSS differences).
- `.stylelintrc.json` replaced by the commented `stylelint.config.cjs`.

### Deprecated

- Disabled blocks `block_carousel`, `block_slides`, `block_text`, `block_social_media`, `block_users`: kept but unmaintained and excluded from linting; removal planned for v5.

### Removed

- Build tooling and unused packages: webpack 4, Babel 7, node-sass, PostCSS configs, Husky, `@vimeo/player`, `imagesloaded`, `jquery-bridget`, Bourbon, and the IE polyfills above.
- Vendored Font Awesome 5 webfonts (`assets/fonts/Fontawesome`).
- `scss/_css-vars.scss` and the `after_setup_theme` hook that rewrote it (`tabor_gutenberg_colors()`); no runtime writes to the theme directory remain.

### Fixed

- Builds from a clean checkout no longer compile the committed placeholder brand colors: the site's customizer colors apply at runtime.
- TinyMCE editor content now has the `--color-*` custom properties `wysiwyg.css` uses.
- Seven blocks (animated-gif, button, heading, image, map, paragraph, quote) now take `onReplace` from their props, so removing an emptied block with Backspace no longer throws a `ReferenceError`.
- JSX comma-sequence expressions in the column and popup editor markup that modern parsers reject.
- Debug tooling (`js/debug.js`) read undefined `debugModeStatus` / `breakpointsModeStatus` variables in its status getters.

## [3.4.0]

= `6366dac`, the last pre-v4 `develop`. Pin this tag until you migrate to v4 (see [UPGRADING.md](UPGRADING.md#pin-v340-first)).

[5.2.0]: https://github.com/ATTCKDigital/FLEX/compare/v5.1.0...v5.2.0
[5.1.0]: https://github.com/ATTCKDigital/FLEX/compare/v5.0.0...v5.1.0
[5.0.0]: https://github.com/ATTCKDigital/FLEX/compare/v4.0.2...v5.0.0
[4.0.0]: https://github.com/ATTCKDigital/FLEX/compare/v3.4.0...v4.0.0
[3.4.0]: https://github.com/ATTCKDigital/FLEX/releases/tag/v3.4.0
