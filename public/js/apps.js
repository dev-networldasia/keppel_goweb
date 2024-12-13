document.addEventListener("DOMContentLoaded", function (event) {
  // Navbar
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      navbar.classList.add("fixed");
    } else {
      navbar.classList.remove("fixed");
    }
  });

  // <!-- JS Mobile-Menu -->
  const bgmenu = document.querySelector(".inner-wrapper");
  document
    .querySelector(".btn-menu-mobile")
    .addEventListener("click", function () {
      document.querySelector(".popup-mobile-menu").classList.toggle("active");
    });
  document.querySelector(".close-btn").addEventListener("click", function () {
    document.querySelector(".popup-mobile-menu").classList.remove("active");
  });
  document.querySelector(".overlay").addEventListener("click", function () {
    document.querySelector(".popup-mobile-menu").classList.remove("active");
  });

  // <!-- Mobile - openTab-->
  var list = document.querySelectorAll(".mobile");
  list.forEach(function (item) {
    item.addEventListener("click", function (evt2) {
      var flag = evt2.currentTarget.parentElement.classList.contains("active");
      if (flag) {
        console.log(
          evt2.currentTarget.parentElement.querySelector(".child-menu")
        );
        evt2.currentTarget.parentElement.classList.remove("active");
        $(
          evt2.currentTarget.parentElement.querySelector(".child-menu")
        ).slideUp(300);
      } else {
        document.querySelectorAll(".accordion").forEach(function (re) {
          re.classList.remove("active");
        });
        evt2.currentTarget.parentElement.classList.add("active");
        $(
          evt2.currentTarget.parentElement.querySelector(".child-menu")
        ).slideDown(300);
      }
    });
  });

  // Home Slide show
  // <!-- Swiper JS -->
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    // autoplay: {
    //     delay: 5000,
    // },
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

  var groupShapes = document.getElementsByClassName('group-shape');

  for (var i = 0; i < groupShapes.length; i++) {
    groupShapes[i].addEventListener('click', function(event) {
        var popupId = this.getAttribute('href').substring(1);
        showPopup(popupId);
    });
  }

  const abasdf = new Swiper('.about-us-swiper', {
      loop: true,
      slidesPerView: 1,
      navigation: {
          nextEl: '.swiper-button-next-2',
          prevEl: '.swiper-button-prev-2',
      },
  });
});

// Function to show the popup
function showPopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.style.display = "block"; // Show the popup
}

// Function to close the popup
function closePopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.style.display = "none"; // Hide the popup
}

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
  var swiper = new Swiper(".mySwiper-block", {
    navigation: {
      nextEl: ".triangle-bottom__icon",
    },
  });


// List Card Section
let listCardSwiper = null;

