---
title: "Japanese Input with Mozc + Fcitx5 on Arch Linux (Wayland + Hyprland)"
excerpt: "A simple guide to setting up Japanese input on Arch Linux using Fcitx5 and Mozc. Good for anyone who needs reliable Japanese typing for study, work, or communication."
publishDate: "Apr 18 2025"
tags:
  - Linux
  - Japanese Input
  - Arch Linux
---

Setting up Japanese input on Linux can feel a bit confusing at first, especially if you’re new to the ecosystem. When I first tried writing Japanese on Arch Linux, I bounced between different input managers and configurations before finding a setup that “just works.” So in this guide, I’ll walk you through how to get **Mozc + Fcitx5** working smoothly on **Arch Linux with Wayland (Hyprland)** — the same setup I use daily.

While these steps are for Arch (and distros that use pacman, like EndeavourOS or Manjaro), you can still apply the general idea on other distributions. The only part that changes is the package manager:

* **Debian/Ubuntu:** `apt install fcitx5-mozc`
* **Fedora:** `dnf install fcitx5-mozc`
* **openSUSE:** `zypper install fcitx5-mozc`

Everything else — configuration, environment variables, and Mozc settings — works similarly.

## 1. Install the Required Packages

Let’s start with the essentials. Install Fcitx5, Mozc, and the config tools:

```
sudo pacman -S fcitx5 fcitx5-configtool fcitx5-qt fcitx5-mozc-ut
```

This gives you the input manager (Fcitx5), the Japanese engine (Mozc), plus the UI tools to configure everything.

## 2. Set Up Environment Variables

Next, your system needs to know that Fcitx5 is the input method framework you’ll be using. Add these lines to your shell config (`~/.zshrc`, `~/.bashrc`, or `~/.profile`):

```
export GTK_IM_MODULE="fcitx"
export QT_IM_MODULE="fcitx"
export XMODIFIERS=@im=fcitx
```

Then apply the changes:

```
source ~/.zshrc   # or source ~/.bashrc / ~/.profile
```

A quick log-out and log-in will ensure everything loads properly.

## 3. Configure Fcitx5

Now that Fcitx5 is installed, it’s time to make Mozc your Japanese input method.

1. Open **fcitx5-configtool**.
2. Click **+** to add a new input method.
3. Uncheck **“Only Show Current Language”** so Japanese engines appear.
4. Search for **Mozc** and add it.
5. Remove any input methods you don’t want, like “Keyboard - English.”

At this point, Fcitx5 should appear in your system tray or panel.

## 4. Enable Japanese Input

Here’s the fun part — switching languages.

By default, you can toggle between English and Japanese using:

**`Ctrl + Space`**

Try typing *nihongo* and you should see:

**にほんご**

If that works, you’re officially ready to type Japanese anywhere on your system.

## 5. Optional: Install Themes for Fcitx5

If you want your input menu to look a bit nicer (especially if you use Hyprland with a themed setup), there are some great community skins.

With `yay` installed, you can grab them like this:

```
# Dark theme
yay -S fcitx5-skin-fluentdark-git

# Light theme
yay -S fcitx5-skin-fluentlight-git

# Material Color theme
yay -S fcitx5-material-color
```

Then apply the theme:

Right-click the Fcitx5 tray icon → **Configure** → **Addons** → **Classic UI** → Choose your skin.

## 6. Customize Mozc

Mozc itself has plenty of customization options. You can access them by:

Right-click Fcitx5 tray icon → **Mozc Settings**

From here, you can tweak:

* your input mode
* key mappings
* dictionary behavior
* suggestion style
* punctuation preferences

Make it feel natural for your workflow.

## Troubleshooting Tips

Here are a few common issues you might run into:

### **Fcitx5 isn’t starting**

Add it to autostart in your DE/WM.
For Hyprland users, you can add:

```
exec-once = fcitx5 &
```

### **Input doesn’t work in some apps**

Some Electron apps (like VS Code or Discord) need Wayland flags enabled:

Add these flags to their `.desktop` file:

```
--enable-features=UseOzonePlatform --ozone-platform=wayland
```

After that, Japanese input should work normally.

## All Set!

Once everything is installed, configured, and themed the way you like, you’ll have a smooth and reliable Japanese input experience on Arch Linux. Whether you're studying Japanese, chatting with friends, or writing notes, this setup is dependable and lightweight — perfect for daily use.

If you want me to prepare the frontmatter + content together in a single file, just say **“assemble it”** and I’ll package the whole blog post neatly.
