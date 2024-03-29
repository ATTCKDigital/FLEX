<?php
	/**
	 * Template: Category Archive
	 * Description: Wordpress template for a category archive page. Copy and re-name to category-termname.php for category specific archives.
	 *
	 */
	echo '<!-- Template: FLEX/category.php -->';
    get_header();

    $term = get_queried_object(); 
    // If archive is a category or a tag, find out the term.
    // https://codex.wordpress.org/Function_Reference/get_queried_object

    $taxonomy = ''; //Set taxonomy if using custom tax

    $maxPages = $wp_query->max_num_pages; //Find the max number of pages for the query, necessary for "Load More"
    $pageTitle = $term->name; //Set the title of the page
    $postType = 'post'; //Set the post type

    echo Utils::render_template("components/component_archive-feed/archive-feed-header.php", array(
        "title"         => $pageTitle,
    ));

    echo Utils::render_template("components/component_archive-feed/archive-feed.php", array(
        "title"         => $pageTitle,
        "maxPages"      => $maxPages,
        "term"          => $term->term_id,
        "taxonomy"      => 'category',
        "postType"      => $postType,
        "query"         => $wp_query,
        "loadMoreText"  => __('Show More', '_flex')
    ));

    get_footer();
?>
