---
title: Mr. Robot
description: A WordPress box inspired by the Mr. Robot TV series. Key lessons include credential enumeration, WP plugin exploitation, and SUID binary abuse.
date: 2024-01-20
ctfPlatform: TryHackMe
difficulty: medium
tags: [Linux, WordPress, Nmap, SUID, Hashcat]
---
## Overview

A Linux machine running WordPress 4.3.1, inspired by the Mr. Robot TV series. This box teaches valuable lessons about enumerating hidden files, credential reuse, and exploiting SUID binaries.

![Nmap Scan](/images/ctf/mr-robot/nmap_scan.png)

## Initial Access

The robots.txt file revealed two interesting entries - the first flag and a large dictionary file called `fsocity.dic`.

![Robots.txt](/images/ctf/mr-robot/robots.png)
![Dictionary File](/images/ctf/mr-robot/dict.png)

After removing duplicates from the dictionary, I used the forgot password page to enumerate valid usernames with ffuf, discovering that "elliot" was a valid user.

![Username Enumeration](/images/ctf/mr-robot/possible_username.png)

Using wpscan with the sorted dictionary, I brute-forced the WordPress login and found the password for Elliot. After logging into the admin panel, I crafted a malicious WordPress plugin and uploaded it to get a reverse shell.

![Malicious Plugin Setup](/images/ctf/mr-robot/malicious_plugin_setup.png)
![Plugin Upload](/images/ctf/mr-robot/plugin_upload.png)
![Initial Foothold](/images/ctf/mr-robot/initial_foothold.png)

## Privilege Escalation

In robot's home directory, I found a file named `password.raw-md5` containing an MD5 hash. Using hashcat with the dictionary from robots.txt, I cracked the hash to get robot's password.

![Hash Crack](/images/ctf/mr-robot/hash_crack.png)
![Robot User](/images/ctf/mr-robot/user_robot_flag.png)

For privilege escalation, I noticed nmap had a SUID bit set. Using nmap's interactive mode, I was able to spawn a root shell.

![SUID Nmap](/images/ctf/mr-robot/SUID_nmap_privesc.png)
![Root Shell](/images/ctf/mr-robot/root_privesc.png)

## Key Takeaways

- Always check robots.txt for hidden information
- WordPress admin access can lead to easy reverse shells via plugin uploads
- SUID binaries are a common privilege escalation vector - always check them
