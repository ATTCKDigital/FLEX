<?php
/**
 * Template Name: Events
 * Description: Wordpress template for a layout page
 *
 */
	get_header();
	$ID = get_the_ID();
	$events = get_field('events', $ID);

	$upcomingEvents = $events;
	$pastEvents = array();
	$sortedEvents = array();
	$sortedEventsPast = array();

	foreach ($upcomingEvents as $key => $value) {
		//get today
		$today = new DateTime();
	
		//find the start date
		$startDate = $value['event_start_date'];
		$endDate = $value['event_end_date'];

		//change the start date to datetime format
		$startDate = new DateTime($startDate);
		$endDate = new DateTime($endDate);
		$sortedEvents[$key] = $startDate;

		//if the start date is less than today, remove from upcoming events array
		if($endDate < $today) {
			$pastEvents[] = $value;
			$sortedEventsPast[$key] = $startDate;
			unset($upcomingEvents[$key]);
			unset($sortedEvents[$key]);
		}

	}

	// sort the new filtered array by date (closest to furtherst from today)
	array_multisort($sortedEvents, SORT_ASC, $upcomingEvents);
	array_multisort($sortedEventsPast, SORT_DESC, $pastEvents);
?>
	
	<?php
		//layout generator
		$globalRows = get_field('layout_generator');
		$rowNumber = 0;
		if($globalRows){
			foreach ($globalRows as $globalRow) {
				$rowNumber++;
				include(get_template_directory() . "/inc/config/layout-generator-component.php");
			}
		}
	?>

	<?php
		echo Utils::render_template("inc/templates/all-events.php", array(
			"ID" => $ID,
			"events" => $upcomingEvents,
			"eventsTab" => 'Events',
			"eventsType" => 'upcoming',
		));
	?>

	<?php
		echo Utils::render_template("inc/templates/all-events.php", array(
			"ID" => $ID,
			"events" => $pastEvents,
			"eventsTab" => 'Past Events',
			"eventsType" => 'upcoming',
		));
	?>

<?php
	get_footer();
?>
