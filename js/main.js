"use strict";

$(function () {

    var App = function () {

        return {
            init: function init() {
                DummyModule.init();

                GoTop.init();
                NewsCarousel.init();
                Fady.init();
                ContactsReadMore.init();
                YamapContacts.init();
                TopNavSelects.init();
                SimpleSelects.init();
                NiceFileInput.init();
                MaskedInput.init();
                BrickMenu.init();
                SideMenu.init();
                AdsReadMore.init();

                LoginForm.init();
            }
        };
    }()

    /**
     * News Carousel
     */
    ,
        NewsCarousel = function () {
        return {
            init: function init() {
                $("#news_carousel").slick({ "slidesToShow": 4, "slidesToScroll": 4, "dots": true, "arrows": false });
            }
        };
    }()

    /**
     * Go top position fix
     */
    ,
        GoTop = function () {
        return {
            init: function init() {
                if (!$("#go_top").length) return;

                // Behaviour
                $("#go_top").on('click', function () {
                    $('html,body').animate({
                        scrollTop: 0
                    }, 200);

                    return false;
                });

                // Position fix
                var d = 120;
                if ($(".layout-L3__col--col3").length) {
                    var h3 = $(".layout-L3__col--col3").height(),
                        h2 = $(".layout-L3__col--col2").height(),
                        h1 = $(".layout-L3__col--col1").height();

                    if (h3 + d > h2 && h3 + d > h1) {
                        $(".layout-L3__col--col3").css('padding-bottom', '120px');
                    }
                }
                if ($(".layout-L2__col--col2").length) {
                    var h2 = $(".layout-L2__col--col2").height(),
                        h1 = $(".layout-L2__col--col1").height();

                    if (h2 + d > h1) {
                        $(".layout-L2__col--col2").css('padding-bottom', '160px');
                    }
                }
            }
        };
    }()

    /**
     * Dummy Module Example
     */
    ,
        Fady = function () {
        return {
            init: function init() {
                var $F = $("#fady");

                if (!$F.length) return false;
                if ($F.hasClass('off')) return false;

                window.setTimeout(function () {
                    var sTransitionEndEvt = 'transitionend webkitTransitionEnd oTransitionEnd';
                    $F.addClass('disabled').on(sTransitionEndEvt, function () {
                        $F.remove();
                    });

                    // на случай если transition не была запущена вовсе
                    window.setTimeout(function () {
                        if ($F.length) $F.remove();
                    }, 410);
                }, 1);
            }
        };
    }()

    /**
     * Read More
     */
    ,
        ContactsReadMore = function () {
        return {
            init: function init() {
                if (!$("#read_more").length) return false;

                $("#read_more").on('click', function (event) {
                    var $this = $(event.currentTarget);
                    $this.prev().toggleClass('full');
                    if ($this.attr('data-activated')) {
                        $this.text('подробно');
                        $this.attr('data-activated', 0);
                    } else {
                        $this.text('кратко');
                        $this.attr('data-activated', 1);
                    }

                    return false;
                });
            }
        };
    }()

    /**
     * YAMAP Contacts
     */
    ,
        YamapContacts = function () {
        var map;

        return {
            init: function init() {
                if (!$("#map").length) return false;

                var map;
                ymaps.ready(function () {
                    var x = 55.624824;
                    var y = 37.728454;

                    map = new ymaps.Map("map", {
                        center: [x, y],
                        zoom: 16,
                        controls: []
                    });

                    var myPlacemark = new ymaps.Placemark([x, y], {}, {
                        iconLayout: 'default#image',
                        iconImageHref: 'images/placemark.png',
                        iconImageSize: [53, 50],
                        iconImageOffset: [-20, -60]
                    });

                    map.geoObjects.add(myPlacemark);
                });
            }
        };
    }()

    /**
     * TopNav Selects
     */
    ,
        TopNavSelects = function () {
        var TNS = {};
        TNS.$instance = null;

        TNS.attachEvents = function () {
            TNS.$instance.on('click', function (ev) {
                ev.stopPropagation();
                TNS.closeAll();
                $(ev.currentTarget).parent().toggleClass('dropdown--expanded');

                SideMenu.closeAll();
                BrickMenu.closeAll();

                return false;
            });

            $('body').on('click', function (ev) {
                $('.dropdown').removeClass('dropdown--expanded');
            });
        };
        TNS.closeAll = function () {
            $('.dropdown').removeClass('dropdown--expanded');
        };
        TNS.init = function () {
            TNS.$instance = $(".dropdown__link-wrapper");
            if (!TNS.$instance.length) return false;

            TNS.attachEvents();
        };

        return TNS;
    }()

    /**
     * Dummy Module Example
     */
    ,
        SimpleSelects = function () {
        return {
            init: function init() {
                $("select").simpleselect();
            }
        };
    }()

    /**
     * Dummy Module Example
     */
    ,
        NiceFileInput = function () {
        return {
            init: function init() {
                $("input[type=file]").each(function () {
                    $(this).nicefileinput({
                        label: $(this).attr('data-value')
                    });
                });
            }
        };
    }(),
        MaskedInput = function () {
        return {
            init: function init() {
                $("input.form__input--telephone").each(function () {
                    $(this).mask($(this).attr('data-mask'));
                });
            }
        };
    }(),
        BrickMenu = function () {
        var BM = {};
        BM.$instance = null;

        BM.closeAll = function () {
            $(".logo-bar__submenu").removeClass("toggled");
        };
        BM.attachEvents = function () {
            BM.$instance.on('click', function (ev) {
                ev.stopPropagation();
                BM.closeAll();
                SideMenu.closeAll();
                TopNavSelects.closeAll();
                if ($(this).next().hasClass('logo-bar__submenu')) {
                    $(this).next('.logo-bar__submenu').addClass('toggled');
                } else {
                    return true;
                }

                return false;
            });

            $('body').on("click", function (e) {
                BM.closeAll();
                $(".logo-bar__submenu").removeClass("toggled");
            });
        };
        BM.init = function () {
            BM.$instance = $('.logo-bar__menu-link');
            if (!BM.$instance.length) return false;

            BM.attachEvents();
        };

        return BM;
    }(),
        SideMenu = function () {
        var SM = {};
        SM.timer = 0;
        SM.$callers = null;

        SM.isOpened = function () {
            return !!$('.sidemenu__submenu.active').length;
        };
        SM.closeAll = function () {
            $('.sidemenu__submenu').removeClass('active');
            $('.sidemenu__link').removeClass('active');
        };
        SM.open = function ($menu) {
            SM.closeAll();
            $menu.addClass('active').next('.sidemenu__submenu').addClass('active');
            window.clearTimeout(SM.timer);
        };
        SM.attachEvents = function () {
            SM.$callers.on('mouseenter', function () {
                var $this = $(this);

                window.clearTimeout(SM.timer);

                if (SM.isOpened()) {
                    // действие с задержкой
                    SM.timer = window.setTimeout(function () {
                        SM.open($this);
                    }, 180);
                } else {
                    // запуск сразу
                    SM.open($this);
                }

                return false;
            });
            SM.$callers.on('click', function (ev) {
                ev.stopPropagation();
                if ($(this).next().hasClass('sidemenu__submenu')) {
                    SM.open($(this));
                } else {
                    return true;
                }
                return false;
            });

            $(".sidemenu__submenu").on("mouseenter", function () {
                window.clearTimeout(SM.timer);
            });

            $('body').on("click", function (e) {
                SM.closeAll();
                return true;
            });
        };
        SM.init = function () {
            SM.$callers = $('.sidemenu__link');
            if (!SM.$callers.length) return false;

            SM.attachEvents();
        };

        return SM;
    }(),
        LoginForm = function () {
        return {
            init: function init() {
                $("#login_form").validate({
                    messages: {
                        login: "Укажите Ваш логин",
                        password: "Укажите Ваш пароль"
                    },
                    submitHandler: function submitHandler(form) {
                        // сюда процесс сабмита вставляем
                        // $(form).ajaxSubmit();
                        return false;
                    }
                });
            }
        };
    }()

    /**
     * Dummy Module Example
     */
    ,
        AdsReadMore = function () {
        return {
            init: function init() {
                if (!$(".ads__read-more").length) return false;
                $(".ads__read-more").on('click', function () {

                    var $adtext_ad = $(this).prevAll('.ads__adtext').find('.ads__adtext-ad');

                    if ($adtext_ad.length) {
                        $adtext_ad.toggleClass('ads__adtext-ad--hidden');

                        if ($(this).text() == 'подробнее') {
                            $(this).text('кратко');
                        } else {
                            $(this).text('подробнее');
                        }
                    }

                    return false;
                });
            }
        };
    }()

    /**
     * Dummy Module Example
     */
    ,
        DummyModule = function () {
        return {
            init: function init() {
                // do something
            }
        };
    }();App.init();
});
