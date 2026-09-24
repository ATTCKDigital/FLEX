/**
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
			// Vendored minified three.js UMD bundle.
			'js/three.min.js',
			// Rewritten by WordPress at runtime; never hand-edited.
			'scss/_css-vars.scss',
			// Disabled, deprecated blocks kept for other FLEX sites (Q9); removal planned for v5.
			'gutenberg/blocks/block_carousel/',
			'gutenberg/blocks/block_slides/',
			'gutenberg/blocks/block_text/',
			'gutenberg/blocks/block_social_media/',
			'gutenberg/blocks/block_users/',
		],
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
