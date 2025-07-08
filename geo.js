document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuIcon = document.getElementById("menuIcon");
  const mobileWrapper = document.getElementById("mobileWrapper");
  const mainNav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-link");
  const allSections = document.querySelectorAll(".section");
  const dropdownLinks = document.querySelectorAll(".mainNav ul ul a");
  const desktopSocial = document.querySelector(".social-box.desktop-visible");
  const scrollOffset = 100;

  // ✅ Clone nav + social into mobileWrapper (only once)
  if (!mobileWrapper.querySelector("ul")) {
    const navClone = mainNav.querySelector("ul").cloneNode(true);
    const socialClone = desktopSocial ? desktopSocial.cloneNode(true) : null;

    const clonedNav = document.createElement("nav");
    clonedNav.className = "mainNav";
    clonedNav.appendChild(navClone);
    mobileWrapper.appendChild(clonedNav);

    if (socialClone) {
      socialClone.classList.remove("desktop-visible");
      mobileWrapper.appendChild(socialClone);
    }

    // Enable dropdown toggle for cloned nav
    const mobileDropdowns = mobileWrapper.querySelectorAll("li");
    mobileDropdowns.forEach(li => {
      const subMenu = li.querySelector("ul");
      if (subMenu) {
        li.addEventListener("click", (e) => {
          e.stopPropagation();
          li.classList.toggle("open");
        });
      }
    });
  }

  // ✅ Toggle mobile menu (nav + social)
  menuToggle.addEventListener("click", () => {
    mobileWrapper.classList.toggle("active");
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-times");

    if (desktopSocial) {
      desktopSocial.classList.toggle("hide-on-mobile", mobileWrapper.classList.contains("active"));
    }
  });

  // ✅ Handle nav link click
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const sectionId = link.getAttribute("data-section");
      if (!sectionId) return;

      showSection(sectionId);
      scrollToSection(sectionId);

      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      closeMobileMenu();
    });
  });

  // ✅ Handle submenu links (e.g. #mission inside About)
  dropdownLinks.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      const anchorId = href && href.startsWith("#") ? href.slice(1) : null;
      const aboutSection = document.getElementById("about");

      if (anchorId && aboutSection) {
        e.preventDefault();
        showSection("about");
        scrollToAnchor(anchorId);

        navLinks.forEach(l => l.classList.remove("active"));
        document.querySelector('[data-section="about"]').classList.add("active");

        closeMobileMenu();
      }
    });
  });

  // ✅ Scroll to contact on "booking" button click
  const bookingButton = document.getElementById("booking");
  if (bookingButton) {
    bookingButton.addEventListener("click", (e) => {
      e.preventDefault();

      showSection("contact");
      scrollToSection("contact");

      navLinks.forEach(link => link.classList.remove("active"));
      const contactLink = document.querySelector('[data-section="contact"]');
      if (contactLink) contactLink.classList.add("active");

      closeMobileMenu();
    });
  }

  function showSection(sectionId) {
    allSections.forEach(section => {
      section.classList.toggle("active", section.id === sectionId);
    });
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - scrollOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function scrollToAnchor(anchorId) {
    const el = document.getElementById(anchorId);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - scrollOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function closeMobileMenu() {
    mobileWrapper.classList.remove("active");
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");

    if (desktopSocial) {
      desktopSocial.classList.remove("hide-on-mobile");
    }
  }
});
