// popup class

class Popup {
    constructor(_popup){
        this.popup = _popup;
    }

    setOpen() {
        // 팝업을 켜줄 메서드
        // 열려있으면 닫고 닫혀있으면 여는
        console.log(this.popup);
        // 클래스를 가지고 있는지?
        // contains 메서드 classList 배열안에 해당 클래스가 있는지 반환값은 bool
        //console.log(this.popup.classList.contains("is-active"))

        // add 클래스를 추가 매개변수로 전달한 클래스 이름을 추가
        //console.log(this.popup.classList.add("is-active"));

        // remove 매개변수로 전달한 클래스를 제거 
        //console.log(this.popup.classList.remove("is-active"));

        if(this.popup.classList.contains("is-active")){
            // 켜져있다면 팝업을 끄고
            this.popup.classList.remove("is-active"); // 팝업을 끄고
        }else {
            // 팝업이 꺼져있다면 팝을 켜고
            this.popup.classList.add("is-active"); // 팝업 켜고
        }
    }
}

// querySelector 아이디 클래스 요소이름 모든 선택자 구문
// querySelector 반환 값은 요소 node
let popup = new Popup(document.querySelector(".popup-wrap"))
let popup2 = new Popup(document.querySelector(".popup-wrap2"))

// {popup : "node popup-wrap [div]", "setOpen f()"}
// popup.setOpen();
// popup.setOpen();

// let popupOpen = popup.setOpen.bind(popup);

function _popup () {
    let popup = document.querySelector(".popup-wrap");
    if(popup.classList.contains("is-active")){
        // 켜져있다면 팝업을 끄고
        popup.classList.remove("is-active"); // 팝업을 끄고
    }else {
        // 팝업이 꺼져있다면 팝을 켜고
        popup.classList.add("is-active"); // 팝업 켜고
    }
}

function _popup2 (popupName) {
    let popup2 = document.querySelector(`${popupName}`);
    if(popup2.classList.contains("is-active")){
        // 켜져있다면 팝업을 끄고
        popup2.classList.remove("is-active"); // 팝업을 끄고
    }else {
        // 팝업이 꺼져있다면 팝을 켜고
        popup2.classList.add("is-active"); // 팝업 켜고
    }
}

document.querySelector(".popup-btn").onclick = function() {_popup("popup-wrpa5")};



