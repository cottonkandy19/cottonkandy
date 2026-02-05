const items = document.querySelectorAll(".gallery-item");
const buttons = document.querySelectorAll(".filter-btn");
const title = document.getElementById("gallery-title");

// Friendly names for headings
const categoryNames = {
  sk: "Short Kurti",
  dr: "Dress",
  lk: "Long Kurti",
  pt: "Pants",
  set: "SET",
  uns: "Unstitched Material",
  all: "Our Collection"
};

// Read category from URL
const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");

function applyFilter(category) {
  items.forEach(item => {
    const match =
      category === "all" || item.dataset.category === category;

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

  // Update heading
  title.textContent =
    category === "all"
      ? "Our Collection"
      : `${categoryNames[category]} Collection`;

  // Active button state
  buttons.forEach(btn => btn.classList.remove("active"));
  document
    .querySelector(`.filter-btn[data-filter="${category}"]`)
    ?.classList.add("active");
}

// Button click
buttons.forEach(button => {
  button.addEventListener("click", () => {
    applyFilter(button.dataset.filter);
  });
});

// Initial load
if (selectedCategory) {
  applyFilter(selectedCategory);
} else {
  applyFilter("all");
}


// IMAGE MODAL LOGIC
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-image");
const closeBtn = document.querySelector(".modal-close");

// Open modal on image click
items.forEach(item => {
  const img = item.querySelector("img");
  img.addEventListener("click", () => {
    modalImg.src = img.src;
    modal.classList.add("active");
  });
});

// Close modal (X button)
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Close modal when clicking outside image
modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});


// HOME PAGE PRINT IMAGE ZOOM
const zoomableImages = document.querySelectorAll(".zoomable");

zoomableImages.forEach(img => {
  img.addEventListener("click", () => {
    modalImg.src = img.src;
    modal.classList.add("active");
  });
});


window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar, .gallery-navbar");
  if (!navbar) return;

  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});




