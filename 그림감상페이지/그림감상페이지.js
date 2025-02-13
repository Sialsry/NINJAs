function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const imageSrc = getQueryParam("image");
const images = JSON.parse(localStorage.getItem("images")) || [];

if (imageSrc) {
    // const images = JSON.parse(localStorage.getItem("images")) || [];
    document.getElementById("displayedImage").src = images[parseInt(imageSrc)-1].src
    document.querySelector('.drawer').innerHTML = `${images[parseInt(imageSrc)-1].drawer} 님의 그림 무슨 그림일까요?`
} else {
    document.getElementById("displayedImage").alt = "No image selected.";
}







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

// --------------------------------------------------------------아래로 댓글 영역
// const loginedUser = JSON.parse(localStorage.getItem("users")) || []
// const logedinUserNickname = Object.entries(loginedUser[0])[0][1]



const user = {uid : cookieArr[0][1]}
const commentList = document.querySelector("#comment-list")
const commentFrm = document.querySelector("#comment-frm")
class Comment {
    constructor(content) {
        this.uid = user.uid;
        this.content = content;
        this.date = new Date(); 
        this.update = false;
    }
    getToday(text) {
        let h = this.date.getHours()
        let m = this.date.getMinutes()
        let s = this.date.getSeconds()
        return [h, m, s].join(text)
    }
}


const drawer = JSON.parse(localStorage.getItem('images'))

// console.log(drawer[0])
// const drawer2 = Object.entries(drawer[0])
// console.log(drawer2[3][1])



const submitHandler = (e) => {
    const userDataStr = getCookie("loggedInUser");
    const userData = userDataStr ? JSON.parse(userDataStr) : null;
    let {value} = e.target.content // const value = e.target.content.value
    console.log(user.id)
    console.log(images[parseInt(imageSrc)-1].drawer)
    console.log(userData)
    const newPoint = JSON.parse(localStorage.getItem('users'))
    console.log(newPoint)

    if (userData.id === images[parseInt(imageSrc)-1].drawer) {
        alert('글을 그린 사람은 댓글을 입력할 수 없습니다')
        console.log('gfhgfgf',userData)
    } else {
      if (value === images[parseInt(imageSrc)-1].word) {
          alert('정답입니다! 100포인트 획득.')
          console.log(newPoint)
      } else {
        e.preventDefault();
        addState(value);
        drawing();
        e.target.content.value = ""
      }
    }
}    
const state = []
const addState = (value) => {
    if (value.trim() === "") return;
    state.push(new Comment(value.trim()))
    setTotalRecord();
}
const setTotalRecord = () => {
    const totalRecord = document.querySelector("h4 > span");
    totalRecord.innerHTML = state.length;
}





const drawing = () => {
    commentList.innerHTML = "";
    for (let i = 0; i < state.length; i++) {
        commentList.append(creatRow(i));
    }
}
const creatRow = (index) => {
    const item = state[index];
    const commentRow = document.createElement("ul")
    commentRow.classList.add("comment-row")
    commentRow.dataset.index = index; 
    const commentId = document.createElement("li")
    commentId.classList.add("comment-id")
    commentId.innerHTML = item.uid;
    const commentDate = document.createElement("li")
    commentDate.classList.add("comment-date")
    commentDate.innerHTML = item.getToday(":")
    const commentContent = getContentBox(item.update, item.content) 
    commentRow.append(commentId, commentContent, commentDate);
    return commentRow
}





const getContentBox = (flag, content) => {
    return flag ? createUpdateBox(content) : createContentWrap(content)
}
const createContentWrap = (content) => { // 댓글 입력할 때 실행되는 함수. 댓글과 삭제 버튼 만듦.
    const comment = document.createElement("span")
    comment.classList.add("comment-update-btn")
    comment.innerHTML = content;
    comment.onclick = clickHandler;
    const commentDeleteBtn = document.createElement("span")
    commentDeleteBtn.classList.add("comment-delete-btn")
    commentDeleteBtn.onclick = clickHandler;
    const commentContent = document.createElement("li");
    commentContent.append(comment, commentDeleteBtn) 
    return commentContent;    
}
const createUpdateBox = (content) => { // 댓글 수정할 때 실행되는 함수. 수정 인풋과 수정 취소 버튼 만듦.
    const commentUpdateInput = document.createElement("input");
    commentUpdateInput.classList.add("comment-update-input")
    commentUpdateInput.value = content;
    const commentDeleteBtn = document.createElement("span");
    commentDeleteBtn.classList.add("comment-update-cancel")
    const commentContent = document.createElement("li");
    commentContent.append(commentUpdateInput, commentDeleteBtn)
    commentUpdateInput.onkeyup = (e) => {
        const {index} = e.target.parentNode.parentNode.dataset;
        if (e.keyCode !== 13) return;
        state[index].content = e.target.value;
        state[index].update = !state[index].update;
        drawing();
    }
    commentDeleteBtn.onclick = (e) => {
        const {index} = e.target.parentNode.parentNode.dataset;
        const flag = confirm("수정을 취소하겠습니까?")
        if(!flag) return;
        state[index].update = !state[index].update;
        drawing()
    }
    return commentContent;
}





const clickHandler = (e) => { // 클릭이벤트 발생하는 경우: 1. 작성한 댓글 누를 때, 2. 삭제 버튼 누를 때
    const {index} = e.target.parentNode.parentNode.dataset 
    if (e.target.className === "comment-update-btn") { // 수정하기 위해 댓글을 눌렀을 때
        state[index].update = !state[index].update; // 해당 댓글의 update값을 true로 변환하면서
        drawing(); // createupdatebox를 실행시켜 수정 인풋과 수정 취소 버튼을 화면에 그림.
    } else {
        const flag = confirm("댓글을 삭제하시겠습니까?")
        if (flag) {
            state.splice(index, 1);
            setTotalRecord();
            drawing();
        }
    }
}



commentFrm.onsubmit = submitHandler;