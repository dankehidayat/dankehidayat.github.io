---
title: 'EcoOffice: Energy & Temperature Monitoring'
description: "ESP32 IoT system with dual Mamdani fuzzy logic and regression-calibrated sensors for real-time office electricity and thermal-comfort analysis."
publishDate: 'Sep 01 2024'
isFeatured: true
facts:
    - 'Linear-regression calibration against an HTC-1 reference over 34 paired points: 95.8% temperature and 97.7% humidity accuracy.'
    - 'Dual Mamdani engines: an 8-rule thermal-comfort set (ASHRAE 55 / ISO 7730) and a 15-rule energy set tuned to 0–150 W office loads.'
    - 'A dashboard plus Google Sheets logging, with a derived power-quality score, an energy-cost estimate and voltage-stability tracking.'
    - 'Five-mode rotating 16×2 LCD; on-device WiFiManager setup through the "EcoOffice" access point.'
    - 'TimescaleDB as the time-series store — the sensors report every second.'
---

Eco Office is related with my Selene and Flowpoint project. It's part of my final project and final report for my requirement to graduate from my college. Still the same sensor: DHT11, PZEM-004T, and ESP32 DevKit V1.

On my initial plan, I was planning to add a relay controller to the schematic design. But I thought to myself, adding a relay on a terminal extension would just turn off the entire socket instead of the specified socket. So I went without the control system.

For this project, it was originally written to only send the sensor data to the Blynk server. But as time goes on, and especially when I finally have access to a borrowed VPS, I suddenly thought, why not implement MQTT which is more superior than Blynk? And so, I implemented the MQTT. Oh, and I also use TimescaleDB for the time-series database, since the sensor data is stored every second.
