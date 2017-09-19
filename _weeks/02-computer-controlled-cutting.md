---
layout: week
title: 2 - Computer-Controlled Cutting
image: /02-ccc/locked-combs.jpg
short: Vinyl and Laser Cutting
published: true
order: 2
---

This week was all about computer-driven cutting machines (specifically vinyl cutters and laser cutters). After our intial training session with John and Tom, our small group met in the shop to experiment and practice with both machines.

## Vinyl Cutter
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

## Laser Cutter
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

After getting a good test fit, I began to play around with paramteric drawing in Fusion 360 in preparation for the weekly project.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/02-ccc/parametric.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/parametric.png" | prepend: site.imgurl }}">
  </a>
</div>

It took some messing around and mistakes to get the constraints and parameters to all play nicely, but it was good practice for the project.

## Press-Fit Construction Kit
<hr class="title-underline">

### Sketches
<hr class="title-underline">

My initial idea for the project was to create a kit of parts that could be assembled into tree-like structures (with branching, etc). I started by sketching some initial design ideas and thinking about what sort of pieces I wanted to include in the kit. I figured it would be good to have a stable "trunk" base and a set of branch pieces that could be built on top of the trunk. To create branching structures, I drew a circular disc with multiple slots at different angles that could be attached to the trunk and/or end of branches. I also thought it would be cool to allow the discs to interlock at a right angle to allow for more branch angles coming out of a single point.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/02-ccc/tree-sketch.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/tree-sketch.jpg" | prepend: site.imgurl }}">
  </a>
</div>

I began sketching these parts in Fusion 360 and parametrically designed the slots so that the parts could be updated for different thicknesses of cardboard, laser kerf, etc.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/02-ccc/original-branches.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/original-branches.png" | prepend: site.imgurl }}">
  </a>
</div>

When drawing the branching nodes, I intentionally split the circle into 9ths so that the angles wouldn't turn out to be right angles or simple fractions thereof. I then extended one slot all the way to the center so that the nodes could be interlocked.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-2 col-sm-6 col-xs-12" href="{{ "/02-ccc/branch-in-ninths.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/branch-in-ninths.png" | prepend: site.imgurl }}">
  </a>
  <a class="col-md-4 col-sm-6 col-xs-12" href="{{ "/02-ccc/branch-in-ninths-with-slot.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/branch-in-ninths-with-slot.png" | prepend: site.imgurl }}">
  </a>
</div>

When I got to drawing the trunk, I shifted from my initial idea of having a simple slot in the top to sketching the same type of slots from the nodes at the top of the trunk.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/02-ccc/bad-trunk.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/bad-trunk.png" | prepend: site.imgurl }}">
  </a>
</div>

I then cut some test parts to get a sense of how they fit together.

### Test parts
<hr class="title-underline">

After cutting two node pieces and interlocking them, it was plainly obvious that these weren't going to work well since some of the slots were too close to the other interlocking piece to allow branches to connect solidly.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/02-ccc/first-node.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/first-node.jpg" | prepend: site.imgurl }}">
  </a>
</div>

I then went ahead and cut some nodes with a larger radius, the trunk pieces, and a few branches.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/02-ccc/first-tree.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/first-tree.jpg" | prepend: site.imgurl }}">
  </a>
</div>

Two things came of this. First, I realized the nodes didn't really make sense in the context of the project (since trees rarely branching directly opposite to their direction of growth of the previous branch) and were taking up more volume than I wanted compared to the branches and trunk. I then sketched out a simpler branching piece to try for the next iteration.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/02-ccc/fan-node-sketch.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/fan-node-sketch.jpg" | prepend: site.imgurl }}">
  </a>
</div>

Second, I realized I wasn't very happy with the highly rectangular and circular shapes of the pieces. Directly in CorelDraw, I very quickly tried putting some angles in the branches and cut those as well.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/02-ccc/organic-branches.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/organic-branches.png" | prepend: site.imgurl }}">
  </a>
</div>

I _really_ liked the aesthetic of these and decided to redraw all the parts in Fusion using only straight lines and including more organic-looking angles and such.

### Final Kit
<hr class="title-underline">

While redrawing parts, I also realized I could draw some branches that actually split into two branches without requiring node pieces.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/02-ccc/final-branches.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/final-branches.png" | prepend: site.imgurl }}">
  </a>
</div>

I also redrew the nodes into the fan-like shape, but intentionally broke up the symmetry to make it feel a little more organic.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/02-ccc/final-node.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/final-node.png" | prepend: site.imgurl }}">
  </a>
</div>

I redrew the trunk pieces as well, and added a split into each one to create four different "sub-trunks" to build branches off of.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/02-ccc/final-trunk.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/final-trunk.png" | prepend: site.imgurl }}">
  </a>
</div>

Finally, I drew some very short branches that I figured could be used for rotating a branch 90&deg; off of a node, thus negating the need for interlocking node pieces.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/02-ccc/final-inverter.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/final-inverter.png" | prepend: site.imgurl }}">
  </a>
</div>

I nested all the parts together in Illustrator:

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/02-ccc/nested-parts.png" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/nested-parts.png" | prepend: site.imgurl }}">
  </a>
</div>

And finally, cut them out:

<div class="row media-row">
  <a class="col-md-4 col-md-offset-2 col-sm-6 col-xs-12" href="{{ "/02-ccc/laser-cutting.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/laser-cutting.jpg" | prepend: site.imgurl }}">
  </a>
  <a class="col-md-4 col-sm-6 col-xs-12" href="{{ "/02-ccc/cut-branches.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/cut-branches.jpg" | prepend: site.imgurl }}">
  </a>
</div>

And assembled the parts:

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/02-ccc/tree-final.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/02-ccc/tree-final.jpg" | prepend: site.imgurl }}">
  </a>
</div>

I'm pretty happy with the final product. If I were to keep working on it, I would think about creating some leaf or twig-end pieces to add to the tops and ends of the branches, but I also like the bare winter-esque look of the piece.