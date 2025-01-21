document.addEventListener("DOMContentLoaded", function (event) {
  const wow = new WOW({
    live: false, // Prevents WOW.js from recalculating after DOM changes
  });
  wow.init();

  let fullPageInstance; // Variable to store the fullPage.js instance

  // function initFullPage() {
  //     if (window.innerWidth > 575) { // Only enable on screens wider than 768px
  //       // Initialize fullPage.js
  new fullpage("#fullpage", {
    responsiveWidth: 575,
    menu: "#navbar",
    autoScrolling: true,
    scrollHorizontally: true,
    afterLoad: function (origin, destination, direction) {
      // Refresh WOW.js animations after each section change
      wow.sync();
      const navbar = document.getElementById("navbar");

      if (destination.index > 0) {
        navbar.classList.add("fixed");
      } else {
        navbar.classList.remove("fixed");
      }
    },
  });
  //     } else if (fullPageInstance) {
  //         fullPageInstance.destroy('all'); // Destroy fullPage.js on mobile
  //         fullPageInstance = null; // Reset instance
  //     }
  // }

  // // Run on load
  // window.addEventListener('load', initFullPage);

  // // Run on resize
  // window.addEventListener('resize', initFullPage);

  // Navbar
  // const navbar = document.getElementById("navbar");

  // window.addEventListener("scroll", () => {
  //   if (
  //     document.body.scrollTop > 200 ||
  //     document.documentElement.scrollTop > 200
  //   ) {
  //     navbar.classList.add("fixed");
  //   } else {
  //     navbar.classList.remove("fixed");
  //   }
  // });

  // <!-- JS Mobile-Menu -->
  const bgmenu = document.querySelector(".inner-wrapper");
  document
    .querySelector(".btn-menu-mobile")
    .addEventListener("click", function () {
      document.querySelector(".popup-mobile-menu").classList.toggle("active");
    });
  document
    .querySelector(".close-btn-mobile")
    .addEventListener("click", function () {
      document.querySelector(".popup-mobile-menu").classList.remove("active");
    });
  // document.querySelector(".contact-us-mobile").addEventListener("click", function () {
  //   document.querySelector(".popup-mobile-menu").classList.remove("active");
  // });
  document.querySelector(".overlay").addEventListener("click", function () {
    document.querySelector(".popup-mobile-menu").classList.remove("active");
  });

  // <!-- Mobile - openTab-->
  // var list = document.querySelectorAll(".mobile");
  // list.forEach(function (item) {
  //   item.addEventListener("click", function (evt2) {
  //     var flag = evt2.currentTarget.parentElement.classList.contains("active");
  //     if (flag) {
  //       console.log(
  //         evt2.currentTarget.parentElement.querySelector(".child-menu")
  //       );
  //       evt2.currentTarget.parentElement.classList.remove("active");
  //       $(
  //         evt2.currentTarget.parentElement.querySelector(".child-menu")
  //       ).slideUp(300);
  //     } else {
  //       document.querySelectorAll(".accordion").forEach(function (re) {
  //         re.classList.remove("active");
  //       });
  //       evt2.currentTarget.parentElement.classList.add("active");
  //       $(
  //         evt2.currentTarget.parentElement.querySelector(".child-menu")
  //       ).slideDown(300);
  //     }
  //   });
  // });

  // All Animation Slide swiper
  // var swiperall = new Swiper(".mySwiperAll", {
  //   direction: "vertical",
  //   slidesPerView: 1,
  //   spaceBetween: 0,
  //   mousewheel: true,
  //   autoplay: {
  //     delay: 5000,
  //   },
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  //   },
  // });

  // Home Slide show
  // <!-- Swiper JS -->
  var swiper = new Swiper(".mySwiper", {
    // direction: "vertical",
    // mousewheel: true,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    // autoplay: {
    //   delay: 5000,
    // },
    autoHeight: false, // Disable autoHeight unless required
    pagination: {
      el: ".swiper-pagination-bullets",
      clickable: true, // Makes bullets clickable
    },
    on: {
      init: function () {
        // Update custom pagination on initialization
        updateCustomPagination(this);
        toggleContactUsButton(this); // Check the button visibility on init
      },
      slideChange: function () {
        // Update custom pagination on slide change
        updateCustomPagination(this);
        toggleContactUsButton(this); // Check the button visibility on slide change
      },
    },
  });

  // Function to update custom pagination
  function updateCustomPagination(swiper) {
    const current = swiper.realIndex + 1; // Get the current slide index (1-based)
    const total =
      swiper.slides.length - swiper.loopedSlides * 2 || swiper.slides.length; // Get total slides
    document.querySelector(
      ".swiper-custom-pagination"
    ).innerHTML = `${current} / ${total}`;
  }
  // Function to toggle the contact-us button visibility
  function toggleContactUsButton(swiper) {
    const activeSlide = swiper.slides[swiper.activeIndex]; // Get the active slide
    const contactUsBtn = document.querySelector(".contact-us-btn");

    if (activeSlide.classList.contains("slide-1")) {
      contactUsBtn.style.display = "block"; // Show the button if slide-1 is active
    } else {
      contactUsBtn.style.display = "none"; // Hide the button otherwise
    }
  }

  // About-us Section
  let swiperInstance = null;

  function initializeSwiper() {
    const containerShape = document.querySelector(".container-shape");
    if (containerShape) {
      if (!swiperInstance) {
        containerShape.classList.add("swiper-container");

        // Move only .group-shape elements into Swiper wrapper
        const groupShapes = Array.from(
          containerShape.querySelectorAll(".group-shape")
        );
        const wrapper = document.createElement("div");
        wrapper.classList.add("swiper-wrapper");

        groupShapes.forEach((groupShape) => {
          const slide = document.createElement("div");
          slide.classList.add("swiper-slide");
          slide.appendChild(groupShape);
          wrapper.appendChild(slide);
        });

        // Append the wrapper to the container and keep non-group-shape children
        containerShape.appendChild(wrapper);

        // Initialize Swiper
        swiperInstance = new Swiper(".swiper-container", {
          loop: true,
          pagination: {
            el: ".swiper-pagination-au",
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          },
          on: {
            init: function () {
              // Set the active color for the first bullet on load
              const bullets = document.querySelectorAll(
                ".about-us .swiper-pagination-bullet"
              );
              if (bullets.length > 0) {
                bullets[0].classList.add("active-color-1"); // Add the initial color for the first slide
              }
            },
            slideChange: function () {
              // Update pagination bullet colors on slide change
              const bullets = document.querySelectorAll(
                ".about-us .swiper-pagination-bullet"
              );
              bullets.forEach((bullet, index) => {
                bullet.classList.remove(
                  "active-color-1",
                  "active-color-2",
                  "active-color-3"
                );
                if (index === this.realIndex) {
                  bullet.classList.add(`active-color-${this.realIndex + 1}`);
                }
              });
            },
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          slidesPerView: 1,
          spaceBetween: 10,
        });
      }
    }
  }

  function destroySwiper() {
    const containerShape = document.querySelector(".container-shape");
    if (containerShape && swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;

      // Restore original layout
      containerShape.classList.remove("swiper-container");
      const wrapper = containerShape.querySelector(".swiper-wrapper");

      // Move slides back to the container as group-shape elements
      const slides = Array.from(wrapper.querySelectorAll(".swiper-slide"));
      slides.forEach((slide) => {
        const groupShape = slide.firstChild;
        containerShape.appendChild(groupShape);
      });

      // Remove the wrapper
      wrapper.remove();
    }
  }

  // Detect screen size and toggle Swiper
  function handleResize() {
    if (window.innerWidth <= 575) {
      initializeSwiper();
    } else {
      destroySwiper();
    }
  }

  // Initialize on page load and listen for resize events
  window.addEventListener("load", handleResize);
  window.addEventListener("resize", handleResize);

  var groupShapes = document.getElementsByClassName("group-shape");
  // Add event listeners to buttons
  const buttons = document.querySelectorAll(".group-shape");

  const swiperab = new Swiper(".home-about-us-swiper", {
    loop: true,
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next-2",
      prevEl: ".swiper-button-prev-2",
    },
  });

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default anchor behavior
      const slideIndex = parseInt(button.getAttribute("data-slide")); // Get slide index from data attribute

      swiperab.slideToLoop(slideIndex); // Navigate to the corresponding slide
    });
  });

  for (var i = 0; i < groupShapes.length; i++) {
    groupShapes[i].addEventListener("click", function (event) {
      var popupId = this.getAttribute("href").substring(1);
      showPopup(popupId);
    });
  }

  // Swiper gallery
  initializeSwiperGallery();

  // Swiper News Pop-up
  var popupswiper = new Swiper(".mySwiper-popup-news", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      768: { // Khi màn hình >= 768px
        slidesPerView: 3,
      },
      0: { // Khi màn hình < 768px
        slidesPerView: 2,
      },
    },
  });
  var popupswiper2 = new Swiper(".mySwiper2-popup-news", {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next-popup-news",
      prevEl: ".swiper-button-prev-popup-news",
    },
    thumbs: {
      swiper: popupswiper,
    },
  });

  // Add event listener for hot-news elements
  const hotNewsSlides = document.querySelectorAll(".hot-news");
  hotNewsSlides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
      document.querySelector(".popup-news").classList.add("active");
      const slideIndex = parseInt(slide.getAttribute("data-slide"));
      popupswiper2.slideTo(slideIndex);
    });
  });

  const closeBtn = document.querySelector(".close-btn-popup-news");
  if (closeBtn) {
    closeBtn.addEventListener("click", function (evt) {
      const popupNews = document.querySelector(".popup-news");
      if (popupNews) {
        popupNews.classList.remove("active");
      }
    });
  }

  // Function to get query parameters from URL
  function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  // Automatically open popup if 'slide' parameter exists
  const slideIndex = getQueryParameter("slide");

  if (slideIndex !== null) {
    const slideNumber = parseInt(slideIndex);

    // Wait for fullPage.js to initialize, then move to section 2
    window.addEventListener("load", () => {
      if (typeof fullpage_api !== "undefined") {
        fullpage_api.moveTo(2); // Move to section 2 (index starts at 1)
      }

      setTimeout(() => {
        document.querySelector(".popup-news").classList.add("active");
        popupswiper2.slideTo(slideNumber);
      }, 500);
    });
  }
});

