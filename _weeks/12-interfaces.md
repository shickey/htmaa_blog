---
layout: week
title: 12 - Interfaces
image: /12-interfaces/tacocat.jpg
short: Tacocat
published: true
order: 12
---

This week was all about creating software interfaces for the hardware projects we've been working on over the past many weeks. Originally, I was hoping to do more work on the Pancake Machine, but given the Thanksgiving break (and traveling for most of the week), I instead opted to dive deeper into [ScratchX](http://scratchx.org/) and figure out how to get serial data interacting with the Scratch interface. ScratchX is a fork of the Scratch project that allows users to extend the blocks interface (and connect to hardware, web services, etc.) through a simple Javascript plugin architecture. I've played around with ScratchX a bit in the past, but haven't done anything with serial devices and Scratch.

## Loading the ScratchX Extension

After reading up on the documentation for scratch extensions, I started by looking through the [PicoBoard extension](https://github.com/LLK/scratchx/blob/gh-pages/scratch_extensions/picoExtension.js) which communicates over serial with ScratchX, just to get a sense of how serial hardware can talk to the software. Most of the code was straightforward and after pulling out a lot of the more complex and/or PicoBoard specific pieces, I had a basic serial extension to work with. I loaded this up in ScratchX and got my first error.

{% include img1.html subpath="12-interfaces" img="serial-server-error.jpg" %}

This made sense because the ScratchX has no way of communcating back and forth with hardware without some sort of middleware in between. The [Scratch Device Manager](https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1084869222&mt=12) has become the de facto mechanism for doing this and we use it in LLK for talking to devices like the Lego WeDo and the piece of hardware we're currently developing in house. I really *really* hate downloading anything off the Mac App Store, so I decided to build it from source. After cloning the project and going through the whole rigmarole of installing npm packages, running the build scripts, etc., I finally had a working Scratch Device Manager on my machine. Back in ScratchX, I went to run my simple serial extension again and...

{% include img1.html subpath="12-interfaces" img="serial-server-error-2.jpg" %}

Okay, so it was connected to the device manager, but the device manager didn't know how to find the serial device. It was then that I remembered that the Scratch Device Manager uses its own plugin architecture and the only plugins we currently have available are one for Bluetooth communication and a second one specifically for the WeDo. I.e., the Scratch Device Manager currently doesn't do anything with serial devices at all. So I had a choice here: I could either try to implement serial support in the Scratch Device Manager or I could use the deprecated Scratch Device Plugin for Chrome just to get up and running. In the long run, I really do want to get serial communication working with the SDM, but out of fear that I would get sucked into that project and not actually finish making an interface for this week's assignment, I decided to go for the latter option. After getting the plugin installed, I loaded the extension for the third time and...success!

Which is to say, no errors at least.

## Strain Gauge

Last week, I made a simple board that used the ADC on the ATTiny45 to read values off of a strain gauge. I decided to see if I could hook this up to my ScratchX extension. One thing that was odd frmo last week were the values coming out of the python program that was reading the serial data from the board. After looking back through the code, I realized I had the byte ordering wrong in the python program and so after fixing that up, I had some more sensible values coming out. Still, the range of values was super small, so I fixed up the firmware to use the 20x multiplier on the ADC to get a set of values with a nice range (roughly 0-70 centered around 35 meaning "no force applied"). Scratch typically works in 0-100 range, so this seemed about right.

{% include img1.html subpath="11-input" img="wired-gauge-board.jpg" %}

Above: the strain gauge board, in case you forgot what it looks like.

## Sending Serial Data to ScratchX

Back in the extension code, I decided to do the simplest thing possible. Namely, I decided to fill out the extension so that it provided exactly one single reporter block to Scratch named "strain" that reported the value coming out of the strain gauge. That way, users could make scripts like the following to do stuff when strain was applied to the gauge.

{% include img1.html subpath="12-interfaces" img="strain-script.jpg" %}

Getting the basics of this working wasn't too difficult, in that I could report values from the strain gauge in ScratchX.

{% include img1.html subpath="12-interfaces" img="strained-bananas.jpg" %}

However, the update interval was *really* slow. Like, once every 10 seconds or something, which seemed completely ridiculous to me. At first, I was wondering if my code was simply bogging down in parsing through the firehose of data coming across the serial line. But after throwing in some carefully placed `console.log()`s, it seemed that the data itself was getting batched (maybe by the Chrome plugin?) and was being sent over to ScratchX every 10 seconds or so in huge buffers. Another decision point: should I just go with what I had, even though it meant the data would be stale most of the time (and thus the UI would be really poorly responsive to changes in the strain gauge) or should I dive into the deep dark black box that is the Chrome plugin? I decided to let that question lie for a little while.

## WebSockets to the Rescue

Lily and I ended up chatting about our projects (she, too, was working on Scratch extension stuff) and I told her about my stale data issue. She said hers was working much more responsively and showed me the code she had going. After looking through it, I realized her project was smartly using a websocket to communicate between the scratch extension and a minimal server that also had direct access to the serial device. That seemed like a good strategy to me, so I went back to my project and tore out the chrome plugin stuff.

Using Neil's magnetic input hello world server and a starting point, I put together a super-simple server to grab data from the serial device, parse it, and send it over a websocket to the scratch extension.

{% include img1.html subpath="12-interfaces" img="websocket-server-code.jpg" %}

Once that was up and running, I went back to the extension code. Without the serial communication stuff to handle, it was almost trivial.

{% include img1.html subpath="12-interfaces" img="extension-code.jpg" %}

I fired this up in ScratchX and (tada!) the values were updating like nobody's business! In fact, they were updating so fast that I had to limit their updates to every 60th of a second to prevent the website from getting too bogged down.

## Tacocat

So what sort of interface should I build, now that I had all of Scratch at my disposal. It seemed that the most natural thing to do was to make a flying taco-eating cat game. A quick search of the Scratch site found [a project that exactly fit the bill](https://scratch.mit.edu/projects/116623131/) made by scratcher maylou06.

I brought this project into ScratchX and after some remixing, I had a game in which the cat would fly up and down (depending on which way you pushed the strain gauge) eating tacos as they flew across the screen.

Mission accomplished.

{% include video.html subpath="12-interfaces" filename="make-it-fly.mp4" %}
