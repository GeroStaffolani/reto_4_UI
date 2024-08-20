document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        // agarramos los valores del registro
        const username = document.getElementById('new-username').value.trim();
        const password = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // validamos campos
        if (username === '') {
            UIkit.notification({
                message: 'El nombre de usuario es obligatorio.',
                status: 'danger'
            });
            return;
        }

        if (password === '') {
            UIkit.notification({
                message: 'La contraseña es obligatoria.',
                status: 'danger'
            });
            return;
        }

        if (password !== confirmPassword) {
            UIkit.notification({
                message: 'Las contraseñas no coinciden.',
                status: 'danger'
            });
            return;
        }

        // guardamos el usuario en el local storage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        // vemos si el nombre ya esta registrado en el local storage
        if (users.some(user => user.username === username)) {
            UIkit.notification({
                message: 'El nombre de usuario ya está registrado.',
                status: 'danger'
            });
            return;
        }

        // agregamos user
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));

        // notificacion
        UIkit.notification({
            message: 'Registro exitoso.',
            status: 'success'
        });

        // resetear formulario
        form.reset();
    });
});
