// ========================================
// COMMUNITY PAGE
// 게시글 / 검색 / 카테고리 / 댓글
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    const postList = document.querySelector("#post-list");
    const postCount = document.querySelector("#post-count");
    const postSearch = document.querySelector("#post-search");
    const searchButton = document.querySelector("#search-button");

    const tabs = document.querySelectorAll(".category-tabs .tab");

    const postModal = document.querySelector("#post-modal");
    const modalPanel = postModal?.querySelector(".modal-panel");
    const modalClose = postModal?.querySelector(".modal-close");
    const modalBackdrop = postModal?.querySelector(".modal-backdrop");

    const postForm = document.querySelector("#post-form");
    const postCategory = document.querySelector("#post-category");
    const postAuthor = document.querySelector("#post-author");
    const postTitle = document.querySelector("#post-title");
    const postContent = document.querySelector("#post-content");

    const postDetail = document.querySelector("#post-detail");
    const detailCategory = document.querySelector("#detail-category");
    const detailDate = document.querySelector("#detail-date");
    const detailTitle = document.querySelector("#detail-title");
    const detailAuthor = document.querySelector("#detail-author");
    const detailContent = document.querySelector("#detail-content");

    const commentCount = document.querySelector("#comment-count");
    const commentList = document.querySelector("#comment-list");
    const commentForm = document.querySelector("#comment-form");
    const commentAuthor = document.querySelector("#comment-author");
    const commentContent = document.querySelector("#comment-content");

    const modalMessage = document.querySelector("#modal-message");
    const boardNotice = document.querySelector(".board-notice");
    const emptyState = document.querySelector(".empty-state");

    // Supabase 클라이언트는 supabase.js에서 초기화되어 있어야 함.
    const supabaseClient =
        window.supabaseClient ||
        window.supabase;

    const POST_TABLE = "community_posts";
    const COMMENT_TABLE = "community_comments";

    let posts = [];
    let activeCategory = "전체";
    let searchKeyword = "";
    let selectedPost = null;
    let modalMode = "write";
    let isSubmitting = false;

    const categories = [
        "전체",
        "작품 감상",
        "신화 이야기",
        "전시와 문화",
        "자유 이야기"
    ];

    // ========================================
    // UTILITIES
    // ========================================

    function escapeHTML(value = "") {
        return String(value).replace(/[&<>"']/g, (character) => {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            };

            return entities[character];
        });
    }

    function formatDate(value) {
        if (!value) return "";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "";
        }

        return new Intl.DateTimeFormat("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).format(date);
    }

    function setNotice(message = "") {
        if (boardNotice) {
            boardNotice.textContent = message;
        }
    }

    function setModalMessage(message = "") {
        if (modalMessage) {
            modalMessage.textContent = message;
        }
    }

    function getErrorMessage(error) {
        return error?.message || "요청을 처리하지 못했습니다.";
    }

    function getPostId(post) {
        return post?.id ?? post?.post_id;
    }

    function getPostCategory(post) {
        return post?.category || "자유 이야기";
    }

    function getPostAuthor(post) {
        return post?.author || post?.nickname || "익명";
    }

    function getPostTitle(post) {
        return post?.title || "제목 없음";
    }

    function getPostContent(post) {
        return post?.content || "";
    }

    function getPostDate(post) {
        return post?.created_at || post?.createdAt || "";
    }

    function getCommentCount(post) {
        return Number(post?.comment_count ?? post?.comments_count ?? 0);
    }

    function requireSupabase() {
        if (!supabaseClient || typeof supabaseClient.from !== "function") {
            setNotice(
                "Supabase 연결을 확인해 주세요. js/supabase.js의 클라이언트 설정이 필요합니다."
            );

            return false;
        }

        return true;
    }

    // ========================================
    // MODAL
    // ========================================

    function openModal(mode = "write") {
        if (!postModal) return;

        modalMode = mode;

        postModal.hidden = false;
        document.body.style.overflow = "hidden";

        setModalMessage("");

        if (mode === "write") {
            if (postForm) {
                postForm.hidden = false;
            }

            if (postDetail) {
                postDetail.hidden = true;
            }

            const heading = postModal.querySelector(".modal-panel > h2");

            if (heading) {
                heading.textContent = "새로운 이야기";
            }

            if (postForm) {
                postForm.reset();
            }

            if (postCategory) {
                postCategory.value = "작품 감상";
            }

            setTimeout(() => postTitle?.focus(), 50);
        }
    }

    function closeModal() {
        if (!postModal) return;

        postModal.hidden = true;
        document.body.style.overflow = "";

        selectedPost = null;
        setModalMessage("");
    }

    modalClose?.addEventListener("click", closeModal);
    modalBackdrop?.addEventListener("click", closeModal);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && postModal && !postModal.hidden) {
            closeModal();
        }
    });

    // ========================================
    // LOAD POSTS
    // ========================================

    async function loadPosts() {
        if (!requireSupabase()) {
            renderPosts();
            return;
        }

        if (postList) {
            postList.innerHTML = `
                <p class="loading">이야기를 불러오는 중입니다.</p>
            `;
        }

        try {
            const { data, error } = await supabaseClient
                .from(POST_TABLE)
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;

            posts = Array.isArray(data) ? data : [];

            await loadCommentCounts();
            renderPosts();
            setNotice("");
        } catch (error) {
            console.error("게시글 조회 오류:", error);

            if (postList) {
                postList.innerHTML = `
                    <p class="loading">
                        게시글을 불러오지 못했습니다.
                    </p>
                `;
            }

            setNotice(
                "게시글 조회에 실패했습니다. 테이블 이름과 Supabase 정책을 확인해 주세요."
            );
        }
    }

    async function loadCommentCounts() {
        if (!posts.length || !supabaseClient) return;

        const postIds = posts
            .map((post) => getPostId(post))
            .filter((id) => id !== undefined && id !== null);

        if (!postIds.length) return;

        try {
            const { data, error } = await supabaseClient
                .from(COMMENT_TABLE)
                .select("post_id")
                .in("post_id", postIds);

            if (error) throw error;

            const counts = {};

            (data || []).forEach((comment) => {
                const id = comment.post_id;
                counts[id] = (counts[id] || 0) + 1;
            });

            posts = posts.map((post) => ({
                ...post,
                comment_count: counts[getPostId(post)] || 0
            }));
        } catch (error) {
            // 댓글 테이블이 아직 없으면 게시글 표시를 계속 진행.
            console.warn("댓글 수 조회를 건너뜁니다:", error.message);
        }
    }

    // ========================================
    // FILTER & SEARCH
    // ========================================

    function getFilteredPosts() {
        return posts.filter((post) => {
            const category = getPostCategory(post);

            const matchesCategory =
                activeCategory === "전체" ||
                category === activeCategory;

            const keyword = searchKeyword.trim().toLowerCase();

            const searchableText = [
                getPostTitle(post),
                getPostContent(post),
                getPostAuthor(post),
                category
            ].join(" ").toLowerCase();

            const matchesSearch =
                !keyword || searchableText.includes(keyword);

            return matchesCategory && matchesSearch;
        });
    }

    function renderPosts() {
        if (!postList) return;

        const filteredPosts = getFilteredPosts();

        if (postCount) {
            postCount.textContent = filteredPosts.length;
        }

        if (!filteredPosts.length) {
            postList.innerHTML = "";

            if (emptyState) {
                emptyState.hidden = false;
            } else {
                postList.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-symbol">✦</div>
                        <h3>아직 이야기가 없습니다.</h3>
                        <p>첫 번째 이야기를 남겨보세요.</p>
                    </div>
                `;
            }

            return;
        }

        if (emptyState) {
            emptyState.hidden = true;
        }

        postList.innerHTML = filteredPosts
            .map((post, index) => {
                const id = getPostId(post);
                const category = getPostCategory(post);
                const title = getPostTitle(post);
                const content = getPostContent(post);
                const author = getPostAuthor(post);
                const date = formatDate(getPostDate(post));
                const comments = getCommentCount(post);

                const excerpt = content.length > 100
                    ? `${content.slice(0, 100)}...`
                    : content;

                return `
                    <article class="post-row">
                        <div class="post-number">
                            ${String(filteredPosts.length - index).padStart(2, "0")}
                        </div>

                        <div class="post-main">
                            <span class="post-category">
                                ${escapeHTML(category)}
                            </span>

                            <button
                                type="button"
                                class="post-title"
                                data-post-id="${escapeHTML(id ?? "")}"
                            >
                                ${escapeHTML(title)}
                            </button>

                            <p class="post-excerpt">
                                ${escapeHTML(excerpt)}
                            </p>

                            <div class="post-byline">
                                <span>${escapeHTML(author)}</span>
                                <span>${escapeHTML(date)}</span>
                            </div>
                        </div>

                        <div class="post-stats">
                            <span>댓글 ${comments}</span>
                        </div>
                    </article>
                `;
            })
            .join("");
    }

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((item) => item.classList.remove("active"));

            tab.classList.add("active");
            activeCategory = tab.dataset.category || tab.textContent.trim();

            renderPosts();
        });
    });

    function runSearch() {
        searchKeyword = postSearch?.value.trim() || "";
        renderPosts();
    }

    searchButton?.addEventListener("click", runSearch);

    postSearch?.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            runSearch();
        }
    });

    postSearch?.addEventListener("input", () => {
        if (!postSearch.value.trim()) {
            searchKeyword = "";
            renderPosts();
        }
    });

    // ========================================
    // CREATE POST
    // ========================================

    async function createPost() {
        if (!requireSupabase() || isSubmitting) return;

        const category = postCategory?.value.trim() || "자유 이야기";
        const author = postAuthor?.value.trim() || "익명";
        const title = postTitle?.value.trim() || "";
        const content = postContent?.value.trim() || "";

        if (!title || !content) {
            setModalMessage("제목과 내용을 모두 입력해 주세요.");
            return;
        }

        if (!categories.includes(category)) {
            setModalMessage("올바른 카테고리를 선택해 주세요.");
            return;
        }

        isSubmitting = true;
        setModalMessage("게시글을 등록하고 있습니다.");

        const submitButton = postForm?.querySelector(".submit-button");

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "등록 중...";
        }

        try {
            const { data, error } = await supabaseClient
                .from(POST_TABLE)
                .insert([
                    {
                        category,
                        author,
                        title,
                        content
                    }
                ])
                .select()
                .single();

            if (error) throw error;

            closeModal();

            await loadPosts();

            if (data) {
                await openPostDetail(getPostId(data));
            }

            setNotice("게시글이 등록되었습니다.");
        } catch (error) {
            console.error("게시글 등록 오류:", error);

            setModalMessage(
                `등록에 실패했습니다. ${getErrorMessage(error)}`
            );
        } finally {
            isSubmitting = false;

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "등록하기";
            }
        }
    }

    postForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        await createPost();
    });

    // ========================================
    // POST DETAIL
    // ========================================

    async function openPostDetail(postId) {
        const post = posts.find(
            (item) => String(getPostId(item)) === String(postId)
        );

        if (!post || !postModal) return;

        selectedPost = post;
        modalMode = "detail";

        if (postForm) {
            postForm.hidden = true;
        }

        if (postDetail) {
            postDetail.hidden = false;
        }

        const heading = postModal.querySelector(".modal-panel > h2");

        if (heading) {
            heading.textContent = "이야기 자세히 보기";
        }

        if (detailCategory) {
            detailCategory.textContent = getPostCategory(post);
        }

        if (detailDate) {
            detailDate.textContent = formatDate(getPostDate(post));
        }

        if (detailTitle) {
            detailTitle.textContent = getPostTitle(post);
        }

        if (detailAuthor) {
            detailAuthor.textContent = `작성자 ${getPostAuthor(post)}`;
        }

        if (detailContent) {
            detailContent.textContent = getPostContent(post);
        }

        postModal.hidden = false;
        document.body.style.overflow = "hidden";

        setModalMessage("");

        await loadComments(getPostId(post));
    }

    postList?.addEventListener("click", (event) => {
        const titleButton = event.target.closest("[data-post-id]");

        if (!titleButton) return;

        openPostDetail(titleButton.dataset.postId);
    });

    // ========================================
    // LOAD COMMENTS
    // ========================================

    async function loadComments(postId) {
        if (!commentList || !commentCount) return;

        commentList.innerHTML = `
            <p class="loading">댓글을 불러오는 중입니다.</p>
        `;

        if (!requireSupabase()) return;

        try {
            const { data, error } = await supabaseClient
                .from(COMMENT_TABLE)
                .select("*")
                .eq("post_id", postId)
                .order("created_at", { ascending: true });

            if (error) throw error;

            const comments = data || [];

            commentCount.textContent = comments.length;

            if (!comments.length) {
                commentList.innerHTML = `
                    <p class="loading">
                        아직 댓글이 없습니다. 첫 댓글을 남겨보세요.
                    </p>
                `;
                return;
            }

            commentList.innerHTML = comments
                .map((comment) => {
                    const author =
                        comment.author ||
                        comment.nickname ||
                        "익명";

                    const date = formatDate(comment.created_at);

                    return `
                        <article class="comment">
                            <strong>${escapeHTML(author)}</strong>
                            <time>${escapeHTML(date)}</time>
                            <p>${escapeHTML(comment.content || "")}</p>
                        </article>
                    `;
                })
                .join("");
        } catch (error) {
            console.error("댓글 조회 오류:", error);

            commentCount.textContent = "0";

            commentList.innerHTML = `
                <p class="loading">
                    댓글을 불러오지 못했습니다.
                    댓글 테이블과 접근 정책을 확인해 주세요.
                </p>
            `;
        }
    }

    // ========================================
    // CREATE COMMENT
    // ========================================

    async function createComment() {
        if (!selectedPost || !requireSupabase() || isSubmitting) {
            return;
        }

        const author = commentAuthor?.value.trim() || "익명";
        const content = commentContent?.value.trim() || "";

        if (!content) {
            setModalMessage("댓글 내용을 입력해 주세요.");
            commentContent?.focus();
            return;
        }

        isSubmitting = true;

        const submitButton = document.querySelector("#submit-comment");

        if (submitButton) {
            submitButton.disabled = true;
        }

        setModalMessage("댓글을 등록하고 있습니다.");

        try {
            const { error } = await supabaseClient
                .from(COMMENT_TABLE)
                .insert([
                    {
                        post_id: getPostId(selectedPost),
                        author,
                        content
                    }
                ]);

            if (error) throw error;

            if (commentForm) {
                commentForm.reset();
            }

            await loadComments(getPostId(selectedPost));
            await loadPosts();

            setModalMessage("댓글이 등록되었습니다.");
        } catch (error) {
            console.error("댓글 등록 오류:", error);

            setModalMessage(
                `댓글 등록에 실패했습니다. ${getErrorMessage(error)}`
            );
        } finally {
            isSubmitting = false;

            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    }

    commentForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        await createComment();
    });

    // ========================================
    // OPEN WRITE MODAL
    // ========================================

    // HTML의 글쓰기 버튼에 공통으로 적용.
    document.querySelectorAll(
        "#open-write, .write-button, [data-open-write]"
    ).forEach((button) => {
        button.addEventListener("click", () => {
            openModal("write");
        });
    });

    // ========================================
    // INITIALIZE
    // ========================================

    loadPosts();
});