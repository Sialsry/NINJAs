// console.log(document.querySelector(".border"));

// // innerHTML : 태그의 형태를 문자로 작성하면 브라우저가 해석해서 요소로 생성한다.
// header.innerHTML += `
// <div>
//     안녕하세요
//     <div>내 제목</div>
// </div>


const border = document.querySelector(".border");


// 글이 생성되는 기능을 
/*
<li>
    <span>번호</span>
    <span>제목</span>
    <span>내용</span>
</li>
*/ 

const contentArr = [];

// 글하나를 생성하는 기능 요소를 생성
const createContent = (index, title, content) => {
    const _li = document.createElement('li');  
    const _span01 = document.createElement('span');
    const _span02 = document.createElement('span');
    const _span03 = document.createElement('span');
    // 메모리상에 생성되고 변수에 주소가 할당만 되어있다.

    _li.append(_span01, _span02, _span03);

    // input요소는 value라는 속성을 가지고 있고 value에는 우리가 입력한 값이 담긴다.

    _span01.innerHTML = index
    _span02.innerHTML = title;
    _span03.innerHTML = content;

    border.append(_li);
}

// 글의 내용을 저장하는 함수
const addContent = () => {
    const content = {
        index : contentArr.length + 1,
        title : title_input.value,
        content : content_input.value
    }

    console.log(content)
    contentArr.push(content);
    console.log(contentArr)
    render();
}

// 화면을 그리는 역활만 하는 함수
const render = () =>{
    // 화면에 추가한 글의 내용을 보여주는 함수
    // 다시 화면을 랜더링하기전에 게시글을 생성할때 초기화를 한번 해준다.
    border.innerHTML = `<li>
        <span>번호</span>
        <span>제목</span>
        <span>내용</span>
    </li>`
    // 초기화

    for (let i = 0; i < contentArr.length; i++) {
        // 참조 타입은 `구조분해 할당`
        // 객체안에 있는 키의 이름으로 할당한다.
        // contentArr 객체의 안에있는 키의 이름이 동일해야 한다.
        // 객체의 구조 분해 할당
        // index : num    index키의 값을 할당하고 num이라는 변수에 할당해서 num 사용할수 있다.
        const {index : num, title, content} = contentArr[i];
        const index = 1;
        // 요소 줄을 하나 생성
        createContent(num, title, content);
    }
}

create.onclick = addContent;
