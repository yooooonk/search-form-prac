# 	&#127811; Javascript와 Vue로 검색폼 만들기

- 인프런강의 [실습 UI 개발로 배워보는 순수 javascript와 VueJS개발(김정환)](https://www.inflearn.com/course/%EC%88%9C%EC%88%98js-vuejs-%EA%B0%9C%EB%B0%9C-%EA%B0%95%EC%A2%8C) 강의를 보며 공부한 내용입니다

- &#128198; 2020/10/31 ~ 

### 요구사항 분석
__검색폼 구현__
[x] 검색 상품명 입력 폼이 위치한다. 검색어가 없는 경우이므로 x 버튼을 숨긴다
[x] 검색어를 입력하면 x버튼이 보인다
[] 엔터를 입력하면 검색 가 보인다
[] x 버튼을 클릭하거나, 검색어를 삭제하면 검색 결과를 삭제한다

### 새로 알게 된 내용
- lite-server : html, css, js의 간단한 구동과 테스트를 가능하게 한다
    - npm install -g lite-server
- Object.create(proto[,propertiesObject]) : 지정된 프로토타입 객체 및 속성(property)을 갖는 새 객체를 만든다
    - 반환값 : 지정된 프로토타입 개체와 속성을 갖는 새로운 개체

---
__reference__
- [MDN Object.create()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- 