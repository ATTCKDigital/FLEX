<?php
/**
 * AJAX Load More Posts
 *
 */


$result = array();

// Script for getting posts
function ajax_filter_get_posts( $post ) {

	// Verify nonce
	if( !isset( $_POST['afp_nonce'] ) || !wp_verify_nonce( $_POST['afp_nonce'], 'afp_nonce' ) )
		die('Permission denied');

	//taxonomy type
	$taxonomy = $_POST['taxonomy'];
	//term ids
	$term = $_POST['term'];
	$termArray = explode(',',$term);
	//post type
	$postType = $_POST['postType'];
	$postTypeArray = explode(',',$postType);
	//excluded posts
	$exclude = $_POST['ids'];

	if($taxonomy == 'category') {
		//If it's a category	
		$args = array(
			'posts_per_page' 	=> 10,
			'orderby'			=> 'date',
			'order' 			=> 'DESC',
			'post_type' 		=> $postTypeArray,
			'post_status' 		=> 'publish',
			'post__not_in'		=> $exclude,
			'category__in'		=> $termArray,
		);
	} if($taxonomy == 'tag') {
		//If it's a tag	
		$args = array(
			'posts_per_page' 	=> 10,
			'orderby'			=> 'date',
			'order' 			=> 'DESC',
			'post_type' 		=> $postTypeArray,
			'post_status' 		=> 'publish',
			'post__not_in'		=> $exclude,
			'tag__in'		=> $termArray,
		);
	} else {
		//Default	
		$args = array(
			'posts_per_page' 	=> 10,
			'orderby'			=> 'date',
			'order' 			=> 'DESC',
			'post_type' 		=> $postTypeArray,
			'post_status' 		=> 'publish',
			'post__not_in'		=> $exclude,
		);
	}


	$query = new WP_Query( $args );

	if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post();
				
		$postID = get_the_ID();
		$maxPages = $query->max_num_pages;
		$link = get_the_permalink($postID);
		$postType = get_post_type($postID);
		$categories = get_the_category($ID);
		$thumbnail = get_the_post_thumbnail($postID, 'full');

		if($thumbnail) {
			 $thumbnail = $thumbnail;
		} else {
			$thumbnail = '<img src="'.get_field('fallback_image', 'options').'" alt="'.get_field('fallback_image_alt', 'options').'" title="'.get_field('fallback_image_alt', 'options').'" />';
		}

		$arrayCategories =  array();

		if($categories) {
			foreach ($categories as $category) {
				$arrayCategories[] = '<a href="/category/'.$category->slug.'">'.$category->name.'</a>';
			}
			$displayCategories = implode( ', ', $arrayCategories );;
		}

		$results = '<div class="new-elements load-item feed-item" data-post-id="'.$postID.'" data-max-pages="'.$maxPages.'"><div class="image-wrapper  margin-small-bottom-1x"><a href="'.$link.'">'.$thumbnail.'</a></div><div class="feed-info margin-small-bottom-2x"><span class="eyebrow display-block margin-small-bottom-1x element-in-view">'.$displayCategories.'</span><h2 class="headline6 margin-small-bottom-1x  element-in-view">'.get_the_title($ID).'</h2><p class="margin-small-bottom-1x  element-in-view">'.excerpt(20).'</p><span class="eyebrow display-block margin-small-bottom-1x element-in-view">'.get_the_time('F j, Y').'</span></div></div>';
				

		$result['response'][] = $results;
		$result['status']   = 'done';
	
	endwhile; else:
		$result['response'] = '<div class="feed-item margin-small-top-2x margin-small-bottom-2x" data-max-pages="0"><h2 class="headline6 margin-small-bottom-1x">There is no content that matches your filter</h2></div>';
		$result['status']   = '404';
	endif;
 
	$result = json_encode($result);
	echo $result;
	

	die();
}


add_action('wp_ajax_filter_posts', 'ajax_filter_get_posts');
add_action('wp_ajax_nopriv_filter_posts', 'ajax_filter_get_posts');
