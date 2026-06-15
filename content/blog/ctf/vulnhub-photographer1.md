---
title: Photographer
description: Exploiting Koken CMS with credential guessing via SMB, and PHP SUID for root.
date: 2024-02-05
ctfPlatform: VulnHub
difficulty: medium
tags: [Linux, Koken, SMB, PHP, SUID]
---
## Overview

An Ubuntu 16.04 machine running Koken CMS on port 8000. Initial access comes from SMB credential guessing, and privilege escalation uses PHP SUID.

![SMB Enum](/images/ctf/photographer1/smb_enum_and_login.png)
![Password Hint](/images/ctf/photographer1/mail_file.png)

## Initial Access

The SMB share was accessible anonymously and contained an email hint: "Don't forget your secret, my babygirl ;)" - this pointed to the password for the Koken admin panel.

![Koken Login](/images/ctf/photographer1/koken_log_in.png)

Koken 0.22.24 is vulnerable to an authenticated file upload vulnerability. I renamed a PHP reverse shell to .jpg, intercepted the upload request with Burp, and renamed it back to .php.

![Koken Vulnerability](/images/ctf/photographer1/request_file_rename.png)
![Listener Setup](/images/ctf/photographer1/listener_setup.png)
![Initial Access](/images/ctf/photographer1/initial_access.png)

## Privilege Escalation

Running LinPEAS revealed `/usr/bin/php7.2` had a SUID bit set. This PHP binary doesn't drop elevated privileges.

![SUID Binaries](/images/ctf/photographer1/suid_binaries.png)

Using the GTFObins technique for PHP SUID, I spawned a root shell.

![Privilege Escalation](/images/ctf/photographer1/root.png)

## Key Takeaways

- Email hints and SMB shares can reveal credentials
- CMS file upload vulnerabilities often require bypass techniques
- SUID PHP binaries are extremely dangerous
