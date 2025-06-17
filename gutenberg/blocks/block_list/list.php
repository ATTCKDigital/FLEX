<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\ListBlock;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Border\BORDER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\TextColors\TEXT_COLOR_ATTRIBUTES;

/**
 * Converts a VDOM children array to an HTML string.
 * Handles basic tags like strong, em, a.
 *
 * @param array $children The VDOM children array.
 * @return string The HTML string.
 */
function convert_vdom_children_to_html_recursive(array $children) {
    $html = '';
    foreach ($children as $child) {
        if (is_string($child)) {
            $html .= esc_html($child); // Escape plain text portions
        } elseif (is_array($child) && isset($child['type'])) {
            $tag_name = esc_attr(strtolower($child['type'])); // e.g., 'strong', 'em', 'a'
            
            // Basic allowed tags - expand as needed
            $allowed_inline_tags = ['strong', 'em', 'b', 'i', 'u', 's', 'a', 'span', 'br'];
            if (!in_array($tag_name, $allowed_inline_tags)) {
                // If tag is not allowed, just process its children if any, or skip
                if (isset($child['props']['children']) && is_array($child['props']['children'])) {
                    $html .= convert_vdom_children_to_html_recursive($child['props']['children']);
                }
                continue;
            }

            $attributes_string = '';
            if (isset($child['props'])) {
                foreach ($child['props'] as $prop_name => $prop_value) {
                    if ($prop_name === 'children') {
                        continue;
                    }
                    // Very basic attribute handling, e.g., for href in <a>
                    if ($tag_name === 'a' && $prop_name === 'href' && is_string($prop_value)) {
                        $attributes_string .= ' href="' . esc_url($prop_value) . '"';
                    }
                    if ($tag_name === 'a' && $prop_name === 'target' && is_string($prop_value)) {
                         $attributes_string .= ' target="' . esc_attr($prop_value) . '"';
                    }
                     if ($tag_name === 'a' && $prop_name === 'rel' && is_string($prop_value)) {
                         $attributes_string .= ' rel="' . esc_attr($prop_value) . '"';
                    }
                    // Add more attribute handling here if needed (e.g., class, style for spans)
                }
            }

            $html .= "<{$tag_name}{$attributes_string}>";
            if (isset($child['props']['children']) && is_array($child['props']['children'])) {
                $html .= convert_vdom_children_to_html_recursive($child['props']['children']);
            }
            $html .= "</{$tag_name}>";
        }
        // Else: ignore other types of children for now
    }
    return $html;
}

add_action( 'init', __NAMESPACE__ . '\register_list_block' );

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_list_block() {
	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/list', [
		'attributes'	  => array_merge(
			[
				'content' => [
					'type' => 'array',
					'default' => [],
					// 'items' => [       // Define the structure of objects within the array
					// 	'type' => 'object',
					// 	'properties' => [
					// 		'type' => [ 'type' => 'string' ], // e.g., "li"
					// 		'props' => [
					// 			'type' => 'object',
					// 			'properties' => [
					// 				'children' => [
					// 					'type' => 'array',    // children is an array
					// 					'items' => [          // that can contain strings or other VDOM nodes
					// 						// This part is tricky because children can be mixed.
					// 						// For simplicity, we might assume strings here, or handle complex structures in render.
					// 						// Let's start by assuming strings for now for easier PHP handling.
					// 						// A more robust 'items' here would describe the VDOM node structure.
					// 						// For now, let's keep it simpler and parse in the render function.
					// 						'type' => 'string' // This is a simplification.
					// 					],
					// 				],
					// 				// Potentially other props like 'className' on the li itself
					// 			],
					// 		],
					// 	],
					// ],
				],
				'ordered' => [
					'type' => 'boolean',
					'default' => false,
				],
				'className' => [
					'type' => 'string',
					'default' => '',
				],
				'align' => [
					'type' => 'string',
					'default' => 'left'
				],
			],
			MARGIN_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES,
			BORDER_OPTIONS_ATTRIBUTES,		
			TEXT_COLOR_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_list_block',
	] );
}

/**
 * Server rendering for /blocks/list
 */
