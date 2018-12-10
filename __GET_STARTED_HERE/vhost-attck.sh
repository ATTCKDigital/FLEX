#!/bin/bash
### Set Language
TEXTDOMAIN=virtualhost

### Set default parameters
projectName=$1
owner=$(who am i | awk '{print $1}')
hostFile='/etc/hosts'
vhostFile='/etc/apache2/extra/httpd-vhosts.conf'
siteFolder='/Users/okatailee/Sites/ATTCK/'
domain=$projectName.test

if [ "$(whoami)" != 'root' ]; then
	echo $"You have no permission to run $0 as non-root user. Use sudo"
		exit 1;
fi

if [ "$projectName" == "" ]; then
	echo -e $"Please provide a project name. No spaces or special characters."
	exit;
fi

if [ -d $siteFolder$projectName ]; then
	echo -e $"This project already exists.\nPlease Try Another one"
	exit;
fi

if ! [ -d $siteFolder$projectName ]; then
	### create the directory
	mkdir $siteFolder$projectName
	### give permission to root dir
	chmod 755 $siteFolder$projectName
	### write test file in the new domain dir
	if ! echo "<h1>Hello, $projectName</h1>\n<?php echo phpinfo(); ?>" > $siteFolder$projectName/index.php
	then
		echo $"ERROR: Not able to write in file $siteFolder$projectName/index.php. Please check permissions"
		exit;
	else
		echo $"Added content to $siteFolder$projectName/index.php"
	fi
fi

if ! echo "
			<VirtualHost *:80>
			    ServerName $domain
			    ServerAlias www.$domain
			    DocumentRoot $siteFolder$projectName
			    ErrorLog /private/var/log/apache2/$projectName.test-error_log
			    CustomLog /private/var/log/apache2/$projectName.test-access_log common
			    ServerAdmin web@coolestguidesontheplanet.com
			    IncludeOptional /Users/okatailee/Sites/ATTCK/$projectName/.env
			</VirtualHost>" >> $vhostFile
then
	echo -e $"There is an ERROR creating $projectName vhost entry"
	exit;
else
	echo -e $"\nNew Virtual Host Created\n"
fi

### Add domain in /etc/hosts
if ! echo "127.0.0.1	$domain	www.$domain" >> /etc/hosts
then
	echo $"ERROR: Not able to write in /etc/hosts"
	exit;
else
	echo -e $"Host added to /etc/hosts file \n"
fi

chown -R okatailee:staff $siteFolder$projectName

### restart Apache
apachectl restart

### show the finished message
echo -e $"Complete! \nYou now have a new Virtual Host \nYour new host is: http://$domain \nAnd its located at $siteFolder$projectName"

open $siteFolder$projectName
exit;