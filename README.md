# ATTCK Boilerplate
A boilerplate theme for ATTCK WordPress projects

See the README in `__GET_STARTED_HERE` to get started on your project!

## Theme Structure

### Components Structure
Components are the pieces of the theme.  Each component folder contains the following, specific to the component:
- markup (php file)
- sass file
- js file (if component has js aspect)
- readme.md specific to component
- acf field generator (the fields specific to the component are generated via this file)

See detailed README.md in `components` folder.

### Assets
Assets include fonts, images and svgs. SVGs are compiled by gulp into a global SVG file. SVGs should be used wherever possible.

### Global CSS
The `scss` folder holds all of the globally available styles for the site. Things such as grids, headline styles, layout styles, etc. 

These should serve as the basis for a functioning theme. Changes should be made to the files that set parameters/vars only (colors, fonts, general typography and iconography). Some items have variables that can be changed (such as the padding and margins sass files). 

### Global JS
The boilerplate theme has a variety of existing javascript functions (nav animation, parallax, scroll detection, etc). These can be leveraged from any component using ES6 impoprt. See `Available Global JS Components` below for detailed information on each function.

See detailed README.md in `components` folder.

## Plugins

### Required Plugins
Advanced Custom Fields Pro - https://www.advancedcustomfields.com/
Classic Editor (for WP 5.0+) - https://wordpress.org/plugins/classic-editor/

### Optional Plugins (as needed per project)
WPML - https://wpml.org/
List of plugins

## Plugin Settings/Info
### Advanced Custom Fields (ACF)
This theme uses ACF to allow for dynamic layouts as well as global settings that can be adjusted by an admin.

Download the latest version from ACF using the ATTCK login (see LastPass for login info).

### Classic Editor
Allows the option to use a plain WYSIWYG editor on any page, CPT or post when WordPress version is 5.0+.

### WPML
WPML is a plugin used for creating a multilingual or multiregional site.  Requires a purchased license. 

#### Global Fields (always include)
JSON files: `config/acf-configs/acf-json`
- **Site Settings** (`group_5b4cd9e72d68d.json`): Found in "Global Settings", allows the user to update globally displayed content such as address, email and social media links. These settings can be tailored to the individual project. A default set of options has been included. 
- **Google Tag Manager ID** (`group_5b4cd6926e1bb.json`): Found in "Global Settings", allows the user to insert their own GTM Container ID. 
- **Social Media Sharing** (`group_5b16e72af37f3.json`): Added to all posts, CPTs and pages so user can override default generated OG meta tags. 
- **Site Logo** (`group_5c06cd1fa1248.json`): Found in "Global Settings", allows user to upload 2 logo versions.

## Configs
See detailed README.md in `config` folder.

## WordPress Settings
This is _not_ a complete list of all WordPress native settings. It is a list of commonly adjusted settings relevant to the _boilerplate_.

### General settings
From wp-admin: Settings > General

- Control basic site settings such as site title and description. 
- Set date & time format.

### Reading settings
From wp-admin: Settings > Reading

- Set which page will function as the home page. In most cases, a "Home" page will be created and selected here. The "Posts" page can be used as a blog landing page. Ok to leave blank if unneeded.
- Set Search Engine Visibility.  Should be checked until site is made live.

### Media settings
From wp-admin: Settings > Media

- Set crop sizes for native WordPress crops
- Set file upload location.  RECOMMENDED: Uncheck "_Organize my uploads into month- and year-based folders_"


### Permalink settings
From wp-admin: Settings > Permalinks

- Set the default behavior for permalinks. _Post name_ is recommended for SEO. 
- After adding a Custom Post Type, re-save permalinks to flush permalinks cache.

### Site info 
From wp-admin: Global Settings > Site Settings

- Globally available contact and social media info.

### Favicon
To set a favicon (what you see in browser tabs, bookmark bars, and within the WordPress mobile apps), go to Appearance > Customize > Site Identity and upload an icon to "Site Icon". Site Icons should be square and at least 512 × 512 pixels.

### Site logo
Allows user to upload 2 logo versions.

### Site colors
WIP



Created 12/3/2018 by okadots for ATTCK
