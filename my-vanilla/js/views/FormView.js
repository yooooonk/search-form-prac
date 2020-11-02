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
    this.inputEl.addEventListener('keyup', e => this.onKeyup(e))
}

FormView.onKeyup = function(e){
    console.log(this.inputEl.value)
    this.showResetBtn(this.inputEl.value.length)
    
    const enter = 13
    if(e.keyCode !== enter){
        return
    }else{
        console.log(this.inputEl.value)
        this.emit('@submit',{input:this.inputEl.value})
    }

}

export default FormView