<?php
	get_header();

		// Style guide page template. Only for use on dev machines, should never be public.
		//
		// To view: Create a page with the permalink "styleguide" and publish it, locally only. 
		// Add project specific styles as needed
		// Add colors from color map. Make one row for each set of colors.
		if (have_posts()) : while (have_posts()) : the_post();
?>
		<div class="styleguide component-row-standard">
			<h1 class="headline1"><?php the_title(); ?></h1>
			<div class="body-text margin-bottom-40">
				<h2 class="headline3">Color Guide</h2>
				<table class="color-grid">
					<tr>
						<td class="component-theme-debug-red color-grid">
							<p>.color-debug-red</p>
						</td>
					</tr>
					<tr>
						<td class="component-theme-primary-black color-primary-white color-grid">
							<p>.color-primary-black</p>
						</td>
						<td class="component-theme-primary-white color-grid">
							<p>.color-primary-white</p>
						</td>
						<td class="component-theme-primary-light-gray color-grid">
							<p>.color-primary-light-gray</p>    
						</td>
					</tr>
					<tr>
						<td class="component-theme-accent-red color-primary-white color-grid">
							<p>.color-accent-red</p>
						</td>
					</tr>
					<tr>
						<td class="component-theme-social-facebook color-primary-white color-grid">
							<p>.color-social-facebook</p>
						</td>
						<td class="component-theme-social-twitter color-primary-white color-grid">
							<p>.color-social-twitter</p>
						</td>
					</tr>

				</table>
			</div>

			<div class="body-text">
				<h2 class="headline3">Typography Classes</h2>
				<table class="typography">
					<tr>
						<th>.headline1</th>
						<td><h1 class="headline1">Lorem Ipsum Dolor Sit Amet.</h1></td>
					</tr>
					<tr>
						<th>.headline2</th>
						<td><h2 class="headline2">Lorem Ipsum Dolor Sit Amet.</h2></td>
					</tr>
					<tr>
						<th>.headline3</th>
						<td><h3 class="headline3">Lorem Ipsum Dolor Sit Amet.</h3></td>
					</tr>
					<tr>
						<th>.headline4</th>
						<td><h4 class="headline4">Lorem Ipsum Dolor Sit Amet.</h4></td>
					</tr>
					<tr>
						<th>.headline5</th>
						<td><h5 class="headline5">Lorem Ipsum Dolor Sit Amet.</h5></td>
					</tr>
					<tr>
						<th>.headline6</th>
						<td><h6 class="headline6">Lorem Ipsum Dolor Sit Amet.</h6></td>
					</tr>
					<tr>
						<th>p</th>
						<td><p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Ut consectetur nunc a lorem malesuada, eu efficitur massa hendrerit. Donec felis sem, <em>interdum nec vulputate at</em>, tincidunt vel arcu. Sed efficitur est vitae justo porta mattis. Cras tempus luctus ex nec efficitur. Pellentesque lobortis nibh ultrices ante ullamcorper, ac viverra ante vehicula. <a href="">Sed tempus dolor</a> id mi <u>auctor efficitur</u>. In suscipit blandit lorem sit amet hendrerit. Phasellus venenatis non libero eget convallis. </p>
						</td>
					</tr>
					<tr>
						<th>.error</th>
						<td><span class="error">Email is required</span></td>
					</tr>
					<tr>
						<th>.button</th>
						<td><span class="button">Click Here</span></td>
					</tr>
					<tr>
						<th>.button.button-white</th>
						<td><span class="button button-white">Click Here</span></td>
					</tr>
					<tr>
						<th>.button.button-inactive</th>
						<td><span class="button button-inactive">Click Here</span></td>
					</tr>
					<tr>
						<th>.share-button.share-facebook</th>
						<td><span class="share-button share-facebook"><i class="fab fa-facebook-f"></i></span></td>
					</tr>
					<tr>
						<th>.share-button.share-twitter</th>
						<td><span class="share-button share-twitter"><i class="fab fa-twitter"></i></span></td>
					</tr>
					<tr>
						<th>bullets</th>
						<td class="body-text">
							<ul>
								<li>Lorem Ipsum Dolor Sit Amer.</li>
								<li>Lorem Ipsum Dolor Sit Amer.</li>
								<li>Lorem Ipsum Dolor Sit Amer.</li>
								<li>Lorem Ipsum Dolor Sit Amer.</li>
							</ul>
							<ol>
								<li>Lorem Ipsum Dolor Sit Amer.</li>
								<li>Lorem Ipsum Dolor Sit Amer.</li>
								<li>Lorem Ipsum Dolor Sit Amer.</li>
								<li>Lorem Ipsum Dolor Sit Amer.</li>
							</ol>
						</td>
					</tr>
				</table>
			</div>
		</div>


<?php endwhile;  ?>
<?php
	endif;
	get_footer();
?>
