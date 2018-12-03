<?php
	$searchTerm = $this->searchTerm;

	if(!$searchTerm) {
		$searchTerm = '';
		$searchValue = 'Search';
	} else {
		$searchValue = '';
	}
?>
<form method="get" class="search-form" id="searchform-<?= rand();?>" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<input type="text" class="search-input" name="s" id="s-<?= rand();?>" value="<?= $searchTerm;?>" placeholder="<?= $searchValue;?>" />
	<input type="submit" class="search-button" name="submit" id="searchsubmit-<?= rand();?>" value="" />
</form>

