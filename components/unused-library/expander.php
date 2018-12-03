<?php
	//if the "expander open on page load" is checked
	$expanded = $globalColumn['expander_closed'];

	if($expanded) {
		$expanded = '';
	} else {
		$expanded = ' expanded';
	}

	$hasGallery = '';
	if($globalColumn['column_classes'] == 'has-gallery') {
		$hasGallery = ' hasGallery';
	}

	$hasVideo = '';
	if($globalColumn['expander_video'] || $globalColumn['expander_vimeo']) {
		$hasVideo = ' hasVideo';
	}
?>
<section class="component component-expander component-theme-<?= $globalColumn['expander_background_color'].$expanded.$hasGallery.$hasVideo;?>" data-component-name="Expander">
	<div class="content-wrapper">
		<?php if($globalColumn['expander_video'] || $globalColumn['expander_vimeo']) { ?>
			<?php 
				if($globalColumn['expander_video']) {
					$videoId = rand();
					$videoEmbed = '';
					$playClass = 'html5Play';
				} else {
					$videoId = $globalColumn['expander_vimeo'];
					$videoEmbed = 'https://player.vimeo.com/video/' . $videoId . '?api=1';
					$playClass = 'vimeoPlay';
				}
			?>
			<mark class="play <?= $playClass;?>" data-video-id="<?= $videoId;?>"><span class="play-button"><span class="play-arrow"></span></span></mark>
		<?php } ?>
		
		<div class="expander-image-wrapper">
			<div class="expander-image" style="background-image:url('<?= $globalColumn['expander_image']['url'];?>');">
			</div>
			<?php if($globalColumn['expander_video']) { ?>
				<div class="expander-video-wrapper html5" data-video-id="<?= $videoId;?>">
					<mark class="close html5Close" data-video-id="<?= $videoId;?>"></mark>
					<mark class="full-screen html5FullScreen" data-video-id="<?= $videoId;?>"><i class="fas fa-expand"></i></mark>
					<div class="expander-video component-theme-<?= $globalColumn['expander_background_color'];?>">
						<video id="video-<?= $videoId;?>" webkitallowfullscreen mozallowfullscreen allowfullscreen>
							<source src="<?= $globalColumn['expander_video']['url'];?>" type="video/mp4">
						</video>
					</div>
				</div>
			<?php } ?>
			<?php if($globalColumn['expander_vimeo']) { ?>
				<div class="expander-video-wrapper vimeo" data-video-id="<?= $videoId;?>">
					<mark class="close vimeoClose" data-video-id="<?= $videoId;?>"></mark>
					<mark class="full-screen vimeoFullScreen" data-video-id="<?= $videoId;?>"><i class="fas fa-expand"></i></mark>
					<div class="expander-video component-theme-<?= $globalColumn['expander_background_color'];?>" data-video-id="<?= $videoId;?>">
						<iframe id="video-<?= $videoId;?>" src="<?= $videoEmbed; ?>" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
					</div>
				</div>
			<?php } ?>
		</div>




		<mark class="arrow-wrapper expandComponent">
			<?php
				echo Utils::render_template("inc/templates/svg.php", array(
					"id" => "arrow-svg",
					"classes" => "arrow-svg",
					"data" => ""
				));
			?>
		</mark>

		<div class="expander-wrapper component-theme-<?= $globalColumn['expander_background_color'];?> ">
			<div class="expander-tab">
				<div class="expander-content">
					<h2 class="headline2 brown-text align-center"><?= $globalColumn['expander_title'];?></h2>
					<h3 class="headline3 align-center border-top-center"><?= $globalColumn['expander_subtitle'];?></h3>
					<div class="body-text">
						<?= $globalColumn['expander_text'];?>

						<?php if($globalColumn['expander_address']){ ?>
							<div class="address">
								<?php
									echo Utils::render_template("inc/templates/svg.php", array(
										"id" => "map-icon",
										"classes" => "map-icon",
										"data" => ""
									));
								?>
								<address><?= $globalColumn['expander_address'];?></address>
							</div>
						<?php } ?>
						<?php if($hasGallery){ ?>
							<span class="sans-serif14 uppercase openGallery align-center">See Gallery View</span>
						<?php } ?>
					</div>
				</div>
				<?php if($globalColumn['instagram_handle']) { ?>
					<small class="follow"><a href="https://www.instagram.com/<?= $globalColumn['instagram_handle'];?>" target="_blank" class="leaveSite"><i class="fab fa-instagram"></i><span>Follow Us</span></a></small>
				<?php } ?>
			</div>
		</div>
	</div>
</section>
