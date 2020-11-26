import HistoryView from './HistoryView.js'
import View from './View.js'

const FavoriteView = Object.create(View)
const FAVORITE_LS = 'favorite'
const NO_FAVORITE = '즐겨찾기 목록이 없습니다. 추가해보세요'
const ADD_MSG = `즐겨찾기에 추가했습니다 `
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
    this.el.innerHTML = favorites.length? this.paintFavoriteList() : `<div class="no-data">${NO_FAVORITE}&#127752;</div>`
    this.show()    
    this.bindEvent()
}

FavoriteView.paintFavoriteList = function(){
    return favorites.reduce((html,item)=>{
        html += `<a href="${item.url}" target="_blank">
                <li class="fav" id="fav" data-id="${item.id}" draggable="true">
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

   /*  Array.from(this.el.querySelectorAll('.fav')).forEach(li=>{
        li.setAttribute('draggable',true)
        li.addEventListener('dragstart',this.handleDragStart,false)
        li.addEventListener('dragenter',this.handleDragEnter,false)
        li.addEventListener('dragover',this.handleDragOver,false)
        li.addEventListener('dragleave',this.handleDragLeave,false)
        li.addEventListener('drop',this.handleDrop,false)
        li.addEventListener('dragend',this.handleDragEnd,false)
    }) */
}

FavoriteView.saveFavorite = function(bookData){
    
    const id = new Date().getTime()
    const title = bookData.title.substr(0,18).concat('...')
    const author = bookData.authors
    const url = bookData.url
    
    let favoriteObj = {title,author,url,id}
    
    favorites.push(favoriteObj)

    localStorage.setItem(FAVORITE_LS,JSON.stringify(favorites))
    
    this.openToast()
}

let removeToast ;

FavoriteView.openToast = function(){
    const toast = document.getElementById('toast')

    if(toast.classList.contains('reveal')){
        clearTimeout(removeToast)

        removeToast = setTimeout(()=>{toast.classList.remove('reveal')},1000)
    }else{
        removeToast = setTimeout(()=>{ toast.classList.remove('reveal')},1000)
    }

    toast.classList.add("reveal")
    toast.innerText = ADD_MSG
}

FavoriteView.onRemove = function(e){
    e.preventDefault()
    const id = e.currentTarget.parentElement.dataset.id
    this.emit('@remove',{id})
}

FavoriteView.removeFavorite = function(id){
    let removedList = favorites.filter((ele)=>{
        
        return ele.id !== parseInt(id,10)
    })

    favorites = removedList

    localStorage.setItem(FAVORITE_LS,JSON.stringify(favorites))
}

// 드래그 앤 드롭 관련 소스
let li = document.querySelectorAll('.fav')
console.log(li)
let dragScrcEl_ = null;

FavoriteView.handleDragStart = function(e){
    //TODO : this가 아마 이 객체? e.currentTarget 그튼걸로 대체해봐
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html',this.innerHTML)
    dragScrcEl_ = this;
    this.classList.add('moving')
}

FavoriteView.handleDragOver = function(e){
    if(e.preventDefault){
        e.preventDefault()
    }

    e.dataTransfer.dropEffect = 'move'
    return false
}

FavoriteView.handleDragEnter = function(e){
    //TODO
    this.classList.add('over')
}

FavoriteView.handleDragLeave = function(e){
    this.classList.remove('over')
}

FavoriteView.handleDrop = function(e){
    if(e.stopPropagation){
        e.stopPropagation()
    }
    if(dragScrcEl_ != this){
        dragScrcEl_.innerHTML = this.innerHTML
        this.innerHTML = e.dataTransfer.getData('text/html');
        
    }
    return false
}

FavoriteView.handleDragEnd = function(e){
    Array.from(li).forEach.call(li,(col)=>{
        col.classList.remove('over')
        col.classList.remove('moving')
    })
}




export default FavoriteView