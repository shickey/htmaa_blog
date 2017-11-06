---
layout: week
title: 9 - Output Devices
image: /09-output/filtered-triangle.jpg
short: Sound is Hard
published: true
order: 9
---

This week, we were introduced to a variety of output devices and challenged to build and program a circuit board that uses an output. Part of me really wanted to play around with NTSC video signals, but in thinking about preparing for my final project, I decided to focus on audio output this week (but perhaps I'll return to video at some point in the future).

## Boards

I started by looking at Neil's Hello Speaker board on the class site that utilizes a single MOSFET to drive a speaker in one direction. This works perfectly well for outputing simple waveforms (e.g., a square wave) but won't be super useful in recreating more complex signals. In particular, the fact that the MOSFET only pulls the cone in one direction means that the rest of the audio signal is basically constructed simply by the cone returning to its natural location. Thus, I decided to try to figure out how to drive a speaker in both directions in order to more accurately output audio signals.

Will and Neil were both helpful in thinking through how to get started with this. Neil recommended utilizing an H bridge in order to pull the speaker back and forth. In talking with Will, I decided to simply manufacture the DC motor H bridge circuit as-is and then use that to play around with a speaker as the load instead of the motor. Neil and Will also wisely recommended prototyping with a resistor in place of the speaker while figuring out how to generate the appropriate signals to (a) avoid blowing out the speaker and (b) avoid listening to horrible noise for hours on end.

{% include img1.html subpath="09-output" img="motor-board.jpg" %}

After getting the board built and reading through the code, I realized that the project was bit-banging the PWM output to drive the motor. I knew that I wanted to use the hardware PWM affordances of the ATTiny, so after reading back through the datasheet, I realized that this board wasn't set up to do that since the H bridge wasn't connected to the hardware PWM pins of the microcontroller. Womp womp. As a result, I redrew a very similar board in KiCad, only this time the H bridge was connected to the PWM output of Timer 0. I manufactured this board and got everything ready to generate some signals.

{% include img1.html subpath="09-output" img="second-board.jpg" %}

## Beeps

For some reason, I had it in my head that the specs for Timer 0 and Timer 1 were exactly equivalent in the ATTiny. Turns out, though, that Timer 0 only has 8 bits of resolution while Timer 1 has 16. At first I wondered if this would present a problem in terms of the range of singals the board could produce, but after thinking through it more (and wrapping my head around the signal translations) I realized this would only affect the resolution of the amplitude of the output sound wave. Considering that this was basically a prototyping board, this was fine with me.

After adding a resistor as the temporary load and getting the basics of the code going, generating the PWM signals was straightforward. My setup was...less than nice looking...but it worked. This is safe, right??

{% include img1.html subpath="09-output" img="mass-of-wires.jpg" %}

This also gave me an opportunity to hone my oscilloscope skills. After getting the probes set up correctly and figuring out some of the nuances of the scope we have in LLK, I saw a nice square PWM wave pop out.

{% include img1.html subpath="09-output" img="pwm-square.jpg" %}

Still, I was having trouble understanding how this actually translated into the H brdige output. The H bridge data sheet gave different output waveforms for "slow" and "fast" decay so I played around with different PWM signals to see how it would affect the output. One thing I wondered about is that the H bridge is meant to drive an inductive load and that a speaker acts more like a resistive load (from what I understand). And certainly, the resistor I was using was _definitely_ a resistive load. As a result, the H bridge outputs appeared more like a PWM signal than a continuous analog signal. Even so, I figured I could at least get a decent square wave at a particular frequency to output.

However, when I went to do this, I kept confusing myself about how the PWM signal translates into an analog signal, so I sat down and drew out the signals I wanted to produce.

{% include img1.html subpath="09-output" img="signal-sketch.jpg" %}

Once I finally wrapped my head around that, generating the waveforms wasn't too bad. I also figured out how to use the oscilloscope math functions to output the difference between the two sides of the load, which should represent the analog output. Here, the green signal on top represents that analog output (note that each crest and trough of the signal appears as a solid block since it's really a very tight square PWM wave, again since there was basically no inductance in the load).

{% include img1.html subpath="09-output" img="oscope-math.jpg" %}

From there, I figured out how to generate square waves at various frequencies. The time was ripe to plug a speaker in.

{% include video.html subpath="09-output" filename="three-beeps.mp4" %}

Beautiful, right?

The next logical step in my head was to see if I could shape the output wave at all into something more complex. I figured a triangle wave would be a straightforward extension of what I already had. Generating the signal wasn't too bad, though its very apparent how much noise is in the signal here.

{% include img1.html subpath="09-output" img="bad-triangle.jpg" %}

Once I had two wave generators, I started to realize that I had some timing issues in my circuit. In particular, I tried to output both a square and then a triangle wave at 440Hz using the same microsecond delay in each. However, it seemed that the square wave would output a nice A440, but using the same delay, the triangle would be slightly flat in pitch. I figured that since the triangle wave was executing more instructions per PWM output, somehow the time was falling slightly behind.

## Filtering

Between the timing problem and the noisy signal, I decided to loop back to Will for some guidance. For timing, he suggested implementing a timed interrupt which should produce a more precisely timed execution. In terms of the signal, he suggested implementing a simple RC low pass filter in order to filter out the PWM signals, but leave the audio signal behind. I had read about RC filters in the past but had never built one, so I decided to follow that route before doing anything else.

At first, I built a simple RC filter with a cutoff around 15kHz thinking that I wanted to retain as much of the human audio spectrum as possible (20Hz-20kHz). However, I then realized that the PWM signal was operating around 30kHz and was still leaving a lot of noise in the signal. Just to see what would happen, I changed the values in order to produce a cutoff around 1500Hz instead. Here's the circuit on a breadboard (sorry, Neil).

{% include img1.html subpath="09-output" img="breadboard-filter.jpg" %}

This actually worked pretty well! I hooked up the circuit to the oscilloscope and saw a roughly triangular wave pop out.

{% include img1.html subpath="09-output" img="filtered-triangle.jpg" %}

For some reason, there were still some flat parts in the signal, which may have been due an error in my code or otherwise. Still, I went ahead and plugged in a speaker and got...nothing! For some reason, when I would hook the speaker up, the waveform on the oscilloscope would disappear and no audio would come out. I spent some time messing around but to no avail.

All in all, I was glad I figured out how to generate a simple analog signal using the hardware PWM, but it was becoming clear that this wasn't necessarily going to be a viable solution for high-fidelity audio (much less in stereo). One other thing Will mentioned was that the XMega chips have a hardware DAC onboard which can generate analog signals directly. After reading the datasheet and also tracking down the LM4861 audio amplifier in the fab inventory, I decided to see if I could use those to generate a decent little sound amplifier.

## XMega Amplifier


