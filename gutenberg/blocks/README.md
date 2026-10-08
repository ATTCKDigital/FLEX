# FLEX (Flexible Layout System): Blocks

Custom Gutenberg blocks created for the Flex Layout System.

This extension creates the row and column structure with nested inner blocks.

This plugin _should not be touched or edited_. All project specific blocks should be created using the ACF block method detailed below.

_However_, there may be a case in which a core block needs to be edited or created. See "Adding/Editing FLEX Blocks below". This requires approval and submission of a pull request.

## ACF Gutenberg Blocks

### Adding ACF Blocks

To create a new acf blocks, duplicate `blocks/blocks_template` in the child `blocks` folder and rename as per naming conventions below. Once the blocks is created, register and enable it in the child `config/global-variables/blocks.php`. (More info in `flexlayout-child/README.md`).

If an existing ACF blocks needs to be edited for the project, copy the block's folder to the child's `blocks` folder and make changes there. Changes made to this blocks in the child theme will override existing.

Do NOT edit or add native Gutenberg blocks!! If a change is required, please submit a pull request here: https://github.com/ATTCKDigital/FLEX

#### To add Front End JS to a new ACF block:

- In the block markup, on the outer most div, add `data-component-name="JSComponentName"`
- If it's an existing block, use the existing function name. If it's a new block, create a new JS file and place in the block folder.

## Adding/Editing FLEX Blocks

1. Checkout the `develop` branch from the [Flexlayout repo](https://github.com/ATTCKDigital/FLEX) and then create your own feature branch from `develop`
2. Run `npm run dev` from your child theme (this watches for changes).
3. Make changes. For the block to appear in the WordPress admin, you must add the block name to the `blocks.php` file in the `global-variables` file in either the parent or child theme (depending on the use case). You must also add it to `blocks.js` in this folder so it is compiled into the child's editor bundle.
4. Submit a pull request to `develop`. Your pr will be reviewed and either returned for fixes or approved.
5. The development team will then merge the code into `master` and tag it with a release version.

`master` will always be production ready. `develop` may contain unreleased features but should be used for ALL development.

#### Block registration: `block.json` + apiVersion 3

Newer FLEX blocks register their metadata from a per-block `block.json` (the WordPress-standard block metadata file) at **apiVersion 3**, instead of declaring `attributes`/`title`/`category` inline in both the PHP and JS. Migrated so far: batch 1 — `block_hr`, `block_source`, `block_shortcode`, `block_list`, `block_button` (FLEX v5.3.0); batch 2 — `block_paragraph`, `block_heading`, `block_image`, `block_share`, `block_animated-gif` (FLEX v5.4.0). batch 2b — `block_feed`, `block_quote` (FLEX v5.5.0). InnerBlocks/media blocks (row, column, popup, video, posts) follow later. `block_quote` is the first to flatten the shared `background-options` component (17 keys: the 15 JS/PHP-shared keys plus JS-only `backgroundImageWide` and `dataSectionId`).

The pattern, per block folder:

- **`block.json`** — `apiVersion: 3`, the unchanged `name` (`flexlayout/<x>`), `title`/`category`/`description`/`keywords`, `textdomain`, and the full flattened `attributes` object (own attributes plus the spread-in component sets: margin, padding, border, background-color, text-colors, data-component-name). `supports`/`styles` only where the block defines them. The block's render-driving defaults live here (the server render callback is the source of truth for defaults).
- **PHP** (`<x>.php`) — `register_block_type( __DIR__ . '/block.json', [ 'render_callback' => __NAMESPACE__ . '\render_<x>_block' ] );`. No `attributes` array in PHP. The `add_action('init', …)` and the `locate_template` include path are unchanged.
- **JS** (`<x>.js`) — `import metadata from './block.json';` then `registerBlockType( metadata, { icon, edit, save } );`. The `metadata` object **must** be passed so the editor client receives `apiVersion: 3`. `useBlockProps()` (from `wp.blockEditor`) is spread onto a single block-canvas root; the `edit` function is a named (PascalCase) component so the `react-hooks` lint rule accepts the hook. `save` stays `null` for these dynamic blocks.

A child theme that overrides one of these block PHP files via `locate_template` must ship its own `block.json` alongside its override (because registration reads `__DIR__ . '/block.json'`). None of the batch-1 blocks is overridden in attck2026.

#### How to use a blocks in a front end template:

Blocks will automatically be available in the Gutenberg editor if they have been added to `config/global-variables/blocks.php` in the child theme. The front end output of the block is defined in the block's php file.

#### To add Front End JS to a new FLEX block:

okatodo:

### Naming Conventions

- Block Folders: `block_block-name`
- Block Markup: `block-name.php`
- Block SCSS: `_block-name.scss`
- Block Admin SCSS: `_block-name-admin.scss`
- Block Front End JS: `_block-name.js`
- Block ReadMe: `README_block-name.md` (not required, but helpful!)
- Block ACF Fields: This file will be autogenerated with the field group ID.
- Block Register ACF Fields: `register_block-name.php`

Created 12/4/2018 by okadots for ATTCK
