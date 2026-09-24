/**
 * Declares the WordPress script handles that FLEX editor code reads as `wp.*` globals.
 *
 * Most FLEX blocks use `wp.blocks`, `wp.element`, … instead of importing
 * `@wordpress/*` packages, so the dependency extraction plugin cannot see them.
 * These side-effect imports are externalized to the same globals and make the
 * build list their handles in `admin.asset.php`, so WordPress loads them before
 * the editor bundle. Converting the globals to imports is planned for WS4.
 *
 * `@wordpress/editor` is deliberately absent: it is not needed by enabled
 * blocks and loading it on the Widgets screen triggers a core notice.
 */
import '@wordpress/blocks';
import '@wordpress/components';
import '@wordpress/i18n';
import '@wordpress/block-editor';
import '@wordpress/element';
import '@wordpress/data';
import '@wordpress/compose';
import '@wordpress/hooks';
import '@wordpress/server-side-render';
