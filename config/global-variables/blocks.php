<?php 
/**** Enable Blocks ****/
// Select blocks that should be available for the project.
// Available Blocks
// okatodo: verify names and get list of embeds


$blocks = array(
	'core/paragraph',
	'core/list',
	'core/heading',
	'core/subhead',
	'core/table',
	'core/button',
	'core/classic',
	'core/image',
	'core/cover-image',
	'core/gallery',
	'core/audio',
	'core/video',
	'core/quote',
	'core/pullquote',
	'core/verse',
	'core/code',
	'core/preformatted',
	'core/custom-html',
	'core/shortcodes',
	'core/layout',
	'core/columns',
	'core/text-columns',
	'core/separator',
	'core/read-more',
);

if(!defined('ATTCK_BLOCKS')) {
	define('ATTCK_BLOCKS', $blocks);
}