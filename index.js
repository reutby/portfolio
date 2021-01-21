





$(function () {
  //
  var isMobile;

  if (/Android|webOS|Pixel2|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;

  }

  var $window = $(window);
 
  var navPos = $('.navigation').position().top;
  var lastPos = 0;
  var lockTimer;
  $window.on('scroll', ()=>{
    // // NAV POSITION

    var pos = $(window).scrollTop();
    var pos2 = pos + 50;

      if (pos >= navPos + $('.navigation').height() && lastPos < pos) {
        $('.navigation').addClass('fixed-position navigation-animation');
      }
      if (pos < navPos && lastPos > pos) {
        $('.navigation').removeClass('fixed-position navigation-animation');
      }
      lastPos = pos;
    

      
    // Link Highlighting
    if (pos2 > $('#section-home').offset().top) {
      highlightLink('home');
    }
    if (pos2 > $('#section-about').offset().top) {
      highlightLink('about');
    }
    if (pos2 > $('#section-skills').offset().top) {
      highlightLink('skills');
    }
    if (pos2 > $('#section-projects').offset().top) {
      highlightLink('projects');
    }
    if (pos2 > $('#section-contact-me').offset().top) {
      highlightLink('contact');
    }

    // // prevent hover on scroll
    // clearTimeout(lockTimer);
    // if (!$('body').hasClass('u-disable-hover')) {
    //   $('body').addClass('u-disable-hover');
    // }

    // lockTimer = setTimeout(function () {
    //   $('body').removeClass('disable-hover');
    // }, 500);
  })


  var $animation_elements_left = $('.enter-from-left');
  var $animation_elements_right = $('.enter-from-right');
  var $animation_elements_fill_in_60 = $("div[class*='skill__fill-in--60']");
  var $animation_elements_fill_in_70 = $("div[class*='skill__fill-in--70']");
  var $animation_elements_fill_in_80 = $("div[class*='skill__fill-in--80']");
  var $animation_elements_fill_in_90 = $("div[class*='skill__fill-in--90']");
  

  $window.on('scroll', () => {
    check_view($animation_elements_fill_in_70, is_in_view, "u-fill-in-animation u-fill-in-animation--70");
    check_view($animation_elements_fill_in_80, is_in_view, "u-fill-in-animation u-fill-in-animation--80");
    check_view($animation_elements_fill_in_90, is_in_view, "u-fill-in-animation u-fill-in-animation--90");
    check_view($animation_elements_fill_in_60, is_in_view, "u-fill-in-animation u-fill-in-animation--60");

  });

  //bug - 
  // $window.on('scroll',()=>{
  //   check_view($animation_elements_right, is_in_view, "u-animate-right-to-left");
    
  // });
  $window.on('scroll', ()=>{
    check_view($animation_elements_left, is_in_view, "u-animate-left-to-right");
  });


  //CONTACT FORM
  $("#contact-form").on('submit', (e) => {
    e.preventDefault();
    const message = 'Name : ' + $('#name').val() + ' Mail: ' + $('#email').val() + ' Message: ' + $('#message').val();
     $.ajax({
      contentType:'application/x-www-form-urlencoded',
      userAgent:'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.60 Safari/537.1',
      url: 'https://formspree.io/f/xknpkazq',
      method: 'POST',
      data: { message:message },
      dataType:'json'
    }).done(function (res) {
      $('#success-message').addClass('message-visible');

      $('#contact-form')
        .find('input[type=text], input[type=email], textarea')
        .val('');
    }).fail((err) => {

      $('#failed-message').addClass('message-visible');

    });
  });


  function highlightLink(anchor) {
    $('ul .active').removeClass('active');
    $('ul')
      .find('[dest="' + anchor + '"]')
      .children().addClass('active');
  }





  function is_in_view($element, element_class, element_bottom_position, window_top_position, element_top_position, window_bottom_position) {
    if ((element_bottom_position >= window_top_position) &&
      (element_top_position <= window_bottom_position)) {
      $element.addClass(element_class);

    } else {
      $element.removeClass(element_class);
    }
  }
  function check_view($element_target, callback, element_class) {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($element_target, function () {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);

      //check to see if this current container is within viewport
      callback($element, element_class, element_bottom_position, window_top_position, element_top_position, window_bottom_position);
    });
  }
}
);


