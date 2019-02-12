<?php 
/**** Enable Blocks ****/
// Select blocks that should be available for the project.
// Available Blocks
// Enable your acf created blocks by using acf/block_name
// Enable core acf created blocks by using core/block_name
// Paragraph and heading have been removed because they do not have wrapper divs.


$blocks = array(
	'core/archives',
	'core/audio',
	'core/button',
	'core/categories',
	'core/code',
	'core/cover',
	'core/custom-html',
	'core/file',
	'core/freeform',
	'core/gallery',
	'core/html',
	'core/image',
	'core/latest-comments',
	'core/latest-posts',
	'core/preformatted',
	'core/pullquote',
	'core/quote',
	'core/read-more',
	'core/separator',
	'core/spacer',
	'core/table',
	'core/verse',
	'core/video',
	'core/embed',
	'core-embed/facebook',
	'core-embed/flickr',
	'core-embed/instagram',
	'core-embed/polldaddy',
	'core-embed/slideshare',
	'core-embed/soundcloud',
	'core-embed/spotify',
	'core-embed/twitter',
	'core-embed/vimeo',
	'core-embed/youtube',
	'core/paragraph',
	'core/heading',
	'core/list',
	'core/shortcode',
	'flexls/row',

);

//Additional available embed options
// 'core-embed/animoto',
// 'core-embed/cloudup',
// 'core-embed/collegehumor',
// 'core-embed/dailymotion',
// 'core-embed/funnyordie',
// 'core-embed/hulu',
// 'core-embed/imgur',
// 'core-embed/issuu',
// 'core-embed/kickstarter',
// 'core-embed/meetup-com',
// 'core-embed/mixcloud',
// 'core-embed/photobucket',
// 'core-embed/reddit',
// 'core-embed/reverbnation',
// 'core-embed/screencast',
// 'core-embed/scribd',
// 'core-embed/smugmug',
// 'core-embed/speaker',
// 'core-embed/ted',
// 'core-embed/tumblr',
// 'core-embed/videopress',
// 'core-embed/wordpress-tv',

if(!defined('FLEXLS_BLOCKS')) {
	define('FLEXLS_BLOCKS', $blocks);
}

//Add all of the acf blocks that should be registered. Only put the block name. The components must be named as described in the read me.
$registerBlocks = array(
	'template',
);


if(!defined('FLEXLS_REGISTER_BLOCKS')) {
	define('FLEXLS_REGISTER_BLOCKS', $registerBlocks);
}