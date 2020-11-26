import HistoryView from './HistoryView.js'
import View from './View.js'

const FavoriteView = Object.create(View)
const FAVORITE_LS = 'favorite'
const NO_FAVORITE = '즐겨찾기 목록이 없습니다. 추가해보세요'

let favorites = []

FavoriteView.setup = function(el){
    this.init(el)
    this.loadFavorite()
    return this
}

FavoriteView.loadFavorite = function(){
    let favoriteList = localStorage.getItem(FAVORITE_LS)
    favorites = JSON.parse(favoriteList)
}

FavoriteView.render = function(){
    this.el.innerHTML = favorites.length? this.paintFavoriteList() : NO_FAVORITE
    this.show()    
    this.bindEvent()
}

FavoriteView.paintFavoriteList = function(){
    return favorites.reduce((html,item)=>{
        html += `<a href="${item.url}" target="_blank"><li data-id="${item.id}">                
                <span class="number">#</span>
                    ${item.title}
                <span class="date">${item.author}</span>
                <button class="btn-remove"></button>                
                </li></a>`
        return html                
    },'<ul class="list">')+"</ul>"     
}

FavoriteView.bindEvent = function(){
    Array.from(this.el.querySelectorAll('.btn-remove')).forEach(btn=>{
        btn.addEventListener('click',e=>this.onRemove(e))
    })
}

FavoriteView.saveFavorite = function(bookData){
    
    const id = new Date().getTime()
    const title = bookData.title
    const author = bookData.authors
    const url = bookData.url
    
    let favoriteObj = {title,author,url,id}
    
    favorites.push(favoriteObj)

    localStorage.setItem(FAVORITE_LS,JSON.stringify(favorites))
    // TODO 예쁜 토스트
    //alert('추가되었습니다')//예쁜 토스트 찾기
}

FavoriteView.onRemove = function(e){
    e.preventDefault()
    const id = e.currentTarget.parentElement.dataset.id
    this.emit('@remove',{id})
}

FavoriteView.removeFavorite = function(id){
    let removedList = favorites.filter((ele)=>{
        return ele.id !== id
    })

    favorites = removedList

    localStorage.setItem(FAVORITE_LS,JSON.stringify(favorites))
}
export default FavoriteView