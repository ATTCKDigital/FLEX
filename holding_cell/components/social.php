<?php
	//Social component
?>

<div class="component component-social component-fade">
	<div class="pure-g">
		<div class="column pure-u-lg-5-12 pure-u-md-5-12 pure-u-sm-12-12">
			<div class="social-inner component-alignment-top component-theme-white padding-mobile-20 padding-tablet-landscape-top-40 padding-tablet-landscape-bottom-40 padding-tablet-landscape-left-85 padding-tablet-landscape-right-85">
				<div class="phones">
					<h5 class="footer-item margin-mobile-bottom-5">Get in touch</h5>
					<?php
						$phoneUS = get_global_option('contact_phone_number', 'options');
						$phoneCA = get_global_option('contact_phone_number_ca', 'options');
						$phoneUK = get_global_option('contact_phone_number_uk', 'options');
					?>
					<span class="phone"><?= $phoneUS;?></span>
					<?php if($phoneCA ){ ?>
						<span class="phone"><?= $phoneCA;?></span>
					<?php } ?>
					<?php if($phoneUK ){ ?>
						<span class="phone"><?= $phoneUK;?></span>
					<?php } ?>
				</div>
				<div class="social">
					<h5 class="footer-item margin-mobile-bottom-5">Follow</h5>
					<div class="social">
						<a href="<?= get_global_option('linkedin_url', 'options');?>" target="_blank" class="margin-mobile-right-5"><i class="fab fa-linkedin-in"></i></a>
						<a href="<?= get_global_option('twitter_url', 'options');?>" target="_blank"><i class="fab fa-twitter"></i></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>