<?php
	//Contact component
	$header = $globalRow['contact_form_header'];
	$form = $globalRow['contact_form'];
	$formID = $globalRow['contact_formId'];
	$showTab = $globalRow['show_tab'];
	$showRecruitment = $globalRow['show_recruitment'];
	$recruitmentText = $globalRow['recruitment_message'];

	if(is_page('contact')) {

	}
?>

<div class="component component-contact component-fade" data-component-name="Contact">
	<div class="pure-g<?php if($showRecruitment){ echo ' component-alignment-bottom';}?>">
		<?php if(!$showTab){ ?>
			<div class="column pure-u-lg-2-12 pure-u-md-2-12 pure-u-sm-12-12">
				<div class="header header-tab header-tab-small">
					<div class="header-tab-inner">
						<h2 class="headline2 color-standard-white">Contact</h2>
					</div>
				</div>
			</div>
			<div class="column pure-u-lg-10-12 pure-u-md-10-12 mobile-hidden"></div>
			<div class="column pure-u-lg-2-12 pure-u-md-2-12 mobile-hidden"></div>
		<?php } ?>
		<?php if(is_page('contact')) { ?>
			<?php if($showRecruitment){ ?>
				<div class="column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12">
					<div class="message">
						<a href="/jobs"></a>
						<?= $recruitmentText;?>
					</div>
				</div>
				<div class="column pure-u-lg-1-12 pure-u-md-1-12 mobile-hidden"></div>
			<?php } ?>
			<div class="column pure-u-lg-7-12 pure-u-md-7-12 pure-u-sm-12-12">
				<div class="contact-form-wrapper background-white padding-mobile-30 padding-mobile-left-20 padding-mobile-right-20 padding-tablet-landscape-left-85 padding-tablet-landscape-right-85 padding-tablet-landscape-top-40 padding-tablet-landscape-bottom-40">
					<h3 class="headline3 margin-mobile-bottom-20 contact-message"><?= $header;?></h3>
					<div class="contact-form" data-portal-id="<?= $form;?>" data-form-id="<?= $formID;?>">
					</div>
				</div>
			</div>

		<?php } else { ?>
			<div class="column pure-u-lg-7-12 pure-u-md-7-12 pure-u-sm-12-12">
				<div class="contact-form-wrapper background-white padding-mobile-30 padding-mobile-left-20 padding-mobile-right-20 padding-tablet-landscape-left-85 padding-tablet-landscape-right-85 padding-tablet-landscape-top-40 padding-tablet-landscape-bottom-40">
					<h3 class="headline3 margin-mobile-bottom-20 contact-message"><?= $header;?></h3>
					<div class="contact-form" data-portal-id="<?= $form;?>" data-form-id="<?= $formID;?>">
					</div>
				</div>
			</div>

			<?php if($showRecruitment){ ?>
				<div class="column pure-u-lg-1-12 pure-u-md-1-12 mobile-hidden"></div>
				<div class="column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12">
					<div class="message">
						<a href="/jobs"></a>
						<?= $recruitmentText;?>
					</div>
				</div>
			<?php } ?>
		<?php } ?>
	</div>
</div>