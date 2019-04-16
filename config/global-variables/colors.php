<?php

/**
 * Theme attribute of colors is needed in base theme only, not child theme
 * (see `/config/theme-configs/customizer-colors.php/` for attribute usage)
 */


$colors = array(
	array(
		'default'     => '#2F2F2F',
		'description' => 'Set your site\'s primary text color here.',
		'label'       => 'Primary Text Color',
		'slug'        => 'color-text-primary',
	),
	array(
		'default'     => '#FFFFFF',
		'description' => 'Set your site\'s secondary text color here.',
		'label'       => 'Secondary Text Color',
		'slug'        => 'color-text-secondary',
	),

	array(
		'default'     => '#F5F5F5',
		'description' => 'Set your site\'s link text color here.',
		'label'       => 'Tertiary Text Color',
		'slug'        => 'color-text-link',
	),

	array(
		'default'     => '#F5F5F5',
		'description' => 'Set your site\'s primary background color here.',
		'label'       => 'Primary Background Color',
		'slug'        => 'color-background-primary',
	),
	array(
		'default'     => '#7D7D7D',
		'description' => 'Set your site\'s secondary background color here.',
		'label'       => 'Secondary Background Color',
		'slug'        => 'color-text-primary',
	),

	array(
		'default'     => '#FFFFFF',
		'description' => 'Default White',
		'label'       => 'Default White Text Color',
		'slug'        => 'color-text-white',
	),

	array(
		'default'     => '#000000',
		'description' => 'Default Black',
		'label'       => 'Default Black Text Color',
		'slug'        => 'color-text-black',
	),

);

if(!defined('FLEXLAYOUT_COLORS')) {
	define('FLEXLAYOUT_COLORS', $colors);
}
