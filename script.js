(function () {

    "use strict";


    /* =========================================================
       REDUCED MOTION
       ========================================================= */

    var prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;



    /* =========================================================
       MOBILE NAVIGATION
       ========================================================= */

    var navToggle =
        document.getElementById("navToggle");

    var navLinks =
        document.getElementById("navLinks");


    if (navToggle && navLinks) {

        navToggle.addEventListener(
            "click",
            function () {

                var isOpen =
                    navLinks.classList.toggle("open");


                navToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

            }
        );


        navLinks
            .querySelectorAll("a")
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



    /* =========================================================
       HERO STAMP
       ========================================================= */

    var heroStamp =
        document.getElementById("heroStamp");


    if (heroStamp) {

        window.setTimeout(
            function () {

                heroStamp.classList.add(
                    "stamped"
                );

            },

            prefersReducedMotion
                ? 0
                : 500
        );

    }



    /* =========================================================
       SCROLL REVEAL
       ========================================================= */

    var revealTargets =
        document.querySelectorAll(

            ".dossier-card, " +
            ".skill-block, " +
            ".case-file, " +
            ".internship-card, " +
            ".ledger-row, " +
            ".contact-card"

        );


    revealTargets.forEach(
        function (element) {

            element.classList.add(
                "reveal"
            );

        }
    );


    var seals =
        document.querySelectorAll(
            "[data-seal]"
        );



    if ("IntersectionObserver" in window) {


        var revealObserver =
            new IntersectionObserver(

                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "in-view"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.15,

                    rootMargin:
                        "0px 0px -40px 0px"
                }

            );


        revealTargets.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );



        var sealObserver =
            new IntersectionObserver(

                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "stamped"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.6
                }

            );


        seals.forEach(
            function (element) {

                sealObserver.observe(
                    element
                );

            }
        );

    }

    else {

        revealTargets.forEach(
            function (element) {

                element.classList.add(
                    "in-view"
                );

            }
        );


        seals.forEach(
            function (element) {

                element.classList.add(
                    "stamped"
                );

            }
        );

    }



    /* =========================================================
       TERMINAL TYPING EFFECT
       ========================================================= */

    var terminalBody =
        document.getElementById(
            "terminalBody"
        );


    var logLines = [

        "POST /api/auth/login          200 OK",

        "GET  /api/elections/active    200 OK",

        "GET  /api/candidates?eid=12   200 OK",

        "POST /api/votes/cast          201 CREATED",

        "GET  /api/results/12          200 OK",

        "-- one-person-one-vote: PASSED --"

    ];



    function typeTerminal() {

        if (!terminalBody) {
            return;
        }


        var lineIndex = 0;

        var charIndex = 0;


        terminalBody.textContent = "";


        function typeChar() {


            if (
                lineIndex >=
                logLines.length
            ) {

                terminalBody.textContent +=
                    "\n$ _";

                return;
            }


            var currentLine =
                logLines[lineIndex];


            if (
                charIndex === 0 &&
                lineIndex > 0
            ) {

                terminalBody.textContent +=
                    "\n";

            }


            terminalBody.textContent +=
                currentLine.charAt(
                    charIndex
                );


            charIndex++;


            if (
                charIndex >=
                currentLine.length
            ) {

                lineIndex++;

                charIndex = 0;


                window.setTimeout(
                    typeChar,
                    220
                );

            }

            else {

                window.setTimeout(
                    typeChar,
                    14
                );

            }

        }


        typeChar();

    }



    if (terminalBody) {


        if (prefersReducedMotion) {

            terminalBody.textContent =
                logLines.join("\n") +
                "\n$ _";

        }


        else if (
            "IntersectionObserver"
            in window
        ) {


            var termObserver =
                new IntersectionObserver(

                    function (
                        entries,
                        observer
                    ) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    typeTerminal();

                                    observer.disconnect();

                                }

                            }
                        );

                    },

                    {
                        threshold: 0.4
                    }

                );


            termObserver.observe(
                terminalBody
            );

        }


        else {

            typeTerminal();

        }

    }



    /* =========================================================
       NAVIGATION SHADOW
       ========================================================= */

    var topbar =
        document.getElementById(
            "topbar"
        );


    if (topbar) {


        window.addEventListener(

            "scroll",

            function () {


                if (
                    window.scrollY > 40
                ) {

                    topbar.style.boxShadow =
                        "0 8px 24px rgba(0,0,0,0.25)";

                }


                else {

                    topbar.style.boxShadow =
                        "none";

                }

            },

            {
                passive: true
            }

        );

    }



    /* =========================================================
       CERTIFICATE CHECK
       ========================================================= */

    var certificateLinks =
        document.querySelectorAll(
            'a[href="certificates/internship-certificate.pdf"]'
        );


    certificateLinks.forEach(
        function (link) {


            link.addEventListener(
                "click",
                function () {

                    console.log(
                        "Opening internship certificate..."
                    );

                }
            );

        }
    );


})();