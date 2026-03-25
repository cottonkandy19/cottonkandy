// ============================================================
//  GALLERY FILTER
// ============================================================

const items = document.querySelectorAll(".gallery-item");
const buttons = document.querySelectorAll(".filter-btn");

const titleEl = document.getElementById("gallery-title");

const categoryNames = {
  sk: "Short Kurti",
  dr: "Dress",
  lk: "Long Kurti",
  pt: "Pants",
  set: "SET",
  uns: "Unstitched Material",
  all: "Our Collection"
};

const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");

let activeFilter = "all";

function applyFilter(category) {
  activeFilter = category;

  items.forEach(item => {
    const match = category === "all" || item.dataset.category === category;
    if (match) {
      item.classList.remove("hidden");
      item.style.display = "block";
    } else {
      item.classList.add("hidden");
      setTimeout(() => {
        if (item.classList.contains("hidden")) {
          item.style.display = "none";
        }
      }, 350);
    }
  });

  if (titleEl) {
    titleEl.textContent =
      category === "all" ? "Our Collection" : `${categoryNames[category]} Collection`;
  }

  buttons.forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.filter-btn[data-filter="${category}"]`)?.classList.add("active");
}

buttons.forEach(button => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});

if (selectedCategory) {
  applyFilter(selectedCategory);
} else {
  applyFilter("all");
}


// ============================================================
//  IMAGE MODAL WITH PREV / NEXT
// ============================================================

const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-image");
const closeBtn = document.querySelector(".modal-close");
const modalWhatsAppBtn = document.getElementById("modal-whatsapp-btn");
const prevBtn = document.getElementById("modal-prev");
const nextBtn = document.getElementById("modal-next");

const WA_NUMBER = "919380661101";

let currentIndex = 0;

function getVisibleItems() {
  return Array.from(items).filter(item =>
    activeFilter === "all" || item.dataset.category === activeFilter
  );
}

function openModal(index) {
  if (!modal || !modalImg) return;

  const visible = getVisibleItems();
  if (index < 0 || index >= visible.length) return;

  currentIndex = index;
  const item = visible[currentIndex];
  const img = item.querySelector("img");
  const label = item.dataset.label || item.dataset.category || "product";

  modalImg.src = img.src;
  modal.classList.add("active");

  if (prevBtn) {
    prevBtn.style.display = "flex";
    prevBtn.style.opacity = currentIndex === 0 ? "0.3" : "1";
    prevBtn.style.pointerEvents = currentIndex === 0 ? "none" : "auto";
  }
  if (nextBtn) {
    nextBtn.style.display = "flex";
    nextBtn.style.opacity = currentIndex === visible.length - 1 ? "0.3" : "1";
    nextBtn.style.pointerEvents = currentIndex === visible.length - 1 ? "none" : "auto";
  }

  if (modalWhatsAppBtn) {
    const encodedText = encodeURIComponent(
      `Hi Cotton Kandy! I love this ${label} I saw on your website. Can you share more details? 🌿`
    );
    modalWhatsAppBtn.href = `https://wa.me/${WA_NUMBER}?text=${encodedText}`;
  }
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("active");
  if (modalImg) modalImg.src = "";
}

function showPrev() {
  if (currentIndex > 0) openModal(currentIndex - 1);
}

function showNext() {
  const visible = getVisibleItems();
  if (currentIndex < visible.length - 1) openModal(currentIndex + 1);
}

// Click on gallery items
items.forEach(item => {
  const img = item.querySelector("img");
  if (!img) return;
  img.addEventListener("click", () => {
    const visible = getVisibleItems();
    const index = visible.indexOf(item);
    openModal(index);
  });
});

// Zoomable print images on homepage
const zoomableImages = document.querySelectorAll(".zoomable");
zoomableImages.forEach(img => {
  img.addEventListener("click", () => {
    const label = img.alt || "print";
    if (modal && modalImg) {
      modalImg.src = img.src;
      modal.classList.add("active");
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      if (modalWhatsAppBtn) {
        const encodedText = encodeURIComponent(
          `Hi Cotton Kandy! I love this ${label} print I saw on your website. Can you share more details? 🌿`
        );
        modalWhatsAppBtn.href = `https://wa.me/${WA_NUMBER}?text=${encodedText}`;
      }
    }
  });
});

if (prevBtn) prevBtn.addEventListener("click", e => { e.stopPropagation(); showPrev(); });
if (nextBtn) nextBtn.addEventListener("click", e => { e.stopPropagation(); showNext(); });

if (closeBtn) closeBtn.addEventListener("click", closeModal);
if (modal) {
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
}

// Keyboard navigation
document.addEventListener("keydown", e => {
  if (!modal || !modal.classList.contains("active")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "ArrowRight") showNext();
});


// ============================================================
//  NAVBAR SCROLL EFFECT
// ============================================================

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 10);
});


// ============================================================
//  FOOTER YEAR
// ============================================================

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();


// ============================================================
//  CONTACT FORM → WHATSAPP
// ============================================================

function sendToWhatsApp() {
  const nameInput = document.getElementById("name");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("name-error");
  const messageError = document.getElementById("message-error");

  if (nameError) nameError.textContent = "";
  if (messageError) messageError.textContent = "";

  const name = nameInput ? nameInput.value.trim() : "";
  const message = messageInput ? messageInput.value.trim() : "";

  let hasError = false;

  if (!name) {
    if (nameError) nameError.textContent = "Please enter your name.";
    hasError = true;
  }
  if (!message) {
    if (messageError) messageError.textContent = "Please enter a message.";
    hasError = true;
  }
  if (hasError) return;

  const text = encodeURIComponent(`Hello Cotton Kandy!\n\nName: ${name}\nMessage: ${message}`);
  window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank");
}

window.sendToWhatsApp = sendToWhatsApp;
