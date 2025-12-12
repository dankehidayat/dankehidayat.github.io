---
title: Automating Calibration and Report Generation with Google Colab
excerpt: A hands-on look at comparing DHT11 and HTC-1 sensors, calibrating them with data-driven methods, and automating a full scientific report using Python, Fuzzy Logic, and LaTeX inside Google Colab.
publishDate: 'Oct 17 2025'
tags:
  - IoT
  - Data Analysis
  - Automation
---

When I first compared my DHT11 sensor with an HTC-1, I thought it would be a quick check. It didn’t take long for the project to grow into a full workflow: data collection, calibration, fuzzy logic, and an auto-generated PDF report built right inside Google Colab.

This post walks through how that happened and how automation made the whole process easier to repeat.

## Why I Did This

Temperature and humidity matter a lot in tropical workspaces. Low-cost sensors like the DHT11 are popular, but their readings often drift. I wanted to see how far off it was from an HTC-1 and whether calibration could bring it closer.

Doing everything in Google Colab kept the workflow simple and reproducible.

## Collecting the Data

Both sensors sat next to each other in a naturally ventilated office in Indonesia. I recorded two sets of data:

- Before calibration  
- After calibration  

The readings spanned several hours of typical office activity to capture natural changes in temperature and humidity.

## Running the Analysis in Colab

I loaded the data and used Python tools to measure how different the DHT11 was from the HTC-1. Metrics like average error and deviation helped show how inaccurate the DHT11 was before calibration and how much it improved afterward.

### Regression and Agreement

I also ran a basic regression analysis to see how well the two sensors aligned. A Bland–Altman comparison helped check consistency and bias between the readings.

After calibration, the DHT11 tracked the HTC-1 far more closely. The difference was easy to see in the plots.

## Calibration Results

Before calibration, the DHT11 showed noticeable offsets in both temperature and humidity. After calibration, the readings were much closer to the reference values.

For a low-cost sensor, the improvement was impressive and made the results far more usable.

## Adding Fuzzy Mamdani Logic

Numbers are helpful, but I also wanted a human-readable interpretation of comfort. So I built a simple Fuzzy Mamdani model that classified readings into Cold, Comfortable, or Hot based on tropical conditions.

The results showed that most measurements fell into the Comfortable range, which matched the actual feel of the room.

## Auto-Generating a LaTeX Report

Once everything worked, I used the `pylatex` library to automatically generate a full scientific-style PDF. The script built the sections, inserted the text, and added figures straight from Colab.

Here’s the basic structure I used:

```python
from pylatex import Document, Section

doc = Document("Scientific_Thermal_Comfort_Report")

with doc.create(Section("Results and Discussion")):
    doc.append("This section presents the calibration outcomes and fuzzy logic analysis performed in Colab.")

doc.generate_pdf(clean_tex=False)
````

I saved the file directly to Google Drive so it was easy to share after each run.

## Looking Back

What began as a simple test turned into a full mini-research pipeline. Automating the workflow saved time and made the entire process repeatable with new data.

It also showed that inexpensive sensors like the DHT11 can be surprisingly reliable once calibrated properly.

## Resources

* **GitHub Gist:** DHT11 & HTC-1 Calibration Script
  [https://gist.github.com/dankehidayat/1e7b296543a7aef27e711bea51d5cdd6](https://gist.github.com/dankehidayat/1e7b296543a7aef27e711bea51d5cdd6)

* **Generated PDF Report:**
  [https://drive.google.com/file/d/1Z6PtvuDW63F5cUrvonf1WnnZPhWKushy/view](https://drive.google.com/file/d/1Z6PtvuDW63F5cUrvonf1WnnZPhWKushy/view)

* **Original Post:**
  [https://dankehidayat.my.id/blog/2025-10-17-automating-calibration-report-generation](https://dankehidayat.my.id/blog/2025-10-17-automating-calibration-report-generation)