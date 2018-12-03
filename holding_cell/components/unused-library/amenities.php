<?php
	$amenities = $globalColumn['amenities_map_items'];
?>
<section class="component component-expander component-amenities component-theme-<?= $globalColumn['expander_background_color'];?> expanded" data-component-name="Expander">
	<div class="content-wrapper">
		<div class="expander-image-wrapper">
			<div class="expander-image amenity-map">
				<img src="<?php echo get_template_directory_uri() . "/dist/images/map-base.png"; ?>" class="map-base" />
				<ul class="map-points">
					<?php 
						$i = 0;
						
						foreach ($amenities as $amenity) {
							$i++;
					?>
						<li class="map-point" data-amenity-id="amenity-<?= $amenity['amenity_id'];?>"><span><?= $amenity['amenity_map_marker_title'];?></span></li>
					<?php } ?>
				</ul>
			</div>
			<div class="amenity-list">
				<?php 
					$i = 0;
					//remove leasing so it doesn't affect the counting
					$amenitiesFiltered = array_filter($amenities, function($x) { return $x['amenity_id'] != 'leasing'; });
					$count = count($amenitiesFiltered);
					foreach ($amenitiesFiltered as $amenity => $row) {
			
				?>
						<?php if($i % 3 == 0) { ?><div class="list-wrapper"><?php } ?>

							<h6 class="map-point-item" data-amenity-id="amenity-<?= $row['amenity_id'];?>"><span><?= $row['amenity_map_marker_title'];?></span></h6>
						<?php 
							
							if(($i % 3 == 2) || ($i + 1 == $count)) { 
						?>
							</div>
						<?php } ?>
						<?php $i++;?>
				<?php } ?>
			</div><!-- close list -->
		</div>

		<span class="sans-serif14 uppercase openGallery align-center">See Gallery View</span>

		<mark class="arrow-wrapper expandComponent">
			<?php
				echo Utils::render_template("inc/templates/svg.php", array(
					"id" => "arrow-svg",
					"classes" => "arrow-svg",
					"data" => ""
				));
			?>
		</mark>

		<div class="expander-wrapper component-theme-<?= $globalColumn['expander_background_color'];?> ">
			<div class="expander-tab">
				<div class="amenities">
					<div class="amenity no-image activeAmenity" data-amenity-id="amenity-placeholder>">	
						<div class="expander-content">
							<div class="expander-content-positioning">
								<h2 class="headline2 brown-text align-center border-bottom-center"><?= get_field('placeholder_title');?></h2>
								<div class="body-text">
									<?= get_field('placeholder_text');?>
								</div>
							</div>
						</div>
					</div>
					<?php
							$i = 0;
							
							foreach ($amenities as $amenity) {
								$i++;
					?>	
						<div class="amenity<?php if(!$amenity['amenity_image']){echo ' no-image'; }?>" data-amenity-id="amenity-<?= $amenity['amenity_id'];?>">	
							<?php if($amenity['amenity_image']){ ?>
								<div class="gallery-teaser">
									<img src="<?= $amenity['amenity_image']['url'];?>" alt="<?= $amenity['amenity_image']['title'];?>" title="<?= $amenity['amenity_image']['title'];?>" />
								</div>
							<?php } ?>
							<div class="expander-content">
								<div class="expander-content-positioning">
									<h2 class="headline2 brown-text align-center border-bottom-center"><?= $amenity['amenity_title'];?></h2>
									<div class="body-text">
										<?= $amenity['amenity_text'];?>
									</div>
								</div>
							</div>
						</div>
					<?php 
							}
					?>
				</div>

			</div>
		</div>
	</div>
</section>