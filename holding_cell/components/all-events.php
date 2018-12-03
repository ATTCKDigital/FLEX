<?php
	// Events component for events landing page
	if($this->events){
?>
<section class="component-row padding-tablet-landscape-top-60">
	<div class="component-row-inner component-fade pure-g component-row-standard">
		<div class="component component-events">
			<div class="pure-g">
				<div class="column pure-u-lg-2-12 pure-u-md-2-12 pure-u-sm-12-12">
					<div class="header header-tab header-tab-small">
						<div class="header-tab-inner">
							<h2 class="headline2 color-standard-white"><?= $this->eventsTab;?></h2>
						</div>
					</div>
				</div>
			</div>		
			<?php 
				$i = 0;

				foreach ($this->events as $event) { 
					$i++;
					$eventTitle = $event['event_title'];
					$eventLink = $event['event_cta_external_link'];
					$eventLinkText = $event['event_cta_text'];
					$eventStartDate = $event['event_start_date'];
					$eventEndDate = $event['event_end_date'];
					$eventStartDate = date("M d", strtotime($eventStartDate));
					$eventEndDate = date("M d", strtotime($eventEndDate));
			?>
				<div class="event">
					<div class="event-inner pure-g component-alignment-top">
						<div class="column pure-u-lg-2-12 pure-u-md-2-12 mobile-hidden"></div>
						<?php if ($eventLink){?>
							<a class="full-link" alt="<?= $eventTitle;?>" title="<?= $eventTitle;?>" href="<?= $eventLink;?>"></a>
						<?php } ?>
						<div class="event-date column pure-u-lg-2-12 pure-u-md-2-12 pure-u-sm-12-12 background-black padding-mobile-20 padding-mobile-bottom-10 padding-mobile-top-10 padding-tablet-landscape-top-15 padding-tablet-landscape-bottom-15 padding-tablet-landscape-right-25 padding-tablet-landscape-left-25">
							<time class="color-standard-white event-time margin-tablet-landscape-bottom-10"><?= $eventStartDate;?><?php if($eventEndDate != $eventStartDate){ ?> &ndash;<?php } ?></time>
							<?php if($eventEndDate != $eventStartDate){ ?>
								<time class="color-standard-white event-time margin-tablet-landscape-bottom-10"><?= $eventEndDate;?></time>
							<?php } ?>
						</div>
						<div class="column pure-u-lg-6-12 pure-u-md-6-12 pure-u-sm-12-12 event-info background-white padding-mobile-20 padding-tablet-landscape-top-25 padding-tablet-landscape-bottom-25 padding-tablet-landscape-right-30 padding-tablet-landscape-left-30">
							<h3 class="headline3 margin-mobile-bottom-15"><?= $eventTitle;?></h3>
							<p><?= $event['event_description'];?></p>
							<?php if ($eventLink){?>
								<span class="cta-link cta-link-small"><?= $eventLinkText;?></span>
							<?php } ?>
						</div>
					</div>
				</div>
			<?php } ?>
		</div>
	</div>
</section>
<?php } ?>