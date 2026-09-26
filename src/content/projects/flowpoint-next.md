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

Flowpoint-next, or as you may call it Flowpoint Next, is built with the Next.js framework. It was my first attempt of building a monitoring dashboard involving the internet of things, and the Blynk platform for the API communication. The reason why I used Blynk was the cost. I'm grateful that I found [iot.serangkota.go.id](http://iot.serangkota.go.id/) that provides a custom server for free for hobbyists, students, and learners, on setting up their IoT project quickly and easily. I chose Blynk because I'm a college student and renting a VPS is a no for me, even though with a VPS I can deploy my personal project with ease and without worrying my local machine to be dead if I shut down my workstation. So, it really is the prototype design for the successor project called Selene. Selene is based on the Astro JavaScript framework, and the communication between the sensors to the microcontroller to the cloud is through a VPS. Yes, this project uses a VPS, I borrow a little bit. And might relocate the project if I get notified that someday I will no longer be able to access the VPS, but that's another story.
