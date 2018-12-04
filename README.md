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
See detailed README.md in `config` folder.

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
