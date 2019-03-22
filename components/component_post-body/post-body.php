<?php //Single Post Body ?>

<article class="component-row padding-small-top-5x padding-small-bottom-7x">
	<div class="pure-g component-row-wide component-alignment-top">
		<div class="column flex-g-lg-1-12 flex-g-md-1-12 flex-g-sm-0-12"></div>
		<div class="column flex-g-lg-10-12 flex-g-md-10-12 flex-g-sm-12-12">
			<div class="component-post-body">
				<header class="single-header margin-small-bottom-3x">
					<span class="caption2 color-text-brown uppercase display-block margin-small-bottom-2x align-center"><?php the_category(', '); ?></span>
					<h1 class="headline4 color-text-primary align-center margin-small-bottom-2x"><?php the_title();?></h1>
					<span class="eyebrow uppercase display-block align-center"><?= get_the_time('F j, Y');?></span>
				</header>
			</div>
		</div>
	</div>
	<?php if(has_post_thumbnail()){ ?>
		<div class="pure-g component-row-wide component-alignment-top">
			<div class="column flex-g-lg-12-12 flex-g-md-12-12 flex-g-sm-12-12">
				<div class="component-post-body">
					<div class="featured-image margin-small-bottom-3x">
						<?php the_post_thumbnail('full');?>
					</div>
				</div>
			</div>
		</div>	
	<?php } ?>
	<div class="pure-g component-row-wide component-alignment-top">
		<div class="column flex-g-lg-2-12 flex-g-md-1-12 flex-g-sm-0-12"></div>
		<div class="column flex-g-lg-8-12 flex-g-md-10-12 flex-g-sm-12-12">
			<div class="component-post-body">
				<div class="body-text margin-small-bottom-3x">
					<?php the_content();?>
				</div>
				<div class="tags margin-small-bottom-3x">
					<span class="caption2 color-text-primary uppercase display-block"><?php the_tags('', ', ', ''); ?></span>
				</div>
				<?php
					$postTitle = get_field('og_title');

					if($postTitle) {
						$postTitle = $postTitle;
					} else {
						$postTitle = get_the_title();
					}
					echo Utils::render_template('components/component_share/share.php', array(
						"displayTitle" 	=> 'Share',
						"socialTitle" 	=> $postTitle,
						"url" 			=> get_the_permalink()
					));
				?>
			</div>
		</div>
	</div>
</article>