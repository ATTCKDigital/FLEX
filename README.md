_v 3.3.0 December 18, 2019_
# FLEX (Flexible Layout Experience)
A parent theme for FLEX WordPress projects

READ [__GET_STARTED_HERE](https://github.com/ATTCKDigital/FLEX/tree/master/__GET_STARTED_HERE) BEFORE cloning!

## Theme Structure

### FLEX Theme
The FLEX theme is a parent theme that sets a varierty of default configurations and base theme files. When a new project is started, a child theme is created specific to the project. 

All changes should be made in the child theme. If a change to the parent theme is required, create a feature branch in the `FLEX` submodule and submit a pull request detailing why the change was necessary and any possible red flags or repercussions to existing FLEX projects.

### Components Structure
Components are the pieces of the theme. These pieces include such things as the nav, the footer, reusable partials (share tools, social media bar, content feeds, etc). Components are NOT part of Gutenberg Blocks.

Each component folder contains the following, specific to the component:
- markup (php file)
- sass file
- js file (if component has js aspect)
- readme.md specific to component (if needed)

See detailed README.md in [`components`[(https://github.com/ATTCKDigital/FLEX/tree/master/components)] folder.

#### Including a Component
Components can be included in any template file.

The `Utils::render_template()` function should be used to include all files.

See example of how to include a template in the README.md in `components` folder.

### Blocks
Wordpress 5.0+ uses Gutenberg as an editing interface. This interface is comprised of `blocks`.  FLEX uses a custom block system based on the row/column grid paradigm. 

The FLEX theme comes with a standard set of blocks. Per project, custom blocks can be created via ACF. See the readme in the sample child theme in the `gutenberg` folder for additional information.


### Assets
Assets include fonts, images and svgs. ~~SVGs are compiled by gulp into a global SVG file.~~ (SVG Sprite is still in development). SVGs should be used wherever possible.

### Global CSS
The `scss` folder holds all of the globally available styles for the site. Things such as grids, headline styles, layout styles, etc.

These should serve as the basis for a functioning theme. Changes should be made to the files that set parameters/vars only (colors, fonts, general typography and iconography). Some items have variables that can be changed (such as the padding and margins sass files).

### Global JS
The boilerplate theme has a variety of existing javascript functions (nav animation, parallax, scroll detection, etc). These can be leveraged from any component using ES6 import. See `Available Global JS Components` in `js` folder for detailed information on each function.


## Plugins

### Required Plugins
Advanced Custom Fields Pro - https://www.advancedcustomfields.com/ (please use the zipped version in `_GET_STARTED_HERE` as we are using a forked beta version)

ACF Local JSON Manager  - https://github.com/khromov/acf-local-json-manager

Classic Editor (for WP 5.0+) - https://wordpress.org/plugins/classic-editor/

Google XML Sitemaps - https://github.com/ATTCKDigital/flex-layout-system

### Optional Recommended Plugins (as needed per project)
Akismet - https://akismet.com/

Contact Form 7 (CF7) - https://contactform7.com/

Flamingo (required if using CF7) - https://contactform7.com/save-submitted-messages-with-flamingo/

Smashballoon Custom Twitter Feeds - https://smashballoon.com/custom-twitter-feeds

Smashballoon The Instagram Feed - https://smashballoon.com/instagram-feed/

WP Store Locator - https://wpstorelocator.co/

WPML - https://wpml.org/

## Plugin Settings/Info

### Advanced Custom Fields (ACF)
This theme uses ACF to allow for dynamic layouts as well as global settings that can be adjusted by an admin.

Download the latest version from ACF using the ATTCK login (see LastPass for login info).
_The version of ACF required for the boilerplate is still in beta and a zipped version is available in `_GET_STARTED_HERE`.  As of 3/29/19 - Version 5.8.0-beta4.1_

### ACF Local JSON Manager
This allows syncing of json files from within each ACF Block. Once installed and activated, no changes should need to be made. (Zipped file available in `_GET_STARTED_HERE/plugins`)

Once installed, a dropdown will appear in the admin (in the toolbar at the top). When you create or edit ACF fields, select the registered ACF Block from the drop down to ensure that the fields save in the correct locations. To edit or add global or non-block ACF fields, select "disable overrides".

### Classic Editor
Allows the option to use a plain WYSIWYG editor on any page, CPT or post when WordPress version is 5.0+.

### Google XML Sitemaps
Creates Google friendly sitemap for the project.

### WPML
WPML is a plugin used for creating a multilingual or multiregional site.  Requires a purchased license.

### Contact Form 7 (CF7) & Flamingo
Robust contact form plugin that allows creation of multiple forms with shortcodes. Flamingo extends the plugin to store submissions in the database

### WP Store Locator
A map plugin that creates a store locator shortcode. Find nearby retailers of a product. Requires Google API Keys.

### Smashballoon Twitter and Instagram
Customizable social media feeds.  Requires a purchased license.

### Akismet
Comment spam filter. Requires API Key and possible payment. Required if comments are enabled.

#### Global Fields (always include)
JSON files: `config/acf-configs/acf-json`
- **Site Settings** (`group_5b4cd9e72d68d.json`): Found in "Global Settings", allows the user to update globally displayed content such as address, email and social media links. These settings can be tailored to the individual project. A default set of options has been included.
- **Google Tag Manager ID** (`group_5b4cd6926e1bb.json`): Found in "Global Settings", allows the user to insert their own GTM Container ID.
- **Social Media Sharing** (`group_5b16e72af37f3.json`): Added to all posts, CPTs and pages so user can override default generated OG meta tags.

There are a few additional field groups that come with the example child theme.  These are on a project basis.

## Configs
See detailed README.md in `config` folder.

## WordPress Settings
This is _not_ a complete list of all WordPress native settings. It is a list of commonly adjusted settings relevant to the _FLEX_.

### General settings
From wp-admin: Settings > General

- Control basic site settings such as site title and description.
- Set date & time format.

### Reading settings
From wp-admin: Settings > Reading

- Set which page will function as the home page. In most cases, a "Home" page will be created and selected here. The "Posts" page can be used as a blog landing page. Ok to leave blank if unneeded.
- Set Search Engine Visibility.  This checkbox is controlled by the `WPENGINE_ACCOUNT` var in `.env` and will automatically be checked/unchecked depending on the environment.

### Media settings
From wp-admin: Settings > Media

- Set crop sizes for native WordPress crops
- Set file upload location.  This checkbox is controlled by the `admin-upload-structure.php` function file and is always enabled. If a project requires year/month folder structure, consult with Oka or Sarah.


### Permalink settings
From wp-admin: Settings > Permalinks

- Set the default behavior for permalinks. _Post name_ is recommended for SEO.
- After adding a Custom Post Type, re-save permalinks to flush permalinks cache.

### Site info
From wp-admin: Settings > Global Settings

- This settings pages is built via ACF.  To add/remove project specific settings, edit the `Site Settings` custom fields. This will create a new json file to sync from the child theme.

### Favicon
To set a favicon (what you see in browser tabs, bookmark bars, and within the WordPress mobile apps), go to Appearance > Customize > Site Identity and upload an icon to "Site Icon". Site Icons should be square and at least 512 × 512 pixels.

### Site logo
To set a site logo (appears in the default nav component), go to Appearance > Customize > Site Identity and upload an image to "Logo". 

### Site colors (Appearance > Colors)
Users have the ability to set the available colors via the admin. In most cases, the developer should set the colors via the `colors.php` global variables. As of 5/19 - changing the colors via the admin will override the colors set in the code and cannot be undone without editing the database.  In general, do not set colors via admin.



Created 12/3/2018 by okadots for ATTCK
Updated 12/18/2019 by dennisplucinik for ATTCK
