
## Global CSS
The `scss` folder holds all of the globally available styles for the site. Things such as grids, headline styles, layout styles, etc. 

These should serve as the basis for a functioning theme. Changes should be made to the files that set parameters/vars only (colors, fonts, general typography and iconography). Some items have variables that can be changed (such as the padding and margins sass files). 

### Required SCSS Files
- `_animations.scss`: Common animations. 
- `_buttons.scss`: All button styles.
- `_colors.scss`: Sets the colors available for the site. 
- `_component.scss`: Basic component styles. 
- `_debug.scss`: Styles for debugging breakpoints using js debug utility.
- `_fonts.scss`: All font settings.
- `_forms.scss`: Global form styles.  All form field styling should be done here.
- `_global.scss`: Contains truly global elements. 
- `_grid.scss`: Pure Grid classes and styles. 
- `_headlines.scss`: Headline styles.
- `_hidden.scss`: Basic styles for hiding elements based on screen size. 
- `_iconography.scss`: Styles for icons (ie. hamburger, close button, play button).
- `_images.scss`: Basic styles for images. 
- `_layout.scss`: Mixins useful for standard layout paradigms.
- `_margin.scss`: Margin classes.
- `_media-queries.scss`: Standard media queries. Set the break points in `sizing`.
- `_padding.scss`: Padding classes.
- `_popups-overlays.scss`: Basic styles for popups and overlays.
- `_reset.scss`: Meyerweb css reset.
- `_sass-utils.scss`: SASS utilities.
- `_sizing.scss`: Variables related to heights and widths (gap, site width, breakpoints).
- `_styleguide.scss`: Styles for the styleguide page.
- `_row-theme.scss`: Component background defaults and border classes. 
- `_typography-base.scss`: Base typography styles and font size maps.


**Files below are used to import for compilation**
- `admin.scss`: If any admin only styles, include them here.
- `print.scss`: If any print only styles, include them here.
- `style.scss`: Include styles that are being used. Most likely will not have to make changes to this file.

Created 12/4/2018 by okadots for ATTCK
