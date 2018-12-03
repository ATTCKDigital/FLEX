<!-- Video component -->
<?php
    if ($this->videoType == 'vimeo') {
	    $this->videoEmbed = 'https://player.vimeo.com/video/'.$this->videoID.'?api=1';
	} elseif ($this->videoType == 'youtube') {
		$this->videoType = 'youtube';
		$this->videoEmbed = 'https://www.youtube.com/embed/'.$this->videoID.'?enablejsapi=1';
	}
?>
<section class="component-video component">
	<div class="content-wrapper">

		<?php if ($this->videoID) { ?>
			<mark class="play-button" id="playButton-<?=$this->videoID;?>" data-video-id="<?= $this->videoID;?>"></mark>
		<?php } ?>
		<?php if ($this->videoThumbnail) { ?>
			<div class="video-wrapper">
				<img src="<?= $this->videoThumbnail[0];?>" alt="<?= $this->videoTitle;?>" title="<?= $this->videoTitle;?>" class="video-thumb" />
			</div>
		<?php } ?>
	</div>
	<?php if ($this->videoID) { ?>
		<div class="video-popup" id="playerFrame-<?= $this->videoID;?>" data-video-id="<?= $this->videoID;?>">
			<mark class="close" id="closeVideo-<?= $this->videoID;?>"></mark>
			<div class="video-wrapper">
				<?php if ($this->videoType == 'livestream') { ?>
					<?= $this->videoEmbed;?>
				<?php } else { ?>
					<iframe src="<?= $this->videoEmbed;?>" frameborder="0" id="<?= $this->videoID;?>" allowfullscreen></iframe>
				<?php } ?>
			</div>
		</div>
	<?php } ?>
</section>
<?php 
	if($this->videoID) {
		if ($this->videoType == 'youtube') { 
			include_once( THEME_DIR . '/inc/config/youtube.php');
		} else if($this->videoType == 'vimeo') {
			include_once( THEME_DIR . '/inc/config/vimeo.php');
			?>
			<script type="text/javascript">
				var iframe = document.getElementById('playerFrame-<?= $this->videoID;?>');
			    var player = new Vimeo.Player(iframe);
				var playButton = document.getElementById('playButton-<?= $this->videoID;?>');

				playButton.addEventListener('click', function() {
				    player.play();

				    $('body').find('.video-popup[data-video-id="<?= $this->videoID;?>"]').addClass('playVideo');
				});

				var closeButton = document.getElementById('closeVideo-<?= $this->videoID;?>');

				closeButton.addEventListener('click', function() {
				    player.pause();

				    $('body').find('.video-popup[data-video-id="<?= $this->videoID;?>"]').removeClass('playVideo');
				});
			</script>
<?php
		}
	}
?>