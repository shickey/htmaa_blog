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

I also ordered some strain gauges off of Amazon and figured out how to wire one of these up to the ADC and get sensible readings out of it. This actually proved to be pretty successful (especially since we don't really care about how *much* force is applied, just that there *is* force) so this may be the way to go for the final bench.

{% include img1.html subpath="11-input" img="wired-gauge-board.jpg" %}

One open question is the best way to mount this type of sensor so that it reads accurately, but isn't in the way or visible at all to the participants. I also wonder if it may make sense to put two gauges on each side of the bench just to increase confidence that someone is actually sitting down.

## Week 13 Update

During week 13, I spent a bunch more time getting audio stuff to work. After several weeks of banging my head against the wall, trying to get the XMegas to program, I finally managed to successfully get my computer to recognize the ICE programmer after doing a bunch of weird stuff that included downlading, modifying, and installing a dummy kernel extension. Ugg. At least I could program chips now! I had my ATXmega8e5 board ready to go and...nothing. I still couldn't get the ICE programmer to recongize the board. I tried soldering a different microcontroller on, testing with a variety of computers and OSes, and even trying a brand-new out of the box ICE programmer that Neil found, all of which failed. The only difference I could see between my board and the XMega hello world was the use of the 8e5 vs 16e5 chip. I assumed this wouldn't make a difference (and maybe it shouldn't) since they have the same pinouts, but after remilling my board and putting a 16e5 on, I finally go it to work!

{% include img1.html subpath="final" img="xmega-working.jpg" %}

From here, I could -- at long last -- begin playing with the DACs. Getting them up and working wasn't too hard and I was able to get a basic signal out after writing a few lines of code. I then wanted to see if I could load in an array of audio samples and get the DAC to play those back. I found the [wav2c](https://github.com/olleolleolle/wav2c) utility which converts an 8bit 8000Hz wav file into a C header containing an array of all the data. Still, this data was (obviously) only 8 bits wide so I had to scale it up into the 12 bits that the DAC uses. I generated a short 4000 sample sound of me saying "hello world" and uploaded that to the board. This *sort of* worked, except it seemed to only be playing half the sound. After ~2000 samples, the DAC would simply plateau (not at zero) until it would loop all the way back around and start playing the sample from the top.

{% include img1.html subpath="final" img="2000-sample-dropoff.jpg" %}

This problem was really baffling me and for the longest time, I was convinced it was some sort of type conversion issue (like, maybe the XMega was doing improper pointer arithmetic and skipping every other sample of something). I also wondered if maybe the wav2c utility was borked and had simply produced bogus data. I even went so far as to write my own WAV to sample utility (which was actually nicer, because I could use all the 12 bits of the DAC from the start), but it ended up producing exactly the same result on the XMega. I also thought that maybe something was off with my timescales which was causing only half the samples to play, but after slowing down the output 10x, it still had the same problem. Finally, after a conversation with Jake, I realized that 2000 is very close to an important number in computing: 2048. I zoomed in with the oscilloscope and lo and behold, it was producing exactly 2048 samples before plateauing. I finally realized that I was simply taking up too much memory and that there was, in fact, no more space to put samples or play them back from. Mystery solved.

With this part figured out, I started to design the final electronics for the project. I discovered that SD cards natively use SPI for communication which answered the question of how to store large amounts of data and stream them into the XMega as necessary. After tracking down some SD card sockets (thanks again, Jake), I was ready to draw out a (hopefully) final schematic. The final board has connections for two strain gauges, terminals for stereo audio to get fed into amplifier boards, the SD card, an FTDI header for debugging and such, and all the other little components to make it all work together.

{% include img1.html subpath="final" img="final-pcb.jpg" %}

I also spent some time this week in Fusion drawing some press-fit bench ideas based on the fab standing desk design. I'm hoping to make a few cardboard models over the next few days.

{% include img1.html subpath="final" img="bench-cad.jpg" %}

## Week 14 Updates

For a variety of reasons, I decided to charge ahead and try to finish my final project a week ahead of time. I began by revisiting the physical design of the bench. Kalli (my collaborator) put up this picture on our little website for the project.

{% include img1.html subpath="final" img="bench-line-drawing.png" %}

I loved this image, both in terms of its simplicity and its proportions, so I began to redraw the bench using this image as inspiration. Working from there, I put together a rough parameterized model in Fusion that I thought captured the same spirit, but had real-world bench-y dimensions. I also wanted to make the model press fit in the end, so I added teeth on the ends to fit together.

{% include img1.html subpath="final" img="final-bench-rough-model.jpg" %}

Kalli and I both really liked this direction, so I kept refining the model. One big question was where to put the speakers. At first, I liked the idea of putting them underneath the bench leaving the top of the bench totally flat. After thinking about it more, though, this had some significant drawbacks: (a) it might be hard to hear sound coming from below the bench and (b) there wouldn't be any visible indication to participants that the bench would play audio, which might be...startling. So after talking about it with Kalli, we decided to embed a speakers on either side of the top of the bench facing upward. After tracking down the speakers I wanted to buy from Digikey, I added spots for them in the model.

{% include img1.html subpath="final" img="speakers-in-model.jpg" %}

In this model, the speakers mount underneath (inside the base of the bench) and there is a pocket milled out on top. The pocket provides space to put in speaker grills that would be flush with the rest of the top of the bench, thus keeping the entire sitting surface at the same level.

The next consideration was how to mount the load cells under the seats so that the bench could sense when two people were sitting. The seats sit on top of two beams that span between the two bench bases. At first I played around with a bunch of ideas of how to mount them (adding cross braces that the load cell count mount on, attaching them to the bases, etc.) until I came up with (in my opinion) a fairly elegant solution. I notched out slots for the strain gauges in each beam so that they would lie flat when no force was on the seat, but would have space on one side to flex downward when force was applied.

{% include img1.html subpath="final" img="load-cell-notches.jpg" %}

In this picture, you can also see some tabs I added on to the top of the beams (which match pockets on the underside of the seats) to keep the seats in place.

At this point, I felt like I had a good model for what I wanted to build and moved on to some other parts of the project including...

### Electronics

Despite having drawn the "final" board the previous week, I decided it actually didn't make sense for me to go that route. One reason was that I though the load cells had to operate at 5v (more on this later) whereas the Xmegas are exclusively 3.3v chips. But moreover, I wanted to modularize the electronics into single-purpose boards which would be easier for design, manufacturing, programming, and testing. Plus, I was already planning on doing this with the audio amplifier board, so it made sense to go all in on this type of design. From there, I redesigned my electronics into several different smaller boards. Namely:

- The Load Cell Board: takes continuous readings of the (now) 4 load cells to determine when two people are seated
- The Audio Board: when triggered by the load cell board, reads audio files from the SD card and outputs the samples through the DAC
- The Amplifier Boards: amplifies the audio signal from the audio board and outputs audio signal to the speakers
- The Power Board: distributes power to the rest of the electronics

In one fell swoop (late at night), I redrew the schematics and PCB layouts for both the load cell board and the audio board. I fell asleep proud of myself only to wake up and realize I had forgot the crucial step of adding a connector to *both* boards to allow them to communicate. Luckily, both layouts only took minimal redrawing to get the proper connector in there. I milled and soldered both of these.

{% include img2.html subpath="final" img1="final-audio-milled.jpg" img2="final-load-cell-milled.jpg" %}

When it came to the amplifier board, I got to get my hands dirty with some math(!) to figure out what components I would need to drive the speakers given the constraints of the electronics.

{% include img1.html subpath="final" img="math.jpg" %}

For some reason, I had convinced myself that the fab inventory carried 20kOhm SMD potentiometers, but upon traveling down to the shop to find the necessary components, I found only 10kOhm pots. Since my design rested on the 20kOhm value, I got to do more math:

{% include img1.html subpath="final" img="more-math.jpg" %}

From there, I was able to design a board, mill it, and assemble most of it (now I'm only waiting for the amp ICs to come in the mail). I also made a little power board to connect all the components to the power supply (at first, I thought I might provide both 5v and 3.3v output, but decided instead to keep all the voltage regulators on each board separately). Look at all my adorable little boards! (Adoraboards?)

{% include img1.html subpath="final" img="adoraboards.jpg" %}

Now it was time for...

### Audio Programming

The first time I tried to program the audio board, I got the dreaded rc=-1 error from avrdude and I was so frustrated after all the problems getting this to work over the last many weeks. Then, in a moment of clarity within the rage, I realized I plugged the PDI cable in backward. Crisis averted.

After testing to make sure I could at least output sensible values to the DAC, I started playing around with reading audio off the SD cards. SD cards are surprisingly simple (they literally just use SPI to communicate with no other layer on top). The trickier part is working with a file system on the card. Naturally, I wanted to be able to put audio files the card using my computer, and then play them back through the bench. After doing some reading, it seemed like using FAT16 was the way to go. I found an SD card in LLK which, luckily, was already formatted in FAT. I put it in my computer to find, surprisingly, that it had 2 audio files (mp3s) on it already! I opened up the obtusely named "TRACK001" to find that it was in fact the late-90s smash hit, "My Heart Will Go On" by Celine Dion.

{% include img1.html subpath="final" img="celine.jpg" %}

The other file was a boring 440Hz test tone.

Unfortunately, I was aiming to play WAV files instead of mp3s (since they're dead-simple to extract audio data out of) so I didn't do anything with them. Instead, I found the test song I always use for audio projects and loaded it on my SD card. That test song is the inimitable, and perfect, "Time After Time" by Cyndi Lauper.

{% include img1.html subpath="final" img="cyndi.jpg" %}

I did some reading about the best way to read FAT files using AVR microcontrollers and stumbled upon the [Petit FS](http://elm-chan.org/fsw/ff/00index_p.html) library, which has turned out to be awesome. It's super minimal and with some basic setup (with help from Atmel's documentation as well) it can read and write from a FAT file system and takes up as little as 1k of program memory. Once I got this compiling with my toolchain, I tried getting audio off the card.

The first few tries I couldn't even get the device to mount. Upon inspection of the board, I found a few traces on the SD socket that were bridged with the sheild, which clearly was wrong. It took a while to desolder them properly, but once they were, the card mounted like a charm. A few lines of code later and I could get a chunk of bytes out of the file!

Now I was really in my element. I *love* programming in C because it gives you so much direct access to doing the one thing that computers do: access memory and manipulate it. E.g., I created a WavFile struct (based on the file format spec) and by simply casting the pointer to the first bytes on the SD card to this type, I could easily get all the necessary data about the file.

{% include img1.html subpath="final" img="wav-header.jpg" %}

From there, it wasn't too hard to read the audio bytes sequentially off the disk and write them to the DAC. Clearly I was getting something out, but not the right thing. It looked like periods of silence interspersed with high amplitude sections. However, after playing the file a little longer, something started to emerge in the "silent" part. Could that be audio??

{% include img1.html subpath="final" img="maybe-audio.jpg" %}

Zooming in with the scope provided some more clues. It was definitely a meaningful waveform.

{% include video.html subpath="final" filename="definitely-audio.mp4" %}

Okay, this was a good sign, but why all the cruft in the second half? Thinking about it for a while, i realized that I had a mismatch in my samples vs. sample data size (i.e., 16 bits per sample instead of 8) so I was trying to output data beyond the bounds of the sample array. Once I fixed that up, I could see some real audio coming out!

However, a new problem arose. Clearly there was a huuuuuggeee bottleneck in streaming new samples off the SD card when the DAC would get to the end of the buffer. I played around with both the Xmega clock settings and the SPI prescaling, which helped considerably, but certainly not enough to fully fix the problem. Furthermore, I was really just adding a microseconds delay between samples which wouldn't totally guarantee accurate sample output timing. Between these two things, I opted for a significant refactor of the code.

I set up a timer interrupt to run every 1 / 44100 second that would output the next sample. This would free up the main loop to only have to worry about communicating with the SD card. However, with only one buffer for samples, there was a chance that the main loop could overwrite samples before the DAC had a chance to output them. With this in mind, I set up a double buffering system where each time the DAC starts reading one buffer, the main loop streams audio data into the other. After tracking down some bugs in my initial implementation, I looked at the scope to see...

{% include video.html subpath="final" filename="cyndi-waveform.mp4" %}

Cyndi herself would be proud of that waveform.

### Back to the Bench

Meanwhile, I also wanted to make sure that my press-fit bench pieces would actually fit well together so I printed some test parts to check. I assumed that I would need to leave a little gap in the model between the pieces so that they would press-fit nicely together, so each of my test pieces had a slightly larger gap. After machining them, I was surprised to find that they were *all* too loose and that I would need to tighten up the gaps considerably. Womp womp. Also, they didn't machine all the way through and came out looking terrible.

{% include img1.html subpath="final" img="test-parts-1.jpg" %}

Also, just for funsies, I made a tiny cardboard bench on the laser cutter.

{% include img1.html subpath="final" img="tiny-cardboard-bench.jpg" %}

### Back to Electronics

Now that I had the audio board essentially working (at least, the basics), I moved on to the load cells. I had already gotten a single load cell to work with the ATTiny ADC during inputs week, but I wanted to test it at 3.3v to make sure that everything was hunky-dory. Sure enough, it worked like a charm. From there, I hooked up all 4 load cells to make sure that there wasn't going to be any weirdness with using 4 at a time. For a while, I was stumbling over this odd bug where no matter which load cell I tried to get data from, only the 4th load cell would actually report. Turned out I had forgotten how bitwise-OR works which meant that when I was setting the ADMUX register to switch between load cells, it was still always reading the one. Once that was fixed up, it worked like a charm.

{% include img1.html subpath="final" img="four-load-cells.jpg" %}

### Aside: Wiring Clips

Clearly I was going to need to run wire underneath the bench, both for the load cells as well as for the speaker on the side of the bench without the electronics. I figured my best bet was to run the wires along the beams, so I quickly drew and 3D printed some clips that I can attach to the beams to keep wires in order.

{% include img1.html subpath="final" img="cable-clip.jpg" %}

### Back Again to the Bench

After getting the actual plywood I was going to use for the bench, I reprinted some test parts with tighter gaps and got a lovely press fit (with help from a rubber mallet).

{% include img1.html subpath="final" img="test-parts-2.jpg" %}

Using those values, I updated my model in Fusion and nested the parts in preparation for machining. Some of this turned out to be easier than expected (updating all the necessary gaps) while some of this turned out to be incredibly annoying (getting the Dogbone plugin to work properly). Finally, though, I had some vectors to machine.

{% include img1.html subpath="final" img="nested-vectors.jpg" %}

I headed down to the shop and put the toolpaths together. And after double, triple, and quadruple checking everything (including realizing at the last second that I put my board stock in sideways), I hit go. THe first pocket appeared!

{% include img1.html subpath="final" img="first-pocket.jpg" %}

Almost as quickly as it began, machining stopped on the second pocket when the plate holding the air handler tube slid off the spindle mechanism. I hit stop and got the plate sorted out (sort of: it is actually legitimately broken) and resumed the job. Stupidly, I didn't restart the spindle which gave me a second pocket that looked terrible.

{% include img1.html subpath="final" img="terrible-pocket.jpg" %}

Once again I stopped the job, fixed up the spindle, and got going again. Luckily at the end of the job, I ran just that pocket path again and it cleaned it up nicely.

{% include img1.html subpath="final" img="cleaned-up-pocket.jpg" %}

The rest of machining went off without a hitch (aside from losing the coordinate system once, but luckily while the spindle was in the air, so it was easy to recalibrate it) and at the end of it I had some nice parts.

{% include img2.html subpath="final" img1="speaker-pocket.jpg" img2="machined-bench-parts.jpg" %}

After a LOT of sanding, the moment of truth came: would the pieces press-fit together?

{% include img1.html subpath="final" img="first-press-fit-arm.jpg" %}

Huzzah!!

So at this point (with a week left), I'd say I'm about 70% done. Aside from the amplifiers, all the pieces are tested and the majority of the work left is in integrated all the systems together. That will undoubtedly be the make-or-break part of this project, but at the moment, I'm feeling optimistic.

## Final Week Updates

With most/all of the individual pieces ready to go, the name of the game this week was assembly and integration. But first...

### Audio Amplifiers

Now that I had amplifier chips on hand, I could finish the amplifier board and (hopefully) get audio playing at a reasonable level. I soldered the chip to the board I had and plugged it in. Immediately, something was not working correctly. The voltage regulator was getting hot and wasn't outputting the correct 3.3v (or so I thought). At first I thought it was a short between power and ground, but after testing a bunch and looking at the schematic, I returned to the datasheet for the part to discover that the pinout did not match the KiCad footprint I used. No wonder it was getting hot and not working.

Back in Kicad I fixed the footprint and rerouted the board. At this point, I (for some unknown reason [note: foreshadowing]) decided it would be a good idea to add an extra 10k resistor on the incoming audio signal line in addition to the trim pot. My thought was that the 10k resistor would provide the 10k I calculated as necessary for the gain and the trim pot would allow me to adjust that a bit as a basic volume control.

After milling and stuffing this board, I plugged it in only to find once again that it was getting really hot. Only this time it was getting *really* hot. As in, the voltage regulator melted its solder connections at one point. It was also trying to pull crazy amounts of current. However, both of these were happening intermittently. I wondered if it was working at all and tried feeding a signal into it which _kind of_ worked. Still, eventually it would get itself into a weird state and start trying to pull a ton of current again. After banging my head against the wall about this for a while and trying different voltage regulator chips, different amplifier ICs, etc., Tom&aacute;s offered to help me out. After some debugging he wisely pointed out that between the 10k resistor and the trim pot, I had actually put ~15kOhms on the input line, which (according to the datasheet) was setting the amplifier's gain *way* too high, and thus pulling so much current and generated so much heat. After a few quick fixes with the soldering iron (i.e., removing the pot and replacing it with a 0Ohm resistor) the amplifier was up and running. Phew!

At this point, I could run an audio signal into the amplifier and get something at a resonable volume out of the speakers. However, it didn't sound quite right. I figured I was miscounting samples or something and played around with the code a bit. There certainly was audio coming out, but not the right audio. At times it was way too slow (double-counting samples):

{% include video.html subpath="final" filename="slow-cyndi.mp4" %}

And at other times, it was just plain wrong:

{% include video.html subpath="final" filename="wrong-cyndi.mp4" %}

I started to wonder if I was having buffer underrun issues so I refactored the code to use a triple buffering scheme. All of this seemed to be getting closer to a solution, but it stil wasn't quite right yet. It seemed like samples were out of order, or something else weird. I decided to take a break from the audio for a while.

### Bench Assembly, Redux

At this point, Kalli and I met up to put together the rest of the bench. Between the two of us, the pieces went together quickly. Here's Kalli installing one of the speakers:

{% include img1.html subpath="final" img="kalli-installing-speaker.jpg" %}

The pieces fit together super-well and when we were done, we were both very pleasantly surprised by how sturdy the whole thing felt!

{% include img1.html subpath="final" img="sitting-on-bench.jpg" %}

From there, we took the bench up to LLK and installed the load cells.

{% include img1.html subpath="final" img="kalli-load-cells.jpg" %}

We also spent a bunch of time extending the wires out long enough to reach to sides of the bench and heat shrinking everything together (which was very very satisfying). The 3D printed clips did their job nicely of keeping the wires in order and out of sight.

{% include img1.html subpath="final" img="wiring-the-bench.jpg" %}

At this point, I returned to the audio code and with Kalli there to help think through the bugs, I got it up and working by lowering the WAV file sampling rate to 22050.

{% include video.html subpath="final" filename="right-cyndi.mp4" %}

We also tested the sit sensing code and found it to be pretty responsive! Here's a nice square wave with rising and falling edges from when we sat down and stood up from the bench, respectively.

{% include img1.html subpath="final" img="sit-sensing-square-wave.jpg" %}

It wasn't perfect and definitely needed some tuning, but it was definitely on the right track.

## Getting It Working

The next day, I wanted to at least get a sense of how the electronics would fit in the bench, so using duct tape, I laid them out on the underside of one of the speaker panels.

{% include img1.html subpath="final" img="duct-tape-electronics.jpg" %}

Now that everything was in place, I could actually test all the pieces together. I had to use a pretty sizable bucket of legos to mimic a second person sitting on the bench.

{% include img1.html subpath="final" img="bucket-of-legos.jpg" %}

The basic functionality was testing okay, those there were still definitely some bugs in the software. Getting the sit sensors calibrated correctly was more challenging than expected (certainly this was partially because I couldn't get serial output working through the FTDI header) and the audio code needed some cleaning up as well (buzzing at the end of tracks, etc.).

I took a break from software and went to the shop and laser cut some speaker grills from a simple design I made in Illustrator.

{% include img1.html subpath="final" img="cutting-speaker-grills.jpg" %}

They came out great and fit perfectly!

{% include img2.html subpath="final" img1="speaker-grills-1.jpg" img2="speaker-grills-2.jpg" %}

From there it was back to working on code. After realizing that I had changed the clock speed of the ATTiny44 that sensing the sitting so obviously the serial port wasn't running at the right speed, I was able to fix up the serial communication and get some readable values out of the load cells.

**IMAGE: Load Cell Values**
{% include img1.html subpath="final" img="load-cell-values.jpg" %}

Here, it became clear that one of the sensors was consistenly reading about 20 points higher than the others. I wondered if this was an issue with the cell itself, so I tried replacing it with the one backup I had on hand, though the backup seemed to be more erratic in its reading. At least the first one was consistently off, so I put it back in and fixed up the values in code. From there, it wasn't too hard to get the sit sensing working a lot more robustly.

Aside: one nice thing about building a bench for your project is that it gives you a great work space to test and debug:

{% include img1.html subpath="final" img="bench-debugging.jpg" %}

I decided to take some time to attach the electronics in a better way inside the bench. Using the KiCad PCB designs I had, I laser cut a number of small wooden parts to mount the circuit boards on.

{% include img1.html subpath="final" img="board-mounts.jpg" %}

These mounts were necessary for a number of boards to give the undersides proper clearance for screw terminals.

{% include img1.html subpath="final" img="mounts-screw-terminals.jpg" %}

Then, I attached the mounted boards to the underside of one of the speaker panels and attached everything up.

{% include img1.html subpath="final" img="mounted-boards.jpg" %}

Once again, I turned to the audio code, which I wanted to clean up considerably and add some other features to it. E.g., I wanted the audio to start to fade out if one person stood up while listening to the audio. If then, they sat back down quick enough, the audio would fade up to full volume again. If, however, they waiting too long, the audio would sipmly stop. Getting the code written wasn't too hard and it gave me a chance to do a nice cleanup pass on the code I had written so far. However, when I went to run it on the bench, the audio was...creepy?

{% include video.html subpath="final" filename="creepy-cyndi.mp4" %}

This was especially weird because it sounded slow, but not super pitch-shifted. Mostly it was just distorted and weird. After an hour or so of debugging, I realized that the interrupt handler was getting bogged down and wasn't able to output samples as fast as necessary. I was sort of surprised by this since there wasn't *that* much more logic from previous versions of the code and there should have been plenty of leftover time in the interrupt handler to accomodate it. Finally, I tracked it down to a single floating-point multiplication (i.e., multiplying by the current "fade" value) that was slowing it down so much. Through a quick investigation on the internet, I learned that a floating point multiplication is *really* expensive on an AVR chip. So now it all started to make sense. Given the time I had left before needing to present the project (i.e., this was the day before it was due), I opted to load a simplified version of the code on the bench that didn't have any fading capability just so I had something working to show. I figured if I ended up having more time before the presentation, I could always dive further into optimizing the fading code.

I also utilized a few more features of PetitFS to automatically detect and load WAV files from the root directory of the SD card. This effectively meant that one could simply swap out the card with any card containing WAV files (with 22050 sampling rate) and the bench would play them with no modifications necessary.

At this point, I deemed the project a solid prototype and called it a night.



