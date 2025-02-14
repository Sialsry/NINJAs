# 이벤트 속성 scroll swiper  

## scroll 이벤트
```js
let boxContent = document.querySelectorAll('.box-content');

// getBoundingClientRect : left, right, top, bottom 사각면의 수치를 가져올수 있다 x축 y축
// getBoundingClientRect : 상대 위치 브라우저에서 보고있는 화면의 상대적 위치
console.log(boxContent[0].getBoundingClientRect().top);

// 상대 위치를 절대 위치로 계산
// 상대 위치값 + 스크롤 된 값

// 스크롤 된 값은 스크롤딘 요소의 dom 객체의 내용에 포함되어 있다.
// 속성 pageXoffset pageYoffset 스크롤 진행한 진행도의 값 수치 스크롤을 얼마나 했는지

// 절대 위치 === 상대 위치 + 스크롤 된 값
console.log(boxContent[0].getBoundingClientRect().top + window.pageYOffset);

// scrollY 브라우저의 상단 기준으로 얼마만큼 스크롤이 이동했는지
// 맨위를 기준으로 하고 싶지 않아.
// 만들고 확인 화면의 크기만큼 더해주면 기준이 브라우저의 맨밑이 기준이 된다.

const posY = [];
for (let i = 0; i < boxContent.length; i++) {
    posY.push(boxContent[i].getBoundingClientRect().top + window.pageYOffset);
}

window.onscroll = () => {
    // onscroll : 스크롤이 될때마다 발생하는 이벤트
    // console.log(boxContent[0].getBoundingClientRect().top + window.pageYOffset);
    // innerHeight : 현재 요소의 높이 window 브라우저의 높이

    console.log(window.scrollY)
    const scroll = window.scrollY + window.innerHeight;

    boxContent.forEach((el, index)=> {
        if(scroll > posY[index]) {
            el.classList.add("is-active");
        } else {
            el.classList.remove('is-active');
        }
    })

//     const scroll = window.scrollY;
//     if(scroll > posY[0]) {
//             boxContent[0].classList.add('is-active');
//     }else {
//         boxContent[0].classList.remove("is-active");
//     }

    
}
```

## swiper

> 과제스와이프 직접 구현하고 
> 이전에 우리가 만든 html 페이지에서
> 스와이프를 구현하고 스와이프의 위치는 페이지의 중단 또는 하단
> 스크롤해서 밑으로 페이지를 내리면 스와이프가 보이게
> 스와이프에는 현재 인덱스를 표현하는 불릿이 있다
> 스와이프의 내용으로 본인의 페이지의 연관되는 이미지를 넣어서

>> 모바일 기준 제작