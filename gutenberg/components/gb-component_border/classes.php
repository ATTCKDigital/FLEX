<?php

namespace FLEX_LAYOUT_SYSTEM\Components\Border;

function border_options_classes( $attributes ) {
	$class = '';
	$class .= array_key_exists('borderTop', $attributes) ? " component-top-border-{$attributes['borderTop']}" : '';
	$class .= array_key_exists('borderRight', $attributes) ? " component-right-border-{$attributes['borderRight']}" : '';
	$class .= array_key_exists('borderBottom', $attributes) ? " component-bottom-border-{$attributes['borderBottom']}" : '';
	$class .= array_key_exists('borderLeft', $attributes) ? " component-left-border-{$attributes['borderLeft']}" : '';

	return $class;
}
