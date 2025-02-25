document.addEventListener("DOMContentLoaded", function() {
    const userIcon = document.getElementById("userIcon");
    const userDropdown = document.getElementById("userDropdown");

    userIcon.addEventListener("click", function() {
        if (userDropdown.style.display === "none" || userDropdown.style.display === "") {
            userDropdown.style.display = "block";
        } else {
            userDropdown.style.display = "none";
        }
    });

    // Sayfa dışına tıklayınca dropdown'u kapat
    document.addEventListener("click", function(event) {
        if (!userIcon.contains(event.target) && !userDropdown.contains(event.target)) {
            userDropdown.style.display = "none";
        }
    });
});
