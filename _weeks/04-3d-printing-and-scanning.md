---
layout: week
title: 4 - 3D Printing & Scanning
image: /04-3d-printing-and-scanning/trefoil-mesh.jpg
short: Knots
published: true
order: 4
---

This week was as much about battling with CAD software as it was about actually 3D printing and scanning objects. Our assignment was to print a small object that could not have been made with a subtractive process (i.e., something with overhangs, nested parts, etc).

## The Idea

In thinking about what sorts of objects would be interesting to print, I started thinking about interesting topological surfaces. My first thought was the [real projective plane](https://en.wikipedia.org/wiki/Real_projective_plane), but then quickly switched to thinking about the [Klein bottle](https://en.wikipedia.org/wiki/Klein_bottle) since it has some clearer embeddings in three dimensions. Given the mathematical nature of the project, I thought this would be a good time to experiment with an f-rep tool like Antimony.

## Battling with CAD

After messing around a bit with the interface and scripting language, I started trying to figure out how to define a complex mathematical object in an Antimony node. In my first attempt, I created a point set from parametric equations and drew it as a wireframe on the screen. This looked kind of cool, but I realized that this is actually counter to the model of a program like Antimony (i.e., I hadn't actually defined a shape using a mathematical expression; instead I used a mathematical expression to spit out a series of points). This meant I had no way to connect the object into other nodes in the graph and was therefore, basically useless.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/04-3d-printing-and-scanning/klein-spiral.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/04-3d-printing-and-scanning/klein-spiral.jpg" | prepend: site.imgurl }}">
  </a>
</div>

I then found a polynomial equation for an embedding of the Klein bottle and used the function node in Antimony to model it. This worked okay, but when I went to export it as a mesh, the folded boundaries turned into kind of a mess (which probably makes sense given the weird-ness of the shape).

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/04-3d-printing-and-scanning/klein-embedding.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/04-3d-printing-and-scanning/klein-embedding.jpg" | prepend: site.imgurl }}">
  </a>
</div>

From there, I went back to square one and thought about what else I could model in the same vein, but less topologically complex. I then thought about mathematical knots and specifically, the trefoil. After tracking down [this paper](http://data.imaginary-exhibition.com/IMAGINARY-Trefoil-Stephan-Klaus.pdf), I tried to implement the surface in a function node. However, converting the function to prefix notation was...shall we say...less than fun, and once I got Antimony to parse it, the surface still wouldn't render correctly.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-2 col-sm-6 col-xs-12" href="{{ "/04-3d-printing-and-scanning/horrible-prefix-function.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/04-3d-printing-and-scanning/horrible-prefix-function.jpg" | prepend: site.imgurl }}">
  </a>
  <a class="col-md-4 col-sm-6 col-xs-12" href="{{ "/04-3d-printing-and-scanning/bad-trefoil-equations.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/04-3d-printing-and-scanning/bad-trefoil-equations.jpg" | prepend: site.imgurl }}">
  </a>
</div>

I then wondered if I could simply draw the path as a point set (like I did with the Klein bottle) and somehow extrude a circle along it to create the solid. Once again, having not learned from my mistake the first time, I successfully drew the path, but then couldn't do anything with it.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-2 col-sm-6 col-xs-12" href="{{ "/04-3d-printing-and-scanning/trefoil-path-top.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/04-3d-printing-and-scanning/trefoil-path-top.jpg" | prepend: site.imgurl }}">
  </a>
  <a class="col-md-4 col-sm-6 col-xs-12" href="{{ "/04-3d-printing-and-scanning/trefoil-path-angle.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/04-3d-printing-and-scanning/trefoil-path-angle.jpg" | prepend: site.imgurl }}">
  </a>
</div>

From here, I decided I was trying to do something Antimony wasn't made to do, so I looked into other solutions. I found a [FreeCAD macro for drawing curves from parametric equations](https://www.freecadweb.org/wiki/Macro_3D_Parametric_Curve) so I decided to explore that route next.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/04-3d-printing-and-scanning/freecad-trefoil-path.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/04-3d-printing-and-scanning/freecad-trefoil-path.jpg" | prepend: site.imgurl }}">
  </a>
</div>

Getting the curve to draw wasn't all that hard, but turning it into a solid proved to be more difficult. I don't know if this was my own ignorance, or weird UX decisions in the software, or some combination of the two, but getting a circle to extrude correctly along the path was far more painful than it should be (why doesn't FreeCAD have a simple way to rotate an object in a plane other than the one it was drawn in??!?!?). At one point, I was going back and forth between Fusion and FreeCAD to try to get the thing I wanted to happen and I even looked into switching to Solidworks (unfortunately, Windows-only). Finally...FINALLY...I got a decent extrusion and exported it as a mesh.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/04-3d-printing-and-scanning/freecad-trefoil-surface.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/04-3d-printing-and-scanning/freecad-trefoil-surface.jpg" | prepend: site.imgurl }}">
  </a>
</div>

At long last, I used the mesh tools in Fusion 360 to clean up the surface into a nice trefoil.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/04-3d-printing-and-scanning/trefoil-mesh.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/04-3d-printing-and-scanning/trefoil-mesh.jpg" | prepend: site.imgurl }}">
  </a>
</div>


## Printing

The printing process was quite straightforward. I used the Wox printer we have in the Lifelong Kindergarten lab and was quickly able to get my model sliced and ready to print. The geometry required significant supports to be generated, but this was basically a point-and-click operation in the Wox software.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/04-3d-printing-and-scanning/wox-with-supports.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/04-3d-printing-and-scanning/wox-with-supports.jpg" | prepend: site.imgurl }}">
  </a>
</div>

Printing went smoothly and the model stuck well to both the bed and the generated supports.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/04-3d-printing-and-scanning/printing.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/04-3d-printing-and-scanning/printing.jpg" | prepend: site.imgurl }}">
  </a>
</div>

After an hour and a half, I pulled out the model:

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/04-3d-printing-and-scanning/finished-with-supports.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/04-3d-printing-and-scanning/finished-with-supports.jpg" | prepend: site.imgurl }}">
  </a>
</div>

And broke off the supports:

<div class="row media-row">
  <a class="col-md-4 col-md-offset-2 col-sm-6 col-xs-12" href="{{ "/04-3d-printing-and-scanning/finished-1.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/04-3d-printing-and-scanning/finished-1.jpg" | prepend: site.imgurl }}">
  </a>
  <a class="col-md-4 col-sm-6 col-xs-12" href="{{ "/04-3d-printing-and-scanning/finished-2.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/04-3d-printing-and-scanning/finished-2.jpg" | prepend: site.imgurl }}">
  </a>
</div>

A lovely trefoil, indeed!
