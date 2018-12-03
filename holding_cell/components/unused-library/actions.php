<!-- Actions component -->
<section class='component component-actions'>
	<div class='content-wrapper align-center'>
		<div class='actions'>
			<?php
				$currentDate = date('Y-m-d');

				if ($taxonomy) {
					// If the page is a region page, only show actions for that region
					$taxID = $taxonomy->term_id;
					$taxArray = explode(' ',$taxID);
					$args = array(
						'post_type' => array('actions', 'grants_awards'), 
						'posts_per_page' => 4,
						'orderby' => 'date',
						'order' => 'DESC',
						'suppress_filters' => 0,
						'meta_query' => array(
							array(
								'key' => 'expiration_date',
								'value' => $currentDate,
								'compare' => '>=',
								'type' => 'DATE'
							),
							
						),
					  	'tax_query' => array(
						  array(
							'taxonomy' => 'region_news_regions',
							'field' => 'term_id',
							'terms' => $taxArray,
						  ),
						),

					);
				} else {
					$args = array(
						'post_type' => array('actions', 'grants_awards'), 
						'posts_per_page' => 4,
						'orderby' => 'date',
						'order' => 'DESC',
						'suppress_filters' => 0,
						'meta_query' => array(
							
							array(
								'key' => 'expiration_date',
								'value' => $currentDate,
								'compare' => '>=',
								'type' => 'DATE'
							),
							
						),
					);					
				}			

				$actions = get_posts($args);
				$totalActions = count($actions);
				$moreActions = '';
				$actionIDs = array();

				foreach ($actions as $post) {
					setup_postdata($post);
					$icon = get_field('action_icon');
					$title = get_the_title();
					$ctaText = get_field('link_text');
					$actionID = $post->ID;

					if ($ctaText) {
						$ctaText = $ctaText;
					} else {
						$ctaText = 'Get involved';
					}

					$actionIDs[] = $actionID;
					?>
					<div class='action-item align-center row-text-black'>
						<a href='<?php the_permalink();?>' class='action-link'><?= $title;?></a>
						<div class='action-inner'>
							<?php 
								if ($icon) {
									echo Utils::render_template('inc/templates/svg.php', array(
										'id' => $icon,
										'classes' => 'action-icon'
									));
								
									echo Utils::render_template('inc/templates/svg.php', array(
										'id' => $icon.'-hover',
										'classes' => 'action-icon action-icon-hover'
									));
								 } 
							?>
							<h4 class='headline6'>
								<?= $title;?>
							</h4>
							<p class='regular-text'>
								<?= strip_tags(excerpt(20)); ?>
							</p>
							<span class='text-link'><?= $ctaText;?></span>
						</div>
					</div>
					<?php 
				} 

				wp_reset_postdata(); 
			?>

			<?php 
				// If there are less than 4 unexpired actions, find actions without an expiration date
				if ($totalActions < 4) {
					$numberPosts = 4 - $totalActions;
						
					if ($taxonomy) {
						// If the page is a region page, only show actions for that region
						$taxID = $taxonomy->term_id;
						$taxArray = explode(' ',$taxID);

						$args2 = array(
							'post_type' => array('actions', 'grants_awards'), 
							'posts_per_page' => $numberPosts,
							'orderby' => 'date',
							'order' => 'DESC',
							'suppress_filters' => 0,
							'meta_query' => array(
								array(
									'key' => 'expiration_date',
									'value' => null,
									'compare' => '=',
								),
								
							),
						  	'tax_query' => array(
							  array(
								'taxonomy' => 'region_news_regions',
								'field'	=> 'term_id',
								'terms'	=> $taxArray,
							  ),
							),

						);
					} else {
						$args2 = array(
							'post_type' => array('actions', 'grants_awards'), 
							'posts_per_page' => $numberPosts,
							'orderby' => 'date',
							'order' => 'DESC',
							'suppress_filters' => 0,
							'post__not_in' => $actionIDs,
							'meta_query' => array(
								
								array(
									'key' => 'expiration_date',
									'value' => null,
									'compare' => '=',
								),
								
							),
						);
					}

					$moreActions = get_posts($args2);
				}

				if ($moreActions) {
					foreach ($moreActions as $post) {
						setup_postdata($post);
						$ID = $post->ID;
						$icon = get_field('action_icon', $ID);
						$title = get_the_title($ID);
						$ctaText = get_field('link_text', $ID);

						if($ctaText) {
							$ctaText = $ctaText;
						} else {
							$ctaText = 'Get involved';
						}
			?>
				<div class='action-item align-center row-text-black'>
					<a href='<?= get_the_permalink($ID);?>' class='action-link'><?= $title;?></a>
					<div class='action-inner'>
						<?php 
							if ($icon) { 
								echo Utils::render_template('inc/templates/svg.php', array(
									'id' => $icon,
									'classes' => 'action-icon'
								));

								echo Utils::render_template('inc/templates/svg.php', array(
									'id' => $icon.'-hover',
									'classes' => 'action-icon action-icon-hover'
								));
							}
						?>
						<h4 class='headline6'>
							<?= $title;?>
						</h4>
						<p class='regular-text'>
							<?= strip_tags( excerpt(20) ); ?>
						</p>
						<span class='text-link'><?= $ctaText;?></span>
					</div>
				</div>
			<?php } wp_reset_postdata(); }?>
		</div>
	</div>
</section>