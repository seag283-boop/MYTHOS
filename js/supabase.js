
const SUPABASE_URL = "https://ghqqoyxfnicxztmkmuyd.supabase.co";
const SUPABASE_KEY = "sb_publishable_9wlyRdDJQwU-ns3NY8xFMw_CCbNuCEf";

if (!window.supabase) {
    console.error("Supabase 라이브러리를 불러오지 못했습니다.");
} else if (
    SUPABASE_URL.includes("여기에_") ||
    SUPABASE_KEY.includes("여기에_")
) {
    console.error("Supabase URL 또는 Publishable Key가 입력되지 않았습니다.");
} else {
    window.supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

    console.log("Supabase 연결 설정 완료");
}
