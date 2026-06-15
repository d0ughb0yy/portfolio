---
title: Daily Bugle
description: Exploiting Joomla SQL injection to get admin access, then using template modification for RCE, and yum for root.
date: 2024-01-22
ctfPlatform: TryHackMe
difficulty: hard
tags: [Linux, Joomla, SQLi, yum, sudo]
---
## Overview

A CentOS machine running Joomla 3.7.0 CMS. This box demonstrates SQL injection vulnerabilities in older CMS versions, lateral movement through credential reuse, and sudo permission abuse.

![Joomscan Output](/images/ctf/daily_bugle/joomscan_output.png)

## Initial Access

Using joomscan, I discovered the target was running Joomla 3.7.0, which is vulnerable to a well-known SQL injection vulnerability (CVE-2017-8917).

![GitHub Exploit](/images/ctf/daily_bugle/github_exploit.png)

I found a working PoC on GitHub that extracted the admin hash from the database.

![Hash Cracking](/images/ctf/daily_bugle/hash_cracking.png)

After cracking the password, I logged into the Joomla admin panel. To get a reverse shell, I modified the error.php template to include a PHP reverse shell.

![Templates](/images/ctf/daily_bugle/templates_exploit.png)
![Shell Upload](/images/ctf/daily_bugle/shell_edit.png)
![Shell Connect](/images/ctf/daily_bugle/shell_connect.png)

## Privilege Escalation

I performed lateral movement to user `jjameson` by finding credentials in the Joomla configuration file - the same password was reused for the system user.

![Credential Exposure](/images/ctf/daily_bugle/credentials_in_configuration.png)
![Lateral Move](/images/ctf/daily_bugle/lateral_move.png)

For root, I found that jjameson had sudo permissions on yum, which can be exploited using GTFobins techniques.

![Sudo Permissions](/images/ctf/daily_bugle/sudo_permissions.png)
![GTFObins Exploit](/images/ctf/daily_bugle/gtfo_privesc.png)
![Root](/images/ctf/daily_bugle/root.png)

## Key Takeaways

- Older CMS versions often have critical, well-documented vulnerabilities
- Credential reuse between applications and system users is common
- Always check sudo permissions - yum abuse is a classic technique
