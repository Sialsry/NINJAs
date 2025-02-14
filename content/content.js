function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const imageSrc = getQueryParam("image");
const images = JSON.parse(localStorage.getItem("images")) || [];

if (imageSrc) {
    document.getElementById("displayedImage").src = images[parseInt(imageSrc)-1].src
    document.querySelector('.drawer').innerHTML = `${images[parseInt(imageSrc)-1].drawer} 님의 그림 무슨 그림일까요?`
    document.querySelector('.explain').innerHTML = `${images[parseInt(imageSrc)-1].explanation}`
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

if (images[parseInt(imageSrc)-1].stat === true) {  // 이미 정답을 맞춘 그림일 때
    document.querySelector(".int").disabled = true;
    document.querySelector(".int").placeholder = "이미 정답을 맞춘 그림입니다.";
}
if (userData.id === images[parseInt(imageSrc)-1].drawer) { // 이미지를 그린 사람이 댓글을 입력하려고 할 때
    document.querySelector(".int").disabled = true;
    document.querySelector(".int").placeholder = '본인의 그림에는 댓글을 입력할 수 없습니다.';
}

// --------------------------------------------------------------아래로 댓글 영역--------------------------------------------------------------


const user = {uid : cookieArr[0][1]}
const commentList = document.querySelector("#comment-list")
const commentFrm = document.querySelector("#comment-frm")
class Comment {
    constructor(content) {
        this.uid = user.uid;
        this.content = content;
        this.date = this.getToday("-")
        this.update = false;
    }
    getToday(text) {
        const date = new Date()
        let h = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()
        return [h, m, s].join(text)
    }
}









// const drawer = JSON.parse(localStorage.getItem('images'))
// console.log(drawer[0])



const data = []
const submitHandler = (e) => {
    e.preventDefault()
    const {uid, content, date} = e.target
    const comment = new Comment(content.value)
    data.push(comment)
    const content_JSON = JSON.stringify(data)
    localStorage.setItem(`comments${images[parseInt(imageSrc)-1].index}`, content_JSON)
    
    
    const userDataStr = getCookie("loggedInUser");
    const userData = userDataStr ? JSON.parse(userDataStr) : null;
    let {value} = e.target.content // const value = e.target.content.value
    const newPoint = JSON.parse(localStorage.getItem('users'))
    
    if (userData.id === images[parseInt(imageSrc)-1].drawer) { // 이미지를 그린 사람이 댓글을 입력하려고 할 때
        alert('그림을 그린 사람은 댓글을 입력할 수 없습니다')
        e.preventDefault()
        e.target.content.value = ""
    } else {
        if (value === images[parseInt(imageSrc)-1].word) {     // 정답 댓글 작성 시
            alert('정답입니다! 100포인트 획득.')
            document.querySelector(".int").disabled = true;
            for (let i = 0; i < newPoint.length; i++) {
                if (userData.id === newPoint[i].id) {
                    newPoint[i].point += 100
                    localStorage.setItem('users', JSON.stringify(newPoint))
                }
            }
            images[parseInt(imageSrc)-1].stat = true
            localStorage.setItem('images', JSON.stringify(images))
            e.preventDefault()
            addState(value);
            drawing();
            e.target.content.value = ""
        }
        else if (value !== images[parseInt(imageSrc)-1].word) { // 정답이 아닌 댓글 작성 시
            e.preventDefault();
            addState(value);
            drawing();
            e.target.content.value = ""
            // const draw_comment = JSON.parse(localStorage.getItem(`comments${images[parseInt(imageSrc)-1].index}`))
            // for (let i = 0; i < data.length; i++) {
                
            //     const {uid, content, date} = draw_comment[i]
            //     document.querySelector('.comment-id').innerHTML = uid
            //     document.querySelector('.comment-update-btn').innerHTML = content
            //     document.querySelector('.comment-date').innerHTML = date        
            // }
        }
    }
}    



const draw_comment = JSON.parse(localStorage.getItem(`comments${images[parseInt(imageSrc-1)].index}`)) || []
console.log(images[parseInt(imageSrc)])

const state = draw_comment
const addState = (value) => {
    if (value.trim() === "") return;
    state.push(new Comment(value.trim()))

    console.log(state)
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
    console.log(state[index])
    const item = state[index];
    const commentRow = document.createElement("ul")
    commentRow.classList.add("comment-row")
    commentRow.dataset.index = index; 
    const commentId = document.createElement("li")
    commentId.classList.add("comment-id")
    commentId.innerHTML = item.uid;
    const commentDate = document.createElement("li")
    commentDate.classList.add("comment-date")
    commentDate.innerHTML = item.date
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

for (let i = 0; i < draw_comment.length; i++) {
                const draw_comment = JSON.parse(localStorage.getItem(`comments${images[i].index}`))
                const {uid, content, date} = draw_comment[i]
                drawing()
                document.querySelector('.comment-id').innerHTML = uid
                document.querySelector('.comment-update-btn').innerHTML = content
                document.querySelector('.comment-date').innerHTML = date        
}


commentFrm.onsubmit = submitHandler;