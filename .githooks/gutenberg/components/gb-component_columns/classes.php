<?php
namespace FLEX_LAYOUT_SYSTEM\Components\Columns;

function column_options_classes( $attributes ) {
	$class = '';
	$class .= array_key_exists('columnDefault', $attributes) ? " flex-{$attributes['columnDefault']}-{$attributes['columnCount']}" : '';
	$class .= array_key_exists('columnPhone', $attributes) && $attributes['columnPhone'] != 'inherit' ? " flex-phone-{$attributes['columnPhone']}-{$attributes['columnCount']}" : '';
	$class .= array_key_exists('columnTabletPortrait', $attributes) && $attributes['columnTabletPortrait'] != 'inherit' ? " flex-tablet-portrait-{$attributes['columnTabletPortrait']}-{$attributes['columnCount']}" : '';
	$class .= array_key_exists('columnTabletLandscape', $attributes) && $attributes['columnTabletLandscape'] != 'inherit' ? " flex-tablet-landscape-{$attributes['columnTabletLandscape']}-{$attributes['columnCount']}" : '';
	$class .= array_key_exists('columnDesktop', $attributes) && $attributes['columnDesktop'] != 'inherit' ? " flex-desktop-{$attributes['columnDesktop']}-{$attributes['columnCount']}" : '';
	$class .= array_key_exists('columnXL', $attributes) && $attributes['columnXL'] != 'inherit' ? " flex-xl-{$attributes['columnXL']}-{$attributes['columnCount']}" : '';
	return $class;
}
