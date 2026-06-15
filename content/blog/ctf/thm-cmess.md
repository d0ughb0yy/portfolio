---
title: CMesS
description: Subdomain enumeration lead to credential exposure in Gila CMS, and tar wildcard exploitation for root.
date: 2024-02-18
ctfPlatform: TryHackMe
difficulty: medium
tags: [Linux, GilaCMS, Subdomain, Wildcard, Tar, CVE]
---
## Overview

A Ubuntu machine running Gila CMS where the initial access path involved subdomain enumeration to find exposed credentials, and privilege escalation exploited a tar wildcard vulnerability in a cron job.

## Port Scan

![Nmap Scan](/images/ctf/cmess/nmap_scan.png)

## Initial Access

I performed subdomain fuzzing against the target and discovered a `dev` subdomain containing internal chat logs.

![Subdomain Fuzzing](/images/ctf/cmess/subdomain_fuzz.png)

In these logs, I found plaintext credentials for the Gila CMS admin panel.

![Credentials Found](/images/ctf/cmess/cred_leak.png)

Using the credentials `andre@cmess.thm:KPFTN_f2yxe%`, I logged into the CMS admin panel at `/admin`.

![CMS Admin Login](/images/ctf/cmess/cms_admin_login.png)

The File Manager feature allowed me to upload a PHP reverse shell, which I accessed through the `/assets` directory.

![Assets Directory](/images/ctf/cmess/assets_dir.png)

![Shell Connection](/images/ctf/cmess/shell_connect.png)

## Privilege Escalation

Linpeas revealed credentials in a hidden file under `/opt/`.

![Password File](/images/ctf/cmess/password_file.png)

Logging in as user `andre`, I found a cron job running as root that archived files using tar with a wildcard.

![Crontab](/images/ctf/cmess/crontab.png)

By creating specially crafted filenames (`--checkpoint=1` and `--checkpoint-action=exec=sh shell.sh`), I was able to execute arbitrary commands as root when the tar command ran.

![Real User](/images/ctf/cmess/real_user.png)

![Root Flag](/images/ctf/cmess/root.png)

## Key Takeaways

- Subdomain enumeration can reveal internal applications and exposed credentials
- Always check for cron jobs running with elevated privileges
- Tar wildcard injection is a classic Linux privesc technique - always look for it when you see wildcarded tar commands in cron jobs
