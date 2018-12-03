<?php 
	//Staff Component

	$header = $globalRow['header'];
	$staffMembers = $globalRow['staff_members'];
	
?>
<div class="component component-staff" data-component-name="Staff">
	<div class="component-fade">
		<div class="pure-g">
			<div class="column pure-u-lg-3-12 pure-u-md-3-12 pure-u-sm-12-12">
				<div class="header header-tab header-tab-small">
					<div class="header-tab-inner">
						<h2 class="headline2 color-standard-white"><?= $header;?></h2>
					</div>
				</div>
			</div>
		</div>
		<div class="pure-g">
			<div class="column pure-u-lg-3-12 pure-u-md-3-12 mobile-hidden"></div>
			<div class="column pure-u-lg-9-12 pure-u-md-9-12 pure-u-sm-12-12">
				<?php if($staffMembers){ ?>
					<div class="staff-members pure-g">
						<?php 
							$i = 0;
							foreach ($staffMembers as $staffMember) {
								$i++;
								$staffName = get_the_author_meta('display_name', $staffMember);

								$staffTitle = get_field('staff_title', 'user_'.$staffMember);
								$staffImage = get_field('staff_headshot', 'user_'.$staffMember)['url'];
								$staffLinkedIn = get_field('linkedin_url', 'user_'.$staffMember);
								$staffEmail = get_field('staff_email', 'user_'.$staffMember);
								$staffBio = get_field('short_bio', 'user_'.$staffMember);
								$staffLongBio = get_field('long_bio', 'user_'.$staffMember);

						?>	
							<div class="staff-content-item column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-6-12" data-staff="staff-<?= $i;?>">
								<div class="staff-content-item-inner background-black">
									<?php if($staffImage){ ?>
										<div class="staff-image">
											<img src="<?= $staffImage;?>" alt="<?= $staffName;?>" title="<?= $staffName;?>" />
										</div>
									<?php } ?>
									<div class="staff-content">
										<h2 class="body color-standard-white margin-mobile-bottom-0"><strong><?= $staffName;?></strong></h2>
										<p class="color-standard-white"><?= $staffTitle;?></p>
									</div>
								</div>
							</div>
						<?php } ?>
					</div>
				<?php } ?>
			</div>
		</div>
	</div>
	<?php 
		$i = 0;
		foreach ($staffMembers as $staffMember) {
			$i++;
			$staffName = get_the_author_meta('display_name', $staffMember);

			$staffTitle = get_field('staff_title', 'user_'.$staffMember);
			$staffImage = get_field('staff_headshot', 'user_'.$staffMember)['url'];
			$staffLinkedIn = get_field('linkedin_url', 'user_'.$staffMember);
			$staffEmail = get_field('staff_email', 'user_'.$staffMember);
			$staffBio = get_field('short_bio', 'user_'.$staffMember);
			$staffLongBio = get_field('long_bio', 'user_'.$staffMember);

	?>	
		<div class="staff-popup" data-staff="staff-<?= $i;?>">
			<div class="staff-popup-inner">
				<mark class="close closeStaff"></mark>
				<div class="staff-image">
					<img src="<?= $staffImage;?>" alt="<?= $staffName;?>" title="<?= $staffName;?>" />
				</div>
				<div class="staff-content">
					<h2 class="large-body margin-mobile-bottom-5"><strong><?= $staffName;?></strong></h2>
					<p class="staff-title"><?= $staffTitle;?></p>
					<div class="staff-bio">
						<p><?= $staffBio;?></p>
					</div>
					<?php if($staffEmail){ ?>
						<a class="button margin-mobile-right-10" href="mailto:<?= antispambot($staffEmail);?>" target="_blank">Email</a>
					<?php } ?>
					<?php if($staffLinkedIn){ ?>
						<a class="button" href="<?= $staffLinkedIn;?>" target="_blank">LinkedIn</a>
					<?php } ?>
					<div class="staff-bio-long padding-mobile-top-20 margin-mobile-top-20 component-theme-top-border">
						<?= $staffLongBio;?>
					</div>
				</div>
			</div>
		</div>
	<?php } ?>
</div>


