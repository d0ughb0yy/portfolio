---
title: Weasel
description: Exploiting exposed Jupyter token via SMB, and AlwaysInstallElevated for root.
date: 2024-02-03
ctfPlatform: TryHackMe
difficulty: hard
tags: [Windows, Jupyter, WSL, AlwaysInstallElevated, SMB]
---
## Overview

A Windows machine with WSL running Jupyter Notebook. Initial access comes from an exposed token in an SMB share, with multiple privilege escalation paths.

![SMB Enumeration](/images/ctf/weasel/smbenum.png)
![Jupyter Token](/images/ctf/weasel/jupyter_token.png)

## Initial Access

The SMB share `datasci-team` was anonymously accessible and contained a file with the Jupyter token. Using this token, I logged into the Jupyter dashboard on port 8888.

![Jupyter Login](/images/ctf/weasel/token_login.png)

I modified a notebook to execute a Python reverse shell.

![Python Exploit](/images/ctf/weasel/rev_shell.png)
![Shell Connect](/images/ctf/weasel/shell_connect.png)

Inside, I found an SSH key for user `dev-datasci-lowpriv` in the home directory.

![SSH Key](/images/ctf/weasel/ssh_key.png)
![SSH to Windows](/images/ctf/weasel/ssh_to_windows.png)

## Privilege Escalation

WinPEAS revealed two privesc vectors:
1. Winlogon stored credentials
2. AlwaysInstallElevated setting enabled

![WinPEAS Creds](/images/ctf/weasel/winpeas_credentials.png)
![WinPEAS Privesc](/images/ctf/weasel/privesc_technique.png)

I used msfvenom to create a malicious MSI file and executed it using runas to get Administrator.

![Administrator](/images/ctf/weasel/administrator_user.png)

Alternatively, sudo permissions on jupyter in WSL could also be exploited.

![Alternative Privesc](/images/ctf/weasel/alternative_privesc.png)

## Key Takeaways

- Always check for exposed tokens and API keys in file shares
- AlwaysInstallElevated is a dangerous registry setting
- WSL and Windows interop provides additional attack surface
