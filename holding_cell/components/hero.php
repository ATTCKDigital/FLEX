<?php 
	//Hero

	$topText = $globalRow['top_section_text'];
	$topImage = $globalRow['top_section_background_image'];
	$bottomText = $globalRow['bottom_section_text'];
	$videoLoop = $globalRow['top_section_video_loop'];
	$videoID = $globalRow['top_section_vimeo_id'];
	$videoEmbed = 'https://player.vimeo.com/video/' . $videoID . '?api=1';

	$style = '';
	$theme = '';
	$imagePosition = '';
	
	$headline = $globalRow['top_section_text_size'];
	$columnsTop = ' pure-u-lg-9-12 pure-u-md-9-12 pure-u-sm-9-12'; 
	$columnsOffset = ' pure-u-lg-3-12 pure-u-md-3-12 pure-u-sm-3-12'; 
	$topPadding = ' padding-mobile-top-40 padding-mobile-bottom-85 padding-mobile-left-40 padding-mobile-right-40 padding-tablet-landscape-top-85 padding-tablet-landscape-bottom-85 padding-tablet-landscape-left-170 padding-tablet-landscape-right-85';
	$columnsBottom = ' pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-5-12';


	if($headline == 'headline2') {
		$columnsTop = ' pure-u-lg-7-12 pure-u-md-7-12 pure-u-sm-9-12'; 
		$columnsOffset = ' pure-u-lg-5-12 pure-u-md-5-12 pure-u-sm-3-12'; 
		$topPadding = ' padding-mobile-top-40 padding-mobile-bottom-85 padding-mobile-left-40 padding-mobile-right-40 padding-tablet-landscape-top-40 padding-tablet-landscape-bottom-100 padding-tablet-landscape-left-85 padding-tablet-landscape-right-85';

	}

	if($topImage) {
		$style = ' style="background-image: url('.$topImage['url'].')"';
		$theme = ' component-theme-background';
	}

	$columnsBottom = ' pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-5-12';
	$paddingBottom = 'padding-mobile-top-60 padding-mobile-left-20 padding-mobile-right-35 padding-mobile-bottom-20 padding-tablet-landscape-top-100 padding-tablet-landscape-right-85 padding-tablet-landscape-left-40 padding-tablet-landscape-bottom-40';

?>
<div class="component component-hero<?php if($videoID){ echo ' component-hero-video';}?>"<?php if($videoID){ echo ' data-component-name="Video"'; }?>>
	<div class="component-fade pure-g">
		<div class="column <?= $columnsOffset;?>"></div>
		<div class="hero-top <?= $columnsTop;?> background-black <?= $theme;?><?= $topPadding;?>"<?= $style;?>>
			<div class="hero-top-inner">
				<?php if($videoLoop){ ?>
					<div class="video-wrapper">
						<video class="hero-video-loop" autoplay muted loop playsinline poster="<?= $topImage['url'];?>">
							<source src="<?= $videoLoop;?>" type="video/mp4">
						</video>
					</div>
				<?php } ?>
				<?php if($topText){ ?>
					<h2 class="<?= $headline;?> color-standard-white"><?= $topText;?></h2>
				<?php } ?>
				<?php if($videoID){ ?>
					<span class="cta-link color-standard-white vimeoPlay" data-video-id="<?= $videoID;?>">Watch our video</span>

				<?php } ?>

			</div>
			<?php if($bottomText){ ?>
				<mark class="logo-mark-wrapper">
					<?php
						echo Utils::render_template("inc/templates/svg.php", array(
							"id" => "logo-mark",
							"classes" => "logo-mark",
							"data" => ""
						));
					?>
				</mark>
			<?php } ?>
		</div>
		<?php if($bottomText){ ?>
			<div class="hero-bottom background-white <?= $paddingBottom;?> <?= $theme;?><?= $columnsBottom;?>">
				<?php if($bottomText){ ?>
					<p>
						<?= $bottomText;?>
					</p>
				<?php } ?>
			</div>
		<?php } ?>
	</div>
	<?php if($videoID){ ?>
		<div class="video-wrapper vimeo video-module" data-video-id="<?= $videoID;?>">
			<div class="video-popup">
				<mark class="close close-white vimeoClose" data-video-id="<?= $videoID;?>"></mark>
				<iframe id="video-<?= $videoID;?>" src="<?= $videoEmbed; ?>" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
			</div>
		</div>
	<?php } ?>
</div>