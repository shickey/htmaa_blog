// Lightbox support for media elements
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox({
      always_show_close: false
    });
});