	<?php
		// OG Meta tags

		$title = get_field('og_title', $this->ID);
		$image = get_field('og_facebook_image', $this->ID)['url'];
		$twitterImage = get_field('og_twitter_image', $this->ID)['url'];
		$link = home_url( $this->wp->request );
		$excerpt = get_bloginfo('description');

		$twitterHandle = get_field('twitter_url', 'options');
		$twitterHandle = str_replace('https://twitter.com/', '', $twitterHandle);

		if($image) {
			$image = $image;
		} elseif(is_archive()) {
			$image = '';
		} elseif(has_post_thumbnail()) {
			$image = get_the_post_thumbnail_url($this->ID, 'full');
		} else {
			$image = '';
		}

		if($twitterImage) {
			$twitterImage = $twitterImage;
		} elseif(is_archive()) {
			$twitterImage = '';
		} elseif(has_post_thumbnail()) {
			$twitterImage = get_the_post_thumbnail_url($this->ID, 'full');
		} else {
			$twitterImage = '';
		}

		if(is_home()) {
			$excerpt = strip_tags(get_the_excerpt( get_option( 'page_for_posts' ) ));

		} elseif ( is_archive() || is_category() || is_tag()) {
			$excerpt = get_queried_object()->description;

		} elseif(has_excerpt()) {
			if(is_home()){
				$excerpt = get_the_excerpt( get_option( 'page_for_posts' ) );
			} else {
				$excerpt = get_the_excerpt();
			}

		}

		if (is_archive()) {
			$title = wp_title( '|', false, 'right' ).get_bloginfo('name');
		} else {
			if($title) {
				$title = get_field('og_title', $this->ID).' | '.get_bloginfo('name');
			} else {
				$title = get_the_title().' | '.get_bloginfo('name');
			}
		}

		$backgroundColor = get_field('background_color', $this->ID);

		if(is_search()) {
			$backgroundColor = 'body-theme-gray';
		} else if(is_404()) {
			$backgroundColor = 'body-theme-pink-blue-horiz';
		} else if($backgroundColor) {
			$backgroundColor = 'body-theme-'.$backgroundColor;
		} else {
			$backgroundColor = '';
		}


	?>
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
