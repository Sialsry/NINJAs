let playerBtn = document.querySelectorAll(".player-btn");
let playerSelect = document.querySelector('.player-select')

console.log(playerBtn);
// 플레이어는 rock scissors paper 중에 버튼을 눌러서 값을 할당

const Arr = ['scissors', 'rock', 'paper'];

// 게임 초기화
const init = () => {
    // 반복문
    // 배열 메서드
    playerBtn.forEach((item, index) => {
        item.onclick = () => {
            console.log(index);
            // playerSelect.classList
            // if(playerSelect.classList[1] === undefined) {}
                playerSelect.className = `player-select ${Arr[index]}`;

                const {value, text} = gameStart(Arr[index]);
                document.querySelector('.result').innerHTML = value;
                document.querySelector('.content-value').innerHTML = text;
        }
    })

    
    // forEach 콜백함수 내부에서 기능을 호출해야 하고
    // 반환 값이 없다. 메서드를 사용할때 반환값을 확인하는게 필수
    // 첫번째 매개변수에는 배열의 요소가 순차적으로 들어온다.
    // [0.1.2.3.4.5.6.7.8.9].forEach((el)=>{ console.log(el) })
    // 우리가 전달한 콜백 함수를 배열의 갯수만큼 호출을 한다.
    // 두번째 매개변수 인덱스 번호
}

// 플레이어의 값을 버튼을 눌러서 이미지를 보여주는 이벤트를 초기화

init()

const gameStart = (player) => {
    // 컴퓨터의 선택은 여러번 호출 되어야한다.
    // 소수점을 버리자
    // floor 소수점 버림
    // round 반올림
    
    const index = Math.floor(Math.random() * Arr.length); // 0~2
    let comSelect =  Arr[index];
    document.querySelector('.com-select').className = "com-select " + comSelect;

    if(player === comSelect) {
        return { value : "무승부", text : "무승부"}
    } else if (player === "rock" && comSelect === "scissors" ||
               player === "paper" && comSelect === "rock" ||
               player === "scissors" && comSelect === "paper") // 이겼을때
    {
        return {value : "승리 짝짝짝", text : "플레이어 승리"}
    } else {
        return {value : "패배 흑흑흑", text : "컴퓨터의 승리"}
    }
}

for (let index = 0; index < array.length; index++) {
    const element = array[index];
    
}