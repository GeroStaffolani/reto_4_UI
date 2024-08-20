document.addEventListener('DOMContentLoaded', () => {
    let cart = [];

    // Verifica si hay productos en el carrito almacenados en localStorage
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPriceElement = document.getElementById('total-price');

    // Actualiza la visualización del carrito en cart.html y en el dropdown
    const updateCartDisplay = () => {
        // Actualizar la lista del carrito en cart.html
        cartList.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'uk-flex uk-flex-between uk-flex-middle uk-margin-small';
            li.innerHTML = `
                <div>
                    <h5>${item.name}</h5>
                    <p>Precio: $${item.price.toFixed(2)}</p>
                    <p>Talle: ${item.size}</p>
                </div>
                <div>
                    <img src="${item.image}" style="height: 50px; margin-right: 10px;">
                    <button class="uk-button uk-button-danger uk-button-small remove-item" data-index="${index}">&times;</button>
                </div>
            `;
            cartList.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;

        // Actualizar la lista del carrito en el dropdown
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'uk-flex uk-flex-between uk-flex-middle uk-margin-small';
            itemElement.innerHTML = `
                <img src="${item.image}" style="height: 50px; width: auto;" alt="${item.name}">
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button class="uk-button uk-button-danger uk-button-small remove-item-dropdown" data-index="${index}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(itemElement);

            const divider = document.createElement('hr');
            divider.className = 'uk-divider-small';
            cartItemsContainer.appendChild(divider);
        });

        cartCount.textContent = cart.length;
        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    };

    // Elimina un producto del carrito en cart.html
    cartList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay(); // Actualizar ambas vistas después de eliminar
        }
    });

    // Elimina un producto del carrito desde el dropdown
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-dropdown')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay(); // Actualizar ambas vistas después de eliminar
        }
    });

    // Botón de proceder al pago
    document.getElementById('checkout').addEventListener('click', () => {
        if (cart.length > 0) {
            window.location.href = 'checkout.html';
        } else {
            alert('El carrito está vacío.');
        }
    });

    // Inicializa la visualización del carrito
    updateCartDisplay();
});
