window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);

}

$(document).ready(function () {
  // Отключение предлоадера через 3 секунды
  setTimeout(()=>{
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  },3000)

  // Menu
  $('.nav-icon').on('click', function () {
    if ($(".nav-icon").hasClass("close_menu")) {
      $('.nav-icon').addClass("active").removeClass("close_menu");
      $(".dropHeaderMenu").addClass("dropHeaderMenu_isActive");
      $('body').addClass("body-disabled-scroll");
      $('#overlay').addClass("active");
    } else {
      $('.nav-icon').removeClass("active").addClass("close_menu");
      $(".dropHeaderMenu").removeClass("dropHeaderMenu_isActive");
      $('body').removeClass("body-disabled-scroll");
      $('#overlay').removeClass("active");
    }
  });

  $('.dropHeaderMenu__bottomClose').on('click', function () {
    $(".dropHeaderMenu").removeClass("dropHeaderMenu_isActive");
    $('.nav-icon').removeClass("active").addClass("close_menu");
    $('body').removeClass("body-disabled-scroll");
    $('#overlay').removeClass("active");
  });

  $('#overlay').on('click', function () {
    $(".dropHeaderMenu").removeClass("dropHeaderMenu_isActive");
    $('.nav-icon').removeClass("active").addClass("close_menu");
    $('body').removeClass("body-disabled-scroll");
    $('#overlay').removeClass("active");
  });

  // $('.mobileMenu .hashLink').on('click', function () {
  //   $('.nav-icon').removeClass("active").addClass("close_menu");
  //   $(".mobileMenuContainer").removeClass("visibility");
  //   $('body').removeClass("body-disabled-scroll");
  // });
  // Menu end

  // Обработка svg
  $('img[src$=".svg"]').each(function() {
    if($(this).hasClass('no-svg')){
      return;
    }
    const $img = jQuery(this);
    const imgURL = $img.attr('src');
    const attributes = $img.prop("attributes");

    $.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Remove any invalid XML tags
      $svg = $svg.removeAttr('xmlns:a');

      // Loop through IMG attributes and apply on SVG
      $.each(attributes, function() {
        $svg.attr(this.name, this.value);
      });

      // Replace IMG with SVG
      $img.replaceWith($svg);
    }, 'xml');
  });

  // Кнопка чата
  $('.chantButton').on('click', function () {
    $(this).toggleClass("chantButton_active");
  });

  // Кнопка поиска в шапке
  $('.searchButtonHeader').on('click', function () {
    $('.headerSearch').addClass("active");
  });

  // Кнопка закрытия поиска в шапке
  $('.headerSearch__close').on('click', function () {
    $('.headerSearch').removeClass("active");
    $(this).parent().find('.textInput').val("");
  });

  // стилизация зедера при прокрутке
  const scroll = $(window).scrollTop();
  if (scroll >= 30) {
    $(".header").addClass("header_fixed");
  } else {
    $(".header").removeClass("header_fixed");
  }

  $(window).scroll(function () {
    const scroll2 = $(window).scrollTop();
    if (scroll2 >= 30) {
      $(".header").addClass("header_fixed");
    } else {
      $(".header").removeClass("header_fixed");
    }
  });

  // логика работы мини поиска
  const searchFieldMini = '.searchMini .searchMini__field'
  const searchButtonClearMini = '.searchMini__buttonClear'
  $(searchFieldMini).on('click keypress focus blur', function () {
    console.log($(this).val().length)
    if($(this).val().length !== 0) {
      $(searchButtonClearMini).addClass('active');
    }
  });
  $(searchButtonClearMini).on('click', function () {
    $(searchFieldMini).val('');
    $(this).removeClass('active')
  });

  // логика работы поиска
  const searchInput = '#searchInput';
  const searchClose = '.search__buttonClose';
  const searchButton = '.search__buttonSearch';
  const searchForm = '#searchForm';
  const searchVariants = '.searchInfo_variants';
  const searchTag = '.searchInfo__tag';

  $(searchForm).on('submit', function (e) {
    e.preventDefault()
  });

  $(searchButton).on('click', function () {
    $(searchForm).addClass('search_active');
  });

  $(searchClose).on('click', function () {
    $(searchForm).removeClass('search_active');
    $(searchVariants).removeClass('searchInfo_active');
  });

  $(searchInput).on('keypress', function (e) {
    $(searchForm).addClass('search_active');
    $(searchVariants).addClass('searchInfo_active');
  });

  $(searchInput).on('focus', function () {
    $(searchForm).addClass('search_active');
  });

  $(searchTag).on('click', function (e) {
    e.preventDefault();
    $(searchInput).val($(this).text());
  });

  // Модалка
  $('a.open-modal-js').click(function (event) {
    event.preventDefault();
    $(this).modal({
      fadeDuration: 250,
    });
    return false;
  });

  // устранение прыжка скрола после открытия и закрытия модалки
  $('body').on($.modal.BEFORE_BLOCK, function (event, modal) {
    $('body').addClass('modal-open');
  });

  $('body').on($.modal.AFTER_CLOSE, function (event, modal) {
    $('body').removeClass('modal-open');
  });

  // Swiper
  const swiper = new Swiper('.storiesSlider-js', {
    spaceBetween: 6,
    freeMode: true,
    draggable: true,
    slidesPerView: "auto",
    navigation: {
      nextEl: '.stories__next',
      prevEl: '.stories__prev',
    },
    breakpoints: {
      767: {
        spaceBetween: 10,
      }
    }
  });


  // const progressCircle = document.querySelector(".autoplay-progress svg");
  // const progressContent = document.querySelector(".autoplay-progress span");

  const swiperMain = new Swiper('.oneSlideSwiper-js', {
    spaceBetween: 0,
    freeMode: false,
    draggable: true,
    slidesPerView: "auto",
    loop: 'true',
    autoplay: {
      delay: 10000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".mainSlider__swiperPagination",
      clickable: true,
    },
    navigation: {
      nextEl: '.mainSlider__next',
      prevEl: '.mainSlider__prev',
    },
    // таймер на слайдере
    // on: {
    //   autoplayTimeLeft(s, time, progress) {
    //     progressCircle.style.setProperty("--progress", 1 - progress);
    //     progressContent.textContent = `${Math.ceil(time / 1000)}`;
    //   }
    // }
  });

  const swiperStoriesModal = new Swiper('.storiesModalSlider-js', {
    spaceBetween: 0,
    freeMode: false,
    draggable: true,
    slidesPerView: "auto",
    loop: false,
    initialSlide: 1,
    autoplay: {
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.storiesModalSlider-js__next',
      prevEl: '.storiesModalSlider-js__prev',
    },
    /*effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        translate: ["-125%", 0, -2800],
        rotate: [0, 0, -90],
      },
      next: {
        shadow: true,
        translate: ["125%", 0, -2800],
        rotate: [0, 0, 90],
      },
    },*/

    on: {
      init() {
        this.el.addEventListener('mouseenter', () => {
          this.autoplay.stop();
        });

        this.el.addEventListener('mouseleave', () => {
          this.autoplay.start();
        });
      }
    },
  });

  const swiperVertical = new Swiper(".storiesVerticalSlider-js", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    mousewheel: true,
  });

  swiperStoriesModal.on('slideChange', function (swiper) {
    let currentSlide = $('.swiper-slide.stories-modal-js').eq(swiper.activeIndex);

    BX.ajax.runAction('other:main.othermainapi.StoriesController.saveView', {
      data: {
        id: currentSlide.attr('data-id')
      }
    }).then((response) => {
      if (true === response.data) {

      }
    }, (response) => {
      console.error(response);
    });

    let video = $(".storiesModalSlider-js .swiper-slide video");
    if (video.length) {
      for (let i = 0; i < video.length; i++) {
        video[i].pause();
        video[i].currentTime = 0;
      }
      setTimeout(() => {
        video.trigger('play');
      }, 100)
    }
  });

  $('.stories-modal-js').on('click', function (e) {
    const currentSlide = $(this).attr('data-slider') - 1;
    swiperStoriesModal.slideTo(currentSlide);
    let video = $(".storiesModalSlider-js .swiper-slide video");
    if (video.length) {
      for (let i = 0; i < video.length; i++) {
        video[i].pause();
        video[i].currentTime = 0;
      }
      setTimeout(() => {
        video.trigger('play');
      }, 100)
    }
  });

  const carouselSection = new Swiper('.carouselSection-slider-js', {
    slidesPerView: 1,
    spaceBetween: 8,
    navigation: {
      nextEl: '.carouselSlider__next',
      prevEl: '.carouselSlider__prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 'auto',
        freeMode: true,
      },
      768: {
        slidesPerView: 2,
        freeMode: false,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  const carouselSection4 = new Swiper('.carouselSection4-slider-js', {
    slidesPerView: 1,
    spaceBetween: 8,
    navigation: {
      nextEl: '.carouselSlider__next',
      prevEl: '.carouselSlider__prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 'auto',
        freeMode: true,
      },
      768: {
        slidesPerView: 2,
        freeMode: false,
      },
      993: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  });

  const carousel3 = new Swiper('.carousel3-js', {
    slidesPerView: 1,
    spaceBetween: 8,
    navigation: {
      nextEl: '.carouselSlider__next',
      prevEl: '.carouselSlider__prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      550: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  const carousel6 = new Swiper('.carousel6-js', {
    slidesPerView: 1,
    spaceBetween: 8,
    navigation: {
      nextEl: '.carouselSlider__next',
      prevEl: '.carouselSlider__prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      550: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      993: {
        slidesPerView: 4,
      },
      1320: {
        slidesPerView: 6,
      },
    },
  });

  // Табы справа
  (function($) {
    $(function() {
      $(".eventCalendar ul.tabs__caption").on("click", "li:not(.active)", function() {
        BX.setCookie('BITRIX_SM_AI_EVENT_TYPE', $(this).index(), {expires: 86400});
        $(this)
            .addClass("active")
            .siblings()
            .removeClass("active")
            .closest("div.tabs")
            .find("div.tabs__content")
            .removeClass("active")
            .eq($(this).index())
            .addClass("active");
      });
      $("ul.tabs__caption").on("click", "li:not(.active)", function() {
        $(this)
            .addClass("active")
            .siblings()
            .removeClass("active")
            .closest("div.tabs")
            .find("div.tabs__content")
            .removeClass("active")
            .eq($(this).index())
            .addClass("active");
      });
      $(".diagram ul.tabs__caption").on("click", "li:not(.active)", function() {
         $(this)
            .addClass("active")
            .siblings()
            .removeClass("active")
            .closest("div.tabs__element")
            .find("div.tabs__content")
            .removeClass("active")
            .eq($(this).index())
            .addClass("active");
      });
      $("ul.tabsBig__caption").on("click", "li:not(.active)", function() {
        $(this)
            .addClass("active")
            .siblings()
            .removeClass("active")
            .closest("div.tabsBig")
            .find("div.tabsBig__content")
            .removeClass("active")
            .eq($(this).index())
            .addClass("active");
      });
    });
  })(jQuery);

  // Табы слева
  (function($) {
    $(function() {
      $(".charts_select").on("change", function() {
        let itemId = $(this).select2().val();
        $('.tabs').find('div.tabs__element').removeClass("active");
        let itemContainer = $('.tabs').find(`div.tabs__element[rel=${itemId}]`);
        itemContainer.find("li")
            .removeClass("active")
            .eq(0)
            .addClass("active");
        itemContainer.find("div.tabs__content")
            .removeClass("active")
            .eq(0)
            .addClass("active");
        itemContainer.addClass("active");
      });
    });
  })(jQuery);

  // Select2
  $(".js-select").each(function() {
    const placeholder = $(this).data('placeholder');
    $(this).select2({
      placeholder: placeholder,
      minimumResultsForSearch: -1
    });
  });
  $(".js-select-white").each(function() {
    const placeholder = $(this).data('placeholder');
    $(this).select2({
      placeholder: placeholder,
      minimumResultsForSearch: -1,
      selectionCssClass: 'select-white'
    });
  });
  $(".js-select-form").each(function() {
    const placeholder = $(this).data('placeholder');
    $(this).select2({
      placeholder: placeholder,
      minimumResultsForSearch: -1,
      selectionCssClass: 'select-form',
      dropdownCssClass: 'select-form-dropdown'
    });
  });
  $(".js-select-multi").each(function() {
    const placeholder = $(this).data('placeholder');
    $(this).select2({
      placeholder: placeholder,
      minimumResultsForSearch: -1,
      selectionCssClass: 'select-multi',
      dropdownCssClass: 'select-form-dropdown'
    });
  });

  $(function(){
    const dateRangePicker = $('.date-range');
    let locale = {
      format: 'DD.MM.YYYY'
    };
    if (BX !== undefined) {
      if (BX.message('LANGUAGE_ID') === 'ru') {
        locale={
          applyLabel: 'Применить',
          daysOfWeek: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
          cancelLabel: 'Сбросить',
          monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
          format: 'DD.MM.YYYY',
        }
      }
    }
    dateRangePicker.daterangepicker({
      autoUpdateInput: false,
      locale: locale
    });
    dateRangePicker.on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('DD.MM.YYYY') + ' - ' + picker.endDate.format('DD.MM.YYYY')).trigger('change');
    });

    dateRangePicker.on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('').trigger('change');
    });
  });

  $(function() {
    let locale = {
      format: 'DD.MM.YYYY',
    };
    if (BX !== undefined) {
      if (BX.message('LANGUAGE_ID') === 'ru') {
        locale={
          applyLabel: 'Применить',
          daysOfWeek: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
          cancelLabel: 'Сбросить',
          monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
          format: 'DD.MM.YYYY',
        }
      }
    }
    $('.datepicker').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      minYear: 1901,
      locale: locale,
      maxYear: parseInt(moment().format('YYYY'),10)
    },
      // function(start, end, label) {
      // const years = moment().diff(start, 'years');
      // alert("You are " + years + " years old!");
    // }
    );
  });

  // Запуск видео в HTML5 плеере при клике на другую кнопку
  // $('.videoBlock__play').on('click', function (e) {
  //   const video = $(this).parent().children('.videoBlock__video');
  //   console.log(video);
  //   video.trigger('play')
  //   video.attr('controls', '')
  //   $(this).hide();
  // });

  // Кнопка Share
  const shareButton = '.ya-share2__link .ya-share2__badge_more';
  $(shareButton).append('<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.333 5.333a2 2 0 100-4 2 2 0 000 4zM3.333 10a2 2 0 100-4 2 2 0 000 4zM11.333 14.667a2 2 0 100-4 2 2 0 000 4zM5.06 9.007l4.554 2.653M9.607 4.34L5.061 6.993" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>')

  // Input File
  const dropZone = $('.upload-container');

  dropZone.each(function() {
    const fileInput = $('.file-input');

    $(this).children(fileInput).focus(function () {
      $('label').addClass('focus');
    }).focusout(function () {
      $('label').removeClass('focus');
    });

    $(this).on('drag dragstart dragend dragover dragenter dragleave drop', function () {
      return false;
    });

    $(this).on('dragover dragenter', function () {
      $(this).addClass('dragover');
    });

    $(this).on('dragleave', function (e) {
      let dx = e.pageX - $(this).offset().left;
      let dy = e.pageY - $(this).offset().top;
      if ((dx < 0) || (dx > dropZone.width()) || (dy < 0) || (dy > dropZone.height())) {
        $(this).removeClass('dragover');
      }
    });

    $(this).on('drop', function (e) {
      $(this).removeClass('dragover');
      sendFiles(e.originalEvent.dataTransfer);
    });

    $(this).children(fileInput).change(function () {
      sendFiles(this);
    });

    const clearListFiles = () => {
      $(this).find('p').remove()
    }


    const sendFiles = (input) =>{
      let maxFileSize = 5242880;
      let Data = new FormData();
      clearListFiles();
      $(input.files).each( (index, file) => {
        if (file.size <= maxFileSize) {
          Data.append('images[]', file);
          $(this).prepend(`<p>${file.name}</p>`)
        } else  {
          $(input).val(null);
          alert('Размер файла превышает 5 мб')
        }
      });

      $.ajax({
        url: $(this).attr('action'),
        type: $(this).attr('method'),
        data: Data,
        contentType: false,
        processData: false,
        success: function (data) {
          // alert('Файлы были успешно загружены!');
        }
      });
    }

  });

  // Показ тегов
  $(function() {
    const $tagListName = $(".newsCard__tags");
    const $tagSearchListName = $(".searchTags");
    const $knowledgeBaseTags = $(".knowledgeBaseTags");
    const $eduCardBannerTags = $(".eduCardBannerTags");
    $tagListName.each(function() {
      let $span = $(this).find("span");
      if( $span.length <= 2 ) return;

      $span.slice(2).hide();
      $(this).append(`<span class="js-show">Еще ${$span.length - 2}</span>`);
    });

    $tagListName.on("click", ".js-show", function() {
      $(this).siblings("span").show().end().remove();
    });

    $tagSearchListName.each(function() {
      let $span = $(this).find("span");
      if( $span.length <= 4 ) return;

      $span.slice(4).hide();
      $(this).append(`<span class="js-show">Еще ${$span.length - 4}</span>`);
    });

    $tagSearchListName.on("click", ".js-show", function() {
      $(this).siblings("span").show().end().remove();
    });

    $knowledgeBaseTags.each(function() {
      let $span = $(this).find("span");
      if( $span.length <= 4 ) return;

      $span.slice(4).hide();
      $(this).append(`<span class="js-show">Еще ${$span.length - 4}</span>`);
    });

    $knowledgeBaseTags.on("click", ".js-show", function() {
      $(this).siblings("span").show().end().remove();
    })
    $eduCardBannerTags.each(function() {
      let $span = $(this).find("span");
      if( $span.length <= 4 ) return;

      $span.slice(4).hide();
      $(this).append(`<span class="js-show">Еще ${$span.length - 4}</span>`);
    });

    $eduCardBannerTags.on("click", ".js-show", function() {
      $(this).siblings("span").show().end().remove();
    });
  });

  // end Input File
  $('.buttonFav').on("click", function(e) {
    e.preventDefault()
    $(this).toggleClass("active");
  });

  // Аккордеон (надо прописывать под каждый аккордеон) !!
  if($('.accordion-container').length) {
    new Accordion('.accordion-container');
  }

  if($('.accordion-container-first-open').length) {
    new Accordion('.accordion-container-first-open', {
      openOnInit: [0],
    });
  }

  if($('.accordion-container-first-open-2').length) {
    new Accordion('.accordion-container-first-open-2', {
      openOnInit: [0],
    });
  }

  if($('.accordion-import-first-open-1').length) {
    new Accordion('.accordion-import-first-open-1', {
      openOnInit: [0],
    });
  }

  if($('.accordion-import-2').length) {
    new Accordion('.accordion-import-2');
  }

  if($('.accordion-import-3').length) {
    new Accordion('.accordion-import-3');
  }

  // Аккордеон в базе знаний
  $('.accordionMenu li.has-sub > span').on('click', function(){
    // $(this).removeAttr('href');
    const element = $(this).parent('li');
    if (element.hasClass('open')) {
      element.removeClass('open');
      element.find('li').removeClass('open');
      element.find('ul').slideUp();
    }
    else {
      element.addClass('open');
      element.children('ul').slideDown();
      element.siblings('li').children('ul').slideUp();
      element.siblings('li').removeClass('open');
      element.siblings('li').find('li').removeClass('open');
      element.siblings('li').find('ul').slideUp();
    }
  });
  $('.accordionMenu > ul > li.has-sub > span').prepend('<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6l-4 4-4-4" stroke="#5163F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');

  // Mask phone
  $('.phone_mask').inputmask({"mask": "+7 (999) 999-9999"});

  $('[data-id="INN"]').inputmask({"mask": "9999999999"});

  $('[data-id="INN"]').each(function(num, el){
    $(el).parents('form').find('[type="submit"]').attr('disabled','disabled');
  });
  $('[data-id="INN"]').focus(function(){
    $(this).parents('.formRow').find('.errorMessage').remove();
    $(this).removeClass('error');
  });
  $('[data-id="INN"]').blur(function(){
    if($(this).val().indexOf('_') > -1 || $(this).val().length == 0){
      $(this).parents('form').find('[type="submit"]').attr('disabled','disabled');
      $(this).addClass('error');
      $(this).parents('.formRow').append('<div class="errorMessage">ИНН должен быть 10 символов</div>');
    }else{
      $(this).parents('form').find('[type="submit"]').removeAttr('disabled');
    }
  });

  $('[data-id="PHONE"]').inputmask({"mask": "+7 (999) 999-9999"});
  //  Cookie
  // функция возвращает cookie с именем name, если есть, если нет, то undefined
  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  let cookiecook = getCookie("cookiecook"),
    cookiewin = document.getElementsByClassName('cookie_notice')[0];
  // проверяем, есть ли у нас cookie, с которой мы не показываем окно и если нет, запускаем показ
  if (cookiecook != "no") {
    // показываем
    cookiewin.classList.add("show");
    // закрываем по клику
    document.getElementById("cookie_close").addEventListener("click", function(){
      cookiewin.classList.remove("show");
      // записываем cookie на 1 день, с которой мы не показываем окно
      let date = new Date;
      date.setDate(date.getDate() + 1);
      document.cookie = "cookiecook=no; path=/; expires=" + date.toUTCString();
    });
  }
  $('body').on('click','[data-simple-modal]', function(event){
    event.preventDefault();
    $($(this).attr('href')).modal('show');
  });
  $('body').on('change','select',function (){
    $('[data-select="'+$(this).data('num')+'"]').each(function(num,input){
      $(input).parents('.formRow').hide();
    });

    let id = $(this).find(':selected').data('show-prop');

    $('[data-id="' + id + '"]').each(function(num,input){
      $(input).parents('.formRow').show();
    });
  });
  $('select').each(function(num,select){
    $(select).data('num', num);
    let trigger = false;
    $(select).find('option[data-show-prop]').each(function (key,option){
      if($(option).data('show-prop')){
        $('[data-id="' + $(option).data('show-prop')+ '"]').attr('data-select',num).parents('.formRow').hide();
        trigger = true;
      }
      if(trigger) {
        $(select).trigger('change');
        trigger = false;
      }
    });
  });
});