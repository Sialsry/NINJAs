let comSelect = parseInt(Math.random() * 3);

const userSelectionImg = document.getElementById('user-selection');
const computerSelectionImg = document.getElementById('computer-selection');


comSelect = parseInt(Math.random() * 3);

document.onclick = function(e){

    if (e.target.classList.contains('img3')) {
        userSelectionImg.src = "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FHfURw%2FbtqXKvOTNWK%2FgWTwPXEg9QzSV0ilOuwuak%2Fimg.png";
    } else if (e.target.classList.contains('img2')) {
        userSelectionImg.src = "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FpSJwo%2FbtqXJV1lACE%2Fnx5XrxkCLWXh9UsnoS8vbK%2Fimg.png";
    } else if (e.target.classList.contains('img1')) {
        userSelectionImg.src = "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbmjB2s%2FbtqXHhp6kpG%2FTH14W4U612SxKo9uuR2sB0%2Fimg.png";
    }

    if (comSelect === 0) {
        computerSelectionImg.src = "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FHfURw%2FbtqXKvOTNWK%2FgWTwPXEg9QzSV0ilOuwuak%2Fimg.png";
    } else if (comSelect === 1) {
        computerSelectionImg.src = "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FpSJwo%2FbtqXJV1lACE%2Fnx5XrxkCLWXh9UsnoS8vbK%2Fimg.png";
    } else if (comSelect === 2) {
        computerSelectionImg.src = "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbmjB2s%2FbtqXHhp6kpG%2FTH14W4U612SxKo9uuR2sB0%2Fimg.png";
    }
if(((e.target.classList.contains('img3')) && (comSelect === 0)) ||
    ((e.target.classList.contains('img2')) && (comSelect === 1)) || 
    ((e.target.classList.contains('img1')) && (comSelect === 2)) ){ 
    alert(text = "비겼습니다!")
} else if (((e.target.classList.contains('img3'))) && (comSelect === 2)) {
    alert(text = "이겼습니다!")
    
    
} else if (((e.target.classList.contains('img2'))) && (comSelect === 0)) {
    alert(text = "이겼습니다!")
    

} else if (((e.target.classList.contains('img1'))) && (comSelect === 1)) {
    alert(text = "이겼습니다!")
    

} else {
    alert(text = "졌습니다!")
    
}
    
comSelect = parseInt(Math.random() * 3);
}


