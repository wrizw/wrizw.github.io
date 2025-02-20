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

const scriptURL = "https://script.google.com/macros/s/AKfycbxwnXvlutIftm-DBXZbvT8clG5f07svmkDLiCjmtVFGSreAhJ6WFWI1wpWyQrQc6AtMQQ/exec"; 
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then((response) => {
            form.reset();
            console.log("Success!", response);
        })
        .catch((error) => console.error("Error!", error.message));
});
