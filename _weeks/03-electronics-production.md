---
layout: week
title: 3 - Electronics Production
image: /03-electronics-production/micro-solder.jpg
short: Milling and Soldering
published: true
order: 3
---

This week we focused on the process of physically manufacturing electronics (as opposed to designing and programming electronics which we will do in a few weeks time). The goal for this week was for each person to mill and solder an in-circuit programmer which we'll use for programming _other_ boards in our future projects. The process happens in a few steps: (1) milling the PCB, (2) soldering the components, and (3) programming the programmer.

## Milling
<hr class="title-underline">

I chose to manufacture the FabTinyISP recommended on the class site which uses the ATtiny45 processor. The milling process was straightforward, and with significant help from Jake, we got a couple of boards milled relatively quickly.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/03-electronics-production/milled-pcb.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/03-electronics-production/milled-pcb.jpg" | prepend: site.imgurl }}">
  </a>
</div>

## Soldering

Step one here was to gather all the necessary components. I put together a super high-tech system for remembering which was which.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/03-electronics-production/paper-towel.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/03-electronics-production/paper-towel.jpg" | prepend: site.imgurl }}">
  </a>
</div>

After fumbling considerably with getting the ATtiny in the right position, I realized that I have never known (or been taught) how to solder properly. Jake gave me a great tutorial which proved invaluable when I went to solder the rest of the components the next day.

Here's my board after getting the processor properly soldered

<div class="row media-row">
  <a class="col-md-4 col-md-offset-2 col-sm-6 col-xs-12" href="{{ "/03-electronics-production/soldered-attiny.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/03-electronics-production/soldered-attiny.jpg" | prepend: site.imgurl }}">
  </a>
  <a class="col-md-4 col-sm-6 col-xs-12" href="{{ "/03-electronics-production/attiny-micro.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/03-electronics-production/attiny-micro.jpg" | prepend: site.imgurl }}">
  </a>
</div>

The second image is an attempt at shooting through the microscope to see the joints more clearly. Turns out microscopes are awesome for checking soldering work!

A few more images once all the components were on:

<div class="row media-row">
  <a class="col-md-4 col-sm-6 col-xs-12" href="{{ "/03-electronics-production/soldered-1.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/03-electronics-production/soldered-1.jpg" | prepend: site.imgurl }}">
  </a>
  <a class="col-md-4 col-sm-6 col-xs-12" href="{{ "/03-electronics-production/soldered-2.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/03-electronics-production/soldered-2.jpg" | prepend: site.imgurl }}">
  </a>
  <a class="col-md-4 col-sm-6 col-xs-12" href="{{ "/03-electronics-production/soldered-3.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/03-electronics-production/soldered-3.jpg" | prepend: site.imgurl }}">
  </a>
</div>

## Programming

Once everything was properly soldered, I used the programmer in the lab to bootstrap my programmer. All went according to plan on the first try! *Phew*

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/03-electronics-production/avrdude.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/03-electronics-production/avrdude.jpg" | prepend: site.imgurl }}">
  </a>
</div>

However, despite everything working okay, I wasn't 100% happy with my board. The USB contacts make the board stick out at an angle and I figured if I had to use a USB extension cable anyway to solve this problem, I would rather just have a board with a proper USB socket.

## Round 2: A Modified Programmer

I downloaded the design files for the PCB and converted them so I could use them with KiCad. I've never really laid out a PCB using this type of software before (and I know it is slightly jumping the gun since we're going to be doing this in a few weeks), but I thought it would be a good learning excercise to see if I could replace the large USB pads with pads for a smaller USB mini or micro socket. Kreg recently got some USB sockets while he was in Shenzhen that have slightly longer leads than the ones in the electronics shop, so he passed those along to me to see if I could incorporate one into the programmer design.

After fighting with file formats for a while, [this discussion](https://gitlab.cba.mit.edu/classes/863.17/site/issues/15) on GitLab led me to decide to just redraw the circuit. I opted to use Eagle, since I've been fairly happy using Fusion 360 in past weeks. Tom&aacute;s gave me a quick crash course in redrawing the schematic and laying out the parts. I ultimately opted to use the micro socket included in the fab library, in case anyone else wants to print the same board in the future.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/03-electronics-production/new-schematic.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/03-electronics-production/new-schematic.jpg" | prepend: site.imgurl }}">
  </a>
</div>

When it came to drawing the traces, it was a lot of trial, error, and iteration until something looked reasonably millable. I also moved a few of the parts around from their location on Brian's original board in order to better connect to the micro socket pins (which are not in the same order). Kreg showed me how to check the design rules and find traces that were likely to mill poorly. Finally, I got a decent layout and sent it to the mill.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/03-electronics-production/new-layout.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/03-electronics-production/new-layout.jpg" | prepend: site.imgurl }}">
  </a>
</div>

The board came out pretty well, though the pads for the USB socket are so close together that a couple of them remain fused. I'm going to cut them out with an xacto knife and go from there. Hopefully it won't be too tough to solder!

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/03-electronics-production/new-board.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/03-electronics-production/new-board.jpg" | prepend: site.imgurl }}">
  </a>
</div>
