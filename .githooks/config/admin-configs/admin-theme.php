<?php
/*** Admin Color Schemes ***/
//Set admin color schemes depending on env variable (var is set in .env)
function update_user_option_admin_color( $color_scheme ) {
	$env = $_SERVER['WPENGINE_ACCOUNT'];

	if($env == WPE_PROD) {
		$color_scheme = 'sunrise';
	} else if($env == WPE_STAGE) {
		$color_scheme = 'blue';
	} else {
		$color_scheme = 'coffee';
	}
    return $color_scheme;
}
add_filter( 'get_user_option_admin_color', 'update_user_option_admin_color', 5 );

//Add custom color scheme
function additional_admin_color_schemes() {
  //Get the theme directory
  $theme_dir = get_stylesheet_directory_uri();
	global $_wp_admin_css_colors;
		
	$color_name = $_wp_admin_css_colors['sunrise']->name;

	foreach ($_wp_admin_css_colors as $color) {
		$colorName = $color->name;
		if($colorName == 'Sunrise') {
			$color->name = 'Prod';
		}

		if($colorName == 'Coffee') {
			$color->name = 'Dev';
			$color->url = $theme_dir . '/dist/admin-colors.css';
			$color->colors = array( '#316C31', '#458534', '#7BB35A', '#BBDB6A' );
		}

		if($colorName == 'Blue') {
			$color->name = 'Staging';
		}
	}

	return $_wp_admin_css_colors;
 
}
add_action('admin_init', 'additional_admin_color_schemes');

//Remove admin theme colors that are unused
function admin_color_scheme() {
	global $_wp_admin_css_colors;
	$_wp_admin_css_colors['fresh'] = 0;
	$_wp_admin_css_colors['light'] = 0;
	$_wp_admin_css_colors['ectoplasm'] = 0;
	$_wp_admin_css_colors['midnight'] = 0;
	$_wp_admin_css_colors['ocean'] = 0;

}
add_action('admin_head', 'admin_color_scheme');


//Change the color of the admin bar on the front end if it is displayed

function change_bar_color() {
	$env = $_SERVER['WPENGINE_ACCOUNT'];

	if($env == WPE_PROD) {
		$barColor = 'red';
	} else if($env == WPE_STAGE) {
		$barColor = 'DeepSkyBlue';
	} else {
		$barColor = 'green';
	}
	echo '<style> #wpadminbar{ background: '.$barColor.' !important; } #wp-admin-bar-environment .ab-empty-item {font-weight: bold;}</style>';
}
add_action('wp_head', 'change_bar_color');
add_action('admin_head', 'change_bar_color');