function render_list_block($attributes) {
	// error_log('--- render_list_block_final ---');
    // error_log('Attributes: ' . print_r($attributes, true));

    $is_ordered = !empty($attributes['ordered']);
    $list_tag_name = $is_ordered ? 'ol' : 'ul';
    
    // --- Setup wrapper classes and styles (condensed for brevity) ---
    $align = isset($attributes['align']) ? esc_attr($attributes['align']) : 'left';
    $custom_classname = isset($attributes['className']) ? esc_attr($attributes['className']) : '';
    $wrapper_classes_arr = ['component-list'];
	$wrapper_classes_arr[] = margin_options_classes($attributes);
    $wrapper_classes_arr[] = padding_options_classes($attributes);
    $wrapper_classes_arr[] = border_options_classes($attributes);
    // Add margin_options_classes($attributes), padding_options_classes($attributes) etc. to $wrapper_classes_arr
    $wrapper_classes = esc_attr(implode(' ', array_filter($wrapper_classes_arr)));
    
    $list_element_classes_arr = ['component-list', 'has-text-align-' . $align];

    if ($custom_classname) {
        $list_element_classes_arr[] = $custom_classname;
    }
    // Add TextColorClasses($attributes) if it returns class names for the list element
    $list_element_classes = esc_attr(implode(' ', array_filter($list_element_classes_arr)));

    $list_element_styles_arr = [];
    // Add TextColorInlineStyles($attributes) if it returns inline styles
    // e.g., if (isset($attributes['textColor'])) $list_element_styles_arr[] = 'color:' . esc_attr($attributes['textColor']);
    $list_style_attribute = !empty($list_element_styles_arr) ? 'style="' . implode(';', $list_element_styles_arr) . '"' : '';
    // --- End class/style setup ---

    $list_items_html = '';
    $content_vdom_items = isset($attributes['content']) && is_array($attributes['content']) ? $attributes['content'] : [];

    // error_log('Content VDOM items to process: ' . print_r($content_vdom_items, true));

    if (!empty($content_vdom_items)) {
        foreach ($content_vdom_items as $index => $vdom_item) { // $vdom_item is an associative array
            // error_log("Processing VDOM item at index {$index}: " . print_r($vdom_item, true));
            $item_text_content = '';

            // Check if it's an array (associative array from JSON) and has the expected structure
            if (is_array($vdom_item) && 
                isset($vdom_item['type']) && // e.g., 'li' (though for content this might not be present if it's just the children)
                isset($vdom_item['props']) && is_array($vdom_item['props']) &&
                isset($vdom_item['props']['children']) && is_array($vdom_item['props']['children'])) {

                // Use the new recursive VDOM to HTML converter
				$item_html_content = convert_vdom_children_to_html_recursive($vdom_item['props']['children']);
				$list_items_html .= '<li>' . wp_kses_post($item_html_content) . '</li>'; // wp_kses_post for safety

            // This handles the case where `attributes.content` might be an array of HTML strings
			// (which is a common way RichText multiline='li' can save data if not using `source: 'children'`)
			} else if (is_string($vdom_item)) {
				error_log("VDOM item at index {$index} is a string. Treating as HTML.");
				$list_items_html .= '<li>' . wp_kses_post($vdom_item) . '</li>';
			}
			else {
				error_log("VDOM item at index {$index} is not in the expected format or is not a string.");
			}
        }
    } else {
        error_log('Content VDOM array is empty.');
    }

    $output  = "<div class=\"{$wrapper_classes}\">";
    $output .= "<{$list_tag_name} class=\"{$list_element_classes}\" {$list_style_attribute}>";
    $output .= $list_items_html;
    $output .= "</{$list_tag_name}>";
    $output .= "</div>";

    error_log('Final HTML output: ' . $output);
    return $output;
	
    // // Determine list type
    // $tagName = !empty($attributes['ordered']) ? 'ol' : 'ul';

    // // Initialize class names preserving original settings
    // $class = 'component-list component';
    // if (!empty($attributes['className'])) {
    //     $class .= ' ' . $attributes['className'];
    // }
    // if (!empty($attributes['align'])) {
    //     $class .= " align-{$attributes['align']}";
    // }
    // $class .= margin_options_classes($attributes);
    // $class .= padding_options_classes($attributes);
    // $class .= border_options_classes($attributes);

    // // Handle text color styles
    // $textColor = array_key_exists('textColor', $attributes) ? $attributes['textColor'] : null;
    // $textStyle = $textColor ? ' style="color:' . esc_attr($textColor) . ';"' : '';

    // // Gutenberg provides fully-formed nested HTML lists, directly render it
    // $content = isset($attributes['content']) ? $attributes['content'] : '';

    // // Output with nested list support intact
    // $output = sprintf(
    //     '<div class="%s"%s>%s</div>',
    //     esc_attr($class),
    //     $textStyle,
    //     $content // $content already contains <ul>/<ol> structure from Gutenberg
    // );

    // return $output;
}
