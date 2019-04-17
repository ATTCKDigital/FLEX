<?php // Global Footer ?>

<section class="component-row-full component-footer component-row">
	<div class="pure-g component-alignment-top component-row-wide padding-global-top-2x padding-global-bottom-2x padding-left-1x padding-right-1x padding-desktop-left-0x padding-desktop-right-0x">
		<div class="flex-g-xl-3-12 flex-g-lg-3-12 flex-g-md-3-12 flex-g-sm-12-12 padding-bottom-2x padding-tablet-portrait-bottom-0x">
			<?php
				echo Utils::render_template('components/component_footer/footer-nav.php');
			?>
		</div>
		<div class="flex-g-xl-1-12 flex-g-lg-1-12 flex-g-md-1-12 flex-g-sm-0-12"></div>
		<div class="flex-g-xl-3-12 flex-g-lg-3-12 flex-g-md-3-12 flex-g-sm-12-12 padding-bottom-2x padding-tablet-portrait-bottom-0x">
			<?php
				//To make this into a share component, change componentType value to "share"
				echo Utils::render_template('components/component_footer/footer-contact.php', array(
					'displayTitle'	=> 'Contact us:'
				));
			?>			
		</div>
		<div class="flex-g-xl-1-12 flex-g-lg-1-12 flex-g-md-1-12 flex-g-sm-0-12"></div>
		<div class="flex-g-xl-4-12 flex-g-lg-4-12 flex-g-md-4-12 flex-g-sm-12-12">
			<?php
				//To make this into a share component, change componentType value to "share"
				echo Utils::render_template('components/component_social-media/social-media.php', array(
					"iconStyle" 	=> '',
					"displayTitle"		=> 'Follow us:',
					"displayTitleClass" => 'subheadline2 color-text-white ',
					"alignment"			=> 'align-left',
					"colorClass"		=> 'color-background-secondary'
				));
			?>
		</div>
	</div>
	<div class="pure-g component-row-wide padding-global-bottom-2x padding-left-1x padding-right-1x padding-desktop-left-0x padding-desktop-right-0x">
		<div class="flex-g-xl-12-12 flex-g-lg-12-12 flex-g-md-12-12 flex-g-sm-12-12">
			<small class="align-center display-block"><?= get_field('footer_copyright', 'options');?></small>
		</div>
	</div>
</section>