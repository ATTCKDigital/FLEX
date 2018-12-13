<?php 
	//Global Nav 
	$siteLogo = get_field('site_logo', 'options');
	$siteLogoAlt = get_field('site_logo_alt', 'options');

?>

<header class="global-header">
	<div class="header-inner">
		<a href="" class="logo-wrapper">
			<?php if($siteLogo){ ?>
				<img src="<?= $siteLogo['url'];?>" class="nav-logo" alt="<?= bloginfo('name');?>" title="<?= bloginfo('name');?>" />
			<? } ?>
			<?php if($siteLogoAlt){ ?>
				<img src="<?= $siteLogoAlt['url'];?>" class="nav-logo nav-logo-alt" alt="<?= bloginfo('name');?>" title="<?= bloginfo('name');?>" />
			<? } ?>
		</a>
	</div>
	<nav>
		<ul class="menu-items">
			<?php
				//Deafult is 'primary' nav. 
				//To use another nav, create one in /config/theme-configs/register-nav-menus.php and change values below.
				if (has_nav_menu('primary')) {
					$navArgs = array(
						'theme_location' => 'primary',
						'container' => false,
						'menu_id' => false,
						'echo' => true,
						'fallback_cb' => false,
						'link_before' => '',
						'link_after' => '',
						'items_wrap' => '%3$s',
						'walker' => new Nav_Walker_Nav_Menu,
						'depth' => 0,
					);

					wp_nav_menu($navArgs);
				}
			?>		
		</ul>
	</nav>
</header>
