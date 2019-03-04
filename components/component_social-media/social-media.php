<?php 
	//Social Media 

	$facebook = get_field('facebook_url', 'options');
	$twitter = 'https://twitter.com/'.get_field('twitter_username', 'options');
	$instagram = 'https://www.instagram.com/'.get_field('instagram_username', 'options');
	$linkedin = get_field('linkedin_url', 'options');
	$medium = get_field('medium_url', 'options');
	$youtube = get_field('youtube_url', 'options');
	$pinterest = 'https://www.pinterest.com/'.get_field('pinterest_username', 'options');
?>

<div class="component-social-media component">
	<?php if($this->displayTitle){ ?>
		<h4 class="headline4 margin-global-bottom-1x"><?= $this->displayTitle;?></h4>
	<?php } ?>
	<div class="social-media-list">
		<?php if($facebook) { ?>
			<mark class="social-icon margin-global-right-1x margin-global-bottom-1x"><a href="<?= $facebook;?>" target="_blank"><i class="fab fa-facebook-f"></i></a></mark>
		<?php } ?>
		<?php if($twitter) { ?>
			<mark class="social-icon margin-global-right-1x margin-global-bottom-1x"><a href="<?= $twitter;?>" target="_blank"><i class="fab fa-twitter"></i></a></mark>
		<?php } ?>
		<?php if($instagram) { ?>
			<mark class="social-icon margin-global-right-1x margin-global-bottom-1x"><a href="<?= $instagram;?>" target="_blank"><i class="fab fa-instagram"></i></a></mark>
		<?php } ?>
		<?php if($linkedin) { ?>
			<mark class="social-icon margin-global-right-1x margin-global-bottom-1x"><a href="<?= $linkedin;?>" target="_blank"><i class="fab fa-linkedin-in"></i></a></mark>
		<?php } ?>
		<?php if($medium) { ?>
			<mark class="social-icon margin-global-right-1x margin-global-bottom-1x"><a href="<?= $medium;?>" target="_blank"><i class="fab fa-medium-m"></i></a></mark>
		<?php } ?>
		<?php if($youtube) { ?>
			<mark class="social-icon margin-global-right-1x margin-global-bottom-1x"><a href="<?= $youtube;?>" target="_blank"><i class="fab fa-youtube"></i></a></mark>
		<?php } ?>
		<?php if($pinterest) { ?>
			<mark class="social-icon margin-global-right-1x margin-global-bottom-1x"><a href="<?= $pinterest;?>" target="_blank"><i class="fab fa-pinterest-p"></i></a></mark>
		<?php } ?>
	</div>
</div>

