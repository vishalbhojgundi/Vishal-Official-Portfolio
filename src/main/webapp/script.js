"use strict";


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const navToggle =
        document.getElementById("navToggle");

    const navLinks =
        document.getElementById("navLinks");


    if (navToggle && navLinks) {

        navToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    navLinks.classList.toggle("open");

                navToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                );

            }
        );


        document
            .querySelectorAll("#navLinks a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navLinks.classList.remove("open");

                        navToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }



    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const topbar =
        document.getElementById("topbar");


    function updateNavbar() {

        if (!topbar) {
            return;
        }


        if (window.scrollY > 30) {

            topbar.classList.add("scrolled");

        } else {

            topbar.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    updateNavbar();



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navigationLinks =
        document.querySelectorAll(
            "#navLinks a"
        );


    function updateActiveLink() {

        let current =
            "";


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );


                const href =
                    link.getAttribute("href");


                if (
                    href === "#" + current
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );


    updateActiveLink();



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".about-main-card, " +
            ".mini-card, " +
            ".skill-card, " +
            ".featured-project, " +
            ".project-card, " +
            ".experience-card, " +
            ".education-item, " +
            ".contact-content"
        );


    revealElements.forEach(
        function (element) {

            element.classList.add(
                "reveal"
            );

        }
    );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

    }



    /* =====================================================
       CERTIFICATE MODAL
       EXISTING JAVA BACKEND IS PRESERVED
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



    /* OPEN */

    if (
        viewCertificateBtn &&
        certificateModal
    ) {

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

                    setTimeout(
                        function () {

                            nameInput.focus();

                        },
                        100
                    );

                }

            }
        );

    }



    /* CLOSE */

    if (
        closeCertificateModal &&
        certificateModal
    ) {

        closeCertificateModal.addEventListener(
            "click",
            function () {

                certificateModal.classList.remove(
                    "show"
                );

            }
        );

    }



    /* CLOSE OUTSIDE */

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



    /* ESCAPE */

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


                if (name === "") {

                    certificateMessage.textContent =
                        "Please enter your name.";

                    return;

                }


                if (gender === "") {

                    certificateMessage.textContent =
                        "Please select your gender.";

                    return;

                }


                certificateMessage.textContent =
                    "Saving your details...";


                try {


                    /*
                     * IMPORTANT
                     *
                     * This is the SAME servlet
                     * used by your existing project.
                     *
                     * Do not change your Java backend.
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
                                method:
                                    "POST",

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


                    setTimeout(
                        function () {


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


                        },
                        700
                    );


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
       SMOOTH BUTTON INTERACTION
    ===================================================== */

    document
        .querySelectorAll(".primary-button, .secondary-button, .nav-button")
        .forEach(function (button) {

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

        });



    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (
        heroVisual &&
        window.matchMedia(
            "(min-width: 900px)"
        ).matches
    ) {

        window.addEventListener(
            "mousemove",
            function (event) {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        .5) * 8;


                const y =
                    (event.clientY /
                        window.innerHeight -
                        .5) * 8;


                heroVisual.style.transform =
                    "translate(" +
                    x +
                    "px," +
                    y +
                    "px)";

            }
        );

    }

});