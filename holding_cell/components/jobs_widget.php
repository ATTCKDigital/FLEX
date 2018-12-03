<?php
	//Jobs Widget component

	$jobsCode = $globalRow['jobs_code_snippet'];

?>

<div class="component component-jobs component-fade margin-mobile-bottom-40 margin-tablet-landscape-bottom-60">
	<div class="pure-g">
		<div class="column pure-u-lg-2-12 pure-u-md-2-12 pure-u-sm-4-12">
			<div class="header header-tab header-tab-small">
				<div class="header-tab-inner">
					<h2 class="headline2 color-standard-white">Jobs</h2>
				</div>
			</div>
		</div>
	</div>
	<div class="pure-g">
		<div class="column pure-u-lg-2-12 pure-u-md-2-12 mobile-hidden"></div>
		<div class="column pure-u-lg-10-12 pure-u-md-10-12 pure-u-sm-12-12">
			<?= $jobsCode;?>
		</div>
	</div>
</div>