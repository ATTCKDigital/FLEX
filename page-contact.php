<?php
/**
 * Template Name: Contact
 * Description: Wordpress template for a contact page
 *
 */
    get_header();
?>


	<?php
		if ( post_password_required() ) {
			//password protection
			echo get_the_password_form(); 
		} else {
			//layout generator
			$globalRows = get_field('layout_generator');
			$rowNumber = 0;
			if($globalRows){
				foreach ($globalRows as $globalRow) {
					$rowNumber++;
					include(get_template_directory() . "/inc/config/layout-generator-component.php");
				}
			}
			
		}
	?>
<?php
	get_footer();
?>
