<?php 
	// Social Media 
	// vars are declared in header.php so that they are always acccessible.
	global $facebook;
	global $twitter;
	global $instagram;
	global $linkedin;
	global $medium;
	global $youtube;
	global $pinterest;
?>

<div class="component-social-media component">
	<?php if($this->displayTitle){ ?>
		<h4 class="<?= $this->displayTitleClass;?> <?= $this->alignment;?> margin-global-bottom-2x"><?= $this->displayTitle;?></h4>
	<?php } ?>
	<div class="social-media-list <?= $this->colorClass;?> <?= $this->alignment;?>">
		<?php if($twitter) { ?>
			<mark class="social-icon margin-global-right-2x"><a href="<?= $twitter;?>" target="_blank"><i class="fab fa-twitter"></i></a></mark>
		<?php } ?>
		<?php if($instagram) { ?>
			<mark class="social-icon margin-global-right-2x"><a href="<?= $instagram;?>" target="_blank"><i class="fab fa-instagram"></i></a></mark>
		<?php } ?>
		<?php if($facebook) { ?>
			<mark class="social-icon margin-global-right-2x"><a href="<?= $facebook;?>" target="_blank"><i class="fab fa-facebook-f"></i></a></mark>
		<?php } ?>
		<?php if($linkedin) { ?>
			<mark class="social-icon margin-global-right-2x"><a href="<?= $linkedin;?>" target="_blank"><i class="fab fa-linkedin-in"></i></a></mark>
		<?php } ?>
		<?php if($medium) { ?>
			<mark class="social-icon margin-global-right-2x"><a href="<?= $medium;?>" target="_blank"><i class="fab fa-medium-m"></i></a></mark>
		<?php } ?>
		<?php if($youtube) { ?>
			<mark class="social-icon margin-global-right-2x"><a href="<?= $youtube;?>" target="_blank"><i class="fab fa-youtube"></i></a></mark>
		<?php } ?>
		<?php if($pinterest) { ?>
			<mark class="social-icon margin-global-right-2x"><a href="<?= $pinterest;?>" target="_blank"><i class="fab fa-pinterest-p"></i></a></mark>
		<?php } ?>
	</div>
</div>

