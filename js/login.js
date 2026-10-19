
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#login-form");
    const message = document.querySelector("#login-message");

    if (!form || !message) {
        console.error("로그인 폼을 찾을 수 없습니다.");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const button = form.querySelector('button[type="submit"]');
        const email = form.querySelector('[name="email"]').value.trim();
        const password = form.querySelector('[name="password"]').value;

        if (!window.supabaseClient) {
            message.textContent = "Supabase 연결 실패. 설정을 확인해 주세요.";
            console.error("window.supabaseClient가 없습니다.");
            return;
        }

        button.disabled = true;
        message.textContent = "로그인 중입니다.";

        try {
            const { data, error } =
                await window.supabaseClient.auth.signInWithPassword({
                    email,
                    password
                });

            if (error) throw error;

            if (!data.user) {
                throw new Error("사용자 정보를 확인할 수 없습니다.");
            }

            message.textContent = "로그인 성공!";

            const params = new URLSearchParams(window.location.search);
            const redirect = params.get("redirect");
            const allowedPages = [
                "index.html",
                "favorites.html",
                "detail.html"
            ];

            if (redirect) {
                const target = redirect.split("?")[0];

                if (allowedPages.includes(target)) {
                    window.location.replace(redirect);
                    return;
                }
            }

            window.location.replace("index.html");
        } catch (error) {
            console.error("로그인 오류:", error);

            if (error.message === "Invalid login credentials") {
                message.textContent = "이메일 또는 비밀번호가 올바르지 않습니다.";
            } else if (error.message.includes("Email not confirmed")) {
                message.textContent = "이메일 인증을 먼저 완료해 주세요.";
            } else {
                message.textContent = "로그인 실패: " + error.message;
            }
        } finally {
            button.disabled = false;
        }
    });
});
