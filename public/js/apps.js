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
});
