<?php
/**
 * Map component
 */

$centerLocation = $globalColumn['center_location'];
$zoom = $globalColumn['zoom'];
$hasMarkers = $globalColumn['has_markers'];
$markers = $globalColumn['markers'];
$hasTitle = $globalColumn['has_title'];
$titleDesktop = $globalColumn['desktop_title'];
$titleMobile = $globalColumn['mobile_title'];

?>

<section class="component component-map">
    <div class="content-wrapper <?= $globalRow['row-height'] ?>">
        <?php if ($hasTitle): ?>
            <div class="box">
                <h1 class="map-title title-desktop"><?= $titleDesktop ?></h1>
                <h1 class="map-title title-mobile"><?= $titleMobile ?></h1>
            </div>
        <?php endif ?>
        <div id="mapbox"
             data-center-location='<?= json_encode($centerLocation) ?>'
             data-zoom='<?= $zoom ?>'
             data-has-markers='<?= $hasMarkers ?>'
             data-markers='<?= json_encode($markers) ?>'>
        </div>
    </div>
</section>
