---
layout: week
title: 13 - Networking
image: /13-networking/fourier.jpg
short: Hip Hip, Fourier!
published: true
order: 13
---

This week focused on networking which we broadly defined as communication between processors. As we're nearing the end of the semester, I spent much of my time this week on final project stuff. Specifically, I finally got the XMegas to program and generate some reasonable audio output form the DAC. So when it came to the networking assignment, I decided to build off of that.

## The Idea

Now that I could actually output audio from a microcontroller, I wondered if/how I might be able to use that communciate with another. Naturally, I went to the idea of having a second controller pick up audio from the first microcontroller using a microphone. My first idea was to simply play a specific frequency and when the microphone detected that frequency, it would blink an LED or something. In thinking about that further, I realized I'd need to do at least some basic signal processing to get the frequency data out of the audio stream. This sounded like a job for the Fast-Fourier Transform!

From there, I wondered how hard it would be to detect multiple frequencies using the FFT and maybe even use that to transmit digital data. E.g., when the listener board detects 400Hz, it starts listening. Then each second later the transmitting board outputs either 400Hz + 800Hz (the latter at half the amplitude) to represent a 0 or 400Hz + 1600Hz to represent a 1. Once the listener stops detecting 400Hz, it would recognize that the transmission was over. Naturally, the throughput would be unremarkable, to say the least, (1 bit per second), BUT could you do it?? More on this later.

## Boards

As I said earlier, I spent a lot of time this week getting the XMega DACs to program and work correctly in preparation for my final project.

**IMAGE: XMega Board**
{% include img1.html subpath="13-networking" img="xmega-board.jpg" %}

Once that was up and working "reasonably" well, I started looking around for amplifier chip to drive the signal through speakers at a reasonable level. I found a couple of LM386 chips laying around in LLK, so I build a simple board using those to amplify the signal with 20x gain.

**IMAGE: LM386 Board**
{% include img1.html subpath="13-networking" img="lm386-board.jpg" %}


