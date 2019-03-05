<?php

namespace FLEX_LAYOUT_SYSTEM\Components\Scroller;

function scroller_options_output( $attributes ) {
	$scroller = '';
	if ( array_key_exists('showScroller', $attributes) && $attributes['showScroller'] ) {
		$scroller ="<mark class=\"scrollerActive icon-scroller\" data-scroller-id=\"{$attributes['scrollerId']}\"></mark>";
	}
	return $scroller;
}
