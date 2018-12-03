<?php 
	$header = $globalRow['header'];
	$mediaItems = $globalRow['media_items'];
?>
<div class="component component-tiles component-media content-3" data-component-name="Video">
	<div class="component-fade">
		<div class="pure-g">
			<div class="column"></div>
			<div class="column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12">
				<div class="header header-tab header-tab-small">
					<div class="header-tab-inner">
						<h2 class="headline2 color-standard-white"><?= $header;?></h2>
					</div>
				</div>
			</div>
		</div>
		<div class="content-items pure-g">
			<?php 
				$i = 0;
				foreach ($mediaItems as $mediaItem) {
					$i++;
					$mediaThumbnail = $mediaItem['media_thumbnail'];
					$mediaImage = $mediaItem['media_large_image'];
					$mediaTitle = $mediaItem['media_title'];
					$mediaExcerpt= $mediaItem['media_description'];
					$mediaType = $mediaItem['media_type'];
					
					if($mediaType == 'video') {
						$videoID = $mediaItem['media_video_id'];
						$videoEmbed = 'https://player.vimeo.com/video/' . $videoID . '?api=1';
						$mediaClasses = 'video-module';
						$mediaData = ' data-video-id="'.$videoID.'"';
						$openPopup = 'vimeoPlay';
					} else {
						$imageID = 'image-'.$i;
						$mediaClasses = 'image-module';
						$mediaData = ' data-image-id="'.$imageID.'"';
						$openPopup = 'imageOpen';
					}
			?>
				<div class="small-content-item column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12">
					<div class="small-content-inner">
						<div class="small-image"><img src="<?= $mediaThumbnail['url'];?>" alt="<?= $mediaThumbnail['title'];?>" title="<?= $mediaThumbnail['title'];?>" /></div>
						<div class="small-content">
							<h2 class="headline3"><?= $mediaTitle;?></h2>
							<p class="margin-mobile-bottom-10 margin-tablet-landscape-bottom-20 margin-mobile-top-10 margin-tablet-landscape-top-20"><?= $mediaExcerpt;?></p><span class="cta-link cta-link-small <?= $openPopup;?>" <?= $mediaData;?>>View</span>
						</div>

						
					</div>
				</div>
			<?php } ?>
		</div>
	</div>
	<?php 
		$i = 0;
		foreach ($mediaItems as $mediaItem) { 
			$i++;
			$mediaType = $mediaItem['media_type'];
			$mediaThumbnail = $mediaItem['media_thumbnail'];
			$mediaImage = $mediaItem['media_large_image'];
			$mediaTitle = $mediaItem['media_title'];
			$mediaExcerpt= $mediaItem['media_description'];
	
			if($mediaType == 'video') {
				$videoID = $mediaItem['media_video_id'];
				$videoEmbed = 'https://player.vimeo.com/video/' . $videoID . '?api=1';
				$mediaClasses = 'video-module';
				$mediaData = ' data-video-id="'.$videoID.'"';
				$openPopup = 'vimeoPlay';
			} else {
				$imageID = 'image-'.$i;
				$mediaClasses = 'image-module';
				$mediaData = ' data-image-id="'.$imageID.'"';
				$openPopup = 'imageOpen';
			}

	?>
		<?php if($mediaType == 'video') { ?>
			<div class="video-popup <?= $mediaClasses;?>" <?= $mediaData;?>>
				<mark class="close close-white vimeoClose" data-video-id="<?= $videoID;?>"></mark>
				<iframe id="video-<?= $videoID;?>" src="<?= $videoEmbed; ?>" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
			</div>
		<?php } ?>
		<?php if($mediaType == 'image') { ?>
			<div class="image-popup <?= $mediaClasses;?>" <?= $mediaData;?>>
				<div class="image-inner background-white padding-mobile-40 padding-tablet-landscape-85 padding-tablet-landscape-top-60 padding-tablet-landscape-bottom-60">
					<mark class="close close imageClose" data-image-id="<?= $imageID;?>"></mark>
					<img src="<?= $mediaImage['url'];?>" class="margin-mobile-bottom-10 margin-tablet-landscape-bottom-20" />
					<h2 class="headline3 margin-mobile-bottom-10 margin-tablet-landscape-bottom-20 "><?= $mediaTitle;?></h2>
					<p><?= $mediaExcerpt;?></p>
				</div>
			</div>
		<?php } ?>
	<?php } ?>
</div>