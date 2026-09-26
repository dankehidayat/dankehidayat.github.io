---
title: 'Selene'
description: "Real-time smart energy and climate monitoring for ESP32 sensor fleets: MQTT ingestion, TimescaleDB, dual Mamdani fuzzy engines, and client-side ML forecasting."
publishDate: 'Jul 01 2026'
isFeatured: true
facts:
    - 'Dual Mamdani fuzzy engines: 15-rule energy classification (Economical / Normal / Wasteful) and a 14-rule climate engine aligned to ASHRAE 55-2020 and SNI 03-6572.'
    - 'Client-side ML forecasting ensemble of linear regression, exponential smoothing and hourly pattern matching, with horizons from 1 hour to 1 year, plus Bland-Altman analysis, box plots and decision surfaces.'
    - 'Live SSE dashboard with auth and RBAC: JWT sessions, User/Admin roles, TOTP 2FA, password reset, login history and notifications.'
    - 'OTA firmware upload and tracking for ESP32 nodes, on a parser-registry architecture with a standalone ingestor and a Caddy-gated microservices path.'
    - 'Final assignment for Computer Engineering Technology, Vocational School / IPB University.'
---

Selene is the successor of my prototype web dashboard that uses the Next JS framework. Selene uses MQTT for the communication protocol between the sensors and ESP32. Flowpoint and Selene are basically the same IoT project. I use DHT11 and PZEM-004T, which are to measure the temperature and humidity and energy measurement respectively. It's a hybrid technology of a 'federated data' implementation and a monorepo. It's not perfect, but it works. This project will still receive more update support, mostly on the UI and UX.

I forgot to mention that this dashboard has RBAC, and as an admin I can upload my .bin file from the compiled Arduino source code via On-The-Air update. And for the MQTT dashboard, I use EMQX. It's quite nice and easy to navigate.

In the future project, when I have some extra budget, I will create a weather station that involves: wind speed, wind direction, temperature & humidity (obviously), and lux detection for luminance in case the weather is about to get cloudy or sunny. It would be great if I can collaborate with the local mayor to implement it, and of course support me by funding the project, and collaborate with other intelligent college students.
