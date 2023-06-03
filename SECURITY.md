# Security Policy

## Supported Versions

Temporarily there are no supported release as the project is still under construction.
As soon as the first release reaches stability we'll update the current page

| Version | Supported          |
| ------- | ------------------ |
| main    | ✔️ |

## Reporting a Vulnerability

Vulnerabilities should be communicated via email to security[at]override[dot]sh.
Reports not following the proper definition won't be handled.

### Vulnerability reporting definition

#### Subject
**Requirements**
- Must contain the [latest Mitre Att&ck](https://attack.mitre.org/#) code of the thechnique used and the full name of the vulnerability.
- Must contain the reporting date

**Example**
| Subject | Accepted |
| --- | :---: |
| [2023-01-24] [T1222] File and Directory Permissions Modification | ✔️ |
| [T1222.001] [2023-02-07] File and Directory Permissions Modification: Windows File and Directory Permissions Modification | ✔️ |
| File and Directory Permissions Modification | ❌ |
| [T1222] File and Directory Permissions Modification | ❌ |
| [2023-02-07] File and Directory Permissions Modification | ❌ |
| 2023-01-24 T1222 File and Directory Permissions Modification | ❌ |

#### Body
**Requirements**
- Must contain a full list of attachments of the email
- Must contain a fully working and reproducible POC
- Must be completely detailed in its description 
- Must contain a full description of the testing environment

**Example**
```
Attachments:
- Pic-1.png
- POC.py
- .env

Environment:
- Debian 10 - 64 bit
- 6Gb ram

<The most detailed possible description here>
```
