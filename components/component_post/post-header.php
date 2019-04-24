<?php // Single Post Header ?>
<section class="component-row">
	<?php if(has_post_thumbnail()){ ?>
		<div class="pure-g component-row-full component-alignment-top">
			<div class="column flex-g-lg-12-12 flex-g-md-12-12 flex-g-sm-12-12">
				<div class="component-post-header">
					<div class="featured-image">
						<?php the_post_thumbnail('full');?>
					</div>
				</div>
			</div>
		</div>	
	<?php } ?>
	<div class="pure-g component-row-wide component-alignment-top">
		<div class="column flex-g-lg-1-12 flex-g-md-1-12 flex-g-sm-0-12"></div>
		<div class="column flex-g-lg-10-12 flex-g-md-10-12 flex-g-sm-12-12">
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