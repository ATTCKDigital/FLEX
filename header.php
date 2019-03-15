<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
	<?php
		// Set the post ID
		global $wp;

		if(is_home()) {
			$ID = get_option( 'page_for_posts' ); //get the ID of the "posts page" as set in Settings > Reading
		} else if(is_archive()) {
			$ID = get_queried_object()->term_id;
		} else if(is_404()) {
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

	<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri() . "/dist/css/style.css"; ?>" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri() . "/dist/css/print.css"; ?>" type="text/css" media="print" />
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
	<div class="breakpoint small"></div>
	<div class="breakpoint medium"></div>
	<div class="breakpoint large"></div>
	<div class="breakpoint xl"></div>
	<div class="breakpoint 2xl"></div>
	<div class="breakpoint 3xl"></div>
	<div class="breakpoint 4xl"></div>
	<div class="breakpoint 5xl"></div>
	<div class="breakpoint-current"></div>


	<?php echo Utils::render_template('config/theme-includes/svg-sprite.php'); ?>
	<?php echo Utils::render_template('components/component_nav/nav.php'); ?>
	<div class="content-container component" data-component-name="ElementsInViewport">
		<main class="content">
