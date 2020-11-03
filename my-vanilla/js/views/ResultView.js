import View from './View.js'

const tag = '[ResultView]'

const ResultView = Object.create(View) // 지정된 프로토타입 및 속성을 갖는 새로운 객체를 만든다

ResultView.setup = function(el){
    this.init(el) // View.js의 init()
}


ResultView.render = function(data=[]){ 
    console.log(tag,'render()',data)
    this.el.innerHTML = data.length? this.getSearchResultHtml(data) : '검색 결과가 없습니다'

}

ResultView.getSearchResultHtml = function(data){
    debugger
}

export default ResultView