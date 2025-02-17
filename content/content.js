function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const exitBtn = document.querySelector("#exit_btn");

exitBtn.onclick = () => {
    window.location.href = "http://127.0.0.1:5502/index.html";
};
// document.addEventListener("DOMContentLoaded", () => {

//     if (!exitBtn) {
//         return;
//     }
// });

const imageSrc = getQueryParam("image");
let images = JSON.parse(localStorage.getItem("images")) || [];

if (imageSrc) {
    document.getElementById("displayedImage").src = images[parseInt(imageSrc)-1].src;
    document.querySelector('.drawer').innerHTML = `${images[parseInt(imageSrc)-1].drawer} 님의 그림 무슨 그림일까요?`;
    document.querySelector('.explain').innerHTML = `${images[parseInt(imageSrc)-1].explanation}`;
} else {
    document.getElementById("displayedImage").alt = "No image selected.";
}

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
    return result;
};

// 현재 로그인된 사용자 정보 가져오기 
const userDataStr = getCookie("loggedInUser");
const userData = userDataStr ? JSON.parse(userDataStr) : null;
const cookieArr = Object.entries(userData);

// function removeItemByProperty(key, property, value) {
//     let images = JSON.parse(localStorage.getItem(key)) || [];

//     images = images.filter(item => item[property] !== value);
//     localStorage.setItem(key, JSON.stringify(images));
// }
if (images[parseInt(imageSrc)-1].stat === true) {  // 이미 정답을 맞춘 그림일 때
    document.querySelector(".int").disabled = true;
    document.querySelector(".int").placeholder = "이미 정답을 맞춘 그림입니다.";
}
if (userData.id === images[parseInt(imageSrc)-1].drawer) { // 이미지를 그린 사람이 댓글을 입력하려고 할 때
    document.querySelector(".int").disabled = true;
    document.querySelector(".int").placeholder = '본인의 그림에는 댓글을 입력할 수 없습니다.';
    let deleteDrawing = document.createElement('button')
    document.querySelector('.container').appendChild(deleteDrawing);
    deleteDrawing.innerHTML = '그림 삭제';
    deleteDrawing.onclick = () => {
        if (confirm('정말로 그림을 삭제하시겠습니까?')) {
            // images.splice(parseInt(imageSrc)-1, 1);
            // localStorage.setItem('images', JSON.stringify(images));
            images = images.filter(item => item.index !== parseInt(imageSrc)-1);
            localStorage.setItem('images', JSON.stringify(images));
    
            window.location.href = '/index.html';
    
        }
    }
}













// --------------------------------------------------------------아래로 댓글 영역--------------------------------------------------------------

const user = {uid : cookieArr[0][1]};
const commentList = document.querySelector("#comment-list");
const commentFrm = document.querySelector("#comment-frm");

class Comment {
    constructor(content) {
        this.uid = user.uid;
        this.content = content;
        this.date = this.getToday(":");
        this.update = false;
    }
    getToday(text) {
        const date = new Date();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        return [h, m, s].join(text);
    }
}

// 기존에 저장된 댓글 가져오기
const storedCommentsKey = `comments${images[parseInt(imageSrc) - 1].index}`;
const storedComments = JSON.parse(localStorage.getItem(storedCommentsKey)) || [];

const submitHandler = (e) => {
    e.preventDefault();
    const { content } = e.target;
    const newComment = new Comment(content.value);

    // 기존 데이터 가져와 업데이트 후 저장
    const updatedComments = JSON.parse(localStorage.getItem(storedCommentsKey)) || [];
    updatedComments.push(newComment);
    localStorage.setItem(storedCommentsKey, JSON.stringify(updatedComments));

    let { value } = e.target.content;
    const newPoint = JSON.parse(localStorage.getItem('users'));

    if (userData.id === images[parseInt(imageSrc)-1].drawer) { // 이미지를 그린 사람이 댓글을 입력하려고 할 때
        alert('그림을 그린 사람은 댓글을 입력할 수 없습니다');
        e.target.content.value = "";
    } else {
        if (value === images[parseInt(imageSrc)-1].word) { // 정답 댓글 작성 시
            alert('정답입니다! 100포인트 획득.');
            document.querySelector(".int").disabled = true;
            for (let i = 0; i < newPoint.length; i++) {
                if (userData.id === newPoint[i].id) {
                    newPoint[i].point += 100;
                    localStorage.setItem('users', JSON.stringify(newPoint));
                }
            }
            images[parseInt(imageSrc)-1].stat = true;
            localStorage.setItem('images', JSON.stringify(images));
            e.target.content.value = "";
        }
    }

    drawing();
    e.target.content.value = "";
};

const draw_comment = JSON.parse(localStorage.getItem(storedCommentsKey)) || [];
const state = draw_comment;
const addState = (value) => {
    if (value.trim() === "") return;
    state.push(new Comment(value.trim()));
    setTotalRecord();
};

const setTotalRecord = () => {
    const totalRecord = document.querySelector("h4 > span");
    totalRecord.innerHTML = state.length;
};

// 댓글 목록을 다시 그림
const drawing = () => {
    commentList.innerHTML = "";
    const savedComments = JSON.parse(localStorage.getItem(storedCommentsKey)) || [];
    for (let i = 0; i < savedComments.length; i++) {
        commentList.append(creatRow(savedComments[i]));
    }
};

const creatRow = (item) => {
    const commentRow = document.createElement("ul");
    commentRow.classList.add("comment-row");

    const commentId = document.createElement("li");
    commentId.classList.add("comment-id");
    commentId.innerHTML = item.uid;

    const commentDate = document.createElement("li");
    commentDate.classList.add("comment-date");
    commentDate.innerHTML = item.date;

    const commentContent = getContentBox(item.update, item.content);
    commentRow.append(commentId, commentContent, commentDate);
    
    return commentRow;
};

const getContentBox = (flag, content) => {
    return flag ? createUpdateBox(content) : createContentWrap(content);
};

const createContentWrap = (content) => {
    const comment = document.createElement("span");
    comment.classList.add("comment-update-btn");
    comment.innerHTML = content;
    comment.onclick = clickHandler;

    const commentDeleteBtn = document.createElement("span");
    commentDeleteBtn.classList.add("comment-delete-btn");
    commentDeleteBtn.onclick = clickHandler;

    const commentContent = document.createElement("li");
    commentContent.append(comment, commentDeleteBtn);
    return commentContent;
};

function getChildIndex(element) {
    let index = 0;
    while (element.previousElementSibling) {
        element = element.previousElementSibling;
        index++;
    }
    return index;
}
const clickHandler = (e) => {
    const savedComments = JSON.parse(localStorage.getItem(storedCommentsKey)) || [];
    let index = e.target.parentNode.parentNode.dataset.index;
    
    if (e.target.className === "comment-update-btn") {
        savedComments[index].update = !savedComments[index].update;
        localStorage.setItem(storedCommentsKey, JSON.stringify(savedComments));
        drawing();
    } else {
        const flag = confirm("댓글을 삭제하시겠습니까?");
        if (flag) {
            index = e.target.parentNode.parentNode
            console.log(e.target.parentNode.parentNode);
            savedComments.splice(getChildIndex(index), 1);
            localStorage.setItem(storedCommentsKey, JSON.stringify(savedComments));
            setTotalRecord();
            drawing();
        }
    }
};





drawing();
commentFrm.onsubmit = submitHandler;