function initializeListCardSwiper() {
  const listCardContainer = document.querySelector(".list-card");
  if (listCardContainer) {
    if (!listCardSwiper) {
      const listCardContainer = document.querySelector(".list-card");
      listCardContainer.classList.add("swiper-container");
  
      // Move only .list-card__card elements into Swiper wrapper
      const listCards = Array.from(listCardContainer.querySelectorAll(".list-card__card"));
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
            const bullets = document.querySelectorAll(".swiper-pagination-list .swiper-pagination-bullet");
            if (bullets.length > 0) {
              bullets[0].classList.add("active-color-1");
            }
          },
          slideChange: function () {
            // Update pagination bullet colors on slide change
            const bullets = document.querySelectorAll(".swiper-pagination-list .swiper-pagination-bullet");
            bullets.forEach((bullet, index) => {
              bullet.classList.remove("active-color-1", "active-color-2", "active-color-3");
            });
            const activeIndex = this.realIndex % 3; // Use modulo to cycle through active colors
            if (bullets[activeIndex]) {
              bullets[activeIndex].classList.add(`active-color-${activeIndex + 1}`);
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

// document.addEventListener("DOMContentLoaded", function () {
//   // Parallax Scroll initialization
//   ParallaxScroll.init();
// });

// const ParallaxScroll = {
//   // PUBLIC VARIABLES
//   showLogs: false,
//   round: 1000,

//   // PUBLIC FUNCTIONS
//   init: function () {
//       this._log("init");
//       if (this._inited) {
//           this._log("Already Inited");
//           return;
//       }
//       this._inited = true;

//       this._requestAnimationFrame = (function () {
//           return window.requestAnimationFrame ||
//               window.webkitRequestAnimationFrame ||
//               window.mozRequestAnimationFrame ||
//               window.oRequestAnimationFrame ||
//               window.msRequestAnimationFrame ||
//               function (callback) {
//                   window.setTimeout(callback, 1000 / 60);
//               };
//       })();

//       this._onScroll(true);
//   },

//   // PRIVATE VARIABLES
//   _inited: false,
//   _properties: ['x', 'y', 'z', 'rotateX', 'rotateY', 'rotateZ', 'scaleX', 'scaleY', 'scaleZ', 'scale'],
//   _requestAnimationFrame: null,

//   // PRIVATE FUNCTIONS
//   _log: function (message) {
//       if (this.showLogs) console.log("Parallax Scroll / " + message);
//   },

//   _onScroll: function (noSmooth) {
//       const scroll = document.documentElement.scrollTop || document.body.scrollTop;
//       const windowHeight = window.innerHeight;
//       this._log("onScroll " + scroll);

//       const elements = document.querySelectorAll("[data-parallax]");
//       elements.forEach((el) => {
//           let properties = [];
//           let applyProperties = false;
//           let style = el.getAttribute("style") || "";
//           if (!el.dataset.style) {
//               el.dataset.style = style;
//           }

//           let datas = [el.dataset.parallax];
//           let iData = 2;
//           while (el.dataset[`parallax${iData}`]) {
//               datas.push(el.dataset[`parallax${iData}`]);
//               iData++;
//           }

//           datas.forEach((data) => {
//               let scrollFrom = data["from-scroll"];
//               if (scrollFrom === undefined) scrollFrom = Math.max(0, el.getBoundingClientRect().top + scroll - windowHeight);
//               scrollFrom = scrollFrom | 0;
//               let scrollDistance = data["distance"];
//               let scrollTo = data["to-scroll"];
//               if (scrollDistance === undefined && scrollTo === undefined) scrollDistance = windowHeight;
//               scrollDistance = Math.max(scrollDistance | 0, 1);
//               let easing = data["easing"];
//               let easingReturn = data["easing-return"];
//               if (easing === undefined || !easing) easing = null;
//               if (easingReturn === undefined || !easingReturn) easingReturn = easing;

//               if (scrollTo === undefined) scrollTo = scrollFrom + scrollDistance;
//               scrollTo = scrollTo | 0;

//               let smoothness = data["smoothness"];
//               if (smoothness === undefined) smoothness = 30;
//               smoothness = smoothness | 0;
//               if (noSmooth || smoothness === 0) smoothness = 1;
//               smoothness = smoothness | 0;

//               let scrollCurrent = scroll;
//               scrollCurrent = Math.max(scrollCurrent, scrollFrom);
//               scrollCurrent = Math.min(scrollCurrent, scrollTo);

//               this._properties.forEach((prop) => {
//                   let defaultProp = 0;
//                   let to = data[prop];
//                   if (to === undefined) return;
//                   if (prop === "scale" || prop === "scaleX" || prop === "scaleY" || prop === "scaleZ") {
//                       defaultProp = 1;
//                   } else {
//                       to = to | 0;
//                   }

//                   let prev = el.dataset[`_${prop}`];
//                   if (prev === undefined) prev = defaultProp;
//                   let next = ((to - defaultProp) * ((scrollCurrent - scrollFrom) / (scrollTo - scrollFrom))) + defaultProp;
//                   let val = prev + (next - prev) / smoothness;

//                   if (easing && currentTime > 0 && currentTime <= totalTime) {
//                       let from = defaultProp;
//                       if (el.dataset.sens === "back") {
//                           from = to;
//                           to = -to;
//                           easing = easingReturn;
//                           totalTime = totalTimeReturn;
//                       }
//                       val = easing(currentTime, from, to, totalTime);
//                   }
//                   val = Math.ceil(val * this.round) / this.round;
//                   if (val === prev && next === to) val = to;

//                   if (!properties[prop]) properties[prop] = 0;
//                   properties[prop] += val;

//                   if (prev !== properties[prop]) {
//                       el.dataset[`_${prop}`] = properties[prop];
//                       applyProperties = true;
//                   }
//               });
//           });

//           if (applyProperties) {
//               if (properties["z"] !== undefined) {
//                   let perspective = data["perspective"];
//                   if (perspective === undefined) perspective = 800;
//                   let parent = el.parentElement;
//                   parent.style.perspective = `${perspective}px`;
//               }

//               if (properties["scaleX"] === undefined) properties["scaleX"] = 1;
//               if (properties["scaleY"] === undefined) properties["scaleY"] = 1;
//               if (properties["scaleZ"] === undefined) properties["scaleZ"] = 1;
//               if (properties["scale"] !== undefined) {
//                   properties["scaleX"] *= properties["scale"];
//                   properties["scaleY"] *= properties["scale"];
//                   properties["scaleZ"] *= properties["scale"];
//               }

//               let translate3d = `translate3d(${properties.x || 0}px, ${properties.y || 0}px, ${properties.z || 0}px)`;
//               let rotate3d = `rotateX(${properties.rotateX || 0}deg) rotateY(${properties.rotateY || 0}deg) rotateZ(${properties.rotateZ || 0}deg)`;
//               let scale3d = `scaleX(${properties.scaleX}) scaleY(${properties.scaleY}) scaleZ(${properties.scaleZ})`;

//               let cssTransform = `${translate3d} ${rotate3d} ${scale3d}`;
//               this._log(cssTransform);

//               el.setAttribute("style", `transform:${cssTransform} -webkit-transform:${cssTransform} ${style}`);
//           }
//       });

//       if (window.requestAnimationFrame) {
//           window.requestAnimationFrame(() => {
//               this._onScroll(false);
//           });
//       } else {
//           this._requestAnimationFrame(() => {
//               this._onScroll(false);
//           });
//       }
//   }
// };
