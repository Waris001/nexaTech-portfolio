/* =========================================================
   CONTACT PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       FAQ ACCORDION
    ====================================================== */

    const faqQuestions =
        document.querySelectorAll(".contact-faq-question");


    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const currentItem =
                question.closest(".contact-faq-item");


            /*
             * Close other FAQ items
             */

            document
                .querySelectorAll(".contact-faq-item.active")
                .forEach(function (item) {

                    if (item !== currentItem) {

                        item.classList.remove("active");

                    }

                });


            /*
             * Toggle current item
             */

            currentItem.classList.toggle("active");

        });

    });


    /* =====================================================
       CONTACT FORM
    ====================================================== */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();


            /*
             * Get fields
             */

            const name =
                document.getElementById("fullName");

            const email =
                document.getElementById("email");

            const phone =
                document.getElementById("phone");

            const service =
                document.getElementById("service");

            const message =
                document.getElementById("message");


            /*
             * Remove old errors
             */

            contactForm
                .querySelectorAll(".contact-input-error")
                .forEach(function (error) {

                    error.remove();

                });


            contactForm
                .querySelectorAll(".input-error")
                .forEach(function (input) {

                    input.classList.remove("input-error");

                });


            let valid = true;


            /*
             * Validation helper
             */

            function showError(input, text) {

                valid = false;

                input.classList.add("input-error");


                const error =
                    document.createElement("small");

                error.className =
                    "contact-input-error";

                error.textContent = text;


                input.parentElement
                    .parentElement
                    .appendChild(error);

            }


            /*
             * Name
             */

            if (name.value.trim() === "") {

                showError(
                    name,
                    "Please enter your name."
                );

            }


            /*
             * Email
             */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                email.value.trim() === "" ||
                !emailPattern.test(email.value.trim())
            ) {

                showError(
                    email,
                    "Please enter a valid email address."
                );

            }


            /*
             * Phone
             */

            const phonePattern =
                /^[0-9+\-\s()]{8,20}$/;


            if (
                phone.value.trim() === "" ||
                !phonePattern.test(phone.value.trim())
            ) {

                showError(
                    phone,
                    "Please enter a valid phone number."
                );

            }


            /*
             * Service
             */

            if (service.value === "") {

                showError(
                    service,
                    "Please select a service."
                );

            }


            /*
             * Message
             */

            if (message.value.trim().length < 10) {

                showError(
                    message,
                    "Please tell us a little more about your requirement."
                );

            }


            /*
             * Stop if invalid
             */

            if (!valid) {

                const firstError =
                    contactForm.querySelector(".input-error");

                if (firstError) {

                    firstError.focus();

                }

                return;

            }


            /*
             * Button loading
             */

            const submitButton =
                contactForm.querySelector(
                    ".contact-submit-btn"
                );


            const originalButtonHTML =
                submitButton.innerHTML;


            submitButton.classList.add("loading");

            submitButton.innerHTML = `
                <span>Sending...</span>
                <i class="bi bi-arrow-repeat"></i>
            `;


            /*
             * Demo submission
             *
             * Replace this section with your
             * backend API / Spring Boot endpoint.
             */

            setTimeout(function () {

                submitButton.classList.remove("loading");

                submitButton.innerHTML =
                    originalButtonHTML;


                /*
                 * Show success
                 */

                const successMessage =
                    document.getElementById("formSuccess");


                if (successMessage) {

                    successMessage.classList.add("show");

                }


                /*
                 * Reset form
                 */

                contactForm.reset();


            }, 1200);

        });

    }


    /* =====================================================
       ADD FORM ERROR STYLES
    ====================================================== */

    const contactStyle =
        document.createElement("style");


    contactStyle.textContent = `

        .input-error {
            border-color: #dc6b6b !important;
            background: #fffafa !important;
        }

        .contact-input-error {
            display: block;
            margin-top: 5px;
            color: #d65f5f;
            font-size: 11px;
        }

    `;


    document.head.appendChild(contactStyle);


    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener("click", function (event) {

                const targetID =
                    this.getAttribute("href");


                if (
                    targetID &&
                    targetID !== "#"
                ) {

                    const target =
                        document.querySelector(targetID);


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }

            });

        });

});

