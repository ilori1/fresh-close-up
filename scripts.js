// Cart functionality
let cart = [];
let cartTotal = 0;

function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    cartTotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        cartTotal += itemTotal;
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name} (x${item.quantity})</span>
                <span>₦${itemTotal.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    cartTotalElement.textContent = cartTotal.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartDisplay();
}

function showCart() {
    document.getElementById('cart-modal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert(`Checkout successful! Total: ₦${cartTotal.toFixed(2)}`);
    cart = [];
    updateCartCount();
    updateCartDisplay();
    closeCart();
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Simple animation for benefits icons on scroll
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.benefit-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// Testimonial slider (simple auto-slide)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

setInterval(nextTestimonial, 5000); // Change every 5 seconds
showTestimonial(currentTestimonial);

// Hamburger menu toggle
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}
