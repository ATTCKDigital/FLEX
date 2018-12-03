<?php
	//Cards component
	$header = $globalRow['header'];
	$mainImage = $globalRow['main_image'];
	$mainTitle = $globalRow['main_title'];
	$contents = $globalRow['contents'];
	$contentCount = count($contents);

?>

<div class="component component-cards component-fade content-<?= $contentCount;?>">
	<div class="pure-g">
		<div class="column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12">
			<div class="header header-tab header-tab-small">
				<div class="header-tab-inner">
					<h2 class="headline2 color-standard-white"><?= $header;?></h2>
				</div>
			</div>
		</div>
		<div class="column pure-u-lg-8-12 pure-u-md-8-12 mobile-hidden"></div>
		<div class="column pure-u-lg-4-12 pure-u-md-4-12 mobile-hidden"></div>
		<div class="column pure-u-lg-8-12 pure-u-md-8-12 pure-u-sm-12-12">
			<div class="main-content-item background-white">
				<?php if($mainImage){ ?>
					<div class="main-image">
						<img src="<?= $mainImage['url'];?>" alt="<?= $mainImage['title'];?>" title="<?= $mainImage['title'];?>" />
					</div>
				<?php } ?>
				<div class="main-content">
					<h2 class="headline3 color-standard-black"><?= $mainTitle;?></h2>
				</div>
			</div>
		</div>
	</div>
	<?php if($contents){ ?>
		<div class="content-items pure-g">
			<?php 
				$i = 0;
				foreach ($contents as $content) {
					$i++;
					$contentHeadline = $content['content_headline'];
					$contentExcerpt = $content['content_excerpt'];
					$contentCTAText = $content['content_cta_text'];
					$contentLink = $content['content_internal_link'];
					$contentExternalLink = $content['content_external_link'];

					if($contentLink) {
						$link = $contentLink;
						$target = '';
					} else {
						$link = $contentExternalLink;
						$target = ' target="_blank"';
					}
			?>
				<?php if(($contentCount == 2 && $i == 1) || ($contentCount == 4 && $i == 1) || ($contentCount == 4 && $i == 3)){ ?>
					<div class="small-content-item column pure-u-lg-4-12 pure-u-md-4-12 mobile-hidden">
					</div>
				<?php } ?>
				<div class="small-content-item column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12">
					
					<?php if($contentCTAText){ ?>
						<a class="full-link" href="<?= $link;?>"<?= $target;?>></a>
					<?php } ?>
					<div class="small-content-inner">
						<div class="small-content">
							<h2 class="headline3"><?= $contentHeadline;?></h2>
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

		
</div>