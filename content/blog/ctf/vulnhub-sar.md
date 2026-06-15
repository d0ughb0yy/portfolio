---
title: SAR
description: Exploiting sar2html RCE, and writable cron script for root.
date: 2024-02-07
ctfPlatform: VulnHub
difficulty: easy
tags: [Linux, sar2html, RCE, Cron, Python]
---
## Overview

A simple Ubuntu machine running sar2html 3.2.1, vulnerable to authenticated RCE. Privilege escalation involves a writable cron script.

## Initial Access

The web server was running sar2HTML, a system monitoring tool. This version has a known RCE vulnerability (CVE-2020-25078).

I exploited it to get a reverse shell as www-data.

## Privilege Escalation

Running enumeration revealed a cron job running every 5 minutes as root:

```bash
*/5 * * * * root cd /var/www/html/ && sudo ./finally.sh
```

The `finally.sh` script was writable by www-data, so I replaced its contents with a reverse shell command.

![Crontab](/images/ctf/sar/crontab.png)
![Exploiting](/images/ctf/sar/exploit.png)
![Root](/images/ctf/sar/root.png)

After a few minutes, the cron job executed and I received a root shell.

## Key Takeaways

- Web-based monitoring tools often have RCE vulnerabilities
- Always check cron jobs and their script permissions
- Simple misconfigurations can lead to trivial root
