# 	&#127811; Javascript와 Vue로 검색폼 만들기

- 인프런강의 [실습 UI 개발로 배워보는 순수 javascript와 VueJS개발(김정환)](https://www.inflearn.com/course/%EC%88%9C%EC%88%98js-vuejs-%EA%B0%9C%EB%B0%9C-%EA%B0%95%EC%A2%8C) 강의를 보며 공부한 내용입니다

- &#128198; 2020/10/31 ~ 

### 요구사항 분석
__검색폼 구현__
[x] 검색 상품명 입력 폼이 위치한다. 검색어가 없는 경우이므로 x 버튼을 숨긴다
[x] 검색어를 입력하면 x버튼이 보인다
[x] 엔터를 입력하면 검색 결과가 보인다(컨트롤러에게 위임)
[x] x 버튼을 클릭하거나, 검색어를 삭제하면 검색 결과를 삭제한다

__검색 결과 구현__
[x] 검색 결과가 검색폼 아래 위치한다
[x] 검색 결과가 보인다
[x] x버튼을 클릭하면 검색폼이 초기화 되고, 검색 결과가 사라진다
_

### 새로 알게 된 내용
- lite-server : html, css, js의 간단한 구동과 테스트를 가능하게 한다
    - npm install -g lite-server
- Object.create(proto[,propertiesObject]) : 지정된 프로토타입 객체 및 속성(property)을 갖는 새 객체를 만든다
    - 반환값 : 지정된 프로토타입 개체와 속성을 갖는 새로운 개체
- emit : 이벤트를 다른 컴포넌트로 넘김
- reduce의 initial Value
    - arr.reduce(callback[, initialValue])
    - callback의 최초 호출에서 첫 번째 인수에 제공하는 값. 초기값을 제공하지 않으면 배열의 첫 번째 요소를 사용. 빈 배열에서 초기값 없이 reduce()를 호출하면 오류가 발생함
---
__reference__
- [MDN Object.create()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- [MDN Arr.reduce()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)