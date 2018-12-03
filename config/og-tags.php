	<?php
		// OG Meta tags
		global $wp;

		if(is_home()) {
			$ID = get_option( 'page_for_posts' );
		} elseif(is_404() || is_category() || is_search() || is_archive()) {
			$ID = '';
		} else {
			$ID = $post->ID;
		}

		$title = get_field('og_title', $ID);
		$image = get_field('og_facebook_image', $ID)['url'];
		$twitterImage = get_field('og_twitter_image', $ID)['url'];
		$link = home_url( $wp->request );
		$excerpt = get_bloginfo('description');

		$twitterHandle = get_field('twitter_url', 'options');
		$twitterHandle = str_replace('https://twitter.com/', '', $twitterHandle);

		if($image) {
			$image = $image;
		} elseif(is_archive()) {
			$image = '';
		} elseif(has_post_thumbnail()) {
			$image = get_the_post_thumbnail_url($ID, 'full');
		} else {
			$image = '';
		}

		if($twitterImage) {
			$twitterImage = $twitterImage;
		} elseif(is_archive()) {
			$twitterImage = '';
		} elseif(has_post_thumbnail()) {
			$twitterImage = get_the_post_thumbnail_url($ID, 'full');
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
				$title = get_field('og_title', $ID).' | '.get_bloginfo('name');
			} else {
				$title = get_the_title().' | '.get_bloginfo('name');
			}
		}

		$backgroundColor = get_field('background_color', $ID);

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