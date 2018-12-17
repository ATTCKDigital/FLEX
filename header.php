<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
	<?php 
		// Set the post ID
		global $wp;

		if(is_home()) {
			$ID = get_option( 'page_for_posts' ); //get the ID of the "posts page" as set in Settings > Reading
		} elseif(is_404() || is_category() || is_search() || is_archive()) {
			$ID = ''; //okadtodo: check what happens on these pages
		} else {
			$ID = $post->ID;
		}
		echo Utils::render_template('config/theme-includes/og-tags.php', array(
			'ID' => $ID,
			'wp' => $wp
		)); 
	?>
	<meta name="description" content="<?= $excerpt; ?>">
	<title><?php is_front_page() ? bloginfo('name') : wp_title(''); ?> | <?php is_front_page() ? bloginfo('description') : bloginfo('name'); ?></title>
	<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<link rel="stylesheet" href="<?php echo get_template_directory_uri() . "/dist/css/style.css"; ?>" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo get_template_directory_uri() . "/dist/css/print.css"; ?>" type="text/css" media="print" />
	<?php echo Utils::render_template('config/theme-includes/google-tag-manager-header.php'); ?>
	<?php wp_head(); ?>
</head>
<body <?php body_class();?>>
	<?php echo Utils::render_template('config/theme-includes/google-tag-manager-body.php'); ?>
	<?php //echo Utils::render_template('config/theme-includes/hubspot-tracking-code.php'); ?>

	<?php //see app.js for usage ?>
	<div class="breakpoint phone"></div>
	<div class="breakpoint tablet-portrait"></div>
	<div class="breakpoint tablet-landscape"></div>
	<div class="breakpoint desktop"></div>
	<div class="breakpoint xl"></div>


	<?php echo Utils::render_template('config/theme-includes/svg-sprite.php'); ?>
	<?php echo Utils::render_template('components/component_nav/nav.php'); ?>
	<div class="content-container component">
		<main class="content">
