<?php
	//Desccription component
	$descriptionIcon = $globalRow['description_icon'];
	$descriptionDescription = $globalRow['description'];
	$longDescription = $globalRow['long_description'];
	$relatedContents = $globalRow['related_content'];
?>

<div class="component component-description component-fade">
	<div class="pure-g">
		<div class="column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12">
			<div class="header header-tab header-tab-small">
				<div class="header-tab-inner">
					<h2 class="headline2 color-standard-white"><?= get_the_title($parentID);?></h2>
				</div>
			</div>
		</div>
		<div class="column pure-u-lg-12-12 pure-u-md-12-12 pure-u-sm-12-12 background-white padding-mobile-top-40 padding-mobile-bottom-40">
			<div class="main-content-item pure-g">
				<?php if($descriptionIcon){ ?>
					<div class="column pure-u-lg-1-12 pure-u-md-1-12 mobile-hidden"></div>
					<div class="main-image column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-5-12">
						<h2 class="headline3 color-standard-black margin-mobile-bottom-20 margin-tablet-landscape-bottom-40"><?= get_the_title($ID);?></h2>
						<img src="<?= $descriptionIcon['url'];?>" alt="<?= get_the_title($ID);?>" title="<?= get_the_title($ID);?>" />
					</div>
				<?php } ?>
				<div class="main-content column pure-u-lg-6-12 pure-u-md-6-12 pure-u-sm-7-12">
					<p class="large-body"><?= $descriptionDescription;?></p>
				</div>
				<div class="column pure-u-lg-1-12 pure-u-md-1-12 mobile-hidden"></div>
			</div>
			<?php if($longDescription){ ?>
				<div class="long-content pure-g margin-mobile-top-40">
					<div class="column pure-u-lg-1-12 pure-u-md-1-12 pure-u-sm-1-12"></div>
					<div class="column pure-u-lg-4-12 pure-u-md-4-12 mobile-hidden padding-mobile-top-40 component-theme-top-border"></div>
					<div class="main-content-long column pure-u-lg-5-12 pure-u-md-5-12 pure-u-sm-10-12 padding-mobile-top-40 component-theme-top-border">
						<?= $longDescription;?>
					</div>
					<div class="column pure-u-lg-1-12 pure-u-md-1-12 mobile-hidden padding-mobile-top-40 component-theme-top-border"></div>
				</div>
			<?php } ?>
			<?php if($relatedContents){ ?>
				<div class="long-content pure-g margin-mobile-top-40">
					<div class="column pure-u-lg-1-12 pure-u-md-1-12 mobile-hidden"></div>
					<div class="column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-10-12 padding-mobile-top-40 component-theme-top-border">
						<p class="large-body extended-bold">Related Offers</p>
					</div>
					<div class="main-content-long column pure-u-lg-5-12 pure-u-md-5-12 pure-u-sm-10-12 padding-mobile-top-40 component-theme-top-border">
						<p class="large-body">
							<?php foreach ($relatedContents as $relatedContent) { ?>
								<a href="<?= get_the_permalink($relatedContent);?>"><?= get_the_title($relatedContent);?></a><br />
							<?php } ?>
						</p>
					</div>
					<div class="column pure-u-lg-1-12 pure-u-md-1-12 mobile-hidden padding-mobile-top-40 component-theme-top-border"></div>
				</div>
			<?php } ?>
		</div>
	</div>		
</div>