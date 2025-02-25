document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submitButton");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const keepMeLoggedInCheckbox = document.getElementById("keepMeLoggedIn");
    const forgotPasswordLink = document.getElementById("forgotPasswordLink");
    const forgotPasswordForm = document.getElementById("forgot-password-form");
    const loginForm = document.getElementById("login-form");
    const resetButton = document.getElementById("resetButton");
    const resetEmailInput = document.getElementById("resetEmail");
    const newPasswordInput = document.getElementById("newPassword");
    const backToLoginLink = document.getElementById("backToLoginLink");

    function validateForm() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email) {
            alert("Please enter your email.");
            return false;
        }
        if (!password) {
            alert("Please enter your password.");
            return false;
        }
        return true;
    }

    submitButton.addEventListener("click", function() {
        if (validateForm()) {
            const email = emailInput.value;
            const password = passwordInput.value;
            const keepMeLoggedIn = keepMeLoggedInCheckbox.checked;

            window.location.href = "home.html";
        }
    });

    keepMeLoggedInCheckbox.addEventListener("change", function() {
        console.log(`Keep Me Logged In: ${this.checked}`);
    });

    forgotPasswordLink.addEventListener("click", function(event) {
        event.preventDefault();
        loginForm.style.display = "none";
        forgotPasswordForm.style.display = "block";
    });

    backToLoginLink.addEventListener("click", function(event) {
        event.preventDefault();
        forgotPasswordForm.style.display = "none";
        loginForm.style.display = "block";
    });

    resetButton.addEventListener("click", function() {
        const resetEmail = resetEmailInput.value.trim();
        const newPassword = newPasswordInput.value.trim();

        if (!resetEmail) {
            alert("Please enter your email.");
            return;
        }
        if (!newPassword) {
            alert("Please enter your new password.");
            return;
        }

        alert(`Email: ${resetEmail}\nNew Password: ${newPassword}`);
    });
});
submitButton.addEventListener("click", function() {
    if (validateForm()) {
        const email = emailInput.value;
        const password = passwordInput.value;

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "home.html";
            } else {
                alert("Login failed. Please try again.");
            }
        });
    }
});


$('#submitButton').click(function() {
    const email = $('#email').val();
    const password = $('#password').val();

    $.ajax({
        url: '/login',
        method: 'POST',
        data: { email, password },
        success: function(response) {
            alert(response);
        },
        error: function(err) {
            alert('Giriş başarısız: ' + err.responseText);
        }
    });
});







