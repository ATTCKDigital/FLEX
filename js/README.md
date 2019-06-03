# Available Global JS Components
- `admin.js`: Import gutenberg blocks and filters. Only runs in wp-admin.
- `app.js`: Import jQuery and jQuery plugins and globalize it, run css-vars-ponyfill, load component loader.
- `debug.js`: set to true temporarily to enable custom debugging tools. 
- Cached DOM Elements: returned cached element if previously used or caches upon first use.
- Client Namespace: Creates `FLEXLAYOUT.Globals` namespace.
- Elements in Viewport: manipulate a component as it is scrolled into the viewport. Defaults to fading in text elements. Requires making css changes.
- Global Events: A set of global utilities for detecting viewport size, scrolling etc.
- `load-components.js`: Loads js for components. Defaults are set in parent.  To add new js components, add them in `flexlayout-child/js/components.js`
- Load More: AJAX load more.  Customize as needed for a specific project.  Requires `theme-configs/load-more.php` to execute the query. `load-more.php` should be edited in the child and will override default parent behavior.
- Parallax: add to any component to create a parallax effect
- Scroll to: basic scroll to animation using data-anchor.

## Child theme JS Components
- `admin.js`: Import `admin.js` from parent so that it is compiled during the build.
- `app.js`: Import `components.js` and `app.js` from parent so that it is compiled during the build.
- `components.js`: add new js components
- `block-styles.js`: Some default Gutenberg blocks come with predefined style options. In many cases, these need to be changed or added to. (ie you need to remove a button style or add a subheadline style) Register or unregister styles in this file. Details on how to do so are in the file.


Updated 5/28/2019 by okadots for ATTCK