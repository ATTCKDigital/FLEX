<?php

$colors = array(
  array(
    'default'     => '#2F2F2F',
    'description' => 'Set your site\'s primary color here.',
    'label'       => 'Primary Color',
    'slug'        => 'primary-color-1',
  ),
  array(
    'default'     => '#FFFFFF',
    'description' => 'Set your site\'s first secondary color here.',
    'label'       => 'Secondary Color 1',
    'slug'        => 'secondary-color-1',
  ),
  array(
    'default'     => '#F5F5F5',
    'description' => 'Set your site\'s second secondary color here.',
    'label'       => 'Secondary Color 2',
    'slug'        => 'secondary-color-2',
  ),
  array(
    'default'     => '#2F2F2F',
    'description' => 'Set your site\'s first background color here.',
    'label'       => 'Background Color 1',
    'slug'        => 'background-color-1',
  ),
  array(
    'default'     => '#FFFFFF',
    'description' => 'Set your site\'s second background color here.',
    'label'       => 'Background Color 2',
    'slug'        => 'background-color-2',
  ),
  array(
    'default'     => '#F5F5F5',
    'description' => 'Set your site\'s third background color here.',
    'label'       => 'Background Color 3',
    'slug'        => 'background-color-3',
  ),
  array(
    'default'     => '#2F2F2F',
    'description' => 'Set your site\'s first text color here.',
    'label'       => 'Text Color 1',
    'slug'        => 'text-color-1',
  ),
  array(
    'default'     => '#FFFFFF',
    'description' => 'Set your site\'s second text color here.',
    'label'       => 'Text Color 2',
    'slug'        => 'text-color-2',
  ),
  array(
    'default'     => '#7D7D7D',
    'description' => 'Set your site\'s third text color here.',
    'label'       => 'Text Color 3',
    'slug'        => 'text-color-3',
  ),
);

if(!defined('ATTCK_COLORS')) {
  define('ATTCK_COLORS', $colors);
}
