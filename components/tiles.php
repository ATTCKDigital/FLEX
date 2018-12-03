<?php
	//Tiles component
	$header = $globalRow['header'];
	$mainCTAText = $globalRow['main_cta_text'];
	$mainCTALink = $globalRow['main_internal_link'];
	$mainCTAExternalLink = $globalRow['main_external_link'];
	$mainImage = $globalRow['main_image'];
	$mainTitle = $globalRow['main_title'];
	$mainExcerpt = $globalRow['main_excerpt'];
	$contents = $globalRow['contents'];
	$ctas = $globalRow['ctas'];
	$headerSize = $globalRow['header_size'];
	$showImagesMobile = $globalRow['show_images_in_mobile'];
	$populate = $globalRow['auto_populate_content'];
	$postType = $globalRow['post_type'];
	$layout = $globalRow['tile_layout'];
	$numberTiles = $globalRow['number_tiles'];
	$exclude = '';

	if($numberTiles) {
		$numberTiles = $numberTiles;
	} else {
		if($postType == 'campaigns') {
			$numberTiles = 2;
		} else {
			$numberTiles = 3;
		}
	}

	if($headerSize == 'small') {
		$headerSize = 'headline3';
	} else {
		$headerSize = 'headline2-alt';
	}

	if($showImagesMobile) {
		$showImagesMobile = ' show-images';
	} else {
		$showImagesMobile = '';
	}

	if($mainCTALink) {
		$link = $mainCTALink;
		$target = '';
	} else if($mainCTAExternalLink) {
		$link = $mainCTAExternalLink;
		$target = ' target="_blank"';
	} else {
		$link = '';
		$target = '';
	}


	if($layout == 'two-down') {
		$gridHeader = '';
		$gridHeaderTab = 'pure-u-lg-6-12 pure-u-md-6-12 pure-u-sm-12-12';
		$gridMain = 'pure-u-lg-6-12 pure-u-md-6-12';
		$gridMainOffset = '';
		$gridContent = 'pure-u-lg-12-12 pure-u-md-12-12';
		$gridOffset = 'pure-u-lg-6-12 pure-u-md-6-12';
		$headlineSize = 'headline2-alt';
		$ctaContent = 'pure-u-lg-6-12 pure-u-md-6-12';
 
	} else if($layout == 'three-across'){
		$gridHeader = '';
		$gridHeaderTab = 'pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12';
		$gridMain = 'pure-u-lg-8-12 pure-u-md-8-12';
		$gridMainOffset = '<div class="column pure-u-lg-8-12 pure-u-md-8-12 mobile-hidden"></div><div class="column pure-u-lg-4-12 pure-u-md-4-12 mobile-hidden"></div>';
		$gridContent = 'pure-u-lg-4-12 pure-u-md-4-12';
		$gridOffset = 'pure-u-lg-8-12 pure-u-md-8-12';
		$headlineSize = 'headline3';
		$ctaContent = $gridContent;
	} else if($layout == 'three-across-1-top'){
		$gridHeader = 'pure-u-lg-1-12 pure-u-md-1-12 mobile-hidden';
		$gridHeaderTab = 'pure-u-lg-3-12 pure-u-md-3-12 pure-u-sm-12-12';
		$gridMain = 'pure-u-lg-8-12 pure-u-md-8-12';
		$gridMainOffset = '<div class="column pure-u-lg-8-12 pure-u-md-8-12 mobile-hidden"></div><div class="column pure-u-lg-4-12 pure-u-md-4-12 mobile-hidden"></div>';
		$gridContent = 'pure-u-lg-4-12 pure-u-md-4-12';
		$gridOffset = 'pure-u-lg-8-12 pure-u-md-8-12';
		$headlineSize = 'headline3';
		$ctaContent = $gridContent;
	}


?>

