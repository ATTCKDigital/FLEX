<article class="post">
    <img src="<?= $post_featured_image ?>" alt="">
    <h2><?= $title ?></h2>

    <?php if ($showExcerpt): ?>
        <p><?php echo esc_html($excerpt); ?></p>
    <?php endif; ?>
    <div>
        <strong>
            <a href="<?php echo esc_url($link); ?>"><?php echo esc_html($cta); ?></a>
        </strong>
    </div>
</article>