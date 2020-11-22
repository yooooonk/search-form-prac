#  &#127811; Javascript와 Vue로 검색폼 만들기 

- 인프런강의 [실습 UI 개발로 배워보는 순수 javascript와 VueJS개발(김정환)](https://www.inflearn.com/course/%EC%88%9C%EC%88%98js-vuejs-%EA%B0%9C%EB%B0%9C-%EA%B0%95%EC%A2%8C) 강의를 보며 공부한 내용입니다
- &#128198; 2020/10/31 ~ 2020/11/21
> 검색폼을 바닐라 자바스크립트, MVC 패턴으로 구현한 뒤
같은 기능을 Vue.js, MVVM 패턴으로 구현하고, vue CLI를 이용해 싱글 파일컴포넌트로 바꾸는 프로젝트를 클론코딩했습니다.

![img1](https://github.com/yooooonk/TIL/blob/master/img/searchform1.PNG)
![img2](https://github.com/yooooonk/TIL/blob/master/img/searchform2.PNG)
![img3](https://github.com/yooooonk/TIL/blob/master/img/searchform3.PNG)
![img4](https://github.com/yooooonk/TIL/blob/master/img/searchform4.PNG)



##  &#127752; 새로 알게 된 내용
- __lite-server__ : html, css, js의 간단한 구동과 테스트를 가능하게 한다
    - npm install -g lite-server
- __Object.create(proto[,propertiesObject])__ : 지정된 프로토타입 객체 및 속성(property)을 갖는 새 객체를 만든다
    - 반환값 : 지정된 프로토타입 개체와 속성을 갖는 새로운 개체
- __targetEvent.dispatchEent()__ : 영향을 받는 EventListener 를 적절한 순서로 호출하는 지정된 EventTarget 에서 Event 를 (동기적으로) 디스패치한다. 일반 이벤트 처리 규칙(capturing 과 선택적인 bubbling 단계를 포함해)은 dispatchEvent() 를 사용하여 수동으로 전달 된 이벤트에도 적용된다
- __emit__ : 이벤트를 다른 컴포넌트로 넘김
- __reduce의 initial Value__
    - arr.reduce(callback[, initialValue])
    - callback의 최초 호출에서 첫 번째 인수에 제공하는 값. 초기값을 제공하지 않으면 배열의 첫 번째 요소를 사용. 빈 배열에서 초기값 없이 reduce()를 호출하면 오류가 발생함
- __Array.from()__ : 유사 배열 또는 반복 가능한 객체로부터 새로운 Array 인스턴스를 생성한다
- __event bind()와 addEventListener()__ : 이벤트를 html에 직접 선언하지 않고 바인딩하는 방식
- __event.stopPropagation()__ : 이벤트의 버블링을 막는 메서드
- __뷰 사용법__
    - CDN 이용
    - 뷰 인스턴스 생성
    ``` 
        new Vue({
            el : '#app',    // vue 인스턴스가 마운트 될 위치
            data : '',
            methods : {
                // DOM과 바인딩할 함수 정의
            },
            components:{
                key : value
            },
            watch :{

            },
            computed:{

            }
        })
    ```
- __@event.prevent__     : event.preventDefault()와 같은 기능
- __computed__ : 복잡한 표현식 대신 함수로 사용할 수 있다
- __watch__ : vue 모델을 감시하고 있다가 어떤 값이 변경되면 실행되는 함수

## &#128161; 기능 구현

__검색폼 구현__
[x] 검색 상품명 입력 폼이 위치한다. 검색어가 없는 경우이므로 x 버튼을 숨긴다
[x] 검색어를 입력하면 x버튼이 보인다
[x] 엔터를 입력하면 검색 결과가 보인다(컨트롤러에게 위임)
[x] x 버튼을 클릭하거나, 검색어를 삭제하면 검색 결과를 삭제한다

__검색 결과 구현__
[x] 검색 결과가 검색폼 아래 위치한다
[x] 검색 결과가 보인다
[x] x버튼을 클릭하면 검색폼이 초기화 되고, 검색 결과가 사라진다

__탭 구현__
[x] 추천 검색어, 최근 검색어 탭이 검색폼 아래 위치한다
[x] 기본으로 추천 검색어 탭을 선택한다
[x] 각 탭을 클릭하면 탭 아래 내용이 변경된다

__추천 검색어 구현__
[x] 번호, 추천 검색어 목록이 탭 아래에 위치한다
[x] 목록에서 검색어를 클릭하면 선택된 검색어로 검색 결과 화면으로 이동
[x] 검색폼에 선택된 추천 검색어 설정

__최근 검색어 구현__
[x] 최근 검색어, 목록이 탭 아래 위치한다
[x] 목록에서 검색어를 클릭하면 선택된 검색어로 검색 결과 화면으로 이동
[x] 검색일자, 버튼이 있다
[x] 목록에서 x 버튼을 클릭하면 선택된 검색어가 목록에서 삭제
[x] 검색시마다 최근 검색어 목록에 추가된다

### &#127804; 배운 것을 통해 내가 만든 도서검색앱
- 간단한 REST API 통신
---
__reference__
- [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript)
- [Vue](https://kr.vuejs.org/)
