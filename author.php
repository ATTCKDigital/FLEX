<?php
/**
 * Template: Author Archive
 * Description: Wordpress template for an author page. 
 *
**/
	echo '<!-- Template: FLEX/author.php -->';
	
    get_header();

    $postID = get_the_ID();
            
        echo Utils::render_template('components/component_author/author.php');
    
    get_footer();
?>
