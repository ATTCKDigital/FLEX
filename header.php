<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
	<?php include_once 'inc/config/og-tags.php'; ?>
	<meta name="description" content="<?= $excerpt; ?>">
	<title><?php is_front_page() ? bloginfo('name') : wp_title(''); ?> | <?php is_front_page() ? bloginfo('description') : bloginfo('name'); ?></title>
	<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<link rel="stylesheet" href="<?php echo get_template_directory_uri() . "/dist/css/style.css"; ?>" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo get_template_directory_uri() . "/dist/css/print.css"; ?>" type="text/css" media="print" />

	<?php include_once 'inc/templates/favicons.php'; ?>

	<?php include_once 'inc/templates/google-tag-manager-header.php'; ?>

	<meta name="description" content="<?= $excerpt;?>">
	<meta property="og:title" content="<?= $title; ?>"/>
	<meta property="og:url" content="<?= $link;?>"/>
	<meta property="og:image" content="<?= $image;?>"/>
	<meta property="og:site_name" content="<?= get_site_url();?>"/>
	<meta property="og:description" content="<?= $excerpt;?>"/>

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="<?= get_site_url();?>" />
	<meta name="twitter:creator" content="@<?= $twitterHandle;?>" />
	<meta name="twitter:image" content="<?= $twitterImage;?>" />
	<?php wp_head(); ?>

</head>
<body <?php body_class($backgroundColor);?>>
	<?php include_once 'inc/templates/google-tag-manager-body.php'; ?>
	<?php include_once 'inc/templates/hubspot-tracking-code.php'; ?>

	<!-- see app.js for usage -->
	<div class="breakpoint phone"></div>
	<div class="breakpoint tablet-portrait"></div>
	<div class="breakpoint tablet-landscape"></div>
	<div class="breakpoint desktop"></div>
	<div class="breakpoint xl"></div>


	<?php include_once(get_template_directory() . "/inc/config/svg-sprite.php"); ?>
	<?php include_once 'inc/templates/nav.php'; ?>
		<div class="content-container component">
			<main class="content">
