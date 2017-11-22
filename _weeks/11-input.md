---
layout: week
title: 11 - Input
image: /11-input/craft-materials-square.jpg
short: Feel the Strain
published: true
order: 11
---

This week focused on using input devices to capture readings from the physical world. In thinking toward the upcoming final project, I decided to use this week's assignment to play around with different ways of sensing force and/or pressure toward the goal of building a sensor that can trigger when a person sits on a bench.

## Fun With Foam

Before this week's class, I looked ahead toward the assignment and knowing that I wanted to sense force/pressure, I went ahead and ordered some strain gauges off of Amazon. However, after seeing Neil's example of step response sensors in class, I decided to see if I could build a simple sensor out of foam and copper tape.

{% include img1.html subpath="11-input" img="craft-materials.jpg" %}

I went for the folded over model that Neil suggested in class, which was simple enough to construct.

{% include img1.html subpath="11-input" img="folded-sensor.jpg" %}

The most difficult part (and a reminder of some of the frustrations from the FabGiantISP project) was that it's hard to solder onto copper tape. It seems like the solder resists adhering to the tape until there's a LOT of it, so it took a while (and some melting of the foam) to get the wires to stick correctly.

{% include img1.html subpath="11-input" img="soldered-foam-sensor.jpg" %}

I also finally learned how to make ribbon cable correctly! Kreg told me the secret of uses the vice grips to close the connector around the ribbon cable, so no more squeezing them (and breaking them) with pliars!

{% include img1.html subpath="11-input" img="ribbon-cable.jpg" %}

## First Board, Worst Board

In order to get up and running quickly, I decided to fabricate Neil's step response board just to see if my sensor worked at all. Making the board itself was straightforward and I was actually starting to feel proud of my soldering skills until I actually tried to plug the thing in. For some reason, I wasn't getting any response from the board and it wasn't powering the ISP programmer when I plugged it in. I grabbed the multimeter and sure enough, there was a short (unfortunately, between power and ground). I couldn't see anything obviously wrong and so I started desoldering the components one by one until the short stopped (which actually left me with an empty board). Whomp whomp.

In trying to put the ATTiny back on, I was having trouble getting everything to line up with stray solder bumps lifting the chip in a few places. This looked like a job for pseudo-"reflow" soldering! I actually managed to get the chip on pretty well, but then got a little trigger happy with the hot air gun and tried to resolder all the components with air. I ended up with perhaps the ugliest board the fab class has ever seen.

{% include img1.html subpath="11-input" img="ugly-board.jpg" %}

However, I plugged it in and...!!

Nope, still shorted.

## Second Board

At this point, I decided to just remake the board from scratch. It came together much quicker this time and I was able to flash it on the first try. After some battling with python dependencies, I managed to get Neil's UI up and working as well. A few print statements later, and I was reading the sensor!

{% include img1.html subpath="11-input" img="foam-sensor-reading.jpg" %}

It seemed to work *okay* and putting some extra foam in the middle layer seemed to help especially. Still, it didn't seem like this was going to be a very robust solution in the long run/for a final project, but it was cool to play around with.

Still, I was curious about integrating this into the stuff from outputs week, so once again, I decided to go down the path of fabbing an XMega board.

## XMega Experiment Redux

I've been reading more and more about the XMegas and wanted to see if I could get one up and working so that I can play around with the DAC and, eventually, output audio. So I decided to fab a little board that would use my foam pressure sensor on the ADC pins to trigger audio output on the DAC pins. From what I understand, the 16A4U chips have a hardware USB stack on them, so rather than trying to go through the run-around of getting PDI programming up and working and again, I opted to go straight to USB.

I also saw this as an opportunity to finally learn how to use the 0.010" endmills (which was necessary for the XMega and MicroUSB footprints). I did one final pass on the traces with the 0.010" endmill which turned out pretty good (though in the future, I will try to mask away any of the traces that don't need the 0.010" to minimize time and stress on the part (Tom&aacute;s' recommendation)).

{% include img1.html subpath="11-input" img="milled-xmega.jpg" %}

After closer inspection, it actually turned out that I lost one trace that connected to USB ground, but figured I could patch that together with a little length of jumper wire.

Soldering at this scale once again proved to be rough. I accidentally bridged a couple of pins on the XMega and despite repeated attempts at using the solder braid, I couldn't get them unbridged and had to desolder the part (seriously, how do you use braid effectively? It seems like it only works in the simplest of circumstances).

The worst part came when soldering the USB port, though. I did manage to get it connected successfully ONE time. But after plugging it into my computer, I couldn't find anything that would recognize it (maybe this is my own ignorance of how the USB stack on the chip works and if there's already a bootloader on there or not). Somehow in the process, I snapped the USB port off entirely. I tried to reconnect it with jumper wire, but this was just getting ridiculous.

{% include img1.html subpath="11-input" img="ridiculous-usb.jpg" %}

I really should find someone with XMega experience and get the lowdown on how to approach these chips correctly.

## Strain Gauges

At this point, I abandoned the Xmega for the timebeing, but luckily, my strain gauges arrived in the mail. I got bar type gauges which are nice because they have the Wheatstone bridge configuration built into them, so they're easy to wire up to an ADC. Two of the leads take Vcc and ground, and then the other two are the outputs from the bridge. Easy as that.

{% include img1.html subpath="11-input" img="bar-gauge.jpg" %}

I also took this as an opportunity to design my strain gauge board with screw terminals to connect the gauge to the board, which I hadn't used before. I didn't really realize that the screw terminals are through-hole components, so after milling the traces, I quickly made a file to mill out the holes in the center of the terminal pads. I then resorted to attaching the screw terminals to the bottom of the board so that I could solder the leads to the pads on the top. A little goofy, but it worked just fine.

{% include img1.html subpath="11-input" img="screw-terminals-on-bottom.jpg" %}

I also (as I always do) forgot to leave enough edge on the board to support the FTDI header. Oh well. There's always next time.

{% include img1.html subpath="11-input" img="gauge-board.jpg" %}

Wiring this up was easy.

{% include img1.html subpath="11-input" img="wired-gauge-board.jpg" %}

After reading the datasheet for the ATTiny, I figured out how to set up the ADC to automatically convert the difference in voltage between the two pins. I adapted Neil's python program just to print out that value, and lo and behold...strain gauge readings! It actually works!

{% include img1.html subpath="11-input" img="gauge-readings.jpg" %}

I would still need to do some work to convert these numbers into meaningful values, but for the purpose of simply sensing if there is strain or not, this works just fine!