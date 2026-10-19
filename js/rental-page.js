
document.addEventListener("DOMContentLoaded", () => {
    const rentalList = document.querySelector("#rental-list");
    const rentalCount = document.querySelector("#rental-count");
    const rentalEmpty = document.querySelector("#rental-empty");
    const rentalError = document.querySelector("#rental-error");
    const rentalReset = document.querySelector("#rental-reset");
    const rentalRetry = document.querySelector("#rental-retry");
    const rentalSort = document.querySelector("#rental-sort");
    const filterButtons = document.querySelectorAll(".rental-filter-btn");

    const FAVORITES_TABLE = "MYTHOS_FAVORITES";
    const CART_KEY = "mythosCart";

    let allArtworks = [];
    let currentTheme = "all";
    let currentUser = null;
    let favorites = new Set();

    const themeAliases = {
        "올림포스": "신과 여신",
        "신과 여신": "신과 여신",
        "영웅과 모험": "영웅과 전설",
        "영웅과 전설": "영웅과 전설",
        "사랑과 운명": "사랑과 비극",
        "사랑과 비극": "사랑과 비극",
        "괴물과 환상": "괴물과 환상",
        "자연과 세계": "자연과 세계"
    };

    function getImagePath(filename) {
        if (!filename) return "";

        const cleanFilename = String(filename)
            .replace(/\\/g, "/")
            .replace(/^\/+/, "")
            .replace(/^image\//i, "");

        return `image/${cleanFilename}`;
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, (char) => {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            };

            return entities[char];
        });
    }

    function formatPrice(price) {
        if (
            price === null ||
            price === undefined ||
            price === "" ||
            !Number.isFinite(Number(price))
        ) {
            return "가격 문의";
        }

        return `${Number(price).toLocaleString("ko-KR")}원`;
    }

    function getCategory(artwork) {
        const theme = String(artwork.theme ?? "").trim();

        if (themeAliases[theme]) {
            return themeAliases[theme];
        }

        const text = [
            artwork.title_ko,
            artwork.title_en,
            artwork.myth_subject,
            artwork.description
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        const keywordGroups = [
            {
                category: "괴물과 환상",
                keywords: [
                    "메두사", "미노타우로스", "키메라", "케르베로스",
                    "페가수스", "히드라", "사이클롭스", "괴물",
                    "medusa", "minotaur", "hydra", "monster"
                ]
            },
            {
                category: "사랑과 비극",
                keywords: [
                    "에로스", "프시케", "오르페우스", "에우리디케",
                    "아도니스", "나르키소스", "사랑", "비극",
                    "eros", "psyche", "orpheus"
                ]
            },
            {
                category: "영웅과 전설",
                keywords: [
                    "헤라클레스", "페르세우스", "테세우스", "아킬레우스",
                    "오디세우스", "이아손", "프로메테우스", "영웅", "모험",
                    "hercules", "perseus", "achilles"
                ]
            },
            {
                category: "자연과 세계",
                keywords: [
                    "가이아", "데메테르", "포세이돈", "하데스",
                    "대지", "바다", "계절", "자연", "세계",
                    "gaia", "demeter", "poseidon", "hades"
                ]
            },
            {
                category: "신과 여신",
                keywords: [
                    "제우스", "헤라", "아테나", "아폴론", "아르테미스",
                    "아레스", "헤르메스", "아프로디테", "올림포스",
                    "zeus", "hera", "athena", "apollo", "olympus"
                ]
            }
        ];

        for (const group of keywordGroups) {
            if (group.keywords.some((keyword) => text.includes(keyword))) {
                return group.category;
            }
        }

        return theme || "기타";
    }

    // 작품 ID 확인
    function getArtworkId(artwork) {
        return String(
            artwork.id ??
            artwork.artwork_id ??
            artwork.artwork_code ??
            ""
        );
    }

    // 이미지 경로를 장바구니 데이터로 전달
    function getCartImage(artwork) {
        return getImagePath(artwork.image_filename);
    }

    // 로그인 상태 확인
    async function loadFavoriteState() {
        const client = window.supabaseClient;

        if (!client) {
            currentUser = null;
            favorites = new Set();
            return;
        }

        try {
            const {
                data: { session },
                error: sessionError
            } = await client.auth.getSession();

            if (sessionError) throw sessionError;

            currentUser = session?.user ?? null;
            favorites = new Set();

            if (!currentUser) return;

            const { data, error } = await client
                .from(FAVORITES_TABLE)
                .select("artwork_id")
                .eq("user_id", currentUser.id);

            if (error) throw error;

            favorites = new Set(
                (data || []).map((item) => String(item.artwork_id))
            );
        } catch (error) {
            console.error("찜 목록 조회 실패:", error);
        }
    }

    // 로그인 페이지로 이동
    function goToLogin() {
        const currentPage =
            window.location.pathname.split("/").pop() || "rental.html";

        const redirect = encodeURIComponent(
            currentPage + window.location.search
        );

        window.location.href = `login.html?redirect=${redirect}`;
    }

    // 찜 버튼 상태 표시
    function updateFavoriteButton(button, isFavorite) {
        button.textContent = isFavorite ? "♥ 찜 완료" : "♡ 찜하기";
        button.setAttribute("aria-pressed", String(isFavorite));
        button.setAttribute(
            "aria-label",
            isFavorite ? "관심 작품에서 제거" : "관심 작품에 추가"
        );
    }

    // 찜 추가 및 삭제
    async function toggleFavorite(artwork, button) {
        const client = window.supabaseClient;
        const artworkId = getArtworkId(artwork);

        if (!client) {
            alert("로그인 서비스를 불러오지 못했습니다.");
            return;
        }

        if (!currentUser) {
            goToLogin();
            return;
        }

        if (!artworkId) {
            alert("작품 ID를 확인할 수 없습니다.");
            return;
        }

        if (button.disabled) return;

        button.disabled = true;

        try {
            const isFavorite = favorites.has(artworkId);

            if (isFavorite) {
                const { error } = await client
                    .from(FAVORITES_TABLE)
                    .delete()
                    .eq("user_id", currentUser.id)
                    .eq("artwork_id", artworkId);

                if (error) throw error;

                favorites.delete(artworkId);
                updateFavoriteButton(button, false);
            } else {
                const { error } = await client
                    .from(FAVORITES_TABLE)
                    .insert({
                        user_id: currentUser.id,
                        artwork_id: artworkId
                    });

                if (error) throw error;

                favorites.add(artworkId);
                updateFavoriteButton(button, true);
            }
        } catch (error) {
            console.error("찜 처리 실패:", error);
            alert("찜 처리에 실패했습니다. 다시 시도해 주세요.");
        } finally {
            button.disabled = false;
        }
    }

    // 장바구니 데이터 읽기
    function readCart() {
        try {
            const cart = JSON.parse(
                localStorage.getItem(CART_KEY) || "[]"
            );

            return Array.isArray(cart) ? cart : [];
        } catch (error) {
            console.error("장바구니 데이터 읽기 실패:", error);
            return [];
        }
    }

    // 장바구니에 작품 추가
    function addToCart(artwork, button) {
        const artworkId = getArtworkId(artwork);

        if (!artworkId) {
            alert("작품 ID를 확인할 수 없습니다.");
            return;
        }

        const price = Number(artwork.rental_price_per_day_krw);

        if (
            artwork.rental_price_per_day_krw === null ||
            artwork.rental_price_per_day_krw === undefined ||
            artwork.rental_price_per_day_krw === "" ||
            !Number.isFinite(price) ||
            price < 0
        ) {
            alert("이 작품의 대여료를 확인할 수 없습니다.");
            return;
        }

        try {
            const cart = readCart();

            // 동일 작품의 1일 대여 항목이 있으면 수량 증가
            const existingItem = cart.find((item) =>
                String(item.id) === artworkId &&
                item.action === "rent" &&
                Number(item.option) === 1
            );

            if (existingItem) {
                existingItem.quantity = Math.min(
                    99,
                    Number(existingItem.quantity || 1) + 1
                );

                existingItem.totalPrice =
                    Number(existingItem.unitPrice || price) *
                    existingItem.quantity;
            } else {
                cart.push({
                    id: artworkId,
                    title: artwork.title_ko || "작품명 미등록",
                    artist: artwork.artist || "작가 미상",
                    image: getCartImage(artwork),
                    action: "rent",
                    option: 1,
                    unitPrice: price,
                    quantity: 1,
                    totalPrice: price
                });
            }

            localStorage.setItem(CART_KEY, JSON.stringify(cart));

            button.textContent = "담기 완료";
            alert("작품을 장바구니에 담았습니다.");

            // 잠시 후 버튼 원래 문구로 복구
            window.setTimeout(() => {
                button.textContent = "장바구니 담기";
            }, 1500);
        } catch (error) {
            console.error("장바구니 저장 실패:", error);
            alert("장바구니에 담지 못했습니다. 다시 시도해 주세요.");
        }
    }

    // 작품 카드 생성
    function createArtworkCard(artwork) {
        const imagePath = getImagePath(artwork.image_filename);
        const title = artwork.title_ko || "작품명 미등록";
        const category = getCategory(artwork);
        const artworkId = getArtworkId(artwork);

        const card = document.createElement("article");
        card.className = "rental-artwork-card";

        card.innerHTML = `
            <div class="rental-artwork-image-wrap">
                ${imagePath
                ? `
                            <img
                                class="rental-artwork-image"
                                src="${escapeHTML(imagePath)}"
                                alt="${escapeHTML(title)}"
                                loading="lazy"
                            >
                        `
                : `
                            <div class="rental-artwork-image-placeholder">
                                이미지 준비 중
                            </div>
                        `
            }
            </div>

            <div class="rental-artwork-info">
                <p class="rental-artwork-theme">
                    ${escapeHTML(category)}
                </p>

                <h3 class="rental-artwork-title">
                    ${escapeHTML(title)}
                </h3>

                ${artwork.title_en
                ? `
                            <p class="rental-artwork-title-en">
                                ${escapeHTML(artwork.title_en)}
                            </p>
                        `
                : ""
            }

                <p class="rental-artwork-artist">
                    ${escapeHTML(artwork.artist || "작가 미상")}
                </p>

                ${artwork.created_year
                ? `
                            <p class="rental-artwork-year">
                                ${escapeHTML(artwork.created_year)}년
                            </p>
                        `
                : ""
            }

                <div class="rental-artwork-price">
                    <p>
                        <span>1일 대여료</span>
                        <strong>
                            ${escapeHTML(
                formatPrice(artwork.rental_price_per_day_krw)
            )}
                        </strong>
                    </p>
                </div>

                <div class="rental-artwork-actions">
                    <button
                        type="button"
                        class="rental-favorite-btn"
                        aria-pressed="false"
                        aria-label="관심 작품에 추가"
                        ${artworkId ? "" : "disabled"}
                    >♡ 찜하기</button>

                    <button
                        type="button"
                        class="rental-cart-btn"
                        ${artworkId ? "" : "disabled"}
                    >장바구니 담기</button>
                </div>
            </div>
        `;

        const image = card.querySelector(".rental-artwork-image");

        if (image) {
            image.addEventListener("error", () => {
                const placeholder = document.createElement("div");
                placeholder.className =
                    "rental-artwork-image-placeholder";
                placeholder.textContent = "이미지를 불러올 수 없습니다.";
                image.replaceWith(placeholder);
            }, { once: true });
        }

        const favoriteButton = card.querySelector(
            ".rental-favorite-btn"
        );

        const cartButton = card.querySelector(".rental-cart-btn");

        updateFavoriteButton(
            favoriteButton,
            favorites.has(artworkId)
        );

        favoriteButton.addEventListener("click", () => {
            toggleFavorite(artwork, favoriteButton);
        });

        cartButton.addEventListener("click", () => {
            addToCart(artwork, cartButton);
        });

        return card;
    }

    // 작품 정렬
    function sortArtworks(artworks) {
        const sortValue = rentalSort?.value || "default";
        const sorted = [...artworks];

        switch (sortValue) {
            case "title":
                sorted.sort((a, b) =>
                    String(a.title_ko || "").localeCompare(
                        String(b.title_ko || ""),
                        "ko"
                    )
                );
                break;

            case "price-asc":
                sorted.sort((a, b) => {
                    const priceA =
                        a.rental_price_per_day_krw == null
                            ? Infinity
                            : Number(a.rental_price_per_day_krw);

                    const priceB =
                        b.rental_price_per_day_krw == null
                            ? Infinity
                            : Number(b.rental_price_per_day_krw);

                    return priceA - priceB;
                });
                break;

            case "price-desc":
                sorted.sort((a, b) => {
                    const priceA =
                        a.rental_price_per_day_krw == null
                            ? -Infinity
                            : Number(a.rental_price_per_day_krw);

                    const priceB =
                        b.rental_price_per_day_krw == null
                            ? -Infinity
                            : Number(b.rental_price_per_day_krw);

                    return priceB - priceA;
                });
                break;

            default:
                break;
        }

        return sorted;
    }

    // 화면 렌더링
    function renderArtworks() {
        if (!rentalList) return;

        let filtered = [...allArtworks];

        if (currentTheme !== "all") {
            filtered = filtered.filter(
                (artwork) => getCategory(artwork) === currentTheme
            );
        }

        filtered = sortArtworks(filtered);
        rentalList.innerHTML = "";

        if (rentalCount) {
            rentalCount.textContent = `${filtered.length}개 작품`;
        }

        if (rentalEmpty) {
            rentalEmpty.hidden = filtered.length !== 0;
        }

        if (rentalError) {
            rentalError.hidden = true;
        }

        if (filtered.length === 0) return;

        const fragment = document.createDocumentFragment();

        filtered.forEach((artwork) => {
            fragment.appendChild(createArtworkCard(artwork));
        });

        rentalList.appendChild(fragment);
    }

    // 카테고리 버튼
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            currentTheme = button.dataset.theme || "all";

            filterButtons.forEach((item) => {
                const isActive = item === button;

                item.classList.toggle("active", isActive);
                item.setAttribute("aria-pressed", String(isActive));
            });

            renderArtworks();
        });
    });

    // 정렬 선택
    if (rentalSort) {
        rentalSort.addEventListener("change", renderArtworks);
    }

    // 전체 작품 보기
    if (rentalReset) {
        rentalReset.addEventListener("click", () => {
            currentTheme = "all";

            filterButtons.forEach((button) => {
                const isAll = button.dataset.theme === "all";

                button.classList.toggle("active", isAll);
                button.setAttribute("aria-pressed", String(isAll));
            });

            if (rentalSort) {
                rentalSort.value = "default";
            }

            renderArtworks();
        });
    }

    // Supabase 작품 조회
    async function loadArtworks() {
        if (!window.supabaseClient) {
            showError("Supabase 연결을 확인해 주세요.");
            return;
        }

        if (rentalError) rentalError.hidden = true;
        if (rentalEmpty) rentalEmpty.hidden = true;

        if (rentalList) {
            rentalList.innerHTML = `
                <p class="rental-loading">
                    작품 정보를 불러오는 중입니다.
                </p>
            `;
        }

        try {
            // 세션 및 찜 목록 조회
            await loadFavoriteState();

            const { data, error } = await window.supabaseClient
                .from("MYTHOS_ART")
                .select("*")
                .eq("available_for_rent", true);

            if (error) throw error;

            allArtworks = data || [];
            renderArtworks();
        } catch (error) {
            console.error("대여 작품 조회 실패:", error);

            showError(
                "작품 정보를 불러오지 못했습니다. 다시 시도해 주세요."
            );
        }
    }

    // 오류 표시
    function showError(message) {
        if (rentalList) {
            rentalList.innerHTML = "";
        }

        if (rentalCount) {
            rentalCount.textContent = "조회 실패";
        }

        if (rentalEmpty) {
            rentalEmpty.hidden = true;
        }

        if (rentalError) {
            rentalError.hidden = false;

            const messageElement = rentalError.querySelector("p");

            if (messageElement) {
                messageElement.textContent = message;
            }
        } else if (rentalList) {
            rentalList.innerHTML = `
                <p class="rental-error">${escapeHTML(message)}</p>
            `;
        }
    }

    // 다시 시도하기
    if (rentalRetry) {
        rentalRetry.addEventListener("click", loadArtworks);
    }

    // 최초 실행
    loadArtworks();
});
