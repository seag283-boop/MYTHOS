document.addEventListener("DOMContentLoaded", () => {
    const artworkList = document.querySelector("#artwork-list");
    const artworkCount = document.querySelector("#artwork-count");
    const artworkEmpty = document.querySelector("#artwork-empty");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const sortSelect = document.querySelector("#artwork-sort");
    const resetButton = document.querySelector("#reset-filter");

    let allArtworks = [];
    let currentTheme = "all";

    // 카테고리 이름
    const categories = [
        "신과 여신",
        "영웅과 전설",
        "사랑과 비극",
        "괴물과 환상",
        "자연과 세계"
    ];

    // 기존 데이터의 theme 값과 새 카테고리 연결
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

    // 작품 이미지 경로
    function getImagePath(filename) {
        if (!filename) {
            return "";
        }

        const cleanedFilename = String(filename)
            .replace(/\\/g, "/")
            .replace(/^\/+/, "")
            .replace(/^image\//i, "");

        return `image/${cleanedFilename}`;
    }

    // HTML에 문자열을 안전하게 표시하기 위한 처리
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

    // 숫자 가격을 원화로 표시
    function formatPrice(price) {
        const number = Number(price);

        if (price === null || price === undefined || price === "" ||
            !Number.isFinite(number)) {
            return "가격 문의";
        }

        return `${number.toLocaleString("ko-KR")}원`;
    }

    // 기존 theme 값을 새 카테고리로 변환
    function getCategory(artwork) {
        const theme = String(artwork.theme ?? "").trim();

        if (themeAliases[theme]) {
            return themeAliases[theme];
        }

        // 기존 theme 값이 없는 작품은 작품 정보를 바탕으로 분류
        const text = [
            artwork.title_ko,
            artwork.title_en,
            artwork.myth_subject,
            artwork.description
        ].filter(Boolean).join(" ").toLowerCase();

        const keywordGroups = [
            {
                category: "괴물과 환상",
                keywords: [
                    "메두사", "미노타우로스", "키메라", "케르베로스",
                    "페가수스", "히드라", "사이클롭스", "괴물",
                    "monster", "medusa", "minotaur", "hydra"
                ]
            },
            {
                category: "사랑과 비극",
                keywords: [
                    "에로스", "프시케", "오르페우스", "에우리디케",
                    "아프로디테", "아도니스", "나르키소스",
                    "사랑", "비극", "eros", "psyche", "orpheus"
                ]
            },
            {
                category: "영웅과 전설",
                keywords: [
                    "헤라클레스", "페르세우스", "테세우스", "아킬레우스",
                    "오디세우스", "이아손", "프로메테우스",
                    "영웅", "모험", "hercules", "perseus", "achilles"
                ]
            },
            {
                category: "자연과 세계",
                keywords: [
                    "가이아", "데메테르", "포세이돈", "하데스",
                    "대지", "바다", "계절", "세계", "자연",
                    "gaia", "demeter", "poseidon", "hades"
                ]
            },
            {
                category: "신과 여신",
                keywords: [
                    "제우스", "헤라", "아테나", "아폴론", "아르테미스",
                    "아레스", "헤파이스토스", "헤르메스", "디오니소스",
                    "올림포스", "신", "여신", "zeus", "hera", "athena",
                    "apollo", "olympus"
                ]
            }
        ];

        for (const group of keywordGroups) {
            if (group.keywords.some((keyword) => text.includes(keyword.toLowerCase()))) {
                return group.category;
            }
        }

        return theme || "기타";
    }

    // 작품 카드 생성
    function createArtworkCard(artwork) {
        const imagePath = getImagePath(artwork.image_filename);
        const title = artwork.title_ko || "작품명 미등록";
        const englishTitle = artwork.title_en || "";
        const artist = artwork.artist || "작가 미상";
        const category = getCategory(artwork);
        const year = artwork.created_year;

        const rentalPrice = formatPrice(
            artwork.rental_price_per_day_krw
        );

        const purchasePrice = formatPrice(
            artwork.purchase_price_krw
        );

        const card = document.createElement("article");
        card.className = "artwork-card";

        card.innerHTML = `
            <div class="artwork-image-wrap">
                ${imagePath
                ? `
                            <img
                                class="artwork-image"
                                src="${escapeHTML(imagePath)}"
                                alt="${escapeHTML(title)}"
                                loading="lazy"
                            >
                        `
                : `
                            <div class="artwork-image-placeholder">
                                이미지 준비 중
                            </div>
                        `
            }
            </div>

            <div class="artwork-info">
                <p class="artwork-theme">
                    ${escapeHTML(category)}
                </p>

                <h3 class="artwork-title">
                    ${escapeHTML(title)}
                </h3>

                ${englishTitle
                ? `
                            <p class="artwork-title-en">
                                ${escapeHTML(englishTitle)}
                            </p>
                        `
                : ""
            }

                <p class="artwork-artist">
                    ${escapeHTML(artist)}
                </p>

                ${year
                ? `
                            <p class="artwork-year">
                                ${escapeHTML(year)}년
                            </p>
                        `
                : ""
            }

                <div class="artwork-price">
                    ${artwork.available_for_rent
                ? `
                                <p>
                                    <span>대여</span>
                                    <strong>${escapeHTML(rentalPrice)}</strong>
                                    <small>/ 1일</small>
                                </p>
                            `
                : ""
            }

                    ${artwork.available_for_purchase
                ? `
                                <p>
                                    <span>구매</span>
                                    <strong>${escapeHTML(purchasePrice)}</strong>
                                </p>
                            `
                : ""
            }
                </div>
            </div>
        `;

        const image = card.querySelector(".artwork-image");

        if (image) {
            image.addEventListener("error", () => {
                const placeholder = document.createElement("div");
                placeholder.className = "artwork-image-placeholder";
                placeholder.textContent = "이미지를 불러올 수 없습니다.";
                image.replaceWith(placeholder);
            }, { once: true });
        }

        return card;
    }

    // 정렬 적용
    function sortArtworks(artworks) {
        const sortValue = sortSelect?.value || "default";
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

            case "year-asc":
                sorted.sort((a, b) => {
                    const yearA = Number(a.created_year) || Infinity;
                    const yearB = Number(b.created_year) || Infinity;
                    return yearA - yearB;
                });
                break;

            case "year-desc":
                sorted.sort((a, b) => {
                    const yearA = Number(a.created_year) || -Infinity;
                    const yearB = Number(b.created_year) || -Infinity;
                    return yearB - yearA;
                });
                break;

            case "rental-price-asc":
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

            case "price-asc":
                sorted.sort((a, b) => {
                    const priceA =
                        a.purchase_price_krw == null
                            ? Infinity
                            : Number(a.purchase_price_krw);

                    const priceB =
                        b.purchase_price_krw == null
                            ? Infinity
                            : Number(b.purchase_price_krw);

                    return priceA - priceB;
                });
                break;

            case "price-desc":
                sorted.sort((a, b) => {
                    const priceA =
                        a.purchase_price_krw == null
                            ? -Infinity
                            : Number(a.purchase_price_krw);

                    const priceB =
                        b.purchase_price_krw == null
                            ? -Infinity
                            : Number(b.purchase_price_krw);

                    return priceB - priceA;
                });
                break;

            default:
                // 기본순은 Supabase에서 받아온 순서 유지
                break;
        }

        return sorted;
    }

    // 필터링 후 화면 업데이트
    function renderArtworks() {
        if (!artworkList) {
            return;
        }

        let filtered = [...allArtworks];

        // 카테고리 필터
        if (currentTheme !== "all") {
            filtered = filtered.filter(
                (artwork) => getCategory(artwork) === currentTheme
            );
        }

        // 정렬
        filtered = sortArtworks(filtered);

        // 작품 목록 초기화
        artworkList.innerHTML = "";

        // 작품 개수 업데이트
        if (artworkCount) {
            artworkCount.textContent = `${filtered.length}개 작품`;
        }

        // 결과가 없을 때
        if (filtered.length === 0) {
            if (artworkEmpty) {
                artworkEmpty.hidden = false;
            }

            return;
        }

        if (artworkEmpty) {
            artworkEmpty.hidden = true;
        }

        // 작품 카드 출력
        const fragment = document.createDocumentFragment();

        filtered.forEach((artwork) => {
            fragment.appendChild(createArtworkCard(artwork));
        });

        artworkList.appendChild(fragment);
    }

    // 카테고리 버튼 이벤트
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            currentTheme = button.dataset.theme || "all";

            filterButtons.forEach((filterButton) => {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

            renderArtworks();
        });
    });

    // 정렬 변경 이벤트
    if (sortSelect) {
        sortSelect.addEventListener("change", renderArtworks);
    }

    // 필터 초기화 버튼
    if (resetButton) {
        resetButton.addEventListener("click", () => {
            currentTheme = "all";

            filterButtons.forEach((button) => {
                const isAll = button.dataset.theme === "all";

                button.classList.toggle("active", isAll);
                button.setAttribute("aria-pressed", String(isAll));
            });

            if (sortSelect) {
                sortSelect.value = "default";
            }

            renderArtworks();
        });
    }

    // Supabase에서 작품 목록 불러오기
    async function loadArtworks() {
        if (!window.supabaseClient) {
            console.error(
                "Supabase 연결을 확인해 주세요. js/supabase.js를 확인하세요."
            );

            if (artworkList) {
                artworkList.innerHTML = `
                    <p class="artwork-error">
                        작품 정보를 불러오지 못했습니다.
                        잠시 후 다시 시도해 주세요.
                    </p>
                `;
            }

            return;
        }

        try {
            const { data, error } = await window.supabaseClient
                .from("MYTHOS_ART")
                .select("*");

            if (error) {
                throw error;
            }

            allArtworks = data || [];
            renderArtworks();

        } catch (error) {
            console.error("작품 목록 조회 실패:", error);

            if (artworkList) {
                artworkList.innerHTML = `
                    <p class="artwork-error">
                        작품 목록을 불러오는 중 오류가 발생했습니다.
                    </p>
                `;
            }

            if (artworkCount) {
                artworkCount.textContent = "조회 실패";
            }
        }
    }

    // 최초 실행
    loadArtworks();
});