<!-- Counter component -->
<section class="component component-counter">
	<div class="content-wrapper align-center">
		<?php
			$counters = get_sub_field('counters');
			$counterColor = get_sub_field('counter_color');
			if($counterColor == 'yellow' || $counterColor[0] == 'yellow') {
				//set default yellow to nothing so that old counters do not have to be updated
				$counterColor = '';
			} else {
				$counterColor = '-'.$counterColor;
			}
		?>
		<div class="counters">
			<?php
				foreach ($counters as $counter) {
					$counterNumber = $counter['counter_number'];
					$counterArray = str_split($counterNumber);

			?>	
				<div class="counter-item align-center row-text-white width-<?= count($counter);?>">
					<div class="numbers">
						<?php 
							foreach ($counterArray as $number) { 
								if($number == ',') {
									$number = 'comma';
								} else {
									$number = $number;
								}
								echo Utils::render_template("inc/templates/svg.php", array(
									"id" => "icon-".$number.$counterColor,
									"classes" => "number number-".$number
								)); 
						}?>
						<h6 class="headline6 align-center"><?= $counter['counter_text'];?></h6>

					</div>
				</div>
			<?php } ?>
		</div>
	</div>
</section>