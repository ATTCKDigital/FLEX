<?php
//Shortcode for outputting current year on front end
//https://css-tricks.com/snippets/wordpress/year-shortcode/
function year_shortcode() {
  $year = date('Y');
  return $year;
}
add_shortcode('year', 'year_shortcode');