<div class="component component-tiles component-fade <?= $showImagesMobile;?> content-<?= $layout;?>">
	<div class="pure-g">
		<div class="column <?= $gridHeader;?>"></div>
		<div class="column <?= $gridHeaderTab;?>">
			<?php if($header) { ?>
				<div class="header header-tab header-tab-small">
					<div class="header-tab-inner">
						<h2 class="headline2 color-standard-white"><?= $header;?></h2>
					</div>
				</div>
			<?php } ?>
		</div>
		<?php if($mainTitle) { ?>
			<?= $gridMainOffset;?>
			<div class="main-content-item column <?= $gridMain;?> pure-u-sm-12-12">
				<?php 
					if($mainCTAText){ 
				?>
					<a class="full-link" alt="<?= $mainCTAText;?>" title="<?= $mainCTAText;?>" href="<?= $link;?>"<?= $target;?>></a>
				<?php } ?>
				<?php if($mainImage){ ?>
					<div class="main-image">
						<img src="<?= $mainImage['url'];?>" alt="<?= $mainImage['title'];?>" title="<?= $mainImage['title'];?>" />
					</div>
				<?php } ?>
				<div class="main-content">
					<h2 class="<?= $headerSize;?> color-standard-white"><?= $mainTitle;?></h2>
					<?php if($mainExcerpt){ ?>
						<p class="color-standard-white margin-mobile-bottom-10 margin-tablet-landscape-bottom-20 margin-mobile-top-10 margin-tablet-landscape-top-20"><?= $mainExcerpt;?></p>
					<?php } ?>
					<?php 
						if($mainCTAText){ 
					?>
						<a class="cta-link color-standard-white" alt="<?= $mainCTAText;?>" title="<?= $mainCTAText;?>" href="<?= $link;?>"<?= $target;?>><?= $mainCTAText;?></a>
					<?php } ?>
				</div>
			</div>
		<?php } ?>

		<?php if($populate && $layout == 'three-across-1-top') { ?>
			<?php 
				//Top Tile
				$sticky = count(get_option('sticky_posts'));

				if($sticky >= 1) {
					$sticky = get_option( 'sticky_posts' );
					$mainPost = new WP_Query( 'p=' . $sticky[0] );
				} else {
					$args = array(
						'post_type' => $postType,
						'posts_per_page' => 1,
						'suppress_filters'	=> 0,
						'ignore_sticky_posts' => 1
					);
					$mainPost = new WP_Query($args);
				}

				if ($mainPost->have_posts() ) {
					while($mainPost->have_posts()) { 
						$mainPost->the_post();
						$exclude = get_the_ID();
			?>

				<?= $gridMainOffset;?>
				<div class="main-content-item column <?= $gridMain;?> pure-u-sm-12-12">
					<a class="full-link" alt="<?php the_title();?>" title="<?php the_title();?>" href="<?php the_permalink();?>"></a>
					<?php if(has_post_thumbnail()){ ?>
						<div class="main-image">
							<?php the_post_thumbnail('full');?>
						</div>
					<?php } ?>
					<div class="main-content">
						<h2 class="<?= $headerSize;?> color-standard-white"><?php the_title();?></h2>
						<p class="color-standard-white margin-mobile-bottom-10 margin-tablet-landscape-bottom-20 margin-mobile-top-10 margin-tablet-landscape-top-20"><?= excerpt(20);?></p>
						<a class="cta-link color-standard-white" alt="<?php the_title();?>" title="<?php the_title();?>" href="<?php the_permalink();?>">Read more</a>
					</div>
				</div>
			<?php
					}//endwhile
				} //endif
				wp_reset_query();
			?>
		<?php } ?>
	</div>
	<?php if($contents){ ?>
		<div class="content-items pure-g">
			<?php 
				$i = 0;
				foreach ($contents as $content) {
					$i++;
					$contentImage = $content['content_image'];
					$contentHeadline = $content['content_headline'];
					$contentExcerpt = $content['content_excerpt'];
					$contentCTAText = $content['content_cta_text'];
					$contentLink = $content['content_internal_link'];
					$contentExternalLink = $content['content_external_link'];

					if($contentExternalLink) {
						$link = $contentExternalLink;
						$target = ' target="_blank"';
					} else {
						$link = $contentLink;
						$target = '';
					}
			?>
				<div class="small-content-item column <?= $gridContent;?> pure-u-sm-12-12">
					<div class="small-content-inner">
						<?php 
							if($contentCTAText){ 
						?>
							<a class="full-link" alt="<?= $contentCTAText;?>" title="<?= $contentCTAText;?>" href="<?= $link;?>"<?= $target;?>></a>
						<?php } ?>
						<?php if($contentImage){ ?>
							<div class="small-image">
								<img src="<?= $contentImage['url'];?>" alt="<?= $contentImage['title'];?>" title="<?= $contentImage['title'];?>" />
							</div>
						<?php } ?>
						<div class="small-content">
							<h2 class="<?= $headlineSize;?>"><?php if($contentCTAText){ ?><a alt="<?= $contentCTAText;?>" title="<?= $contentCTAText;?>" href="<?= $link;?>"<?= $target;?>><?php } ?><?= $contentHeadline;?><?php if($contentCTAText){ ?></a><?php } ?></h2>
							<?php if($contentExcerpt){ ?>
								<p class="margin-mobile-bottom-10 margin-tablet-landscape-bottom-20 margin-mobile-top-10 margin-tablet-landscape-top-20"><?= $contentExcerpt;?></p>
							<?php } ?>
							<?php 
								if($contentCTAText){ 
							?>
								<a class="cta-link cta-link-small" alt="<?= $contentCTAText;?>" title="<?= $contentCTAText;?>" href="<?= $link;?>"<?= $target;?>><?= $contentCTAText;?></a>
							<?php } ?>
						</div>
					</div>
				</div>
			<?php } ?>
		</div>
	<?php } ?>
	<?php if($populate){ ?>
		<div class="content-items pure-g">
			<?php 
				$sticky = count(get_option('sticky_posts'));

				if(is_sticky($exclude)) {
					$postCount = $numberTiles;
				} else if($sticky >= 1 && $postType == 'post') {
					$postCount = $numberTiles - $sticky;
				} else {
					$postCount = $numberTiles;
				}

				$args = array(
					'post_type' => $postType,
					'posts_per_page' => $postCount,
					'suppress_filters'	=> 0,
					'post__not_in' => array($exclude)
				);
				
				$contents = new WP_Query($args);

				if ($contents->have_posts() ) {
					while($contents->have_posts()) { 
						$contents->the_post();
			?>
				<div class="small-content-item column <?= $gridContent;?> pure-u-sm-12-12">
					<div class="small-content-inner">
						<?php if(has_post_thumbnail()){ ?>
							<div class="small-image">
								<?php the_post_thumbnail('full');?>
							</div>
						<?php } ?>
						<div class="small-content">
							<h2 class="<?= $headlineSize;?>"><a alt="" title="" href="<?php the_permalink();?>"><?php the_title();?></a></h2>
							<p class="margin-mobile-bottom-10 margin-tablet-landscape-bottom-20 margin-mobile-top-10 margin-tablet-landscape-top-20"><?= excerpt(15);?></p>
							<a class="cta-link cta-link-small" alt="<?php the_title();?>" title="<?php the_title();?>" href="<?php the_permalink();?>">Read more</a>
						</div>
					</div>
				</div>
			<?php 
					} //endwhile
				} //endif
				wp_reset_query();
			?>
		</div>
	<?php } ?>		
		<?php 
			if($ctas){ 
		?>
			<div class="pure-g">
				<div class="column <?= $gridOffset;?> mobile-hidden"></div>
				<div class="cta-tab cta-tab-multiple column <?= $ctaContent;?> pure-u-sm-12-12">
					<div class="cta-tab-inner">
						<?php 
							foreach ($ctas as $cta) {
								$ctaText = $cta['cta_text'];
								$ctaLink = $cta['cta_link'];
								$ctaExternalLink = $cta['cta_external_link'];
								if($ctaLink) {
									$link = $ctaLink;
									$target = '';
								} else {
									$link = $ctaExternalLink;
									$target = ' target="_blank"';
								}
						?>
						
							
								<a href="<?= $link;?>" class="cta-link color-standard-white"<?= $target;?>><?= $ctaText;?></a>
						<?php } ?>
					</div>
				</div>
			</div>
		<?php 
			} //endif ctas 
		?>
		
</div>