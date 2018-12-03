<?php
	//Large Text component
	$text = $globalRow['text'];
	$textPosition = $globalRow['text_position'];
	$theme = $globalRow['text_box_background_color'];
	$columnNo = $globalRow['width'];
	$columnNo = intval($columnNo);
	$i = 12;

	if($theme == 'black') {
		$theme = 'component-theme-'.$theme;
	} else if($theme != 'black') {
		$theme = 'component-theme-'.$theme.'-horiz';
	} else {
		$theme = 'component-theme-black';
	}

	if($columnNo) {
		$columns = 'pure-u-lg-'.$columnNo.'-12 pure-u-md-'.$columnNo.'-12 pure-u-sm-12-12';
		$padding = 'padding-mobile-20 padding-mobile-top-40 padding-mobile-bottom-40 padding-tablet-landscape-40';

		if($textPosition == 'right') {
			$headline = 'headline1 headline1-small';
			$offset = $i - $columnNo;
			$columnOffset = 'pure-u-lg-'.$offset.'-12 pure-u-md-'.$offset.'-12 mobile-hidden';			

		} else {
			$columnOffset = 'desktop-hidden tablet-hidden mobile-hidden';
			$headline = 'headline2';
		}

	} else {
		//fall back case for older pages that did not have width option
		if($textPosition == 'right') {
			$columns = 'pure-u-lg-8-12 pure-u-md-8-12 pure-u-sm-12-12';
			$columnOffset = 'pure-u-lg-4-12 pure-u-md-4-12 mobile-hidden';
			$padding = 'padding-mobile-20 padding-mobile-top-40 padding-mobile-bottom-40 padding-tablet-landscape-60 padding-tablet-landscape-top-40 padding-tablet-landscape-bottom-40';
			$headline = 'headline1 headline1-small';
		} else {
			$columns = 'pure-u-lg-7-12 pure-u-md-7-12 pure-u-sm-12-12';
			$columnOffset = 'desktop-hidden tablet-hidden mobile-hidden';
			$padding = 'padding-mobile-20 padding-mobile-top-40 padding-mobile-bottom-40 padding-tablet-landscape-60 padding-tablet-landscape-top-40 padding-tablet-landscape-bottom-40';
			$headline = 'headline2';
		}
	}

?>

<div class="component component-large-text component-fade">
	<div class="pure-g">
		<div class="column <?= $columnOffset;?>"></div>
		<div class="column <?= $columns;?> <?= $padding;?> <?= $theme;?>">
			<div class="text">
				<h2 class="<?= $headline;?> color-standard-white"><?= $text;?></h2>
			</div>
		</div>
	</div>
</div>