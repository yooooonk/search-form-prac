import KeywordView from './KeywordView.js'

const tag = ['HistoryView'];

const HistoryView = Object.create(KeywordView);

HistoryView.messages={
    NO_HISTORY : '검색 이력이 없습니다'
}

HistoryView.getKeywordsHtml = function(data){
    return data.reduce((html, item,idx)=>{
        html += `<li data-keyword="${item.keyword}">            
            ${item.keyword}
            <span class="date">${item.date}</span>
            <button class="btn-remove"></button>
        </li>`

        return html
    },'<ul class="list">')+'</ul>'
}

HistoryView.bindRemoveBtn = function(){
    Array.from(this.el.querySelectorAll('button')).forEach(btn=>{
        btn.addEventListener('click',e=>{
            e.stopPropagation()
            this.onRemove(btn.parentElement.dataset.keyword)
        })
    })
}

HistoryView.onRemove = function(keyword){
    
    this.emit('@remove',{keyword})

}

export default HistoryView