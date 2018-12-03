<?php
	/**
	 * Carousel component
	 */
	$slides = $globalColumn['carousel_slides'];
	$usingStaticContent = $globalColumn['carousel_slides_static'];
	$parallaxDisabled = ($globalColumn['carousel_slides_parallax']) ? ' parallax-disabled' : '';
?>
<section class="component component-carousel" data-component-name="Carousel">
	<div class="content-wrapper">
		<?php
			// Check if we're entering information manually or if we're pulling from Stories
			// Technically, manual entry doesn't support multiple slides (i.e., the single carousel defining attribute)
			if ($usingStaticContent) {
				echo '<ul class="slides manual-entry' . $parallaxDisabled . '">';
				// Entering manual information
				$slideImage = $globalColumn['carousel_slides_manual_background'];
				$headline = $globalColumn['carousel_slides_manual_headline'];
				$subhead = $globalColumn['carousel_slides_manual_subhead'];
				$districtName = $globalColumn['carousel_slides_manual_district_name'];
				$detailsCaption = $globalColumn['carousel_slides_manual_details_caption'];
				$propertyNameCaption = $globalColumn['carousel_slides_manual_property_name_caption'];
				$ctaCaption = $globalColumn['carousel_slides_manual_cta_caption'];
				$ctaCaptionURL = $globalColumn['carousel_slides_manual_cta_caption_url'];
				?>
					<li class="slide component" style="background-image: url('<?= $slideImage["url"]; ?>')" data-component-name="Parallax">
						<div class="overlay"></div>
						<hgroup>
							<?php if ($headline) : ?><h2 class="sans-serif45"><a href="#"><?php echo $headline; ?></a></h2><?php endif; ?>
							<?php if ($subhead) : ?><h3 class="sans-serif45"><?php echo $subhead; ?></h3><?php endif; ?>
							<?php if ($slides && count($slides) > 1) : ?>
						<?php endif; ?>
						</hgroup>
						<?php if ($districtName || $detailsCaption || $propertyNameCaption || $ctaCaption || $ctaCaptionURL) : ?>
						<div class="author-bar-component">
							<?php if ($districtName): ?><span class="district-name"><?php echo $districtName; ?></span><?php endif; ?>
							<?php if ($detailsCaption): ?><span class="details_caption"><?php echo $detailsCaption; ?></span><?php endif; ?>
							<?php if ($propertyNameCaption): ?><span class="property_name_caption"><?php echo $propertyNameCaption; ?></span><?php endif; ?>
							<?php if ($ctaCaption && $ctaCaptionURL): ?><span class="city_state_caption"><a href="<?php echo $ctaCaptionURL; ?>"><?php echo $ctaCaption; ?></a></span><?php endif; ?>
						</div>
					<?php endif; ?>
					</li>
				<?php
				echo '</ul>';
			} else {
				// Using Stories as slide source
				$i = 0;

				if ($slides) :
					if (count($slides) > 1) :
						?>
						<a href="#prev" class="nav prev showOnDesktop">previous</a>
						<a href="#next" class="nav next showOnDesktop">next</a>
						<?php
					endif;
					?>
					<ul class="slides">
					<?php

						foreach ($slides as $slide) {
							// Choosing data from Stories
							$slideImage = get_the_post_thumbnail_url($slide, 'full');
							$headline = $slide->post_title;
							$subhead = get_field('subhead', $slide->ID);
							$author = $slide->post_author;
							$authorName = get_the_author_meta('display_name', $author);
							$authorTitle = get_the_author_meta('title', $author);
							$centerName = get_the_author_meta('center-name', $author);
							$centerLocation = get_the_author_meta('location', $author);
							?>
								<li class="slide component" style="background-image: url('<?= $slideImage; ?>')" data-component-name="Parallax">
									<div class="overlay"></div>
									<hgroup>
										<?php if ($headline) : ?><h2 class="sans-serif45"><a href="<?php echo get_permalink($slide->ID) ?>"><?php echo $headline; ?></a></h2><?php endif; ?>
										<?php if ($subhead) : ?><h3 class="sans-serif45"><?php echo $subhead; ?></h3><?php endif; ?>
										<?php if ($slides && count($slides) > 1) : ?>
										<ul class="dots-component">
											<li><a href="#prev" class="nav prev hideOnDesktop">previous</a></li>
											<?php
												// One dot for each slide, clickable
												$i = 0;
												foreach ($slides as $slide) {
													echo '<li class="dot"><a href="#' . $i . '"></a></li>';
													$i++;
												}
											?>
											<li><a href="#next" class="nav next hideOnDesktop">next</a></li>
										</ul>
									<?php endif; ?>
									</hgroup>
									<?php if ($authorName || $authorTitle || $centerName || $centerLocation) : ?>
									<div class="author-bar-component">
										<?php if ($authorName): ?><span class="district-name"><?php echo $authorName; ?></span><?php endif; ?>
										<?php if ($authorTitle): ?><span class="author_title"><?php echo $authorTitle; ?></span><?php endif; ?>
										<?php if ($centerName): ?><span class="property_name_caption"><?php echo $centerName; ?></span><?php endif; ?>
										<?php if ($centerLocation): ?><span class="city_state_caption"><?php echo $centerLocation; ?></span><?php endif; ?>
									</div>
								<?php endif; ?>
								</li>
							<?php
						}
					?>
					</ul>
					<?php
				endif;
			}
		?>
	</div>
</section>
