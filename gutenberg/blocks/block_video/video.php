<?php
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
		'attributes'      => array_merge(
			[
				'className' => [
                    'type' => 'string',
                    'default' => '',
                ],
               	'uploadVideo' => [
					'type' => 'object',
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

/**
 * Server rendering for /blocks/row
 */
function render_video_block($attributes, $content) {
	$class = $attributes['className'];
	$class .= ' component-video component';
	$class .= margin_options_classes($attributes);
	$class .= border_options_classes($attributes);

	$video = '';
	$videoId = '';
	$youtubeVideoId = '';
    $brightcoveVideoId = '';
    $brightcoveAccountId = '';

	if ( array_key_exists('uploadVideo', $attributes) ) {
		$videoId = 'video-'.mt_rand(10,1000);
		$video = '<video id="'.$videoId.'"><source type="video/mp4" src="'.$attributes['uploadVideo']['url'].'" /></video>';
	} else if (array_key_exists('youtubeVideo', $attributes) && $attributes['youtubeVideo'] !== "") {
		$youtubeVideoId = $attributes['youtubeVideo'];
		$videoId = $youtubeVideoId;
		$video = '<div id="player" data-video-id="'.$youtubeVideoId.'"></div>';
	} else if (array_key_exists('brightcoveVideo', $attributes)  && $attributes['brightcoveVideo'] !== "") {
        $brightcoveVideoId = $attributes['brightcoveVideo'];
        $brightcoveAccountId = $attributes['brightcoveAccount'];
        $videoId = $brightcoveVideoId;
        $video = '<video class="video-js" data-account="'.$brightcoveAccountId.'" data-player="default" data-embed="default" controls data-video-id="'.$brightcoveVideoId.'"></video><script src="https://players.brightcove.net/5098879600001/default_default/index.min.js"></script>';
    }

	$thumbnail = '';
	if ( array_key_exists('videoThumbnail', $attributes) ) {
		$thumbnail = '<div class="video-thumbnail-wrapper"><img src="'.$attributes['videoThumbnail']['url'].'" alt="'.$attributes['videoThumbnail']['url'].'"/></div>';
	}


	$output = "<div class=\"{$class}\" data-component-name=\"Video\"><div class=\"video-wrapper\" data-video-type=\"{$attributes['videoType']}\">{$thumbnail}<mark class=\"playVideo play\" data-video-id=\"{$videoId}\" ></mark><mark class=\"pauseVideo close\" data-video-id=\"{$videoId}\"></mark>{$video}</div></div>";

	return $output;
}
