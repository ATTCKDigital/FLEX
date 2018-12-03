<?php 
	//News Component

	$header = $globalRow['header'];
	$componentStyle = $globalRow['component_style'];
	$contents = $globalRow['contents'];
	$ctaText = $globalRow['cta_text'];
	$ctaLink = $globalRow['cta_link'];
	$ctaExternalLink = $globalRow['cta_external_link'];
	$featured = $globalRow['featured_content'];
	$populate = $globalRow['auto_populate_content'];
	$postType = $globalRow['post_type'];

	if($componentStyle == 'small-black') {
		$gridClassOffset = '';
		$gridClassHeader = 'pure-u-lg-2-12 pure-u-md-2-12 pure-u-sm-12-12';
		$gridClassContentOffset = 'pure-u-lg-2-12 pure-u-md-2-12 mobile-hidden';
		$gridClassContent = 'pure-u-lg-10-12 pure-u-md-10-12 pure-u-sm-12-12';
		$postCount = 1;
	} else if($componentStyle == 'small') {
		$gridClassOffset = ' pure-u-lg-5-12 pure-u-md-5-12 mobile-hidden';
		$gridClassHeader = 'pure-u-lg-2-12 pure-u-md-2-12 pure-u-sm-12-12';
		$gridClassContentOffset = 'pure-u-lg-7-12 pure-u-md-7-12 mobile-hidden';
		$gridClassContent = 'pure-u-lg-5-12 pure-u-md-5-12 pure-u-sm-12-12';
		$postCount = 2;
	} else if($componentStyle == 'medium') {
		$gridClassOffset = ' desktop-hidden tablet-hidden mobile-hidden';
		$gridClassHeader = 'pure-u-lg-2-12 pure-u-md-2-12 pure-u-sm-12-12';
		$gridClassContentOffset = 'pure-u-lg-2-12 pure-u-md-2-12 mobile-hidden';
		$gridClassContent = 'pure-u-lg-10-12 pure-u-md-10-12 pure-u-sm-12-12';
		$postCount = 4;
	} else if($componentStyle == 'large' && is_singular('challenges')){
		$gridClassOffset = '';
		$gridClassHeader = 'pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12';
		$gridClassContentOffset = 'pure-u-lg-3-12 pure-u-md-3-12 mobile-hidden';
		$gridClassContent = 'pure-u-lg-8-12 pure-u-md-8-12 pure-u-sm-12-12';
		$postCount = 3;
	} else {
		$gridClassOffset = ' pure-u-lg-1-12 pure-u-md-1-12 mobile-hidden';
		$gridClassHeader = 'pure-u-lg-3-12 pure-u-md-3-12 pure-u-sm-12-12';
		$gridClassContentOffset = 'pure-u-lg-3-12 pure-u-md-3-12 mobile-hidden';
		$gridClassContent = 'pure-u-lg-8-12 pure-u-md-8-12 pure-u-sm-12-12';
		$postCount = 3;
	}

	
?>
<div class="component component-news component-fade component-news-<?= $componentStyle;?>">
	<div class="pure-g">
		<div class="column<?= $gridClassOffset;?>"></div>
		<div class="column <?= $gridClassHeader;?>">
			<div class="header header-tab header-tab-small">
				<div class="header-tab-inner">
					<h2 class="headline2 color-standard-white"><?= $header;?></h2>
				</div>
			</div>
		</div>
	</div>
	<div class="pure-g">
		<div class="column <?= $gridClassContentOffset;?>"></div>
		<div class="column news-items-wrapper <?= $gridClassContent;?>">
			<ul class="news-items<?php if($featured){echo ' featured';}?>">
				<?php 
					if($contents) {
						$contents = $contents;
					} else {
						$args = array(
							'post_type' => $postType,
							'posts_per_page' => $postCount,
							'suppress_filters'	=> 0,
						);

						$contents = get_posts($args);
					}

					$i = 0;
					foreach ($contents as $content) {
						$i++;


						if($populate) {
							$contentID = $content->ID;
							$contentCategory = get_field('challenges_header', $contentID);
							$title = get_the_title($contentID);
							$target = '';
							$link = get_the_permalink($contentID);

						} else {
							$contentCategory = $content['content_category'];
							$contentInternal = $content['content_internal'];
							$contentExternal = $content['content_external_text'];
							$contentExternalLink = $content['content_external_link'];

							if($contentInternal) {
								$ID = $contentInternal->ID;
								$title = get_the_title($ID);
								$link = get_the_permalink($ID);
								$target = '';
							} else {
								$ID = '';
								$title = $contentExternal;
								$link = $contentExternalLink;
								$target = ' target="_blank"';
							}
						}

						
						if($featured && $i == 1) {
							$headlineSize = 'headline3';
						} else if($componentStyle == 'medium' || $componentStyle == 'small') {
							$headlineSize = 'headline3';
						} else if($componentStyle == 'small-black'){
							$headlineSize = 'headline1';
						} else {
							$headlineSize = 'headline2-alt';
						}

				?>
					<li class="news-item <?php if ( is_singular( 'challenges' ) ) { echo ' no-indent ';}?>background-white">
						<a class="full-link" href="<?= $link;?>"<?= $target;?>></a>
						<?php if($contentCategory){ ?>
							<h5 class="eyebrow margin-mobile-bottom-10"><?= $contentCategory;?></h5>
						<?php } ?>
						<h3 class="<?= $headlineSize;?>"><?= $title;?></h3>
					</li>
				<?php } ?>
			</ul>

			<?php 
				if($ctaText){ 
					if($ctaLink) {
						$link = $ctaLink;
					} else {
						$link = $ctaExternalLink;
					}
			?>
				<div class="cta-tab">
					<div class="cta-tab-inner">
						<a href="<?= $link;?>" class="cta-link color-standard-white"<?= $target;?>><?= $ctaText;?></a>
					</div>
				</div>
			<?php } ?>
		</div>
	</div>
</div>