/* ============================================================
   ABOUT PAGE
   Counter Animation
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    const counters = document.querySelectorAll(".about-counter");

    if (!counters.length) {
        return;
    }

    const animateCounter = (counter) => {

        const target = parseInt(
            counter.getAttribute("data-target"),
            10
        );

        let current = 0;

        const duration = 1600;

        const startTime = performance.now();


        const updateCounter = (currentTime) => {

            const elapsed = currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            /*
             * Ease-out effect
             */
            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            current = Math.floor(
                easedProgress * target
            );

            counter.textContent = current;


            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target;

            }

        };


        requestAnimationFrame(updateCounter);

    };


    const observer = new IntersectionObserver(

        (entries, observerInstance) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    counters.forEach(counter => {

                        if (
                            counter.dataset.animated === "true"
                        ) {
                            return;
                        }

                        counter.dataset.animated = "true";

                        animateCounter(counter);

                    });

                    observerInstance.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.3
        }

    );


    const statsSection =
        document.querySelector(".about-stats");

    if (statsSection) {

        observer.observe(statsSection);

    }

});

/* =========================================================
   PRODUCTS PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ---------------------------------------------------------
       Smooth scrolling
    --------------------------------------------------------- */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* ---------------------------------------------------------
       Scroll reveal
    --------------------------------------------------------- */

    const revealElements = document.querySelectorAll(
        ".product-card, " +
        ".products-service-box, " +
        ".products-process-item, " +
        ".products-tech-content, " +
        ".products-tech-visual"
    );


    revealElements.forEach(function (element) {

        element.style.opacity = "0";

        element.style.transform = "translateY(30px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

    });


    const revealObserver = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: 0.12
        }

    );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });


    /* ---------------------------------------------------------
       Product card stagger effect
    --------------------------------------------------------- */

    document.querySelectorAll(".product-card").forEach(
        function (card, index) {

            card.style.transitionDelay =
                (index % 2) * 0.08 + "s";

        }
    );


    /* ---------------------------------------------------------
       Subtle hero parallax
    --------------------------------------------------------- */

    const heroBackground =
        document.querySelector(".products-hero-bg");


    if (heroBackground) {

        window.addEventListener("scroll", function () {

            const scrollPosition = window.scrollY;

            if (scrollPosition < 800) {

                heroBackground.style.transform =
                    "scale(1.03) translateY(" +
                    scrollPosition * 0.12 +
                    "px)";

            }

        });

    }


    /* ---------------------------------------------------------
       Product image hover zoom
    --------------------------------------------------------- */

    document.querySelectorAll(".product-card").forEach(
        function (card) {

            const image =
                card.querySelector(".product-card-image");

            if (!image) {
                return;
            }

            card.addEventListener("mouseenter", function () {

                image.style.transform = "scale(1.04)";

            });

            card.addEventListener("mouseleave", function () {

                image.style.transform = "scale(1)";

            });

            image.style.transition =
                "transform 0.6s ease";

        }
    );

});

/* =========================================================
   INDUSTRIES PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ---------------------------------------------
       INDUSTRY FILTER
    --------------------------------------------- */

    const filterButtons =
        document.querySelectorAll(".industry-filter-btn");

    const industryCards =
        document.querySelectorAll(".industry-card");


    if (filterButtons.length && industryCards.length) {

        filterButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const filter =
                    this.getAttribute("data-filter");


                /* Active button */

                filterButtons.forEach(function (btn) {

                    btn.classList.remove("active");

                });

                this.classList.add("active");


                /* Filter cards */

                industryCards.forEach(function (card) {

                    const category =
                        card.getAttribute("data-category");


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        card.classList.remove("hidden");

                    } else {

                        card.classList.add("hidden");

                    }

                });

            });

        });

    }


    /* ---------------------------------------------
       SMOOTH SCROLL
    --------------------------------------------- */

    const scrollLinks =
        document.querySelectorAll(
            '.industries-page a[href^="#"]'
        );


    scrollLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();

                const header =
                    document.querySelector(".site-header");

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    15;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }

        });

    });


    /* ---------------------------------------------
       SIMPLE REVEAL ANIMATION
    --------------------------------------------- */

    const revealElements =
        document.querySelectorAll(
            ".industry-card, " +
            ".business-solution-card, " +
            ".industry-benefit"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "industry-visible"
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

            element.classList.add(
                "industry-reveal"
            );

            revealObserver.observe(element);

        });

    }

});

