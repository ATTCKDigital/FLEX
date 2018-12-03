<?php
	$args = array(
		'post_parent' => $ID,
		'post_type' => 'events', 
		'posts_per_page' => 9999,
		'post_status' => 'publish',
		'meta_key' => 'start_date',
		'orderby' => 'meta_value',
		'order' => 'ASC',
		'meta_query' => array(
			'relation' => 'AND',
			array(
				'key' => 'event_page_type',
				'value' => 'overview_page',
			),
			array(
				'key' => 'end_date',
				'value' => date('Ymd'),
				'compare' => '>='
			), 
		),
	);

	$events = get_posts($args);

	if ($events) {
		?>
		<section class="component component-feed component-feed-events view-list" data-component-name="Feed">
			<div class="content-wrapper align-center">
				<h2 class="headline2 align-center padding-bottom-small">
					<?php _e( 'Upcoming events', '_isoc' ); ?>
				</h2>
				<?php if ($events) : ?>
					<div class="feed" data-meta="" data-taxonomy="region_news_regions"  data-order="ASC"  data-orderby="start_date"  data-region=""  data-search=""  data-cat-exclude=""  data-category=""  data-search="" data-post-type="events" data-event-time=""  data-post-parent=""  data-author=""  data-post-count="12">
						<div class="grid-sizer"></div>
						<div class="gutter-sizer"></div>
						<?php 
							foreach ($events as $event) :
								$eventID = $event->ID;
								$startDateRaw = get_field('start_date', $eventID);
								$endDateRaw = get_field('end_date', $eventID);
								$dateOutput = "l d F Y";
								$unixtimestamp = strtotime($startDateRaw);
								$unixtimestampEnd = strtotime($endDateRaw);
								$startDate = date_i18n($dateOutput, $unixtimestamp);

								if ($endDateRaw != $startDateRaw) {
									if ($endDateRaw) {
										$endDate = date_i18n($dateOutput, $unixtimestampEnd);

									} else {
										$endDate = '';
									}
								} else {
									$endDate = '';
								}

								$startDay = date_i18n('d', $unixtimestamp);
								$startMonth = date_i18n('F', $unixtimestamp);
								$excerpt = get_field('event_short_description', $eventID);
								$excerpt = strip_tags(wp_trim_words($excerpt, '20', '...' ));
								?>
								<div class="feed-item load-item" data-max-pages="" data-post-id="">
									<a class="feed-link" href="<?= get_the_permalink($eventID);?>"><?= get_the_title($eventID); ?></a>
									<div class="feed-item-info row-text-black align-left">
										<div class="feed-date">
											<div class="feed-date-inner">
												<span><?= $startDay;?></span>
												<?= $startMonth;?>
											</div>
										</div>
										<div class="feed-content">
											<div class="date-location">
												<span class="eyebrow"><?= get_field('location_display', $eventID); ?></span>
												<span class="eyebrow eyebrow-regular"><?= $startDate;?><?php if ($endDate) { ?> &ndash; <?= $endDate;?><?php } ?></span>
											</div>
											<div class="feed-logo mobile">
												<img src="<?= get_field('event_logo', $eventID)['url'];?>" alt="<?= get_field('event_logo', $eventID)['title'];?>" title="<?= get_field('event_logo', $eventID)['title'];?>" />
											</div>
											<div class="title-excerpt">
												<h3 class="headline5"><?= get_the_title($eventID); ?></h3>
												<p class="small-text"><?= $excerpt; ?>&hellip;</p>
											</div>

										</div>
										<div class="feed-logo desktop">
											<img src="<?= get_field('event_logo', $eventID)['url'];?>" alt="<?= get_field('event_logo', $eventID)['title'];?>" title="<?= get_field('event_logo', $eventID)['title'];?>" />
										</div>
									</div>
								</div>
								<?php
							endforeach;

							wp_reset_postdata();
						?>								   
					</div>
				<?php endif; ?>
			</div>
		</section>
		<?php
	}
?>

