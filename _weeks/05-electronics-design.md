---
layout: week
title: 5 - Electronics Design
image: /05-electronics-design/first-ratsnest.jpg
short: KiCad > EAGLE
published: true
order: 5
---

This week extended our work from week 3 into the acutal design and creation of electronic circuits.

## Drawing

Since I had used EAGLE in past weeks, I thought this would be a good opportunity to try KiCad to see which software I preferred. I started by translating the hello world board traces into a schematic in KiCad. After loaded the fab parts library into the software, the rest was pretty straightforward.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/05-electronics-design/first-schematic.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/05-electronics-design/first-schematic.jpg" | prepend: site.imgurl }}">
  </a>
</div>

The first issue I encountered was getting KiCad to connect the schematic parts to footprints. I didn't realize initially that the schematic parts and footprints were in separate files, but after getting the footprints file loaded, I was able to associate the footprints fairly easily. I then moved into the board layout tool to get a sense of the interface and how the routing works.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-2 col-sm-6 col-xs-12" href="{{ "/05-electronics-design/first-ratsnest.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/05-electronics-design/first-ratsnest.jpg" | prepend: site.imgurl }}">
  </a>
  <a class="col-md-4 col-sm-6 col-xs-12" href="{{ "/05-electronics-design/first-spread-ratsnest.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/05-electronics-design/first-spread-ratsnest.jpg" | prepend: site.imgurl }}">
  </a>
</div>

After moving the footprints apart, I realized that I should definitely add the button and LED into my design before trying to route anything at all. I redrew parts of the schematic and included the new parts (I also realized the value of labelling connections in the schematic instead of connecting everything with wires). In thinking about what size resistor I would need for the LED, I look up the electric properties of the surface mount LEDs we use in the datasheet and found a maximum forward current rating of 40mA. A quick Ohm's law calculation led to believe that I would need a resistor of at least 125&Omega; in order to prevent the LED from burning out given 5V coming out of the ATTiny. I looked back at Brian's ISP programmer circuit and saw 1k&Omega; resistors on the LEDs and figuring that would be more than sufficient, added that value into my design

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/05-electronics-design/schematic-with-button.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/05-electronics-design/schematic-with-button.jpg" | prepend: site.imgurl }}">
  </a>
</div>

I then laid out the footprints and after much trial and error, finished routing all the traces. Kreg also helped me set up design rules in KiCad to senisble values for our PCB mills.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/05-electronics-design/traces.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/05-electronics-design/traces.jpg" | prepend: site.imgurl }}">
  </a>
</div>

## Milling

After exporting the files as svgs, then converting to pngs and cleaning them up in Photoshop, I went ahead and tried to mill them. The traces milled great on the first try.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/05-electronics-design/first-milled-traces.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/05-electronics-design/first-milled-traces.jpg" | prepend: site.imgurl }}">
  </a>
</div>

However, when I went to mill the outline, I cut it far too close to the copper traces and ended up destroying a few of the outer-most traces. Oops.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/05-electronics-design/first-milled-board.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/05-electronics-design/first-milled-board.jpg" | prepend: site.imgurl }}">
  </a>
</div>

So I went back to KiCad and redrew the edge cuts with far more room. Again, I exported these and milled a second board. However, I evidently screwed up something along the way and ended up milling _exactly the same board and outline_ which again resulted in damaged outer traces. ARGGGHH!

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/05-electronics-design/second-milled-board.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/05-electronics-design/second-milled-board.jpg" | prepend: site.imgurl }}">
  </a>
</div>

This time around, I went straight to Photoshop to edit the pngs and gave my edge cuts a wide berth from the copper traces. Once again, I sent these files back to the mill and...

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/05-electronics-design/third-milled-board.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/05-electronics-design/third-milled-board.jpg" | prepend: site.imgurl }}">
  </a>
</div>

Third time's a charm!

## Soldering

Kreg once told me that the number one thing I should never do in this class is solder while hungry. Evenidently, I didn't listen effectively because I did exactly that after milling the board. Specifically, he meant that if you're hungry, you'll be shakier and it'll be harder to solder accurately. What I didn't realize is that you'll also get angrier at your bad shaky soldering and it turns into a viscious cycle of solder misery. Somehow, I pushed through it and though I ended up with some pretty messy joints, I had a fully soldered board after an hour or so.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/05-electronics-design/soldered.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/05-electronics-design/soldered.jpg" | prepend: site.imgurl }}">
  </a>
</div>

## Programming

I wasn't entirely sure how to program the board at first. After grabbing the .c file off the site, I tried to adapt the Makefile from the ISP programmer to this project. I kept running into compiler errors, so I ventured back to the site where, lo and behold, there was a Makefile specifically for this project. Running make worked like a charm this time and left me with a hex file ready to load.

Once again, I wasn't super sure how to actually use my ISP programmer to program the hello world board. I figured I would need to connect the ribbon cable between the two ISP headers so I tried that and then attempt to flash the new board. This failed instantly and told me the board couldn't be found. I wondered if maybe I wasn't getting the correct voltage supplied to the new board so I broke out the multimeter and tested the connections on both the hello world board and my ISP programmer. I realized I wasn't getting any voltage between the V and GND pins on the ISP board, which surprised me. After poking around a bit more, I returned to the schematic and realized this is _by design_ and that removing the solder jumper does exactly that (i.e, removes voltage from the ISP V pin). I then figured that I would have to supply voltage to the hello world board through the FTDI header. I plugged in the FTDI cable and the ISP programmer lit right up. I ran make again to flash the hello world board (and then fuses) which worked without any problem.

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/05-electronics-design/programming.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/05-electronics-design/programming.jpg" | prepend: site.imgurl }}">
  </a>
</div>

## Testing
To test the board, I plugged it into my computer with the FTDI cable and opened up Arduino. I used the serial monitor feature to connect to the board and after sending a character across the line, I saw it echo right back. Success!!

<div class="row media-row">
  <a class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" href="{{ "/05-electronics-design/serial-monitor.jpg" | prepend: site.imgurl }}" data-toggle="lightbox" data-gallery="week-gallery">
    <img src="{{ "/05-electronics-design/serial-monitor.jpg" | prepend: site.imgurl }}">
  </a>
</div>



