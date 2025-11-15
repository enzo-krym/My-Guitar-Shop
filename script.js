// Cart data structure
let cart = JSON.parse(localStorage.getItem('guitarCart')) || [];
let shippingCost = 0;
let selectedPayment = 'card';

// Guitar products data
const products = [{
        id: 1,
        name: 'Squier Stratocaster',
        price: 299,
        image: 'https://www.michenaud.com/upDATA/p/53000/52648/img1616606149-V0zsh5Ya/500medium.jpg',
        badge: 'Meilleure Vente',
        description: 'Guitare électrique classique avec un son iconique et des options polyvalentes.'
    },
    {
        id: 2,
        name: 'Gibson Les Paul',
        price: 1499,
        image: 'https://www.michenaud.com/upDATA/p/60500/60190/img1743857433-5DxCf5qO/zoom.png',
        badge: 'Nouveau',
        description: 'Guitare électrique premium connue pour son son riche et chaud avec sustain.'
    },
    {
        id: 3,
        name: 'Taylor 814ce',
        price: 1199,
        image: 'https://www.michenaud.com/upDATA/p/52500/52131/img1608808546-tXIOYa5n/500medium.jpg',
        badge: 'Top Note',
        description: 'Acoustique-électrique premium avec clarté exceptionnelle et projection.'
    },
    {
        id: 4,
        name: 'Yamaha C40',
        price: 179,
        image: 'https://www.michenaud.com/upDATA/p/14500/14350/img1432831808-tUHaO6aO/500medium.jpg',
        badge: '',
        description: 'Guitare classique parfaite pour débutants avec un son chaud et équilibré.'
    },
    {
        id: 5,
        name: 'Fender Precision Bass',
        price: 899,
        image: 'https://www.michenaud.com/upDATA/p/59000/58627/img1719915300-gBvp4O/500medium.jpg',
        badge: 'Promo',
        description: 'Basse légendaire avec un son profond et percutant pour tous les styles.',
        oldPrice: 1099
    },
    {
        id: 6,
        name: 'Ibanez RG Series',
        price: 4699,
        image: 'https://www.michenaud.com/upDATA/p/60000/59675/img1736852784-W9ceAn2i/500medium.jpg',
        badge: '',
        description: 'Guitare haute performance parfaite pour les joueurs de métal et rock.'
    },
    {
        id: 7,
        name: 'PRS Custom 24',
        price: 2799,
        image: 'https://r2.gear4music.com/media/128/1283415/1200/preview.jpg',
        badge: 'Premium',
        description: 'Guitare électrique haut de gamme alliant puissance et élégance sonore.'
    },
    {
        id: 8,
        name: 'Martin D-28',
        price: 2399,
        image: 'https://r2.gear4music.com/media/92/920699/1200/preview.jpg',
        badge: 'Classique',
        description: 'Acoustique légendaire avec des basses profondes et un son équilibré.'
    },
    {
        id: 9,
        name: 'Epiphone Casino',
        price: 649,
        image: 'https://r2.gear4music.com/media/125/1256195/1200/preview.jpg',
        badge: 'Vintage',
        description: 'Semi-hollow body iconique avec un son chaud parfait pour le blues et rock.'
    },
    {
        id: 10,
        name: 'Gretsch White Falcon',
        price: 3299,
        image: 'https://r2.gear4music.com/media/21/217588/1200/preview_1.jpg',
        badge: 'Luxe',
        description: 'Guitare prestigieuse au design spectaculaire et son cristallin unique.'
    },
    {
        id: 11,
        name: 'Music Man StingRay',
        price: 1699,
        image: 'https://r2.gear4music.com/media/109/1097047/1200/preview.jpg',
        badge: 'Nouveau',
        description: 'Basse active puissante avec un slap et un punch incomparables.'
    },
    {
        id: 12,
        name: 'Takamine Pro Series',
        price: 899,
        image: 'https://r2.gear4music.com/media/66/668435/1200/preview.jpg',
        badge: 'Promo',
        description: 'Acoustique-électrique japonaise avec une sonorité brillante et naturelle.',
        oldPrice: 1099
    }
];

