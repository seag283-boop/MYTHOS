document.addEventListener("DOMContentLoaded", () => {
    // ========================================
    // FAQ ACCORDION
    // ========================================

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const button = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!button || !answer) return;

        button.addEventListener("click", () => {
            const isExpanded =
                button.getAttribute("aria-expanded") === "true";

            button.setAttribute("aria-expanded", String(!isExpanded));
            answer.hidden = isExpanded;
        });
    });


    // ========================================
    // MOBILE NAVIGATION
    // ========================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".gnb");

    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", () => {
            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "메뉴 열기" : "메뉴 닫기"
            );

            navigation.classList.toggle("is-open", !isOpen);
        });

        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navigation.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "메뉴 열기");
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 650) {
                navigation.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "메뉴 열기");
            }
        });
    }
});