<!-- Previous events component -->
<?php
	    $args = array(
            'post_parent' 	=> $ID,
            'post_type'   	=> 'events', 
            'numberposts' 	=> 9999,
            'post_status' 	=> 'publish',
            'orderby'		=> 'start_date',
            'order'			=> 'DESC',
			'meta_query' => array(
		        'relation' => 'AND',
		        array(
		            'key' => 'event_page_type',
		            'value' => 'overview_page',
		        ),
		        array(
		            'key' => 'start_date',
		            'value' => date('Ymd'),
		            'compare' => '<'
		        ), 
		    ),

        );
        $pastEvents = get_posts($args);
?>

<section class="component component-theme-blue component-carousel component-carousel-previous-events component-carousel-alt"	data-component-name="Carousel" data-component-options='{"dots": true, "arrows": true}'>
	<div class="slides-container">
		<?php
			$i = 0;
			$count = 0;
		?>
		<div class="slide <?php if($i == 0){echo ' active';}?>" id="slide-<?= $i;?>">
		<?php
			foreach ($pastEvents as $pastEvent) {
				$eventID = $pastEvent->ID;
				$i++;
		?>
				<?php if(($count>0) and ($count%6==0)) { ?>
					</div><div class="slide <?php if($i == 0){echo ' active';}?>" id="slide-<?= $i;?>">
				<?php } ?>
					<h2 class="headline5"><a href="<?= get_the_permalink($eventID);?>"><?= get_the_title($eventID);?></a></h2>

		<?php 	$count++;
				$i++;
			}
		?>
		</div>
	</div>

</section>
