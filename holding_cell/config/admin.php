<?php
/**
 * Change "posts" to "stories" in the admin side menu
 * https://stackoverflow.com/questions/26145878/renaming-post-to-something-else
 */
// function change_post_menu_label() {
// 	global $menu;
// 	global $submenu;
// 	$menu[5][0] = 'Stories';
// 	$submenu['edit.php'][5][0] = 'Stories';
// 	$submenu['edit.php'][10][0] = 'Add Story';
// 	$submenu['edit.php'][16][0] = 'Tags';
// 	echo '';
// }

// add_action('admin_menu', 'change_post_menu_label');

// Change post object labels to "stories"
// function change_post_object_label() {
// 	global $wp_post_types;
// 	$labels = &$wp_post_types['post']->labels;
// 	$labels->name = 'Stories';
// 	$labels->singular_name = 'Story';
// 	$labels->add_new = 'Add Story';
// 	$labels->add_new_item = 'Add Story';
// 	$labels->edit_item = 'Edit Story';
// 	$labels->new_item = 'Story';
// 	$labels->view_item = 'View Story';
// 	$labels->search_items = 'Search Stories';
// 	$labels->not_found = 'No Stories found';
// 	$labels->not_found_in_trash = 'No Stories found in Trash';
// }

// add_action('init', 'change_post_object_label');

/**
 * Custom User profile fields
 */
// add_action('show_user_profile', 'extra_user_profile_fields');
// add_action('edit_user_profile', 'extra_user_profile_fields');

// function extra_user_profile_fields($user) {
// 	?><?php /*
 	<h3>
 		<?php _e("Extra profile information", "blank"); ?>
 	</h3>
 	<table class="form-table">
 		<tr>
 			<th><label for="title"><?php _e("Title"); ?></label></th>
 			<td>
 				<input type="text" name="title" id="title" value="<?php echo esc_attr(get_the_author_meta('title', $user->ID)); ?>" class="regular-text" /><br />
 				<span class="description"><?php _e("Please enter your title [optional]"); ?></span>
 			</td>
 		</tr>
 		<tr>
 			<th><label for="center-name"><?php _e("Center Name"); ?></label></th>
 			<td>
 				<input type="text" name="center-name" id="center-name" value="<?php echo esc_attr(get_the_author_meta('center-name', $user->ID)); ?>" class="regular-text" /><br />
 				<span class="description"><?php _e("Please enter your center-name URL [optional]."); ?></span>
 			</td>
 		</tr>
 		<tr>
 			<th><label for="location"><?php _e("Location"); ?></label></th>
 			<td>
 				<input type="text" name="location" id="location" value="<?php echo esc_attr(get_the_author_meta('location', $user->ID)); ?>" class="regular-text" /><br />
 				<span class="description"><?php _e("Please enter your location URL [optional]."); ?></span>
 			</td>
 		</tr>
 	</table>
*/ ?><?php 
// }

// add_action('personal_options_update', 'save_extra_user_profile_fields');
// add_action('edit_user_profile_update', 'save_extra_user_profile_fields');

// function save_extra_user_profile_fields($user_id) {
// 	if (!current_user_can('edit_user', $user_id)) { 
// 		return false; 
// 	}

// 	update_user_meta($user_id, 'title', $_POST['title']);
// 	update_user_meta($user_id, 'center-name', $_POST['center-name']);
// 	update_user_meta($user_id, 'location', $_POST['location']);
// }
?>