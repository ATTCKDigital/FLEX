<?php
/**
 * Template: Single
 * Description: Wordpress template for a plain page
 *
 */
    get_header();

        if (have_posts()) : while (have_posts()) : the_post();

?>
	<section class="component-row margin-mobile-bottom-40 
margin-mobile-top-40 margin-tablet-landscape-bottom-60 margin-tablet-landscape-top-60">
		<div class="component-row-inner pure-g component-row-standard component-alignment-top">
			<?php if(has_post_thumbnail()){ ?>
				<div class="column pure-u-lg-1-1 pure-u-md-1-1 pure-u-sm-1-1 component-theme-default">
					<?php the_post_thumbnail();?>
				</div>
			<?php } ?>
			<div class="column pure-u-lg-1-1 pure-u-md-1-1 pure-u-sm-1-1 component-theme-default">
				<div class="component-single component-theme-white padding-mobile-20 padding-tablet-landscape-50 padding-tablet-landscape-left-85 padding-tablet-landscape-right-85">
					<div class="content">
						<header class="single-header margin-mobile-bottom-25 padding-mobile-bottom-20 margin-tablet-landscape-bottom-35 padding-tablet-landscape-bottom-25 component-theme-bottom-border">
							<time class="date"><?php the_date('F j, Y');?></time>
							<h1 class="headline2"><?php the_title();?></h1>
							<?php if(get_field('location')){ ?><span class="body"><?= get_field('location');?></span><?php } ?>
						</header>
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
