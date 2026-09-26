---
title: 'Flora'
description: "ESP32 environmental monitoring — temperature, humidity, pressure, and three soil-moisture probes with a live web dashboard."
descriptionId: "Monitoring lingkungan ESP32 — suhu, kelembapan, tekanan, dan tiga probe kelembapan tanah dengan dasbor web langsung."
publishDate: 'Nov 01 2025'
isFeatured: true
---

[GitHub](https://github.com/dankehidayat/Flora) · [Live](https://flora.dankehidayat.my.id/)

An ESP32 station (FloraPro) reading the room and the soil — AHT20 temperature and humidity, BMP280 pressure and altitude, three soil-moisture probes, and an RTC clock — fused into a responsive Next.js dashboard that refreshes every five seconds through Blynk IoT.

## Stack

ESP32, Arduino firmware, Next.js, TypeScript, Tailwind CSS, Blynk IoT, RTC DS3231.

## Highlights

- Three soil-moisture probes with percentage gauges alongside temperature, humidity, pressure, and altitude.
- Precise RTC time synchronization with an on-page clock and 20×4 LCD status display.
- Responsive web dashboard with real-time 5-second refresh through the Blynk IoT platform.
- WiFiManager-based network configuration; full hardware bill of materials documented in the repo.
