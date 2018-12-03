<!-- Feed component for categories. Uses category archive query parameters.  Also used on search results -->
<?php 
    $postType = get_post_type(); 
    
    if(is_search()) {
        if(array_key_exists('post_type', $GLOBALS['query'])) {
            $postType = $GLOBALS['query']['post_type'];
        } else {
            $postType = 'any';
        }

        if(array_key_exists('post_parent', $GLOBALS['query'])) {
            $postParent = $GLOBALS['query']['post_parent'];
        } else {
            $postParent = '';
        }

        if(array_key_exists('cat', $GLOBALS['query'])) {
            $catID = $GLOBALS['query']['cat'];
        } else {
            $catID = '';
        }
    } else {
        if($term != '') {
            $catID = $term->term_id;
        } else {
            $catID = '';
        }

    }

    if(is_tag() || is_category()) {
        $postType = 'any';
    }

    if($taxonomy) {
        if($taxonomy->name != 'resources') {
            $tax = $taxonomy->taxonomy;
            $region = $taxonomy->term_id;
            $taxSlug = $taxonomy->slug;
        } else {
            $tax = '';
            $region = '';
            $taxSlug = '';
        }
    } else {
        $tax = '';
        $region = '';
        $taxSlug = '';
    }

    $catExclude = '';

    //max number of pages for use with load more
    $maxPages = $wp_query->max_num_pages;

    // get translated object and set parameters for in the news and press releases for all languages
    $pressReleaseID = apply_filters( 'wpml_object_id', 1926, 'category', TRUE  );
    $pressRelease = get_term($pressReleaseID, 'news_type');
    $pressReleaseSlug = $pressRelease->slug;

    $inthenewsID = apply_filters( 'wpml_object_id', 1925, 'category', TRUE  );
    $inthenews = get_term($inthenewsID, 'news_type');
    $inthenewsSlug = $inthenews->slug;

    //note that "data-category" also applies to tag id
