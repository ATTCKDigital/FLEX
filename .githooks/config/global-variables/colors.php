<?php
/**
 * Theme attribute of colors is needed in base theme only, not child theme
 * (see `/config/theme-configs/customizer-colors.php/` for attribute usage)
 */

$colors = array(
	array(
		'default'     => '#1d1d1d',
		'description' => 'Set your site\'s primary brand color here.',
		'label'       => 'Brand Primary Color',
		'slug'        => 'color-brand-primary',
	),
	array(
		'default'     => '#838383',
		'description' => 'Set your site\'s secondary brand color here.',
		'label'       => 'Secondary Brand Color',
		'slug'        => 'color-brand-secondary',
	),

	array(
		'default'     => '#feb400',
		'description' => 'Set your site\'s brand accent color here.',
		'label'       => 'Brand Accent Color',
		'slug'        => 'color-brand-accent',
	),

	array(
		'default'     => '#1d1d1d',
		'description' => 'Set your site\'s body text color here.',
		'label'       => 'Body Text Color',
		'slug'        => 'color-text-body',
	),
	array(
		'default'     => '#9e7700',
		'description' => 'Set your site\'s link color here.',
		'label'       => 'Link Color',
		'slug'        => 'color-text-link',
	),

	array(
		'default'     => '#ffce2b',
		'description' => 'Set your site\'s hover color here.',
		'label'       => 'Link Hover Color',
		'slug'        => 'color-text-hover',
	),

	array(
		'default'     => '#FFFFFF',
		'description' => 'Default White',
		'label'       => 'Default White Color',
		'slug'        => 'color-default-white',
	),

	array(
		'default'     => '#000000',
		'description' => 'Default Black',
		'label'       => 'Default Black Color',
		'slug'        => 'color-default-black',
	),

);

if ( !defined('FLEXLAYOUT_COLORS') ) {
	define('FLEXLAYOUT_COLORS', $colors);
}
