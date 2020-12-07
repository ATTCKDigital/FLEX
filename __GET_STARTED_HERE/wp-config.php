<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
// define('DB_NAME', 'edens');
define('DB_NAME', $_SERVER['FLEX_DB_NAME']);

/** MySQL database username */
// define('DB_USER', 'root');
define('DB_USER', $_SERVER['FLEX_USERNAME']);

/** MySQL database password */
// define('DB_PASSWORD', '');
define('DB_PASSWORD', $_SERVER['FLEX_PASSWORD']);

/** MySQL hostname */
// define('DB_HOST', 'localhost');
define('DB_HOST', $_SERVER['FLEX_HOSTNAME']);

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

//// Set URL Defaults so database is independent of environment. (Does not affect absolute URLs set in post content)
// define('WP_HOME', 'http://dev.edens.com');
define('WP_HOME', $_SERVER['url']);
// define('WP_SITEURL', 'http://dev.edens.com');
define('WP_SITEURL', $_SERVER['url']);

define('S3_UPLOADS_BUCKET', $_SERVER['S3_UPLOADS_BUCKET']);
define('S3_UPLOADS_KEY', $_SERVER['AWS_ACCESS_KEY_ID']);
define('S3_UPLOADS_SECRET', $_SERVER['AWS_SECRET_ACCESS_KEY']);
define('S3_UPLOADS_REGION', $_SERVER['S3_UPLOADS_REGION']);


define('WP_POST_REVISIONS', 3);

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '');
define('SECURE_AUTH_KEY',  '');
define('LOGGED_IN_KEY',    '');
define('NONCE_KEY',        '');
define('AUTH_SALT',        '');
define('SECURE_AUTH_SALT', '');
define('LOGGED_IN_SALT',   '');
define('NONCE_SALT',       '');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = $_SERVER['tablePrefix'];

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', $_SERVER['DEBUG']);
define('WP_DEBUG_LOG', true);
@ini_set('display_errors',0);

define( 'AUTOMATIC_UPDATER_DISABLED', true );
define( 'WP_MEMORY_LIMIT', '256M' );

//remove p tags from cf7
define('WPCF7_AUTOP', false );

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
  define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
