document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", function () {
            navMenu.classList.toggle("open");
        });

        // Close menu when clicking a link
        document.querySelectorAll("#nav-menu a").forEach(link => {
            link.addEventListener("click", function () {
                navMenu.classList.remove("open");
            });
        });
    }
});
