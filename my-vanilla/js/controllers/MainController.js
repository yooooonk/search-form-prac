import FormView from '../views/FormView.js'

const tag = '[MainController]'

export default{
    init(){
        
        FormView.setUp(document.querySelector('form'))
        .on('@submit',e=>this.onSubmit(e.detail))
    },

    onSubmit(input){
        console.log(tag,'onSubmit()',input)
    }

}