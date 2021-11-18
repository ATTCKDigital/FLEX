<?php 
	// Global Nav 
?>
<div class="page-load-modal"></div>
<header 
	class="component-header component" 
	data-component-name="Nav" 
	role="banner">
	<div class="header-inner">
		<a href="/" class="logo-wrapper">
			<?php 
				$customLogoID = get_theme_mod( 'custom_logo' );
				$customLogoURL = wp_get_attachment_image_url( $customLogoID , 'full' );
				$customLogoSRC = wp_get_attachment_image_src( $customLogoID , 'full' );
			?>
			<img 
				alt="<?= bloginfo('name');?>" 
				class="nav-logo" 
				height="<?= $customLogoSRC[1] ?>"
				src="<?= $customLogoURL;?>" 
				title="<?= bloginfo('name');?>" 
				width="<?= $customLogoSRC[2] ?>"
				/>
		</a>
		<div class="hamburger-wrapper">
			<mark class="hamburger"></mark>
		</div>
		<nav 
			class="main-nav" 
			aria-label="Main site navigation" 
			role="navigation">
			<ul class="menu-items">
				<?php
					// Default is 'primary' nav. 
					// To use another nav, create one in /config/theme-configs/register-nav-menus.php and change variable below.
					echo Utils::render_template('config/theme-includes/menu.php', array(
						'menuLocation' => 'primary',
					));
				?>		
			</ul>
		</nav>
	</div>
</header>
