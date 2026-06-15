---
title: "VulnNet: Active"
description: Exploiting Redis to capture NTLM hashes, and GPO abuse for domain admin.
date: 2024-02-01
ctfPlatform: TryHackMe
difficulty: hard
tags: [Windows, Redis, NTLM, GPO, BloodHound]
---
## Overview

A Windows Server 2019 machine with Redis exposed and Active Directory. The path to root involves Redis exploitation, NTLM hash capture, and GenericWrite permissions to a GPO.

## Initial Access

Redis was running without a password on port 6379. Using the Redis `EVAL` command, I could execute Lua code to make SMB requests to my Responder server, capturing the NTLM hash of user `enterprise-security`.

![Redis SMB Request](/images/ctf/vulnnet-active/redis_smb_request.png)

After cracking the hash with hashcat, I used the credentials to access SMB and found a PowerShell scheduled task script. I modified it with a reverse shell and uploaded it back.

![Shell Upload](/images/ctf/vulnnet-active/shell_upload_connect.png)

## Privilege Escalation

I used SharpHound to gather Active Directory data for BloodHound analysis.

![Sharphound Enum](/images/ctf/vulnnet-active/sharphound_upload_execute.png)

BloodHound revealed the user had GenericWrite permissions to a GPO, which can be exploited to add ourselves to the Local Administrators group.

![BloodHound](/images/ctf/vulnnet-active/bloodhound_privesc_data.png)

Using SharpGPOAbuse, I added the user to the Administrators group and got system access.

![GPO Exploit](/images/ctf/vulnnet-active/GPO_exploit.png)
![System Flag](/images/ctf/vulnnet-active/system_flag.png)

## Key Takeaways

- Redis can be used to capture NTLM hashes via SMB relay
- GenericWrite to GPO is a powerful AD privilege escalation vector
- BloodHound is essential for AD post-exploitation
