import '../src/styles/index.scss';

$(function () {
  $(window).scroll(function () {
    var height = $(window).scrollTop();
    if (height >= 200) {
      $('.header__top').addClass('header__top_fix');
    } else {
      $('.header__top').removeClass('header__top_fix');
    }
  });

  $('.menu-btn').on('click', function () {
    $('.navigation').toggleClass('navigation_active');
  });

  $('.menu-btn').on('click', function () {
    $('.menu-btn__string').toggleClass('menu-btn__string_active');
  });

  $('.header, .footer').on('click', 'a', function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 1500);
  });

  $('.feedback-slider').slick({
    dots: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {},
      },
      {
        breakpoint: 600,
        settings: {},
      },
      {
        breakpoint: 480,
        settings: {},
      },
    ],
  });
});
