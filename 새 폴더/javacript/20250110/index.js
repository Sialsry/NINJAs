// window 전역 객체 안에 있는 메서드 (브라우저의 기능을 메서드로 제공 해준다.)
// console.log("123")

// 요소의 제어를 하고 있지 않아서

// 입력 받은 값을 저장해서 사용하기 위해서
// prompt 우리가 입력한 값을 시스템 입력창 모달이 뜨고 입력한 값을 변수에 할당을 하면 저장 할 수 있다.
// prompt 반환값을 우리가 입력한 값을 문자열로 string

// 시스템 팝업으로 log를 확인하는 방법
// alert
// null

// OR 연산자
// if((age > 20) || (age < 50)) {
//     alert(age + "살이야")
//     alert(age > 20)
//     alert(age < 50)
// }

// 필수 조건사항만 체크 된다면 통과 3개 중에 하나만 선택 하면 된다.

// AND 연산자
// if((age > 20) && (age < 50)) {
//     alert(age + "살이야")
//     alert(age > 20)
//     alert(age < 50)
// } else {
//     alert("나이를 20살 초과 50살 미만으로 작성 하세요")
// }

// 이름 나이 성별 필수로 작성을 확인 해야하는 내용들을 확인 한다거나 등

// 복습
// 점수를 입력받고
// 점수가 90 ~ 100점이면 A를 출력
// 점수가 80 ~ 90점이면 B를 출력
// 점수가 70 ~ 80점이면 C를 출력
// 점수가 70 미만은 D를 출력

// 반환 데이터 타입이 문자열
// 형변환 데이터의 타입을 변환

// 문자열 "10" -> 숫자형 10

// "90" -> 90

// "1" + 1 === 강제 형변환

// parseInt : 정수형으로 형변환을 한 뒤 값을 반환 해주는 메서드
// typeof : 데이터의 타입을 확인하는 예약어

// let num = parseInt("1");
// let str = parseInt(str);
// NaN : not a number 숫자로 변환할수 없는 문자열을 숫자로 변환을 시도했다.
// alert(num);

// let age = prompt("너 점수가 몇점이니?");
// age = parseInt(age)

//  if((age > 89) && (age < 101)) {
//     alert(age + "점이네 네 점수는 A야!")
//  } else if((age > 79) && (age < 90)) {
//     alert(age + "점이네 네 점수는 B야!")
//  } else if((age > 69) && (age < 80)) {
//     alert(age + "점이네 네 점수는 C야!")
//  } else if(age < 70) {
//     alert(age + "점이네 네 점수는 D야!")
//  } else {
//     alert("1~100 사이의 숫자를 입력하세요") 
//  }


// 스코프-------------------------------------------------------------------------------------------

// 전역 스코프에 선언한 변수
// let a = 0;

// if(true) {
//     //지역 스코프
//     console.log(a);
// }


// if(true) {
//     let a = 0; // 스코프 영역이 종료되면 해제된다.
// }

// console.log(a);

// if(true) {
//     let a = 0;
// }

// if(true) {
//     console.log(a);
// }

// let a = 15;
// if(true) {
//     // let a = 10;
//     if(true) {
//        // let a = 20;
//         console.log(a);
//     }
// }


// ES5 var 지역 변수에 선언한 변수가 window 객체에 포함 되어서 해제가 되지 않는다.
// var의 사용도를 낮춰서 사용
// if (true) {
//     var a = 10;
// }
// var a = 20;
// console.log(window);
// console.log(a);

// 전역 스코프와 지역 스코프의 이해를 필수로 해야한다

// for (let i = 0; i < 10; i++) {
//     let a = i * 10;

//     if(true) {
//         // let a = 10;
//         if(true) {
//             console.log(a);
//         }
//     }
// }

// 지역 스코프에서 선언한 변수를 가져올 수 없기 때문에 호이스팅 에러가 발생
// console.log(a);

// switch

// case 문의 조건에 충족할때 break문을 만나지 않으면 밑의 case문도 실행을 하다 break를 만난 순간 코드가 중단된다.
// case 문도 실행을 하다가 break를 만난 순간 코드가 중단된다
//


switch (myMBTI_code_01 === "A" || myMBTI_code_02 === "B") {
    case "A":
    case "B" :
        console.log("달리는 나의 상태는")

    case "WORK" :
        console.log("나의 일")
        break;

    default:
        console.log("조건에 맞는 값이 전달되지 않았어.")
        break;
}



// MBTI