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
				//Default is 'primary' nav. 
				//To use another nav, create one in /config/theme-configs/register-nav-menus.php and change variable below.
				echo Utils::render_template('config/theme-includes/menu.php', array(
					'menuLocation' => 'primary',
				));
			?>		
		</ul>
	</nav>
</header>
