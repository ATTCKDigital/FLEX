<?php
	//Text Boxes component
	$header = $globalRow['header'];
	$layout = $globalRow['layout_type'];
	$boxes = $globalRow['boxes'];

	if($layout == 'three') {
		$layoutClasses = 'column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12';
		$offsetLayoutClasses = 'column pure-u-lg-8-12 pure-u-md-8-12 pure-u-sm-12-12';
	} else {
		$layoutClasses = 'column pure-u-lg-6-12 pure-u-md-6-12 pure-u-sm-12-12';
		$offsetLayoutClasses = 'column pure-u-lg-6-12 pure-u-md-6-12 pure-u-sm-12-12';
	}

?>

<div class="component component-text-boxes component-fade">
	<?php if($header){ ?>
		<div class="pure-g">
			<div class="column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12">
				<div class="header header-tab header-tab-small">
					<div class="header-tab-inner<?php if($layout == 'two'){echo ' header-tab-no-fill';}?>">
						<h2 class="headline2 color-standard-white"><?= $header;?></h2>
					</div>
				</div>
			</div>
		</div>
	<?php } ?>	
	<div class="pure-g">
		<?php 
			foreach ($boxes as $box) { 
				$boxIcon = $box['box_icon'];
				$boxItem = $box['box_item'];
				$boxCTAText = $box['box_cta_text'];
				$boxLink = $box['box_cta_internal_link'];
				$boxExternalLink = $box['box_cta_external_link'];
				

				if($boxItem) {
					$excerpt = get_the_excerpt($boxItem);
					$category = get_the_category($boxItem);
					$category = $category[0]->name;
				} else {
					$category = '';
					$excerpt = '';
				}

				if($boxLink) {
					$link = $boxLink;
					$target = '';
				} else {
					$link = $boxExternalLink;
					$target = ' target="_blank"';
				}

		?>
			<div class="text-box <?= $layoutClasses;?> layout-<?= $layout;?>">
				<div class="text-box-inner background-white padding-mobile-20 padding-tablet-landscape-top-30 padding-tablet-landscape-bottom-30 padding-tablet-landscape-right-40 padding-tablet-landscape-left-40">
					<?php if($boxItem){ ?>
						<a class="full-link" href="<?= $link;?>"></a>
						<?php if($boxIcon){ ?>
							<div class="text-box-icon">
								<img src="<?= $boxIcon['url'];?>" alt="<?= $boxIcon['title'];?>" title="<?= $boxIcon['title'];?>" />
							</div>
						<? } ?>
						<div class="text-box-content">
							<h3 class="headline3 margin-mobile-bottom-15 margin-tablet-landscape-bottom-30"><a alt="<?= get_the_title($boxItem);?>" title="<?= get_the_title($boxItem);?>" href="<?= $link;?>"><?= get_the_title($boxItem);?></a></h3>
							<p><?= wp_trim_words( $excerpt, 15, '...' );?></p>
							<a class="cta-link cta-link-small" alt="<?= get_the_title($boxItem);?>" title="<?= get_the_title($boxItem);?>" href="<?= $link;?>">Read more on <?= $category;?></a>
						</div>
					<?php } else { ?>
						<?php 
								if($boxCTAText){ 
							?>
							<a class="full-link" alt="<?= $boxCTAText;?>" title="<?= $boxCTAText;?>" href="<?= $link;?>"<?= $target;?>></a>
						<?php } ?>
						<?php if($boxIcon){ ?>
							<div class="text-box-icon">
								<img src="<?= $boxIcon['url'];?>" alt="<?= $boxIcon['title'];?>" title="<?= $boxIcon['title'];?>" />
							</div>
						<? } ?>
						<div class="text-box-content<?php if($boxIcon){echo ' has-icon'; }?>">
							<h3 class="headline3 margin-mobile-bottom-15 margin-tablet-landscape-bottom-30"><?php if($boxCTAText){ ?><a alt="<?= $boxCTAText;?>" title="<?= $boxCTAText;?>" href="<?= $link;?>"<?= $target;?>><?php } ?><?= $box['box_title'];?><?php if($boxCTAText){ ?></a><?php } ?></h3>
							<p><?= $box['box_text'];?></p>
							<?php 
								if($boxCTAText){ 
							?>
								<a class="cta-link cta-link-small" alt="<?= $boxCTAText;?>" title="<?= $boxCTAText;?>" href="<?= $link;?>"<?= $target;?>><?= $boxCTAText;?></a>
							<?php } ?>
						</div>
					<?php } ?>
				</div>
			</div>
		<?php } ?>
	</div>
	<?php 
		$ctaText = $globalRow['cta_text'];
		$ctaLink = $globalRow['cta_link'];
		$ctaExternalLink = $globalRow['cta_external_link'];
		if($ctaLink) {
			$link = $ctaLink;
			$target = '';
		} else {
			$link = $ctaExternalLink;
			$target = ' target="_blank"';
		}

		if($ctaText){
	?>
		<div class="pure-g">
			<div class="column <?= $offsetLayoutClasses;?>"></div>
			<div class="column <?= $layoutClasses;?>">
				<div class="cta-tab">
					<div class="cta-tab-inner">
						<a href="<?= $link;?>" <?= $target;?> class="cta-link color-standard-white"<?= $target;?>><?= $ctaText;?></a>
					</div>
				</div>
			</div>
		</div>
	<?php } ?>
</div>