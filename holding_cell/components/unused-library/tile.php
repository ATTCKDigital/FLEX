<?php
/**
 * Tile component
 */
$tilesColumn = $globalColumn['tiles_column'];

// Use a unique ID to access the element with jQuery.
$tileUniqid = uniqid();
$loop = 0;

?>
<?php foreach ($tilesColumn as $tile): ?>
    <?php $loop += 1 ?>
    <section class="component component-tile component-tile-<?= $tile['tile_height_size'] ?>" data-uniqid="<?= $tileUniqid . $loop ?>" data-component-name="Tile">
        <?php $tileImage = $tile['tile_image_background'] ?>
        <div class="content-wrapper" style="
        <?= $tileImage ? 'background-image:url('.$tileImage.')' : ''; ?>
                ;background-position:<?= $tile['tile_background_position'] ?>"
        >

            <div class="box">
                <div class="box-header">
                    <h1 class="title"><?= $tile['tile_title'] ?></h1>
                    <div class="box-toggle"
                         onclick="$('.component-tile[data-uniqid=<?= $tileUniqid . $loop ?>]').toggleClass('open')">
                        <span>+</span>
                    </div>
                </div>
                <div class='copy'><?= $tile['tile_copy'] ?></div>
            </div>

        </div>
    </section>
<?php endforeach ?>
