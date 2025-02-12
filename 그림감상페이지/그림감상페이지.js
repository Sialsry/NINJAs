function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    console.dir(urlParams);
    return urlParams.get(name);
}

const imageSrc = getQueryParam("image");

if (imageSrc) {
    const images = JSON.parse(localStorage.getItem("images")) || [];
    document.getElementById("displayedImage").src = images[parseInt(imageSrc)-1].src
    console.log(images)
    console.log(imageSrc)
} else {
    document.getElementById("displayedImage").alt = "No image selected.";
}


// --------------------------------------------------------------아래로 댓글 영역
const user = {uid : "soon"}
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




const submitHandler = (e) => {
    e.preventDefault();
    // const {content} = e.target; // const content = e.target.content
    // const {value} = content; // const value = content.value
    let {value} = e.target.content
    addState(value);
    drawing();
    e.target.content.value = ""
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