// ==============================
// COMMON HEADER & FOOTER
// ==============================

document.addEventListener("DOMContentLoaded", async () => {
    const headerContainer = document.querySelector("#common-header");
    const footerContainer = document.querySelector("#common-footer");

    try {
        const response = await fetch("common.html");

        if (!response.ok) {
            throw new Error("공통 HTML 파일을 불러오지 못했습니다.");
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // 헤더 불러오기
        if (headerContainer) {
            const header = doc.querySelector("header");

            if (header) {
                headerContainer.innerHTML = header.outerHTML;
            }
        }

        // 푸터 불러오기
        if (footerContainer) {
            const footer = doc.querySelector("footer");

            if (footer) {
                footerContainer.innerHTML = footer.outerHTML;
            }
        }

        // 헤더와 푸터 삽입 후 메뉴 이벤트 연결
        initMobileMenu();
        initAuthMenu();

    } catch (error) {
        console.error("공통 레이아웃 로드 오류:", error);
    }
});


// ==============================
// MOBILE MENU
// ==============================

function initMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const gnb = document.querySelector(".gnb");

    if (!menuToggle || !gnb) return;

    menuToggle.addEventListener("click", () => {
        const isOpen = gnb.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "메뉴 닫기" : "메뉴 열기"
        );
    });

    // 메뉴 링크 클릭 시 메뉴 닫기
    gnb.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            gnb.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "메뉴 열기");
        });
    });

    // PC 화면으로 전환되면 모바일 메뉴 초기화
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            gnb.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "메뉴 열기");
        }
    });
}


/* ==============================
   LOGIN REQUIRED MODAL
   MYTHOS 공통 로그인 확인
============================== */

function initLoginModal() {
    if (document.querySelector("#login-required-modal")) return;

    const modal = document.createElement("div");
    modal.id = "login-required-modal";
    modal.className = "login-modal";
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
        <div class="login-modal-backdrop"
             data-close-login-modal></div>

        <section class="login-modal-content"
                 role="dialog"
                 aria-modal="true"
                 aria-labelledby="login-modal-title">

            <button type="button"
                    class="login-modal-close"
                    aria-label="모달 닫기"
                    data-close-login-modal>
                &times;
            </button>

            <span class="login-modal-eyebrow">
                MYTHOS MEMBER
            </span>

            <h2 id="login-modal-title">LOGIN REQUIRED</h2>

            <p>
                로그인이 필요한 서비스입니다.<br>
                로그인 후 이용해 주세요.
            </p>

            <a href="login.html" class="login-modal-button">
                로그인하기
            </a>

            <button type="button"
                    class="login-modal-cancel"
                    data-close-login-modal>
                다음에 하기
            </button>
        </section>
    `;

    document.body.appendChild(modal);

    function openModal() {
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("login-modal-open");

        modal.querySelector(".login-modal-close")?.focus();
    }

    function closeModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("login-modal-open");
    }

    // 모달 닫기
    modal.addEventListener("click", (event) => {
        if (event.target.closest("[data-close-login-modal]")) {
            closeModal();
        }
    });

    // ESC 키로 닫기
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });

    /*
      로그인이 필요한 버튼만 확인한다.
      로그인한 사용자는 기존 클릭 동작을 다시 실행한다.
    */
    document.addEventListener("click", async (event) => {
        const target = event.target.closest("[data-requires-login]");

        if (!target) return;

        // 로그인 확인 후 재실행된 클릭은 통과
        if (target.dataset.loginVerified === "true") {
            delete target.dataset.loginVerified;
            return;
        }

        // 비로그인 상태에서 원래 동작이 실행되는 것을 차단
        event.preventDefault();
        event.stopImmediatePropagation();

        const client = window.supabaseClient;

        if (!client) {
            console.error("Supabase 클라이언트가 없습니다.");
            openModal();
            return;
        }

        if (target.dataset.checkingLogin === "true") return;
        target.dataset.checkingLogin = "true";

        try {
            const {
                data: { user },
                error
            } = await client.auth.getUser();

            if (error) throw error;

            if (!user) {
                openModal();
                return;
            }

            // 로그인한 경우 기존 클릭 이벤트를 실행
            target.dataset.loginVerified = "true";
            target.click();

        } catch (error) {
            console.error("로그인 확인 실패:", error);
            openModal();

        } finally {
            delete target.dataset.checkingLogin;
        }
    }, true);
}

// 기존 공통 레이아웃 로딩과 독립적으로 초기화
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLoginModal);
} else {
    initLoginModal();
}

// 로그인 상태에 따라 로그인 / 로그아웃 버튼 표시
async function updateAuthMenu() {
    const client = window.supabaseClient;
    const loginLink = document.querySelector("#login-link");
    const logoutButton = document.querySelector("#logout-button");

    if (!client || !loginLink || !logoutButton) return;

    try {
        const { data, error } = await client.auth.getSession();

        if (error) throw error;

        const isLoggedIn = Boolean(data.session);

        loginLink.hidden = isLoggedIn;
        logoutButton.hidden = !isLoggedIn;
    } catch (error) {
        console.error("로그인 상태 확인 실패:", error);
    }
}


// 로그아웃 버튼 클릭
document.addEventListener("click", async (event) => {
    const button = event.target.closest("#logout-button");

    if (!button || button.disabled) return;

    const client = window.supabaseClient;

    if (!client) {
        alert("로그인 서비스를 불러오지 못했습니다.");
        return;
    }

    button.disabled = true;

    try {
        const { error } = await client.auth.signOut();

        if (error) throw error;

        window.location.href = "index.html";
    } catch (error) {
        console.error("로그아웃 실패:", error);
        alert("로그아웃에 실패했습니다. 다시 시도해 주세요.");
        button.disabled = false;
    }
});


// 로그인 상태가 변경되면 메뉴 갱신
function initAuthMenu() {
    const client = window.supabaseClient;

    if (!client) {
        console.error(
            "Supabase 클라이언트가 없습니다. js/supabase.js를 확인해 주세요."
        );
        return;
    }

    updateAuthMenu();

    client.auth.onAuthStateChange(() => {
        updateAuthMenu();
    });
}