<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
	<?php
		// Set the post ID
		global $wp;

		if(is_home()) {
			$ID = get_option( 'page_for_posts' ); //get the ID of the "posts page" as set in Settings > Reading
		} else if(is_category() || is_tag()) {
			// is a category or tag archive
			$ID = get_queried_object()->term_id;
		} else if(is_404()) {
			$ID = '';
		} else if(is_archive()) {
			$ID = '';
		} else {
			$ID = $post->ID;
		}
		echo Utils::render_template('config/theme-includes/meta-tags.php', array(
			'ID' => $ID,
			'wp' => $wp
		));
	?>
	<?php echo Utils::render_template('config/theme-includes/pinterest-verify.php'); ?>

	<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

	<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri() . "/dist/style.css"; ?>" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri() . "/dist/print.css"; ?>" type="text/css" media="print" />
	<?php echo Utils::render_template('config/theme-includes/typekit.php'); ?>
	<?php echo Utils::render_template('config/theme-includes/google-tag-manager-header.php'); ?>
	<?php echo Utils::render_template('config/theme-includes/facebook-pixel.php'); ?>
	<?php wp_head(); ?>
</head>
<body <?php body_class('front-end');?>>
	<?php echo Utils::render_template('config/theme-includes/google-tag-manager-body.php'); ?>
	<?php echo Utils::render_template('config/theme-includes/hubspot-tracking-code.php'); ?>
	<?php echo Utils::render_template('config/theme-includes/social-media.php'); ?>

	<?php //see global-events.js for usage ?>
	<div class="breakpoint global"></div>
	<div class="breakpoint phone"></div>
	<div class="breakpoint tablet-portrait"></div>
	<div class="breakpoint tablet-landscape"></div>
	<div class="breakpoint desktop"></div>
	<div class="breakpoint xl"></div>
	<div class="breakpoint xl2"></div>
	<div class="breakpoint-current"></div>

	<?php echo Utils::render_template('config/theme-includes/svg-sprite.php'); ?>
	<?php echo Utils::render_template('components/component_nav/nav.php'); ?>
	<div class="content-container component" data-component-name="ElementsInViewport Analytics">
		<main class="content" role="main">
