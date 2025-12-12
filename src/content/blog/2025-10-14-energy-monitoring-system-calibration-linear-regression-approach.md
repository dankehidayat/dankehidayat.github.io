---
title: "Energy Monitoring System Calibration: Linear Regression Approach for Sensor Accuracy"
excerpt: "A practical look at calibrating DHT11 sensors using linear regression to improve temperature and humidity accuracy for energy monitoring systems."
publishDate: "Oct 14 2025"
tags:
  - IoT
  - Data Analysis
  - Sensor Calibration

---


When I first started working on my energy monitoring system, I knew I needed accurate temperature and humidity data. The whole point was to feed reliable numbers into HVAC optimization, so the system could cool or heat efficiently without wasting energy.

The problem? I was using DHT11 sensors.

They’re cheap and easy to use, but their readings can drift quite a bit. To make the system trustworthy, I needed to calibrate them against a more reliable reference device—in this case, the HTC-1.

## Why Calibration Was Needed

After comparing the raw DHT11 readings to the HTC-1, the gap was immediately obvious. Temperature was off by several degrees, humidity by double digits. In an energy system, those errors stack up fast and can throw off the whole optimization logic.

Before calibration, the readings were roughly:

- Temperature error around **4°C**
- Humidity error around **14%**
- Noticeable negative bias, especially in temperature
- Large maximum spikes in both measurements

These numbers clearly weren’t good enough for a system meant to save energy.

## How I Collected the Data

To calibrate the sensors properly, I logged readings from both the DHT11 and the HTC-1 at the same time for about nine hours. The data covered different parts of the day so I could see how the sensors behaved as the room warmed up or cooled down.

In total, I collected 19 sets of paired readings. Temperatures ranged from the mid-23s to the upper-27s, and humidity shifted from around 46% up to the low 70s. Plenty of variation to build a decent calibration model.

## Using Linear Regression for Calibration

Instead of using a complex model, I chose a simple linear regression approach. The goal was to find a line that corrected each DHT11 reading so it lined up with the reference values.

I built one regression model for temperature and another for humidity. Each model produced two numbers: a slope and an intercept. With those, I could turn a raw DHT11 value into a calibrated one.

The nice part about this approach is that it’s light enough to run on small embedded systems, but still accurate enough for real-world monitoring.

## What the Calibration Achieved

Once I applied the calibration models, the difference was dramatic.

### Temperature improvements:
- Average error dropped from **3.84°C** to **0.80°C**
- Maximum error went from almost **5°C** to around **1.4°C**
- The results lined up much more cleanly with the reference readings

### Humidity improvements:
- Average error dropped from **14.18%** to **1.15%**
- Maximum error shrank to roughly **2%**
- Much smaller bias and far better consistency across the range

Overall, temperature accuracy improved by nearly **80%** and humidity accuracy by over **90%**. For a low-cost sensor, that’s a huge upgrade.

## The Code Behind It

Here’s a simplified version of the calibration class I used in Python:

```python
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

class SensorCalibrator:
    def __init__(self):
        self.temp_model = LinearRegression()
        self.humidity_model = LinearRegression()

        # Coefficients from regression analysis
        self.temp_coef = 1.343379812
        self.temp_intercept = -7.688931392
        self.humidity_coef = 0.914240883
        self.humidity_intercept = 5.127226491

    def calibrate_temperature(self, raw_temp):
        return self.temp_coef * raw_temp + self.temp_intercept

    def calibrate_humidity(self, raw_humidity):
        return self.humidity_coef * raw_humidity + self.humidity_intercept

    def evaluate_calibration(self, raw_readings, reference_readings):
        calibrated = [self.calibrate_temperature(t) for t in raw_readings]

        mae = mean_absolute_error(reference_readings, calibrated)
        r2 = r2_score(reference_readings, calibrated)

        return {
            'mae': mae,
            'r2': r2,
            'calibrated_readings': calibrated
        }
````

A quick example:

```python
calibrator = SensorCalibrator()
raw_temp = 25.0
calibrated_temp = calibrator.calibrate_temperature(raw_temp)
print(f"Raw: {raw_temp}°C → Calibrated: {calibrated_temp:.2f}°C")
```

## Visualizing the Results

When I plotted the calibrated values against the HTC-1 readings, the improvement was easy to see. The points followed a clean line, and the scatter tightened compared to the raw data. Both temperature and humidity behaved far more predictably.

This level of accuracy makes a big difference for energy applications—every degree and every percentage counts.

## Where This Helps in Energy Monitoring

With the sensors now calibrated, the system can:

1. Control HVAC equipment more precisely
2. Detect occupancy patterns from environmental changes
3. Analyze energy consumption more reliably
4. Flag unusual temperature or humidity shifts for early maintenance

With the errors reduced so much, the entire energy monitoring system becomes far more trustworthy.

## Final Thoughts

Linear regression turned out to be a simple but highly effective way to calibrate low-cost sensors. It:

* Sharply reduced temperature and humidity errors
* Was fast enough to run on embedded hardware
* Produced easy-to-understand calibration rules
* Improved the overall performance of my energy monitoring setup

Next, I’m planning to explore non-linear calibration and automatic recalibration, especially to handle aging sensors or changes in environmental conditions.