// ================= TYPING EFFECT =================

const typed = new Typed(".multiple-text", {
    strings: [
        "Frontend Developer",
        "Web Designer",
        "JavaScript Learner"
    ],
    typeSpeed: 50,
    backSpeed: 60,
    backDelay: 1500,
    loop: true
});


// ================= MOBILE MENU =================

const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {

    menuIcon.onclick = () => {
        menuIcon.classList.toggle("bx-x");
        navbar.classList.toggle("active");
    };

}


// ================= NAVBAR =================

const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");


// Update active navbar link while scrolling

function updateActiveLink() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

}


// Scroll par active link change

window.addEventListener("scroll", updateActiveLink);


// Navbar click

navLinks.forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {

            const header = document.querySelector(".header");
            const headerHeight = header ? header.offsetHeight : 0;

            const position =
                targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });

        }

        // Active link

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");


        // Mobile menu close

        if (navbar) {
            navbar.classList.remove("active");
        }

        if (menuIcon) {
            menuIcon.classList.remove("bx-x");
        }

    });

});
// ================= EMAILJS CONTACT FORM =================

emailjs.init({
    publicKey: "G3rJQ7094Jaj5YZ5z"
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const button = contactForm.querySelector(
            "button[type='submit']"
        );

        button.disabled = true;
        button.innerText = "Sending...";

        emailjs.sendForm(
            "service_l9mqsna",
            "template_l2lcx0s",
            contactForm
        )
        .then(function (response) {

            console.log("SUCCESS:", response);

            formStatus.innerText =
                "Message sent successfully! ✅";

            formStatus.style.color = "#00ff88";

            contactForm.reset();

        })
        .catch(function (error) {

            console.error("EMAILJS ERROR:", error);

            formStatus.innerText =
                "Message could not be sent. Please try again. ❌";

            formStatus.style.color = "red";

        })
        .finally(function () {

            button.disabled = false;
            button.innerText = "Send Message";

        });

    });

}
// ================= SKILL BAR ANIMATION =================

const skillBars = document.querySelectorAll(".progress-bar span");

const skillObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                const bar = entry.target;
                const width = bar.getAttribute("data-width");

                bar.style.setProperty("--skill-width", width);
                bar.classList.add("animate");

            }

        });

    },
    {
        threshold: 0.3
    }
);

skillBars.forEach(function (bar) {
    skillObserver.observe(bar);
});