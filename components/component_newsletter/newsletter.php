<?php // Global Newsletter ?>

<div class="component-newsletter component margin-global-bottom-3x">
	<?php if($this->displayTitle){ ?>
		<h4 class="<?= $this->displayTitleClass;?> margin-global-bottom-2x"><?= $this->displayTitle;?></h4>
	<?php } ?>
	<?= get_field('newsletter_embed_code', 'options');?>
</div>

