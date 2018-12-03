<section class="component-row component-theme-default <?= $this->isLast;?> padding-top row-text-black" data-logo-color="row-text-black" style="">
    <div class="component-row-inner pure-g component-row-standard component-alignment-top <?= $this->border;?>">
        <div class="column pure-u-lg-1-12 pure-u-md-1-12 pure-u-sm-1-1 component-theme-default"></div>
        <div class="column pure-u-lg-10-12 pure-u-md-10-12 pure-u-sm-1-1 component-theme-default">
            <!-- News Feed component -->
            <section class="component component-news-feed">
                <div class="content-wrapper align-center">
                    <h2 class="sans-serif33 border-top-center padding-bottom-small">
                        <?php 
                            $termObject = get_term_by( 'term_id', $this->newsType, 'news_type');

                            echo $termObject->name;
                        ?>
                    </h2>
                    <?php
                        $args = array(
                            'post_type' => 'news',
                            'posts_per_page' => $this->postsPerPage,
                            'tax_query'       => array(
                              array(
                                'taxonomy' => 'news_type',
                                'field'    => 'term_id',
                                'terms'    => $this->newsType,
                              ),
                            ),
                        );
                        $newsPosts = get_posts($args);
                    ?>
                    <div class="news-items">
                        <?php
                            $termSlug = $termObject->slug;
                            if($newsPosts) {
                                foreach ($newsPosts as $newsPost) {
                                    $newsID = $newsPost->ID;
                                    if($termSlug == 'in-the-news') {
                                        $link = get_field('news_link', $newsID);
                                        $target = ' target="_blank"';
                                    } else {
                                        $link = get_the_permalink($newsID);
                                        $target = '';
                                    }
                        ?>
                                    <div class="news-item align-left">
                                        <time class="uppercase sans-serif14 black-alt-text"><?= get_the_time('F j, Y', $newsID);?></time>
                                        <h2 class="serif22-upper align-left nocase"><a href="<?= $link;?>" <?= $target;?>><?= get_the_title($newsID);?></a></h2>
                                        <?php if($termSlug == 'in-the-news') { ?>
                                            <a class="italic14" href="<?= $link;?>" <?= $target;?>><?= get_field('news_source', $newsID);?></a>
                                        <?php } ?>
                                    </div>
                        <?php       
                                } //end foreach
                            } //end if news type
                            wp_reset_postdata();
                        ?>
                    </div>
                </div>
                <div class="ctas align-center">
                    <?php if($termSlug == 'in-the-news' && !is_tax('news_type','in-the-news')) { ?>
                        <a href="/press/<?= $termSlug;?>" class="button">Show Older Posts</a>
                    <?php } ?>

                    <?php if($termSlug == 'press-releases' && !is_single()) { ?>
                        <a href="/news-alerts" class="button">Sign up for media alerts</a>
                    <?php } ?>


                    <?php if(is_single()) { ?>
                        <a href="/press" class="button">See all press</a>
                    <?php } ?>
                </div>
            </section>
        </div>
    </div>
</section>