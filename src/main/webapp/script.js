document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navigation = document.getElementById("navigation");

    if (menuBtn && navigation) {

        menuBtn.addEventListener("click", function () {

            navigation.classList.toggle("show");

        });

    }


    /* Close mobile menu after clicking navigation */

    document.querySelectorAll(".nav-link").forEach(function (link) {

        link.addEventListener("click", function () {

            if (navigation) {
                navigation.classList.remove("show");
            }

        });

    });


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.getElementById("header");

    window.addEventListener("scroll", function () {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === "#" + currentSection) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".article-card, " +
            ".info-card, " +
            ".skill-card, " +
            ".project-featured, " +
            ".project-card, " +
            ".experience-card, " +
            ".education-item, " +
            ".contact-box"
        );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(

                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12
                }

            );


        revealElements.forEach(function (element) {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       CERTIFICATE MODAL
    ===================================================== */

    const viewCertificateBtn =
        document.getElementById(
            "viewCertificateBtn"
        );

    const certificateModal =
        document.getElementById(
            "certificateModal"
        );

    const closeCertificateModal =
        document.getElementById(
            "closeCertificateModal"
        );

    const certificateViewerForm =
        document.getElementById(
            "certificateViewerForm"
        );

    const certificateMessage =
        document.getElementById(
            "certificateMessage"
        );


    /* Open modal */

    if (viewCertificateBtn) {

        viewCertificateBtn.addEventListener(
            "click",
            function () {

                certificateModal.classList.add(
                    "show"
                );

                const nameInput =
                    document.getElementById(
                        "viewerName"
                    );

                if (nameInput) {

                    setTimeout(function () {

                        nameInput.focus();

                    }, 100);

                }

            }
        );

    }


    /* Close modal */

    if (closeCertificateModal) {

        closeCertificateModal.addEventListener(
            "click",
            function () {

                certificateModal.classList.remove(
                    "show"
                );

            }
        );

    }


    /* Close by clicking outside */

    if (certificateModal) {

        certificateModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    certificateModal
                ) {

                    certificateModal.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    /* Close using Escape */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                certificateModal &&
                certificateModal.classList.contains("show")
            ) {

                certificateModal.classList.remove(
                    "show"
                );

            }

        }
    );


    /* =====================================================
       CERTIFICATE FORM
       ===================================================== */

    if (certificateViewerForm) {

        certificateViewerForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const nameInput =
                    document.getElementById(
                        "viewerName"
                    );

                const genderInput =
                    document.getElementById(
                        "viewerGender"
                    );


                const name =
                    nameInput.value.trim();

                const gender =
                    genderInput.value;


                /* Validate name */

                if (name === "") {

                    certificateMessage.textContent =
                        "Please enter your name.";

                    return;

                }


                /* Validate gender */

                if (gender === "") {

                    certificateMessage.textContent =
                        "Please select your gender.";

                    return;

                }


                certificateMessage.textContent =
                    "Saving your details...";


                try {

                    /*
                     * IMPORTANT:
                     * This is your existing Java Servlet.
                     * Do not change it.
                     */

                    const formData =
                        new URLSearchParams();


                    formData.append(
                        "name",
                        name
                    );

                    formData.append(
                        "gender",
                        gender
                    );


                    const response =
                        await fetch(
                            "save-certificate-viewer",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/x-www-form-urlencoded;charset=UTF-8"
                                },

                                body:
                                    formData.toString()
                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Server error"
                        );

                    }


                    certificateMessage.textContent =
                        "Details saved. Opening certificate...";


                    setTimeout(function () {

                        window.open(
                            "certificates/internship-certificate.pdf",
                            "_blank"
                        );


                        certificateModal.classList.remove(
                            "show"
                        );


                        certificateViewerForm.reset();

                        certificateMessage.textContent =
                            "";

                    }, 700);


                } catch (error) {

                    console.error(
                        "Certificate error:",
                        error
                    );

                    certificateMessage.textContent =
                        "Unable to save details. Please try again.";

                }

            }
        );

    }


    /* =====================================================
       BUTTON HOVER EFFECT
    ===================================================== */

    document.querySelectorAll(".btn").forEach(
        function (button) {

            button.addEventListener(
                "mouseenter",
                function () {

                    button.style.transform =
                        "translateY(-2px)";

                }
            );


            button.addEventListener(
                "mouseleave",
                function () {

                    button.style.transform =
                        "";

                }
            );

        }
    );

});