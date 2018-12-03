<?php
/**
 * Template: Author Archive
 * Description: Wordpress template for author archive page
 *
 */
    get_header();


    $maxPages = $wp_query->max_num_pages;
    $count = $wp_query->post_count;
    $author = get_the_author();
    $authorID = get_the_author_meta('user_nicename');

    echo Utils::render_template("inc/templates/author-feed.php", array(
        "title"         => $author,
        "maxPages"      => $maxPages,
        "authorID"      => $authorID,
        "query"         => $wp_query,
        "postType"      => 'post',
        "count"         => $count,
    ));

    get_footer();
?>

