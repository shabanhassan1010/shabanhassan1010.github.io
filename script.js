// ===== 1) Light / Dark theme =====
// The starting theme is set in <head> (saved choice, or the OS setting).
// Here we only handle the toggle button and save the new choice.
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", newTheme);
  try { localStorage.setItem("theme", newTheme); } catch (e) { /* storage blocked — ignore */ }
});

// ===== 2) Mobile menu =====
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
});

// Close the menu after clicking any link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", false);
  });
});

// ===== 3) Current year in the footer =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== 4) On scroll: progress bar, navbar border, back-to-top button =====
const progressBar = document.getElementById("scrollProgress");
const navbar = document.getElementById("navbar");
const toTop = document.getElementById("toTop");

function onScroll() {
  const scrolled = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  progressBar.style.width = (scrolled / maxScroll) * 100 + "%";
  navbar.classList.toggle("scrolled", scrolled > 10);
  toTop.classList.toggle("show", scrolled > 600);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ===== 5) Fade-in cards when they appear on screen =====
const revealItems = document.querySelectorAll(
  ".section-head, .timeline-item, .project-card, .skill-group, .edu-card, .contact-card, .about-grid, .contact-box, .stats"
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

// ===== 6) Highlight the current section in the navbar =====
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

// ===== 7) Project filter buttons =====
// Each card has data-tags="dotnet angular ai" and each button has data-filter="dotnet".
// A card stays visible if its tags include the chosen filter (or the filter is "all").
const filterButtons = document.querySelectorAll("#projectFilters .filter");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((b) => b.classList.toggle("active", b === button));

    projectCards.forEach((card) => {
      const tags = card.dataset.tags.split(" ");
      const show = filter === "all" || tags.includes(filter);
      card.classList.toggle("hidden", !show);
    });
  });
});
