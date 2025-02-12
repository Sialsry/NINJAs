document.querySelector('.draw').onclick =() => {
    window.location.href = '../게시판.html'
}

function viewImage(imageSrc) {
    // 클릭한 이미지의 경로를 쿼리 스트링에 추가하여 이동
    // window.location.href = "../그림감상페이지.html?image=" + encodeURIComponent(imageSrc);
    window.location.href = `../그림감상페이지/그림감상페이지.html?image=` + imageSrc;
}
console.log(localStorage.getItem("images"))
// console.log(encodeURIComponent(imageSrc))

const arr = JSON.parse(localStorage.getItem("images")) || []

arr.forEach((e) => {
    const img = document.createElement('img');
    img.src = e.src;
    img.onclick = () => viewImage(e.index);
    images_content.appendChild(img);    
})