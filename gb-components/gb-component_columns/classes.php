<?php
namespace FLEX_LAYOUT_SYSTEM\Components\Columns;

function column_options_classes( $attributes ) {
	$class = '';
	$class .= array_key_exists('columnSmall', $attributes) ? " flex-g-sm-{$attributes['columnSmall']}-{$attributes['columnCount']}" : '';
	$class .= array_key_exists('columnMedium,', $attributes) ? " flex-g-md-{$attributes['columnMedium']}-{$attributes['columnCount']}" : '';
	$class .= array_key_exists('columnLarge', $attributes) ? " flex-g-lg-{$attributes['columnLarge']}-{$attributes['columnCount']}" : '';
	$class .= array_key_exists('columnXL', $attributes) ? " flex-g-xl-{$attributes['columnXL']}-{$attributes['columnCount']}" : '';
	return $class;
}
