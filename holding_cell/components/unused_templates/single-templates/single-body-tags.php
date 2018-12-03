                        <article>
                            <div class="body-text">
                                <?php the_content();?>
                            </div>
                            <div class="tags">
                                <?php 
                                    // display categories
                                    $currentLanguage = current_language();

                                    if($currentLanguage != "en") {
                                        $currentLanguage = $currentLanguage.'/';
                                    } else {
                                        $currentLanguage = '';
                                    }


                                    $categories = get_the_terms($this->ID, 'category');
                                    if($categories) {
                                        ob_start();                    
                                        foreach ($categories as $category) {
                                            echo '<a href="/'.$currentLanguage.'issues/'.$category->slug.'">'.$category->name.'</a>, ';
                                        }
                                        $output = ob_get_clean();
                                        echo rtrim($output, ', ');
                                    }


                                    //display news type
                                    $terms = get_the_terms($this->ID, 'news_type');
                                    if($terms) {
                                        if($categories) {
                                            echo ', ';
                                        }
                                        ob_start();                    
                                        foreach ($terms as $term) {
                                            echo '<a href="/'.$currentLanguage.'news/'.$term->slug.'">'.$term->name.'</a>, ';
                                        }
                                        $output = ob_get_clean();
                                        echo rtrim($output, ', ');
                                    }

                                    //display regions
                                    $terms = get_the_terms($this->ID, 'region_news_regions');
                                    if($terms) {
                                        echo ', ';
                                        ob_start();                    
                                        foreach ($terms as $term) {
                                            echo '<a href="/'.$currentLanguage.'regions/'.$term->slug.'">'.$term->name.'</a>, ';
                                        }
                                        $output = ob_get_clean();
                                        echo rtrim($output, ', ');
                                    }

                                    //display tags
                                    $tags = get_the_terms($this->ID, 'post_tag');
                                    if($tags) {
                                        echo ', ';
                                        ob_start();                    
                                        foreach ($tags as $tag) {
                                            echo '<a href="/'.$currentLanguage.'tag/'.$tag->slug.'">'.$tag->name.'</a>, ';
                                        }
                                        $output = ob_get_clean();
                                        echo rtrim($output, ', ');
                                    }


                                ?>
                            </div>
                            <?php 
                                if($this->postType == 'resources' || $this->postType == 'news') { 
                                    echo Utils::render_template("inc/templates/resource-download.php");
                                }
                            ?>
                        </article>