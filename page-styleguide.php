<?php
    get_header();

    	// Style guide page template. Only for use on dev machines, should never be public.
    	//
    	// To view: Create a page with the permalink "styleguide" and publish it, locally only.
    	//
        if (have_posts()) : while (have_posts()) : the_post();
?>
        <div class="default-page styleguide component-row-standard">

            <h1 class="headline1"><?php the_title(); ?></h1>
            <div class="body-text">

				<section class="component component-styles">
					<div class="component-inner">
						<h2 class="headline3">Color Guide</h2>
		            	<?php echo Utils::render_template("inc/templates/color-grid.php"); ?>
					</div>
				</section>


				<section class="component component-styles">
					<div class="component-inner">
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
								<td><p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Ut consectetur nunc a lorem malesuada, eu efficitur massa hendrerit. Donec felis sem, <em>interdum nec vulputate at</em>, tincidunt vel arcu. Sed efficitur est vitae justo porta mattis. Cras tempus luctus ex nec efficitur. Pellentesque lobortis nibh ultrices ante ullamcorper, ac viverra ante vehicula. <a href="">Sed tempus dolor</a> id mi auctor efficitur. In suscipit blandit lorem sit amet hendrerit. Phasellus venenatis non libero eget convallis. </p>
								</td>
							</tr>
							<tr>
								<th>.dull</th>
								<td><p class="dull">Lorem Ipsum Dolor Sit Amet.</p></td>
							</tr>
							<tr>
								<th>p.small-text</th>
								<td><p class="small-text">Lorem Ipsum Dolor Sit Amet.</p></td>
							</tr>
							<tr>
								<th>.caption</th>
								<td><p class="caption">We build lasting relationships.</p></td>
							</tr>
							<tr>
								<th>.caption-small</th>
								<td><p class="caption-small">Featured Blog</p></td>
							</tr>
							<tr>
								<th>.caption-small-light</th>
								<td><p class="caption-small-light"></p></td>
							</tr>
							<tr>
								<th>.caption-small-light-lower</th>
								<td><p class="caption-small-light-lower">Founder of {Company}</p></td>
							</tr>
							<tr>
								<th>.read-more-link</th>
								<td><a class="read-more-link">Read More</a></td>
							</tr>
							<tr class="black row-text-white">
								<th>.read-more-link</th>
								<td><a class="read-more-link" style="color: rgb(254, 203, 0);">Read More</a></td>
							</tr>
							<tr>
								<th>.fa</th>
								<td><span class="caption-small-light">Share:</span><i class="fa fa-twitter"></i></td>
							</tr>
							<tr class="black row-text-white">
								<th>.fa</th>
								<td><i class="fa fa-twitter" style="color: rgb(254, 203, 0);"></i></td>
							</tr>
							<tr>
								<th>.error</th>
								<td><span class="error">Email is required</span></td>
							</tr>
							<tr>
								<th>bullets</th>
								<td>
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
				</section>

				<section class="component  component-styles">
					<div class="component-inner">
		            	<h2 class="headline3">Buttons</h2>

		            	<div>
		            		<a href="#" class="button button-secondary button-black">Button</a>
		            	</div>
		            	<div class="button-bgnd">
		            		<a href="#" class="button">Primary White Button</a>
		            		<a href="#" style="margin-left: 20px;" class="button button-secondary">Secondary White Button</a>
		            	</div>
		            	<div style="margin-top: 20px;">
		            		<a href="#" class="button button-thin button-secondary button-black">Button Thin</a>
		            	</div>

					</div>
				</section>

           </div>
        </div>

<?php endwhile;  ?>
<?php
    endif;
    get_footer();
