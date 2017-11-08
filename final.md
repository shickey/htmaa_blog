---
layout: week
title: Final Project
image: /pizza.jpg
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
