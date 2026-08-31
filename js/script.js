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

        const isOpen = mobileMenu.classList.contains("active");

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
======================================== */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();


        /* Get form values */

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const serviceValue =
    document.getElementById("service").value;

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
    
        const message =
            document.getElementById("message").value.trim();


        /* Basic validation */

        if (!name || !email || !message) {

            alert(
                "Please fill in your name, email and project details."
            );

            return;

        }


        /* Email subject */

        const subject =
            `New Project Enquiry from ${name}`;


        /* Email body */

        const body =
`Hello Novariyan,

I have a project enquiry.

Name: ${name}
Email: ${email}
Service: ${service || "Not specified"}

Project Details:
${message}

Thank you.`;


        /* Create mailto link */

        const mailtoLink =
            `mailto:novariyanstudio@gmail.com` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;


        /* Open email client */

        window.location.href = mailtoLink;

    });

}