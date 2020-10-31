import FormView from '../views/FormView.js'

const tag = '[MainController]'

export default{
    init(){
        console.log(tag,'init()')
        FormView.setUp(document.querySelector('form'))
    }
}