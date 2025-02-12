console.log(window.location.href);


document.addEventListener("DOMContentLoaded", () => {
    const cookies = document.cookie.split("; "); // 유저 정보 가져와서 쪼개기
    const loggedInUser = cookies.find(cookie => cookie.startsWith("loggedInUser="));

    if (!loggedInUser) {
        alert("로그인이 필요합니다.");
        window.location.href = "http://127.0.0.1:5502/login/mainIndex.html"; // 로그인 페이지로 이동
    }
});

document.getElementById("logout_btn").addEventListener("click", () => {
    document.cookie = "loggedInUser=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = 'http://127.0.0.1:5502/login/mainIndex.html';
});

document.getElementById("mypage_detail").addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5502/detail/index.html"; 
})


