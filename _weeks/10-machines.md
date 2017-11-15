---
layout: week
title: 10 - Machines
image: /10-machines/makey-cakey.jpg
short: How to Make Almost Pancakes
published: true
order: 10
---

(Above image by [Yun](http://fab.cba.mit.edu/classes/MAS.863/CBA/people/kyungyunchoi/index.html))

This week's assignment was a group project on building multi-axis CNC machines. The CBA section decided to make a 2-axis/XY pancake making machine. Information about the entire project can be found [here](http://fab.cba.mit.edu/classes/MAS.863/CBA/machines/index.html).

## My Role: Software and UI

At the beginning of the week, we split into teams (broadly: a mechanical team, an electrical/embedded team, and a software team). I jumped on the software team hoping to play around with building a UI for the machine in collaboration with Emily (on the UI) and Agnes, Tom&aacute;s, and Pinar (on the software, broadly). Our goal was to make something in which the user could put in a greyscale image and the system would generate a series of Gcode files (one for each layer of brightness/darkness in the image), then concatenate them with a pause in between (for cooking time) and then send those down the pipe to the TinyG.

## Chilipeppr

The first thing I did was play around with [Chilipeppr](http://chilipeppr.com/) and read up on how to make widgets. At first, I was thinking that maybe the best thing to do would be to build out our own Chilipeppr widget that would do the image processing and Gcode generation and from there we could use the existing Chilipeppr interface for the rest our control needs.

However, after meeting up with Pinar, Tom&aacute;s, and Agnes over the weekend and playing around with [mods](http://mods.cba.mit.edu/), we decided that we could probably extend some existing mods and build out a few custom ones to get everything we needed.

### The Mods Squad

In thinking about how to make custom mods, I started by building a simple mod that would take multiple gcode files as input, and concatenate them together (with a user-definable 'dwell' time instruction in between) and output a single gcode file.

{% include img1.html subpath="10-machines" img="concat-gcode-mod.jpg" %}

This was a good exercise in figuring out how to write custom mods and thus how far we could push the interface toward a full pancake-making solution. As we started to build out the rest of the mods program, we discovered some other image processing things that would be useful. Agnes and Tom&aacute;s worked on extending the threshold mod into a bi-directional "bandpass" filter mod, Agnes built a image reflection mod (so we could print pancakes such that when we flip them with a spatula, the image would be the right way around), and I worked on an image inversion mod.

{% include img1.html subpath="10-machines" img="invert-mod.jpg" %}

## TinyG Mod

Once we had the image processing pipeline basically set up, I started to think about how to use mods to talk back and forth to the TinyG. The first pass of this was a very simple mod that (in conjunction with the serial mod) would allow the user to type a command in a box, send it to the TinyG, and read the TinyG's response in another box.

{% include img1.html subpath="10-machines" img="tinyg-rxtx-mod.jpg" %}

### Jog Control

Using this, I was able to set up the mod configuration and send a simple gcode commands to see the motor controllers light up happily. Win! From there, I wanted to build out a jog control so that we could move the machine around right from mods and without having to manually type move commands. This required being a little smart about how to not send a million instructions down the pipe at once and cause too many instructions to get queued such that the machine wouldn't stop jogging when you realize the jog control. This required setting up a parser to read the JSON coming back from the TinyG and only sending the next jog command after the previous one finished executing. After figuring out a simple system for that, we had a nice TinyG jogger.

{% include img1.html subpath="10-machines" img="tinyg-jog-mod.jpg" %}

### Positioning and Zeroing

Now that we could parse incoming data from the TinyG, it was straightforward to add UI for seeing the current position of the machine. The next stpe was to be able to zero the axes from the mod. This basically was as simple as finding the right Gcode instruction for zeroing each axis and hooking up some UI buttons to send those commands when pushed.

### Gcode Generation

After this, I started to think about if the gcode concatenator was really the best way to go. Generating the gcode manually from the toolpaths didn't seem that hard and would give us much more control over what happens at each step (e.g., should the batter extruder "pull back" after finising a path and moving to another part of the bed to prevent drips?). This would also give us finer control over how to handle the extruder from a software perspective, i.e., should it be a "spindle" that we can turn on and off, or should be be a third axis instead? Emily and I met up to figure out that question and combine our mods together. We also talked with Paul in LLK who used to write gcode generators for a CNC startup (!) who led us toward handling the extruder as a third axis. While Emily and Pinar got a system for generating the correct Z/extruder values in the toolpaths working, I worked on building out the Gcode generation in the TinyG mod.

{% include img1.html subpath="10-machines" img="tinyg-final.jpg" %}

## Testing

Testing was a hit and miss process. At first, a lot of what we built out worked pretty well. We were able to jog the axes around, zero the machine, and send it gcode commands to move it around the bed at different rates. We were also able to tune the configuration parameters such that 1 unit of movement in the linear axes actually corresponded to inch of physical movement of the end effector.

{% include img1.html subpath="10-machines" img="first-test.jpg" %}

(Image by [Vik](http://fab.cba.mit.edu/classes/MAS.863/CBA/people/vparth/index.html))

However, once we actually went to send a proper gcode file down the pipe, the very first move instruction kept causing the machine to rocket down to the end of its axes. After a lot of painful debugging, we figured out that somehow the scaling factor was getting messed up in the process and then file was trying to print in some giant coordinate system. We were also getting weird things happening where occasionally, the Travel per Revolution setting on the motor channels was getting set to weird values which would then cause the machine to jog either *extremely* slow or fast. We banged our heads against the wall on this one for a while, and eventually tried simply scaling down the gcode coordinates to see if that would work at all. This would kind of work for a little while, but after stopping a file, it would sometimes reset the Travel per Revolution configuration again which left us in a place where we couldn't get the machine to reliably execute.

Close, but no cigar.

## Other Contributions

Beyond the code and UI parts of the project, I also jumped in a few times on other parts (milling out the pinions, heat shrinking wires, etc.)

## ** Updates **

The morning before demoing to the class, I came into the shop just to see if I could figure out what was happening with the bizarre scaling problem. After playing around with the values, I finally realized that when the gcode was sending a G20 instruction to switch to inches units from millimeters, the internal parameters of the TinyG were updating to match. When we would then go update the parameters and restart the board, the units would switch back to mm (thus explaining why the machine was printing pancakes that were sometimes 25.4x larger and sometimes 25.4x smaller than expected). I think with a little more work on the code, we can sort this issue out and get some pancakes printing for real!

