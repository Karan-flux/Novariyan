/* ========================================
   NOVARIYAN
   Global JavaScript
======================================== */


/* ========================================
   DOM READY
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ========================================
       MOBILE MENU
    ======================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.toggle("active");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );


            /* Accessibility */

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        /* ========================================
           CLOSE MENU WHEN LINK IS CLICKED
        ======================================== */

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


        /* ========================================
           CLOSE MENU WHEN CLICKING OUTSIDE
        ======================================== */

        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                mobileMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);


            if (
                mobileMenu.classList.contains("active") &&
                !clickedInsideMenu &&
                !clickedToggle
            ) {

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

            }

        });


        /* ========================================
           CLOSE MENU WITH ESCAPE
        ======================================== */

        document.addEventListener("keydown", (event) => {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains("active")
            ) {

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

                menuToggle.focus();

            }

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


                /* ========================================
                   GET FORM ELEMENTS
                ======================================== */

                const nameInput =
                    document.getElementById("name");

                const emailInput =
                    document.getElementById("email");

                const serviceInput =
                    document.getElementById("service");

                const messageInput =
                    document.getElementById("message");


                if (
                    !nameInput ||
                    !emailInput ||
                    !messageInput
                ) {

                    console.error(
                        "Required contact form fields are missing."
                    );

                    return;

                }


                /* ========================================
                   GET VALUES
                ======================================== */

                const name =
                    nameInput.value.trim();

                const email =
                    emailInput.value.trim();

                const serviceValue =
                    serviceInput
                        ? serviceInput.value
                        : "";

                const message =
                    messageInput.value.trim();



                /* ========================================
                   SERVICE NAMES
                ======================================== */

                const serviceNames = {

                    web:
                        "Web Development",

                    ai:
                        "AI / Machine Learning",

                    software:
                        "Custom Software",

                    design:
                        "UI / UX Design",

                    automation:
                        "Automation",

                    other:
                        "Other"

                };


                const service =
                    serviceNames[serviceValue]
                    || serviceValue
                    || "Not specified";



                /* ========================================
                   BASIC VALIDATION
                ======================================== */

                if (!name) {

                    alert(
                        "Please enter your name."
                    );

                    nameInput.focus();

                    return;

                }


                if (!email) {

                    alert(
                        "Please enter your email address."
                    );

                    emailInput.focus();

                    return;

                }


                /* Email validation */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    alert(
                        "Please enter a valid email address."
                    );

                    emailInput.focus();

                    return;

                }


                if (!message) {

                    alert(
                        "Please tell us about your project."
                    );

                    messageInput.focus();

                    return;

                }


                if (message.length < 10) {

                    alert(
                        "Please provide a little more detail about your project."
                    );

                    messageInput.focus();

                    return;

                }



                /* ========================================
                   SUBMIT BUTTON
                ======================================== */

                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );


                const originalButtonText =
                    submitButton
                        ? submitButton.innerHTML
                        : "Send Project Enquiry →";


                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.innerHTML =
                        "Sending...";

                }



                /* ========================================
                   WEB3FORMS
                ======================================== */

                try {

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


                    /* ========================================
                       SEND REQUEST
                    ======================================== */

                    const response =
                        await fetch(
                            "https://api.web3forms.com/submit",
                            {
                                method: "POST",
                                body: formData
                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            `HTTP error: ${response.status}`
                        );

                    }


                    const result =
                        await response.json();



                    /* ========================================
                       SUCCESS
                    ======================================== */

                    if (result.success) {

                        alert(
                            "Thank you! Your project enquiry has been sent successfully. We will get back to you soon."
                        );


                        contactForm.reset();

                    }


                    /* ========================================
                       WEB3FORMS ERROR
                    ======================================== */

                    else {

                        alert(
                            "Sorry, we couldn't send your enquiry. Please try again."
                        );


                        console.error(
                            "Web3Forms error:",
                            result
                        );

                    }

                }



                /* ========================================
                   NETWORK ERROR
                ======================================== */

                catch (error) {

                    console.error(
                        "Form submission error:",
                        error
                    );


                    alert(
                        "Unable to send your enquiry right now. Please check your internet connection and try again."
                    );

                }



                /* ========================================
                   RESTORE BUTTON
                ======================================== */

                finally {

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML =
                            originalButtonText;

                    }

                }

            }
        );

    }



    /* ========================================
       SMOOTH SCROLL
    ======================================== */

    const navigationLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    navigationLinks.forEach(link => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });



    /* ========================================
       NAVBAR SCROLL EFFECT
    ======================================== */

    const navbar =
        document.querySelector(".navbar");


    if (navbar) {

        const updateNavbar =
            () => {

                if (window.scrollY > 20) {

                    navbar.classList.add(
                        "scrolled"
                    );

                } else {

                    navbar.classList.remove(
                        "scrolled"
                    );

                }

            };


        window.addEventListener(
            "scroll",
            updateNavbar,
            { passive: true }
        );


        updateNavbar();

    }



    /* ========================================
       SERVICE CARD INTERACTION
    ======================================== */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );


    serviceCards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "is-hovered"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "is-hovered"
                );

            }
        );

    });



    /* ========================================
       CURRENT YEAR
    ======================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-year]"
        );


    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });



    /* ========================================
       CONSOLE BRANDING
    ======================================== */

    console.log(
        "%cNOVARIYAN",
        "font-size: 24px; font-weight: 800;"
    );

    console.log(
        "%cBuild. Automate. Grow.",
        "font-size: 14px;"
    );

});