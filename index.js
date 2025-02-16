console.log(window.location.href);

document.querySelector('.draw').onclick = () => {
    window.location.href = '/create/create.html'
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
    window.location.href = `../content/content.html?image=` + imageSrc; // 클릭한 이미지의 경로를 쿼리 스트링에 추가하여 이동
}

const arr = JSON.parse(localStorage.getItem("images")) || []

arr.forEach((e) => {
    const imgBox = document.createElement("div"); 
    imgBox.classList.add("image-box"); 
    const img = document.createElement("img");
    img.src = e.src;
    img.onclick = () => viewImage(e.index);
    img.classList.add("image-content"); 
    const savedImages = JSON.parse(localStorage.getItem("images")) || [];
    console.log(savedImages[e.index - 1]);
    if (savedImages[e.index - 1].stat === true) {
        imgBox.classList.add("completed-box"); 
        const completedImagesBox = document.getElementById("completed_images_content_box");
        if (completedImagesBox) {
            completedImagesBox.appendChild(imgBox);
        }
    } else if (savedImages[e.index - 1].stat === false) {
        imgBox.classList.add("incomplete-box"); 
        const imagesContentBox = document.getElementById("images_content_box");
        if (imagesContentBox) {
            imagesContentBox.appendChild(imgBox);
        }
    }
    imgBox.appendChild(img); // 박스 안에 이미지 추가
});
// arr.forEach((e) => {
//     const img = document.createElement('img');
//     img.src = e.src;
//     img.onclick = () => viewImage(e.index);
//     // console.log(JSON.parse(localStorage.getItem('images'))[e.index-1])
//     if (JSON.parse(localStorage.getItem('images'))[e.index-1].stat === true) {
//         completed_images_content.appendChild(img);
//     } else if (JSON.parse(localStorage.getItem('images'))[e.index-1].stat === false) {
//         images_content.appendChild(img);
//     }    
// })








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

const usersData = JSON.parse(localStorage.getItem("users")) || [];

usersData.sort((a, b) => b.point - a.point);
// const topRanking = document.getElementById("topRanking");

const rankingListContainer = document.getElementById("ranking_list_container")
rankingListContainer.innerHTML = `
    <h2 style="text-align:center; font-size: 30px; color: black; margin:0;">🏆 </h2>
    <div id ="ranking_box">
    <div id="topRanking"></div>
    </div>
    <button id="moreBtn" onclick="toggleModal(true)">더보기</button>
`;

const topRanking = document.getElementById("topRanking")
usersData.slice(0, 3).forEach((user, index) => {
    const div = document.createElement("div");
    div.classList.add("rank-item");

    let rankIcon = "";
    if (index === 0) rankIcon = "🥇"; 
    else if (index === 1) rankIcon = "🥈"; 
    else if (index === 2) rankIcon = "🥉"; 

    div.innerHTML = `${rankIcon} ${user.nickname} : ${user.point} 점`;
    topRanking.appendChild(div);
});

const modalHTML = `
    <div id="rankingModal" class="modal">
        <div class="modal-content">
            <h3>전체 랭킹</h3>
            <ul id="moreRanking"></ul>
            <button class="close" onclick="toggleModal(false)">닫기</button>
        </div>
    </div>
`;

document.body.insertAdjacentHTML("beforeend", modalHTML);

const moreRanking = document.getElementById("moreRanking");

usersData.forEach((user, index) => {
    const li = document.createElement("li");

    let rankIcon = "";
    if (index === 0) rankIcon = "🥇"; 
    else if (index === 1) rankIcon = "🥈"; 
    else if (index === 2) rankIcon = "🥉"; 
    else rankIcon = `${index + 1}위`; 

    li.innerHTML = `${rankIcon} ${user.nickname} - ${user.point}점`;
    moreRanking.appendChild(li);
});

function toggleModal(show) {
    document.getElementById("rankingModal").style.display = show ? "block" : "none";
}


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
