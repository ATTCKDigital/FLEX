<?php
/**
 * Theme attribute of colors is needed in base theme only, not child theme
 * (see `/config/theme-configs/customizer-colors.php/` for attribute usage)
 */

$colors = array(
	array(
		'default'     => '#1d1d1d',
		'description' => '',
		'label'       => 'Brand Primary',
		'slug'        => 'color-brand-primary',
	),
	array(
		'default'     => '#838383',
		'description' => '',
		'label'       => 'Brand Secondary',
		'slug'        => 'color-brand-secondary',
	),

	array(
		'default'     => '#feb400',
		'description' => '',
		'label'       => 'Brand Accent',
		'slug'        => 'color-brand-accent',
	),

	array(
		'default'     => '#1d1d1d',
		'description' => '',
		'label'       => 'Body Text',
		'slug'        => 'color-text-body',
	),
	array(
		'default'     => '#9e7700',
		'description' => '',
		'label'       => 'Links',
		'slug'        => 'color-text-link',
	),

	array(
		'default'     => '#ffce2b',
		'description' => '',
		'label'       => 'Link Hover',
		'slug'        => 'color-text-hover',
	),

	array(
		'default'     => '#FFFFFF',
		'description' => '',
		'label'       => 'Default White',
		'slug'        => 'color-default-white',
	),

	array(
		'default'     => '#000000',
		'description' => '',
		'label'       => 'Default Black',
		'slug'        => 'color-default-black',
	),

	array(
		'default'     => '#F3D09E',
		'description' => '',
		'label'       => 'Primary #1',
		'slug'        => 'color-primary-one',
	),

	array(
		'default'     => '#F0E27B',
		'description' => '',
		'label'       => 'Primary #2',
		'slug'        => 'color-primary-two',
	),

	array(
		'default'     => '#59869F',
		'description' => '',
		'label'       => 'Primary #3',
		'slug'        => 'color-primary-three',
	),

	array(
		'default'     => '#FFE591',
		'description' => '',
		'label'       => 'Primary #3 (muted)',
		'slug'        => 'color-primary-three-muted',
	)

);

if ( !defined('FLEXLAYOUT_COLORS') ) {
	define('FLEXLAYOUT_COLORS', $colors);
}

// TODO: Add colors for approved, caution, failed, and unavailable. -DP
// Styleguide example: https://drive.google.com/drive/u/0/folders/1yHp7fSb62S2gZEnpkZ6_yIfM6EeezQd5