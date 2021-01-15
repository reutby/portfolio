





$(function () {
  //


  var $animation_elements = $('.u-hide-me');

  var $window = $(window);
  $window.on('scroll', () => { check_view($animation_elements, is_in_view, "u-in-view") });


  // NAV POSITION
  var navPos = $('.navigation').position().top;
  var lastPos = 0;
  var isMobile = false;

  $(window).on('scroll', function () {
    var pos = $(window).scrollTop();

    if (!isMobile) {
      if (pos >= navPos + $('.navigation').height() && lastPos < pos) {
        $('.navigation').addClass('fixed-position navigation-animation');
      }
      if (pos < navPos && lastPos > pos) {
        $('.navigation').removeClass('fixed-position navigation-animation');
      }
      lastPos = pos;
    }

  });
  
  //CONTACT FORM
  $("#contact-form").on('submit',(e)=> {
    e.preventDefault();

    $.ajax({
      url: 'https://formspree.io/f/xknpkazq',
      method: 'POST',
      data: { message:($('form').serialize()) },
      dataType: 'json'
    }).done(function(res) {
      $('#success-message').addClass('message-visible');
      console.log(res);
      $('#contact-form')
        .find('input[type=text], input[type=email], textarea')
        .val('');
    }).fail((err)=>{console.log(err)
      $('#failed-message').addClass('message-visible');
    
    });
  });

  
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

});