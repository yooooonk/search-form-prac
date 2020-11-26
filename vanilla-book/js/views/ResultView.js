import View from './View.js'

const ResultView = Object.create(View)

const NO_RESULT = '검색결과가 없습니다'


ResultView.isEnd = false;
ResultView.page = 1;
ResultView.div_bookList = document.getElementById('book-list')
ResultView.btn_more = document.getElementById('btn_more')
ResultView.keyword = ''

ResultView.setup = function(el){
    this.init(el)
    btn_more.addEventListener('click',e=>this.onClickMoreBtn(e))
    
    return this
}

ResultView.render = function(data,page){
    this.btn_more.style.display = data.meta.is_end? 'none':''
    
    this.page = page
    this.div_bookList.innerHTML = data.documents.length? this.div_bookList.innerHTML+this.paintResult(data.documents) : `<div class="no-data">${NO_RESULT}&#127752;</div>`

    let favoriteBtn = document.querySelectorAll('.card-header-is_closed')

    for(let btn of favoriteBtn){
        btn.addEventListener('click',e=>this.onClickFavoriteBtn(e))
        
    }
    
    this.show()    
}

ResultView.onClickFavoriteBtn = function(e){
    e.preventDefault()

    const title = e.currentTarget.children[0].value;
    const authors = e.currentTarget.children[1].value
    const url = e.currentTarget.children[2].value

   this.emit('@favorite',{title,authors,url})
}


ResultView.onClickMoreBtn = function(e){    
    
    this.page++    
    this.emit('@click',{page:this.page})
},

ResultView.paintResult = function(data){
    
    return data.reduce((html,ele)=>{
        
        return html += `<a class="book" href="${ele.url}" target="_blank">
                        <div class="card">  
                        <div class="card-header" style="background-image : url('${ele.thumbnail}'); background-size:100% 280px; background-repeat:no-repeat">
                            <div class="card-header-is_closed" value="${ele.title}">
                                <input type="hidden" value="${ele.title}">
                                <input type="hidden" value="${ele.authors}">
                                <input type="hidden" value="${ele.url}">
                                <div class="card-header-text">+</div>
                            </div>
                        </div>
                        <div class="card-body">     
                            <div class="card-body-header">
                                <h1>${ele.title}</h1>
                                <p class = "card-body-nickname">${ele.authors}</p>
                            </div>
                            <p class="card-body-description">
                                ${ele.contents}
                            </p>
                            <div class="card-body-footer">
                                <hr style="margin-bottom: 8px; opacity: 0.5; border-color: #EF5A31">
                                <span class="card-footer-pub">&#128212; ${ele.publisher} </span>
                                <span class="card-footer-date"> ${ele.datetime.substr(0,ele.datetime.indexOf('T'))}</span>
                                <span class="card-footer-price">&#128184; ${ele.price}원 </span>
                                
                            </div>
                        </div>
                        </div>  
                        </a>`
    },' ')+' '
    
}



ResultView.resetResult = function(){
    this.div_bookList.innerHTML =''
}

export default ResultView

