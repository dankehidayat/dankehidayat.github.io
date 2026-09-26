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

This is a collaboration project with my college colleague. Most of the work that involves the wiring and coding is mostly just me and one of my friends. The rest did their job, but minimal. Enough with the rant.

This involves an expensive motor to rotate the bin. I forgot the specific model though. The design itself is poorly optimized, and so heavy to move around that it takes 4 people to carry it. It's very tiring, but well. It's a prototype, and it's a lesson for me and others to reflect on the design and consider the sorting design more carefully. But the concept itself is that it is indeed work.

It can detect wet waste with a cheap raindrop sensor, metal waste with an inductive proximity sensor, and a proximity sensor to detect if an object is thrown inside the plate. When the machine detects which category it belongs to, then the bin will rotate itself to the correct category and the plate will drop itself using a 25KG/cm servo motor.
