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
		'slug'        => 'primary-text-color',
	),
	array(
		'default'     => '#FFFFFF',
		'description' => 'Set your site\'s secondary text color here.',
		'label'       => 'Secondary Text Color',
		'slug'        => 'secondary-text-color',
	),

	array(
		'default'     => '#F5F5F5',
		'description' => 'Set your site\'s tertiary text color here.',
		'label'       => 'Tertiary Text Color',
		'slug'        => 'tertiary-text-color',
	),

	array(
		'default'     => '#F5F5F5',
		'description' => 'Set your site\'s primary background color here.',
		'label'       => 'Primary Background Color',
		'slug'        => 'primary-background-color',
	),
	array(
		'default'     => '#7D7D7D',
		'description' => 'Set your site\'s secondary background color here.',
		'label'       => 'Secondary Background Color',
		'slug'        => 'secondary-background-color',
	),

	array(
		'default'     => '#F6F6F6',
		'description' => 'Set your site\'s tertiary background color here.',
		'label'       => 'Tertiary Background Color',
		'slug'        => 'tertiary-background-color',
	),

	array(
		'default'     => '#FFFFFF',
		'description' => 'Default White',
		'label'       => 'Default White Text Color',
		'slug'        => 'white-text-color',
	),

	array(
		'default'     => '#000000',
		'description' => 'Default Black',
		'label'       => 'Default Black Text Color',
		'slug'        => 'black-text-color',
	),

);

if(!defined('FLEXLS_COLORS')) {
	define('FLEXLS_COLORS', $colors);
}
