<!-- Downloads component -->
<section class="component component-downloads">
	<div class="content-wrapper">
		<?php
			$downloadTitle = $globalColumn['download_section_title'];
			$downloads = $globalColumn['downloads'];
		?>
		<?php if($downloadTitle) { ?>
			<h3 class="sans-serif14 uppercase"><strong><?= $downloadTitle;?></strong></h3>
		<?php } ?>
		<div class="downloads">
			<?php
				foreach ($downloads as $download) {
	                $title = $download['file_display_name'];
	                $fileID = $download['file'];
	                $fileURL = wp_get_attachment_url( $fileID );
	                $fileSize = $download['file_size'];
			?>
				<div class="download-item">
					<?php
						echo Utils::render_template("inc/templates/svg.php", array(
							"id" => "icon-pdf",
							"classes" => "icon-pdf",
							"data" => ""
						));
					?>
					<h4 class="sans-serif14 align-left nocase"><a href="<?= $fileURL;?>" target="_blank"><?= $title;?> <span><?= $fileSize;?></span></a></h4>
				</div>

			<?php } ?>
		</div>
	</div>
</section>
