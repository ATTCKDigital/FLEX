# CHILD THEME

## How to change global variables
There are several global variables that can be overridden from the child theme.  Some can be overridden through the WordPress admin, others can via the child theme code. 

### Blocks
Gutenberg allows for the whitelisting of blocks.  The `blocks.php` file in `config/global-variables` contains the whitelist of blocks. 
Only blocks that are whitelisted will appear in the editor.  A default set has been provided, add acf created blocks to this list to enable them in the editor.

(See the config file for details)

### Colors
The boilerplate theme comes with a set of default colors used for typography and backgrounds. You can either change the colors via the admin or update them in the child theme in `config/global-variables/colors.php`.  Adding additional items to the array will add additional color options to the theme and the admin.

### Nav Menus
Some projects will require more than the default available admin editable menus. To add additional menus or change the names of existing, edit `config/global-variables/nav-menus.php`

## How to create or override a component
## How to add/enable/disable functions