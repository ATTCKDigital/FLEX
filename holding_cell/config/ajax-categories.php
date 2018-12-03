<?php
/**
 * AJAX posts filter
 *
 */


$result = array();

// Script for getting posts
function ajax_filter_get_cats( $category, $type, $taxonomy, $exclude ) {

  // Verify nonce
  if( !isset( $_POST['afp_nonce'] ) || !wp_verify_nonce( $_POST['afp_nonce'], 'afp_nonce' ) )
    die('Permission denied');

  $category = $_POST['category'];
  $taxonomy = $_POST['taxonomy'];
  $type = $_POST['type'];
  $exclude = $_POST['exclude'];

  if($category == 'all') {

    $args = array(
      'posts_per_page' => 20,
      'order_by' => 'date',
      'order' => 'DESC',
      'post_status' => 'publish',
      'has_password' => false,
      'post_type' => $type,
      'post__not_in'=> $exclude,
    );

  } elseif($category == 'category') {
    $args = array(
      'posts_per_page' => 20,
      'order_by' => 'date',
      'order' => 'DESC',
      'post_status' => 'publish',
      'has_password' => false,
      'post_type' => $type,
      'post__not_in'=> $exclude,
      'cat' => $category
    );
  } else {
    $args = array(
      'posts_per_page' => 20,
      'order_by' => 'date',
      'order' => 'DESC',
      'post_status' => 'publish',
      'has_password' => false,
      'post_type' => $type,
      'post__not_in'=> $exclude,
      'tax_query' => array(
          array(
            'taxonomy' => $taxonomy,
            'field'    => 'term_id',
            'terms'    => $category,
          ),
        ),
    );
  }


  $query = new WP_Query( $args );
  if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post();
        $postID = get_the_id();
        $pages = $query->max_num_pages;
        $type = get_post_type();
        $author = $post->post_author;
        $authorName = get_the_author_meta('display_name', $author);

        $results = '';

        if($type == 'post') {
          $results = '<div class="new-elements blog-post-item archive-item pure-g" data-post-id="'.$postID.'" data-max-pages="'.$pages.'"><div class="blog-post-content pure-u-lg-3-4 pure-u-md-3-4"><h2 class="headline4-lower"><a href="'.get_permalink().'">'.get_the_title().'</a></h2><span class="caption-small-light gray-text">Posted by '.$authorName.' on '.get_the_time('l, F j, Y').'</span><div class="body-text"></div><p class="small-text">'.excerpt(30).'</p><span class="caption-small-light white-text">Tags: '.get_the_category_list( ', ', '', $ID).'</span><a href="'.get_permalink().'" class="read-more-link">Read More</a></div><div class="blog-post-image pure-u-lg-1-4 pure-u-md-1-4">'.get_the_post_thumbnail($postID, 'square').'</div>';
        } 

      $result['response'][] = $results;
      $result['status']   = 'done';

  endwhile; else:
      $result['status']   = '404';
  endif;

  $result = json_encode($result);
  echo $result;


  die();
}


add_action('wp_ajax_filter_cats', 'ajax_filter_get_cats');
add_action('wp_ajax_nopriv_filter_cats', 'ajax_filter_get_cats');
