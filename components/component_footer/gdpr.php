<?php //GDPR Pop-up ?>

<div class="component component-gdpr hideGDPR" data-component-name="GDPR">
	<div class="component-row-full">
		<div class="pure-g component-alignment-center">
			<div class="flex-g-xl-2-12 flex-g-lg-2-12 flex-g-md-0-12 flex-g-sm-0-12"></div>
			<div class="flex-g-xl-8-12 flex-g-lg-8-12 flex-g-md-12-12 flex-g-sm-12-12">
				<div class="gdpr-message body-text padding-top-5x padding-bottom-5x padding-tablet-portrait-top-10x padding-tablet-portrait-bottom-10x padding-left-5x padding-right-5x">
					<?= get_field('gdpr_message', 'options');?>
					<span class="cta gdprAgree">Close and accept</span>
				</div>
			</div>
		</div>
	</div>
</div>