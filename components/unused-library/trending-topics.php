<!-- Trending topics-->
<section class="component component-trending-topics">
	<div class="component-inner">
		<nav class="align-center">
			<span class="eyebrow eyebrow-regular"><?= get_sub_field('trending_topics_title');?></span>
			<?php 
				//categories
				$topics = get_sub_field('trending_topics');
				foreach ($topics as $topic) {
			?>
				<a href="<?= get_term_link( $topic );?>" class="text-link"><?= $topic->name;?></a>
			<?php 
				}
			?>

			<?php 
				//regions
				$regions = get_sub_field('trending_topics_regions');
				foreach ($regions as $region) {
			?>
				<a href="<?= get_term_link( $region );?>" class="text-link"><?= $region->name;?></a>
			<?php 
				}
			?>
		</nav>
	</div>
</section>
