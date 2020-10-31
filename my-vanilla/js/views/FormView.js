import View from './View.js'

const tag = ['formView'] // 디버깅을 위한 tag

const FormView = Object.create(View) // View 객체 복사

FormView.setUp = function(el){
    this.init(el); // el가 set된 객체 리턴
    this.inputEl = el.querySelector('[type=text]')
    this.resetEl = el.querySelector('[type=reset]')
    this.showResetBtn(false)
}

FormView.showResetBtn = function(show = true){
    this.resetEl.style.display = show? 'block':'none'
}

export default FormView