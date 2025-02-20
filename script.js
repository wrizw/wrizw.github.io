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
    const scriptURL = "https://script.google.com/macros/s/AKfycbxwnXvlutIftm-DBXZbvT8clG5f07svmkDLiCjmtVFGSreAhJ6WFWI1wpWyQrQc6AtMQQ/exec"; 
    const form = document.forms["submit-to-google-sheet"];

    if (form) {
        form.addEventListener("submit", (e) => {
            const formData = new FormData(form);

            // Send data to Google Sheets without blocking form submission
            fetch(scriptURL, { method: "POST", body: formData })
                .then((response) => {
                    form.reset();
                    console.log("Success! Google Sheets:", response)
                })
                
                .catch((error) => console.error("Error! Google Sheets:", error.message));
        });
    } else {
        console.error("Form not found! Check the form name.");
    }
});
