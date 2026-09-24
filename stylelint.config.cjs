/**
 * FLEX Stylelint config: the WordPress SCSS preset plus the small, documented
 * set of FLEX overrides (see UPGRADING.md, "Lint presets").
 */
module.exports = {
	extends: '@wordpress/stylelint-config/scss',
	rules: {
		// FLEX class naming: lowercase or camelCase words joined by '-', '_',
		// '__' (element) or '--' (modifier); a leading '-' is ACF's `.-edit`.
		'selector-class-pattern': [
			'^-?[a-z][a-zA-Z0-9]*((-{1,2}|_{1,2})[a-zA-Z0-9]+)*$',
			{
				message:
					"Use FLEX class naming: lowercase or camelCase words joined by '-', '_', '__' (element) or '--' (modifier) (selector-class-pattern)",
			},
		],

		// Prettier (wp-prettier) removes blank lines at the start of a block,
		// so the preset's "always" can never pass for a first nested rule or
		// at-rule. Same rules, plus the `first-nested` exception.
		'rule-empty-line-before': [
			'always',
			{ except: [ 'first-nested' ], ignore: [ 'after-comment' ] },
		],
		'at-rule-empty-line-before': [
			'always',
			{
				except: [ 'blockless-after-blockless', 'first-nested' ],
				ignore: [ 'after-comment' ],
				ignoreAtRules: [ 'else' ],
			},
		],
		'comment-empty-line-before': [
			'always',
			{
				except: [ 'first-nested' ],
				ignore: [ 'stylelint-commands' ],
			},
		],

		// Deferred to WS4 (@use migration): the fix for each of these *is* the
		// @use/@forward migration (module functions such as color.hue() and
		// loading partials by their public, underscore-free name).
		'scss/no-global-function-names': null,
		'scss/load-no-partial-leading-underscore': null,
	},
};
