<?php
// Adds a custom class to every youtube or vimeo video inserted into a post using just a url, to allow for responsive video
function flexlayout_wrap_embed_with_div($html, $url, $attr) {
		if (strpos($url, 'youtube') !== false) {
			return '<div class="video-wrapper">' . $html . '</div>';
		} elseif (strpos($url, 'vimeo') !== false) {
			return '<div class="video-wrapper">' . $html . '</div>';
		} else {
			return $html;
		}
}
add_filter('embed_oembed_html', 'flexlayout_wrap_embed_with_div', 10, 3);