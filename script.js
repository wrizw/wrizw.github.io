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
    const formspreeURL = "https://formspree.io/f/xdkayely"; 
    const form = document.forms["submit-to-google-sheet"];
    const successMessage = document.getElementById("success-message");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();  // Prevent page reload
            const formData = new FormData(form);

            // Hide previous success message (if any)
            if (successMessage) {
                successMessage.style.display = "none";
            }

            // Send data to Google Sheets
            fetch(scriptURL, { method: "POST", body: formData })
                .then((response) => console.log("Success! Google Sheets:", response))
                .catch((error) => console.error("Error! Google Sheets:", error.message));

            // Send data to Formspree manually
            fetch(formspreeURL, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" },
            })
                .then((data) => {
                    console.log("Success! Formspree:", data);

                    // Show success message
                    if (successMessage) {
                        successMessage.style.display = "block";
                    }

                    // Reset form after 1.5 seconds
                    setTimeout(() => {
                        form.reset();
                        if (successMessage) {
                            successMessage.style.display = "none"; // Hide message after a few seconds
                        }
                    }, 1500);
                })
                .catch((error) => console.error("Error! Formspree:", error.message));
        });
    } else {
        console.error("Form not found! Check the form name.");
    }
});
