<?php
	//Video component
	$videoID = $globalRow['video_id'];
	$videoThumb = $globalRow['video_thumbnail'];
	$videoEmbed = 'https://player.vimeo.com/video/' . $videoID . '?api=1';
?>


<div class="component component-video" data-component-name="Video">
	<div class="pure-g">
		<div class="column pure-u-lg-3-12 pure-u-md-3-12 mobile-hidden"></div>
		<div class="column pure-u-lg-9-12 pure-u-md-9-12 pure-u-sm-12-12">
			<div class="video-wrapper vimeo video-module" data-video-id="<?= $videoID;?>">
				<div class="component-fade">
					<div class="video-overlay"></div>
					<img class="video-thumb" src="<?= $videoThumb['url'];?>" alt="<?= $videoThumb['title'];?>" title="<?= $videoThumb['title'];?>" />
					<mark class="play vimeoPlay" data-video-id="<?= $videoID;?>"></mark>
				</div>
				<div class="video-popup">
					<mark class="close close-white vimeoClose" data-video-id="<?= $videoID;?>"></mark>
					<iframe id="video-<?= $videoID;?>" src="<?= $videoEmbed; ?>" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
				</div>
			</div>
		</div>
	</div>
</div>