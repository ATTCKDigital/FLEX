<?php
	// Code for the layout tool. Include this file in the layout loop.
	// sample include: include(get_template_directory() . "/inc/config/layout-generator.php");
	// row type
	$rowType = $globalRow['row_type']['value'];

	// Theme settings
	$theme = $globalRow['theme'];

	if ($theme == 'custom') {
		$themeColor = $globalRow['custom_theme'];
	} else {
		$themeColor = 'component-theme-' . $theme;
	}

	// Row text color
	$rowTextColor = $globalRow['row_text_color'];

	if ($rowTextColor == 'white') {
		$rowTextColor = 'row-text-white';
	} else {
		$rowTextColor = 'row-text-black';
	}

	// Background image settings
	$rowBackground = 			$globalRow['row_background_image']['url'];
	$rowBackgroundRepeat = 		$globalRow['row_background_image_repeat'];
	$rowBackgroundSize = 		$globalRow['row_background_image_size'];
	$rowBackgroundSizeCustom = 	$globalRow['row_background_custom_image_size'];
	$rowBackgroundPosition = 	$globalRow['row_background_image_position'];
	$rowBackgroundColor = 		$globalRow['row_background_color'];
	$rowBackgroundGradient = 	$globalRow['row_background_gradient'];
	$rowHeight = 				$globalRow['row-height'];

	if ($theme == 'background') {
		// Only expose background settings if the theme is set to "background" -- prevents having to remove image and resave before changing theme in wp-admin
		$rowBackgroundColor = ' background-color:' . $rowBackgroundColor;
		$rowBackground = ' background-image:url(' . $rowBackground . ');';

		if ($rowBackgroundRepeat) {
			$rowBackgroundRepeat = ' background-repeat:' . $rowBackgroundRepeat . ';';
		} else {
			$rowBackgroundRepeat = '';
		}

		if ($rowBackgroundSize != 'custom') {
			$rowBackgroundSize = ' background-size:' . $rowBackgroundSize . ';';
		} elseif ($rowBackgroundSize == 'custom') {
			$rowBackgroundSize = ' background-size:' . $rowBackgroundSizeCustom . ';';
		} else {
			$rowBackgroundSize = '';
		}

		if ($rowBackgroundPosition) {
			$rowBackgroundPosition = ' background-position:' . $rowBackgroundPosition . ';';
		} else {
			$rowBackgroundPosition = '';
		}
	} else {
		$rowBackgroundColor = '';
		$rowBackground = '';
		$rowBackgroundRepeat = '';
		$rowBackgroundSize = '';
		$rowBackgroundPosition = '';
	}

	// Vertical column alignment
	$verticalAlign = $globalRow['row_content_vertical_alignment'];

	// Vertical padding
	$rowPaddings = $globalRow['row_padding'];


	if ($rowPaddings == '') {
		$paddingType = '';
	} else {
		$paddingType = '';
		foreach ($rowPaddings as $rowPadding) {
			$paddingType .= ' padding-'.$rowPadding;
		}
	}

	// Mobile column order
	$rowOrderMobileClass = '';
	$rowOrderMobile = $globalRow['row_content_column_order'];

	if ($rowOrderMobile) {
		if ($rowOrderMobile[0] == 'reverse') {
			$rowOrderMobileClass = ' row-reverse-mobile';
		}
	}


	// Row advanced settings
	$rowId = 		$globalRow['row_id'];
	$rowClasses = 	$globalRow['row_classes'];
	$showScroller = $globalRow['show_scroller'];
	$scrollerID = 	$globalRow['scroller_id'];
	$hideRow = 		$globalRow['hide_row'];

	// For home hero - get variables from the hero post
	if (is_front_page() && $rowNumber == 0) {
		$args = array(
			'post_type' => array('home_heroes'),
			'numberposts' => 1,
			'orderby' => 'date',
			'order' => 'DESC',
			'suppress_filters' => 0,
		);

		wp_reset_postdata();
	}

	if ($hideRow == '') :
		?>
		<section
			data-logo-color="<?= $rowTextColor;?>"
			class="component-row <?= $themeColor;?> <?= $paddingType;?> <?= $rowTextColor;?> <?php if ($rowClasses) { echo $rowClasses; } ?> <?php if ($rowHeight) { echo $rowHeight; } ?>"<?php if ($rowId) { echo ' id="' . $rowId . '"'; } ?>
			style="<?php if ($theme == 'custom') { echo 'background-color:' . $themeColor . ';'; } echo $rowBackground . $rowBackgroundRepeat . $rowBackgroundSize . $rowBackgroundPosition . $rowBackgroundColor; ?>">

            <?php
				/**
				 * Circles to be animated with the parallax effect.
				 */
				if ($themeColor === 'component-theme-purple') {
					?>
					<div class="turntable-container">
						<!-- <img
							class="component component-turntables"
							src="<?= get_template_directory_uri() ?>/dist/images/circles.svg"
							alt="Circles in the background"
							data-component-name="Turntables"> -->
						<?php
							echo Utils::render_template("inc/templates/svg.php", array(
								"classes" => "component component-turntables",
								"data" => "data-component-name='Turntables'",
								"id" => "circles"
							));
						?>
					</div>
					<?php
				}

				if ($rowBackgroundGradient) {
					?>
					<div class="background-gradient"></div>
					<?php
				}

				if ($showScroller) {
					?>
					<div class="component scroller"<?php if ($scrollerID) { echo ' data-scroller-id="'.$scrollerID.'"'; } ?> data-component-name="Scroller">
						<?php
							echo Utils::render_template("inc/templates/svg.php", array(
								"id" => "icon-scroller",
								"classes" => "mn-icon icon-scroller"
							));
						?>
					</div>
					<?php
				}
			?>
			<div class="component-row-inner pure-g<?php if ($rowType == 'standard') { echo ' component-row-standard';}?> component-alignment-<?= $verticalAlign;?> <?= $rowOrderMobileClass; ?>">
				<?php
					// Begin columns
					$globalColumns = $globalRow['column'];

					if ($globalColumns) :
						foreach ($globalColumns as $globalColumn) :
							// Column additional classes and IDs
							$columnId = $globalColumn['column_id'];
							$columnClasses = $globalColumn['column_classes'];

							// Toggle column display
							$hideColumn = $globalColumn['hide_column'];

							// Theme settings
							$theme = $globalColumn['theme'];

							if ($theme == 'custom') {
								$themeColor = $globalColumn['custom_theme'];
							} else {
								$themeColor = ' component-theme-' . $theme;
							}

							// Column width map
							$columnNumber = $globalColumn['number_of_columns'];
							$desktopField = 'desktop_columns_' . $columnNumber;
							$desktopColumns = '';

							if ($columnNumber != '1') {
								$desktopColumns = $globalColumn[$desktopField];
							}

							if ($desktopColumns == '') {
								// If number of columns is 1, the browser width settings have no default
								$desktopColumns = '1';
							}

							$desktopColumnClass = ' pure-u-lg-' . $desktopColumns . '-' . $columnNumber;
							$tabletField = 'tablet_columns_' . $columnNumber;
							$tabletColumns = '';

							if ($columnNumber != '1') {
								$tabletColumns = $globalColumn[$tabletField];
							}

							if ($tabletColumns == '') {
								// If number of columns is 1, the browser width settings have no default
								$tabletColumns = '1';
							}

							$tabletColumnClass = ' pure-u-md-' . $tabletColumns . '-' . $columnNumber;
							$mobileField = 'mobile_columns_' . $columnNumber;
							$mobileColumns = '';

							if ($columnNumber != '1') {
								$mobileColumns = $globalColumn[$mobileField];
							}

							if ($mobileColumns == '') {
								// If number of columns is 1, the browser width settings have no default
								$mobileColumns = $columnNumber;
							}

							if ($mobileColumns == '1') {
								// If number of columns is 1, the browser width settings have no default
								$mobileColumns = $columnNumber;
							}

							$mobileColumnClass = ' pure-u-sm-' . $mobileColumns . '-' . $columnNumber;

							// Column offset map
							$desktopOffsetField = 'column_offset_' . $columnNumber;
							$desktopOffsetColumns = '';

							if ($columnNumber != '1') {
								$desktopOffsetColumns = $globalColumn[$desktopOffsetField];
							}

							if ($desktopOffsetColumns == 'None' || $desktopOffsetColumns == '') {
								$desktopOffsetColumnClass = ' desktop-hidden';
							} else {
								$desktopOffsetColumnClass = ' pure-u-lg-' . $desktopOffsetColumns . '-' . $columnNumber;
							}

							$tabletOffsetField = 'tablet_column_offset_' . $columnNumber;
							$tabletOffsetColumns = '';

							if ($columnNumber != '1') {
								$tabletOffsetColumns = $globalColumn[$tabletOffsetField];
							}

							if ($tabletOffsetColumns == 'None' || $tabletOffsetColumns == '') {
								$tabletOffsetColumnClass = ' tablet-hidden';
							} else {
								$tabletOffsetColumnClass = ' pure-u-md-' . $tabletOffsetColumns . '-' . $columnNumber;
							}

							$mobileOffsetField = 'mobile_column_offset_' . $columnNumber;
							$mobileOffsetColumns = '';

							if ($columnNumber != '1') {
								$mobileOffsetColumns = $globalColumn[$mobileOffsetField];
							}

							if ($mobileOffsetColumns == 'None' || $mobileOffsetColumns == '') {
								$mobileOffsetColumnClass = ' mobile-hidden';
							} else {
								$mobileOffsetColumnClass = ' pure-u-sm-' . $mobileOffsetColumns . '-' . $columnNumber;
							}

							// Vertical padding
							$columnPaddings = $globalColumn['column_padding'];

							if ($columnPaddings == '') {
								$columnPaddingType = '';
							} else{
								$columnPaddingType = '';

								foreach ($columnPaddings as $columnPadding) {
									$columnPaddingType .= ' padding-'.$columnPadding;
								}
							}

							// Content type
							$contentType = $globalColumn['content_type'];

							if ($contentType == "component") {
								$component = $globalColumn['component_type']['label'];
								$contentType = 'custom/' . $component;
							} else {
								$contentType = $contentType . '.php';
							}

							if ($hideColumn == '') :
								// Component list
								// boxes : Boxes
								// carousel : Carousel
								// component : Component
								// feed : Feed
								// form : Form
								// image : Image
								// source : Source/Shortcode
								// table : Resources Table
								// quote : Quote
								// team : Team
								// text : Text
								// video : Video
								?>
									<!-- offset div - if is none, the div will be hidden per screensize -->
									<div class="column<?= $desktopOffsetColumnClass.$tabletOffsetColumnClass.$mobileOffsetColumnClass.$themeColor.$columnPaddingType;?>" <?php if ($theme == 'custom') { echo 'style="background-color:'.$themeColor.';"'; } ?>></div>
									<div class="column <?= $desktopColumnClass.$tabletColumnClass.$mobileColumnClass.$themeColor.$columnPaddingType;?> <?php if($columnClasses){echo $columnClasses;}?>"<?php if ($columnId) { echo ' id="'.$columnId.'"'; } ?> <?php if ($theme == 'custom') { echo 'style="background-color:'.$themeColor.';"'; } ?>>
										<?php
											$template = locate_template('inc/components/' . $contentType);

											if (file_exists($template)) {
												include($template);
											} else {
												echo 'Cannot find template: ' . $template;
											}
										?>
									</div>
								<?php
							endif;
						endforeach;
					endif;
				?>
			</div>
		</section>
		<?php
	endif;
?>
