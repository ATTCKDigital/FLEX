<?php
/* Creates an excerpt function that allows for customized lengths per location it is used
** usage: <?= excerpt(20);?> where 20 is the number of words and can be changed as needed
*/
function excerpt($limit) {
	  $excerpt = explode(' ', get_the_excerpt(), $limit);
	  if (count($excerpt) >= $limit) {
		array_pop($excerpt);
		$excerpt = implode(' ', $excerpt) . '...';
	  } else {
		$excerpt = implode(' ', $excerpt);
	  }
	  $excerpt = preg_replace('`\[[^\]]*\]`', '', $excerpt);
	  return $excerpt;
}

// Add excerpts on pages
add_action('init', 'flexlayout_add_excerpts_to_pages');
function flexlayout_add_excerpts_to_pages() {
	 add_post_type_support('page', 'excerpt');
}