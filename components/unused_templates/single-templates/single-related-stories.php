<!-- Related stories for single page -->
<section class="component component-feed layout-vertical">
	<div class="content-wrapper align-center">
		<div class="feed">
			<?php 
				foreach ($this->relatedStories as $relatedStory) {
					$thumbnail = get_the_post_thumbnail_url($relatedStory);
			?>
				<div class="feed-item">
	                <?php if($thumbnail) { ?>
	                    <a href="<?= get_the_permalink($relatedStory);?>" class="feed-link">
	                    	<img src="<?= $thumbnail;?>" title="<?= get_the_title($relatedStory);?>" alt="<?= get_the_title($relatedStory);?>" />
	                    </a>
	                <?php } ?>
					<div class="feed-item-info row-text-black align-left<?php if(!$thumbnail) { echo ' full-width';}?>">
						<h3 class="serif22-upper align-left nocase"><a href="<?= get_the_permalink($relatedStory);?>"><?= get_the_title($relatedStory);?></a></h3>
						<span class="sans-serif12 align-left location"><?= get_field('location', $relatedStory);?></span>
						<div class="paragraph_serif border-top-left">
							<p><?= strip_tags( get_the_excerpt($relatedStory) ); ?></p>
						</div>
					</div>
				</div>
			<?php } ?>
		</div>
		<div class="ctas align-left">
			<a href="/our-stories" class="button">See more stories</a>

		</div>
	</div>
</section>