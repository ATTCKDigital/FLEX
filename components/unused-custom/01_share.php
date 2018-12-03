<div class="component component-share" data-component-name="Share">
	<span class="back-link blue-text">&lsaquo; <?php _e('Back', '_isoc'); ?></span>
	<?php
		$url = get_permalink();
		$encoded = urlencode($url);
	?>
	<script>function openwindow() { window.open("https://www.facebook.com/sharer/sharer.php?u=<?php echo $encoded;?>","mywindow","menubar=1,resizable=1,width=600,height=400"); }</script>
	<script>function linkedinOpenwindow() { window.open("https://www.linkedin.com/shareArticle?mini=true&url=<?php echo $encoded;?>","mywindow","menubar=1,resizable=1,width=600,height=400"); }</script>
	<script>function twitterOpenwindow() { window.open("https://twitter.com/home/?status=<?php the_title() ?>: <?php the_permalink() ?>","mywindow","menubar=1,resizable=1,width=600,height=400"); }</script>
	<a href="javascript: openwindow()" class="share-icon"><i class="fa fa-facebook" title="<?php _e('Share on Facebook', '_isoc');?>"></i></a>
	<a href="javascript: twitterOpenwindow()" class="share-icon"><i class="fa fa-twitter" title="<?php _e('Share on Twitter', '_isoc');?>"></i></a>
	<a href="mailto:type%20email%20address%20here?subject=I%20wanted%20to%20share%20this%20post%20with%20you%20from%20Internet%20Society&body=<?php the_title() ?> - <?php the_permalink() ?>" class="share-icon"><i class="fa fa-envelope" title="<?php _e('Email this post', '_isoc');?>"></i></a>
</div>
