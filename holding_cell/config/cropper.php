<?php
//enable featured images
add_theme_support( 'post-thumbnails' );

// create custom crop sizes for thumbnails, uncomment out and change attributes below
set_post_thumbnail_size( 250,99999, false );

function otl_theme_setup() {
  add_image_size('square',800,800, true); //retina sized
  // add_image_size('archive-thumbnail',662,662, true);
  // add_image_size('landscape-thumbnail',9999,310, true);
  // add_image_size('real-estate-thumbnail',507,400, true);
  // add_image_size('real-estate-thumbnail-small',331,400, true);

}
add_action( 'after_setup_theme', 'otl_theme_setup' );
