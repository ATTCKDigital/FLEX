<?php
/**
 * Template: Single
 * Description: Wordpress template for a single post page. Copy template and rename single-customposttype.php to create different templates for CPTs.
 *
 */
    get_header();

    $categories = get_the_category();
	$categoryID = $categories[0]->cat_ID;
	$postID = get_the_ID();
	if ( post_password_required() ) {
		//password protection
		echo get_the_password_form(); 
	} else {

        if (have_posts()) : while (have_posts()) : the_post();

?>
	<section class="component-row padding-mobile-20 margin-tablet-landscape-bottom-60 margin-tablet-landscape-top-60">
		<div class="component-row-inner pure-g component-row-standard component-alignment-top">
			<?php if(has_post_thumbnail()){ ?>
				<div class="column pure-u-lg-1-1 pure-u-md-1-1 pure-u-sm-1-1 component-theme-default">
					<?php the_post_thumbnail('full');?>
				</div>
			<?php } ?>
			<div class="column pure-u-lg-1-1 pure-u-md-1-1 pure-u-sm-1-1 component-theme-default">
				<div class="component-single component-theme-white padding-mobile-20 padding-tablet-landscape-50 padding-tablet-landscape-left-85 padding-tablet-landscape-right-85">
					<div class="content">
						<header class="single-header margin-mobile-bottom-25 padding-mobile-bottom-20 margin-tablet-landscape-bottom-35 padding-tablet-landscape-bottom-35 component-theme-bottom-border">
							<time class="date"><?php the_date('F j, Y');?></time>
							<h1 class="headline2"><?php the_title();?></h1>
							<cite class="body">by 
								<?php
									if ( function_exists( 'coauthors_posts_links' ) ) {
									    coauthors_posts_links();
									} else {
									    the_author_posts_link();
									}
								?>
							</cite>
							<span class="body"><?php the_tags('Tags: ');?></span>
						</header>
						<div class="body-text">
							<?php the_content();?>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="pure-g component-post-navigation component-row-inner pure-g component-row-standard component-alignment-top">
			<div class="column pure-u-lg-2-12 pure-u-md-2-12 pure-u-sm-12-12">
				<?php 
					$prevPost = get_previous_post(true);
					if($prevPost){
				?>
					<a href="<?= get_permalink( $prevPost->ID ); ?>" class="post-nav-link prev-link">Previous</a>
				<?php } ?>
			</div>
			<div class="column pure-u-lg-8-12 pure-u-md-8-12 mobile-hidden"></div>
			<div class="column pure-u-lg-2-12 pure-u-md-2-12 pure-u-sm-12-12">
				<?php 
					$nextPost = get_next_post(true);
					if($nextPost){
				?>
					<a href="<?= get_permalink( $nextPost->ID ); ?>" class="post-nav-link next-link">Next</a>
				<?php } ?>
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
        wp_reset_query();
?>
	<?php
		echo Utils::render_template("inc/templates/related-posts.php", array(
			"catID" => $categoryID,
			"exclude" => $postID
		));
	?>

<?php
	} //end password
get_footer();
?>
