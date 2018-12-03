<?php
	//Events component
	$ctaText = $globalRow['cta_text'];
	$ctaLink = $globalRow['cta_internal_link'];
	$ctaExternalLink = $globalRow['cta_external_link'];
	$eventsPage = get_page_by_path('about/events');
	$eventsPage = $eventsPage->ID;
	$events = get_field('events', $eventsPage);
	$upcomingEvents = $events;
	$sortedEvents = array();

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
			unset($upcomingEvents[$key]);
			unset($sortedEvents[$key]);
		}

	}

	// sort the new filtered array by date (closest to furtherst from today)
	array_multisort($sortedEvents, SORT_ASC, $upcomingEvents);


?>

<div class="component component-events component-fade">
	<div class="pure-g">
		<div class="column pure-u-lg-2-12 pure-u-md-2-12 pure-u-sm-12-12">
			<div class="header header-tab header-tab-small">
				<div class="header-tab-inner">
					<h2 class="headline2 color-standard-white">Events</h2>
				</div>
			</div>
		</div>
	</div>		
	<div class="events">
		<?php 
			$i = 0;

			foreach ($upcomingEvents as $event) { 
				$i++;
				$eventTitle = $event['event_title'];
				$eventLink = $event['event_cta_external_link'];
				$eventLinkText = $event['event_cta_text'];
				$eventStartDate = $event['event_start_date'];
				$eventStartDate = $event['event_start_date'];
				$eventEndDate = $event['event_end_date'];
				$eventStartDate = date("M d", strtotime($eventStartDate));
				$eventEndDate = date("M d", strtotime($eventEndDate));
		?>
			<div class="event">
				<div class="event-inner pure-g component-alignment-top">
					<div class="column pure-u-lg-2-12 pure-u-md-2-12 mobile-hidden"></div>
					<?php if ($eventLink){?><a class="full-link" alt="<?= $eventTitle;?>" title="<?= $eventTitle;?>" href="<?= $eventLink;?>"></a><?php } ?>
					<div class="event-date column pure-u-lg-2-12 pure-u-md-2-12 pure-u-sm-12-12 background-black padding-mobile-20 padding-mobile-bottom-10 padding-mobile-top-10 padding-tablet-landscape-top-15 padding-tablet-landscape-bottom-15 padding-tablet-landscape-right-25 padding-tablet-landscape-left-25">
						<time class="color-standard-white event-time margin-tablet-landscape-bottom-10"><?= $eventStartDate;?><?php if($eventEndDate != $eventStartDate){ ?> &ndash;<?php } ?></time>
						<?php if($eventEndDate != $eventStartDate){ ?>
							<time class="color-standard-white event-time margin-tablet-landscape-bottom-10"><?= $eventEndDate;?></time>
						<?php } ?>
					</div>
					<div class="column pure-u-lg-6-12 pure-u-md-6-12 pure-u-sm-12-12 event-info background-white padding-mobile-20 padding-tablet-landscape-top-25 padding-tablet-landscape-bottom-25 padding-tablet-landscape-right-30 padding-tablet-landscape-left-30">
						<h3 class="headline3 margin-mobile-bottom-15"><?= $eventTitle;?></h3>
						<p><?= $event['event_description'];?></p>
						<?php if ($eventLink){?><span class="cta-link cta-link-small"><?= $eventLinkText;?></span><?php } ?>
					</div>
				</div>
			</div>
			<?php 
				//only show 4
				if($i == 4) break; 
			?>
		<?php } ?>	
	</div>
	<?php 
		if($ctaText){ 

			if($ctaLink) {
				$link = $ctaLink;
				$target = '';
			} else {
				$link = $ctaExternalLink;
				$target = ' target="_blank"';
			}

	?>
		<div class="pure-g">
			<div class="column pure-u-lg-4-12 pure-u-md-4-12 mobile-hidden"></div>
			<div class="column pure-u-lg-6-12 pure-u-md-6-12 pure-u-sm-12-12">
				<div class="cta-tab">
					<div class="cta-tab-inner">
						<a href="<?= $link;?>" <?= $target;?> class="cta-link color-standard-white"<?= $target;?>><?= $ctaText;?></a>
					</div>
				</div>
			</div>
		</div>	
	<?php } ?>
</div>