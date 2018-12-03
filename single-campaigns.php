<?php
/**
 * Template: Campaign Layout
 * Description: Wordpress template for a layout page
 *
 */
	get_header();
	$ID = get_the_ID();
	$parentID = $post->post_parent;

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
