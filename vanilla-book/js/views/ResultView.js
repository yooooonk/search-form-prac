import View from './View.js'

const ResultView = Object.create(View)

const NO_RESULT = '검색결과가 없습니다'

ResultView.setup = function(el){
    this.init(el)

    return this
}

ResultView.render = function(data){
    console.log('resultview render',data.length)
    this.el.innerHTML = data.length? this.paintResult(data): NO_RESULT
    this.show()    
}

ResultView.paintResult = function(data){
    /*
    authors: ["광진"]
contents: "Daum 웹툰 화제작 『이태원 클라쓰』 단행본 4권 출간! ‘꿀밤’과 ‘장가’, 서로를 향해 움직이기 시작하다.   ‘조이서’의 경영 아래 확 바뀐 ‘꿀밤’은 점점 입소문이 나기 시작하고 사람들이 몰리면서 장사도 잘되게 된다. ‘꿀밤’의 긍정적인 변화가 신경 쓰이기 시작한 ‘장가’의 ‘장대희’ 회장. 그는 ‘수아’에게 그 원인을 찾아보라 지시하고, 꿀밤에 찾아가 ‘박새로이’와 마주하게 된다.   한편, ‘장가’를 무너뜨리기 위한 큰 그림 그려놓은 ‘새로이"
datetime: "2018-03-27T00:00:00.000+09:00"
isbn: "1162790024 9791162790021"
price: 13000
publisher: "영컴"
sale_price: 11700
status: "정상판매"
thumbnail: "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1605589%3Ftimestamp%3D20201118143635"
title: "이태원 클라쓰. 4"
translators: []
url: "https://search.daum.net/search?w=bookpage&bookId=1605589&q=%EC%9D%B4%ED%83%9C%EC%9B%90+%ED%81%B4%EB%9D%BC%EC%93%B0.+4"
    */
    return data.reduce((html,ele,idx)=>{
        return html += `<div class="book">
                        <div>     
                        <img src="${ele.thumbnail}">                             
                        </div>
                        <div class="cell">
                            <h4><b> ${ele.title}</b></h4>
                            <p>작가 : ${ele.authors[0]} 외 ${ele.authors.length-1} <p>
                        </div>`
    },'<div class="card">')+"</div>"
    
}

export default ResultView

/*
<li class="book">
                            <h4>${ele.title}</h4>
                            <br>
                            작가 : ${ele.authors[0]} 외 ${ele.authors.length-1}                            
                        </li>
*/