<?php
	$categories = array(
		"black",
		"yellow",
		"white",
		"gray"
	);
	$variants = array(
		"base",
		"light",
		"dark",
		"hover",
		"overlay"
	);
?>

<div class="component component-color-grid">
	<div class="content-wrapper">
		<table>


			<?php foreach ($categories as $c): ?>
			<tr>
				<th><?= $c ?></th>

				<? foreach ($variants as $v): ?>
				<td class="color-grid <?php if($c == 'black'){echo 'white-text ';} ?>bg-<?= $c ?>-<?= $v ?>">
					color('<?= $c ?>', '<?= $v ?>')
				</td>
				<? endforeach; ?>
			</tr>
			<? endforeach; ?>
		</table>
	</div>
</div>
