<?php // Global Footer ?>
<section class="component-row-full component-footer component-row body-padding">
	<div class="flex-grid component-alignment-top component-row-wide padding-global-top-2x padding-global-bottom-2x padding-left-1x padding-right-1x padding-desktop-left-0x padding-desktop-right-0x">
		<div class="flex-12-12 padding-top-10x padding-bottom-2x">
			<a href="/" class="logo-wrapper">
				<?php 
					$customLogoID = get_theme_mod( 'custom_logo' );
					$customLogoURL = wp_get_attachment_image_url( $customLogoID , 'full' );
					$customLogoSRC = wp_get_attachment_image_src( $customLogoID , 'full' );
					// $customLogoSize = wp_getimagesize( $customLogoURL );
				?>
				<img 
					alt="<?= bloginfo('name');?>" 
					class="nav-logo" 
					height="<?= $customLogoSRC[1] ?>"
					src="<?= $customLogoURL;?>" 
					title="<?= bloginfo('name');?>" 
					width="<?= $customLogoSRC[2] ?>"
					/>
			</a>
		</div>
	</div>
	<div class="flex-grid component-alignment-top component-row-wide padding-global-top-2x padding-global-bottom-2x padding-left-1x padding-right-1x padding-desktop-left-0x padding-desktop-right-0x">
		<div class="flex-12-12 padding-bottom-2x padding-tablet-portrait-bottom-0x">
			<?php
				echo Utils::render_template('components/component_footer/footer-nav.php');
			?>
		</div>
	</div>
	<div class="flex-grid component-row-wide padding-global-bottom-2x padding-left-1x padding-right-1x padding-desktop-left-0x padding-desktop-right-0x padding-top-8x">
		<div class="flex-desktop-12-12 flex-tablet-landscape-12-12 flex-tablet-portrait-12-12 flex-12-12">
			<small class="align-left display-block"><?= get_field('footer_copyright', 'options'); ?></small>
		</div>
	</div>
</section>
