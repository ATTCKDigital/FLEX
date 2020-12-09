## Configs
These options can be enabled/disabled in the CHILD `functions.php`. In most cases, you will be enabling/disabling non-required functions in the child theme. If a PARENT config needs to be overridden, copy the original into the same folder path in the child and make changes there.

### Global Variables
Global variables are used to set things such as available colors in the admin and sass and fonts.  A default set of variables is included, these variables can be overridden in the child theme.

### ACF Configs 
Config files: `config/acf-configs`
- `acf-css`: Customize the ACF user facing css 🔒**required**
- `acf-json`: Folder where the required, default ACF json files are stored and synced from (OG tags, GTM, etc) 🔒**required**
- `acf-sync`: Syncs ACF fields across environments based on the json files. Does NOT override individual component ACF field files. 🔒**required**

#### Child Theme
Config files: `/flexlayout-child/config/acf-configs`
- `acf-field-values`: Allows creation of predefined select/radio button options if specific field names are being used
- `acf-options-page`: Enables a custom settings page in the admin interface. Multiple option pages can be added. 🔒**required**
- `acf-search`: Extend WordPress search to include custom fields 👍🏻**recommended**
- `acf-wpml-options`: Creates a globalized ACF output so that settings entered into "Global Settings" for the default language can be used universally. Requires WPML.

### Admin Configs 
Config files: `config/admin-configs`
- `admin-env`: Shows the environment in the toolbar to let the user know what environment they are in. 🔒**required**
- `admin-robots`: Sets the search engine visibility based on environment. 🔒**required**
- `admin-themes`: Sets the admin color scheme based on the `env` variable in `.env`. 🔒**required**
- `admin-upload-structure`: Disables the "Organize my uploads into month- and year-based folders" option. 🔒**required**
- `admin-wysiwyg`: Sets colors and formats in TinyMCE. Add/edit/remove formats in `flexlayout-child/global-variables/wysiwyg.php`. 🔒**required**
- `custom-exceprts`: Creates an excerpt function that allows for customized lengths per location it is used. 🔒**required**
- `disable-custom-colors`: Disables the custom color picker in Gutenberg. Prevents client from straying off brand. 🔒**required**
- `embed-wrapper`: Adds a custom wrapper div `video-wrapper` to every youtube or vimeo video inserted into a post using just a url, to allow for responsive video. 🔒**required**
- `svg-uploads`: Allow SVGs to be uploaded via WordPress Media Uploader. 👍🏻**recommended**
- `unwrap-images`: Unwraps p/a tags around img. Additionally adds custom classes to images uploaded to post WYSIWYG. 🔒**required**

#### Child Theme
Config files: `/flexlayout-child/config/admin-configs`
- `change-post-labels`: In some instances, "Posts" will need to be renamed. This file allows for that. **optional**
- `image-crops`: Set custom crop sizes and custom default Featured Image size. Image will be cropped as defined on upload. 👍🏻**recommended**
- `remove-comments-column`: Remove comments column from post lists. 👍🏻**recommended**
- `sidebars`: Register our sidebars and widgetized areas. Only needed if sidebars are used. **optional**

### Theme Configs
Config files: `config/theme-configs`
- `body-classes`: Creates a body class based on the page slug. 🔒**required**
- `custom-nav-classes`: Customize the "current" menu item class. 🔒**required**
- `customizer-colors`: Functions to set color palettes in the theme. 🔒**required**
- `enable-gutenberg-blocks`: Sets the blocks that should be available for the project in child theme `config/global-variables/blocks.php`. 🔒**required**
- `enqueue-scripts-styles`: Enqueus our scripts and styles. REQUIRED!! You can also deregister any unneeded plugin scripts/styles here. 🔒**required**
- `flex-layout-system`: Hooks for the Flex Layout System extension for Gutenberg. 🔒**required**
- `flexlayout-meta-boxes`: Hooks for the Flex Layout System extension for Gutenberg related to meta boxes.
- `nav-walker`: Custom Nav Walker with custom markup for nested menu items. Use as when outputting a menu `'walker' => new Nav_Walker_Nav_Menu,` 👍🏻**recommended**
- `register-nav-menus`: Registers and enables 2 default menus, editable via admin. Add/edit menus in `flexlayout-child/global-variables/nav-menus.php` 🔒**required**
- `site-logo`: Adds site logo to customizer. 🔒**required**
- `theme-setup`: Adds featured image to posts/pages and automatic rss links to the head. 🔒**required**
- `Utils.class.php`: Creates a php templating class for easily including components with options on pages. 🔒**required**
- `year-shortcode.php`: Shortcode for outputting current year on front end. 👍🏻**recommended**

#### Child Theme
Config files: `/flexlayout-child/config/theme-configs`
- `author-slug`: Customize the slug for author pages (ie change "author" to "team").
- `custom-post-types`: Create and register custom post types (CPT) and custom taxonomies.
- `disable-tax-archive`: In some instances a Custom Taxonomy will NOT require an archive page. Enable config to disable custom tax archive.
- `load-more`: Function load more content via AJAX. Can be customized to suit project needs. Requires `load-more.js`. 👍🏻**recommended**
- `geotarget`: A function for redirecting users based on location. Requires WPML & WP Engine Geo IP. Can be customized for specific countries and parameters.
- `password-protection`: Markup for password protected page password form. 
- `wpml-language-switcher`: Custom language switcher for WPML. Requires WPML.

### Theme Includes
Config files: `config/theme-includes`
- `error-404`: Output for user generated 404 page message. Text edited via Global Settings. 🔒**required**
- `google-tag-manager-body`: Adds Google Tag Manager to the theme. Included in `header.php`. Requires an ACF field called `gtm_ID`. 🔒**required**
- `google-tag-manager-header`: Adds Google Tag Manager to the theme. Included in `header.php`. Requires an ACF field called `gtm_ID`. 🔒**required**
- `facebook-pixel`: Adds Facebook Pixel to the theme. Included in `header.php`. Requires an ACF field called `facebook_pixel_id`.
- `hubspot-tracking-code`: Add the tracking code for hubspot to site header. Requires an ACF field called `hubspot_tracking_code`.
- `menu`: The code snippet for outputting a menu.  Use `Utils::render_template()` and set `menuLocation` to the desired menu location.
- `meta-tags`: Code to create OG meta tags, meta description and title tags based on page info OR overridden by ACF Social Media Settings. Included in `header.php`. 🔒**required**
- `pinterest-verify`: Adds Pinterest Business ID to verify website. Requires an ACF field called `pinterest_id`. Included in `header.php`. 
- `svg-sprite`: Adds the compiled SVG Sprite to the site. Included in `header.php`. 🔒**required**
- `svg`: Template for outputting an SVG on the front end. Used by `svg-sprite.php` 🔒**required**
- `typekit`: Template for outputting a Typekit embed code on the front end. Only required if using Typekit. 

Created 12/4/2018 by okadots for ATTCK
Updated 5/28/2019 by okadots for ATTCK


