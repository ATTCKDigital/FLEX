# GET STARTED

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
`CREATE DATABASE database_name;`  

3. Grant appropriate permissions:  
`GRANT ALL on database_name.* to database_name@localhost IDENTIFIED BY 'database_name';`

You can do also do all the above via a GUI such as [MySQLWorkbench](https://www.mysql.com/products/workbench/).

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

### Installing Wordpress and this theme

1. Install [WordPress](https://wordpress.org/download/) in your project directory and copy the "boilerplate" theme to `wp-content/themes`
2. Install necessary plugins (see list in main README.md)
3. Copy `.env`, `.gitignore` and `wp-config.php` into the WordPress root
4. Go to https://api.wordpress.org/secret-key/1.1/salt/ and get new Authentication Unique Keys and Salts. Paste the generated snippet into `lines 67-74` of `wp-config.php` in the WordPress root
5. Change the variables in the `.env` folder to match your local development settings. Once you have changed the variables, you will need to `restart apache`.
6. From the command line, navigate to the boilerplate PARENT theme and run `npm install`.  This will install all of the associated node modules.
7. To compile css, js and assets, run `gulp watch` from inside the boilerplate PARENT theme
8. Copy the boilerplate-child theme into the themes folder.  Majority of the coding done will be done in the child theme. Any file added to the child theme with the same name as in the parent, will override the parent; EXCLUDING existing functions.
9. Edit the WordPress `style.css` file to reflect the project specifics.
10. Replace `screenshot.png` with a project relevant theme screenshot.
11. Enable/disable Gutenberg blocks and set global variables for the project.  See child theme `README.md` for details.
12. Review child theme `functions.php` and enable/disable functions needed for project.

### Ideas for improvements to set up process

1. Install script? Included in this folder is one that could be adapted for more generic use. (See `vhosts-attck.sh`)
2. Maybe even better, a Docker image?

## Gulp & Node
How to run and use

## Deployment
How to deploy - WPEngine instructions and generic FTP instructions

## Settings
See main README.md for detailed information on WordPress admin, config  and plugin settings.
