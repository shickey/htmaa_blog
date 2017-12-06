---
layout: week
title: Final Project
image: /final/bench-blink.jpg
short: Story Benches
published: true
---

At the beginning of the semester, I played around with a few different final project ideas (you can find more info in week 1 of my blog). Since then, my idea has shifted toward a joint project between the two courses I'm currently taking. The other course is titled Depolarization by Design (taught by Deb Roy and Nabeel Gillani) in which we focus on understanding the current polarized political climate in the United States and then, as a final project, design an intervention to address such polarization. To quote from the course website:

> ...we believe constructive steps include a) **map** and track tribes and seek to understand factors that are driving shifts, b) **surface** voices, concerns and narratives typically unheard outside of their own communities c) **bridge** tribes by amplifying common concerns, sharing stories that build empathy, and making new connections between people to build trust and common ground.

In that course, I teamed up with Kalliroi Retzepi on a final project that is inspired by the work of Kathy Cramer. Cramer's work focuses on storytelling as a mechanism for both uniting people across groups while simultaneously highlighting their important differences. She also uses ethnographic methods as a way to understand public opinion (for example, she will do ethnographic studies in rural areas of Wisconsin by showing up to the same coffee shop every morning and sitting with the same group of elderly white men). One imporant theme of her work is the very real political divide not between left and right, but urban and rural in the United States.

## The Idea

Building on both aspects of Cramer's work, Kalli and I are aiming to design (and through How to Make, actually fabricate) an intervention that utilizes storytelling as a way to connect people across urban and rural divides. We aim to realize this by fabricating two "storytelling benches" and deploying one in an urban setting and one in a rural setting. Participants will be able to sit on the bench, listen to stories curated from the StoryCorps archive (specifically focusing on urban/rural consciousness, politics, etc), and (ideally) be able to participate in the project through sharing a story themselves.

In thinking through the practicalities of realizing this concept. We're prioritizing features in the following order:

- **Listening**: Participants can sit on the bench and hear a story
- **Selecting**: Participants can select which story they hear when they sit on the bench
- **Telling**: Participants can capture their own story (through some medium) and add it to the library of stories
- **Sharing**: Participants can share their stories across space (either directly through the benches (i.e., the benches communicate with each other), or otherwise)

At an _absolute minimum_, the project needs to work such that:

- There is a bench...
- ...that detects when a participant sits on it...
- ...and plays a prerecorded story through speakers embedded in the bench

So far, Kalli and I have been playing around with different design ideas and thinking how to engage people in the experience in a way that makes the most sense. Some early sketches from Kalli:

{% include img2.html subpath="final" img1="kalli-sketches-1.jpg" img2="kalli-sketches-2.jpg" %}
{% include img2.html subpath="final" img1="kalli-sketches-3.jpg" img2="kalli-sketches-4.jpg" %}

And a few from me:

{% include img2.html subpath="final" img1="lamp-bench.jpg" img2="living-room-bench.jpg" %}
{% include img2.html subpath="final" img1="bench-with-pocket.jpg" img2="photo-booth-bench.jpg" %}

There's a lot of design considerations not only from a functional perspective but also from an experiential and design perspective (e.g., how to make it look like a bench to sit on, but also not look so normal that it's weird when it starts talking to you).

Some other ideas that have come up that we are investigating:

- Placing a lamp behind the bench which will dim when a story starts and return to full brightness when a story ends
- Creating physical story "cards" (maybe wood, cardboard, etc.) that give information about each story (names of speakers, location, etc.). Participants could start each story playing back by scanning it or inserting it into a slot in the bench (via RFID or something similar). You can see this idea some of the above sketches.
- Giving the participants some sort of feedback about what is happening/who is sitting on the other bench.

This is clearly a lot and needs a ton of thinking through. But still, there are several parts of the project that I can start working on immediately through the weekly assignments and otherwise. First up, audio:

## Audio Playback

Clearly one of the most important functions of the bench is audio playback. I used the [output assignment]({{ '/weeks/09-output' | prepend: site.baseurl }}) to play around with audio signal generation.

{% include img2.html subpath="09-output" img1="xmega-board.jpg" img2="filtered-triangle.jpg" %}

