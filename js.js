let slideIndex = 0;
const slides = document.querySelectorAll(".slides");
const dotsContainer = document.querySelector(".dots-container");
const buys = document.querySelectorAll(".buy"); // ✅ all explore links

// Custom dot colors (optional)
const dotColors = ["#FFF", "#FFF", "#FFF", "#FFF"];

// Create dots dynamically
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.style.backgroundColor = dotColors[i] || "#fff";
  dot.addEventListener("click", () => showSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function showSlide(n) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active-slide");
    dots[i].classList.remove("active");
    buys[i].classList.remove("active-link"); // ✅ hide other links
  });
  slides[n].classList.add("active-slide");
  dots[n].classList.add("active");
  buys[n].classList.add("active-link"); // ✅ show current link
  slideIndex = n;
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}
function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

// Button listeners
document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);

// Auto play
setInterval(nextSlide, 4000);

// Init
showSlide(slideIndex);

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links ul');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');

  // Change hamburger icon to ✖ (close)
  if (navMenu.classList.contains('active')) {
    hamburger.innerHTML = '&times;';
  } else {
    hamburger.innerHTML = '&#9776;';
  }
});
// Close menu on link click (for better UX)

// Array of product data.
        // --- NOTE: Image paths are updated to use local files from an 'img' folder. ---
        const products = [
            { id: 1, title: 'Denim Jacket', price: '₹2,499', image: 'img/23.png' },
            { id: 2, title: 'Slim-fit Jeans', price: '₹1,799', image: 'img/24.png' },
            { id: 3, title: 'Crewneck T-shirt', price: '₹899', image: 'img/25.png' },
            { id: 4, title: 'Leather Boots', price: '₹3,999', image: 'img/26.png' },
            { id: 5, title: 'Casual Hoodie', price: '₹1,999', image: 'img/27.png' },
            { id: 6, title: 'Running Shorts', price: '₹1,299', image: 'img/28.png' }
        ];

        let currentIndex = 0;
        const totalProducts = products.length;

        const mainProductCard = document.getElementById('main-product-card');
        const staircaseStack = document.getElementById('staircase-stack');
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');

        // Helper function to create a product card element from data
        function createCard(product) {
            const card = document.createElement('div');
            card.innerHTML = `
                <a href="#" style="display: block; text-decoration: none; color: inherit;">
                    <img src="${product.image}" alt="${product.title}" class="product-card-image">
                    <h4 class="product-card-title">${product.title}</h4>
                    <p class="product-card-price">${product.price}</p>
                </a>
            `;
            return card;
        }

        // Helper function to get a unique background color based on product ID for visual distinction
        function getBackgroundColor(id) {
            const colors = ['#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280'];
            return colors[(id - 1) % colors.length];
        }

        // Function to render the cards based on the current index
        function renderCards() {
            // Render the active product card on the left
            const activeProduct = products[currentIndex];
            mainProductCard.innerHTML = `
                <a href="#" style="display: block; text-decoration: none; color: inherit;">
                    <img src="${activeProduct.image}" alt="${activeProduct.title}" class="product-card-image">
                    <h4 class="product-card-title">${activeProduct.title}</h4>
                    <p class="product-card-price">${activeProduct.price}</p>
                </a>
            `;

            // Render the two stacked cards in the middle
            staircaseStack.innerHTML = '';
            const stackedProducts = [];
            for (let i = 1; i <= 2; i++) {
                stackedProducts.push(products[(currentIndex + i) % totalProducts]);
            }
            
            // Create the staircase effect with position, rotation, and z-index
            stackedProducts.forEach((product, index) => {
                const zIndex = 20 - (index * 5);
                const rotation = (index + 1) * 3;
                const topOffset = (index + 1) * 20;
                const leftOffset = (index + 1) * 20;
                const stackedCard = createCard(product);
                stackedCard.className += ` staircase-card`;
                stackedCard.style.backgroundColor = getBackgroundColor(product.id);
                stackedCard.style.zIndex = zIndex;
                stackedCard.style.top = `${topOffset}px`;
                stackedCard.style.left = `${leftOffset}px`;
                stackedCard.style.transform = `rotate(${rotation}deg)`;
                staircaseStack.appendChild(stackedCard);
            });

            // Update button states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === totalProducts - 1;
        }

        // Event listeners for navigation buttons
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalProducts - 1) {
                currentIndex++;
                renderCards();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                renderCards();
            }
        });

        // Initial render
        renderCards();