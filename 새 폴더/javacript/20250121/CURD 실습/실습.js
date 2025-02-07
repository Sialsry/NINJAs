const user = {
    uid : "soon"
};

const commentList = document.querySelector('#comment-list')
const commentFrm = document.querySelector('#comment-frm')

class Comment {
    constructor(content) {
        this.uid = user.uid;
        this.content = content;
        this.date = new Date(); // 글을 작성한 현제시간.
    }
    getToday(text) {
        
    }
}