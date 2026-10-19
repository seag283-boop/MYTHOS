/* ========================================
   MYTHOS - MYTHOLOGY PAGE
======================================== */

/* 신화 이야기 데이터 */
const mythologStories = {
    zeus: {
        number: "01",
        category: "OLYMPIAN GODS",
        title: "제우스",
        subtitle: "ZEUS · 신들의 왕",
        image: "image/artspace03.jpg",
        tags: ["올림포스", "번개", "권능"],
        story: `
            <p>제우스는 그리스 신화에서 올림포스의 왕이자 하늘과 번개를 다스리는 신이다.</p>
            <p>크로노스의 아들로 태어난 제우스는 형제들과 힘을 합쳐 티탄들과의 전쟁에서 승리했다. 이후 신들의 세계를 다스리는 왕이 되었으며, 인간과 신들의 운명에 큰 영향을 미치는 존재로 묘사된다.</p>
            <p>그의 상징은 번개와 독수리, 그리고 왕권을 나타내는 홀이다.</p>
        `
    },

    persephone: {
        number: "02",
        category: "LOVE & FATE",
        title: "페르세포네",
        subtitle: "PERSEPHONE · 봄과 지하세계",
        image: "image/artspace04.jpg",
        tags: ["계절", "하데스", "생명"],
        story: `
            <p>페르세포네는 대지의 여신 데메테르의 딸로, 봄의 생명력과 지하세계의 여왕이라는 두 가지 모습을 지닌다.</p>
            <p>하데스와 관련된 이야기에서 페르세포네는 지하세계에 머무는 시간과 지상으로 돌아오는 시간을 갖게 된다. 이 이야기는 계절의 변화와 자연의 순환을 설명하는 신화로 전해진다.</p>
            <p>그녀의 이야기는 상실과 회복, 어둠과 생명의 순환을 상징한다.</p>
        `
    },

    heracles: {
        number: "03",
        category: "HEROES",
        title: "헤라클레스",
        subtitle: "HERACLES · 위대한 영웅",
        image: "image/artspace05.jpg",
        tags: ["12가지 과업", "용기", "시련"],
        story: `
            <p>헤라클레스는 엄청난 힘과 용기로 알려진 그리스 신화의 영웅이다.</p>
            <p>그는 수많은 시련을 겪으며 네메아의 사자를 물리치고, 히드라와 싸우는 등 어려운 과업을 수행했다. 전해지는 이야기에서는 총 열두 가지의 과업이 그의 대표적인 업적으로 등장한다.</p>
            <p>헤라클레스의 여정은 고난을 극복하는 인간의 의지와 용기를 보여준다.</p>
        `
    },

    medusa: {
        number: "04",
        category: "MONSTERS",
        title: "메두사",
        subtitle: "MEDUSA · 시선의 저주",
        image: "image/artspace06.jpg",
        tags: ["고르곤", "페르세우스", "석화"],
        story: `
            <p>메두사는 바라보는 이를 돌로 변하게 하는 힘을 지닌 고르곤으로 알려져 있다.</p>
            <p>영웅 페르세우스는 메두사의 눈을 직접 마주하지 않기 위해 방패에 비친 모습을 이용해 그녀에게 다가갔다. 메두사의 이야기는 고대부터 다양한 예술 작품과 문학에서 새롭게 해석되어 왔다.</p>
            <p>그녀는 공포의 존재인 동시에 시대에 따라 다른 의미로 재해석되는 상징적인 인물이다.</p>
        `
    },

    narcissus: {
        number: "05",
        category: "LOVE & FATE",
        title: "나르키소스",
        subtitle: "NARCISSUS · 물에 비친 얼굴",
        image: "image/artspace07.jpg",
        tags: ["자아", "반영", "운명"],
        story: `
            <p>나르키소스는 자신의 아름다운 모습에 사로잡힌 인물로 알려져 있다.</p>
            <p>연못에 비친 자신의 모습을 사랑하게 된 그는 그곳을 떠나지 못한다. 이 이야기는 자기 자신에 대한 집착과 채워지지 않는 욕망을 상징하는 이야기로 전해진다.</p>
            <p>나르키소스의 이름은 오늘날 자기애를 설명하는 여러 표현의 기원이 되었다.</p>
        `
    },

    odysseus: {
        number: "06",
        category: "HEROES",
        title: "오디세우스",
        subtitle: "ODYSSEUS · 귀환의 여정",
        image: "image/artspace08.jpg",
        tags: ["모험", "지혜", "귀향"],
        story: `
            <p>오디세우스는 트로이 전쟁 이후 고향 이타카로 돌아가기 위해 긴 여정을 떠난 영웅이다.</p>
            <p>그는 키클롭스 폴리페모스와 맞서고, 세이렌의 노래를 견디며 수많은 위험을 통과한다. 강한 힘뿐 아니라 지혜와 기지를 활용해 위기를 극복하는 인물로 묘사된다.</p>
            <p>그의 이야기는 오랜 방황 끝에 자신의 자리로 돌아가는 여정을 그린다.</p>
        `
    }
};


/* ========================================
   1. 모바일 메뉴
======================================== */

