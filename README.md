# ATTCK Boilerplate
A boilerplate theme for ATTCK WordPress projects

See the README in `__GET_STARTED_HERE` to get started on your project!

## Theme Structure
### Assets
Assets include fonts, images and svgs. SVGs are compiled by gulp into a global SVG file. SVGs should be used wherever possible.

### Components Structure
Components are the pieces of the theme.  Each component folder contains the following, specific to the component:
- markup (php file)
- sass file
- js file (if component has js aspect)
- readme.md specific to component
- acf field generator (the fields specific to the component are generated via this file)

### Global CSS
The `scss` folder holds all of the globally available styles for the site. Things such as grids, headline styles, layout styles, etc. 

These should serve as the basis for a functioning theme. Changes should be made to the files that set parameters only (colors, fonts, general typography and iconography). Some items have variables that can be changed (such as the padding and margins sass files). 

### Global JS
The boilerplate theme has a variety of existing javascript functions (nav animation, parallax, scroll detection, etc). These can be leveraged from any component using ES6 impoprt. See `Available Global JS Components` below for detailed information on each function.

## Naming Conventions
Component Folders: `component_component-name`
Component Markup: `component_component-name.php`
Component SCSS: `_component_component-name.scss`
Component JS: `_component_component-name.js`
Component ReadMe: `README_component_component-name.md`
Component ACF: `component_acf_component-name.php`

## Available Global JS Components
List of global js

## Availale Components
List of base components

## Required Plugins
Advanced Custom Fields Pro - https://www.advancedcustomfields.com/
List of plugins

## Gulp & Node
How to run and use

## Deployment


## Global Settings
### GTM
### Hubspot
### Site info (address, email, social media urls, etc)
### Favicon
### Site logo
### Site colors

Created 12/3/2018 by okadots for ATTCK
