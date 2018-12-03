<!-- Partner list component -->
<section class="component component-partner-list fade-me-in faded-in" data-component-name="QBOBSPartnerList">
	<?php
		$partnerHeadline = $globalColumn['partner_headline'];
		$partnerSubhead = $globalColumn['partner_subhead'];
	?>
	<?php if ($partnerHeadline or $partnerSubhead) { ?>
		<div class="component-text-header fade-me-in">
			<?php if($partnerHeadline) { ?>
				<h2 class="sans-serif20"><?= $partnerHeadline; ?></h2>
			<?php } ?>
			<?php if($partnerSubhead) { ?>
				<h3 class="sans-serif12 text-subhead"><?= $partnerSubhead; ?></h3>
			<?php } ?>
		</div>
	<?php } ?>

<!-- Create a partner list variable -->
<?php $partnerListItems = $globalColumn['partner_list_items']; ?>

<!-- Check to see if there are any items in the partner list -->
	<?php if ($partnerListItems) { ?>
		<div class="component-text-copy qb-obs-partner-list fade-me-in">
				<?php foreach ($partnerListItems as $partnerListItem) {
					$partnerName = $partnerListItem['partner_name'];
					$partnerWebsite = $partnerListItem['partner_website'];
					$partnerRole = $partnerListItem['partner_role'];
				?>
				<?php if($partnerName) { ?>
					<?php if($partnerWebsite) { ?>
						<h2 class="sans-serif20">
			        		<a href="<?= $partnerWebsite; ?>"><?= $partnerName; ?></a>
			        	</h2>
			        <?php } else { ?>
						<h2 class="sans-serif20">
			        		<?= $partnerName; ?>
			        	</h2>
			        <?php } ?>
				<?php } ?>

				<?php if($partnerRole) { ?>
				        	<p class="sans-serif12 partner-role">
				        		<?= $partnerRole; ?>
				        	</p>
				 <?php } ?>
			<?php } ?>
		</div>
	<?php } ?>
</section>
