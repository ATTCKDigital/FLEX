# CHILD THEME

## How to change global variables
There are several global variables that can be overridden from the child theme.  Some can be overridden through the WordPress admin, others can via the child theme code. 

### Blocks
To add or enable an ACF block, you must edit the following file in the child theme: `config/global-variables/blocks.php`.  

#### Notes on ATTCK Extend Gutenberg
This plugin has a block called "Row". This is a parent block and the foundation of Flex. It is a block that allows inner blocks - these inner blocks are a core and ACF blocks who have a parent of "Row".  They are only available inside of the "Row" block. 

Additionally, all core blocks have been extended to have a column number selector. A column number selector should also be available in all ACF blocks.

#### blocks.php
Gutenberg allows for the whitelisting of blocks.  The `blocks.php` file in `config/global-variables` contains the whitelist of blocks. 

Only blocks that are whitelisted will appear in the editor. A default set has been provided, add acf created blocks to this list to enable them in the editor. If a core block is not needed, it can be removed from the list to disable it.

You must also register the new block.  Add the new block function path to the `$registerBlocks` array.

(See the `blocks.php` file for details)

#### register-acf-blocks.php
This file registers your newly created block.  This will allow you to add the necessary custom fields for new blocks. 


### Colors
The boilerplate theme comes with a set of default colors used for typography and backgrounds. You can either change the colors via the admin or update them in the child theme in `config/global-variables/colors.php`.  Adding additional items to the array will add additional color options to the theme and the admin.

### Nav Menus
Some projects will require more than the default available admin editable menus. To add additional menus or change the names of existing, edit `config/global-variables/nav-menus.php`

okatodo:
## How to create or override a component
## How to add/enable/disable functions
## How to create a new ACF block (more detailed than the info in the components readme)