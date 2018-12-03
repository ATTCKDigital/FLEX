<!-- Video component -->
<?php
$videoID = $globalColumn['video_id'];
$videoEmbed = '';
$videoType = $globalColumn['video_type'];
$videoThumbnail = $globalColumn['video_thumbnail'];
$videoThumbnail = wp_get_attachment_image_src($videoThumbnail, 'full'); //get image url

if ($videoType == 'vimeo') {
    $videoEmbed = 'https://player.vimeo.com/video/' . $videoID . '?api=1';
} elseif ($videoType == 'youtube') {
    $videoType = 'youtube';
    $videoEmbed = 'https://www.youtube.com/embed/' . $videoID . '?enablejsapi=1';
}
?>
<section class="component-video component no-parallax">
    <div class="content-wrapper">
        <?php if ($videoID) { ?>
            <div class="video-wrapper">
                <iframe src="<?= $videoEmbed; ?>" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </div>
        <?php } ?>
    </div>
</section>