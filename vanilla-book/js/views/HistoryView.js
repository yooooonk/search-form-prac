import View from './View.js'

const HistoryView = Object.create(View)
const HISTORY_LS = 'history'
const NO_HISTORY = '최근 검색어가 없습니다'

let historys = []

HistoryView.setup = function(el){
    this.init(el)
    
    this.loadHistory()
    return this
}

HistoryView.loadHistory = function(){

    let historyList = localStorage.getItem(HISTORY_LS);    
    this.historys = JSON.parse(historyList);
    
},

HistoryView.render = function(){    
    
    this.el.innerHTML = this.historys.length? this.paintHistoryList() : NO_HISTORY
    this.show()
    this.bindEvent()

    return this
}

HistoryView.paintHistoryList = function(){       
    
    return this.historys.reduce((html,item,idx)=>{
        
        html += `<li data-keyword="${item.keyword}">                
                <span class="number">${idx+1}</span>
                ${item.keyword}
                <span class="date">${item.date}</span>
                <button class="btn-remove"></button>                
                </li>`
        return html                
    },'<ul class="list">')+"</ul>" 
}

HistoryView.saveHistory = function(keyword){
    
    let dateObj = new Date()
    let mm = dateObj.getMonth()+1
    let dd = dateObj.getDate()
    let date = `${mm}.${dd}`
    
    let historyObj ={
        keyword,
        date
    }
     
    this.checkHistoryList(keyword)

    this.historys.unshift(historyObj);

    localStorage.setItem(HISTORY_LS,JSON.stringify(this.historys)); 
}

HistoryView.checkHistoryList = function(keyword){
    if(this.historys.length>=10){
        this.historys.pop()
    }
    
    this.removeKeyword(keyword)    
}

HistoryView.removeKeyword = function(keyword){
    let removedHistorys = this.historys.filter(ele=>{
        return ele.keyword !== keyword
    })

    this.historys = removedHistorys
}

HistoryView.bindEvent = function(){
    
    Array.from(this.el.querySelectorAll('li')).forEach(li=>{
        li.addEventListener('click',e=>this.onClickKeyword(e.currentTarget.dataset.keyword))
        li.lastElementChild.addEventListener('click',e=>this.onRemove(e))
    })
}

HistoryView.onClickKeyword = function(keyword){
    this.emit('@click',{keyword})
}

HistoryView.onRemove = function(e){
    e.stopPropagation()    
    let keyword = e.target.parentNode.dataset.keyword
    this.emit('@remove',{keyword})
      
}

HistoryView.removeHistory = function(keyword){
    this.removeKeyword(keyword)

    localStorage.setItem(HISTORY_LS,JSON.stringify(this.historys)); 
}

export default HistoryView