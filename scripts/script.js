document.addEventListener('DOMContentLoaded', () => {
    // cargar carrito del local storage
    const loadCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart;
    };

    // guardar carrito en localStorage
    const saveCart = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // ver carrito
    const updateCartDisplay = () => {
        const cart = loadCart();
        const cartItemsContainer = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        const totalPriceElement = document.getElementById('total-price');
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'uk-grid-small uk-flex-middle uk-margin-bottom';
            itemElement.setAttribute('uk-grid', '');
            itemElement.innerHTML = `
                <div class="uk-width-auto">
                    <img src="${item.image}" style="height: 50px; width: auto;">
                </div>
                <div class="uk-width-expand">
                    <span>${item.name} - $${item.price.toFixed(2)}</span>
                </div>
                <div class="uk-width-auto">
                    <button class="uk-button uk-button-danger uk-button-small" onclick="removeFromCart(${index})">Eliminar</button>
                </div>
                <hr class="uk-divider-small">
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.price;
        });

        cartCount.textContent = cart.length;
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    };

    // añadir al carrito
    const addToCartButtons = document.querySelectorAll('.uk-button-primary');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image');
            const size = document.getElementById("size").value;

            const cart = loadCart();
            const product = { name, price, image, size };
            cart.push(product);
            saveCart(cart);
            updateCartDisplay();
        });
    });

    // eliminar producto carrito
    window.removeFromCart = (index) => {
        let cart = loadCart();
        cart.splice(index, 1);
        saveCart(cart);
        updateCartDisplay();
    };

    // ver carrito
    updateCartDisplay();

    // contador carrito
    const updateCartCount = () => {
        const cart = loadCart();
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    };

    updateCartCount();
});


//inicio funcion login
function initializeUsers() {
    const users = [
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' }
    ];
    localStorage.setItem('users', JSON.stringify(users));
}


function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        UIkit.notification({
            message: 'Sesión iniciada con éxito',
            status: 'success',
            timeout: 5000 
        });

        setTimeout(() => {
            window.location.href = '/index.html';
        }, 1000); 
    } else {
        
        UIkit.notification({
            message: 'Nombre de usuario o contraseña incorrectos',
            status: 'danger'
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
});


