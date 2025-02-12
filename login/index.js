document.addEventListener("DOMContentLoaded", () => {
    const signinButton = document.getElementById("signin_btn");
    const loginButton = document.getElementById("login_btn");

    if (signinButton) {
        signinButton.addEventListener("click", signinPopup);
    }
    if (loginButton) {
        loginButton.addEventListener("click", loginUser);
    }
});

// 회원가입 성공 팝업
const showSignupSuccessPopup = (nickname) => {
    if (document.querySelector(".popup_finish")) return;

    const popupFin = document.createElement("div");
    popupFin.classList.add("popup_finish");

    popupFin.innerHTML = `
        <div class="popup_fin_content">
            <h3>${nickname}님, 회원가입이 완료되었습니다!</h3>
            <button id="return_login">로그인 페이지로 돌아가기</button>
        </div>
    `;

    document.body.appendChild(popupFin);

    document.getElementById("return_login").addEventListener("click", () => {
        popupFin.remove();
    });
};

// 회원가입 팝업
const signinPopup = () => {
    if (document.querySelector(".popup")) return;

    const popup = document.createElement("div");
    popup.classList.add("popup");

    popup.innerHTML = `
        <div class="popup_content">
            <h3>회원가입</h3>
            <input type="text" id="nickname" placeholder="닉네임을 입력하세요 (최대 5자)">
            <p id="error" class="error_message" style="display: none;">닉네임은 최대 5자까지 입력 가능합니다.</p>
            <p id="nickname_error" class="error_message" style="display: none;">중복된 닉네임입니다.</p>

            <input type="text" id="user_id" placeholder="아이디를 입력하세요 (최대 10자)">
            <p id="error_message" class="error_message" style="display: none;">아이디는 최대 10자까지 입력 가능합니다.</p>
            <p id="id_error" class="error_message" style="display: none;">중복된 아이디입니다.</p>

            <input type="password" id="password" placeholder="비밀번호를 입력하세요">
            <input type="password" id="confirm_password" placeholder="비밀번호를 확인">
            <p id="password_error" class="error_message" style="display: none;">비밀번호가 일치하지 않습니다.</p>
            <p id="empty_error" class="error_message" style="display: none;"></p>

            <button id="register_btn">가입하기</button>
            <button id="close_popup">닫기</button>
        </div>
    `;

    document.body.appendChild(popup);

    const userNickInput = document.getElementById("nickname");
    const userIdInput = document.getElementById("user_id");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");

    const errorMessage = document.getElementById("error_message");
    const nickError = document.getElementById("nickname_error");
    const idError = document.getElementById("id_error");
    const error = document.getElementById("error");
    const passwordError = document.getElementById("password_error");
    const emptyError = document.getElementById("empty_error");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 닉네임 글자 수 제한 , 중복 검사
    userNickInput.addEventListener("input", () => {
        const nickname = userNickInput.value.trim();
        if (nickname.length > 5) {
            error.style.display = "block";
            userNickInput.value = nickname.slice(0, 5);
        } else {
            error.style.display = "none";
        }

        if (users.some(user => user.nickname === nickname)) {
            nickError.style.display = "block";
        } else {
            nickError.style.display = "none";
        }
    });

    // 아이디 글자 수 제한 , 중복 검사
    userIdInput.addEventListener("input", () => {
        const userid = userIdInput.value.trim();
        if (userid.length > 10) {
            errorMessage.style.display = "block";
            userIdInput.value = userid.slice(0, 10);
        } else {
            errorMessage.style.display = "none";
        }

        if (users.some(user => user.id === userid)) {
            idError.style.display = "block";
        } else {
            idError.style.display = "none";
        }
    });

    document.getElementById("register_btn").addEventListener("click", () => {
        const nickname = userNickInput.value.trim();
        const userid = userIdInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // 모든 값을입력해야됨
        if (!nickname || !userid || !password || !confirmPassword) {
            emptyError.textContent = "모든 항목을 입력해야 합니다.";
            emptyError.style.display = "block";
            return;
        } else {
            emptyError.style.display = "none";
        }

        // 비밀번호 확인
        if (password !== confirmPassword) {
            passwordError.style.display = "block";
            return;
        } else {
            passwordError.style.display = "none";
        }

        // 닉넴, 아이디 중복 
        const isNicknameTaken = users.some(user => user.nickname === nickname);
        const isIdTaken = users.some(user => user.id === userid);

        if (isNicknameTaken || isIdTaken) return;

        // 유저정보 저장
        users.push({ nickname, id: userid, password });
        localStorage.setItem("users", JSON.stringify(users));
        console.log("가입된 유저 목록:", users);

        
        showSignupSuccessPopup(nickname);

        popup.remove();
    });

    document.getElementById("close_popup").addEventListener("click", () => {
        popup.remove();
    });
};



// 로그인 화면
const loginUser = () => {
    const userIdInput = document.querySelector('input[placeholder="아이디를 입력하세요."]');
    const passwordInput = document.querySelector('input[placeholder="비밀번호를 입력하세요"]');

    const userid = userIdInput.value.trim();
    const password = passwordInput.value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(user => user.id === userid && user.password === password);

    // 기존 에러 메시지가 있는지 확인
    let loginError = document.getElementById("login_error");
    
    if (!loginError) {
        // 에러 메시지가 없으면 생성
        loginError = document.createElement("p");
        loginError.id = "login_error";
        loginError.classList.add("loginError_message"); // CSS에서 설정한 클래스 추가
        loginError.textContent = "아이디 또는 비밀번호가 올바르지 않습니다.";
        passwordInput.insertAdjacentElement("afterend", loginError);
    }

    // 로그인 실패 시 에러 메시지를 보이게 설정
    if (!validUser) {
        loginError.style.display = "block"; 
        return;
    }

    const userData = {
        nickname: validUser.nickname,
        id: validUser.id,
        password: validUser.password 
    };

    document.cookie = `loggedInUser=${encodeURIComponent(JSON.stringify(userData))}; path=/;`;
    // loggedInUser 네이밍으로 쿠키 생성, 객체를 문자열로 변환, encodeURIComponent()로 인코딩
    //path=/; << 쿠키가 웹사이트 전체에서 사용가능하도록 


    window.location.href = "http://127.0.0.1:5502/index.html"; 
};