/* =========================================================
   HOMEPAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       HERO SLIDER
    ====================================================== */

    const heroSlides =
        document.querySelectorAll(".hero-slide");

    const heroIndicators =
        document.querySelectorAll(".hero-indicator");

    const heroNext =
        document.querySelector(".hero-next");

    const heroPrev =
        document.querySelector(".hero-prev");

    const heroSection =
        document.querySelector(".home-hero");


    if (heroSlides.length) {

        let currentSlide = 0;

        let heroInterval;


        function showSlide(index) {

            if (index >= heroSlides.length) {
                index = 0;
            }

            if (index < 0) {
                index = heroSlides.length - 1;
            }

            heroSlides.forEach(function (slide) {

                slide.classList.remove("active");

            });


            heroIndicators.forEach(function (indicator) {

                indicator.classList.remove("active");

            });


            heroSlides[index].classList.add("active");


            if (heroIndicators[index]) {

                heroIndicators[index]
                    .classList.add("active");

            }


            currentSlide = index;

        }


        function nextSlide() {

            showSlide(currentSlide + 1);

        }


        function previousSlide() {

            showSlide(currentSlide - 1);

        }


        function startHeroSlider() {

            clearInterval(heroInterval);

            heroInterval =
                setInterval(nextSlide, 6500);

        }


        if (heroNext) {

            heroNext.addEventListener(
                "click",
                function () {

                    nextSlide();

                    startHeroSlider();

                }
            );

        }


        if (heroPrev) {

            heroPrev.addEventListener(
                "click",
                function () {

                    previousSlide();

                    startHeroSlider();

                }
            );

        }


        heroIndicators.forEach(
            function (indicator, index) {

                indicator.addEventListener(
                    "click",
                    function () {

                        showSlide(index);

                        startHeroSlider();

                    }
                );

            }
        );


        /* Pause while mouse is over hero */

        if (heroSection) {

            heroSection.addEventListener(
                "mouseenter",
                function () {

                    clearInterval(heroInterval);

                }
            );


            heroSection.addEventListener(
                "mouseleave",
                function () {

                    startHeroSlider();

                }
            );

        }


        /* Start */

        showSlide(0);

        startHeroSlider();

    }



    /* =====================================================
       COUNTER ANIMATION
    ====================================================== */

    const counters =
        document.querySelectorAll(".counter");


    function animateCounter(counter) {

        const target =
            parseInt(
                counter.getAttribute("data-target")
            );


        let current = 0;

        const duration = 1600;

        const startTime = performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);


            /* Ease out */

            const eased =
                1 - Math.pow(1 - progress, 3);


            current =
                Math.floor(target * eased);


            counter.textContent = current;


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent = target;

            }

        }


        requestAnimationFrame(updateCounter);

    }


    if (
        counters.length &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                animateCounter(
                                    entry.target
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.4
                }
            );


        counters.forEach(
            function (counter) {

                counterObserver.observe(counter);

            }
        );

    }



    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".home-page .service-card, " +
            ".home-page .solution-showcase-card, " +
            ".home-page .why-card, " +
            ".home-page .process-item, " +
            ".home-page .value-item, " +
            ".home-page .technology-cloud span"
        );


    if (
        revealElements.length &&
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

                                entry.target
                                    .classList
                                    .add("visible");

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
            function (element, index) {

                element.classList.add(
                    "home-reveal"
                );


                /*
                 * Small stagger effect
                 */

                element.style.transitionDelay =
                    (index % 4) * 0.08 + "s";


                revealObserver.observe(
                    element
                );

            }
        );

    }



    /* =====================================================
       INDUSTRY / ANCHOR SMOOTH SCROLL
    ====================================================== */

    const smoothLinks =
        document.querySelectorAll(
            '.home-page a[href^="#"]'
        );


    smoothLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");


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


                    if (target) {

                        event.preventDefault();


                        const header =
                            document.querySelector(
                                ".site-header"
                            );


                        const headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;


                        const position =
                            target
                                .getBoundingClientRect()
                                .top +
                            window.scrollY -
                            headerHeight -
                            15;


                        window.scrollTo({

                            top: position,

                            behavior: "smooth"

                        });

                    }

                }
            );

        }
    );

});

/* =========================================================
   SERVICES PAGE
   SCROLL REVEAL ANIMATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const revealElements = document.querySelectorAll(".reveal");

    if (revealElements.length > 0) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    }

});


/* =========================================================
   SMOOTH SCROLL FOR SERVICE DROPDOWN LINKS
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        if (
            targetId &&
            targetId !== "#" &&
            document.querySelector(targetId)
        ) {

            e.preventDefault();

            const target = document.querySelector(targetId);

            const header = document.querySelector("#header");

            const headerHeight = header
                ? header.offsetHeight
                : 80;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }

    });

});


/* =========================================================
   ACTIVE SERVICE URL
   ========================================================= */

window.addEventListener("load", function () {

    const hash = window.location.hash;

    if (hash) {

        setTimeout(function () {

            const target = document.querySelector(hash);

            if (target) {

                const header = document.querySelector("#header");

                const headerHeight = header
                    ? header.offsetHeight
                    : 80;

                window.scrollTo({
                    top:
                        target.offsetTop -
                        headerHeight -
                        15,
                    behavior: "smooth"
                });

            }

        }, 300);

    }

});
