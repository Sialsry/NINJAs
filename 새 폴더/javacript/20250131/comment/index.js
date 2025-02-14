let data = [];

class Comment {
    constructor(_index, _value, _name, _image) {
        this.index = _index;
        this.value = _value;
        this.name = _name;
        this.image = _image;
    }
}

content_form.onsubmit = (e) => {
    // e.preventDefault();
    const {content_value, content_name, content_image } = e.target;

    console.dir(content_value)
    console.dir(content_name)
    console.dir(content_image)
    // content_image 이미지 같은 파일은 input에 파일의 내용을 가지고 있는 객체에 포함된다.
    // 이후에 바이너리 데이터로 전송
    // 대용량 영상 처리를 백엔드

    console.dir(content_image.files[0].name)

    // 글 생성
    const comment = new Comment(data.length + 1, content_value.value, content_name.value, content_image.files[0].name);

    // console.log(comment);
    data.push(comment);
    // data 강제 형변환
    // console.log(data.toString());
    // 문자열 변경을 하는데 JSOn 문자열로 변경
    // 로컬에 데이터를 저장

    // javarscript object notation : 요청과 응답간에 경량 데이터 형식을 만든것.
    /*
        JSON의 문법
        {
            'name' : "soon"
        }
    */

    // 내장되어 있는 원형 객체를 사용해서 변경
    // const str = JSON.stringify(data); // 반환값이 string JSON 문자열
    // // 주고 받은 이후에 JSON 문자열을 사용하기 위해서
    // const obj = JSON.parse(str); // JSON 문자열을 객체의 형태로 변환
    // console.log(obj)
    const content_JSON = JSON.stringify(data);
    localStorage.setItem('comment', content_JSON);
}



{/* <ul>
        <li>번호</li>
        <li>내용</li>
        <li>이미지</li>
        <li>이름</li>
    </ul> 
*/}

const deleteComment = (index) => {
    data = data.filter(comment => comment.index !== index);
    localStorage.setItem('comment', JSON.stringify(data));
    rander();
};

const rander = (index) => {
    const contentDiv = document.querySelector('.content');
    contentDiv.innerHTML = ""; // 기존 데이터 초기화

    for (let i = 0; i < data.length; i++) {
        // 글의 갯수만큼 반복
        const ul = document.createElement('ul');
        const li_01 = document.createElement("li");
        const li_02 = document.createElement("li");
        const li_03 = document.createElement("li");
        const li_04 = document.createElement("li");
        const image_tag = document.createElement('img');
        const D_btn = document.createElement('button');
        ul.append(li_01, li_02, li_03, li_04, D_btn)
        li_03.append(image_tag);
        

        const {index, value, name, image} = data[i];
        li_01.innerHTML = index;
        li_02.innerHTML = value;
        li_04.innerHTML = name;
        image_tag.src = "./image/" + image;
        // ./image/ghost.png

        D_btn.innerHTML = "삭제";
        D_btn.setAttribute("data-index", index); // 삭제 버튼에 index 저장
        D_btn.onclick = (e) => {
            deleteComment(parseInt(e.target.getAttribute("data-index")));
        };

        document.querySelector('.content').append(ul);

    }
}

const init = () => {
    if(localStorage.getItem('comment')) {
        const _data = JSON.parse(localStorage.getItem('comment'))
        data = _data;
    }

    rander()
}

init();

