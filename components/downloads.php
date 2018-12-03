<?php
	//Downloads component
	$header = $globalRow['header'];
	$downloads = $globalRow['downloads'];
?>

<div class="component component-downloads" data-component-name="Downloads">
	<div class="component-fade">
		<div class="pure-g">
			<div class="column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12">
				<div class="header header-tab header-tab-small">
					<div class="header-tab-inner">
						<h2 class="headline2 color-standard-white"><?= $header;?></h2>
					</div>
				</div>
			</div>
		</div>		
		<div class="pure-g">
			<?php 
				foreach ($downloads as $download) { 
					$plainLink = $download['link'];
					$leadPage = $download['lead_page'];
					$leadCapture = $download['capture_lead'];
					$title = $download['download_title'];
			?>
				<div class="download column column pure-u-lg-6-12 pure-u-md-6-12 pure-u-sm-12-12">
					<div class="download-inner background-white padding-mobile-20 padding-tablet-landscape-right-25 padding-tablet-landscape-left-25 <?php if($leadCapture) { echo ' openPDF';}?>" data-download-title="<?= $title;?>">
						<h3 class="headline3">
							<?php if($plainLink) { ?>
								<a href="<?= $plainLink;?>" target="_blank">
							<?php } ?>
							<?php if($leadPage) { ?>
								<a href="<?= $leadPage;?>" target="_blank">
							<?php } ?>
								<?= $title;?>
							<?php if($plainLink || $leadPage) { ?></a><?php } ?>
						</h3>
						<?php if($download['pdf']) { ?>

							<?php if($leadCapture){ ?>
								<span data-pdf="<?= $download['pdf'];?>" class="pdf" id="pdf-<?= rand();?>">Download</span>
							<?php } else { ?>
								<a href="<?= $download['pdf'];?>" data-pdf="<?= $download['pdf'];?>" class="pdf" target="_blank">Download</a>
							<?php } ?>
						<?php } ?>
						<?php if($plainLink) { ?>
							<a href="<?= $plainLink;?>" class="arrow-link headline2" title="<?= $title;?>" alt="<?= $title;?>" target="_blank">&#x2192;</a>
						<?php } ?>

						<?php if($leadPage) { ?>
							<a href="<?= $leadPage;?>" class="pdf" title="<?= $title;?>" alt="<?= $title;?>" target="_blank">Download</a>
						<?php } ?>
					</div>
				</div>
			<?php } ?>
		</div>	
	</div>
	<div class="form-popup">
		<div class="form-popup-inner">
			<mark class="close closeForm"></mark>
			<p class="gate-message">To view content, please fill out the following form.</p>
			<div class="hubspot-form">
				
			</div>
			<p class="complete-message"></p>
		</div>
	</div>
</div>