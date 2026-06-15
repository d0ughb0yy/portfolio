---
title: Billing
description: Exploiting CVE-2023-30258 in MagnusBilling to gain access, then leveraging fail2ban sudo permissions for privilege escalation.
date: 2024-02-16
ctfPlatform: TryHackMe
difficulty: medium
tags: [Linux, CVE, Asterisk, Fail2ban, sudo]
---
## Overview

A Linux machine running MagnusBilling, an open-source VoIP billing system. This box demonstrates how a known CVE can lead to initial access, and how sudo misconfigurations on monitoring tools can lead to root.

## Port Scan

```
PORT     STATE SERVICE  VERSION
22/tcp   open  ssh      OpenSSH 8.4p1 Debian 5+deb11u3 (protocol 2.0)
| ssh-hostkey: 
|   3072 79:ba:5d:23:35:b2:f0:25:d7:53:5e:c5:b9:af:c0:cc (RSA)
|   256 4e:c3:34:af:00:b7:35:bc:9f:f5:b0:d2:aa:35:ae:34 (ECDSA)
|_  256 26:aa:17:e0:c8:2a:c9:d9:98:17:e4:8f:87:73:78:4d (ED25519)
80/tcp   open  http     Apache httpd 2.4.56 ((Debian))
| http-title:             MagnusBilling        
|_Requested resource was http://10.10.1.211/mbilling/
|_http-server-header: Apache/2.4.56 (Debian)
| http-robots.txt: 1 disallowed entry 
|_/mbilling/
3306/tcp open  mysql    MariaDB 10.3.23 or earlier (unauthorized)
5038/tcp open  asterisk Asterisk Call Manager 2.10.6
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

## Initial Access

The MagnusBilling installation was vulnerable to CVE-2023-30258, which allows command injection through the icepay module. I captured the request using Burp Suite and injected a reverse shell payload.

![Burp Request Capture](/images/ctf/billing/req_capture.png)

This gave me access as the `asterisk` user.

![Reverse Shell](/images/ctf/billing/rev_shell_payload.png)

## Privilege Escalation

The `asterisk` user had sudo permissions to run `/usr/bin/fail2ban-client`.

![Sudo Permissions](/images/ctf/billing/asterisk_sudo_perms.png)

By examining the fail2ban-client help menu, I found an interesting technique:

1. Update the actionban command to set the SUID bit on `/bin/bash`
2. Ban any IP address to trigger the action
3. Execute `/bin/bash -p` to get a root shell

![Privilege Escalation](/images/ctf/billing/privesc_command.png)

![Root Flag](/images/ctf/billing/root.png)

## Key Takeaways

- Always check for known CVEs when you identify software versions
- Monitoring tools like fail2ban can be dangerous when given sudo access without proper restrictions
- Don't rely on metasploit - understanding the underlying exploit is more valuable
