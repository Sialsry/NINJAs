# CSS

### 기초 이론
### 문법
### 선택자
### 결합자

### 1. 기초이론
> html이 구조를 위한 내용이고 CSS는 모양 형태를 위한 시트
> 브라우저는 요소에 스타일을 적용한 화면을 출력해준다.

```css
선택자 {
    속성 : 값;
}
```

```css
div {

}
p {

}
a {

}
.class {

}
#id {

}
모든 요소의 선택자 : 와일드카드
* {

}
```

폴더 구조에서 경로를 지정할때
/* : 루트경로에서 모든 파일
/** : 루트경로에서 모든 폴더

각각의 요소들은 기본적인 속성을 가지고 있는데 기본적인
스타일을 모두 제거하고 본인이 직접 모든 스타일을 작업할때 불필요한 스타일을 처음에
지우고 시작하기 위해서

### 결합자
> 여러가지 선택자를 연결해서 스타일을 적용

```css
div a{} 자손 결합자 {display : none};
div > a {display : none};
.a .b {} 자손 결합자
div > p 직계 자식 결합자
p + div 인접 결합자
p ~ div 형제 결합자 
input[id="box"] 속성 선택자
div:after 의사 요소 : html을 작성할때 요소를 작성하지 않았지만 가상의 요소를 선택할때 사용한다.
div:hover 의사 클래스 : 요소의 위로 마우스를 올렸을때


```

```html
<div>
    <ul>
        <li>
            <a></a>
        </li>
    </ul>
</div>
```html
p + div 인접 결합자
p + a {
    display : none;
}
어휘적으로 인접한 요소는 스타일을 적용 시킨다.
<div>
    <p></p>
    <a></a>
    <h1></h1>
</div>
```


```html
p ~ div 형제 결합자 
같은 부모를 가지고 있는 요소들 형제의 요소들은 스타일을 적용시킨다.

p ~ h1 {
    display : none;
}
<div>
    <p></p>
    <a></a>
    <h1></h1>
</div>
```

### 포지션
> 요소의 위치를 정의할때 위치의 정보를 직접 정의한다.
> 기준점으로 부터 부모의 요소가 될 수 있다.
> 요소의 위치에 영향을 주지 않게 된다 영역의 영향을 주지 않게된다.
> 요소간의 위치가 겹치게 스타일을 적용할 수 있다.

> top, left, right, bottom 네속성을 가지고 위치를 이동 시킬수 있다. 포지션 속성이 있어야 사용할 수 있는 스타일 속성

position: relative; : 위치의 기준점을 본인의 요소를 위치로 부터 이동
position: absolute; : 부모의 요소중 relative의 속성을 가지고 있는 요소로부터 기준점


### 스타일의 속성 값

```css
.box {
    display :block;
    /* 블록 요소 한줄을 모두 차지한다 요소가 나열될수 없다. 요소의 크기를 지정할 수 있다. */

    display : inline;
    /* 내용의 크기만큼만 영역을 차지하고 요소가 나열될 수 있다 요소의 크기를 지정할 수 없다. */

    display : inline-block;
    /* 요소의 크기를 지정할 수 있고 요소가 나열 될 수 있다. */

    display : none;
    /* 화면에서 요소가 보이지 않게 지워버린다. */

    display : inherit;
    /* 부모의 속성을 가져와서 값을 적용한다. */

    display : initial;
    /* 태그의 속성값을 초기화 */

    중요
    display : flex;
    /* 자식요소 에게 영향을 준다 자식 요소의 정렬 방법을 정의한다. */

    font-size : 12px;
    /* text의 크기를 지정한다 */

    text-decoration : none;
    /* text의 꾸미기 요소를 정의한다 밑줄 삭제선 상단선 등 */
    text-decoration : underline;
    text-decoration : overline;

    text-align : center;
    /* text의 정렬을 적용할때 가운데 정렬 */
    text-align : start;
    /* text의 왼쪽 정렬 */
    text-align : end;
    /* text의 오른쪽 정렬 */

    margin : 1px;
    /* 외부 간격을 정의하는 속성 시계 방향 순서로*/

    padding : 1px;
    /* 내부 간격을 정의하는 속성 */

    color : red;
    /* text 내용의 색을 정의하는 속성 */

    overflow : hidden;
    /* hidden은 부모의 요소의 밖으로 나온 부분을 제거하는 */

    overflow : scroll;
    /* scroll 부모의 요소의 상하 좌우 모두 다 자식의 요소가 부모보다 커지게 되면 스크롤이 되는 속성 */

    overflow-y : scroll;
    /* 세로로 스크롤이 되게 적용하는 속성 */

    overflow-x : scroll;
    /* 가로로 스크롤이 되게 적용하는 속성 */
}
```

### 실습 과제
