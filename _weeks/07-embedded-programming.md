---
layout: week
title: 7 - Embedded Programming
image: /07-embedded-programming/blink-stack.jpg
short: Scratch AVR
published: true
order: 7
---

This week was all about embedded programming. Since I came into this course with a significant background in software, I decided to do something a little different than the assignment. In particular, rather than try to program my board with as many environments as possible, I decided to try to _create_ my own programming environment for AVR chips. Naturally, as a member of Lifelong Kindergarten, I decided to see what Scratch could offer.

In LLK, we're currently hard at work on the next major version of Scratch (v. 3.0) which will launch in 2018. This is a complete rewrite of the platform done in web languages (i.e., HTML/CSS/JavaScript). As part of that effort, the Scratch team has been highly intentional about splitting the project into a series of subprojects/libraries that are independent of one another. This means that other developers can grab just the pieces they need (e.g., VM, audio engine, etc.) for their own projects. I've been wanting to dive into the frontend GUI code (i.e., "Scratch Blocks") and this seemed like the perfect opportunity.

{% include img1.html subpath="07-embedded-programming" img="scratch-ui.jpg" %}

After a quick chat with Kreg about the idea, we settled on a basic architecture in which we could use Scratch Blocks as a UI for AVR programmers which would communicate over WebSockets to a lightweight node.js server. That server would be responsible for compiling the code, programming the chip, and communicating results back to the UI. Kreg also pointed me toward the avrgirl project which is effectively a node.js version of avrdude.

It wasn't too hard to get the Scratch Blocks interface up and working. The project is well architected (with zero dependencies) and since it's based off of Google's Blockly project, there's a significant amount of documentation out there as well. At first, I thought I was going to have to manually traverse the tree of code blocks in order to generate AVR code, but after some deeper digging, I discovered that Blockly already has transpilation support built into the project. This was a huge win, because it meant that instead of writing tree traversal algorithms and code generation tools, I could simply define my own AVR extension to Blockly to output the code that maps to the AVR chips from the Scratch Blocks.

{% include img1.html subpath="07-embedded-programming" img="blockly-generators.jpg" %}

I first focused on developing a small set of blocks that would be useful to AVR programmers. In doing this, I decided my main goal for this week would be to get a "blink" program up and working through the Scratch interface. It was an interesting challenge to think about what sorts of blocks should be included and how those would map to final code generation. One possible way would be to have a monolithic `main` hat block that would be the one and only entry point to the program. I decided instead to split the entry points into a `startup` block (run before the main loop) and the `every loop` block which would encapsulate any code that needed to run inside the main loop. This basically follows Arduino's method, though the blocks interface naturally allows one to create multiple `startup` and `main` blocks. (Aside: while this could be confusing, I think it's a interesting way to think about programming a chip; rather than all the code being linear, you can split it up into "tasks" that need to be accomplished at various points and the transpiler/compiler can take care of serializing them). I also created a `when PIN goes HIGH/LOW` block thinking that it would be a good way to implement interrupts in the future.

{% include img1.html subpath="07-embedded-programming" img="avr-hats.jpg" %}

From there I built out a few blocks for reading and writing to pins, timing, etc. This allowed me to put together a simple blink program in the blocks UI.

{% include img1.html subpath="07-embedded-programming" img="blink-blocks.jpg" %}

I also brought in some of the existing Scratch block categories which would be helpful to an AVR programmer (e.g., control flow, operators, and variable declarations).

{% include img1.html subpath="07-embedded-programming" img="block-library.jpg" %}

From there, I started to implement the transpiler pieces. Mostly, this was a matter of becoming familiar with Blockly's documentation and the existing Scratch block implementations. Once I got the hang of it, though, it wasn't too hard to implement the code generation. In thinking about how to agglomerate all the code into a single file, I defined a basic AVR template file and used regular expressions to replace some embedded markers with the code generated from the blocks.

{% include img1.html subpath="07-embedded-programming" img="c-template.jpg" %}

In the UI, I added a code generation block on the right which allows the person to hit a button and see the generated C code before they try to send it to the chip.

{% include img1.html subpath="07-embedded-programming" img="code-box.jpg" %}

After this, I started to implement the server piece of the project. I had only used WebSockets a few times in the past so I was curious about how complex that piece would be, but it turned out to be very straightforward. Once the socket was talking back and forth to the browser, I added a second box to the UI to display compilation/flash results to the user.

{% include img1.html subpath="07-embedded-programming" img="status-box.jpg" %}

Getting the code sent across the socket and the compilation to run turned out to be easy. The sticking point happened when I tried to integrate `avrgirl` to talk with the Atmel chips. The current version that uses the USBtiny is in beta, though after this project, I would argue it isn't even that far yet. Several pieces of the documentation were out of date or just plain wrong, and overall there were just a lot of poorly architected pieced in the project.

But at first, all I knew was that I couldn't get the code to load onto my board. For a long time, I was convinced my code generation was borked and spent a bunch of time pouring through that (which wasn't a total waste of time; I did uncover a few small bugs). But no matter what I did, I couldn't get the chip to properly flash. I tried a bunch of different programmers (included the FabGiantISP from last week) but none seemed to make any difference. I narrowed it down to just the software after flashing the hardware a bunch of times using other methods. Eventually, I got to the point where I determined that even though `avrgirl` was saying it was flashing the chip correctly, it just straight-up wasn't. So, this week turned out to be a close-but-no-cigar kind of project. I'd still like to keep working on it in the future and Kreg expressed interest in teaming up. Maybe with some more eyes on the problem we can fix this one.

{% include img2.html subpath="07-embedded-programming" img1="avr-ui.jpg" img2="board-wont-flash.jpg" %}
