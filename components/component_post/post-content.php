<?php //Single Post ?>

<article class="component-row padding-top-5x padding-bottom-7x">

	<div class="pure-g component-row-wide component-alignment-top">
		<div class="column flex-g-lg-2-12 flex-g-md-1-12 flex-g-sm-0-12"></div>
		<div class="column flex-g-lg-8-12 flex-g-md-10-12 flex-g-sm-12-12">
			<div class="component-post-body">
				<div class="body-text margin-bottom-3x">
					<?php the_content();?>
				</div>
				<div class="tags margin-bottom-3x">
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
						"displayTitle" 	=> __('Share', '_flexlayout'),
						"socialTitle" 	=> $postTitle,
						"url" 			=> get_the_permalink()
					));
				?>
			</div>
		</div>
	</div>
</article>