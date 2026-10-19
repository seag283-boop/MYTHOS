document.addEventListener("DOMContentLoaded", async () => {
    const buttons = document.querySelectorAll(".btn-favorite");
    const TABLE_NAME = "MYTHOS_FAVORITES";
    const client = window.supabaseClient;

    if (!buttons.length) return;

    function getArtworkId(button) {
        const card = button.closest(".artwork-card");
        const link = card?.querySelector(".artwork-image-link");

        if (!link) return null;

        return new URL(link.href, window.location.href)
            .searchParams.get("id");
    }

    function updateButton(button, isFavorite) {
        button.textContent = isFavorite ? "♥" : "♡";
        button.setAttribute("aria-pressed", String(isFavorite));
        button.setAttribute(
            "aria-label",
            isFavorite ? "관심 작품에서 제거" : "관심 작품에 추가"
        );
    }

    if (!client) {
        console.error("Supabase 클라이언트가 연결되지 않았습니다.");
        return;
    }

    // 로그인 상태 확인
    const {
        data: { session },
        error: authError
    } = await client.auth.getSession();

    if (authError) {
        console.error("로그인 상태 확인 실패:", authError);
        return;
    }

    const user = session?.user ?? null;

    // 로그인하지 않은 경우
    if (!user) {
        buttons.forEach((button) => {
            updateButton(button, false);

            button.addEventListener("click", () => {
                const currentPage =
                    window.location.pathname.split("/").pop() || "index.html";

                const redirect = encodeURIComponent(
                    currentPage + window.location.search
                );

                window.location.href = `login.html?redirect=${redirect}`;
            });
        });

        return;
    }

    // 로그인한 사용자의 찜 목록 조회
    const { data, error } = await client
        .from(TABLE_NAME)
        .select("artwork_id")
        .eq("user_id", user.id);

    if (error) {
        console.error("찜 목록 조회 실패:", error);
        return;
    }

    const favorites = new Set(
        (data || []).map((item) => item.artwork_id)
    );

    // 찜 버튼 초기화 및 추가/삭제 처리
    buttons.forEach((button) => {
        const artworkId = getArtworkId(button);

        if (!artworkId) return;

        updateButton(button, favorites.has(artworkId));

        button.addEventListener("click", async () => {
            if (button.disabled) return;

            button.disabled = true;

            try {
                if (favorites.has(artworkId)) {
                    // 찜 삭제
                    const { error } = await client
                        .from(TABLE_NAME)
                        .delete()
                        .eq("user_id", user.id)
                        .eq("artwork_id", artworkId);

                    if (error) throw error;

                    favorites.delete(artworkId);
                    updateButton(button, false);
                } else {
                    // 찜 추가
                    const { error } = await client
                        .from(TABLE_NAME)
                        .insert({
                            user_id: user.id,
                            artwork_id: artworkId
                        });

                    if (error) throw error;

                    favorites.add(artworkId);
                    updateButton(button, true);
                }
            } catch (error) {
                console.error("찜 기능 오류:", error);
                alert("찜 처리에 실패했습니다. 다시 시도해 주세요.");
            } finally {
                button.disabled = false;
            }
        });
    });
});