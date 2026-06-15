---
title: Blueprint
description: Exploiting an unauthenticated RCE in osCommerce 2.3.4 to gain Administrator access on a Windows 7 machine.
date: 2024-02-17
ctfPlatform: TryHackMe
difficulty: medium
tags: [Windows, osCommerce, RCE, SMB, IIS]
---
## Overview

A Windows 7 machine running an outdated osCommerce CMS on port 8080. The CMS was vulnerable to an unauthenticated RCE, which provided immediate Administrator access.

## Port Scan

```
PORT      STATE SERVICE      VERSION
80/tcp    open  http         Microsoft IIS httpd 7.5
|_http-server-header: Microsoft-IIS/7.5
|_http-title: 404 - File or directory not found.
| http-methods: 
|_  Potentially risky methods: TRACE
135/tcp   open  msrpc        Microsoft Windows RPC
139/tcp   open  netbios-ssn  Microsoft Windows netbios-ssn
443/tcp   open  ssl/http     Apache httpd 2.4.23 (OpenSSL/1.0.2h PHP/5.6.28)
|_http-title: Index of /
| http-ls: Volume /
| SIZE  TIME              FILENAME
| -     2019-04-11 22:52  oscommerce-2.3.4/
| -     2019-04-11 22:52  oscommerce-2.3.4/catalog/
| -     2019-04-11 22:52  oscommerce-2.3.4/docs/
|_
| tls-alpn: 
|_  http/1.1
|_http-server-header: Apache/2.4.23 (Win32) OpenSSL/1.0.2h PHP/5.6.28
| http-methods: 
|_  Potentially risky methods: TRACE
|_ssl-date: TLS randomness does not represent time
| ssl-cert: Subject: commonName=localhost
| Not valid before: 2009-11-10T23:48:47
|_Not valid after:  2019-11-08T23:48:47
445/tcp   open  microsoft-ds Windows 7 Home Basic 7601 Service Pack 1 microsoft-ds (workgroup: WORKGROUP)
3306/tcp  open  mysql        MariaDB (unauthorized)
8080/tcp  open  http         Apache httpd 2.4.23 (OpenSSL/1.0.2h PHP/5.6.28)
|_http-server-header: Apache/2.4.23 (Win32) OpenSSL/1.0.2h PHP/5.6.28
| http-methods: 
|_  Potentially risky methods: TRACE
|_http-title: Index of /
| http-ls: Volume /
| SIZE  TIME              FILENAME
| -     2019-04-11 22:52  oscommerce-2.3.4/
| -     2019-04-11 22:52  oscommerce-2.3.4/catalog/
| -     2019-04-11 22:52  oscommerce-2.3.4/docs/
|_
49152/tcp open  msrpc        Microsoft Windows RPC
49153/tcp open  msrpc        Microsoft Windows RPC
49154/tcp open  msrpc        Microsoft Windows RPC
49158/tcp open  msrpc        Microsoft Windows RPC
49159/tcp open  msrpc        Microsoft Windows RPC
49160/tcp open  msrpc        Microsoft Windows RPC
Service Info: Hosts: www.example.com, BLUEPRINT, localhost; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-time: 
|   date: 2025-05-30T10:50:22
|_  start_date: 2025-05-30T10:41:52
|_nbstat: NetBIOS name: BLUEPRINT, NetBIOS user: <unknown>, NetBIOS MAC: 02:ba:ce:fe:ba:b5 (unknown)
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
|_clock-skew: mean: -29m01s, deviation: 34m37s, median: -9m02s
| smb2-security-mode: 
|   2:1:0: 
|_    Message signing enabled but not required
| smb-os-discovery: 
|   OS: Windows 7 Home Basic 7601 Service Pack 1 (Windows 7 Home Basic 6.1)
|   OS CPE: cpe:/o:microsoft:windows_7::sp1
|   Computer name: BLUEPRINT
|   NetBIOS computer name: BLUEPRINT\x00
|   Workgroup: WORKGROUP\x00
|_  System time: 2025-05-30T11:50:22+01:00
```

## Initial Access

Enumeration of port 8080 revealed an osCommerce 2.3.4 installation. This version is vulnerable to an unauthenticated RCE through the `install.php` file via the `db_database` parameter.

![CMS Directory](/images/ctf/blueprint/CMS_directory.png)

I found a working exploit on Exploit-DB and executed it against the target.

![Exploit-DB Code](/images/ctf/blueprint/exploit_db_code.png)

![Exploit Execution](/images/ctf/blueprint/exploit_run.png)

This gave me a shell as Administrator.

## Post-Exploitation

Since I had Administrator access, I dumped the SAM registry hives to extract NTLM hashes for offline analysis.

![Hash Dump](/images/ctf/blueprint/hash_dump.png)

![Registry Extraction](/images/ctf/blueprint/hash_registry_extract.png)

## Key Takeaways

- Always check all open ports - 8080 often runs vulnerable applications
- Known exploits are well documented - always search Exploit-DB when you identify software versions
- On Windows, Administrator doesn't require privilege escalation - you already own the box
