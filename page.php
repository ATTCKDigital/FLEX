<?php
/**
 * Template: Default
 * Description: Wordpress template for a plain page.
 *
 */
    get_header();

        if (have_posts()) : while (have_posts()) : the_post();

?>
	<section class="component-row margin-mobile-top-40 margin-tablet-landscape-top-60 margin-mobile-bottom-40 margin-tablet-landscape-bottom-60 padding-mobile-left-20 padding-mobile-right-20 padding-tablet-landscape-left-0 padding-tablet-landscape-right-0">
		<div class="component-row-inner component-row-standard">
			<div class="pure-g">
				<div class="column pure-u-lg-12-12 pure-u-md-12-12 pure-u-sm-12-12 ">
					<div class="header header-tab header-tab-small ">
						<div class="header-tab-inner header-tab-no-fill">
							<h2 class="headline2 color-standard-white"><?php the_title();?></h2>
						</div>
					</div>
				</div>
			</div>
			<div class="pure-g">
				<div class="column pure-u-lg-12-12 pure-u-md-12-12 pure-u-sm-12-12">
					<div class="component-theme-white component-single padding-mobile-20 padding-tablet-landscape-50">
						<div class="body-text">
							<?php the_content();?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>


<?php


        endwhile; // endwhile default loop
        else:
?>
        <p>Sorry, no pages matched your criteria.</p>
<?php
        endif; // endif default loop
get_footer();
?>
