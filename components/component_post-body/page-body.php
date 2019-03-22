<?php // Plain text page content ?>
<section class="component-row padding-small-top-5x padding-small-bottom-7x">
	<div class="pure-g component-row-wide component-alignment-top">
		<div class="column flex-g-lg-2-12 flex-g-md-1-12 flex-g-sm-0-12"></div>
		<div class="column flex-g-lg-8-12 flex-g-md-10-12 flex-g-sm-12-12">
			<div class="component-single">
				<header class="single-header margin-small-bottom-3x">
					<h1 class="headline4 color-text-primary align-center"><?php the_title();?></h1>
				</header>
				<div class="body-text">
					<?php the_content();?>
				</div>
			</div>
		</div>
		<div class="column flex-g-lg-2-12 flex-g-md-1-12 flex-g-sm-0-12"></div>
	</div>
</section>