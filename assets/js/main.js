(() => {
  const root = document.documentElement;
  const header = document.querySelector("[data-header]");

  /* ---------- Theme ---------- */

  const themeButton = document.querySelector(".theme-toggle");

  const syncThemeButton = () => {
    if (!themeButton) return;
    const isDark = root.dataset.theme !== "light";
    const label = isDark ? "Switch to light theme" : "Switch to dark theme";
    themeButton.setAttribute("aria-label", label);
    themeButton.setAttribute("title", label);
  };

  if (themeButton) {
    syncThemeButton();

    themeButton.addEventListener("click", () => {
      const next = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = next;
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', next === 'light' ? '#f3f0e9' : '#121311');
      try {
        localStorage.setItem("theme", next);
      } catch (error) {
        /* localStorage may be unavailable in private mode */
      }
      syncThemeButton();
    });
  }

  /* ---------- Mobile navigation ---------- */

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");

  const closeMenu = () => {
    if (!header || !menuButton) return;
    header.classList.remove("nav-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  };

  if (header && menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!header.classList.contains("nav-open")) return;
      if (header.contains(event.target)) return;
      closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  /* ---------- Header elevation ---------- */

  if (header) {
    let ticking = false;

    const updateHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    };

    updateHeader();
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(updateHeader);
      },
      { passive: true }
    );
  }

  /* ---------- Reveal on scroll ---------- */

  const revealItems = document.querySelectorAll(".reveal");

  if (revealItems.length) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );

      revealItems.forEach((item) => observer.observe(item));
    }
  }

  /* ---------- Copy buttons ---------- */

  const copyButtons = document.querySelectorAll("[data-copy]");

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  };

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const card = button.closest(".code-card, .run-card");
      const code = card ? card.querySelector("code") : null;
      if (!code) return;

      const original = button.textContent;

      try {
        await copyText(code.textContent);
        button.textContent = "Copied";
        button.classList.add("is-copied");
      } catch (error) {
        button.textContent = "Copy failed";
      }

      window.setTimeout(() => {
        button.textContent = original;
        button.classList.remove("is-copied");
      }, 1600);
    });
  });

  /* ---------- Footer year ---------- */

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();
