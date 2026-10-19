document.addEventListener("DOMContentLoaded", async () => {
    const message = document.querySelector("#favorites-message");
    const favoritesList = document.querySelector("#favorites-list");
    const client = window.supabaseClient;

    const FAVORITES_TABLE = "MYTHOS_FAVORITES";
    const ART_TABLE = "MYTHOS_ART";

    if (!message || !favoritesList) {
        console.error("관심 작품 페이지의 HTML 요소를 찾을 수 없습니다.");
        return;
    }

    if (!client) {
        message.textContent = "Supabase 연결에 실패했습니다.";
        return;
    }

    // 작품 ID별 이미지 경로
    const imageMap = {
        "MYTH-001": "image/artspace01.jpg",
        "MYTH-002": "image/artspace02.jpg",
        "MYTH-003": "image/artspace03.jpg",
        "MYTH-004": "image/artspace04.jpg",
        "MYTH-005": "image/artspace05.jpg",
        "MYTH-006": "image/artspace06.jpg",
        "MYTH-007": "image/artspace07.jpg",
        "MYTH-008": "image/artspace08.jpg",
        "MYTH-009": "image/artspace09.jpg",
        "MYTH-010": "image/artspace10.jpg",
        "MYTH-011": "image/artspace11.jpg",
        "MYTH-012": "image/artspace12.jpg",
        "MYTH-013": "image/artspace13.jpg",
        "MYTH-014": "image/artspace14.jpg",
        "MYTH-015": "image/artspace15.jpg",
        "MYTH-016": "image/artspace16.jpg",
        "MYTH-017": "image/artspace17.jpg",
        "MYTH-018": "image/artspace18.jpg",
        "MYTH-019": "image/artspace19.jpg",
        "MYTH-020": "image/artspace20.jpg"
    };

    // HTML 출력 시 문자열 안전 처리
    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, (char) => {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return entities[char];
        });
    }

    // 관심 작품 목록 불러오기
    async function loadFavorites() {
        message.textContent = "관심 작품을 불러오는 중입니다.";
        favoritesList.innerHTML = "";

        try {
            // 로그인 사용자 확인
            const {
                data: { user },
                error: authError
            } = await client.auth.getUser();

            if (authError) throw authError;

            if (!user) {
                message.textContent = "로그인 후 관심 작품을 확인할 수 있습니다.";
                return;
            }

            // 해당 사용자의 관심 작품 조회
            const { data: favorites, error: favoritesError } = await client
                .from(FAVORITES_TABLE)
                .select("artwork_id, created_at")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (favoritesError) throw favoritesError;

            if (!favorites || favorites.length === 0) {
                message.textContent = "아직 등록한 관심 작품이 없습니다.";
                return;
            }

            // 작품 ID 중복 제거
            const artworkIds = [
                ...new Set(
                    favorites.map((item) => String(item.artwork_id))
                )
            ];

            // 작품 정보 조회
            const { data: artworks, error: artworksError } = await client
                .from(ART_TABLE)
                .select("*")
                .in("id", artworkIds);

            if (artworksError) throw artworksError;

            const artworkMap = new Map(
                (artworks || []).map((artwork) => [
                    String(artwork.id),
                    artwork
                ])
            );

            // 관심 작품 등록 순서 유지
            const favoriteArtworks = artworkIds
                .map((id) => artworkMap.get(id))
                .filter(Boolean);

            if (favoriteArtworks.length === 0) {
                message.textContent = "관심 작품 정보를 찾을 수 없습니다.";
                return;
            }

            message.textContent = `총 ${favoriteArtworks.length}개의 관심 작품`;

            // 작품 카드 출력
            favoritesList.innerHTML = favoriteArtworks.map((artwork) => {
                const id = String(artwork.id);
                const title =
                    artwork.title_ko ||
                    artwork.title ||
                    artwork.title_en ||
                    id;

                const artist =
                    artwork.artist ||
                    artwork.artist_name ||
                    "작가 정보 없음";

                const theme =
                    artwork.theme ||
                    artwork.category ||
                    "MYTHOS COLLECTION";

                const image =
                    imageMap[id] || "image/artspace01.jpg";

                return `
                    <article class="favorite-card"
                        data-artwork-id="${escapeHTML(id)}">

                        <a class="favorite-card-link"
                            href="detail.html?id=${encodeURIComponent(id)}">

                            <div class="favorite-card-image">
                                <img
                                    src="${image}"
                                    alt="${escapeHTML(title)}"
                                    loading="lazy"
                                >
                            </div>

                            <div class="favorite-card-info">
                                <p class="favorite-card-theme">
                                    ${escapeHTML(theme)}
                                </p>

                                <h3 class="favorite-card-title">
                                    ${escapeHTML(title)}
                                </h3>

                                <p class="favorite-card-artist">
                                    ${escapeHTML(artist)}
                                </p>
                            </div>
                        </a>

                        <button
                            type="button"
                            class="favorite-remove-btn"
                            data-artwork-id="${escapeHTML(id)}">
                            관심 작품 삭제
                        </button>
                    </article>
                `;
            }).join("");

        } catch (error) {
            console.error("관심 작품 조회 오류:", error);

            message.textContent =
                "관심 작품을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.";
        }
    }

    // 관심 작품 삭제
    favoritesList.addEventListener("click", async (event) => {
        const button = event.target.closest(".favorite-remove-btn");

        if (!button) return;

        const artworkId = button.dataset.artworkId;

        if (!artworkId) return;

        button.disabled = true;

        try {
            const {
                data: { user },
                error: authError
            } = await client.auth.getUser();

            if (authError) throw authError;

            if (!user) {
                message.textContent = "로그인이 필요합니다.";
                return;
            }

            // 현재 로그인한 사용자의 해당 작품만 삭제
            const { error: deleteError } = await client
                .from(FAVORITES_TABLE)
                .delete()
                .eq("user_id", user.id)
                .eq("artwork_id", artworkId);

            if (deleteError) throw deleteError;

            message.textContent = "관심 작품에서 삭제했습니다.";

            // 삭제 후 목록 새로고침
            await loadFavorites();

        } catch (error) {
            console.error("관심 작품 삭제 오류:", error);

            message.textContent =
                "삭제에 실패했습니다. Supabase 설정을 확인해 주세요.";

            button.disabled = false;
        }
    });

    // 페이지 진입 시 실행
    await loadFavorites();
});