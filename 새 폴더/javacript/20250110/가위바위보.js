let playerSelect;

let comSelect = parseInt(Math.random() * 3);


while(true) {
playerSelect = prompt ("가위! 바위! 보!" + "현재 보유 돈" + result);
comSelect = parseInt(Math.random() * 3);

if (((playerSelect === "가위") && (comSelect === 0)) ||
    ((playerSelect === "바위") && (comSelect === 1)) || 
    ((playerSelect === "보") && (comSelect === 2)) ){ 
    alert(text = "비겼습니다!")
} else if ((playerSelect === "가위") && (comSelect === 2)) {
    alert(text = "이겼습니다!")
    
    
} else if ((playerSelect === "바위") && (comSelect === 0)) {
    alert(text = "이겼습니다!")
    

} else if ((playerSelect === "보") && (comSelect === 1)) {
    alert(text = "이겼습니다!")
    

} else {
    alert(text = "졌습니다!")
    
}

if(result <= 0) {
    alert(text = "게임오버!")
    break; 
}
    

}