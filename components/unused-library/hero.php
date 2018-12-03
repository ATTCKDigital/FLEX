<!-- Hero component -->
<!-- get_posts loop to include it in layout generator.  -->
<?php
	$args = array(
        'post_type'   => array('home_heroes'), 
        'numberposts' => 1,
        'orderby' => 'date',
        'order' => 'DESC',
        'suppress_filters' => 0,
    );					

	$heroes = get_posts( $args );
	foreach ($heroes as $post) {
		setup_postdata($post);
       	echo Utils::render_template("inc/templates/hero.php", array(
            "heroID"  => $post->ID,
        ));
    } //endforeach 
	wp_reset_postdata();
?>