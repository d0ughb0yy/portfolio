---
title: Relevant
description: Windows server with SMB enumeration leading to credential discovery, and Print Spoofer exploit for root.
date: 2024-01-24
ctfPlatform: TryHackMe
difficulty: medium
tags: [Windows, SMB, PrintSpoofer, MS17-010]
---
## Overview

A Windows Server 2016 machine with SMB misconfigurations and vulnerable to MS17-010 (EternalBlue). The path to root involves SMB enumeration and SeImpersonatePrivilege abuse.

![Anonymous Login](/images/ctf/relevant/smb_anonymous_enum.png)
![Share Enumeration](/images/ctf/relevant/share_enum.png)

## Initial Access

I enumerated SMB shares and found an anonymous-accessible share called `nt4wrksv` that contained a passwords.txt file with base64-encoded credentials.

![Credential Decoding](/images/ctf/relevant/passwords_file.png)

I decoded the credentials:
- Bob: `!P@$$W0rD!123`
- Bill: `Juw4nnaM4n420696969!$$$`

The SMB share was also accessible via HTTP on port 49663. Using msfvenom, I generated an ASPX reverse shell and uploaded it via SMB.

![Network Drive Exposed](/images/ctf/relevant/share_exposed_web.png)
![Generating Payload](/images/ctf/relevant/payload_generate.png)
![Shell Upload](/images/ctf/relevant/shell_upload.png)

After visiting the uploaded ASPX file, I received a shell.

![Initial Access](/images/ctf/relevant/initial_access.png)

## Privilege Escalation

Running WinPEAS revealed the user had SeImpersonatePrivilege, which can be exploited using the Print Spoofer exploit to get Administrator access.

![WinPEAS](/images/ctf/relevant/winpeas_privesc.png)
![Exploit Upload](/images/ctf/relevant/exploit_upload.png)
![Administrator](/images/ctf/relevant/administrator.png)

## Key Takeaways

- Always enumerate SMB - anonymous access can reveal sensitive files
- Base64 encoding is not security - always check for hidden credentials
- SeImpersonatePrivilege is common on Windows servers and can be exploited with Print Spoofer
