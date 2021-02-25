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
    if(!favoriteList){
        localStorage.setItem(FAVORITE_LS,JSON.stringify(new Array()))
    }
    favorites = JSON.parse(favoriteList)
}

FavoriteView.render = function(){
    this.el.innerHTML = favorites.length? this.paintFavoriteList() : `<div class="no-data">${NO_FAVORITE}&#127752;</div>`
    this.show()    
    this.bindEvent()
}

FavoriteView.paintFavoriteList = function(){
    return favorites.reduce((html,item,idx)=>{

        html += `<a href="${item.url}" target="_blank">
                <li class="fav" id="fav" data-id="${item.id}" data-idx="${idx}" draggable="true"  >
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

    Array.from(this.el.querySelectorAll('.fav')).forEach(li=>{
        li.addEventListener('dragstart',e=>this.handleDragStart(e))        
        li.addEventListener('dragenter',e=>this.setDraggedOver(e))
        li.addEventListener('dragend',e=>this.handleDragEnd(e))
        
    }) 
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


let dragging, draggedOver;

FavoriteView.handleDragStart = function(e){    
    
    e.stopPropagation()
    
    let target = e.currentTarget;
    
     dragging = target.dataset.idx
     target.classList.add('dragging')
 }
 

FavoriteView.setDraggedOver = function(e){    
    e.preventDefault()    

    let target = e.currentTarget;
    draggedOver = target.dataset.idx
}

FavoriteView.handleDragEnd = function(e){
    e.stopPropagation()
        
    let draggingObj = favorites.splice(dragging,1);
    favorites.splice(draggedOver,0,draggingObj[0])
    localStorage.setItem(FAVORITE_LS,JSON.stringify(favorites))
    this.render()
    
}







export default FavoriteView