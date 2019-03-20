<?php

namespace FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions;

const BACKGROUND_OPTIONS_ATTRIBUTES = [
	'backgroundtype' => [
		'type' => 'string',
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
	'backgroundColor' => [
		'type' => 'string',
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
];
