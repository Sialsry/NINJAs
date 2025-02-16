document.addEventListener("DOMContentLoaded", () => {
    const arr = JSON.parse(localStorage.getItem("images")) || [];

    const words = [
        "사과", "바다", "비행기", "로봇", "나무", "자동차", "강아지", "고양이", "책",
        "별", "해바라기", "코끼리", "기차", "우산", "잠자리", "사자", "연필", "토끼",
        "호랑이", "피자", "핸드폰", "컴퓨터", "눈사람", "풍선", "오리", "물고기", "초콜릿",
        "케이크", "햄버거", "축구공", "물병", "컵", "의자", "테이블", "커피", "우유",
        "빵", "토스트", "버스", "비", "눈", "바나나", "딸기", "포도", "수박", 
        "배", "복숭아", "오렌지", "딸기", "체리", "파인애플", "키위", "레몬", "라임",
        "농구", "야구", "축구", "탁구", "테니스", "골프", "수영", "배구"
    ];

    const button = document.getElementById("C_btn");
    const result = document.getElementById("result");
    const canvas = document.getElementById("Canvas");
    const ctx = canvas.getContext("2d");
    const explanation = document.getElementById("explanation");

    // 색상 버튼
    const blackBtn = document.getElementById("black");
    const redBtn = document.getElementById("red");
    const orangeBtn = document.getElementById("orange");
    const greenBtn = document.getElementById("green");
    const blueBtn = document.getElementById("blue");
    const yellowBtn = document.getElementById("yellow");
    const violetBtn = document.getElementById("violet");
    const eraserBtn = document.getElementById("eraser");
    const alleraserBtn = document.getElementById("all_eraser");
    const sizeInput = document.getElementById("size"); 

    // 캔버스 크기 설정
    canvas.width = 800;
    canvas.height = 600;
    canvas.style.border = "2px solid black";
    
    // 초기 설정
    let drawing = false;
    let lastX = 0, lastY = 0;
    let color = "black"; // 기본 색상
    let lineWidth = 5; // 기본 선 굵기
    let hue = 0; // 무지개 색상 변수

    let FirstClick = true;

    button.onclick = () => {
        if (FirstClick) {
            FirstClick = false;
        } else {
            
        const confirmChange = confirm("제시어를 변경하시겠습니까?");

        if (!confirmChange) return;
        }
        const randomWord = words[Math.floor(Math.random() * words.length)];
        result.innerHTML = `당신의 제시어는 "<strong>${randomWord}</strong>" 입니다!`;

        explanation.value = "";

    };

    // 마우스 누르면 그리기 시작
    canvas.addEventListener("mousedown", (event) => {
        drawing = true;
        [lastX, lastY] = [event.offsetX, event.offsetY]; // 시작 위치 저장
    });

    // 마우스 움직일 때 그림 그리기
    canvas.addEventListener("mousemove", (event) => {
        if (!drawing) return;

        ctx.strokeStyle = color; // 색 적용
        ctx.lineWidth = lineWidth; // 선 굵기 적용
        ctx.lineCap = "round"; // 둥근 선
        ctx.lineJoin = "round"; // 선 연결 부드럽게

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();

        [lastX, lastY] = [event.offsetX, event.offsetY]; // 마지막 위치 업데이트

        // 무지개 색상 변경
        if (color === "rainbow") {
            hue += 5;
            ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // HSL 기반 색상 변경
        }
    });

    // 마우스를 떼면 그리기 멈춤
    canvas.addEventListener("mouseup", () => {
        drawing = false;
    });

    // 마우스가 캔버스를 벗어나면 그리기 멈춤
    canvas.addEventListener("mouseleave", () => {
        drawing = false;
    });

    // 색상 변경 버튼 기능
    blackBtn.onclick = () => {
        color = "black";
        ctx.lineWidth = lineWidth; // 기존 펜 두께 유지
    };

    redBtn.onclick = () => {
        color = "red";
        ctx.lineWidth = lineWidth; 
    };

    blueBtn.onclick = () => {
        color = "blue";
        ctx.lineWidth = lineWidth; 
    };

    orangeBtn.onclick = () => {
        color = "orange";
        ctx.lineWidth = lineWidth; 
    };

    yellowBtn.onclick = () => {
        color = "yellow";
        ctx.lineWidth = lineWidth; 
    };

    greenBtn.onclick = () => {
        color = "green";
        ctx.lineWidth = lineWidth; 
    };

    violetBtn.onclick = () => {
        color = "violet";
        ctx.lineWidth = lineWidth; 
    };


    // 지우개 기능 (배경색과 동일한 색상으로 변경 & 두께 증가)
    eraserBtn.onclick = () => {
        color = "white";
        ctx.lineWidth = lineWidth * 3; // 지우개 크기를 기존보다 3배 키움
    };

    // 선 굵기 변경 이벤트
    sizeInput.addEventListener("input", (event) => {
        lineWidth = event.target.value;
        ctx.lineWidth = lineWidth; // 실시간으로 선 굵기 변경
    });

    alleraserBtn.onclick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
    };












// 사용자 정보 가져오기
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
console.log(cookieArr)




    class CanvasImage {
        constructor(index, src, word, drawer, explanation, stat) {
            this.index = index;
            this.src = src;
            this.word = word;
            this.drawer = drawer
            this.explanation = explanation;
            this.stat = stat;
        }
    }

    document.querySelector('.submit').onclick = () => {
        const resultElement = document.getElementById("result");
        let randomWord = resultElement.innerText.trim();
        let explanationText = explanation.value.trim();

        console.log(arr);
        randomWord = randomWord.replace(/당신의 제시어는\s*"(.+?)"\s*입니다!/, '$1');

        if (!randomWord) { 
            alert("제시어를 뽑고 그림을 그려주세요.");
            return;
        }

        arr.push(new CanvasImage(arr.length + 1, canvas.toDataURL(), randomWord, cookieArr[1][1], explanationText, false));
        localStorage.setItem('images', JSON.stringify(arr));

        explanation.value = "";

        setTimeout(() => {
            window.location.href = 'http://127.0.0.1:5502/index.html';
        }, 100);
        
    }

    explanation.addEventListener("input", (event) => {
        explanations[arr.length] = event.target.value;
        localStorage.setItem("explanations", JSON.stringify(explanations));
    });
});

document.querySelector('#exit_btn').onclick =() => {
    window.location.href = 'http://127.0.0.1:5502/index.html'
}

