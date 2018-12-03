        <!-- single footer -->
        <section class="component component-single-footer">
            <div class="content-wrapper">
                <?php echo Utils::render_template("inc/templates/share.php", array()); ?>
                <p class="sans-serif14 dark-grey-text align-left"><?= get_the_category_list( ', ', '', $this->postID ); ?></p>
            </div>
        </section>
