<?php
/**
 * Template: Single
 * Description: Wordpress template for a single post page. Copy template and rename single-customposttype.php to create different templates for CPTs.
 *
 */
    get_header();

    $categories = get_the_category();
	$categoryID = $categories[0]->cat_ID;
	$postID = get_the_ID();
	if ( post_password_required() ) {
		//password protection
		echo get_the_password_form(); 
	} else {

        if (have_posts()) : while (have_posts()) : the_post();

?>	
	<?php the_title();?>
	<?php the_content();?>

<?php


        endwhile; // endwhile default loop
        else:
?>
        <p>Sorry, no pages matched your criteria.</p>
<?php
        endif; // endif default loop
        wp_reset_query();
?>


<?php
	} //end password
get_footer();
?>
