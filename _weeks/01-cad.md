---
layout: week
title: 1 - Computer-Aided Design
image: /01-cad/oven_cad.png
short: Drawing in 2D and 3D
published: true
order: 1
---

This first week focused on experimenting with different methods and tools for drawing in both 2D and 3D. For the first assignment, we were asked to come up with an idea for a (potential) final project for the course. I began by brainstorming some ideas.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/01-cad/notebook_brainstorm.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/01-cad/notebook_brainstorm.jpg" | prepend: site.imgurl }}">
  </a>
</div>

From this initial list, I decided to further investigate two through simple sketches in my notebook.

## First Idea: Training Banjo
<hr class="title-underline">

The first idea was to design and build a open-back banjo with an integrated system for helping the player learn new tunes and/or practice their technique. My initial thought was that steel strings and metal frets make a nice matrix of electrical pathways that would be completed when the player pushes down on the strings. By detecting these connections, a microcontroller could determine when and where the player placed their fingers on the strings. Then, the controller could "play" this information back to the player by lighting up LEDs on the fretboard while also playing the recorded audio back to the player. I also considered the idea that the player could upload tunes to the banjo (MIDI files or tablature files) that could then be demonstrated by the lights on the instrument so the player could see where to place their fingers on the fretboard itself. After sketching this out, I realized it may be very difficult to determine exactly where the fingers were placed since pressing a string would likely push that string against multiple frets.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/01-cad/notebook_banjo.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/01-cad/notebook_banjo.jpg" | prepend: site.imgurl }}">
  </a>
</div>

## Second Idea: Countertop High-Temperature Pizza Oven
<hr class="title-underline">

I also spent some time playing around with the idea of making a countertop pizza oven that could fire at actual pizza oven temperatures (700-1000&deg;F). This idea stems form the fact that a couple of years ago, I built a wood-fired pizza oven using traditional methods of brick and cob construction:

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/01-cad/oven.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/01-cad/oven.jpg" | prepend: site.imgurl }}">
  </a>
</div>

This uses a very old building technique that produces incredible results. The materials are very cheap and the oven can easily get to temperatures of 1000&deg;F using hardwood fuel. Pizzas cook in 2-3 minutes using the retained heat in the thermal mass of the oven hearth and walls (as opposed to a typical home oven that cooks using hot ambient air). However, this type of oven has some serious downsides:

### Issues with Traditional Cob Oven
<hr class="title-underline">

- **Weight/Immobility**: The oven I built weighed somewhere between 2 and 3 tons and was built on a foundation sunk 18 inches below grade. That thing is NOT moving anywhere ever.
- **Weather**: Traditional cob materials are not waterproof, so the oven can only be fired during dry weather (and when there is going to be at least 24 hours of dry weather after cooking to allow the oven to fully cool before covering it again).
- **Fuel Requirements**: Getting this type of oven up to cooking temperature requires completely saturating the oven hearth and walls with heat from the burning logs. While relatively efficient (for a wood-fired apparatus), my oven required about 2 hours of continuous firing (and somewhere around 5-8 fireplace-sized logs) to come up to temperature. This is fine when you want to cook a ton of pizza for a lot of people, but when you only want one or two pies, it's a huge waste of time and fuel.

Based on these limitations, I have been on the search for a method of cooking a small amount of pizza at home. Ideally, this method would address the following concerns (in order of essential-ness).

### Design Goals for Home Pizza Oven
<hr class="title-underline">

- **High Temperature**: There is simply no way around the fact that the best pizza requires a seriously hot oven (700+&deg;F). Home ovens typically max out at 500-550&deg;F which doesn't quite do the trick. A good home pizza oven should hit at least 700&deg;F.
- **Large Thermal Mass**: Arguably, the bigger problem with home ovens is the aforementioned fact that they are designed to cook using the air as opposed to a pizza oven which cooks using the retained heat in the walls and hearth. A good home pizza oven would use some material as thermal mass to cook with instead of air.
- **Fuel Efficient &amp; Short Preheat Time**: It'd be nice to be able to cook one or two pizzas without heating the oven for hours, both for time sake and for fuel sake. Even a home oven with a ceramic pizza stone takes about an hour to fully come up to temperature.
- **Multiple Pizza Potential**: There _do_ exist some smaller ovens or cooking appliances for making home pizza. Typically, these cool down rapidly once a pizza is thrown in (related to the thermal mass issue above). I'd like something that I can cook several pizzas in a row without losing too much heat.


### The Idea
<hr class="title-underline">

In the literature (read: pizza blogs), the hot new item for home pizza cooking is the pizza steel. Essentially this is a thick chunk of seasoned steel that replaces traditional ceramic/refractory pizza stones. Supposedly, they exhibit better heat transfer and give better results in a home oven. Given this, I started to think about how one could build a home pizza oven using steel as the cooking surface/thermal mass. I then started reading up about induction cooking which using osciallating magnetic fields to heat ferromagnetic cookware to high temperatures with excellent energy efficiency (compared to electric or gas stoves). This brought me to consider: could I build a induction pizza oven using cast iron floor and ceiling (for thermal mass) that could be used at home? Considering that I know virtually nothing about engineering such a device, I really have no clear idea if this is possible, but it was fun to consider. I started by drawing some simple sketches:

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/01-cad/notebook_oven.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/01-cad/notebook_oven.jpg" | prepend: site.imgurl }}">
  </a>
</div>

From there, I began to play around with modeling the oven in a CAD system. I started experimenting with FreeCAD ut quickly became frustrated after multiple crashes. I switched to Fusion 360 where I had more luck.

I drew the cast iron thermal mass using constraints and with hole on the front for easy removal from the oven (for cleaning, etc.).

<div class="row media-row">
  <a class="col-md-4 col-md-offset-2 col-sm-6 col-xs-12" href="{{ "/01-cad/cad_cast-iron-sketch.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/01-cad/cad_cast-iron-sketch.png" | prepend: site.imgurl }}">
  </a>
  <a class="col-md-4 col-sm-6 col-xs-12" href="{{ "/01-cad/cad_cast-iron-plate.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/01-cad/cad_cast-iron-plate.png" | prepend: site.imgurl }}">
  </a>
</div>

I then drew the basic shape of the oven and positioned the cast iron plates inside.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-2 col-sm-6 col-xs-12" href="{{ "/01-cad/cad_oven-body.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/01-cad/cad_oven-body.png" | prepend: site.imgurl }}">
  </a>
  <a class="col-md-4 col-sm-6 col-xs-12" href="{{ "/01-cad/cad_oven-body-front.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/01-cad/cad_oven-body-front.png" | prepend: site.imgurl }}">
  </a>
</div>

One thing I didn't realize (having come from only using tools like Sketchup in the past) was that the system models objects as solid by default. I then had to figure out how to hollow out the inside so I could place the rest of the internal components. After figuring out how to use section planes, I modeled a spot for the induction coils, the insulation, and the electronic in the back on the machine.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/01-cad/cad_oven-section.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/01-cad/cad_oven-section.png" | prepend: site.imgurl }}">
  </a>
</div>

Finally, I figured out how to draw a door, add a joint to allow it to animate open and closed, and how to add materials to the various objects.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/01-cad/cad_oven-with-door.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/01-cad/cad_oven-with-door.png" | prepend: site.imgurl }}">
  </a>
</div>

I have no idea if this idea will actually come to fruition, but I'm excited to find out!

