// 사용자 정보 가져오기
const getCookie = (name) => {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        let [key, value] = cookies[i].split("=");
        if (name === key.trim()) return decodeURIComponent(value);
    }
    return null;
};

const userDataStr = getCookie("loggedInUser");
const userData = userDataStr ? JSON.parse(userDataStr) : null;

// 점수 높은 순으로 정렬
const usersData = JSON.parse(localStorage.getItem("users")) || [];
usersData.sort((a, b) => b.point - a.point);

if (userData) {
    document.getElementById("current_nickname").textContent = userData.nickname;

    const currentUser = usersData.find(user => user.id === userData.id);
    if (currentUser) {
        document.getElementById("user_score").textContent = `${currentUser.point}점`;

        const rank = usersData.findIndex(user => user.id === userData.id) + 1;
        document.getElementById("user_rank").textContent = `${rank}위`;
    }
}

// 이미지 클릭 시 상세 페이지 이동 함수
function viewImage(imageSrc) {
    window.location.href = `../content/content.html?image=` + imageSrc;
}

const arr = JSON.parse(localStorage.getItem("images")) || [];


if (userData) {
    document.getElementById("current_nickname").textContent = userData.nickname;
}
const myImagesBox = document.getElementById("my_images_box");

const myImage = () => {
    const myDrawings = arr.filter(image => image.drawer === userData.id);

    myImagesBox.innerHTML = "";

    myDrawings.forEach(image => {
        const imgBox = document.createElement("div");
        imgBox.classList.add("my_images");

        const img = document.createElement("img");
        img.src = image.src;
        img.onclick = () => viewImage(image.index);

        imgBox.appendChild(img);
        myImagesBox.appendChild(imgBox);
    });
};

myImage();
// 닉네임 변경 팝업 열기
const openNicknamePopup = () => {
    if (document.querySelector(".nicknamePopup")) return;

    const popup = document.createElement("div");
    popup.classList.add("nicknamePopup");
    popup.innerHTML = `
        <div class="check_popup">
            <h3>닉네임 변경</h3>
            <input type="text" id="verify_id" placeholder="아이디 입력">
            <input type="password" id="verify_password" placeholder="비밀번호 입력">
            <p id="verify_error" class="error_message" style="display: none; color: red;">
                아이디 또는 비밀번호가 올바르지 않습니다.
            </p>
            <button id="verify_btn">확인</button>
            <button id="close_popup">닫기</button>
        </div>
    `;
    document.body.append(popup);

    document.getElementById("verify_btn").addEventListener("click", verifyUser);
    document.getElementById("close_popup").addEventListener("click", () => popup.remove());
};

// 사용자 정보 검증
const verifyUser = () => {
    const verifyId = document.getElementById("verify_id").value.trim();
    const verifyPassword = document.getElementById("verify_password").value.trim();
    const errorMsg = document.getElementById("verify_error");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(user => user.id === verifyId && user.password === verifyPassword);

    if (!validUser) { 
        errorMsg.style.display = "block";
        return;
    }

    document.querySelector(".nicknamePopup").remove(); 
    openNewNicknamePopup(validUser, users);
};

// 닉네임 변경 팝업 열기
const openNewNicknamePopup = (validUser, users) => {
    if (document.querySelector(".newNicknamePopup")) return;

    const popup = document.createElement("div");
    popup.classList.add("newNicknamePopup");
    popup.innerHTML = `
        <div class="newNickname_input">
            <h3>변경할 닉네임을 입력하세요</h3>
            <input type="text" id="newNickname_input" placeholder="닉네임 입력">
            <p id="errorMsgText" class="error_message" style="display:none; color: red;">
                닉네임은 최대 5자까지 입력 가능합니다.
            </p>
            <p id="errorMsgExist" class="error_message" style="display:none; color: red;">
                이미 존재하는 닉네임입니다.
            </p>
            <button id="new_verify_btn">변경하기</button>
            <button id="return_btn">취소</button>
        </div>
    `;
    
    document.body.append(popup);
    const newNicknameInput = document.getElementById("newNickname_input");

    newNicknameInput.addEventListener("input", () => {
        const newValue = newNicknameInput.value.trim();
        if (newValue.length > 5) {
            document.getElementById("errorMsgText").style.display = "block";
            newNicknameInput.value = newValue.slice(0, 5);
        } else {
            document.getElementById("errorMsgText").style.display = "none";
        }
    });

    document.getElementById("new_verify_btn").addEventListener("click", () => changeNickname(validUser, users));
    document.getElementById("return_btn").addEventListener("click", () => popup.remove());
};

// 닉네임 변경 처리
const changeNickname = (validUser, users) => {
    const newNickname = document.getElementById("newNickname_input").value.trim();
    const errorMsgExist = document.getElementById("errorMsgExist");

    if (users.some(user => user.nickname === newNickname)) {
        errorMsgExist.style.display = "block";
        return;
    }

    errorMsgExist.style.display = "none";
    validUser.nickname = newNickname;
    localStorage.setItem("users", JSON.stringify(users));

    const updatedUserData = {
        nickname: newNickname,
        id: validUser.id,
        password: validUser.password
    };

    document.cookie = `loggedInUser=${encodeURIComponent(JSON.stringify(updatedUserData))}; path=/;`;
    document.getElementById("current_nickname").textContent = newNickname;
    
    document.querySelector(".newNicknamePopup").remove();
};

// 닉네임 수정 버튼 이벤트 리스너 추가
document.getElementById("edit_nickname_btn").addEventListener("click", openNicknamePopup);

// 메인 페이지로 돌아가기 버튼 기능 추가
const goToMainBtn = document.getElementById("go_to_main");
if (goToMainBtn) {
    goToMainBtn.addEventListener("click", () => {
        window.location.href = "http://127.0.0.1:5502/index.html";
    });
}
