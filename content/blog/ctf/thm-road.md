---
title: Road
description: Web application vulnerability leading to admin account takeover, and LD_PRELOAD exploitation for root.
date: 2024-01-26
ctfPlatform: TryHackMe
difficulty: medium
tags: [Linux, Web, PHP, MongoDB, LD_PRELOAD]
---
## Overview

A Linux machine running a custom PHP web application with multiple vulnerabilities. The path to root involves IDOR, file upload bypass, and LD_PRELOAD exploitation.

![Nmap Scan](/images/ctf/road/nmap_scan.png)

## Initial Access

The web application allowed user registration. After registering, I found a password reset functionality that was vulnerable to IDOR - by intercepting the request and changing the email parameter to admin@sky.thm, I could reset the admin's password.

![Home Page](/images/ctf/road/home_page.png)
![Registration](/images/ctf/road/registration.png)
![Admin Reset](/images/ctf/road/admin_reset.png)

As admin, I could upload profile pictures. The server didn't properly validate file types, allowing me to upload a PHP reverse shell.

![Shell Upload](/images/ctf/road/shell_upload.png)
![Image Location](/images/ctf/road/images_location.png)
![Shell Execute](/images/ctf/road/shell_exec.png)

Inside, I found MySQL credentials in a PHP file, but found plain-text credentials for user `webdeveloper` in a MongoDB backup database.

![Internal Ports](/images/ctf/road/internal_ports.png)
![MySQL Creds](/images/ctf/road/mysql_creds.png)
![MongoDB Creds](/images/ctf/road/mongodb_creds.png)

I used these credentials to SSH into the machine.

![SSH Login](/images/ctf/road/ssh_login.png)

## Privilege Escalation

The user `webdeveloper` had sudo permissions on `sky_backup_utility` with LD_PRELOAD enabled in env_keep. I wrote a shared library that spawns a shell and compiled it.

![Sudo Output](/images/ctf/road/sudo_output.png)
![Compiling](/images/ctf/road/privesc_flow.png)
![Root](/images/ctf/road/root.png)

## Key Takeaways

- IDOR vulnerabilities in password reset functions are critical
- Always check for database credentials in application files
- LD_PRELOAD with sudo is a powerful privesc technique
