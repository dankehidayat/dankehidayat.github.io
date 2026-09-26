---
title: 'Selene'
description: "Real-time smart energy and climate monitoring for ESP32 sensor fleets: MQTT ingestion, TimescaleDB, dual Mamdani fuzzy engines, and client-side ML forecasting."
publishDate: 'Jul 01 2026'
isFeatured: true
---

[GitHub](https://github.com/dankehidayat/Selene) · [Live](https://selene.dankehidayat.my.id/)

Selene is what I built after FlowPoint-Next: an energy and climate dashboard for ESP32 fleets. PZEM-004T and DHT11 nodes publish telemetry over MQTT (EMQX), a Fastify-on-Bun monolith lands it in a TimescaleDB hypertable, and a React SPA reads it over SSE.

## Stack

React, TypeScript, Fastify (Bun), PostgreSQL, TimescaleDB, MQTT (EMQX), Docker, Caddy.

## Highlights

- Dual Mamdani fuzzy engines: 15-rule energy classification (Economical / Normal / Wasteful) and 14-rule climate engine aligned to ASHRAE 55-2020 and SNI 03-6572.
- Client-side ML forecasting ensemble of linear regression, exponential smoothing, and hourly pattern matching, with horizons from 1 hour to 1 year, plus Bland-Altman analysis, box plots, and decision surfaces.
- Live SSE dashboard with auth and RBAC: JWT sessions, User/Admin roles, TOTP 2FA, password reset, login history, and notifications.
- OTA firmware upload and tracking for ESP32 nodes; parser-registry architecture with a standalone ingestor and a Caddy-gated microservices path.
- Built as the final assignment for Computer Engineering Technology, Vocational School / IPB University.
