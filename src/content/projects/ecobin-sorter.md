---
title: 'EcoBin-Sorter'
description: "IoT automatic trash bin that classifies dry, wet, and metal waste with sensors, servo gates, and a conveyor."
publishDate: 'Feb 01 2024'
isFeatured: false
facts:
    - 'Classification by water and metal detection sensors, with a five-second analysis window before routing.'
    - 'Four IR proximity sensors track per-compartment fill levels for real-time capacity monitoring.'
    - '20×4 I2C LCD status display and WiFiManager access-point setup for cable-free configuration.'
    - 'Optional Blynk integration reporting compartment levels (V0–V2) for remote monitoring.'
---

This bin decides before it swallows: on the ESP32 a sensor pass classifies the trash as dry, wet or metal, then servo-controlled gates and a conveyor route each kind to its own compartment.
