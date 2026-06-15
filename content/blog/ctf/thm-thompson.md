---
title: Thompson
description: Exploiting verbose Tomcat error messages for credentials, and cron job abuse for root.
date: 2024-01-28
ctfPlatform: TryHackMe
difficulty: easy
tags: [Linux, Tomcat, Cron, WAR, SUID]
---
## Overview

A Ubuntu machine running Apache Tomcat 8.5.5 with default credentials exposed through verbose error messages. The privilege escalation path involves a writable cron job script.

![Cred Leak](/images/ctf/thompson/cred_leak.png)

## Initial Access

The Tomcat Manager application on port 8080 leaked default credentials through an error message: `tomcat:s3cret`

![Tomcat Login](/images/ctf/thompson/manager_login.png)
![Tomcat Dashboard](/images/ctf/thompson/manager_dashboard.png)

I generated a WAR reverse shell using msfvenom and uploaded it through the Manager App.

![Upload Shell](/images/ctf/thompson/upload_shell.png)
![Payload Execute](/images/ctf/thompson/execute_payload.png)
![Shell Connection](/images/ctf/thompson/initial_access.png)

## Privilege Escalation

In the user jack's home directory, I found a cron job running `id.sh` as root every minute. The script was writable, so I added a command to set the SUID bit on /bin/bash.

![Jack's Directory](/images/ctf/thompson/jack_home.png)
![Crontab](/images/ctf/thompson/crontab.png)
![Privilege Escalation](/images/ctf/thompson/privesc.png)
![Root Shell](/images/ctf/thompson/root.png)

## Key Takeaways

- Verbose error messages can leak sensitive information
- Always check for cron jobs and their file permissions
- Setting SUID on bash is a quick way to escalate privileges
