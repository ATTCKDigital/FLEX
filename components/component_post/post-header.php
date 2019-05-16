<?php // Single Post Header ?>
<section class="component-row">
	<?php if(has_post_thumbnail()){ ?>
		<div class="flex-grid component-row-full component-alignment-top">
			<div class="column flex-tablet-landscape-12-12 flex-tablet-portrait-12-12 flex-12-12">
				<div class="component-post-header">
					<div class="featured-image">
						<?php the_post_thumbnail('full');?>
					</div>
				</div>
			</div>
		</div>	
	<?php } ?>
	<div class="flex-grid component-row-wide component-alignment-top">
		<div class="column flex-tablet-landscape-1-12 flex-tablet-portrait-1-12 flex-0-12"></div>
		<div class="column flex-tablet-landscape-10-12 flex-tablet-portrait-10-12 flex-12-12">
			<div class="component-post-header">
				<header class="single-header margin-bottom-3x">
					<span class="headline6 color-text-primary display-block margin-bottom-2x align-center"><?php the_category(', '); ?></span>
					<h1 class="headline4 color-text-primary align-center margin-bottom-2x"><?php the_title();?></h1>
					<span class="eyebrow uppercase display-block align-center"><?= get_the_time('F j, Y');?></span>
				</header>
			</div>
		</div>
	</div>
</section>