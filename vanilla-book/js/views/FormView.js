import View from './View.js'

const FormView = Object.create(View)

FormView.setup = function(el){
    this.init(el)
    this.inputEl = el.querySelector('[type=text]')
    this.resetEl = el.querySelector('[type=reset]')
    
    this.showResetBtn(false)
    this.bindEvents()
        
    return this
}

FormView.bindEvents = function(){
    this.on('submit',e=>e.preventDefault())
    this.inputEl.addEventListener('keyup',e=>this.onKeyup(e))
    this.resetEl.addEventListener('click',e=>this.onClickReset())    
}

FormView.onKeyup = function(e){
    let keywordLength = e.target.value.length;
    // 길이가 0일때 reset
    if(keywordLength === 0){
        this.emit('@reset')
    }

    // reset 버튼 노출
    this.showResetBtn(keywordLength)
    // 엔터 치면 검색!
    const enter = 13
    if(e.keyCode !== enter) return
    
    this.emit('@submit',{keyword:this.inputEl.value})
}

FormView.onClickReset = function(e){
    this.emit('@reset')
}

FormView.showResetBtn = function(show=true){
    this.resetEl.style.display = show? 'block':'none'
}

FormView.setForm = function(keyword){
    this.inputEl.value = keyword
    this.showResetBtn(true)
    
}

export default FormView