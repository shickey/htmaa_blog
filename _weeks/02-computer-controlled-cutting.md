---
layout: week
title: 2 - Computer-Controlled Design
image: /02-ccc/locked-combs.jpg
short: Vinyl and Laser Cutting
published: true
order: 2
---

This week was all about computer-driven cutting machines (specifically vinyl cutters and laser cutters). After our intial training session with John and Tom, our small group met in the shop to experiment and practice with both machines.

### Vinyl Cutter
<hr class="title-underline">

Pinar and I worked together to do some test prints on the vinyl cutter. After trying a simple print using one of the files already on the computer, we moved into using various tools to print our own designs. I chose a logo from [my favorite ice cream shop in Minneapolis](https://milkjamcreamery.com/) (and in the world), which was mercifully already in svg format. After culling some of the paths, I had a simple ice cream cone drawing. This printed really nicely in red and is now proudly displayed on the back on my laptop.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-2 col-sm-6 col-xs-12" href="{{ "/02-ccc/milkjam-logo.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/milkjam-logo.png" | prepend: site.imgurl }}">
  </a>
  <a class="col-md-4 col-sm-6 col-xs-12" href="{{ "/02-ccc/milkjam-computer.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/milkjam-computer.jpg" | prepend: site.imgurl }}">
  </a>
</div>

### Laser Cutter
<hr class="title-underline">

The first thing I wanted to do with the laser cutter was figure out the best slot width for this week's project of building a press-fit construction kit. After using a calipers to measure the thickness of the cardboard we're using this week (which came out to 0.165"), I decided to draw and cut a "test comb" to figure out which slot width would provide the best fit, accounting for the kerf of the laser. I made a simple drawing in Fusion 360 with slots ranging from 0.160" to 0.170", increasing by 0.001" each time. I also added chamfers to the slots to make it easier to fit pieces together.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/02-ccc/comb-drawing.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/comb-drawing.png" | prepend: site.imgurl }}">
  </a>
</div>

After bringing this into CorelDraw on the shop machine, I decided to add text below each slot to indicate its thickness. With help from John, I printed two combs so I could test the fit between them.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/02-ccc/printed-combs.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/printed-combs.jpg" | prepend: site.imgurl }}">
  </a>
</div>

After trying to fit each respective pair of slots together, I was surprised by how much the fit actually changed from 0.160" to 0.170". The smaller slots required some significant force to push together, whereas the larger slots were easy to fit, but the pieces were quite wobbly. I found that 0.163" provided a good balance between easy combination and structural strength.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/02-ccc/locked-combs.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/locked-combs.jpg" | prepend: site.imgurl }}">
  </a>
</div>

### Press-Fit Construction Kit
<hr class="title-underline">

