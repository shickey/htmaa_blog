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

As I said earlier, I spent a lot of time this week getting the XMega DACs to program and work correctly in preparation for my final project. After a lot of hassle getting the ICE programmer to work, I finally managed to get some code onto an XMega and some signal coming out of the DAC.

{% include img1.html subpath="final" img="xmega-working.jpg" %}

After this, I wanted to find a way to amplify the audio signal coming out of the board. The fab inventory listed the LM4861 chip so I designed a board around that.

**IMAGE: LM4861 PCB**
{% include img1.html subpath="13-networking" img="lm4861-pcb.jpg" %}

I spent some time looking around for LM4861 amplifier chips but to no avail. Luckily, I found a couple of the ubiquitous LM386 chips in the parts bin in LLK so I started to design a board around those instead.

**IMAGE: LM386 Board**
{% include img1.html subpath="13-networking" img="lm386-schematic.jpg" %}

Unfortunately, as I started to look for components, I realized that we didn't have the capacitors on hand to really make this thing work. I also wasn't super jazzed about using this chip since it wouldn't operate on the 3.3V that the XMegas work with.

Ultimately, I was able to get some sound out of the board by simply attaching a couple of speakers directly to the DAC output (not recommended, obviously, but it did sort of work).

{% include img1.html subpath="13-networking" img="xmega-speakers.jpg" %}

With a functioning sound outputting board, I decided to mill Neil's MEMS microphone hello world board, just to prototype the audio communication. Getting this up and working was straightforward and I even got to use my fancy reflow soldering skills!

**IMAGE: MEMS board**
{% include img1.html subpath="13-networking" img="mems-board.jpg" %}

Now came the (next) tough part: the FFT

## FFT/FHT

The FFT is a fairly simple thing to understand: you put in a list of values that represent samples of a signal and you get back a list of data that represents the frequencies contained in that signal. The math behind it is highly awesome (though beyond the scope of this blog post) and I recommend checking it out. Ultimately, I wanted to sample the microphone signal and then run it through the FFT in order to identify if a particular frequency was being picked up or not. This way, I could use that information as data coming through the audio signal.

I have done some FFT stuff in the past and remembered using a very similar algorithm called the FHT with Arduino boards. Without getting too deep in the math, the FHT is basically a real-valued version of the FFT (which operates on complex values). For the purposes of this project, the FHT was more than enough.

I tracked down [this library](http://wiki.openmusiclabs.com/wiki/ArduinoFHT) which I had used before and is well written. It's designed to be highly performant on embedded systems and the programming interface is really straightforward. Since it is designed for Arduino specifically, it took me a little fanagling to get it work with the standard avr-gcc toolchain. Unfortunately, when I went to upload the code onto my board, I got an error saying that the library was incompatible with the ATTinys. This was not going to be an easy fix it turned out. Much of the code was written in inline assembly and so it was failing because the ATMega328 (i.e., Arduino Uno for which the library was designed) has opcodes that the ATTinys lack. So in short, I needed another solution.

I then tracked down [this blog post](http://www.waitingforfriday.com/?p=53) which contained a different AVR FHT library and some info and examples on how to use it. Once again, there was some battling with the compiler to get it to work, but I finally did manage to get it going. I then spent an inoridinate amount of time trying to get meaningful values out of the thing. This was a combination of the fiddling with the scaling and zero-value of the audio input on the ADC, setting proper gain values, battling with byte-ordering, and fussing with time scales until some that looked *anything* like a proper set of Fourier bins emerged. But at long long last, I started to get something reasonable by putting my earbuds directly against the mic:

**IMAGE: Earbuds/FHT Bins**
{% include img2.html subpath="13-networking" img1="earbuds.jpg" img2="fht-bin.jpg" %}

Here you can see the strongest frequency in the **Kth** bin. After all the trouble getting the thing to work, this moment was really satisifying because you could whistle at higher and lower frequencies and see the values slide between the bins. Winning.

From here, it wasn't too hard to turn this data into actual frequencies, since the bins of the FHT even divide the frequency space. I.e., you can simply multiply a bin by the frequency "width" of each bin (in this case 143Hz) and get the frequency that the bin represents. Using this, I wrote a different python interface to display the fundamental frequency coming out of the data.

**IMAGE: Fundamental Frequency**
{% include img1.html subpath="13-networking" img="fundamental-frequency.jpg" %}

Since I wanted to get two frequencies out ultimately (so that I could differentiate between zero and one in the digital data), I extended this to search for a second-most frequency after the fundamental.

**IMAGE: Second Frequency**
{% include img1.html subpath="13-networking" img="second-frequency.jpg" %}

This was on a good track

## Back to the XMega

Now that I had a FHT proof-of-concept board working, I went back to the XMega board to program in the different frequencies I would use to represent data. Generating sine waves was easy (thanks to Sam's hello world Xmega code) and getting a sum-of-sines is really only a few lines of code beyond that. This produced a beautiful wave on the scope.

{% include img1.html subpath="13-networking" img="sum-of-sines.jpg" %}

It played okay through the little speakers as well. Unfortunately, when I used the MEMS board to grab the frequency data off of it, it simply wasn't loud enough. I could *sometimes* get it to pick up a frequency for a split second, but even putting the mic almost directly against the speaker didn't work reliably. [Aside: if I were to do this project again/continue working on it, I would look more into the MEMS microphone gain to see if I could get it to pick up weaker signals/signal from farther away]. Without an amplifier, this simply wasn't going to work. Still, I decided I could at least try to get the data decoding to work on the MEMS board.

## Back to MEMS

Figuring out the best way to capture the audio as data was an interesting thought experiment in its own right. I came up with the following basic algorithm:

- Each time the FHT runs for a window of samples, check to see if a particular frequency (the "carrier" frequency) is the largest in the sample. If the carrier is picked up more than 10 times in a row, then we consider this as the beginning of a transmission of data
- Once we detect the start of a transmission, we wait for one "data frame" of time (say, 1 second) until we expect the first bit to start coming across the line
- Now that a transmission is underway, we repeatedly sample the microphone and run the FHT over the course of a data frame's worth of time. Each time we get FHT data, we keep track of the top two frequencies.
- At the end of a frame, we first check to see that the carrier frequency was present in at least 2/3 of the samples. If it wasn't, we assume that the transmission ended since the previous frame. Otherwise, we check to see if the frequency representing a zero bit was *also* present for at least 2/3 of the samples. If it was, we push a 0 onto the right end of a bit buffer. If not, we check we check to see if the frequency representing a one bit was instead present for 2/3 of the time, in which case we append a 1 to the bit buffer instead. (If none of these are true, we consider it an error)
- After every 8 frames of data, we send the 8 bits/1 byte we accumulated from the audio signal over the serial line and print it to the console

It was fun to dig in and write some more complex microcode. I was able to get the carrier frequency sensing to work and start a data frame. However, once I would add in the code for processing each frame, the program would simply cease to work. At this point, I decided to call this week another successful failure in that I learned a ton and got some interesting things working, but failed to integrate everything end-to-end. I wonder if maybe I was pushing the limits on the flash program memory space or if there was something more fundamentally wrong in my code. Perhaps a project to fix up in the future.
