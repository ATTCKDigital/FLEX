<!-- page nav -->
<?php $direction = get_sub_field('page_nav_direction'); ?>
<div class="component-page-nav component<?php if($direction == 'next'){ echo ' page-nav-next';}?>">
	<?php 
		$pageID = get_sub_field('page_nav_link')->ID;
		$pageText = get_sub_field('page_nav_text');
		$pageLink = get_the_permalink($pageID);
		
		if($pageText) {
			$pageText = $pageText;
		} else {
			$pageText = get_the_title($pageID);
		}
	?>
	
	<?php 
		if($direction == 'prev') {
	?>
		<a href="<?= $pageLink?>" class="prev">
			<?php echo Utils::render_template("inc/templates/svg.php", array(
				"id" => "icon-page-left",
				"classes" => "icon icon-page-right"
			)); ?>
		</a>
		<a href="<?= $pageLink;?>" class="eyebrow"><?= $pageText;?></a>
	<?php } else {

	?>
		<a href="<?= $pageLink;?>" class="eyebrow"><?= $pageText;?></a>
		<a href="<?= $pageLink;?>" class="next">
			<?php echo Utils::render_template("inc/templates/svg.php", array(
				"id" => "icon-page-left",
				"classes" => "icon icon-page-left"
			)); ?>
		</a>
	<?php 
		}
	?>
	</a>
	
</div>
