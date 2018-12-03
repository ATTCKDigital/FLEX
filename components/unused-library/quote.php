<?php
	/**
	 * Quote component
	 */
?>
<section class="component component-quote">
	<div class="content-wrapper">
		<?php
			$quoteText = get_sub_field('testimonial_text');
			$quoteSource = get_sub_field('testimonial_source');
		?>
		<h3 class="headline3"><?= $quoteText;?></h3>
		<cite>&ndash; <?= $quoteSource;?></cite>
	</div>
</section>