?>
<section class="component component-feed<?php if (is_tax('news_type', $pressReleaseSlug) || is_search()){ echo ' view-list'; } ?>" data-component-name="Feed">
    <div class="content-wrapper align-center">
        <div class="feed loadable<?php if (!(is_tax('news_type', $pressReleaseSlug) || is_search())){ echo '  masonryFeed'; } ?>" data-meta="1, 0" data-taxonomy="<?php if($tax != 'category'){echo $tax;}?>" data-region="<?php if($tax != 'category'){echo $region;}?>" data-cat-exclude="<?= $catExclude;?>" data-category="<?= $catID;?>" data-search="<?php the_search_query();?>" data-post-type="<?= $postType;?>" data-event-time="" data-post-parent="<?= $postParent;?>" data-author="" data-post-count="12" data-order="DESC" data-orderby="date">
            <div class="grid-sizer"></div>
            <div class="gutter-sizer"></div>
            <?php while (have_posts()) : the_post(); ?>
                <?php
                    $postType = get_post_type();
                    $postTypeObject = get_post_type_object( get_post_type($post) );
                    $postParentID = wp_get_post_parent_id($post->ID);

                    // Set the primary category values
                    $primaryID = get_post_meta($post->ID, '_yoast_wpseo_primary_category', true);
                    if ($primaryID) { 
                        $primaryCat = get_term( $primaryID, 'category' );
                        if ($primaryCat) {
                            $primaryName = $primaryCat->name;
                            $primarySlug = $primaryCat->slug;
                        } else {
                            // Fallback in case something does not have a category
                            $primaryName = '';
                            $primarySlug = '';
                        }
                    } else {
                        $primaryCat = get_the_terms($post->ID, 'category')[0];

                        if ($primaryCat) {
                            $primaryName = $primaryCat->name;
                            $primarySlug = $primaryCat->slug;
                        } else {
                            // Fallback in case something does not have a category
                            $primaryName = '';
                            $primarySlug = '';
                        }
                    }
                    
                    //get the taxonomy of the feed
                    if($tax == 'news_type') {
                        $feedTaxonomy = get_the_terms($post->ID, $tax);
                    } else {
                        $feedTaxonomy = '';
                    }

                    if($feedTaxonomy) {
                        $feedTaxonomy = $feedTaxonomy;
                    } else {
                        $feedTaxonomy = '';
                    }

                    //if it is a category or taxonomy archive, use the queried object term, otherwise display the primary category of each post
                    $term = get_term($catID);

                    if(is_tax('news_type')) {
                        // if it is a news archive, use the news type
                        $primaryName = $taxonomy->name;
                        $primarySlug = $taxonomy->slug;

                    } else if($feedTaxonomy) {
                        //if it is a custom taxonomy, use the taxonomy type
                        $primaryName = $feedTaxonomy[0]->name;
                        $primarySlug = $feedTaxonomy[0]->slug;


                    } else if(is_category()) {
                        // if it's a regular category page, use that category
                        $primaryName = $term->name;
                        $primarySlug = $term->slug;
                    } else {
                        // fall back
                        $primaryName = $primaryName;
                        $primarySlug = $primarySlug;

                    }

                    
                    //set the link
                    if($primarySlug == $inthenewsSlug) { 
                        $link = get_field('in_the_news_url'); 
                    } else if ($postType == 'user') { 
                        $link = $post->link;
                    } else { 
                        $link = get_the_permalink();
                    }


                    if($postType == 'events') {
                        $startDateRaw = get_field('start_date');
                        $endDateRaw = get_field('end_date');

                        if($startDateRaw) {
                            $dateOutput = "l d F Y";
                            $unixtimestamp = strtotime($startDateRaw);
                            $unixtimestampEnd = strtotime($endDateRaw);
                            $startDate = date_i18n($dateOutput, $unixtimestamp);
                            $endDate = date_i18n($dateOutput, $unixtimestampEnd);

                            if($endDateRaw) {
                              $endDateOut = ' &ndash; '.$endDate;
                            } else {
                              $endDateOut = '';
                            }

                        } else {
                            $startDate = '';
                            $endDateOut = '';
                        }
                    }

                    if($postType == 'user') {
                        $teamMemberID = $post->ID;
                        $teamACFid = 'user_'.$teamMemberID;
                        $authorBio = get_field('author_bio', $teamACFid);
                        $shortBio = wp_trim_words($authorBio, 30);                        
                    } else {
                        $shortBio = '';
                    }


                ?>

                <div class="feed-item load-item<?php if($primarySlug == $inthenewsSlug) { echo ' category-in-the-news';}?>" data-max-pages="<?= $maxPages;?>" data-post-id="<?= $post->ID;?>">
                    <a class="feed-link" href="<?= $link;?>" <?php if ($primarySlug == $inthenewsSlug) { echo 'target="_blank"';}?>><?php the_title();?></a>
                    <?php if (has_post_thumbnail()) { ?>
                        <div class="responsive-wrapper">
                            <?php the_post_thumbnail( 'full', array( 'title' => get_the_title().' Thumbnail', 'alt' => get_the_title().' Thumbnail' ) );?>
                        </div>
                    <?php } elseif (get_field('in_the_news_logo')) { ?>
                        <div class="logo-wrapper">
                            <img src="<?= get_field('in_the_news_logo')['url'];?>" alt="<?= get_field('in_the_news_logo')['title'];?>" title="<?= get_field('in_the_news_logo')['title'];?>" />
                        </div>
                    <?php } ?>
                    <div class="feed-item-info row-text-black align-left">
                        <?php 
                            if (($postType == 'post' || $postType == 'news' || $postType == 'resources') && $primaryName) {
                                ?><span class="eyebrow"><?= $primaryName; ?></span><?php
                            }

                            if ($postType == 'user') {
                                ?><span class="eyebrow"><?php _e('People', '_isoc')?></span><?php
                            }

                            if ($postType == 'events' && get_field('location_display')) {
                                ?><span class="eyebrow"><?= get_field('location_display'); ?></span><?php
                            } else if ($postType == 'events') {
                                ?><span class="eyebrow">Event</span><?php
                            } else if ($postType == 'page' && $postParentID) {
                                ?><span class="eyebrow"><?= get_the_title($postParentID); ?></span> <?php
                            }

                            if ($postType == 'events') {
                                ?><span class="eyebrow eyebrow-regular"><?= $startDate.$endDateOut; ?></span><?php
                            } else if ($postType == 'user') {
                            } else if ($postType != 'actions') { 
                                ?><span class="eyebrow eyebrow-regular"><?php the_time('j F Y'); ?></span><?php
                            }
                        ?>
                        <h3 class="headline5"><?php the_title(); ?></h3>
                        <?php
                            if ($primarySlug != $inthenewsSlug) {
                                ?><p class="regular-text"><?= strip_tags( excerpt(20) ); ?></p><?php
                            }

                            if ($postType == 'user') {
                                ?><p class="regular-text"><?= $shortBio; ?></p><?php
                            }

                            // Policy briefs additional info
                            if ($taxSlug == 'policybriefs') {
                                $resources = get_field('resources');
                            
                                if ($resources) {
                                    foreach ($resources as $resource) {
                                        ?>
                                        <a href="<?= $resource['resource_file']['url'];?>" target="_blank" class="text-link policybrief"><?php _e( 'Download', '_isoc' );?> <?= $resource['resource_title'];?></a>
                                        <?php
                                    }
                                }
                                
                                wpml_post_available_in('', $post->ID);
                            }
                        ?>
                        <?php
                            if ($primarySlug == $inthenewsSlug) {
                                ?><span class="eyebrow eyebrow-regular"><a href="<?= get_field('in_the_news_url');?>" target="_blank"><?= get_field('in_the_news_source');?></a></span><?php
                            }
                        ?>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>
        <div class="align-center padding-top-small">
            <?php if ($maxPages > 1) { ?>
                <span class="button component loadMore" data-component-name="LoadMore" id="loadMore"><?php _e( 'Load More', '_isoc' );?></span>
            <?php } ?>
        </div>
    </div>
</section>