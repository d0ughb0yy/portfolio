---
title: Tomghost
description: Exploiting CVE-2020-1938 (Ghostcat) to read Tomcat config files, and zip sudo abuse for root.
date: 2024-01-30
ctfPlatform: TryHackMe
difficulty: easy
tags: [Linux, Tomcat, CVE, PGP, sudo, zip]
---
## Overview

A Linux machine running Apache Tomcat vulnerable to CVE-2020-1938 (Ghostcat), allowing remote file read. Privilege escalation involves PGP decryption and sudo zip abuse.

![MSF Exploit](/images/ctf/tomghost/msf_exploit.png)

## Initial Access

The Apache AJP service on port 8009 was vulnerable to Ghostcat (CVE-2020-1938). Using the Metasploit module, I read the Tomcat web.xml file which contained credentials for user `skyfuck`.

![Initial Access](/images/ctf/tomghost/initial_access.png)

## Privilege Escalation

In skyfuck's home directory, I found a PGP encrypted file (`tryhackmerobot.asc`) and its private key. I used gpg2john to extract the hash and John the Ripper to crack it, revealing credentials for user `merlin`.

![PGP Files](/images/ctf/tomghost/pgp_files.png)
![Hash Cracking](/images/ctf/tomghost/hash_cracking.png)
![GPG Decryption](/images/ctf/tomghost/gpg_decryption.png)

As merlin, I could run `/usr/bin/zip` with sudo. Using GTFOBins, I escalated to root.

![Merlin Privesc](/images/ctf/tomghost/merlin_privesc.png)

## Key Takeaways

- Ghostcat is a critical vulnerability in Tomcat AJP
- Always check home directories for encrypted files and keys
- zip with sudo can spawn a root shell
