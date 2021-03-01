<?php
// TODO: (DP)
// — Add Vimeo
// — Add support for autoplay, looping

namespace FLEX_LAYOUT_SYSTEM\Blocks\Video;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Border\BORDER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;

add_action( 'init', __NAMESPACE__ . '\register_video_block' );

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_video_block() {
	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/video', [
		'attributes' => array_merge(
			[
				'className' => [
                    'type' => 'string',
                    'default' => '',
                ],
               	'uploadVideo' => [
					'type' => 'object',
				],
				'controls' => [
					'type' => 'string',
					'default' => ''
				],
				'showControls' => [
					'type' => 'boolean',
					'default' => false
				],
				'videoThumbnail' => [
					'type' => 'object',
				],
				'videoType' => [
					'type' => 'string',
					'default' => '',
				],
				'youtubeVideo' => [
					'type' => 'string',
					'default' => '',
				],
                'brightcoveVideo' => [
                    'type' => 'string',
                    'default' => '',
                ],

			],
			MARGIN_OPTIONS_ATTRIBUTES,
			BORDER_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_video_block',
	] );
}

// Server rendering for /blocks/row
function render_video_block($attributes, $content) {
	$class = $attributes['className'];
	$class .= ' component-video component';
	$class .= margin_options_classes($attributes);
	$class .= border_options_classes($attributes);

	// Initialize placeholder vars and defaults
	$video = '';
	$videoId = '';
	$youtubeVideoId = '';
    $brightcoveVideoId = '';
    $brightcoveAccountId = '';
    $videoPlayerAttributes = '';
    $thumbnail = '';

    $isAutoplay = false;
    $isUploadedVideo = array_key_exists('uploadVideo', $attributes);
    $isYouTubeVideo = array_key_exists('youtubeVideo', $attributes);
    $hasYouTubeVideoURL = ($attributes['youtubeVideo'] !== '');
    $hasVideoThumbnail = array_key_exists('videoThumbnail', $attributes);
    // $controls = $attributes['controls'];

    // print_r($attributes);

    // Insert thumbnail if one exists
	if ($hasVideoThumbnail) {
		$thumbnail = '<div class="video-thumbnail-wrapper"><img src="' . $attributes['videoThumbnail']['url'] . '" alt="' . $attributes['videoThumbnail']['url'] . '"/></div>';

	// Assume if no thumbnail, this video should autoplay in place
	} else {
		if ($isUploadedVideo) {
			// Augment <video> attributes
			$videoPlayerAttributes .= ' autoplay loop muted';

			// This will cause the player controls to show
			$class .= ' playingVideo autoplayingVideo';

			// Save this flag for later
			$isAutoplay = true;
		}
	}

	// Default will be empty string, otherwise will be 'controls'
	if ($attributes['controls'] == 'controls') {
		$videoPlayerAttributes .= ' ' . $attributes['controls'];
	}

    // Handle uploaded videos
	if ($isUploadedVideo) {
		// Generate a random number to use for the player ID so we can have multiple players on the same page
		$videoId = 'video-' . mt_rand(10,1000);
		$video = '<video id="' . $videoId . '" ' . $videoPlayerAttributes . '><source type="video/mp4" src="' . $attributes['uploadVideo']['url'] . '" />Sorry, your browser doesn\'t support embedded videos.</video>';

	// Handle YouTube Videos
	} else if ($isYouTubeVideo && $hasYouTubeVideoURL) {
		$youtubeVideoId = $attributes['youtubeVideo'];
		$videoId = $youtubeVideoId;
		$video = '<div id="player_' . $youtubeVideoId . '" class="youtubePlayer" data-video-id="' . $youtubeVideoId . '"></div>';

	// Handle Brightcove Videos
	} else if (array_key_exists('brightcoveVideo', $attributes)  && $attributes['brightcoveVideo'] !== "") {
        $brightcoveVideoId = $attributes['brightcoveVideo'];
        $brightcoveAccountId = $attributes['brightcoveAccount'];
        $videoId = $brightcoveVideoId;
        $video = '<video class="video-js" data-account="' . $brightcoveAccountId . '" data-player="default" data-embed="default" controls data-video-id="' . $brightcoveVideoId . '"></video><script src="https://players.brightcove.net/5098879600001/default_default/index.min.js"></script>';
    }

    // Assemble vars into final HTML output
	$output = "";

	$output .= "<div class=\"{$class}\" data-component-name=\"Video\">";
	$output .= 		"<div class=\"video-wrapper\" data-video-type=\"{$attributes['videoType']}\">";
	$output .= 			"{$thumbnail}";
	
	// Prevent player controls from showing
	if (!$isAutoplay) {
		$output .= 			"<mark class=\"playVideo play\" data-video-id=\"{$videoId}\" ></mark>";
		$output .= 			"<mark class=\"pauseVideo close\" data-video-id=\"{$videoId}\"></mark>";
	}

	$output .= 			"{$video}";
	$output .= 		"</div>";
	$output .= "</div>";

	return $output;
}
