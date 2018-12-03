	<div class="pure-g component-row-inner component-row-standard component-alignment-top">
		<div class="column pure-u-lg-1-12 pure-u-md-1-12 pure-u-sm-12-12">
			<div class="logo-wrapper">
				<a href="/">
					<span><?php bloginfo('name');?></span>
					<?php
						echo Utils::render_template("inc/templates/svg.php", array(
							"id" => "buck-wordmark",
							"classes" => "buck-wordmark",
							"data" => ""
						));
					?>
				</a>
			</div>
		</div>
		<div class="column pure-u-lg-1-12 pure-u-md-1-12 mobile-hidden"></div>
		<div class="column pure-u-lg-2-12 pure-u-md-2-12 pure-u-sm-6-12">
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
		<div class="column pure-u-lg-1-12 pure-u-md-1-12 mobile-hidden"></div>
		<div class="column pure-u-lg-4-12 pure-u-md-4-12 mobile-hidden">
			<h5 class="footer-item margin-mobile-bottom-5">Subscription center</h5>
			<div class="newsletter">
				<a href="/subscription-center" class="button button-white">Join our newsletter</a>
			</div>
		</div>
		<div class="column pure-u-lg-1-12 pure-u-md-1-12 pure-u-sm-2-12"></div>
		<div class="column pure-u-lg-1-12 pure-u-md-1-12 pure-u-sm-4-12">
			<h5 class="footer-item margin-mobile-bottom-5">Follow</h5>
			<div class="social">
				<a href="<?= get_global_option('linkedin_url', 'options');?>" target="_blank" class="margin-mobile-right-5"><i class="fab fa-linkedin-in"></i></a>
				<a href="<?= get_global_option('twitter_url', 'options');?>" target="_blank"><i class="fab fa-twitter"></i></a>
			</div>
		</div>
		<div class="column desktop-hidden tablet-hidden pure-u-sm-12-12 margin-mobile-top-30 padding-mobile-bottom-20">
			<h5 class="footer-item margin-mobile-bottom-5">Subscription center</h5>
			<div class="newsletter">
				<a href="/subscription-center" class="button button-white">Join our newsletter</a>
			</div>
		</div>
	</div>
	<div class="pure-g component-row-inner component-row-standard component-alignment-top padding-mobile-top-20 margin-mobile-top-20 margin-tablet-landscape-top-30 margin-mobile-bottom-20 padding-mobile-bottom-20 component-theme-top-border-white component-theme-bottom-border-white">
		<div class="column pure-u-lg-2-12 pure-u-md-2-12 mobile-hidden"></div>
		<div class="column pure-u-lg-2-12 pure-u-md-2-12 pure-u-sm-12-12">
			<ul class="menu-items footer-menu footer-left">
				<?php
					if (has_nav_menu('primary')) {
						$navArgs = array(
							'theme_location' => 'footer',
							'container' => false,
							'menu_id' => false,
							'echo' => true,
							'fallback_cb' => false,
							'link_before' => '',
							'link_after' => '',
							'items_wrap' => '%3$s',
							'walker' => new Nav_Walker_Nav_Menu,
							'depth' => 0,
						);

						wp_nav_menu($navArgs);
					}
				?>				
			</ul>
		</div>
		<div class="column pure-u-lg-1-12 pure-u-md-1-12 mobile-hidden"></div>
		<div class="column pure-u-lg-6-12 pure-u-md-6-12 pure-u-sm-12-12">
			<ul class="menu-items footer-menu">
				<?php
					if (has_nav_menu('primary')) {
						$navArgs = array(
							'theme_location' => 'footer_secondary',
							'container' => false,
							'menu_id' => false,
							'echo' => true,
							'fallback_cb' => false,
							'link_before' => '',
							'link_after' => '',
							'items_wrap' => '%3$s',
							'walker' => new Nav_Walker_Nav_Menu,
							'depth' => 0,
						);

						wp_nav_menu($navArgs);
					}
				?>				
			</ul>
		</div>
	</div>
	<div class="pure-g component-row-inner component-row-standard component-alignment-top">
		<div class="column pure-u-lg-6-12 pure-u-md-6-12 pure-u-sm-12-12">
			<ul class="menu-items footer-bottom">
				<?php
					if (has_nav_menu('primary')) {
						$navArgs = array(
							'theme_location' => 'footer_tertiary',
							'container' => false,
							'menu_id' => false,
							'echo' => true,
							'fallback_cb' => false,
							'link_before' => '',
							'link_after' => '',
							'items_wrap' => '%3$s',
							'walker' => new Nav_Walker_Nav_Menu,
							'depth' => 0,
						);

						wp_nav_menu($navArgs);
					}
				?>				
			</ul>
		</div>
		<div class="column pure-u-lg-4-12 pure-u-md-4-12 mobile-hidden"></div>
		<div class="column pure-u-lg-2-12 pure-u-md-2-12 pure-u-sm-12-12">
			<span class="footer-copyright">&copy; Buck Global, LLC</span>
		</div>
	</div>