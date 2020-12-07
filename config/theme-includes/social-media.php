<?php
	// Social Media variables - from Global Settings
	// To use, declare global $facebook (for example) in the file you are using the variable; then echo out the variable.
	global $facebook;
	global $twitter;
	global $instagram;
	global $linkedin;
	global $medium;
	global $youtube;
	global $pinterest;
	global $github;

	$facebook = get_field('facebook_url', 'options');
	$twitter = get_field('twitter_username', 'options');
	$instagram = get_field('instagram_username', 'options');
	$linkedin = get_field('linkedin_url', 'options');
	$medium = get_field('medium_url', 'options');
	$youtube = get_field('youtube_url', 'options');
	$pinterest = get_field('pinterest_username', 'options');
	$github = get_field('github_url', 'options');

	if($pinterest) {
		$pinterest = 'https://www.pinterest.com/'.$pinterest;
	}

	if($twitter) {
		$twitter = 'https://www.twitter.com/'.$twitter;
	}

	if($instagram) {
		$instagram = 'https://www.instagram.com/'.$instagram;
	}

?>