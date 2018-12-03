<!-- Form component -->
<?php $form = $globalColumn['form']; ?>
<section class="component component-form">
	<h1 class="sans-serif78"><?php echo get_the_title() ?></h1>
	<div class="content-wrapper">
		<?php echo do_shortcode('[contact-form-7 id="' . $form . '" title="Contact"]'); ?>
		<div class="contact-fail">
			<?php echo wpcf7_get_message('mail_sent_ng') ?>
		</div>
		<div class="contact-thankyou">
			<h2 class="contact-thankyou-title">Thank You</h2>
			<div class="contact-thankyou-message">
				<?php echo wpcf7_get_message('mail_sent_ok') ?>
			</div>
			<div class="contact-thankyou-back-to-home">
				<a href="/">Back to Home</a>
			</div>
		</div>
	</div>
</section>
