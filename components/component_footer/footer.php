<?php // Global Footer ?>

<section class="component-row-full component-footer component-row">
	<div class="flex-grid component-alignment-top component-row-wide padding-global-top-2x padding-global-bottom-2x padding-left-1x padding-right-1x padding-desktop-left-0x padding-desktop-right-0x">
		<div class="flex-desktop-3-12 flex-tablet-landscape-3-12 flex-tablet-portrait-3-12 flex-12-12 padding-bottom-2x padding-tablet-portrait-bottom-0x">
			<?php
				echo Utils::render_template('components/component_footer/footer-nav.php');
			?>
		</div>
		<div class="flex-desktop-1-12 flex-tablet-landscape-1-12 flex-tablet-portrait-1-12 flex-0-12"></div>
		<div class="flex-desktop-3-12 flex-tablet-landscape-3-12 flex-tablet-portrait-3-12 flex-12-12 padding-bottom-2x padding-tablet-portrait-bottom-0x">
			<?php
				//To make this into a share component, change componentType value to "share"
				echo Utils::render_template('components/component_footer/footer-contact.php', array(
					'displayTitle'	=> 'Contact us:'
				));
			?>			
		</div>
		<div class="flex-desktop-1-12 flex-tablet-landscape-1-12 flex-tablet-portrait-1-12 flex-0-12"></div>
		<div class="flex-desktop-4-12 flex-tablet-landscape-4-12 flex-tablet-portrait-4-12 flex-12-12">
			<?php
				//To make this into a share component, change componentType value to "share"
				echo Utils::render_template('components/component_social-media/social-media.php', array(
					"iconStyle" 	=> '',
					"displayTitle"		=> 'Follow us:',
					"displayTitleClass" => 'subheadline2 color-default-white ',
					"alignment"			=> 'align-left',
					"colorClass"		=> 'color-default-white'
				));
			?>
		</div>
	</div>
	<div class="flex-grid component-row-wide padding-global-bottom-2x padding-left-1x padding-right-1x padding-desktop-left-0x padding-desktop-right-0x">
		<div class="flex-desktop-12-12 flex-tablet-landscape-12-12 flex-tablet-portrait-12-12 flex-12-12">
			<small class="align-center display-block"><?= get_field('footer_copyright', 'options');?></small>
		</div>
	</div>
</section>