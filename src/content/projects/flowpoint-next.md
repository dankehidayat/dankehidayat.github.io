---
title: 'FlowPoint-Next'
description: "Real-time energy monitoring dashboard with Next.js, Prisma, and Vercel Postgres, collecting data automatically from the Blynk IoT platform."
publishDate: 'Nov 01 2025'
isFeatured: true
facts:
    - 'Recharts trends across voltage, current, power, energy, frequency, power factor, temperature and humidity.'
    - 'A five-minute cron pulls readings from the Blynk platform into Vercel Postgres.'
    - 'REST sensor API with time-range and record-limit parameters; responsive across breakpoints.'
    - 'Deployed on Vercel with Cloudflare DNS; Prisma-managed schema.'
---

Flowpoint-next, or as you may call it Flowpoint Next, is built with the Next.js framework. It was my first attempt at building a monitoring dashboard involving the internet of things, with Blynk handling the API communication. The reason I used Blynk was the cost.

I'm a college student, and renting a VPS was a no for me, even though with a VPS I can deploy my personal project with ease and without worrying that my local machine would be dead the moment I shut down my workstation. What made it workable was [iot.serangkota.go.id](http://iot.serangkota.go.id/), which hands out a free custom server for hobbyists, students and learners, so anyone can set up an IoT project quickly and easily. I'm grateful I found it.

So this really is the prototype design for the successor project called Selene. Selene is based on the Astro JavaScript framework, and the communication from the sensors to the microcontroller to the cloud goes through a VPS. Yes, this project uses a VPS, I borrow a little bit, and I might relocate the whole thing if I get notified someday that I will no longer be able to access it. But that's another story.
