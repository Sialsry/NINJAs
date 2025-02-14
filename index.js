console.log(window.location.href);

document.querySelector('.draw').onclick = () => {
    window.location.href = '/작성페이지/게시판.html'
}

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








function viewImage(imageSrc) {
    window.location.href = `../그림감상페이지/그림감상페이지.html?image=` + imageSrc; // 클릭한 이미지의 경로를 쿼리 스트링에 추가하여 이동
}

const arr = JSON.parse(localStorage.getItem("images")) || []

arr.forEach((e) => {
    const img = document.createElement('img');
    img.src = e.src;
    img.onclick = () => viewImage(e.index);
    // console.log(JSON.parse(localStorage.getItem('images'))[e.index-1])
    if (JSON.parse(localStorage.getItem('images'))[e.index-1].stat === true) {
        completed_images_content.appendChild(img);
    } else if (JSON.parse(localStorage.getItem('images'))[e.index-1].stat === false) {
        images_content.appendChild(img);
    }    
})


// const loginedUser = JSON.parse(localStorage.getItem("users")) || []
// console.log(loginedUser) // [{nickname:'x', id:'y', password:'z'}]
// console.log(encodeURIComponent(JSON.stringify(userData)))


const getCookie = (name) => {
    let cookies = document.cookie.split("; ");
    let result;
    for (let i = 0; i < cookies.length; i++) {
        let [key, value] = cookies[i].split("="); // 배열 분해 할당
        if (name === key.trim()) { 
            result = decodeURIComponent(value);
            break; 
        }
    }
    console.log(result);
    return result;
};
// 현재 로그인된 사용자 정보 가져오기 
const userDataStr = getCookie("loggedInUser");
const userData = userDataStr ? JSON.parse(userDataStr) : null;
const cookieArr = Object.entries(userData);
console.log(cookieArr[0][1])

document.querySelector('.logined_User').innerHTML = `${cookieArr[0][1]} 님 환영합니다.`



// 1️⃣ 로컬스토리지에서 users 데이터 가져오기
const usersData = JSON.parse(localStorage.getItem("users")) || [];

// 2️⃣ 포인트를 기준으로 내림차순 정렬
usersData.sort((a, b) => b.point - a.point);

// 3️⃣ 랭킹 리스트 컨테이너 가져오기
const rankingListContainer = document.getElementById("ranking_list_container");

// 4️⃣ 기존 랭킹 리스트 초기화 후 새로운 리스트 생성
rankingListContainer.innerHTML = `
    <h2 style="text-align:center; font-size: 24px; color: black;">🏆 랭킹 🏆</h2>
    <ul id="ranking_list" style="list-style: none; padding: 10px; background: white; border-radius: 10px; width: 300px; margin: auto; text-align: left;">
    </ul>
`;

// 5️⃣ 리스트 요소 가져오기
const rankingList = document.getElementById("ranking_list");

// 6️⃣ 상위 10명의 유저를 랭킹에 추가
usersData.slice(0, 10).forEach((user, index) => {
    const listItem = document.createElement("li");
    listItem.style.fontSize = "18px";
    listItem.style.color = "black";
    listItem.style.padding = "5px";
    listItem.style.borderBottom = "1px solid gray";

    // 🥇, 🥈, 🥉 상위 3명 아이콘 추가
    let rankIcon = "";
    if (index === 0) rankIcon = "🥇 ";
    else if (index === 1) rankIcon = "🥈 ";
    else if (index === 2) rankIcon = "🥉 ";
    
    listItem.innerHTML = `${rankIcon} ${user.nickname} - ${user.point}점`;
    rankingList.appendChild(listItem);
});

const audio = new Audio("../music/background.mp3"); 
audio.loop = true;

document.getElementById("music_btn").addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
        this.innerHTML = "⏸"; 
    } else {
        audio.pause();
        this.innerHTML = "🎵"; 
    }
});