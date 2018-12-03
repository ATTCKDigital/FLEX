<?php if (has_post_thumbnail()) { ?>
	<section class="component component-carousel" data-component-name="Carousel">
		<div class="content-wrapper">
			<ul class="slides manual-entry parallax-disabled">
				<li class="slide component active" data-component-name="Parallax" data-scroll-start="813" style="background-image: url('<?= get_the_post_thumbnail_url();?>');">
					<?php 
						$centerName = get_field('center_name');
						$centerLocation = get_field('center_location');
						$centerLink = get_field('center_link');
					?>
					<?php if ($centerName || $centerLocation || $centerLink) : ?>
						<div class="author-bar-component">
							<?php 
								if ($centerName) { print "<span class='property_name_caption'>$centerName</span>"; }
								if ($centerLocation) { print "<span class='city_state_caption'>$centerLocation</span>"; }
								if ($centerLink) { print"<span class='district-name'><a href='$centerLink'>See Center &rsaquo;</a></span>"; }
							?>
						</div>
					<?php endif; ?>
				</li>
			</ul>
		</div>
	</section>
<?php } ?>