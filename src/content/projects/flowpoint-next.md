---
title: 'FlowPoint-Next'
description: "Real-time energy monitoring dashboard with Next.js, Prisma, and Vercel Postgres, collecting data automatically from the Blynk IoT platform."
publishDate: 'Nov 01 2025'
isFeatured: true
---

[GitHub](https://github.com/dankehidayat/FlowPoint-Next) · [Live](https://flowpoint.dankehidayat.my.id/)

I run this real-time energy dashboard on Next.js 15, React 19, Prisma, and Vercel Postgres. IoT sensor readings arrive by five-minute cron from the Blynk platform and leave as Recharts trends.

## Stack

Next.js, React, Prisma, Vercel Postgres, Tailwind CSS, Recharts.

## Highlights

- Interactive Recharts dashboards with historical trends for voltage, current, power, energy, frequency, power factor, temperature, and humidity.
- Automatic data collection: a five-minute cron pulls readings from the Blynk IoT platform into Vercel Postgres.
- REST sensor API with time-range and record-limit parameters; responsive across breakpoints.
- Deployed on Vercel with Cloudflare DNS; Prisma-managed schema.
