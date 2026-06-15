---
title: Wazuh SIEM Lab
description: A comprehensive guide to setting up a Wazuh SIEM lab environment with hardened Ubuntu servers, Suricata IDS integration, and DVWA for vulnerability testing
draft: false
date: 2025-12-19
tags: [Blue Team, Network Security, Log Analysis]
---
# Wazuh SIEM Lab

## Project Overview

This project demonstrates the setup of a comprehensive lab environment for testing and evaluating Wazuh SIEM functionality. The architecture consists of two hardened Ubuntu servers designed to provide a realistic security monitoring and incident response training environment.

## Key Features

### Security Hardening
- SSH key-based authentication only (password authentication disabled)
- Restricted root login capabilities
- Limited sudo access to administrative users only
- Custom administrative user accounts replacing defaults

### SIEM Server Components
- **Wazuh Manager**: Centralized log collection and analysis
- **Elasticsearch**: Scalable search and analytics engine
- **Kibana**: Powerful data visualization dashboard
- **Filebeat**: Lightweight shipper for forwarding logs

### Client Server Components
- **Apache Web Server**: Hosting the vulnerable application
- **DVWA (Damn Vulnerable Web Application)**: Intentionally vulnerable web app for security testing
- **Suricata IDS**: Network intrusion detection system
- **Wazuh Agent**: Lightweight endpoint security monitoring

## Detailed Configuration

### SIEM Server Setup
The SIEM server configuration focuses on creating a secure foundation for the Wazuh platform:

1. **SSH Hardening**: Configuration of `/etc/ssh/sshd_config` to enforce key-based authentication only
2. **User Management**: Creation of dedicated `siem-admin` user with appropriate role-based access controls
3. **Service Hardening**: Proper configuration of Wazuh components for optimal security and performance

### Client Server Configuration
The client server is configured to generate meaningful security events for monitoring:

1. **Network Monitoring**: Suricata IDS deployment for real-time network traffic analysis
2. **Log Integration**: Configuration of Wazuh agent to ingest Suricata EVÉ JSON logs
3. **Vulnerable Application**: Deployment of DVWA for controlled vulnerability testing and exploitation scenarios

## Security Monitoring Capabilities

This lab environment enables comprehensive security monitoring including:

- **Log Collection**: Centralized aggregation of system and application logs
- **File Integrity Monitoring**: Detection of unauthorized changes to critical files
- **Rootkit Detection**: Identification of hidden malicious processes and files
- **Vulnerability Detection**: Scanning for known vulnerabilities in monitored systems
- **Active Response**: Automated blocking of malicious IP addresses
- **Network Traffic Analysis**: Deep packet inspection via Suricata integration
- **Web Application Monitoring**: Tracking of HTTP requests and responses to/from DVWA

This lab provides an excellent foundation for learning SIEM concepts, practicing security monitoring techniques, and developing incident response skills in a safe, controlled environment.
