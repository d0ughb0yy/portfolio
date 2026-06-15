---
title: Open redirect on a login request
description: An open redirect was found on a login page of a job searching application
date: 2025-01-15
tags: [Open Redirect]
---
While poking around during a login flow on a vulnerability disclosure program, I spotted an open redirect vulnerability tied to the URL= parameter.

The app was set up so that when you tried to access a protected page without being logged in, it bounced you to the login endpoint and tacked on something like ?URL=/page, a pretty standard "redirect after login" pattern. The intention was to send you back to where you were trying to go once authenticated.

But when I tested it by setting `URL=www.google.com`, the redirect tried to go to \
`https://vulnerable-host.comwww.google.com`, which of course 404'd. That told me the parameter wasn't being properly prefixed or validated meaning the app was just blindly appending whatever came in.

How the exploit could play out
The real danger shows up when an attacker registers a lookalike domain, something like vulnerable-host.com.evil-attacker[.]com (or uses more sophisticated homoglyphs/subdomain tricks).

They craft a phishing link that points to: \
`https://vulnerable-host.com/login.php?URL=https://vulnerable-host.com.evil-attacker.com/fake-login`

Because the URL starts with the legitimate domain, users are far more likely to click it, especially if it's wrapped in an email saying "Your session expired, please log in to continue" or similar social engineering.

After the victim logs in (on the real site), the app redirects them straight to the attacker's domain, where a convincing fake page can harvest credentials, install malware, or steal OAuth tokens in more advanced chains.

Even though open redirects are often rated low-to-medium severity on their own, they become high-impact when chained with phishing, credential stuffing, or bypassing referrer/origin checks in third-party integrations.
