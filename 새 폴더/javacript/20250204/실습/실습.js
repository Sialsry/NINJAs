const border = document.querySelector(".border");

const deleteContent = (index) => {
    contentArr.splice(index, 1); 
    render(); 
};

const createContent = (index, title, content, user) => {
    const _li = document.createElement('li');  
    const _span01 = document.createElement('span');
    const _span02 = document.createElement('span');
    const _span03 = document.createElement('span');
    const _span04 = document.createElement('span');
    const D_btn = document.createElement('button');
    _li.append(_span01, _span02, _span03, _span04,);

    _span01.innerHTML = index
    _span02.innerHTML = title;
    _span03.innerHTML = content;
    _span04.innerHTML = user;
    _span04.append(D_btn);
    
    D_btn.innerHTML = "삭제";
    D_btn.onclick = () => deleteContent(index - 1);

    border.append(_li);
}

const contentArr = [];

const addContent = () => {
    const content = {
        index: contentArr.length + 1, 
        title: title_input.value,
        content: content_input.value,
        user: user_input.value,
        
    };
    title_input.value = ""
    content_input.value = ""
    user_input.value = ""
    console.log(content); 
    contentArr.push(content); 
    console.log(contentArr); 

    render(); 
};

const render = () =>{
    border.innerHTML = `<li>
        <span>번호</span>
        <span>제목</span>
        <span>내용</span>
        <span>작성자</span>
    </li>`
    

    for (let i = 0; i < contentArr.length; i++) {
        const {index : num, title, content, user} = contentArr[i];
        createContent(num, title, content, user);
    }
}

create.onclick = addContent;