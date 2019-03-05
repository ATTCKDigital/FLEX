<?php

namespace FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions;

function background_options_video_output( $attributes ) {
	$video = '';
	if ( array_key_exists('backgroundType', $attributes) && $attributes['backgroundType'] == 'video' && array_key_exists('backgroundVideo', $attributes) ) {
		$video = "<video class=\"video-container video-container-overlay\" autoPlay=\"true\" loop=\"true\" muted=\"true\"><source type=\"video/mp4\" src=\"{$attributes['backgroundVideo']['url']}\" /></video>";
	}
	return $video;
}
