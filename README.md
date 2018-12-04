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

#### Available Components
List of base components

#### Adding components
##### How to "enable" existing components

##### How to "add" new component

### Assets
Assets include fonts, images and svgs. SVGs are compiled by gulp into a global SVG file. SVGs should be used wherever possible.

### Global CSS
The `scss` folder holds all of the globally available styles for the site. Things such as grids, headline styles, layout styles, etc. 

These should serve as the basis for a functioning theme. Changes should be made to the files that set parameters only (colors, fonts, general typography and iconography). Some items have variables that can be changed (such as the padding and margins sass files). 

### Global JS
The boilerplate theme has a variety of existing javascript functions (nav animation, parallax, scroll detection, etc). These can be leveraged from any component using ES6 impoprt. See `Available Global JS Components` below for detailed information on each function.

#### Available Global JS Components
List of global js

### Naming Conventions
- Component Folders: `component_component-name`
- Component Markup: `component_component-name.php`
- Component SCSS: `_component_component-name.scss`
- Component JS: `_component_component-name.js`
- Component ReadMe: `README_component_component-name.md`
- Component ACF: `component_acf_component-name.php`

## Required Plugins
Advanced Custom Fields Pro - https://www.advancedcustomfields.com/
List of plugins

## Plugin Settings
### Advanced Custom Fields (ACF)
This theme uses ACF to allow for dynamic layouts as well as global settings that can be adjusted by an admin.

#### Global Fields (always include)
- Site Settings (`group_5b4cd9e72d68d.json`): Found in "Global Settings", allows the user to update globally displayed content such as address, email and social media links. These settings can be tailored to the individual project. A default set of options has been included. 
- Google Tag Manager ID (`group_5b4cd6926e1bb.json`): Found in "Global Settings", allows the user to insert their own GTM Container ID. 
- Social Media Sharing (`group_5b16e72af37f3.json`): Added to all posts, CPTs and pages so user can override default generated OG meta tags. 


## Configs
These options can be enabled/disabled in `functions.php`

### ACF Configs (`config/acf-configs`)
- `acf-json`: Folder where the ACF json files are stored and synced from *_required_*
- `acf-css`: Customize the ACF user facing css
- `acf-field-values`: Allows creation of predefined select/radio button options if specific field names are being used
- `acf-options-page`: Enables a custom settings page in the admin interface *_required_*
- `acf-row-names`: Displays specific field names in the collapsed state of the layout tool *_recommended_*
- `acf-sync`: Syncs ACF fields across environments based on the json files. Does NOT override individual component ACF field files. *_required_*
- `acf-wpml-options`: Creates a globalized ACF output so that settings entered into "Global Settings" for the default language can be used universally.

### Admin Configs (`config/admin-configs`)
- `change-post-labels`: In some instances, "Posts" will need to be renamed. This file allows for that.
- `image-crops`: Set custom crop sizes and custom default Featured Image size. Image will be cropped as defined on upload. 

### Theme Configs (`config/theme-configs`)
- `constants`: Sets some global PHP constants
- `google-tag-manager-body`: Adds Google Tag Manager to the theme. Included in `header.php`. *_required_*
- `google-tag-manager-header`: Adds Google Tag Manager to the theme. Included in `header.php`. *_required_*
- `svg-sprite`: Adds the compiled SVG Sprite to the site. Included in `header.php`. *_required_*



## WordPress Settings
### General settings
### Reading settings
### Media settings
### Discussion settings
### Permalink settings
### Privacy settings

### Site info (address, email, social media urls, etc)
### Favicon
To set a favicon (what you see in browser tabs, bookmark bars, and within the WordPress mobile apps). To add a custom Favicon, go to Appearance > Customize > Site Identity and upload an icon to "Site Icon". Site Icons should be square and at least 512 × 512 pixels.

### Site logo
### Site colors





Created 12/3/2018 by okadots for ATTCK
