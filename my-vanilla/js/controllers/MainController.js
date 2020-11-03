import FormView from '../views/FormView.js'

const tag = '[MainController]'

export default{
    init(){
        
        FormView.setUp(document.querySelector('form'))
        .on('@submit',e=>this.onSubmit(e.detail))
        .on('@reset',e=>this.onResetForm())
    },

    onSubmit(input){
        console.log(tag,'onSubmit()',input)
    },

    onResetForm(input){
        console.log(tag,'reset()',input)
        input = ''
    }

}