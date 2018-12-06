## GET STARTED
1. Install [WordPress](https://wordpress.org/download/) and copy the "boilerplate" theme to `wp-content/themes`
2. Copy `.env`, `.gitignore` and `wp-config.php` into the WordPress root
3. Go to https://api.wordpress.org/secret-key/1.1/salt/ and get new Authentication Unique Keys and Salts. Paste the generated snippet into `lines 67-74` of `wp-config.php` in the WordPress root
4. Change the variables in the `.env` folder to match your local development settings. Once you have changed the variables, you will need to `restart apache`.
5. From the command line, navigate to the boilerplate theme and run `npm install`.  This will install all of the associated node modules.
6. To compile css, js and assets, run `gulp watch` from inside the boilerplate theme

## Gulp & Node
How to run and use

## Deployment
How to deploy - WPEngine instructions and generic FTP instructions

## Settings
See main README.md for detailed information on WordPress admin, config  and plugin settings.
