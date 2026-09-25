# Changelog

All notable changes to FLEX. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and FLEX uses [Semantic Versioning](https://semver.org/). Upgrade steps for every breaking change: [UPGRADING.md](UPGRADING.md).

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

[4.0.0]: https://github.com/ATTCKDigital/FLEX/compare/v3.4.0...v4.0.0
[3.4.0]: https://github.com/ATTCKDigital/FLEX/releases/tag/v3.4.0
