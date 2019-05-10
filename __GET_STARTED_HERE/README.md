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
    ServerName dev.project.com
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
To the end of the file add: `127.0.0.1 dev.project.com` (domain used for VirtualHost)

3. Restart Apache `sudo apachectl restart`

### NEW PROJECT - Installing Wordpress and this theme 

okatodo: add instructions about how to work with an existing project
git clone --recurse-submodules https://github.com/ATTCKDigital/attck-flexlayout.git

1. Download [WordPress](https://wordpress.org/download/) into your project directory and add the "flexlayout" as a submodule in `wp-content/themes`
2. Use **git submodules**, to add the "flexlayout" theme to `wp-content/themes`.  
*With ssh*: `git submodule add git@github.com:ATTCKDigital/flex-layout.git`  
*With HTTPS*: `git submodule add https://github.com/ATTCKDigital/flex-layout.git`
The child theme folder *must* be named  `flexlayout`.
3. From `__GET_STARTED_HERE`, copy `.env`, `gitignore` (rename `.gitignore`), `.htaccess` and `wp-config.php` into the WordPress root
4. Go to https://api.wordpress.org/secret-key/1.1/salt/ and get new Authentication Unique Keys and Salts. Paste the generated snippet into `lines 67-74` of `wp-config.php` in the WordPress root
5. Change the variables in the `.env` folder to match your local development settings. Once you have changed the variables, you will need to `restart apache`. From this point, you should be able to navigate to the local project url in the browser and finish the WordPress Install process. See below for description of each `.env` var.
6. From the command line, navigate to the flexlayout PARENT theme and run `npm install`.  This will install all of the associated node modules. 
7. To compile css, js and assets, run `npm run dev` from inside the flexlayout PARENT theme
8. Copy the `flexlayout-child` theme into the themes folder and rename the theme to a project relevant name.  Majority of the coding done will be done in the child theme. Any file added to the child theme with the same name as in the parent, will override the parent; EXCLUDING existing functions.
9. Edit the WordPress `style.css` file to reflect the project specifics.
10. Replace `screenshot.png` with a project relevant theme screenshot.
11. Enable/disable Gutenberg blocks and set global variables for the project.  See child theme `README.md` for details.
12. Review child theme `functions.php` and enable/disable functions needed for project.


#### .env Variables
SetEnv FLEX_DB_NAME flexlayout --> the name of your local database
SetEnv FLEX_USERNAME root --> the username of your local database
SetEnv FLEX_PASSWORD root --> the password of your local database
SetEnv FLEX_HOSTNAME 127.0.0.1 --> the host of your local database
SetEnv S3_UPLOADS_BUCKET bucket_name --> if using an S3 bucket, the name of the bucket
SetEnv S3_UPLOADS_REGION bucket_region --> if using an S3 bucket, the region of the bucket
SetEnv AWS_ACCESS_KEY_ID access_key --> if using an S3 bucket, the AWS access key for the bucket IAM user (should be a non-admin user)
SetEnv AWS_SECRET_ACCESS_KEY secret_key --> if using an S3 bucket, the AWS secret key for the bucket IAM user (should be a non-admin user)
SetEnv WPENGINE_ACCOUNT dev --> the current environment (these are based on WPEngine server variables, requires an adjustment if using another host). If working locally, it should be set to `dev`
SerEnv DEBUG true --> enable/disable debugging.  Debugging should only be true in  `dev` or `staging`
SetEnv url http://flexlayout.test --> local development url
SetEnv tablePrefix flexlayout_ --> database table prefix.  Change to a namespaced value, ie. `flexlayout_`.  This is a security measure.

### Ideas for improvements to set up process

1. Install script? Included in this folder is one that could be adapted for more generic use. (See `vhosts-attck.sh`)
2. Maybe even better, a Docker image?

## Webpack
Webpack is used to compile all of the site assets (fonts, theme images, javascript, css). To use
1. From the command line, navigate to the flexlayout PARENT theme and run `npm install`.  This will install all of the associated node modules.
2. To compile css, js and assets, run `npm run dev` from inside the boilerplate PARENT theme

## Deployment
How to deploy - WPEngine instructions and generic FTP instructions
- I.e., `git push production master`

## Settings
See main README.md for detailed information on WordPress admin, config  and plugin settings.