Between those experiments and reading through old fab class projects (like the [fab boombox](http://fab.cba.mit.edu/classes/863.11/people/matthew.keeter/fab_boombox/)), I think the way to go will be to use the DACs on the XMega chip to drive line-level audio signals to amplifier chips, and then out to the speakers.

## Force/Pressure Sensing

In the outputs week, I experimented with different ways to sense force and/or pressure. In the final bench, we want there to be two sensors (one on each side of the bench) that will trigger when someone sits down. Then, the audio playback will begin once *both* people are seated (since we want the experience of listening to be collective).

First, I played around with simple step response sensors made of foam and copper tape. These worked okay, but didn't seem like they would be robust enough for the final project.

{% include img1.html subpath="11-input" img="folded-sensor.jpg" %}

I also ordered some strain gauges off of Amazon and figured out how to wire one of these up to the ADC and get sensible readings out of it. This actually porved to be pretty successful (especially since we don't really care about more *much* force is applied, just that there *is* force) so this may be the way to go for the final bench.

{% include img1.html subpath="11-input" img="wired-gauge-board.jpg" %}

One open question is the best way to mount this type of sensor so that it reads accurately, but isn't in the way or visible at all to the participants. I also wonder if it may make sense to put two gauges on each side of the bench just to increase confidence that someone is actually sitting down.

## Week 13 Update

During week 13, I spent a bunch more time getting audio stuff to work. After several weeks of banging my head against the wall, trying to get the XMegas to program, I finally managed to successfully get my computer to recognize the ICE programmer after doing a bunch of weird stuff that included downlading, modifying, and installing a dummy kernel extension. Ugg. At least I could program chips now! I had my ATXmega8e5 board ready to go and...nothing. I still couldn't get the ICE programmer to recongize the board. I tried soldering a different microcontroller on, testing with a variety of computers and OSes, and even trying a brand-new out of the box ICE programmer that Neil found, all of which failed. The only difference I could see between my board and the XMega hello world was the use of the 8e5 vs 16e5 chip. I assumed this wouldn't make a difference (and maybe it shouldn't) since they have the same pinouts, but after remilling my board and putting a 16e5 on, I finally go it to work!

{% include img1.html subpath="final" img="xmega-working.jpg" %}

From here, I could -- at long last -- begin playing with the DACs. Getting them up and working wasn't too hard and I was able to get a basic signal out after writing a few lines of code. I then wanted to see if I could load in an array of audio samples and get the DAC to play those back. I found the [wav2c](https://github.com/olleolleolle/wav2c) utility which converts an 8bit 8000Hz wav file into a C header containing an array of all the data. Still, this data was (obviously) only 8 bits wide so I had to scale it up into the 12 bits that the DAC uses. I generated a short 4000 sample sound of me saying "hello world" and uploaded that to the board. This *sort of* worked, except it seemed to only be playing half the sound. After ~2000 samples, the DAC would simply plateau (not at zero) until it would loop all the way back around and start playing the sample from the top.

{% include img1.html subpath="final" img="2000-sample-dropoff.jpg" %}

This problem was really baffling me and for the longest time, I was convinced it was some sort of type conversion issue (like, maybe the XMega was doing improper pointer arithmetic and skipping every other sample of something). I also wondered if maybe the wav2c utility was borked and had simply produced bogus data. I even went so far as to write my own WAV to sample utility (which was actually nicer, because I could use all the 12 bits of the DAC from the start), but it ended up producing exactly the same result on the XMega. I also thought that maybe something was off with my timescales which was causing only half the samples to play, but after slowing down the output 10x, it still had the same problem. Finally, after a conversation with Jake, I realized that 2000 is very close to an important number in computing: 2048. I zoomed in with the oscilloscope and lo and behold, it was producing exactly 2048 samples before plateauing. I finally realized that I was simply taking up too much memory and that there was, in fact, no more space to put samples or play them back from. Mystery solved.

With this part figured out, I started to design the final electronics for the project. I discovered that SD cards natively use SPI for communication which answered the question of how to store large amounts of data and stream them into the XMega as necessary. After tracking down some SD card sockets (thanks again, Jake), I was ready to draw out a (hopefully) final schematic. The final board has connections for two strain gauges, terminals for stereo audio to get fed into amplifier boards, the SD card, an FTDI header for debugging and such, and all the other little components to make it all work together.

**IMAGE: Final PCB**
{% include img1.html subpath="final" img="final-pcb.jpg" %}

I also spent some time this week in Fusion drawing some press-fit bench ideas based on the fab standing desk design. I'm hoping to make a few cardboard models over the next few days.

{% include img1.html subpath="final" img="bench-cad.jpg" %}


