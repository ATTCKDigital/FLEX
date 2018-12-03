<?php
	$classes = ($this->classes) ? $this->classes: '';
	$data = ($this->data) ? $this->data: '';
	$id = ($this->id) ? $this->id: '';
?>
<svg class="<?= $classes ?>" <?= $data ?>>
  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#<?= $id ?>"></use>
</svg>