// Quiz data
const quizQuestions = [{
        question: "Quelle genre de metal a fait son apparition en Europe au millieu des années 1980 ?",
        answers: ["Love metal", "Black metal", "Heavy metal", "Thrash metal"],
        correct: 1
    },
    {
        question: "Quel est le groupe de musique le plus connue parmis cette liste ?",
        answers: ["The Rolling Stones", "Led Zeppelin", "The Beatles", "Pink Floyd"],
        correct: 2
    },
    {
        question: "À quelle période le Rock'n Roll est-il apparu ?",
        answers: ["Les années 1960-1970", "Les années 1940-1950", "Les années 1920-1930", "Les années 1910-1920"],
        correct: 1
    },
    {
        question: "Qui est considéré comme l'un des plus grands guitaristes de tous les temps ?",
        answers: ["Eddie Van Halen", "Kirk Hammett", "Jimi Hendrix", "Dimebag Darrell"],
        correct: 2
    },
    {
        question: "Dans quel mouvement musical peut-on classer les groupes Limp Bizkit, Korn, Papa Roach, Deftones ?",
        answers: ["Hard Rock", "Heavy metal", "Néo-metal", "Thrash metal"],
        correct: 2
    },
    {
        question: "A combien de dollars s'est vendue la guitar de Kurt Cobain en 2021 ?",
        answers: ["4 millions", "1,5 million", "334 milles", "12 millions"],
        correct: 1
    },
    {
        question: "A quelle moment l'autorisation de la musique Rock a-t-elle été levée en URSS ?",
        answers: ["1920-1930", "1970-1980", "1950-1960", "1980-1990"],
        correct: 1
    },
    {
        question: "Quelle a été le plus grand concert de tous les temps ?",
        answers: ["Queen - Live Aid, Wembley Stadium, juillet 1985", "The Rolling Stones - Plage de Copacabana, Rio, 2006", "AC/DC - Moscou, 1991", "Metallica - Moscou, 1991"],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartBadge();
    setupSmoothScrolling();
    setupCartIcon();
    setupHeroButton();
    initQuiz();
});

// Load products to page
function loadProducts() {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    let html = '';
    products.forEach(product => {
                html += `
            <div class="col-lg-4 col-md-6">
                <div class="card guitar-card">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="card-body">
                        ${product.badge ? `<span class="badge badge-custom">${product.badge}</span>` : ''}
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <div class="price">
                            ${product.price} €
                            ${product.oldPrice ? `<small class="text-muted text-decoration-line-through">${product.oldPrice} €</small>` : ''}
                        </div>
                        <button class="btn btn-primary btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Ajouter au Panier
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// Update cart badge counter
function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('guitarCart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartBadge();
    showNotification(`${product.name} ajouté au panier!`);
}

// Show notification
function showNotification(message, type = 'success') {
    const notificationHTML = `
        <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3" 
             style="z-index: 9999; min-width: 300px;" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', notificationHTML);
    
    setTimeout(() => {
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => {
            if (alert.classList.contains('show')) {
                alert.remove();
            }
        });
    }, 3000);
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#panier' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Setup cart icon click
function setupCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            showCartPage();
        });
    }
}

// Setup hero button
function setupHeroButton() {
    const heroButton = document.getElementById('heroShopBtn');
    if (heroButton) {
        heroButton.addEventListener('click', function() {
            document.querySelector('#guitares').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

// Show cart page
function showCartPage() {
    const homePage = document.querySelector('.hero-section').parentElement;
    const cartPage = document.getElementById('cartPage');
    
    homePage.querySelectorAll('section, nav, footer').forEach(el => {
        if (!el.closest('#cartPage')) {
            el.style.display = 'none';
        }
    });
    
    cartPage.style.display = 'block';
    window.scrollTo(0, 0);
    displayCart();
    updateSummary();
    setupCardFormatting();
}

// Show home page
function showHomePage() {
    const homePage = document.querySelector('.hero-section').parentElement;
    const cartPage = document.getElementById('cartPage');
    
    homePage.querySelectorAll('section, nav, footer').forEach(el => {
        if (!el.closest('#cartPage')) {
            el.style.display = '';
        }
    });
    
    cartPage.style.display = 'none';
    window.scrollTo(0, 0);
}

// Display cart items
function displayCart() {
    const container = document.getElementById('cartItemsContainer');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Votre panier est vide</h3>
                <p class="text-muted">Ajoutez des guitares à votre panier pour continuer</p>
                <button class="btn btn-primary-custom mt-3" onclick="showHomePage()">
                    <i class="fas fa-arrow-left"></i> Retour à la boutique
                </button>
            </div>
        `;
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    let html = '<div class="checkout-section"><h3 class="section-title"><i class="fas fa-shopping-bag"></i> Articles</h3>';
    
    cart.forEach(item => {
        html += `
            <div class="cart-item">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="col-md-4">
                        <h5>${item.name}</h5>
                        <p class="text-muted mb-0">${item.price} €</p>
                    </div>
                    <div class="col-md-3">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span class="mx-2">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <div class="col-md-2 text-end">
                        <strong>${(item.price * item.quantity).toFixed(2)} €</strong>
                    </div>
                    <div class="col-md-1 text-end">
                        <button class="btn btn-sm btn-danger" onclick="removeItem(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Update quantity
function updateQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItem(id);
        } else {
            saveCart();
            displayCart();
            updateSummary();
        }
    }
}

// Remove item
function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    displayCart();
    updateSummary();
    updateCartBadge();
}

// Update summary
function updateSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tva = subtotal * 0.2;
    const total = subtotal + shippingCost;

    const subtotalEl = document.getElementById('subtotal');
    const tvaEl = document.getElementById('tva');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = subtotal.toFixed(2) + ' €';
    if (tvaEl) tvaEl.textContent = tva.toFixed(2) + ' €';
    if (totalEl) totalEl.textContent = total.toFixed(2) + ' €';
}

