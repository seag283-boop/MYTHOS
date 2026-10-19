
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#signup-form");
    const message = document.querySelector("#signup-message");

    if (!form || !message) {
        alert("회원가입 폼을 찾을 수 없습니다.");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = form.querySelector('[name="email"]').value.trim();
        const password = form.querySelector('[name="password"]').value;
        const button = form.querySelector('button[type="submit"]');

        if (!window.supabaseClient) {
            message.textContent =
                "Supabase 연결 실패: js/supabase.js 설정을 확인하세요.";
            return;
        }

        button.disabled = true;
        message.textContent = "회원가입 요청 중...";

        try {
            const { data, error } =
                await window.supabaseClient.auth.signUp({
                    email,
                    password
                });

            if (error) throw error;

            if (data.session) {
                message.textContent = "회원가입 성공! 메인 페이지로 이동합니다.";

                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1000);
            } else if (data.user) {
                message.textContent =
                    "가입 요청 성공! 이메일 인증이 필요하거나 이미 가입된 계정일 수 있습니다.";
            } else {
                message.textContent =
                    "응답을 확인할 수 없습니다. Supabase 설정을 확인하세요.";
            }
        } catch (error) {
            console.error("Supabase 회원가입 오류:", error);
            message.textContent = "회원가입 실패: " + error.message;
        } finally {
            button.disabled = false;
        }
    });
});
