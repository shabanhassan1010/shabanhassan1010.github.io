// ===== 1) Light / Dark theme =====
// We save the choice in localStorage so the site remembers it next visit.
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

themeToggle.addEventListener("click", () => {
  const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// ===== 2) Mobile menu =====
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));

// Close the menu after clicking any link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ===== 3) Current year in the footer =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== 4) Fade-in cards when they appear on screen =====
const revealItems = document.querySelectorAll(
  ".section-title, .timeline-item, .project-card, .skill-group, .edu-card, .contact-card, .about-grid"
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
  item.classList.add("reveal");
  revealObserver.observe(item);
});

// ===== 5) Highlight the current section in the navbar =====
const sections = document.querySelectorAll("main section[id]");

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.querySelectorAll("a").forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
      });
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach((section) => navObserver.observe(section));
