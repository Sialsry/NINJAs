// 1. 로또 추첨 번호들

// 2. 당첨 번호 통

// 3. 겹치는 번호가 없어야 해

// 로또번호 추첨기 배포해서

const lottoNum = []; // 로또를 추첨할 번호들

const result = []; // 로또의 결과를 담을 배열

// 추첨 전 단계

for (let i = 1; i <= 45; i++) {
    lottoNum.push(i);
}
console.log("번호 세팅 끝" + lottoNum.length + "개의 번호");

// 6개의 공을 뽑아야 한다.
for (let i = 0; i < 6; i++) {
    let randomNumber = parseInt(Math.random() * lottoNum.length);

    let number = lottoNum[randomNumber];


    // 실제로 생각했을때 공을 꺼냈으면 공이 없어져야 한다.
    // 해당 인덱스의 값을 비우고 뒤의 값을 모두 하나씩 땡기고
    // 해당 인덱스와 맨뒤의 값을 둘이 바꾸고 맨 뒤의 값만 제거한 다음에 길이를 줄여버려
    // 이러한 기능이 이미 구현이 되어있다.
    // 메서드의 종류를 몽땅 아는 것 보다 메서드의 역할을 아는게 더 중요하다.

    // 배열의 원하는 인덱스의 값을 제거한다 원본 배열에서
    // 값의 얕은 복사 깊은 복사
    
    // splice : 배열의 인덱스의 값을 제거
    // () : 값이 두개가 들어간다 첫번째 시작 인덱스 두번째 지울 갯수
    lottoNum.splice(randomNumber,1);
    result.push(number);
}

// while 겹치는 숫자가 안나올때 까지
// 여러번 발생할수 있는 상황도 발생한다.

console.log('로또의 추첨 결과는 두구두구두구')

for (let i = 0; i < result.length; i++) {
    console.log(result[i]);
}
