# Upgrading FLEX

Every breaking change in a FLEX major release and what a FLEX child theme must do about it. Newest release first; move one major version at a time.

Contents: [v5.0.0](#v500) · [v3 → v4.0.0](#v3--v400): [Pin v3.4.0 first](#pin-v340-first) · [Node 24](#node-24) · [FLEX no longer builds anything](#flex-no-longer-builds-anything) · [Reference child build](#reference-child-build) · [Build contract](#build-contract) · [Enqueue changes](#enqueue-changes) · [Customizer colors are printed at runtime](#customizer-colors-are-printed-at-runtime) · [jQuery, lodash and editor globals](#jquery-lodash-and-editor-globals) · [Removed packages and IE polyfills](#removed-packages-and-ie-polyfills) · [Sass](#sass) · [Font Awesome 6.7.2](#font-awesome-672) · [Removed and deprecated files](#removed-and-deprecated-files) · [Lint presets](#lint-presets) · [Git housekeeping](#git-housekeeping) · [Known issues](#known-issues)

## v5.0.0

FLEX v5.0.0 moves the constellation hero from the vendored three.js r125 global to three.js **0.186.1** from npm, compiled by the child build, and loads it only on templates that ask for it. The steps:

1. **Pin three.js in the child.** Add `"three": "0.186.1"` (exact, no `^`) to the child's `package.json` `dependencies` (`npm install three@0.186.1 --save-exact` under Node 24) and commit the lockfile. FLEX's own `three` dependency is for linting only; the build must resolve `three` from the child's `node_modules` (the `FlexNodeModulesGuard` fails the build otherwise).
2. **Add the `constellation` entry** to `webpack/entries.js`:

    ```js
    const { flexDir } = require( './paths' );
    // Constellation hero (three.js), loaded only by templates that opt in.
    constellation: path.join( flexDir, 'js/constellation/index.js' ),
    ```

    The build then emits `dist/constellation.js` and `dist/constellation.asset.php` ([Build contract](#build-contract)). The asset manifest's dependencies are `[]`: three.js is bundled, not a WordPress handle.

3. **Add a budget** for the bundle in `webpack/performance.js`, e.g. `'constellation.js': 640000` (attck: measured 556,487 B, × 1.15, rounded up to 5 KB). The bundle is about 550 KB minified; `main.js` must not grow (it contains no three.js).
4. **Opt in from every template that renders `#constellation-container`**, anywhere before `get_footer()`:

    ```php
    <?php if ( function_exists( 'flex_enqueue_constellation' ) ) { flex_enqueue_constellation(); } ?>
    <div id="constellation-container"><div class="constellation-overlay"></div></div>
    ```

    FLEX no longer enqueues the constellation on `wp_enqueue_scripts`, so a page that doesn't call it loads no three.js. The `function_exists()` guard keeps the template working on an older FLEX. When the bundle or its manifest is missing, the function enqueues nothing and returns `false` (logged under `WP_DEBUG`): the page renders without the animation, with no failed request and no console errors.

5. **Remove every use of `three-js-global` and `THREE`.** The handle, `js/three.min.js` (r125), `js/constellation.js` and the global `window.THREE` are gone. Drop `three-js-global` from dependency arrays and dequeue calls; child code that used `THREE` must `import { … } from 'three'` and be bundled by the child build. Remove any `js/three.min.js` / `js/constellation.js` entries from lint ignores.
6. **Build, then check the hero:** `npm run build` (0 errors, 0 warnings), then load a page with the hero (one `dist/constellation.js?ver=…` request, clean console) and a page without it (no constellation request).

What else changes:

- **Motion.** The constellation now animates on time since page load: the camera zooms in from radius 8, dots and links breathe slowly and faintly at rest, and hovering a dot sends one outward ripple through its links (hover growth peaks at 3×). In v4 the twinkle and zoom were frozen by a float32 precision bug, so the hero looks livelier than before; compare it visually.
- **WebGL2 is required** for the animation. Without it the hero stays static and the console stays clean.
- **Lifecycle.** The loop pauses into the back/forward cache (`pagehide`) and resumes from it (`pageshow`); a real leave releases the renderer and listeners. Nothing to do unless the child has its own `beforeunload` handling for the hero.
- **Jetpack Boost.** `flex_constellation_skip_concat()` on `js_do_concat` keeps the `constellation` handle out of Boost's JS concatenation, so the bundle caches as its own file. No Boost setting changes.
- **Unchanged:** the handle is still named `constellation`, so existing `wp_dequeue_script( 'constellation' )` calls and Boost exclusions keep working.

## v3 → v4.0.0

The short version:

1. Pin FLEX `v3.4.0` first (the last v3 `develop`, `6366dac`), so nothing changes under you.
2. Switch the child to Node 24 and give it its own `@wordpress/scripts` build (the [reference child build](#reference-child-build) below).
3. Drop the `style.css` / `print.css` `<link>`s from any child `header.php`, and any `_css-vars` import or forward from child SCSS.
4. Build, compare the site visually against v3, then move the submodule to `v4.0.0`.

## Pin v3.4.0 first

FLEX `develop` moves to v4 with this release. A child theme that tracks `develop` (a submodule pointer that someone bumps with `git pull`) gets v4 on its next bump.

**Action:** before you bump, point the submodule at the `v3.4.0` tag (`git -C wp-content/themes/FLEX checkout v3.4.0`, commit the pointer). Move to `v4.0.0` deliberately, following this guide.

## Node 24

FLEX now requires Node 24 LTS: `.nvmrc` is `24`, `package.json` has `"engines": { "node": ">=24.15.0 <25" }`, and `.npmrc` sets `engine-strict=true`, so `npm ci` refuses other Node versions.

**Action:** use Node 24 in the child as well (`.nvmrc` `24`, the same `engines` range, `engine-strict=true`). Add `"prebuild": "npm run check-engines"` with `"check-engines": "wp-scripts check-engines"` so a wrong Node version stops the build before webpack runs.

## FLEX no longer builds anything

FLEX v4.0.0 ships **source only**. Removed from FLEX: `webpack.config.babel.js` (and the `BundleAnalyzerPlugin` on port 8888), the Babel, PostCSS and legacy ESLint configs, Husky, and every build-tool package. FLEX's `dist/` is no longer produced. `package.json` keeps only:

- `dependencies`: exactly the packages FLEX source imports: `@wordpress/*` at the WordPress 6.8 line (`block-editor`, `blocks`, `components`, `compose`, `data`, `element`, `hooks`, `i18n`, `keycodes`, `server-side-render`), `classnames`, `jquery`, `lodash`, `@fortawesome/fontawesome-free@^6.7.2` (v5.0.0 adds `three` `0.186.1`, see [v5.0.0](#v500)).
- `devDependencies`: `@wordpress/scripts` **36.0.0** (pinned), used for lint and format only.
- `scripts`: `check-engines`, `lint:js`, `lint:style`, `format`.

FLEX's `node_modules` exist only so FLEX can be linted. A child build must never resolve anything from them.

**Action:** the child theme owns the build. Copy the [reference child build](#reference-child-build), install the packages FLEX bundles or compiles into the child (`classnames`, `@fortawesome/fontawesome-free@^6.7.2`, plus the child's own), and build with `npm run build` in the child.

## Reference child build

attck (`wp-content/themes/attck` in `ATTCKDigital/attck2026`) is the reference implementation: `webpack.config.js` plus one small module per concern in `webpack/`. Read those files for the full, commented code; the trimmed copy below shows everything a child needs.

Child `package.json` essentials:

```json
{
	"engines": { "node": ">=24.15.0 <25" },
	"browserslist": [ "extends @wordpress/browserslist-config" ],
	"scripts": {
		"check-engines": "wp-scripts check-engines",
		"prebuild": "npm run check-engines",
		"build": "wp-scripts build",
		"start": "wp-scripts start"
	},
	"dependencies": {
		"@fortawesome/fontawesome-free": "^6.7.2",
		"classnames": "^2.5.1",
		"three": "0.186.1"
	},
	"devDependencies": {
		"@wordpress/scripts": "36.0.0",
		"copy-webpack-plugin": "^14.0.0",
		"sass-embedded": "^1.105.0"
	}
}
```

No Babel or PostCSS config in the child: the wp-scripts presets apply.

`webpack.config.js` (verbatim):

```js
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const entry = require( './webpack/entries' );
const resolveFromChildTree = require( './webpack/resolve' );
const { styleRules, styleOptimization } = require( './webpack/styles' );
const sitePlugins = require( './webpack/plugins' );
const { performance } = require( './webpack/performance' );
const { ignoreWarnings } = require( './webpack/warnings' );
const { outputDir } = require( './webpack/paths' );

if ( Array.isArray( defaultConfig ) ) {
	throw new Error(
		'Expected a single @wordpress/scripts webpack config; unset WP_EXPERIMENTAL_MODULES.'
	);
}

module.exports = {
	...defaultConfig,
	entry,
	output: { ...defaultConfig.output, path: outputDir },
	resolve: resolveFromChildTree( defaultConfig.resolve ),
	module: {
		...defaultConfig.module,
		rules: styleRules( defaultConfig.module.rules ),
	},
	optimization: styleOptimization( defaultConfig.optimization ),
	plugins: sitePlugins( defaultConfig.plugins ),
	performance,
	ignoreWarnings,
};
```

`webpack/paths.js` and `webpack/entries.js` (entry names are the contract with FLEX's enqueue code):

```js
// paths.js
const childDir = path.resolve( __dirname, '..' );
module.exports = {
	childDir,
	childNodeModulesDir: path.join( childDir, 'node_modules' ),
	flexDir: path.resolve( childDir, '..', 'FLEX' ),
	outputDir: path.join( childDir, 'dist' ),
};

// entries.js
module.exports = {
	main: fromTheme( 'js/app.js' ),
	// Editor script and editor styles share one entry, so one version covers both.
	admin: [ fromTheme( 'js/admin.js' ), fromTheme( 'scss/admin.scss' ) ],
	style: fromTheme( 'scss/style.scss' ),
	print: fromTheme( 'scss/print.scss' ),
	'admin-colors': fromTheme( 'scss/admin-color-scheme.scss' ),
	wysiwyg: fromTheme( 'scss/wysiwyg.scss' ),
	// Constellation hero (three.js), loaded only by templates that opt in (v5.0.0).
	constellation: path.join( flexDir, 'js/constellation/index.js' ),
};
```

`webpack/resolve.js`: FLEX files resolve packages from the **child's** tree:

```js
module.exports = ( defaultResolve ) => ( {
	...defaultResolve,
	alias: { ...defaultResolve.alias, FLEX: flexDir },
	modules: [
		path.join( childDir, 'js' ),
		childNodeModulesDir,
		'node_modules',
	],
} );
```

`webpack/styles.js` (trimmed): sass-loader uses `sass-embedded` with the modern compiler, `loadPaths: [ childNodeModulesDir ]` and `silenceDeprecations: [ 'import', 'global-builtin', 'color-functions' ]` (no `quietDeps`); css-loader gets `url: false`; the wp-scripts `style` split-chunk cache group is disabled (`cacheGroups.style = false`), otherwise `scss/style.scss` is emitted as `style-style.css`.

`webpack/plugins.js` (trimmed):

```js
module.exports = ( defaultPlugins ) => [
	// The site is LTR only: drop the RTL copies of every stylesheet.
	...defaultPlugins.filter(
		( plugin ) => plugin.constructor.name !== 'RtlCssPlugin'
	),
	// FLEX code uses $ / jQuery implicitly; both map to WordPress's `jquery` external.
	new ProvideJQueryPlugin(), // compiler.webpack.ProvidePlugin( { $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' } )
	// Font Awesome webfonts, referenced by FLEX's $fa-font-path "fonts/fontawesome".
	new CopyPlugin( {
		patterns: [
			{
				from: path.join(
					childNodeModulesDir,
					'@fortawesome/fontawesome-free/webfonts'
				),
				to: 'fonts/fontawesome',
			},
		],
	} ),
	new FlexNodeModulesGuard( { flexDir } ), // webpack/flex-node-modules-guard.js
	new AssetBudgetPlugin(), // webpack/performance.js
];
```

- `webpack/flex-node-modules-guard.js`: fails the build when a module or a Sass/file dependency resolves from `FLEX/node_modules` (resolver bookkeeping — `package.json` reads and directories — excepted).
- `webpack/performance.js`: `performance.hints: 'error'` with per-asset budgets (attck: CSS ≤ 1.6 MB, `main.js` ≤ 700 KB, `admin.js` ≤ 1.46 MB, `constellation.js` ≤ 640,000 B). Set budgets for your site.
- `webpack/warnings.js`: the one vendor warning the build excuses (next section).

### The `webpack/warnings.js` vendor exception

Font Awesome 6.7.2 (the last 6.x) calls Sass `if()` in its own `scss/_functions.scss`; Dart Sass ≥ 1.95 reports that as the `if-function` deprecation. The vendor file can't be fixed, so the reference build ignores **only that warning**: a webpack `ignoreWarnings` predicate that requires a `ModuleWarning` on a `.scss` module whose message names `…/node_modules/@fortawesome/fontawesome-free/scss/_functions.scss` immediately followed by `The Sass if() syntax is deprecated`. The Sass `silenceDeprecations` list is not widened, so an `if()` in FLEX or child SCSS still fails the build. Remove it with the Font Awesome 7 / `@use` migration.

**Action:** copy `webpack/warnings.js` as is, or pin `sass-embedded` below 1.95 (not recommended).

## Build contract

What the child build must emit into `dist/` (FLEX's PHP reads it):

| File                                                                                    | Notes                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `main.js`, `main.asset.php`                                                             | Front-end bundle; `main.asset.php` dependencies expected to be exactly `['jquery']` (never editor handles or React). Contains no three.js.                                                                                         |
| `admin.js`, `admin.css`, `admin.asset.php`                                              | Editor bundle + editor styles (one entry); dependencies are WordPress 6.8 handles (`wp-block-editor`, `wp-blocks`, `wp-components`, `wp-data`, `wp-element`, `wp-hooks`, `wp-i18n`, …); no bundled React or `@wordpress/*` source. |
| `style.css`, `style.asset.php`                                                          | Screen stylesheet.                                                                                                                                                                                                                 |
| `print.css`, `print.asset.php`                                                          | Print stylesheet.                                                                                                                                                                                                                  |
| `admin-colors.css`, `admin-colors.asset.php`                                            | The "Dev" (`coffee`) admin color scheme.                                                                                                                                                                                           |
| `wysiwyg.css`, `wysiwyg.asset.php`                                                      | TinyMCE editor styles.                                                                                                                                                                                                             |
| `constellation.js`                                                                      | Since v5.0.0. The constellation hero: FLEX `js/constellation/` plus the parts of three.js 0.186.1 it imports, one minified file (no chunks, no `.LICENSE.txt`). Loaded only through `flex_enqueue_constellation()`.                |
| `constellation.asset.php`                                                               | Since v5.0.0. Dependencies exactly `[]` (three.js is bundled); version = content hash of `constellation.js`.                                                                                                                       |
| `fonts/fontawesome/fa-{brands,regular}-400.*`, `fa-solid-900.*`, `fa-v4compatibility.*` | Copied Font Awesome 6 webfonts.                                                                                                                                                                                                    |

Tolerated: the empty stub chunks `style.js`, `print.js`, `admin-colors.js`, `wysiwyg.js` (never enqueued). Must not appear: `*-rtl.css`, `style-*.css`, `*.map` (production), PHP other than `*.asset.php`, `assets/`, `_/`, extensionless files. Keep `dist/` out of git and build it on deploy.

## Enqueue changes

`config/theme-configs/enqueue-scripts-styles.php` now reads the child's build manifests:

- **`flex_get_asset_manifest( $name )`** returns `array( 'dependencies' => string[], 'version' => string|null )` from the active theme's `dist/<name>.asset.php` (memoized per request). A missing or invalid manifest gives no dependencies and a `null` version, and is logged with `error_log()` when `WP_DEBUG` is on, so the site still renders.
- **`flex_versioned_asset_url( $url, $name )`** appends `?ver=<manifest version>` to URLs not loaded through `wp_enqueue_*`: the TinyMCE editor style (`add_editor_style()`, `wysiwyg`) and the Dev (`coffee`) admin color scheme (`admin-colors`, guarded with `function_exists()` in `admin-theme.php`).
- **New handles `flex-style` (media `screen`) and `flex-print` (media `print`)** enqueue `dist/style.css` and `dist/print.css` on `wp_enqueue_scripts` at priority **1**, ahead of core and plugin styles (the same cascade as the old `<link>`s), versioned by content hash.
- **`<link>` tags removed from `header.php`.** FLEX's `header.php` no longer prints `dist/style.css` / `dist/print.css` `<link>`s.
- `afp_script` (`dist/main.js`) takes its dependencies and version from `main.asset.php`; `block_editor_scripts` / `block_editor_styles` (`dist/admin.js` / `admin.css`) from `admin.asset.php`, and stay on `enqueue_block_editor_assets` only. Handle names are unchanged (`afp_script`, `afp_vars`, `block_editor_scripts`, `block_editor_styles`).

**Action:** a child theme that overrides `header.php` must **remove its own `dist/style.css` / `dist/print.css` `<link>`s** (keep `wp_head()`), or the stylesheets load twice. The child build must produce the `*.asset.php` files above. If you dequeue or re-register theme styles, use the `flex-style` / `flex-print` handles.

## Customizer colors are printed at runtime

In v3, `customizer-colors.php` rewrote `scss/_css-vars.scss` with the site's customizer colors on every request (`after_setup_theme`), and the build compiled that file into the theme CSS. A build from a clean checkout therefore compiled whatever colors happened to be committed, not the site's, and WordPress wrote into the theme directory at runtime.

In v4 there are no runtime writes to the theme directory, and the compiled CSS contains no `--color-*` definitions (it still uses `var(--color-…)`). The colors are printed at runtime instead:

- **`flex_customizer_colors_css()`** returns `:root { --<slug>: <theme mod or default>; … }` for every entry of `FLEXLAYOUT_COLORS` (same property names and escaping as v3).
- **Front end:** `wp_add_inline_style( 'flex-style', … )` on `wp_enqueue_scripts` priority 20, printed as `<style id="flex-style-inline-css">` right after the theme stylesheet.
- **Block editor:** appended to the editor settings `styles` (`block_editor_settings_all`, reaches the iframed canvas) and added inline to `block_editor_styles` (`dist/admin.css` in the outer editor frame).
- **TinyMCE:** appended to `content_style` (`tiny_mce_before_init`), because `dist/wysiwyg.css` uses the variables. (v3 never defined them there.)
- `scss/_css-vars.scss` is deleted, and so are its imports in `scss/style.scss` and `scss/admin.scss` and its lint/format exclusions.

**Action:** remove any `@import '_css-vars'` / `@import '../../FLEX/scss/_css-vars.scss'` (or `@forward`) from child SCSS, and delete a child `_css-vars.scss` that forwards FLEX's; the build fails on the missing file otherwise. If the child dequeues `flex-style`, print `flex_customizer_colors_css()` itself (for example with `wp_add_inline_style()` on its own stylesheet). Colors defined in `FLEXLAYOUT_COLORS` and edited in the Customizer need no rebuild.

## jQuery, lodash and editor globals

- jQuery is WordPress's `jquery` external. FLEX no longer bundles a copy and no longer overwrites `window.jQuery`; `$`/`jQuery` in FLEX code come from the child build's `ProvidePlugin`, which maps them to the external.
- `js/admin.js` no longer imports lodash to call `noConflict()`; the editor bundle uses WordPress's `lodash` handle. `window.lodash` / `window._` are no longer (re)assigned by FLEX.
- **`gutenberg/editor-globals.js`** (imported by `js/admin.js`) imports the `@wordpress/*` packages behind the `wp.*` globals FLEX editor code reads, for their side effect only. Dependency extraction then lists those handles in `admin.asset.php`, so WordPress loads them before `admin.js`. Converting the `wp.*` globals to imports is planned for a later release.

**Action:** if child editor code reads a `wp.*` namespace FLEX does not use, import its package the same way (never `@wordpress/editor`). Don't rely on FLEX to set `window.lodash` or a bundled jQuery.

## Removed packages and IE polyfills

Removed with the FLEX build: `babel-polyfill`, `es6-object-assign`, `string.prototype.repeat`, `css-vars-ponyfill`, `fitie`, `@vimeo/player`, `imagesloaded`, `jquery-bridget`, Bourbon, and the webpack 4 / Babel 7 / node-sass / PostCSS / Husky toolchain. The call sites went too: the `cssVars()` ponyfill call in `js/app.js` and the `Object.assign` / `String.prototype.repeat` polyfills in `js/load-components.js`. FLEX targets `@wordpress/browserslist-config`; IE11 is not supported.

**Action:** if the child still needs one of these packages, declare it in the child's `package.json` and import it from child code.

## Sass

- **Configurable tokens (`!default`).** Every top-level configuration variable in `scss/_sizing.scss`, `_media-queries.scss`, `_colors.scss`, `_fonts.scss`, `_layout.scss`, `_admin-color-scheme-dev.scss` and `_admin-color-scheme.scss` is now `!default` (FLEX v3 set them unconditionally). A child that keeps the v3 **import-then-override** pattern (import the FLEX partial, then assign its own values) compiles to the same CSS. A child can now also **configure before importing**: set e.g. `$gap: 9px;` _before_ `@import '../../FLEX/scss/_sizing';`, and FLEX's generated rules use it (for example `$buttonBorderRadius: $gap * 4`). That is a visible change for rules FLEX generates from those variables, so verify it visually.
- **Load paths.** FLEX imports packages by bare name (`@import "@fortawesome/fontawesome-free/scss/fontawesome";`), never `node_modules/…`. The child build must set `sassOptions.loadPaths: [ <child>/node_modules ]`. Partial imports no longer carry the `.scss` extension.
- **Silenced deprecations.** The Sass `import`, `global-builtin` and `color-functions` deprecations are silenced in the reference build until FLEX migrates to `@use`/`@forward` (planned). Every other Sass warning fails the build (plus the one Font Awesome exception above).
- The customizer color custom properties (`--color-*`) are no longer compiled; see [Customizer colors are printed at runtime](#customizer-colors-are-printed-at-runtime).

## Font Awesome 6.7.2

- FLEX imports Font Awesome **6.7.2** from `@fortawesome/fontawesome-free` (v3 shipped a vendored Font Awesome 5 copy in `assets/fonts/Fontawesome`, now deleted).
- `$fa-font-path` defaults to `"fonts/fontawesome"` (`!default`), a URL relative to the compiled CSS in the **child's** `dist/`. The child build must copy `@fortawesome/fontawesome-free/webfonts/*` to `dist/fonts/fontawesome/` (the reference `CopyPlugin` does).
- The font family is now `"Font Awesome 6 Free"`: FLEX's `_forms.scss` uses `$fa-style-family` instead of the hard-coded `'Font Awesome 5 Free'`.

**Action:** replace any `'Font Awesome 5 Free'` / `'Font Awesome 5 Brands'` in child SCSS with `$fa-style-family` (or `"Font Awesome 6 Free"` / `"Font Awesome 6 Brands"`), remove references to FLEX's `assets/fonts/Fontawesome`, and check icon glyphs visually (a few Font Awesome 5 icons were renamed or redrawn in 6). To keep fonts elsewhere, set `$fa-font-path` before importing FLEX's `_fonts`.

## Removed and deprecated files

- **`__GET_STARTED_HERE/` starter kit removed.** It was an obsolete `flexlayout-child` starter (webpack 4 config, PostCSS/Babel/ESLint configs, `.githooks`, a sample `.env`). Start a new child theme from the [reference child build](#reference-child-build) instead.
- **Removed:** the stale `.githooks/` snapshot, `gutenberg/blocks/example-blocks/`, and the orphaned `block.json` files of the carousel and slides blocks.
- **Deprecated (kept, removal planned for v5):** the disabled blocks `block_carousel`, `block_slides`, `block_text`, `block_social_media`, `block_users`. They are not imported by `gutenberg/blocks/blocks.js`, are excluded from linting, and are not maintained. Their `register_carousel.php` / `register_slides.php` loaders still reference the deleted `block.json` files and are not included anywhere.

**Action:** a child that re-enables one of these blocks must own its maintenance and plan to move off it before v5.

## Lint presets

FLEX lints with the WordPress presets from `@wordpress/scripts` 36: `npm run lint:js`, `npm run lint:style`, and the format check
`npx prettier --config node_modules/@wordpress/prettier-config/lib/index.js --ignore-path .prettierignore --check .`
(`npm run format` / `wp-scripts format` always writes; it doesn't forward `--check`). All three pass with 0 errors and 0 warnings in v4.0.0.

FLEX's documented overrides:

- **ESLint** (`eslint.config.cjs`): globals `wp`, `jQuery`, `$`, `FLEX`; `import/no-unresolved` ignores the child build's `FLEX/…` alias; ignored: `node_modules/`, `assets/` and the five disabled blocks (v4.0.x also ignored `js/three.min.js`, removed in v5.0.0). `no-console` is off for the front-end runtime (`js/**`, `components/**` and the four front-end files under `gutenberg/`, but not `js/admin.js`, `js/icons.js`, `js/i18n.js`): `console.log` is FLEX's trace channel, which `js/debug.js` filters (it prints only on non-production servers with enhanced console logging enabled). Editor code keeps the preset's `no-console`.
- **Stylelint** (`stylelint.config.cjs`, formerly `.stylelintrc.json`): extends `@wordpress/stylelint-config/scss`; `selector-class-pattern` accepts FLEX's lowercase/camelCase words joined by `-`, `_`, `__` (element) or `--` (modifier); `rule-empty-line-before`, `at-rule-empty-line-before` and `comment-empty-line-before` add the `first-nested` exception, because Prettier removes blank lines at the start of a block (without it the two tools can never agree). Ignored: `node_modules/`, `assets/`, the five disabled blocks.
- **Deferred to the `@use` migration** (disabled in `stylelint.config.cjs`, each commented "deferred to WS4 (@use migration)"): `scss/no-global-function-names` (module functions such as `color.hue()`) and `scss/load-no-partial-leading-underscore` (loading partials by their public, underscore-free name). Their fix _is_ the migration.
- **Inline disables** carry a `--` justification, e.g. `@extend` of public classes (`.cta`, `.body`, `.is-style-*`) that markup also uses, the `clip` visually-hidden pattern, the nested `@import` in `admin-color-scheme.scss`, `rem` line heights, third-party ids.

The lint pass is behaviour-neutral, with these rendered-CSS differences a child may see in a visual compare: `page-break-inside` became `break-inside` (its standard name; the duplicate is dropped), the non-standard no-ops `column-break-inside`, `font-smoothing` and `touch-events` are gone, dead declarations overridden later in the same rule (`transition-delay` before `transition`, `border-color` before `border`) are gone, the admin source-block textarea font is `Courier, monospace`, and named colors in debug-only styles are hex.

**Action:** none for the site build. If a child copies FLEX's lint setup, copy `eslint.config.cjs`, `stylelint.config.cjs`, `.prettierignore` and `.stylelintignore`.

## Git housekeeping

- **Blame:** mechanical reformatting commits are listed in `.git-blame-ignore-revs`. Enable once per clone: `git config blame.ignoreRevsFile .git-blame-ignore-revs`.
- **No more always-modified `scss/_css-vars.scss`.** WordPress no longer writes into FLEX, so a plain `git status` is clean on a running site; drop any `':(exclude)…/_css-vars.scss'` pathspecs from your checks.

## Known issues

- `gutenberg/blocks/block_feed/feed.js`: `edit()` returns a comma expression, so only the preview renders and the Inspector panel never shows. Unchanged from v3.
- `gutenberg/blocks/block_map/map.js` registers `flexlayout/image` (the image block's name); it is not imported by `blocks.js`, so it's dead code today.
