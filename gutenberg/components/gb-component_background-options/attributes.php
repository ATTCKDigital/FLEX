<?php
namespace FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions;

const BACKGROUND_OPTIONS_ATTRIBUTES = [
	'backgroundType' => [
		'type' => 'string',
		'default' => ''
	],
	'backgroundImage' => [
		'type' => 'object',
	],
	'backgroundImageMobile' => [
		'type' => 'object',
	],
	'backgroundVideo' => [
		'type' => 'object',
	],
	'backgroundVideoThumb' => [
		'type' => 'object',
	],
	'backgroundColor' => [
		'type' => 'string',
	],
	'backgroundOpacity' => [
		'type' => 'number',
		'default' => 100,
	],
	'backgroundPositionX' => [
		'type' => 'string',
		'default' => 'center',
	],
	'backgroundPositionY' => [
		'type' => 'string',
		'default' => 'center',
	],
	'backgroundSize' => [
		'type' => 'string',
		'default' => 'cover',
	],
	'backgroundRepeat' => [
		'type' => 'string',
		'default' => 'no-repeat',
	],
	'backgroundPositionXMobile' => [
		'type' => 'string',
		'default' => 'center',
	],
	'backgroundPositionYMobile' => [
		'type' => 'string',
		'default' => 'center',
	],
	'backgroundSizeMobile' => [
		'type' => 'string',
		'default' => 'cover',
	],
	'backgroundRepeatMobile' => [
		'type' => 'string',
		'default' => 'no-repeat',
	],
];
