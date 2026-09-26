---
title: 'HydroleVI: Water Level Monitoring Control System'
description: "Three-tier water level monitoring with siren alerts, offline LCD, and a Laravel team site."
publishDate: 'Aug 01 2023'
isFeatured: false
facts:
    - 'Real-time mobile monitoring and an offline LCD for locations without a network.'
    - 'Ultrasonic sensors and warning-indicator electronics.'
    - 'Laravel collaboration site for project documentation and team coordination.'
---

This project is a collaboration with the Cikoneng waterfall owner in Leuwiliang, outside of Bogor city. It took more than an hour from the Bogor city and 2 hours from my own place. It was a very tiring project because I have to go there for surveying the sensor location placement. Quite unfortunate, the website that served the monitoring was taken down by one of my friends. In a nutshell, there are 3 cables. Why 3 cables, you ask? We initially used the raindrop sensor for the detection, but then we experimented that an exposed wire is able to detect the height of the water surface level. So we just tied it down with a zip tie. There are 3 levels: safe, warning, danger. The owner of that place told us that when the rain is heavy, the water level can be worrying and dangerous. Even we were terrified that the pole support might get carried away. It's been many years since we last checked them though, so we don't know our project's condition there. Anyhow, resuming our last explanation for how the system works, we have 3 very bright LEDs to let the owner of the place see the severity of the water. Once it hit the dangerous level, the LED turns red and turns on a siren alarm quite loud that the folks below the area can hear the sound. The sound is disabled for every 15 minutes. I forgot if we have the cooldown system when it passes 15 minutes, since my job task is building the web design for the team behind the project.
