<?php // Plain text page content ?>
<section class="component-row padding-top-5x padding-bottom-7x">
	<div class="flex-grid component-row-wide component-alignment-top">
		<div class="column flex-tablet-landscape-2-12 flex-tablet-portrait-1-12 flex-0-12"></div>
		<div class="column flex-tablet-landscape-8-12 flex-tablet-portrait-10-12 flex-12-12">
			<div class="component-single">
				<header class="single-header margin-bottom-3x">
					<h1 class="headline4 color-text-primary align-center"><?php the_title();?></h1>
				</header>
				<div class="body-text">
					<?php the_content();?>
				</div>
			</div>
		</div>
		<div class="column flex-tablet-landscape-2-12 flex-tablet-portrait-1-12 flex-0-12"></div>
	</div>
</section>