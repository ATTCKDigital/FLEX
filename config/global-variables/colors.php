<?php

/**
 * Theme attribute of colors is needed in base theme only, not child theme
 * (see `/config/theme-configs/customizer-colors.php/` for attribute usage)
 */

$colors = array(
	array(
		'default'     => '#2F2F2F',
		'description' => 'Set your site\'s primary color here.',
		'label'       => 'Primary Color',
		'slug'        => 'primary-color-1',
		'theme'				=> 'boilerplate',
	),
	array(
		'default'     => '#7D7D7D',
		'description' => 'Set your site\'s primary hover color here.',
		'label'       => 'Primary Color Hover',
		'slug'        => 'primary-color-1-hover',
		'theme'				=> 'boilerplate',
	),
	array(
		'default'     => '#FFFFFF',
		'description' => 'Set your site\'s first secondary color here.',
		'label'       => 'Secondary Color 1',
		'slug'        => 'secondary-color-1',
		'theme'				=> 'boilerplate',
	),
	array(
		'default'     => '#E7E7E7',
		'description' => 'Set your site\'s first secondary hover color here.',
		'label'       => 'Secondary Color 1 Hover',
		'slug'        => 'secondary-color-1-hover',
		'theme'				=> 'boilerplate',
	),
	array(
		'default'     => '#F5F5F5',
		'description' => 'Set your site\'s second secondary color here.',
		'label'       => 'Secondary Color 2',
		'slug'        => 'secondary-color-2',
		'theme'				=> 'boilerplate',
	),
	array(
		'default'     => '#D9D9D9',
		'description' => 'Set your site\'s second secondary hover color here.',
		'label'       => 'Secondary Color 2 Hover',
		'slug'        => 'secondary-color-2-hover',
		'theme'				=> 'boilerplate',
	),
	array(
		'default'     => '#2F2F2F',
		'description' => 'Set your site\'s first background color here.',
		'label'       => 'Background Color 1',
		'slug'        => 'background-color-1',
		'theme'				=> 'boilerplate',
	),
	array(
		'default'     => '#FFFFFF',
		'description' => 'Set your site\'s second background color here.',
		'label'       => 'Background Color 2',
		'slug'        => 'background-color-2',
		'theme'				=> 'boilerplate',
	),
	array(
		'default'     => '#F5F5F5',
		'description' => 'Set your site\'s third background color here.',
		'label'       => 'Background Color 3',
		'slug'        => 'background-color-3',
		'theme'				=> 'boilerplate',
	),
	array(
		'default'     => '#2F2F2F',
		'description' => 'Set your site\'s first text color here.',
		'label'       => 'Text Color 1',
		'slug'        => 'text-color-1',
		'theme'				=> 'boilerplate',
	),
	array(
		'default'     => '#7D7D7D',
		'description' => 'Set your site\'s first text hover color here.',
		'label'       => 'Text Color 1 Hover',
		'slug'        => 'Text-color-1-hover',
		'theme'				=> 'boilerplate',
	),
	array(
		'default'     => '#FFFFFF',
		'description' => 'Set your site\'s second text color here.',
		'label'       => 'Text Color 2',
		'slug'        => 'text-color-2',
		'theme'				=> 'boilerplate',
	),
	array(
		'default'     => '#CDCDCD',
		'description' => 'Set your site\'s second text hover color here.',
		'label'       => 'Text Color 2 Hover',
		'slug'        => 'Text-color-2-hover',
		'theme'				=> 'boilerplate',
	),
	array(
		'default'     => '#7D7D7D',
		'description' => 'Set your site\'s third text color here.',
		'label'       => 'Text Color 3',
		'slug'        => 'text-color-3',
		'theme'				=> 'boilerplate',
	),
	array(
		'default'     => '#C1C1C1',
		'description' => 'Set your site\'s third text hover color here.',
		'label'       => 'Text Color 3 Hover',
		'slug'        => 'Text-color-3-hover',
		'theme'				=> 'boilerplate',
	),
);

if(!defined('ATTCK_COLORS')) {
	define('ATTCK_COLORS', $colors);
}
