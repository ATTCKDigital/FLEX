<?php
/**
 * Template: WP Blog Posts Index
 * Description: home.php is used to render the blog posts index, whether it is being used as the front page or on separate static page. If home.php does not exist, WordPress will use index.php.
 *
 */
    get_header();

    // Find the max number of pages for the query, necessary for "Load More"
    $maxPages = $wp_query->max_num_pages;

    // Set the title of the page
    $pageTitle = __('Blog Posts Index', '_flexlayout');
    $postType = 'post';

    echo Utils::render_template("components/component_archive-feed/archive-feed-header.php", array(
        "title"         => $pageTitle,
    ));

    echo Utils::render_template("components/component_archive-feed/archive-feed.php", array(
        "title"         => $pageTitle,
        "maxPages"      => $maxPages,
        "term"          => '', //leave blank
        "taxonomy"      => '', //leave blank
        "postType"      => $postType,
        "query"         => $wp_query,
        "loadMoreText"  => __('Show More', '_flexlayout')
    ));

    get_footer();
?>