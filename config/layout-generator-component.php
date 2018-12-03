<?php
	// Code for the layout tool. Include this file in the layout loop.
	// sample include: include(get_template_directory() . "/inc/config/layout-generator-component.php");
	// row type
	$contentType = $globalRow['acf_fc_layout'];
	$contentType = str_replace('_component', '', $contentType);


	// Row advanced settings
	$rowId = 		$globalRow['row_id'];
	$rowClasses = 	$globalRow['row_classes'];
	$hideRow = 		$globalRow['hide_row'];
	$paddingAbove = $globalRow['padding_above'];

	if($paddingAbove) {
		$paddingAbove = ' padding-mobile-top-40 padding-tablet-portrait-top-60';
	}

	if ($hideRow == '') :
?>
		<section class="component-row<?php if ($rowClasses) { echo $rowClasses; } ?><?php if ($paddingAbove) { echo $paddingAbove; } ?>"<?php if ($rowId) { echo ' id="' . $rowId . '"'; } ?> data-row-info="<?= $contentType;?>">
         
			<div class="component-row-inner pure-g component-row-standard">
				<?php
					$template = locate_template('inc/components/' . $contentType . '.php');

					if (file_exists($template)) {
						include($template);
					} else {
						echo 'Cannot find template: ' . $contentType;
					}
				?>
			</div>
		</section>
<?php
	endif;
?>
