<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\SocialMedia;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Border\BORDER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\BackgroundColorOptions\BACKGROUND_COLOR_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundColorOptions\background_color_options_inline_styles;
use const FLEX_LAYOUT_SYSTEM\Components\TextColors\TEXT_COLOR_ATTRIBUTES;

add_action( 'init', __NAMESPACE__ . '\register_socialmedia_block' );
/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_socialmedia_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/socialmedia', [
		'attributes'      => array_merge(
			[
				'facebook' => [
					'type' => 'boolean',
					'default' => 'false',
				],
				'twitter' => [
					'type' => 'boolean',
					'default' => 'false',
				],
				'instagram' => [
					'type' => 'boolean',
					'default' => 'false',
				],
				'linkedin' => [
					'type' => 'boolean',
					'default' => 'false',
				],
				'youtube' => [
					'type' => 'boolean',
					'default' => 'false',
				],
				'pinterest' => [
					'type' => 'boolean',
					'default' => 'false',
				],
				'medium' => [
					'type' => 'boolean',
					'default' => 'false',
				],
				'github' => [
					'type' => 'boolean',
					'default' => 'false',
				],
				'className' => [
                    'type' => 'string',
                    'default' => ''
                ],
                'align' => [
					'type' => 'string',
					'default' => 'center'
				]

			],
			MARGIN_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES,
			BORDER_OPTIONS_ATTRIBUTES,
			TEXT_COLOR_ATTRIBUTES,
			BACKGROUND_COLOR_OPTIONS_ATTRIBUTES

		),
		'render_callback' => __NAMESPACE__ . '\render_socialmedia_block',
	] );

}

/**
 * Server rendering for /blocks/social-media
 */
function render_socialmedia_block($attributes) {
	$class = " {$attributes['className']}";
	$class .= margin_options_classes($attributes);
	$class .= padding_options_classes($attributes);
	$class .= border_options_classes($attributes);
	$classInner = " align-{$attributes['align']}";
	$textColor = array_key_exists('textColor', $attributes) ? $attributes['textColor'] : null;
	$style = background_color_options_inline_styles($attributes);

	if($textColor) {
		$style .= ' color:'.$textColor.';';
	}

	$facebook = get_field('facebook_url', 'options');
	$twitter = get_field('twitter_username', 'options');
	$instagram =get_field('instagram_username', 'options');
	$linkedin = get_field('linkedin_url', 'options');
	$medium = get_field('medium_url', 'options');
	$youtube = get_field('youtube_url', 'options');
	$pinterest = get_field('pinterest_username', 'options');
	$github = get_field('github_url', 'options');

	$facebookLink = '';
	$twitterLink = '';
	$instagramLink = '';
	$pinterestLink = '';
	$linkedinLink = '';
	$mediumLink = '';
	$youtubeLink = '';
	$githubLink = '';

	if($attributes['facebook'] == 'true' && $facebook) {
		$facebookLink = '<mark class="social-icon margin-right-2x"><a href="'.$facebook.'" target="_blank"><i class="fab fa-facebook-f" aria-label="Visit our Facebook page"></i></a></mark>';
	}

	if($attributes['twitter'] == 'true' && $twitter) {
		$twitterLink = '<mark class="social-icon margin-right-2x"><a href="https://twitter.com/'.$twitter.'" target="_blank" aria-label="Visit our Twitter page"><i class="fab fa-twitter"></i></a></mark>';
	}

	if($attributes['instagram'] == 'true' && $instagram) {
		$instagramLink = '<mark class="social-icon margin-right-2x"><a href="https://www.instagram.com/'.$instagram.'" target="_blank" aria-label="Visit our Instagram page"><i class="fab fa-instagram"></i></a></mark>';
	}

	if($attributes['pinterest'] == 'true' && $pinterest) {
		$pinterestLink = '<mark class="social-icon margin-right-2x"><a href="https://www.pinterest.com/'.$pinterest.'" target="_blank" aria-label="Visit our Pinterest page"><i class="fab fa-pinterest-p"></i></a></mark>';
	}
	if($attributes['linkedin'] == 'true' && $linkedin) {
		$linkedinLink = '<mark class="social-icon margin-right-2x"><a href="'.$linkedin.'" target="_blank" aria-label="Visit our LinkedIn page"><i class="fab fa-linkedin-in"></i></a></mark>';
	}

	if($attributes['medium'] == 'true' && $medium) {
		$mediumLink = '<mark class="social-icon margin-right-2x"><a href="'.$medium.'" target="_blank" aria-label="Visit our Medium page"><i class="fab fa-medium-m"></i></a></mark>';
	}

	if($attributes['youtube'] == 'true' && $youtube) {
		$youtubeLink = '<mark class="social-icon margin-right-2x"><a href="'.$youtube.'" target="_blank" aria-label="Visit our YouTube page"><i class="fab fa-youtube"></i></a></mark>';
	}

	if($attributes['github'] == 'true' && $github) {
		$githubLink = '<mark class="social-icon margin-right-2x"><a href="'.$github.'" target="_blank" aria-label="Visit our Github page"><i class="fab fa-github"></i></a></mark>';
	}


	$output = '<div class="component-social-media component '.$class.'" style="'.$style.'"><div class="social-media-list'.$classInner.'">'.$facebookLink.$twitterLink.$instagramLink.$linkedinLink.$mediumLink.$youtubeLink.'</div></div>';

	return $output;
}

