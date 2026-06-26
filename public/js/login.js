const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === "paulo@email.com" && password === "123456") {

        window.location.href = '/weather';

    } else {
        alert("Usuário ou senha incorretos!");
    }
});
