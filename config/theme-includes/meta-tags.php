	<?php
		/*** OG Meta tags ***/

		//OG Sitename
		$siteName = get_bloginfo('name');

		//OG Title
		$title = get_field('og_title', $this->ID);

		if($title && $this->ID) {
			//if there is a user generated OG Title, use that
			$title = get_field('og_title', $this->ID);
		} else if(is_front_page()){
			//if it is the homepage, call it "home"
			$title = get_bloginfo('name');
		} else {
			$title = trim(wp_title('', FALSE)); //trim leading white space
		}

		//OG Description
		$description = get_field('og_description', $this->ID);

		if($description) {
			$description = $description;
		} else {
			$description = strip_tags(get_the_excerpt($this->ID));
		}

		if(is_archive()) {
			//if we are on any kind of archive page, use the archive description
			$description = strip_tags(trim(get_the_archive_description()));	
		}

		if(!$description) {
			//if there is no user defined excerpt, use the blog description
			$description = get_bloginfo('description');
		}

		//Meta Description
		$metaDescription = get_field('meta_description', $this->ID);

		if($metaDescription) {
			$metaDescription = $metaDescription;
		} else {
			$metaDescription = strip_tags(get_the_excerpt($this->ID));
		}

		if(is_archive()) {
			//if we are on any kind of archive page, use the archive description
			$metaDescription = strip_tags(trim(get_the_archive_description()));	
		}

		if(!$metaDescription) {
			//if there is no user defined excerpt, use the blog description
			$metaDescription = get_bloginfo('description');
		}

		//OG Type
		$type = get_field('og_type', $this->ID);

		if(!$type) {
			$type = 'website';
		}

		//OG URL 
		$url = home_url( $this->wp->request );

		//OG Image
		$fbImageID = get_field('og_facebook_image', $this->ID);
		$fallbackImage = get_field('fallback_image', 'options');
		$postThumbnailID = get_post_thumbnail_id($this->ID);

		if($fbImageID) {
			//if there is a user defined FB image
			$fbImageSrc = wp_get_attachment_image_src($fbImageID, 'full')[0];
		} else if($postThumbnailID) {
			//if there is NO user defined FB image, but there is a Featured Image
			$fbImageSrc = wp_get_attachment_image_src($postThumbnailID, 'full')[0];
		} else {
			//if there is NO user defined FB image OR a Featured Image
			$fbImageSrc = $fallbackImage;
		}

		//Twitter Image
		$twitterImageID = get_field('og_twitter_image', $this->ID);
		
		if($twitterImageID) {
			//if there is a user defined Twitter image
			$twitterImageSrc = wp_get_attachment_image_src($twitterImageID, 'full')[0];
		} else if($postThumbnailID) {
			//if there is NO user defined Twitter image, but there is a Featured Image
			$twitterImageSrc = wp_get_attachment_image_src($postThumbnailID, 'full')[0];
		} else {
			//if there is NO user defined Twitter image OR a Featured Image
			$twitterImageSrc = $fallbackImage;
		}

		//Twitter Site (username)
		$twitterUsername = get_field('twitter_username', 'options');

		//Twitter Creator (username of content creator)
		$twitterCreator = get_field('og_twitter_creator', $this->ID);
		if(!$twitterCreator) {
			$twitterCreator = $twitterUsername;
		}

		// Twitter Image Alt (visually impaired description of image)
		if($twitterImageID) {
			//if there is a user defined Twitter image
			$twitterImageAlt = get_the_title($twitterImageID);
			$twitterImageAlt = str_replace('-', ' ', $twitterImageAlt);
		} else if($postThumbnailID) {
			//if there is NO user defined Twitter image, but there is a Featured Image
			$twitterImageAlt = get_the_title($postThumbnailID);
			$twitterImageAlt = str_replace('-', ' ', $twitterImageAlt);
		} else {
			//if there is NO user defined Twitter image OR a Featured Image
			$twitterImageAlt = get_field('fallback_image_alt', 'options');
		}

		//Article Author
		$author = ' '.get_the_author_meta('display_name', $this->ID);
	?>

	<meta property="og:title" content="<?= $title .' | '. $siteName;?>"/>
	<meta property="og:site_name" content="<?= $siteName;?>"/>
	<meta property="og:description" content="<?= $description;?>"/>
	<meta property="og:type" content="<?= $type;?>"/>
	<meta property="og:url" content="<?= $url;?>"/>
	<meta property="og:image" content="<?= $fbImageSrc;?>"/>

	<?php //Pinterest Rich Pins ?>

	<meta property="article:published_time" content="<?php echo get_post_time('c') ?>" />
	<meta property="article:author" content="<?= $siteName.$author;?>" />

	<?php //Twitter Card Data ?>

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@<?= $twitterUsername;?>" />
	<meta name="twitter:creator" content="@<?= $twitterCreator;?>" />
	<meta name="twitter:description" content="<?= $description;?>" />
	<meta name="twitter:title" content="<?= $title.' | '.$siteName;?>" />
	<meta name="twitter:image" content="<?= $twitterImageSrc;?>" />
	<meta name="twitter:image:alt" content="<?= $twitterImageAlt;?>" />

	<?php if(is_front_page()){ ?>
		<title><?= $title; ?> | <?= $description; ?></title>
	<?php } else { ?>
		<title><?= $title; ?> | <?= $siteName; ?></title>
	<?php } ?>

	<meta name="description" content="<?= $metaDescription;?>">
