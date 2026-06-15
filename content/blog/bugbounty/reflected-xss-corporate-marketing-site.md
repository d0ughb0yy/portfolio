---
title: Reflected XSS in a corporate marketing site
description: A reflected XSS vulnerability was found in a lang= URL parameter
date: 2025-02-04
tags: [XSS, Reflected XSS]
---

**Report:** https://www.openbugbounty.org/reports/4021436/

While browsing through a vulnerability disclosure program, I came across a site that used a `lang=` parameter for language switching. At first I suspected it might be vulnerable to Local File Inclusion (LFI), since I had previously found a few LFIs through similar parameters.

## Digging deeper

When I passed a test value into the `lang` parameter and inspected the response, I noticed the input was being reflected directly inside the `<html>` tag itself — not in the page body or a script context.

The reflection looked something like this:

```html
<html lang="en"></html>
```

Since my input landed inside the `<html>` element's `lang` attribute, I could break out of the attribute and the tag itself using `">` and inject arbitrary HTML.

## Proof of concept

The crafted URL:
`https://www.it-v.net/?lang=en"><img src=x onerror=prompt('/OPENBUGBOUNTY/')>`

Breaking it down:

- `en"` closes the `lang` attribute value
- `>` closes the `<html>` tag
- The `<img>` tag with an `onerror` handler executes JavaScript in the browser context

This is a classic case of reflected XSS where user input is echoed into an HTML attribute without proper encoding. Simply escaping the quote character would have prevented this entirely.
