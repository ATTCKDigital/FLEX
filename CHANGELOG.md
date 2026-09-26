# Changelog

All notable changes to FLEX. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and FLEX uses [Semantic Versioning](https://semver.org/). Upgrade steps for every breaking change: [UPGRADING.md](UPGRADING.md).

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

[5.0.0]: https://github.com/ATTCKDigital/FLEX/compare/v4.0.2...v5.0.0
[4.0.0]: https://github.com/ATTCKDigital/FLEX/compare/v3.4.0...v4.0.0
[3.4.0]: https://github.com/ATTCKDigital/FLEX/releases/tag/v3.4.0
