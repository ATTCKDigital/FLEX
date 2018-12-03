
<?php  
	//set the homepage language when in that language
	if(current_language() == 'us') { 
		$currentHome = '';
	} else { 
		$currentHome = current_language();
	}
?>

<header class="main-header component dont-fade-me-in" data-component-name="Nav">
	<div class="hamburger-wrapper">
		<mark class="hamburger"></mark>
	</div>
	<div class="header-inner">
		<div class="logo-wrapper">
			<a href="/<?=$currentHome;?>">
				<span><?php bloginfo('name');?></span>
				<?php
					echo Utils::render_template("inc/templates/svg.php", array(
						"id" => "buck-logo",
						"classes" => "buck-logo",
						"data" => ""
					));
				?>
			</a>
		</div>
		<nav class="main-nav">
			<div class="desktop-hidden language-wrapper">
				<?php languages_list_nav(); ?>
			</div>
			<div class="search-regions">
				<div class="search-wrapper searchToggle">
					<?php
						echo Utils::render_template("inc/templates/svg.php", array(
							"id" => "search-icon",
							"classes" => "search-icon",
							"data" => ""
						));
					?>
				</div>
				<?php languages_list_nav(); ?>
			</div>
			<ul class="menu-items">
				<?php
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
				<li class="menu-item desktop-hidden searchToggle">Search</li>	
			</ul>
		</nav>
	</div>
</header>
