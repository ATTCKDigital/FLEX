<?php
// If field 'row_display_name' is added to a layout, it will be used to 
// rename the row to a more user-friendly name
function my_acf_flexible_content_layout_title( $title, $field, $layout, $i ) {
	// Remove layout title from text
	// Load text sub field
	if ($field = get_sub_field('row_display_name')) {
		$text = get_sub_field('row_type');

		if ($text['value'] == 'standard') {
			$text = 'Standard Row';
		} elseif ($text['value'] == 'full-bleed') {
			$text = 'Full Bleed Row';
		} else {
			$number = get_sub_field('number_of_columns');
			$text = $number.' Column';
		}

		$title = '';
		$title .= $field.' - '. $text;
	}	
	
	return $title;
}

// Name
add_filter('acf/fields/flexible_content/layout_title/name=layout', 'my_acf_flexible_content_layout_title', 10, 4);
add_filter('acf/fields/flexible_content/layout_title/name=column', 'my_acf_flexible_content_layout_title', 10, 4);
?>