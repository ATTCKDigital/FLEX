<!-- Press kit -->
<?php if(get_field('press_kit_background_image', 'options')){ ?>
<section class="component component-press-kit">
	<div class="content-wrapper" style="background-image:url('<?= get_field('press_kit_background_image', 'options')['url'];?>');">
		<div class="press-kit-info">
			<h4 class="headline6 align-center white-text"><?= get_field('press_kit_text', 'options');?></h4>
			<a href="<?= get_field('press_kit_download', 'options')['url'];?>" target="_blank" class="button button-secondary">Download press kit</a>
		</div>
	</div>
</section>
<?php } ?>