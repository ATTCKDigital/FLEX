<?php 
	//Author page 

	$author = get_queried_object();
	$authorID = $author->ID;
	$headshot = get_field('headshot', 'user_'.$authorID);
	$authorName = get_the_author_meta('display_name', $authorID);
	$authorTitle = get_field('title', 'user_'.$authorID);
	$authorBio = get_field('bio', 'user_'.$authorID);
	$socialTitle = $authorName.', '.$authorTitle;
?>

<article role="article" class="component-row padding-top-5x padding-bottom-7x">
	<div class="flex-grid component-row-wide component-alignment-top">
		<div class="column flex-tablet-landscape-2-12 flex-tablet-portrait-2-12 flex-0-12"></div>
		<div class="column flex-tablet-landscape-8-12 flex-tablet-portrait-8-12 flex-12-12">
			<div class="component-post-body">
				<header class="single-header margin-bottom-3x">
					<span class="caption2 color-text-brown uppercase display-block margin-bottom-2x align-center"><?php _e( 'Team', '_flexlayout' );?></span>
					<h1 class="headline4 color-text-primary align-center margin-bottom-2x"><?= $authorName;?></h1>
					<span class="caption1 color-text-body uppercase display-block align-center"><?= $authorTitle;?></span>
				</header>
			</div>
		</div>
	</div>
	<?php if($headshot){ ?>
		<div class="flex-grid component-row-wide component-alignment-top">
			<div class="column flex-tablet-landscape-3-12 flex-tablet-portrait-3-12 flex-12-12"></div>
			<div class="column flex-tablet-landscape-6-12 flex-tablet-portrait-6-12 flex-12-12">
				<div class="component-post-body">
						<div class="margin-bottom-3x">
							<img src="<?= $headshot;?>" alt="<?= $authorName;?>" title="<?= $authorName;?>" />
						</div>
				</div>
			</div>
		</div>	
	<?php } ?>
	<div class="flex-grid component-row-wide component-alignment-top">
		<div class="column flex-tablet-landscape-2-12 flex-tablet-portrait-1-12 flex-0-12"></div>
		<div class="column flex-tablet-landscape-8-12 flex-tablet-portrait-10-12 flex-12-12">
			<div class="component-post-body">
				<div class="body-text margin-bottom-3x">
					<?= $authorBio;?>
				</div>
				<div class="tags margin-bottom-3x">
					<span class="caption2 color-text-primary uppercase display-block"><?php the_tags('', ', ', ''); ?></span>
				</div>
				<?php
					echo Utils::render_template('components/component_share/share.php', array(
						"displayTitle" 	=> 'Share',
						"socialTitle" 	=> $socialTitle,
						"url" 			=> get_author_posts_url($authorID)
					));
				?>
			</div>
		</div>
	</div>
</article>