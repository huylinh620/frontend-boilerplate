$(function() {
  $(window).scroll(function() {
    if(this.scrollY > 20) {
      $('.header').addClass('sticky');
    } else {
      $('.header').removeClass('sticky');
    }
  })

  $('.navbar-toggler').click(function() {
    $('.header').toggleClass("active");
  });
});
