// ============================================================
//  GALLERY FILTER
// ============================================================

const items = document.querySelectorAll(".gallery-item");
const buttons = document.querySelectorAll(".filter-btn");

// FIX: null check — gallery-title only exists on gallery page
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

function applyFilter(category) {
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

  // FIX: only update heading if element exists (gallery page only)
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
//  IMAGE MODAL
// ============================================================

// FIX: null checks — modal elements only exist when modal HTML is present
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-image");
const closeBtn = document.querySelector(".modal-close");
const modalWhatsAppBtn = document.getElementById("modal-whatsapp-btn");

const WA_NUMBER = "919380661101";

function openModal(imgSrc, productLabel) {
  if (!modal || !modalImg) return;

  modalImg.src = imgSrc;
  modal.classList.add("active");

  // NEW: update WhatsApp button with the specific product label
  if (modalWhatsAppBtn && productLabel) {
    const encodedText = encodeURIComponent(
      `Hi Cotton Kandy! I love this ${productLabel} I saw on your website. Can you share more details? 🌿`
    );
    modalWhatsAppBtn.href = `https://wa.me/${WA_NUMBER}?text=${encodedText}`;
  }
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("active");
  if (modalImg) modalImg.src = "";
}

// Gallery items
items.forEach(item => {
  const img = item.querySelector("img");
  if (!img) return;
  img.addEventListener("click", () => {
    const label = item.dataset.label || item.dataset.category || "product";
    openModal(img.src, label);
  });
});

// FIX: zoomable print images on homepage
const zoomableImages = document.querySelectorAll(".zoomable");
zoomableImages.forEach(img => {
  img.addEventListener("click", () => {
    const label = img.alt || "print";
    openModal(img.src, label);
  });
});

// Close modal
if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
}

// Close on Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
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
//  FIX: moved from inline <script> in index.html to here
//  FIX: inline validation instead of alert()
// ============================================================

function sendToWhatsApp() {
  const nameInput = document.getElementById("name");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("name-error");
  const messageError = document.getElementById("message-error");

  // Clear previous errors
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

// Make sendToWhatsApp globally accessible (called via onclick in HTML)
window.sendToWhatsApp = sendToWhatsApp;
