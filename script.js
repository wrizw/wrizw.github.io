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
    };
    
    const scriptURL = "https://script.google.com/macros/s/AKfycbxwnXvlutIftm-DBXZbvT8clG5f07svmkDLiCjmtVFGSreAhJ6WFWI1wpWyQrQc6AtMQQ/exec"; 
    const formspreeURL = "https://formspree.io/f/xdkayely"; 
    const form = document.forms["submit-to-google-sheet"];

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent default submission (stops page refresh)
            const formData = new FormData(form);

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
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success! Formspree:", data);
                    
                    // Reset form after 2.5 seconds
                    setTimeout(() => {
                        form.reset();
                    }, 2500);
                })
                .catch((error) => console.error("Error! Formspree:", error.message));
        });
    } else {
        console.error("Form not found! Check the form name.");
    }
});
