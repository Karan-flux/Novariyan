/* ========================================
   NOVARIYAN
   Global JavaScript
======================================== */


/* ========================================
   MOBILE MENU
======================================== */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");
        mobileMenu.classList.toggle("active");

        const isOpen =
            mobileMenu.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    /* Close menu after clicking a link */

    const mobileLinks =
        mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

}



/* ========================================
   CONTACT FORM
   WEB3FORMS
======================================== */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            /* Get form values */

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const serviceValue =
                document.getElementById("service").value;

            const message =
                document.getElementById("message").value.trim();


            /* Service names */

            const serviceNames = {

                web: "Web Development",

                mobile: "Mobile Application",

                ai: "AI / Machine Learning",

                software: "Custom Software",

                design: "UI / UX Design",

                automation: "Automation",

                other: "Other"

            };


            const service =
                serviceNames[serviceValue] || "Not specified";


            /* Basic validation */

            if (!name || !email || !message) {

                alert(
                    "Please fill in your name, email and project details."
                );

                return;

            }


            /* Disable submit button */

            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );

            const originalButtonText =
                submitButton
                    ? submitButton.textContent
                    : "Send Project Enquiry →";


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Sending...";

            }


            try {

                /* Create form data */

                const formData =
                    new FormData();

                formData.append(
                    "access_key",
                    "26665275-7b5a-4170-8642-8c6116ee879b"
                );

                formData.append(
                    "name",
                    name
                );

                formData.append(
                    "email",
                    email
                );

                formData.append(
                    "service",
                    service
                );

                formData.append(
                    "message",
                    message
                );

                formData.append(
                    "subject",
                    `New Project Enquiry from ${name}`
                );

                formData.append(
                    "from_name",
                    "Novariyan Website"
                );


                /* Send to Web3Forms */

                const response =
                    await fetch(
                        "https://api.web3forms.com/submit",
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                const result =
                    await response.json();


                /* Successful submission */

                if (result.success) {

                    alert(
                        "Thank you! Your project enquiry has been sent successfully. We will get back to you soon."
                    );

                    contactForm.reset();

                }


                /* Failed submission */

                else {

                    alert(
                        "Sorry, something went wrong. Please try again."
                    );

                    console.error(
                        "Web3Forms error:",
                        result
                    );

                }

            }


            catch (error) {

                alert(
                    "Unable to send your enquiry. Please check your internet connection and try again."
                );

                console.error(
                    "Form submission error:",
                    error
                );

            }


            finally {

                /* Re-enable button */

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        originalButtonText;

                }

            }

        }
    );

}