<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Share;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Border\BORDER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\BackgroundColorOptions\BACKGROUND_COLOR_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundColorOptions\background_color_options_inline_styles;
use const FLEX_LAYOUT_SYSTEM\Components\TextColors\TEXT_COLOR_ATTRIBUTES;

add_action( 'init', __NAMESPACE__ . '\register_share_block' );
/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_share_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/share', [
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
				'email' => [
					'type' => 'boolean',
					'default' => 'false',
				],
				'linkedin' => [
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
		'render_callback' => __NAMESPACE__ . '\render_share_block',
	] );

}

/**
 * Server rendering for /blocks/social-media
 */
function render_share_block($attributes) {
	$class = " {$attributes['className']}";
	$class .= margin_options_classes($attributes);
	$class .= padding_options_classes($attributes);
	$class .= border_options_classes($attributes);
	$classInner = " align-{$attributes['align']}";
	$textColor = array_key_exists('textColor', $attributes) ? $attributes['textColor'] : null;
	$style = background_color_options_inline_styles($attributes);
	$styleIcon = '';
	
	if($textColor) {
		$style .= ' color:'.$textColor.';';
		$styleIcon .= ' style="border-color:'.$textColor.';"';
	}

	$twitter = get_field('twitter_username', 'options');

	$facebookLink = '';
	$twitterLink = '';
	$linkedinLink = '';
	$emailLink = '';

	$postID = get_the_ID();
	$url = get_the_permalink($postID);
	$encoded = urlencode($url);
	$postTitle = get_field('og_title', $postID);
	if($postTitle) {
		$postTitle = $postTitle;
	} else {
		$postTitle = get_the_title($postID);
	}
	$search = array(
      	'&#8220;',
		'&#8221;',
		'&#8216;',
		'&#8217;',
		'&#8211;',
		'#'
	);

	$replace = array(
		'\"',
		'\"',
		"\'",
		"\'",
		"-",
		"%23"
	);
	$newtitle = str_replace($search, $replace, $postTitle);

	if($attributes['facebook'] == 'true') {
		$facebookLink = '<mark class="social-icon margin-right-2x sharelink"'.$styleIcon.'><a href="https://www.facebook.com/sharer/sharer.php?u='.$encoded.'" data-options="menubar=1,resizable=1,width=600,height=400" target="_blank" aria-label="link to share on Facebook"><i class="fab fa-facebook-f"></i></a></mark>';
	}

	if($attributes['twitter'] == 'true') {
		$twitterLink = '<mark class="social-icon margin-right-2x sharelink"'.$styleIcon.'><a href="https://twitter.com/home/?status='.$newtitle.': '.$encoded.' via @'. get_field('twitter_username', 'options').'" data-options="menubar=1,resizable=1,width=600,height=400" target="_blank" aria-label="link to share on Twitter"><i class="fab fa-twitter"></i></a></mark>';
	}

	if($attributes['linkedin'] == 'true') {
		$linkedinLink = '<mark class="social-icon margin-right-2x"'.$styleIcon.'><a href="https://www.linkedin.com/sharing/share-offsite/?mini=true&url='.$encoded.'&title='.$newtitle.' data-options="menubar=1,resizable=1,width=600,height=400" " target="_blank" aria-label="link to share on Linkedin"><i class="fab fa-linkedin-in"></i></a></mark>';
	}

	if($attributes['email'] == 'true') {
		$emailLink = '<mark class="social-icon margin-right-2x"'.$styleIcon.'><a href="mailto:?subject=I thought you might be interested in '.$newtitle.'&body='.$newtitle .' '.$encoded.'" data-options="menubar=1,resizable=1,width=600,height=400" target="_blank" aria-label="link to share via email"><i class="far fa-envelope"></i></a></mark>';
	}


	$output = '<div class="component-share component '.$class.'" style="'.$style.'" data-component-name="Share"><div class="share-list'.$classInner.'"><span class="caption2 display-inline-block uppercase margin-right-2x">Share</span>'.$facebookLink.$twitterLink.$linkedinLink.$emailLink.'</div></div>';

	return $output;
}

