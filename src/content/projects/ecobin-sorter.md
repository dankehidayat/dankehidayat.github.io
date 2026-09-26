---
title: 'EcoBin-Sorter'
description: "IoT automatic trash bin that classifies dry, wet, and metal waste with sensors, servo gates, and a conveyor."
descriptionId: "Tempat sampah otomatis IoT yang memilah sampah kering, basah, dan logam dengan sensor, gerbang servo, dan konveyor."
publishDate: 'Feb 01 2024'
isFeatured: false
---

[GitHub](https://github.com/dankehidayat/EcoBin-Sorter)

A waste bin that decides before it swallows: on ESP32, a sensor pass classifies trash as dry, wet, or metal, then servo-controlled gates and a conveyor route each type to its compartment.

## Stack

ESP32, Arduino, IR & water/metal sensors, servo & DC motors, 20×4 LCD, WiFiManager, Blynk IoT.

## Highlights

- Classification via water and metal detection sensors; five-second analysis window before routing.
- Four IR proximity sensors track per-compartment fill levels for real-time capacity monitoring.
- 20×4 I2C LCD status display and WiFiManager access-point setup for cable-free configuration.
- Optional Blynk integration reporting compartment levels (V0–V2) for remote monitoring.
