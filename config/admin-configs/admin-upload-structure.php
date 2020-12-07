<?php
/*** Admin Upload Structure ***/
//Disables "Organize my uploads into month- and year-based folders" option
function admin_uploads() {
	update_option('uploads_use_yearmonth_folders', '0');

}
add_action('after_setup_theme', 'admin_uploads');