---
layout: week
title: 8 - Molding & Casting
image: /08-molding-casting/concrete-hat-square.jpg
short: Tiny Cement Hats
published: true
order: 8
---

This week's topic was molding and casting, which I was especially excited to learn about since it's something I have literally zero experience with. Alongside this, we learned about 3-axis machining on the Shopbots. The assignment asked us to design and machine a positive mold, then cast it into OOMOO as a negative mold, and finally cast parts from that in Drystone and/or Hydrostone. Seeing as this was a new process for me and that I've done ambitious projects the past few weeks, I decided to make something fun and simple. After kicking around a few ideas, I decided to see if I could cast my hat.

## Modeling

I started by using the Sense 2 to 3D scan my hat (aside: thanks to John for helping me get the scanning station set back up). After a few tries, I got a decent scan.

{% include img1.html subpath="08-molding-casting" img="hat-scan.jpg" %}

After converting to a mesh, there were a few odd angles and parts, so I took it as an opportunity to try out the sculpting tools in Blender. I didn't get too deep into it, but it was straightforward to use the sculpting tools to push and pull geometry around and clean up the edges of the model.

{% include img1.html subpath="08-molding-casting" img="hat-blender.jpg" %}

From there, I importing my mesh into Fusion and made it into a closed mesh (there's probably a way to do this in Blender, but I knew exactly how to do this quickly in Fusion, so I opted for that). I exported this as an STL in preparation for machining.

{% include img1.html subpath="08-molding-casting" img="hat-stl.jpg" %}

## Machining

Vik and I teamed up to machine our wax blocks on the desktop Shopbot this week. It was good to have a second pair of eyes to double check everything as we set up the tooling paths and prepared the machine. After hitting go, everything seemed to be going off without a hitch on the roughing pass.

{% include img1.html subpath="08-molding-casting" img="machining-wax.jpg" %}

However, during the deepest cuts, the spindle was getting a little close for comfort to the top of the wax stock. Luckily, it didn't collide, but it was a good reminder to double check the plunge depth and available tool length before starting a machining pass. After this, I extended the bit a little farther from the collet and rezeroed the Z before starting the finishing pass. After this, the finishing pass went smoothly and produced a great positive.

{% include img1.html subpath="08-molding-casting" img="wax-mold.jpg" %}

## OOMOO

After we got Vik's wax successfully machined as well, we went straight to casting the OOMOO. We set up our materials and were getting ready to mix the compounds, but after opening up the Part A bottle, we deiscovered that the compmound has gone bad and set inside the container. It was possible to poke your finger into it, but it certainly wasn't going to pour. We discovered a (potential) expiration date on the packaging which suggested that it expired back in May. Luckily, this was only true for a few OOMOO kits and we were able to find one that was still liquid (we also alerted Tom and Grace just so they knew about the problem).

{% include img1.html subpath="08-molding-casting" img="bad-goo.jpg" %}

After mixing a better compound, we used the vaccuum chamber to pull bubbles out. Using the vaccuum chamber was especially satisfying and pulled a ton of air out of the mixture. We poured the molds and vaccuumed them again to bring as much air as possible to the top.

{% include img1.html subpath="08-molding-casting" img="poured-mold.jpg" %}

I came back a few hours later, and popped the OOMOO out. Success!

{% include img1.html subpath="08-molding-casting" img="oomoo-mold.jpg" %}

I was really surprised by (a) the lack of air bubbles in the surface and (b) the fidelity of the wax shape. Every little machining marks was easy to see in the OOMOO mold (which was both impressive and slightly disappointing). I'm curious to know about ways to clean up the machining marks in this process, but it was also awesome that it worked so well the first time.

## Hydrostone

Chugging right along, I mixed up a small amount of Hydrostone and poured it into the OOMOO mold. I somehow managed to mix _exactly_ the right amount, which was satisfying, but also meant I didn't have any extra to use as a curing test. After putting the mold in the vaccuum chamber once more, I left it to set in the shop. I came back a little while later and found...

{% include img1.html subpath="08-molding-casting" img="concrete-hat-and-mold.jpg" %}

...a tiny concrete hat!

{% include img1.html subpath="08-molding-casting" img="concrete-hat.jpg" %}