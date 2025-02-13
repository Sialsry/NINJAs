// 사용자 정보 가져오기
const getCookie = (name) => {
    let cookies = document.cookie.split("; ");
    let result;

    for (let i = 0; i < cookies.length; i++) {
        let [key, value] = cookies[i].split("="); 
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
console.log(userData);

if (userData) {
    document.getElementById("current_nickname").textContent = userData.nickname;
} else {
    alert("로그인이 필요합니다.");
    window.location.href = "index.html"; // 로그인 페이지로 이동
}

// 닉네임 변경을 위해 로그인 정보 확인 팝업
const nicknamePopup = () => {
    if (document.querySelector(".nicknamePopup")) return;

    const checkPopup = document.createElement("div");
    checkPopup.classList.add("nicknamePopup");

    checkPopup.innerHTML = `
    <div class="check_popup">
        <div class="popup_content">
            <h3>닉네임 변경</h3>
            <input type="text" id="verify_id" placeholder="아이디 입력">
            <input type="password" id="verify_password" placeholder="비밀번호 입력">
            <p id="verify_error" class="error_message" style="display: none; color: red;">
                아이디 또는 비밀번호가 올바르지 않습니다.
            </p>
            <button id="verify_btn">확인</button>
            <button id="close_popup">닫기</button>
        </div>
    </div>
`;

    document.body.append(checkPopup);
    
    // verify_btn 클릭 이벤트 부분 수정
document.getElementById("verify_btn").addEventListener("click", () => {
    console.log("verify_btn 클릭됨");
    const verifyId = document.getElementById("verify_id").value.trim();
    const verifyPassword = document.getElementById("verify_password").value.trim();
    const errorMsg = document.getElementById("verify_error");

    console.log("입력된 ID:", verifyId);
    console.log("입력된 Password:", verifyPassword);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("저장된 사용자 목록:", users);
    
    const validUser = users.find(user => user.id === verifyId && user.password === verifyPassword);
    console.log("검증된 사용자:", validUser);

    if (!validUser) { 
        errorMsg.style.display = "block";
        return;
    } else {
        errorMsg.style.display = "none";
        console.log("사용자 검증 성공");
    }
    
    checkPopup.remove(); // 첫 번째 팝업 닫기
    console.log("첫 번째 팝업 닫힘");
    
    // 함수 호출 전 확인
    console.log("addNewNicknameInput 함수 호출 직전");
    addNewNicknameInput(validUser, users);
});

// addNewNicknameInput 함수 수정
const addNewNicknameInput = (validUser, users) => {
    console.log("addNewNicknameInput 함수 시작");
    console.log("전달받은 validUser:", validUser);
    console.log("전달받은 users:", users);

    if (document.querySelector(".newNicknamePopup")) {
        console.log("이미 팝업이 존재함");
        return;
    }

    const newNicknamePopup = document.createElement("div");
    newNicknamePopup.classList.add("newNicknamePopup");

    newNicknamePopup.innerHTML = `
        <div class="newNickname_input">
            <h3>변경할 닉네임을 입력하세요</h3>
            <input type="text" id="newNickname_input" placeholder="닉네임 입력">
            <p class="error_message" id="errorMsgText" style="display:none; color: red;">
                닉네임은 최대 5자까지 입력 가능합니다. 
            </p>
            <p class="error_message" id="errorMsgExist" style="display:none; color: red;">
                이미 존재하는 닉네임입니다. 
            </p>    
            <button id="new_verify_btn">변경하기</button>
            <button id="return_btn">변경 취소하기</button>
        </div>
    `;
    
    console.log("팝업 HTML 생성됨");
    document.body.append(newNicknamePopup);
    console.log("팝업이 body에 추가됨");

    const newNickname = document.getElementById("newNickname_input");
    const errorMsgText = document.getElementById("errorMsgText");
    const errorMsgExist = document.getElementById("errorMsgExist");

    // 닉네임 입력 이벤트
    newNickname.addEventListener("input", () => {
        console.log("닉네임 입력 중:", newNickname.value);
        const newNicknameValue = newNickname.value.trim();
        if (newNicknameValue.length > 5) {
            errorMsgText.style.display = "block";
            newNickname.value = newNicknameValue.slice(0, 5);
        } else {
            errorMsgText.style.display = "none";
        }
    });

    // 변경하기 버튼 이벤트
    document.getElementById("new_verify_btn").addEventListener("click", () => {
        console.log("변경하기 버튼 클릭됨");
        const newNicknameValue = newNickname.value.trim();
        
        if (users.some(user => user.nickname === newNicknameValue)) {
            errorMsgExist.style.display = "block";
            return;
        } else {
            errorMsgExist.style.display = "none";
        }

        validUser.nickname = newNicknameValue;
        localStorage.setItem("users", JSON.stringify(users));
        console.log("새로운 닉네임이 저장됨:", newNicknameValue);

        const userData = {
            nickname: newNicknameValue,
            id: validUser.id,
            password: validUser.password
        };

        document.cookie = `loggedInUser=${encodeURIComponent(JSON.stringify(userData))}; path=/;`;
        document.getElementById("current_nickname").textContent = newNicknameValue;
        console.log("쿠키와 화면이 업데이트됨");

        newNicknamePopup.remove();
        console.log("닉네임 변경 팝업이 닫힘");
    });

    document.getElementById("return_btn").addEventListener("click", () => {
        console.log("변경 취소 버튼 클릭됨");
        newNicknamePopup.remove();
    });
};
};

document.getElementById("edit_nickname_btn").addEventListener("click", () => {
    console.log("닉네임 변경 버튼 클릭됨");
    nicknamePopup();
} );