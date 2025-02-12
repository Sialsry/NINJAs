console.log(document.cookie)

// 사용자 정보 가져오기
const getCookie = (name) => {
    let cookies = document.cookie.split("; ");
    let result;

    for (let i = 0; i < cookies.length; i++) {
        let [key, value] = cookies[i].split("="); // 배열 분해 할당
        if (name === key.trim()) { 
            result = value; 
            break; 
        }
    }

    console.log(result);
    console.log(getCookie(id))
    return result;
};

// 사용자 정보 가져오기 
const userDataStr = getCookie("loggedInUser");
const userData = userDataStr ? Json.parse(userDataStr) : null;

document.getElementById("current_nickname").textContent = userData.nickname;