function initMythologMobileMenu() {
    const menuToggle = document.getElementById("mytholog-menu-toggle");
    const gnb = document.getElementById("mytholog-gnb");

    if (!menuToggle || !gnb) return;

    menuToggle.addEventListener("click", function () {
        const isOpen = gnb.classList.toggle("is-open");

        menuToggle.classList.toggle("is-active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    gnb.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            gnb.classList.remove("is-open");
            menuToggle.classList.remove("is-active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


/* ========================================
   2. 신화 카드 필터
======================================== */

function initMythologFilter() {
    const filterButtons = document.querySelectorAll(".mytholog-filter-btn");
    const storyCards = document.querySelectorAll(".mytholog-story-card");
    const storyCount = document.getElementById("mytholog-story-count");
    const emptyMessage = document.getElementById("mytholog-story-empty");
    const resetButton = document.getElementById("mytholog-story-reset");

    if (!filterButtons.length || !storyCards.length) return;

    function filterStories(category) {
        let visibleCount = 0;

        storyCards.forEach(function (card) {
            const cardCategory = card.dataset.category;
            const isVisible =
                category === "all" || cardCategory === category;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }
        });

        filterButtons.forEach(function (button) {
            const isActive = button.dataset.category === category;

            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        if (storyCount) {
            storyCount.textContent = String(visibleCount);
        }

        if (emptyMessage) {
            emptyMessage.hidden = visibleCount !== 0;
        }
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            filterStories(button.dataset.category || "all");
        });
    });

    if (resetButton) {
        resetButton.addEventListener("click", function () {
            filterStories("all");
        });
    }

    filterStories("all");
}


/* ========================================
   3. 신화 상세 모달
======================================== */

function initMythologStoryModal() {
    const modal = document.getElementById("mytholog-story-modal");

    if (!modal) {
        console.error(
            "MYTHOLOGY 모달을 찾을 수 없습니다. HTML에서 id를 확인하세요."
        );
        return;
    }

    const modalImage = document.getElementById("mytholog-modal-image");
    const modalNumber = document.getElementById("mytholog-modal-number");
    const modalCategory = document.getElementById("mytholog-modal-category");
    const modalTitle = document.getElementById("mytholog-modal-title");
    const modalSubtitle = document.getElementById("mytholog-modal-subtitle");
    const modalStory = document.getElementById("mytholog-modal-story");
    const modalTags = document.getElementById("mytholog-modal-tags");

    let previousFocus = null;

    function openModal(storyKey) {
        const story = mythologStories[storyKey];

        if (!story) {
            console.error("신화 데이터를 찾을 수 없습니다:", storyKey);
            return;
        }

        previousFocus = document.activeElement;

        if (modalImage) {
            modalImage.src = story.image;
            modalImage.alt = story.title;
        }

        if (modalNumber) {
            modalNumber.textContent = story.number;
        }

        if (modalCategory) {
            modalCategory.textContent = story.category;
        }

        if (modalTitle) {
            modalTitle.textContent = story.title;
        }

        if (modalSubtitle) {
            modalSubtitle.textContent = story.subtitle;
        }

        if (modalStory) {
            modalStory.innerHTML = story.story;
        }

        if (modalTags) {
            modalTags.replaceChildren();

            story.tags.forEach(function (tagText) {
                const tag = document.createElement("span");
                tag.className = "mytholog-modal-tag";
                tag.textContent = tagText;
                modalTags.appendChild(tag);
            });
        }

        modal.hidden = false;
        modal.classList.add("is-open");
        document.body.classList.add("mytholog-modal-open");

        const closeButton = modal.querySelector("[data-mytholog-close]");

        if (closeButton) {
            closeButton.focus();
        }

        console.log("신화 모달 열림:", story.title);
    }

    function closeModal() {
        if (modal.hidden) return;

        modal.hidden = true;
        modal.classList.remove("is-open");
        document.body.classList.remove("mytholog-modal-open");

        if (previousFocus && typeof previousFocus.focus === "function") {
            previousFocus.focus();
        }

        console.log("신화 모달 닫힘");
    }

    /*
     * 카드 버튼뿐 아니라 data-mytholog-story 속성이 있는
     * 다른 버튼도 클릭 이벤트를 처리한다.
     */
    document.addEventListener("click", function (event) {
        const openButton = event.target.closest("[data-mytholog-story]");

        if (openButton) {
            event.preventDefault();

            const storyKey = openButton.dataset.mythologStory;
            openModal(storyKey);
            return;
        }

        const closeButton = event.target.closest("[data-mytholog-close]");

        if (closeButton) {
            event.preventDefault();
            closeModal();
            return;
        }

        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !modal.hidden) {
            closeModal();
        }
    });
}


/* ========================================
   4. 히어로 버튼
======================================== */

function initMythologHeroButton() {
    const heroButton = document.querySelector(".mytholog-hero-btn");
    const collection = document.getElementById("mytholog-collection");

    if (!heroButton || !collection) return;

    heroButton.addEventListener("click", function (event) {
        event.preventDefault();

        collection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}


/* ========================================
   5. 페이지 초기화
======================================== */

function initMythologPage() {
    initMythologMobileMenu();
    initMythologFilter();
    initMythologStoryModal();
    initMythologHeroButton();

    console.log("MYTHOLOGY 페이지 JavaScript 실행 완료");
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMythologPage);
} else {
    initMythologPage();
}