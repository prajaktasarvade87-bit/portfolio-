document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll(".section");
    /* =====================================
   SECTION COUNTER
   ===================================== */

const slideCounter = document.createElement("div");

slideCounter.className = "slide-counter";

slideCounter.innerHTML = `
    <span class="current">01</span>
    <span class="separator">/</span>
    <span class="total">${String(sections.length).padStart(2, "0")}</span>
`;

document.body.appendChild(slideCounter);

const slideCounterName = document.createElement("div");

slideCounterName.className = "slide-counter-name";

document.body.appendChild(slideCounterName);

const sectionNames = [
    "HOME",
    "ABOUT ME",
    "MY SKILLS",
    "MY PROJECTS",
    "EDUCATION",
    "CONTACT"
];
    let currentSlide = 0;

    

/* Update section name */

slideCounterName.textContent =
    sectionNames[currentSlide] || "";

    /* =====================================
       NEXT BUTTON
       ===================================== */

    const nextBtn = document.createElement("button");

    nextBtn.className = "next-page-btn";

    nextBtn.innerHTML = `
        Next Page
        <span>→</span>
    `;

    document.body.appendChild(nextBtn);


    /* =====================================
       PREVIOUS BUTTON
       ===================================== */

    const prevBtn = document.createElement("button");

    prevBtn.className = "prev-page-btn";

    prevBtn.innerHTML = `
        <span>←</span>
        Previous
    `;

    document.body.appendChild(prevBtn);


    /* =====================================
       SHOW SLIDE
       ===================================== */

    function showSlide(index, direction = "next") {

        if (index < 0) {
            index = 0;
        }

        if (index >= sections.length) {
            index = sections.length - 1;
        }

        currentSlide = index;


        sections.forEach((section, i) => {

            section.classList.remove(
                "slide-active",
                "slide-prev",
                "slide-next"
            );


            if (i === currentSlide) {

                section.classList.add("slide-active");

                /* Start every new page from top */
                section.scrollTop = 0;

            }

            else if (i < currentSlide) {

                section.classList.add("slide-prev");

            }

            else {

                section.classList.add("slide-next");

            }

        });
        /* =================================
   UPDATE SECTION COUNTER
   ================================= */

const currentNumber = slideCounter.querySelector(".current");

currentNumber.textContent =
    String(currentSlide + 1).padStart(2, "0");



        /* =================================
           PREVIOUS BUTTON
           ================================= */

        if (currentSlide === 0) {

            prevBtn.style.display = "none";

        } else {

            prevBtn.style.display = "flex";

        }


        /* =================================
           NEXT BUTTON
           ================================= */

        if (currentSlide === sections.length - 1) {

            nextBtn.style.display = "none";

        } else {

            nextBtn.style.display = "flex";

        }

    }


    /* =====================================
       NEXT BUTTON CLICK
       ===================================== */

    nextBtn.addEventListener("click", () => {

        if (currentSlide < sections.length - 1) {

            showSlide(currentSlide + 1, "next");

        }

    });


    /* =====================================
       PREVIOUS BUTTON CLICK
       ===================================== */

    prevBtn.addEventListener("click", () => {

        if (currentSlide > 0) {

            showSlide(currentSlide - 1, "prev");

        }

    });


    /* =====================================
       NAVBAR LINKS
       ===================================== */

    document.querySelectorAll(".nav-menu a").forEach(link => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) {
                return;
            }

            const target = document.querySelector(href);

            if (!target) {
                return;
            }

            event.preventDefault();

            const targetIndex = Array.from(sections).indexOf(target);

            if (targetIndex !== -1) {

                showSlide(
                    targetIndex,
                    targetIndex > currentSlide ? "next" : "prev"
                );

            }

        });

    });


    /* =====================================
       KEYBOARD NAVIGATION
       ===================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "ArrowRight" || event.key === "PageDown") {

            if (currentSlide < sections.length - 1) {

                showSlide(currentSlide + 1, "next");

            }

        }


        if (event.key === "ArrowLeft" || event.key === "PageUp") {

            if (currentSlide > 0) {

                showSlide(currentSlide - 1, "prev");

            }

        }

    });


    

    /* =====================================
       TOUCH SWIPE
       ===================================== */

    let touchStartX = 0;
    let touchStartY = 0;


    document.addEventListener("touchstart", (event) => {

        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;

    });


    document.addEventListener("touchend", (event) => {

        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;

        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;


        /* Only horizontal swipe */
        if (Math.abs(diffX) < 70) {
            return;
        }

        if (Math.abs(diffX) < Math.abs(diffY)) {
            return;
        }


        if (diffX < 0) {

            if (currentSlide < sections.length - 1) {

                showSlide(currentSlide + 1, "next");

            }

        } else {

            if (currentSlide > 0) {

                showSlide(currentSlide - 1, "prev");

            }

        }

    });


    /* =====================================
       START HOME PAGE
       ===================================== */

    showSlide(0);

});