<?php

namespace FLEX_LAYOUT_SYSTEM\Components\RowHeight;

function row_height_options_classes( $attributes ) {
	return array_key_exists('rowHeight', $attributes) ? " component-row-height-{$attributes['rowHeight'] }" : '';
}
