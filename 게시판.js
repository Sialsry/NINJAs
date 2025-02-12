document.addEventListener("DOMContentLoaded", () => {
    const arr = JSON.parse(localStorage.getItem("images")) || [];
    const words = [
        "사과", "바다", "비행기", "로봇", "나무", "자동차", "강아지", "고양이", "책",
        "별", "해바라기", "코끼리", "기차", "우산", "잠자리", "사자", "연필", "토끼",
        "호랑이", "피자", "핸드폰", "컴퓨터", "눈사람", "풍선", "오리", "물고기", "초콜릿",
        "케이크", "햄버거", "축구공"
    ];

    const button = document.getElementById("C_btn");
    const result = document.getElementById("result");
    const canvas = document.getElementById("Canvas");
    const ctx = canvas.getContext("2d");

    // 색상 버튼
    const blackBtn = document.getElementById("black");
    const whiteBtn = document.getElementById("white");
    const eraserBtn = document.getElementById("eraser");
    const sizeInput = document.getElementById("size"); // 선 굵기 조절

    // 캔버스 크기 설정
    canvas.width = 500;
    canvas.height = 400;
    canvas.style.border = "2px solid black";

    // 초기 설정
    let drawing = false;
    let lastX = 0, lastY = 0;
    let color = "black"; // 기본 색상
    let lineWidth = 5; // 기본 선 굵기
    let hue = 0; // 무지개 색상 변수

    button.onclick = () => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        result.innerHTML = `당신의 제시어는 "<strong>${randomWord}</strong>" 입니다!`;
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

    whiteBtn.onclick = () => {
        color = "white";
        ctx.lineWidth = lineWidth; // 기존 펜 두께 유지
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

    
    class CanvasImage {
        constructor(index, src) {
            this.index = index;
            this.src = src;
        }
    }
    
    document.querySelector('.submit').onclick =() => {
        console.log(arr);
        arr.push(new CanvasImage(arr.length + 1, canvas.toDataURL()));
        localStorage.setItem('images', JSON.stringify(arr));
        window.location.href = `./메인페이지/메인페이지.html`
    }
});