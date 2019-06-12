<?php

namespace FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions;

function background_options_video_output( $attributes ) {
	$video = '';
	if ( array_key_exists('backgroundType', $attributes) && $attributes['backgroundType'] == 'video' && array_key_exists('backgroundVideo', $attributes) ) {
		$video = '<div class="component" data-component-name="VideoThumb"><video class="video-container video-container-overlay" loop="true" muted="true" id="video-'.mt_rand(10,1000).'"><source type="video/mp4" src="'.$attributes['backgroundVideo']['url'].'" /></video><div class="video-thumbnail-wrapper"><img class="element-in-view" src="'.$attributes['backgroundVideoThumb']['url'].'" alt="'.$attributes['backgroundVideoThumb']['title'].'"/></div></div>';
	}
	return $video;
}
