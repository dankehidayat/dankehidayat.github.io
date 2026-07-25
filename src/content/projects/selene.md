---
title: 'Selene'
description: "Smart energy & climate dashboard: real-time IoT monitoring, dual Mamdani fuzzy engines, and ML forecasting for ESP32 sensor networks."
descriptionId: "Dashboard energi & iklim pintar: monitoring IoT real-time, dual mesin fuzzy Mamdani, dan peramalan ML untuk jaringan sensor ESP32."
publishDate: 'Jul 01 2026'
isFeatured: true
---

[GitHub](https://github.com/dankehidayat/Selene) · [Live](https://selene.dankehidayat.my.id/)

Smart Energy & Climate Dashboard: successor to FlowPoint-Next, rebuilt as a real-time monitoring and analytics platform for ESP32-based IoT sensors tracking electrical parameters and environmental conditions.

## Stack

React, TypeScript, Fastify (Bun), PostgreSQL, TimescaleDB, Docker, Caddy.

## Highlights

- Dual Mamdani fuzzy inference engines: 15-rule energy classification (Economical / Normal / Wasteful) and 14-rule ASHRAE 55 climate engine for thermal comfort.
- ML-powered 24-hour forecasting with adaptive horizons (1h to 1y), Bland-Altman analysis, box plots, decision surfaces, and membership charts.
- JWT authentication with role-based access (User / Admin), admin panel, and login history.
- Deployed with Docker and Caddy reverse proxy with automatic SSL; modular microservices direction including a standalone MQTT ingestor.