// Select shipping
function selectShipping(type) {
    document.querySelectorAll('.payment-option').forEach(el => {
        if (el.textContent.includes('Livraison')) {
            el.classList.remove('active');
        }
    });
    event.currentTarget.classList.add('active');
    
    shippingCost = type === 'express' ? 15 : 0;
    document.getElementById('shipping').textContent = shippingCost === 0 ? 'Gratuit' : shippingCost.toFixed(2) + ' €';
    updateSummary();
}

// Select payment
function selectPayment(type) {
    selectedPayment = type;
    document.querySelectorAll('.payment-option').forEach(el => {
        if (!el.textContent.includes('Livraison')) {
            el.classList.remove('active');
        }
    });
    event.currentTarget.classList.add('active');

    const cardForm = document.getElementById('cardPaymentForm');
    cardForm.style.display = type === 'card' ? 'block' : 'none';
}

// Proceed to checkout
function proceedToCheckout() {
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (checkoutForm.style.display === 'none') {
        checkoutForm.style.display = 'block';
        checkoutBtn.innerHTML = '<i class="fas fa-check"></i> Valider la commande';
        checkoutBtn.setAttribute('onclick', 'finalizeOrder()');
    }
}

// Finalize order
function finalizeOrder() {
    const shippingForm = document.getElementById('shippingForm');
    const paymentForm = document.getElementById('paymentForm');
    
    if (!shippingForm.checkValidity()) {
        shippingForm.reportValidity();
        return;
    }

    if (selectedPayment === 'card' && !paymentForm.checkValidity()) {
        paymentForm.reportValidity();
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + shippingCost;
    
    alert(`✅ Commande confirmée!\n\nMontant total: ${total.toFixed(2)} €\n\nMerci pour votre achat chez GuitarCenter!\nVous recevrez un email de confirmation.`);
    
    cart = [];
    saveCart();
    updateCartBadge();
    showHomePage();
}

// Setup card formatting
function setupCardFormatting() {
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCVV = document.getElementById('cardCVV');

    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    if (cardExpiry) {
        cardExpiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    if (cardCVV) {
        cardCVV.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
}

// ========== QUIZ FUNCTIONS ==========

// Initialize quiz
function initQuiz() {
    // Select 5 random questions
    selectedQuestions = [...quizQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
    
    currentQuestionIndex = 0;
    score = 0;
    
    document.getElementById('totalQuestions').textContent = selectedQuestions.length;
    loadQuestion();
}

// Load current question
function loadQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('questionText').textContent = question.question;
    
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const answerBtn = document.createElement('button');
        answerBtn.className = 'quiz-answer';
        answerBtn.textContent = answer;
        answerBtn.onclick = () => selectAnswer(index);
        answersContainer.appendChild(answerBtn);
    });
    
    document.getElementById('nextBtn').style.display = 'none';
}

// Select answer
function selectAnswer(selectedIndex) {
    const question = selectedQuestions[currentQuestionIndex];
    const answerButtons = document.querySelectorAll('.quiz-answer');
    
    // Disable all buttons
    answerButtons.forEach(btn => btn.style.pointerEvents = 'none');
    
    // Mark correct and incorrect
    answerButtons.forEach((btn, index) => {
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex) {
            btn.classList.add('incorrect');
        }
    });
    
    // Update score
    if (selectedIndex === question.correct) {
        score++;
    }
    
    // Show next button
    document.getElementById('nextBtn').style.display = 'inline-block';
}

// Next question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < selectedQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Show results
function showResults() {
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalTotal').textContent = selectedQuestions.length;
    
    const percentage = (score / selectedQuestions.length) * 100;
    let message = '';
    
    if (percentage === 100) {
        message = '🎉 Parfait ! Vous êtes un vrai expert musical !';
    } else if (percentage >= 80) {
        message = '👏 Excellent ! Vous connaissez bien la musique !';
    } else if (percentage >= 60) {
        message = '👍 Bien joué ! Continuez à apprendre !';
    } else if (percentage >= 40) {
        message = '🎵 Pas mal ! Il y a encore des choses à découvrir !';
    } else {
        message = '💪 Continuez vos efforts, la musique est un voyage !';
    }
    
    document.getElementById('scoreMessage').textContent = message;
}

// Restart quiz
function restartQuiz() {
    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    initQuiz();
}

// Make functions globally accessible
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeItem = removeItem;
window.selectShipping = selectShipping;
window.selectPayment = selectPayment;
window.proceedToCheckout = proceedToCheckout;
window.finalizeOrder = finalizeOrder;
window.showHomePage = showHomePage;
window.showCartPage = showCartPage;
window.nextQuestion = nextQuestion;
window.restartQuiz = restartQuiz;