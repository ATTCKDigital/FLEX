/*
 * FLEX ESLint flat config: the @wordpress/scripts default plus the small,
 * documented set of FLEX overrides (see UPGRADING.md, "Lint presets").
 */
const wpScriptsConfig = require( '@wordpress/scripts/config/eslint.config.cjs' );

module.exports = [
	...wpScriptsConfig,
	{
		ignores: [
			// Installed packages and vendored binaries/fonts are not FLEX source.
			'node_modules/',
			'assets/',
			// Disabled, deprecated blocks kept for other FLEX sites (Q9); removal planned for v5.
			'gutenberg/blocks/block_carousel/',
			'gutenberg/blocks/block_slides/',
			'gutenberg/blocks/block_text/',
			'gutenberg/blocks/block_social_media/',
			'gutenberg/blocks/block_users/',
		],
	},
	{
		// Front-end runtime (the `main` bundle and the raw-enqueued scripts):
		// console.log is FLEX's trace channel. js/debug.js replaces it with a
		// filter that prints only on non-production servers with enhanced
		// console logging enabled, so these calls are deliberate. Editor code
		// (js/admin.js, gutenberg/**) keeps the preset's no-console.
		files: [
			'js/**/*.js',
			'components/**/*.js',
			'gutenberg/blocks/block_animated-gif/swap-gif.js',
			'gutenberg/blocks/block_popup/popup-controller.js',
			'gutenberg/blocks/block_video/play-video.js',
			'gutenberg/components/gb-component_background-options/video-thumb.js',
		],
		ignores: [ 'js/admin.js', 'js/icons.js', 'js/i18n.js' ],
		rules: {
			'no-console': 'off',
		},
	},
	{
		languageOptions: {
			globals: {
				// WordPress editor globals; conversion to @wordpress/* imports is WS4 (Q5).
				wp: 'readonly',
				// jQuery is the WordPress `jquery` external, also provided via ProvidePlugin.
				jQuery: 'readonly',
				$: 'readonly',
				// FLEX client namespace exposed on window.
				FLEX: 'readonly',
			},
		},
		rules: {
			// `FLEX/…` is the child build's webpack alias, not an npm package.
			'import/no-unresolved': [ 'error', { ignore: [ '^FLEX/' ] } ],
		},
	},
];
