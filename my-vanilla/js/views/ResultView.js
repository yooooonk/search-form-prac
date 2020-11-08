import View from './View.js'

const tag = '[ResultView]'

const ResultView = Object.create(View) // 지정된 프로토타입 및 속성을 갖는 새로운 객체를 만든다

ResultView.setup = function(el){
    this.init(el) // View.js의 init()
}


ResultView.render = function(data=[]){ 
    console.log(tag,'render()',data)
    this.el.innerHTML = data.length? this.getSearchResultHtml(data) : '검색 결과가 없습니다'
    this.show()

}

ResultView.getSearchResultHtml = function(data){
    return data.reduce((html, item)=>{
        html += this.getSearchItemHtml(item)
        return html
    },'<ul>')+'</ul>'
}

ResultView.getSearchItemHtml = function(item){
    return `<li>
                <img src='${item.image}'>
                <p>${item.name}
            </li>`
}

export default ResultView