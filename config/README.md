## Configs
These options can be enabled/disabled in `functions.php`

### ACF Configs (`config/acf-configs`)
- `acf-css`: Customize the ACF user facing css
- `acf-field-values`: Allows creation of predefined select/radio button options if specific field names are being used
- `acf-json`: Folder where the ACF json files are stored and synced from 🔒**required**
- `acf-options-page`: Enables a custom settings page in the admin interface 🔒**required**
- `acf-row-names`: Displays specific field names in the collapsed state of the layout tool 👍🏻**recommended**
- `acf-search`: Extend WordPress search to include custom fields 👍🏻**recommended**
- `acf-sync`: Syncs ACF fields across environments based on the json files. Does NOT override individual component ACF field files. 🔒**required**
- `acf-wpml-options`: Creates a globalized ACF output so that settings entered into "Global Settings" for the default language can be used universally.

### Admin Configs (`config/admin-configs`)
- `change-post-labels`: In some instances, "Posts" will need to be renamed. This file allows for that.
- `image-crops`: Set custom crop sizes and custom default Featured Image size. Image will be cropped as defined on upload. 👍🏻**recommended**
- `admin-wysiwyg`: Set predefined styles and colors in TinyMCE. Edit as needed for project. 👍🏻**recommended**
- `sidebars`: Register our sidebars and widgetized areas.

### Theme Configs (`config/theme-configs`)
- `constants`: Sets some global PHP constants
- `custom-nav-classes`: Customize the "current" menu item class.
- `custom-post-types`: Create and register custom post types (CPT) and custom taxonomies.
- `disable-tax-archive`: In some instances a Custom Taxonomy will NOT require an archive page. Enable config to disable custom tax archive.
- `geotarget`: A function for redirecting users based on location. Requires WPML & WP Engine Geo IP. Can be customized for specific countries and parameters
- `nav-walker`: Custom Nav Walker with custom markup for nested menu items. Use as when outputting a menu `'walker' => new Nav_Walker_Nav_Menu,` 👍🏻**recommended**
- `wpml-language-switcher`: Custom language switcher for WPML. Requires WPML.

### Theme Includes
- `google-tag-manager-body`: Adds Google Tag Manager to the theme. Included in `header.php`. 🔒**required**
- `google-tag-manager-header`: Adds Google Tag Manager to the theme. Included in `header.php`. 🔒**required**
- `hubspot-tracking-code`: Add the tracking code for hubspot to site header. Requires an ACF field called `hubspot_tracking_code` and uncommenting in `header.php`
- `og-tags`: Code to create OG meta tags based on page info OR overridden by ACF Social Media Settings. Included in `header.php`. 🔒**required**
- `svg-sprite`: Adds the compiled SVG Sprite to the site. Included in `header.php`. 🔒**required**
- `svg`: Template for outputting an SVG on the front end. 