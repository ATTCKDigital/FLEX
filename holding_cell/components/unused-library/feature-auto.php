<!-- Homepage featured content compnent - automated -->
<!-- get_posts loop to include it in layout generator.  -->
<?php
	$currentDate = date( 'Ymd' );

	// look for most recent post that is not expired	
	$argsExpire = array(
        'post_type'   => array('home_features'), 
        'numberposts' => 1,
        'orderby' => 'date',
        'order' => 'DESC',
        'suppress_filters' => 0,
        'meta_query' => array(
			array(
				'key'     => 'expiration_date',
	            'value' => $currentDate,
	            'compare' => '>=',
	            'type' => 'DATE'
			),
		
		),
    );		

	// look for most recent post without expiration
	$argsRecent = array(
        'post_type'   => array('home_features'), 
        'posts_per_page' => 1,
        'orderby' => 'date',
        'order' => 'DESC',
        'suppress_filters' => 0,
        'meta_query' => array(
		
			array(
				'key'     => 'expiration_date',
	            'value' =>  null,
	            'compare' => '=',
			),
		),
    );	


	$features = get_posts( $argsRecent );
	$features2 = get_posts($argsExpire);
	// combine the results of both queries
	$results = array_merge($features, $features2);
	// sort the results by the post_date
	function sort_objects_by_date($a, $b) {
		return strtotime($b->post_date) - strtotime($a->post_date);
	}
	usort($results, 'sort_objects_by_date');

	foreach ($results as $post) {
		setup_postdata($post);
		if ($post === reset($results))
		// get only the first item in the array
			echo Utils::render_template("inc/templates/feature-auto.php", array(
	        	"featureID"  => $post->ID,
	        ));

	} //endforeach 
	wp_reset_postdata();		


?>