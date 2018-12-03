<!-- Subnav component -->
<section class="component component-subnav" data-component-name="SubNav">
    <div class="component-inner">
		<nav class="align-center">
			<?php 
				foreach ($globalRows as $globalRow) {
					if($globalRow['sub_nav_title'] != '') {
						echo '<span class="eyebrow subnav-item" data-location="'.$globalRow['row_id'].'">'.$globalRow['sub_nav_title'].'</span>';

					}
				}
			?>
			
		</nav>
    </div>
</section>