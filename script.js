/**
 * Maria Bolos Decorados - Script principal
 * Vanilla JS — menu, galeria, lightbox, WhatsApp, PIX, animações
 */

/* ============================================
   CONFIGURAÇÃO — altere aqui com facilidade
   ============================================ */

/** Número do WhatsApp (apenas dígitos, com código do país) */
const WHATSAPP_NUMBER = "5512992529820";

/** Mensagem automática enviada ao abrir o WhatsApp */
const WHATSAPP_MESSAGE =
  "Olá, Maria! Gostaria de saber mais sobre os bolos decorados e fazer um orçamento.";

/**
 * Extensão padrão das imagens da galeria.
 * Altere para ".png", ".jpeg" ou ".webp" se necessário.
 */
const IMAGE_EXT = ".jpeg";

/**
 * Lista de bolos da galeria.
 * - id: número do arquivo (bolo{id}{ext})
 * - caption: legenda exibida
 *
 * Ajuste as legendas quando adicionar as fotos.
 */
const GALLERY_ITEMS = [
  { id: 1, caption: "Bolo decorado #01" },
  { id: 2, caption: "Bolo decorado #02" },
  { id: 3, caption: "Bolo decorado #03" },
  { id: 4, caption: "Bolo decorado #04" },
  { id: 5, caption: "Bolo decorado #05" },
  { id: 6, caption: "Bolo decorado #06" },
  { id: 7, caption: "Bolo decorado #07" },
  { id: 8, caption: "Bolo decorado #08" },
  { id: 9, caption: "Bolo decorado #09" },
  { id: 10, caption: "Bolo decorado #10" },
  { id: 11, caption: "Bolo decorado #11" },
  { id: 12, caption: "Bolo decorado #12" },
  { id: 13, caption: "Bolo decorado #13" },
  { id: 14, caption: "Bolo decorado #14" },
  { id: 15, caption: "Bolo decorado #15" },
  { id: 16, caption: "Bolo decorado #16" },
  { id: 17, caption: "Bolo decorado #17" },
  { id: 18, caption: "Bolo decorado #18" },
  { id: 19, caption: "Bolo decorado #19" },
  { id: 20, caption: "Bolo decorado #20" },
  { id: 21, caption: "Bolo decorado #21" },
  { id: 22, caption: "Bolo decorado #22" },
  { id: 23, caption: "Bolo decorado #23" },
  { id: 24, caption: "Bolo decorado #24" },
  { id: 25, caption: "Bolo decorado #25" },
  { id: 26, caption: "Bolo decorado #26" },
  { id: 27, caption: "Bolo decorado #27" },
  { id: 28, caption: "Bolo decorado #28" },
  { id: 29, caption: "Bolo decorado #29" },
  { id: 30, caption: "Bolo decorado #30" },
  { id: 31, caption: "Bolo decorado #31" },
  { id: 32, caption: "Bolo decorado #32" },
  { id: 33, caption: "Bolo decorado #33" }
];

/** Chave PIX */
const PIX_KEY = "63331675000133";

/* ============================================
   ESTADO
   ============================================ */

let currentLightboxIndex = 0;

/* ============================================
   UTILITÁRIOS
   ============================================ */

function getWhatsAppUrl() {
  const text = encodeURIComponent(WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function getImageSrc(id) {
  return `bolo${id}${IMAGE_EXT}`;
}

/* ============================================
   MENU MOBILE
   ============================================ */

function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    }
  });
}

/* ============================================
   SCROLL SUAVE
   ============================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ============================================
   WHATSAPP LINKS
   ============================================ */

function initWhatsAppLinks() {
  const url = getWhatsAppUrl();
  const btnCta = document.getElementById("btn-whatsapp-cta");
  const btnContact = document.getElementById("btn-whatsapp");

  if (btnCta) btnCta.href = url;
  if (btnContact) btnContact.href = url;
}

/* ============================================
   COPIAR CHAVE PIX
   ============================================ */

function initCopyPix() {
  const btn = document.getElementById("btn-copy-pix");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      const original = btn.textContent;
      btn.textContent = "Chave copiada!";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 2000);
    } catch {
      const input = document.createElement("input");
      input.value = PIX_KEY;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      btn.textContent = "Chave copiada!";
      setTimeout(() => {
        btn.textContent = "Copiar chave PIX";
      }, 2000);
    }
  });
}

/* ============================================
   GALERIA
   ============================================ */

function buildGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";

  GALLERY_ITEMS.forEach((item, index) => {
    const figure = document.createElement("button");
    figure.type = "button";
    figure.className = "gallery-item";
    figure.dataset.index = String(index);
    figure.setAttribute("aria-label", `Ampliar ${item.caption}`);

    const img = document.createElement("img");
    img.src = getImageSrc(item.id);
    img.alt = item.caption;
    img.loading = "lazy";
    img.width = 400;
    img.height = 400;
    img.onerror = function () {
      this.style.display = "none";
    };

    const caption = document.createElement("span");
    caption.className = "gallery-caption";
    caption.textContent = item.caption;

    figure.appendChild(img);
    figure.appendChild(caption);
    figure.addEventListener("click", () => openLightbox(index));

    grid.appendChild(figure);
  });
}

/* ============================================
   LIGHTBOX
   ============================================ */

function openLightbox(index) {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  currentLightboxIndex = index;
  updateLightboxContent();

  lightbox.hidden = false;
  requestAnimationFrame(() => {
    lightbox.classList.add("is-open");
  });

  document.body.style.overflow = "hidden";

  const closeBtn = document.getElementById("lightbox-close");
  if (closeBtn) closeBtn.focus();
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  lightbox.classList.remove("is-open");
  document.body.style.overflow = "";

  setTimeout(() => {
    lightbox.hidden = true;
  }, 300);
}

function updateLightboxContent() {
  const item = GALLERY_ITEMS[currentLightboxIndex];
  if (!item) return;

  const img = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");

  if (img) {
    img.src = getImageSrc(item.id);
    img.alt = item.caption;
  }
  if (caption) {
    caption.textContent = item.caption;
  }
}

function showPrevImage() {
  currentLightboxIndex =
    (currentLightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
  updateLightboxContent();
}

function showNextImage() {
  currentLightboxIndex = (currentLightboxIndex + 1) % GALLERY_ITEMS.length;
  updateLightboxContent();
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!lightbox) return;

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", showPrevImage);
  if (nextBtn) nextBtn.addEventListener("click", showNextImage);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;

    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      showPrevImage();
    } else if (e.key === "ArrowRight") {
      showNextImage();
    }
  });
}

/* ============================================
   ANIMAÇÕES DE ENTRADA
   ============================================ */

function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ============================================
   HEADER SHADOW AO SCROLL
   ============================================ */

function initHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = "0 2px 16px rgba(58, 36, 56, 0.08)";
    } else {
      header.style.boxShadow = "none";
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ============================================
   INICIALIZAÇÃO
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initSmoothScroll();
  initWhatsAppLinks();
  initCopyPix();
  buildGallery();
  initLightbox();
  initRevealAnimations();
  initHeaderScroll();
});