// Function to show the popup
function showPopup(popupId) {
  var popup = document.getElementById(popupId);
  if (popup) {
    popup.style.display = "block"; // Example: display the popup
  }
}

// Function to close the popup
function closePopup(popupId) {
  var popup = document.getElementById(popupId);
  if (popup) {
    popup.style.display = "none"; // Example: hide the popup
  }
}

// // Function to show the popup (ensure this is implemented correctly)
// function showPopup(popupId) {
//   const popup = document.getElementById(popupId);
//   if (popup) {
//     popup.style.display = 'block'; // Example: display the popup
//   }
// }

// // Function to close the popup (optional, for better UX)
// function closePopup(popupId) {
//   const popup = document.getElementById(popupId);
//   if (popup) {
//     popup.style.display = 'none'; // Example: hide the popup
//   }
// }

// Initialize Swiper when the popup is opened
function initializeSwiperAboutUs() {
  var swiper = new Swiper(".about-us-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// Swiper - GALLERY
function initializeSwiperGallery() {
  var swiper = new Swiper(".mySwiper-block", {
    // autoplay: {
    //   delay: 5000,
    // },
    pagination: {
      el: ".swiper-pagination-au",
      clickable: true,
      renderBullet: (index, className) => {
        return `<span class="${className} custom-bullet"></span>`;
      },
    },
    on: {
      init: function () {
        // Set the active color for the first bullet on load
        const bullets = document.querySelectorAll(
          ".mySwiper-block .swiper-pagination-bullet"
        );
        if (bullets.length > 0) {
          bullets[0].classList.add("active-color-1"); // Add initial color for the first slide
        }

        // Ensure correct visibility on initialization
        const bulletBlock = document.querySelector(".group-bullet-block");
        if (this.realIndex >= 1 && this.realIndex <= 3) {
          bulletBlock.style.display = "block";
        } else {
          bulletBlock.style.display = "none";
        }
      },
      slideChange: function () {
        const bulletBlock = document.querySelector(".group-bullet-block");
        // Show bullets only for slides 2, 3, 4 (index 1, 2, 3)
        if (this.realIndex >= 1 && this.realIndex <= 3) {
          bulletBlock.style.display = "block";
        } else {
          bulletBlock.style.display = "none";
        }

        // Update pagination bullet colors on slide change
        const bullets = document.querySelectorAll(
          ".mySwiper-block .swiper-pagination-bullet"
        );
        bullets.forEach((bullet, index) => {
          bullet.classList.remove(
            "active-color-1",
            "active-color-2",
            "active-color-3",
            "active-color-4"
          );
          if (index === this.realIndex) {
            bullet.classList.add(`active-color-${this.realIndex + 1}`);
          }
        });
      },
    },
    navigation: {
      nextEl: ".swiper-button-next, .triangle-bottom__icon", // Combine both "next" buttons
      prevEl: ".swiper-button-prev", // Single "previous" button
    },
  });
}

// List Card Section
let listCardSwiper = null;

function initializeListCardSwiper() {
  const listCardContainer = document.querySelector(".list-card");
  if (listCardContainer) {
    if (!listCardSwiper) {
      const listCardContainer = document.querySelector(".list-card");
      listCardContainer.classList.add("swiper-container");

      // Move only .list-card__card elements into Swiper wrapper
      const listCards = Array.from(
        listCardContainer.querySelectorAll(".list-card__card")
      );
      const wrapper = document.createElement("div");
      wrapper.classList.add("swiper-wrapper");

      listCards.forEach((card) => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        slide.appendChild(card);
        wrapper.appendChild(slide);
      });

      // Append the wrapper to the container
      listCardContainer.appendChild(wrapper);

      // Initialize Swiper
      listCardSwiper = new Swiper(".list-card", {
        loop: true,
        pagination: {
          el: ".swiper-pagination-list",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        },
        navigation: {
          nextEl: ".swiper-button-next-list",
          prevEl: ".swiper-button-prev-list",
        },
        slidesPerView: 1,
        spaceBetween: 10,
        on: {
          init: function () {
            // Add initial active color to the first bullet
            const bullets = document.querySelectorAll(
              ".swiper-pagination-list .swiper-pagination-bullet"
            );
            if (bullets.length > 0) {
              bullets[0].classList.add("active-color-1");
            }
          },
          slideChange: function () {
            // Update pagination bullet colors on slide change
            const bullets = document.querySelectorAll(
              ".swiper-pagination-list .swiper-pagination-bullet"
            );
            bullets.forEach((bullet, index) => {
              bullet.classList.remove(
                "active-color-1",
                "active-color-2",
                "active-color-3"
              );
            });
            const activeIndex = this.realIndex % 3; // Use modulo to cycle through active colors
            if (bullets[activeIndex]) {
              bullets[activeIndex].classList.add(
                `active-color-${activeIndex + 1}`
              );
            }
          },
        },
      });
    }
  }
}

function destroyListCardSwiper() {
  const listCardContainer = document.querySelector(".list-card");
  if (listCardContainer && listCardSwiper) {
    listCardSwiper.destroy(true, true);
    listCardSwiper = null;

    // Restore original layout
    listCardContainer.classList.remove("swiper-container");
    const wrapper = listCardContainer.querySelector(".swiper-wrapper");

    // Move slides back to the container as list-card__card elements
    const slides = Array.from(wrapper.querySelectorAll(".swiper-slide"));
    slides.forEach((slide) => {
      const card = slide.firstChild;
      listCardContainer.appendChild(card);
    });

    // Remove the wrapper
    wrapper.remove();
  }
}

// Detect screen size and toggle Swiper
function handleListCardResize() {
  if (window.innerWidth <= 575) {
    initializeListCardSwiper();
  } else {
    destroyListCardSwiper();
  }
}

// Initialize on page load and listen for resize events
window.addEventListener("load", handleListCardResize);
window.addEventListener("resize", handleListCardResize);

// What's Hot Swiper
const newsSwiper = new Swiper(".news-swiper-container", {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  // autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false,
  // },
  navigation: {
    nextEl: ".news-swiper-button-next",
    prevEl: ".news-swiper-button-prev",
  },
  breakpoints: {
    575: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    769: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

// Go to last page [Fullpage.js]
function goToLastPage() {
  const totalSections = document.querySelectorAll(".section").length;

  // Kiểm tra nếu menu mobile đang mở
  const mobileMenu = document.querySelector(".popup-mobile-menu");
  if (mobileMenu && mobileMenu.classList.contains("active")) {
    mobileMenu.classList.remove("active");
  }

  fullpage_api.moveTo(totalSections);
}

// Translate ENG VIE
  /**
	 *  global variables
	 */
// var navbarMenuHTML = document.querySelector(".navbar-menu").innerHTML;
// var horizontalMenuSplit = 7; // after this number all horizontal menus will be moved in More menu options
var default_lang = "en"; // set Default Language
var language = localStorage.getItem("language");

function initLanguage() {
  console.log("----------- init -language",language );
  // Set new language
  (language === null) ? setLanguage(default_lang) : setLanguage(language);
  var languages = document.getElementsByClassName("language");

  console.log("-----------language els",languages );


  languages && Array.from(languages).forEach(function (dropdown) {
    dropdown.addEventListener("click", function (event) {
      console.log("- click event")
      setLanguage(dropdown.getAttribute("data-lang"));
    });
  });
}

function setLanguage(lang) {

  console.log("----------- set -language")
  if (document.getElementById("header-lang-img")) {
    if (lang == "en") {
      document.getElementById("header-lang-img").src = "/static/themes/images/flags/us.svg";
    } else if (lang == "vi") {
      document.getElementById("header-lang-img").src = "/static/themes/images/flags/vn.svg";
    }
    localStorage.setItem("language", lang);
    language = localStorage.getItem("language");
    // getLanguage();
  }
  getLanguage(lang);
}

// // Multi language setting
function getLanguage(language) {
  console.log("okla ------------language");
  // language == null ? setLanguage(default_lang) : false;
  var request = new XMLHttpRequest();
  // Instantiating the request object
  request.open("GET", "/static/lang/" + language + ".json");
  // Defining event listener for readystatechange event
  request.onreadystatechange = function () {
    // Check if the request is compete and was successful
    if (this.readyState === 4 && this.status === 200) {
      var data = JSON.parse(this.responseText);
      Object.keys(data).forEach(function (key) {
        var elements = document.querySelectorAll("[data-key='" + key + "']");
        Array.from(elements).forEach(function (elem) {
          elem.innerHTML = data[key];
          // elem.textContent = data[key];
        });
      });
    }
  };
  // Sending the request to the server
  request.send();
}


initLanguage();
// function init() {
//   setDefaultAttribute();
//   twoColumnMenuGenerate();
//   isCustomDropdown();
//   isCustomDropdownResponsive();
//   initFullScreen();
//   initModeSetting();
//   windowLoadContent();
//   counter();
//   initLeftMenuCollapse();
//   initTopbarComponents();
//   initComponents();
//   resetLayout();
//   pluginData();
//   initLanguage();
//   isCollapseMenu();
//   initMenuItemScroll();
// }
// init();