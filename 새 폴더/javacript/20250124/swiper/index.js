// 클릭의 위치 정보가 필요하다

// 클릭한 위치의 좌표 
// 클릭한 위치의 좌표를 눌렀을때 땠을때

// 마우스의 클릭 시작 위치
let start;

// 진행중인 swiper 인덱스
let index = 0;

let swiper = document.querySelector('.swiper');
let swiperContents = document.querySelector('.swiper-content');
let length = document.querySelectorAll('.swiper-item').length;

let prevBtn = document.querySelector('.prev');
let nextBtn = document.querySelector('.next');

// onmousedown 마우스 클릭이 시작되었을때 발생하는 이벤트
// e.stopPropagation : 요소간의 이벤트 전파를 방지한다.
swiper.onmousedown = (e) => {
    start = e.clientX;
    console.log("나 클릭 시작 : X축 : " + start);
}

swiper.onmouseup = (e) => {
    console.log("나 클릭 종료 X축 : " + e.clientX);
    if(e.clientX < start) {
        // 요소들이 오른쪽으로 이동되야 한다.
        // 오른쪽으로 스와이프를 넘긴 것.
        if(index < length - 1)
        index++;
    } else {
        if(index > 0)
        index--;
        swiperMove();
    }
    console.log(index);
}

const swiperMove = () => {
    // css 영역의 스타일 시트에 접근해서 스타일 값을 가져오는 메서드
    let swiperwidth = parseInt(getComputedStyle(swiper).width);
    // 반환 타입이 문자열
    // 0 * 500 === 0
    // 1 * 500 === 500
    // 2 * 500 === 1000
    // 3 * 500 === 1500
    swiperContents.style.left = `${-(index * swiperwidth)}px`;
}

prevBtn.onclick = () => {
    if(index > 0)
    index--;
    swiperMove();
}

nextBtn.onclick = () => {
    if(index < length - 1)
    index++;
    swiperMove();
}
