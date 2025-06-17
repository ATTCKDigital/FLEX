<?php
/** 
 * Add Function to Output uploaded logo 
 */
function theme_prefix_the_custom_logo() {
	if ( function_exists( 'the_custom_logo' ) ) {
		the_custom_logo();
	}
}

/** 
 * Adds option for light logo 
 */
function mytheme_customize_register($wp_customize) {
    // Add a new setting for the light version of the logo
    $wp_customize->add_setting('light_logo', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ));

    // Add a control to upload the light logo
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'light_logo', array(
        'label' => __('Light Logo', 'mytheme'),
        'section' => 'title_tagline', // Site Identity section
        'settings' => 'light_logo',
        'priority' => 9, // Just after the default logo
    )));
}
add_action('customize_register', 'mytheme_customize_register');