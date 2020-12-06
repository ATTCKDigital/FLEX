<?php
	// customizes the admin css and js when ACF is installed and active
	function flexfls_acf_styles() {
?>
	<style type='text/css'>
		.acf-flexible-content .layout {
			background-color: #ffe48f;
			margin-bottom: 40px;
			border-bottom: 5px solid dimgray;
		}

		.acf-flexible-content .layout .acf-fc-layout-handle h4 {
			display: inline;
		}

		.acf-flexible-content .layout:nth-child(2n) {
			background-color: silver;
		}

		.acf-field, 
		.acf-repeater .acf-row-handle.order + td, 
		.acf-repeater .acf-row-handle.order + td .acf-field {
			background-color: white;
		}

		.term-php .acf-field, 
		.user-edit-php .acf-field {
			background-color: transparent;
		}

		.term-php .acf-field .acf-field {
			background-color: white;
		}

		.acf-field[data-name='column'] .layout, 
		.acf-field[data-name='column'] .layout .acf-field {
			background-color: gainsboro;
			border-bottom:1px solid #e1e1e1;
			margin-bottom: 20px;
		}

		.acf-field[data-name='column'] .layout .acf-fields > .acf-tab-wrap .acf-tab-group li.active a,
		.acf-field[data-name='column'] .layout .acf-field .acf-fields > .acf-tab-wrap .acf-tab-group li.active a {
			background-color:gainsboro;
		}

		.acf-field[data-name='column'] .layout:nth-child(2n), .acf-field[data-name='column'] .layout:nth-child(2n) .acf-field {
			background-color: floralwhite;
		}

		.acf-field[data-name='column'] .layout:nth-child(2n) .acf-fields > .acf-tab-wrap .acf-tab-group li.active a,
		.acf-field[data-name='column'] .layout:nth-child(2n) .acf-field .acf-fields > .acf-tab-wrap .acf-tab-group li.active a {
			background-color:floralwhite;
		}

		.acf-tab-group li a {
			font-size: 12px;
		}

		.acf-field-message img {
			max-width: 100%;
			max-height: 200px;
		}

		.acf-field[data-name='desktop_columns_2'],
		.acf-field[data-name='tablet_columns_2'],
		.acf-field[data-name='mobile_columns_2'],
		.acf-field[data-name='desktop_columns_3'],
		.acf-field[data-name='tablet_columns_3'],
		.acf-field[data-name='mobile_columns_3'],
		.acf-field[data-name='desktop_columns_4'],
		.acf-field[data-name='tablet_columns_4'],
		.acf-field[data-name='mobile_columns_4'],
		.acf-field[data-name='desktop_columns_5'],
		.acf-field[data-name='tablet_columns_5'],
		.acf-field[data-name='mobile_columns_5'],
		.acf-field[data-name='desktop_columns_6'],
		.acf-field[data-name='tablet_columns_6'],
		.acf-field[data-name='mobile_columns_6'],
		.acf-field[data-name='desktop_columns_8'],
		.acf-field[data-name='tablet_columns_8'],
		.acf-field[data-name='mobile_columns_8'],
		.acf-field[data-name='desktop_columns_12'],
		.acf-field[data-name='tablet_columns_12'],
		.acf-field[data-name='mobile_columns_12'],
		.acf-field[data-name='desktop_columns_24'],
		.acf-field[data-name='tablet_columns_24'],
		.acf-field[data-name='mobile_columns_24'],
		.acf-field[data-name='column_offset_2'],
		.acf-field[data-name='tablet_column_offset_2'],
		.acf-field[data-name='mobile_column_offset_2'],
		.acf-field[data-name='column_offset_3'],
		.acf-field[data-name='tablet_column_offset_3'],
		.acf-field[data-name='mobile_column_offset_3'],
		.acf-field[data-name='column_offset_4'],
		.acf-field[data-name='tablet_column_offset_4'],
		.acf-field[data-name='mobile_column_offset_4'],
		.acf-field[data-name='column_offset_5'],
		.acf-field[data-name='tablet_column_offset_5'],
		.acf-field[data-name='mobile_column_offset_5'],
		.acf-field[data-name='column_offset_6'],
		.acf-field[data-name='tablet_column_offset_6'],
		.acf-field[data-name='mobile_column_offset_6'],
		.acf-field[data-name='column_offset_8'],
		.acf-field[data-name='tablet_column_offset_8'],
		.acf-field[data-name='mobile_column_offset_8'],
		.acf-field[data-name='column_offset_12'],
		.acf-field[data-name='tablet_column_offset_12'],
		.acf-field[data-name='mobile_column_offset_12'],
		.acf-field[data-name='column_offset_24'],
		.acf-field[data-name='tablet_column_offset_24'],
		.acf-field[data-name='mobile_column_offset_24'] {
			clear: none;
			float: left;
			width: 33%;
		}

		.user-description-wrap {
			display: none;
		}

		#edittag {
			max-width: none;
		}

		.profile-php .acf-field {
			background: transparent;
		}
	</style>
<?php
	}

	add_action('acf/input/admin_head', 'flexfls_acf_styles');
?>