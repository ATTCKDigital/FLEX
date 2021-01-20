<?php
namespace FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions;

function background_options_video_output( $attributes ) {
	$video = '';
		
	// Save these to make the function more readable
	$hasBackgroundType = array_key_exists('backgroundType', $attributes);
	$hasBackgroundVideo = array_key_exists('backgroundVideo', $attributes);
	$hasBackgroundVideoThumb = array_key_exists('backgroundVideoThumb', $attributes);

	if ($hasBackgroundVideoThumb) {
		$backgroundVideoThumbURL = $attributes['backgroundVideoThumb']['url'];
		$backgroundVideoThumbTitle = $attributes['backgroundVideoThumb']['title'];
	}

	// Construct HTML snippet
	if ( $hasBackgroundType && $attributes['backgroundType'] == 'video' && $hasBackgroundVideo ) {
		$video .= '<div class="component" data-component-name="VideoThumb">';
		$video .= 	'<video class="video-container video-container-overlay" loop="true" muted="true" id="video-' . mt_rand(10,1000) . '">';
		$video .= 		'<source type="video/mp4" src="' . $attributes['backgroundVideo']['url'] . '" />';
		$video .= 	'</video>';

		if ($hasBackgroundVideoThumb) {
			$video .= 	'<div class="video-thumbnail-wrapper">';
			$video .= 		'<img class="element-in-view" src="' . $backgroundVideoThumbURL . '" alt="' . $backgroundVideoThumbTitle . '"/>';
			$video .= 	'</div>';
		}

		$video .= '</div>';
	}

	return $video;
}
?>
