import View from './View.js'

const tag = ['formView'] // 디버깅을 위한 tag

const FormView = Object.create(View) // View 객체 복사

FormView.setUp = function(el){
    this.init(el); // el가 set된 객체 리턴
    this.inputEl = el.querySelector('[type=text]')
    this.resetEl = el.querySelector('[type=reset]')
    this.showResetBtn(false)
    this.bindEvents()
    return this
}

FormView.showResetBtn = function(show = true){
    this.resetEl.style.display = show? 'block':'none'
}

FormView.bindEvents = function(){
    this.on('submit', e => e.preventDefault())
    this.inputEl.addEventListener('keyup', e => this.onKeyup(e))
    this.resetEl.addEventListener('click',e=>this.onclickReset())
}

FormView.onclickReset = function(e){
    
    this.emit('@reset')    
    this.showResetBtn(false)
},

FormView.onKeyup = function(e){
    
    // 내용이 있으면 리셋버튼 나옴
    this.showResetBtn(this.inputEl.value.length)
    
    // 엔터치면 검색어
    const enter = 13
    if (e.keyCode !== enter) return     
    this.emit('@submit',{input:this.inputEl.value})    

    // 내용이 없을 때 폼 리셋
    if(!this.inputEl.value.length) this.emit('@reset')
}

export default FormView