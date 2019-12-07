<?php 
/**** Default nav walker include ****/
// Set desired menu location (primary, footer, etc) 
// using Utils::render_template() function
if (has_nav_menu($this->menuLocation)) {
	$navArgs = array(
		'theme_location' => $this->menuLocation,
		'container' => false,
		'menu_id' => false,
		'echo' => true,
		'fallback_cb' => false,
		'link_before' => '',
		'link_after' => '',
		'items_wrap' => '%3$s',
		'walker' => new Nav_Walker_Nav_Menu,
		'depth' => 0,
	);

	wp_nav_menu($navArgs);
}