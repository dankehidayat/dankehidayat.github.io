---
title: 'EcoOffice: Energy & Temperature Monitoring'
description: "ESP32 IoT system with dual Mamdani fuzzy logic and regression-calibrated sensors for real-time office electricity and thermal-comfort analysis."
descriptionId: "Sistem IoT ESP32 dengan dual fuzzy Mamdani dan kalibrasi regresi untuk analisis listrik & kenyamanan termal kantor secara real-time."
publishDate: 'Sep 01 2024'
isFeatured: true
---

[GitHub](https://github.com/dankehidayat/Eco-Office) · [Live dashboard](https://ipb.link/energy-temperature-monitoring-data)

Office electricity and thermal comfort watched by an ESP32 pair of eyes: a PZEM-004T power module and DHT11 sensor feed dual Mamdani fuzzy classification for real-time analysis — the Smart Office Guardian.

## Stack

ESP32, Arduino, PZEM-004T, DHT11, Blynk IoT, Google Sheets, Fuzzy Mamdani.

## Highlights

- Linear-regression calibration against an HTC-1 reference (34 paired points): 95.8% temperature and 97.7% humidity accuracy.
- Dual Mamdani engines: 8-rule thermal comfort (ASHRAE 55 / ISO 7730) and 15-rule energy classification tuned to 0–150 W office loads (Economical / Normal / Wasteful).
- Blynk dashboard plus Google Sheets logging with derived power-quality score, energy-cost estimation, and voltage-stability tracking.
- 5-mode rotating 16×2 LCD; on-device WiFiManager configuration via the "EcoOffice" access point.
