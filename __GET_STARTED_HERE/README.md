# GET STARTED! (Read BEFORE cloning this repo)

## Starting a new project

### Prerequisites

Must be installed, correctly configured and up to date:
- Apache
- MySQL
- PHP
- `dotenv`

Start apache:
`sudo apachectl start`

Start MySQL:
`mysql.server start`.

### Project database

To set up your project database from the command line:

1. Login to your mysql instance:  
`mysql -u root -p`  

2. Create your database:  
`CREATE DATABASE project_name;` (Query OK, 1 row affected)

3. Grant appropriate permissions:  
`GRANT ALL on project_name.* to project_name@localhost IDENTIFIED BY 'project_name';` (Query OK, 0 rows affected)

You can do also do all the above via a GUI such as [SequelPro](https://www.sequelpro.com/) or [MySQLWorkbench](https://www.mysql.com/products/workbench/).

### Project virtual host

To set up your project virtual host:

1. Edit Apache vhosts file.  
Probably here: `/usr/local/etc/httpd/extra/httpd-vhosts.conf` (Mac)  
[Almost certainly elsewhere on Linux / Windows.]  

Sample config:  
```
<VirtualHost *:80>
    ServerAdmin email@domain.com
    DocumentRoot "/Location/Of/Project/Code/"
    ServerName local.project.com
    ErrorLog "/Location/Of/Project/Code/dev.project.com-error_log"
    CustomLog "/Location/Of/Project/Code/dev.project.com-access_log" common
    IncludeOptional "/Location/Of/Project/Code/.env"

        <Directory "/Location/Of/Project/Code/">
            Order allow,deny
            Allow from all
            Options +Indexes
            AllowOverride All
            Require all granted
        </Directory>
</VirtualHost>
```

2. Update `hosts` file to include VirtualHost domain  
Almost certainly at `/etc/hosts`  
To the end of the file add: `127.0.0.1 local.project.com` (domain used for VirtualHost)

3. Restart Apache `sudo apachectl restart`

### NEW PROJECT - Installing Wordpress and this theme 

1. Create a new github repository under ATTCKDigital if one doesn't already exist. 
2. Download [WordPress](https://wordpress.org/download/) into your project directory and add the "flexlayout" repo as a submodule in `wp-content/themes`. The theme folder (aka where the submodule repo will live *must* be called `flexlayout`). `flexlayout` is the parent theme. Leave the default wordpress themes until after you have logged into wp-admin and chosen your new theme.
3. Use **git submodules**, to add the "flexlayout" parent theme to `wp-content/themes`.  
*With ssh*: `git submodule add git@github.com:ATTCKDigital/flexlayout.git`  
*With HTTPS*: `git submodule add https://github.com/ATTCKDigital/flexlayout.git`
3. From `__GET_STARTED_HERE`, copy `.env`, `gitignore` (rename `.gitignore`), `.htaccess` and `wp-config.php` into the WordPress root
4. Go to [https://api.wordpress.org/secret-key/1.1/salt/](https://api.wordpress.org/secret-key/1.1/salt/) and get new Authentication Unique Keys and Salts. Paste the generated snippet into `lines 67-74` of `wp-config.php` in the WordPress root
5. Change the variables in the `.env` folder to match your local development settings. Once you have changed the variables, you will need to `restart apache`. From this point, you should be able to navigate to the local project url in the browser and finish the WordPress Install process. See below for description of each `.env` var.
6. Copy the `flexlayout-child` theme into the themes folder and rename the theme to a project relevant name.  Majority of the coding done will be done in the child theme. Any file added to the child theme with the same name and same path as in the parent, will override the parent; EXCLUDING existing functions.
7. Edit the WordPress `style.css` file to reflect the project specifics (`Theme Name` and `Text Domain`).
NOTE: If you have any file access denied errors, you may need to alter the flexlayout file permissions:
`chmod -Rf 644 wp-content/themes/flexlayout/`
8. Replace `screenshot.png` with a project relevant theme screenshot.
9. Go to your local install and complete the steps to install Wordpress. Login and change theme to your child theme.
10. Install required plugins (see [Plugins section](https://github.com/ATTCKDigital/flexlayout#plugins))
11. Go to Custom Fields in the admin and sync required fields (see main readme for details).
11. From the command line, navigate to the newly created CHILD theme and run `npm install`.  This will install all of the associated node modules. Also do this from the `flexlayout` theme (some modules are required to be in the same theme path).
12. To compile css, js and assets, while working run `npm run dev` from inside the CHILD theme. To run a production ready build of assets, run `npm run build`.
13. Enable/disable Gutenberg blocks and set global variables for the project.  See child theme `README.md` for details.
14. Review child theme `functions.php` and enable/disable functions needed for project.


#### .env Variables
SetEnv FLEX_DB_NAME flexlayout --> the name of your local database

SetEnv FLEX_USERNAME root --> the username of your local database

SetEnv FLEX_PASSWORD root --> the password of your local database

SetEnv FLEX_HOSTNAME 127.0.0.1 --> the host of your local database

SetEnv S3_UPLOADS_BUCKET bucket_name --> if using the S3 bucket plugin, the name of the bucket

SetEnv S3_UPLOADS_REGION bucket_region --> if using the S3 bucket plugin, the region of the bucket

SetEnv AWS_ACCESS_KEY_ID access_key --> if using the S3 bucket plugin, the AWS access key for the bucket IAM user (should be a non-admin user)

SetEnv AWS_SECRET_ACCESS_KEY secret_key --> if using the S3 bucket plugin, the AWS secret key for the bucket IAM user (should be a non-admin user)

SetEnv WPENGINE_ACCOUNT dev --> the current environment (these are based on WPEngine server variables and require the use of their variable instead of our own, see note under "WPEngine First Deployment" below). If working locally, it should be set to `dev`

SetEnv DEBUG true --> enable/disable debugging.  Debugging should only be true in  `dev` or `staging`

SetEnv url http://flexlayout.test --> local development url

SetEnv tablePrefix flexlayout_ --> database table prefix.  Change to a namespaced value, ie. `flexlayout_`.  This is a security measure.

## Webpack
Webpack is used to compile all of the site assets (fonts, theme images, javascript, css). To use
1. From the command line, navigate to the CHILD theme and run `npm install`.  This will install all of the associated node modules.
2. To compile css, js and assets for your LOCAL environment, run `npm run dev` from inside the CHILD theme
2. To compile css, js and assets for a PRODUCTION environment, run `npm run build` from inside the CHILD theme

## Deployment
# WPEngine FIRST DEPLOYMENT
WPEngine allows for git push deployment. At the moment, the parent theme submodule can NOT be pushed via this method and requires manually SFTP upload.

1. Login in to the WPEngine account and navigate to **Git Push**.
2. Add ssh key as prompted by panel. IF you have previously submitted an ssh key to WPE, it will pop up a message asking if you wish to use the same key.  This is recommended, but if desired, create a new public key for this project.
3. Run `ssh git@git.wpengine.com info` from the command line to verify set up.
4. Set up the remote as [described](https://wpengine.com/git/) in `Step 6` of this support article. `Step 7` describes how to push to the remote when you are ready.
5. Run `git remote -v` from the project repo to verify the remote is set up.
6. From the WPE Panel, create a new SFTP user.
7. Setup SFTP via your desired FTP GUI or command line.
8. Commit your changes. Push the repo to the WPE remote.
9. Run `npm run build` from your theme and copy the `dist` folder to the theme in the SFTP server.
10. Copy the contents of the `flexlayout` folder to the SFTP server in `wp-content/themes/flexlayout` (if you have `node_modules` in this folder, you can skip copying those as they are not needed on the server)
11. Copy your uploads folder to `wp-content/uploads`.
12. From the admin, go to Custom Fields and sync custom fields. Unfortunately, at this time, ACF block fields do not auto sync.  For each one, select the appropriate block from *Local JSON* drop down then go to Custom Fields > Tools and use "Import Field Groups" to upload them individually.

*Notes on SetEnv* - WPE does not allow use of an `.env` file. As some of our configurations require a value for `SetEnv WPENGINE_ACCOUNT` - we have figured out a way to get around this.  In the child `functions.php` - you will see the following lines (at the top):
```
define('WPE_PROD', ''); //define the WPEngine environments
define('WPE_STAGE', ''); //define the WPEngine environments
```
This is where you define the environment for a WPEngine server.  In most cases you will have a staging site and a production site.  The value of the variables is the name of the WPE install. Place the correct values in the `functions.php` file before you deploy to WPE. 


#WPEngine Subsequent deployments
1. Commit your changes. Push the repo to the WPE remote.
2. Run `npm run build` from your theme and copy the `dist` folder to the theme on the SFTP server.
3. If ACF changes were made -- From the admin, go to Custom Fields and sync custom fields. Unfortunately, at this time, ACF block fields do not auto sync.  For each one, select the appropriate block from *Local JSON* drop down then go to Custom Fields > Tools and use "Import Field Groups" to upload them individually.


#FTP/SFTP FIRST DEPLOYMENT
1. Run `npm run build` from your theme.
2. Setup SFTP via your desired FTP GUI or command line with credentials (ask the Producer if you do not have access to them).
3. Upload the entire repo to the server.  This can take awhile.  
4. From the admin, go to Custom Fields and sync custom fields. Unfortunately, at this time, ACF block fields do not auto sync.  For each one, select the appropriate block from *Local JSON* drop down then go to Custom Fields > Tools and use "Import Field Groups" to upload them individually.

A good tip is to upload everything but `wp-content`, then create a new folder on the server called `wp-content` and upload `plugins` and `uploads`. 

Then create a new folder `themes` and inside of that create folders for the parent theme and the child theme (named to match your project).

Copy everything BUT `node_modules` into the appropriate theme folders. (`node_modules` is a HUGE folder and is not required on a production environment).

#FTP/SFTP Subsequent deployments
1. Commit your changes. 
2. Run `npm run build` from your theme.
3. Copy the `dist` folder to the theme on the SFTP server.
4. If ACF changes were made -- From the admin, go to Custom Fields and sync custom fields. Unfortunately, at this time, ACF block fields do not auto sync.  For each one, select the appropriate block from *Local JSON* drop down then go to Custom Fields > Tools and use "Import Field Groups" to upload them individually.

## Settings
See main [README.md](https://github.com/ATTCKDigital/flexlayout) for detailed information on WordPress admin, config and plugin settings.

Created 12/3/2018 by okadots for ATTCK
Updated 5/24/2019 by okadots for ATTCK
