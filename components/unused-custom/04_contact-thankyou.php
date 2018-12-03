<div class="component-contact-thankyou">
	<section class="component-text fade-me-in faded-in">
		<div class="content-wrapper">
			<div class="component-text-copy fade-me-in faded-in">
				<div class="component-text-header fade-me-in faded-in">
					<h2 class="headline1 align-center fade-me-in faded-in">Contact Us</h2>
				</div>
				<div class="body-text align-center padding-bottom-20-40">
					<p class="fade-me-in faded-in">Thanks for reaching out! We'll be in touch shortly.<br /> 
You can also check out the Silks Building on social media.</p>
				</div>
			</div>	
		</div>
	</section>
	<?php if(get_field('twitter_url', 'options')){?>
		<span class="social-wrapper">
			<a href="<?= get_field('twitter_url', 'options');?>" target="_blank" class="social"><i class="fab fa-twitter"></i></a>
			Twitter		
		</span>
	<?php } ?>
	<?php if(get_field('facebook_url', 'options')){?>
		<span class="social-wrapper">
			<a href="<?= get_field('facebook_url', 'options');?>" target="_blank" class="social"><i class="fab fa-facebook-f"></i></a>
			Facebook
		</span>
	<?php } ?>
	<?php if(get_field('instagram_url', 'options')){?>
		<span class="social-wrapper">
			<a href="<?= get_field('instagram_url', 'options');?>" target="_blank" class="social"><i class="fab fa-instagram"></i></a>
			Instagram
		</span>
	<?php } ?>
	<?php if(get_field('youtube_url', 'options')){?>
		<span class="social-wrapper">
			<a href="<?= get_field('youtube_url', 'options');?>" target="_blank" class="social"><i class="fab fa-youtube"></i></a>
			YouTube
		</span>
	<?php } ?>
</div>