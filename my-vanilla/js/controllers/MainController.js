import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'

import SearchModel from '../models/SearchModel.js'

const tag = '[MainController]'

export default{
    init(){
        // 검색 폼
        FormView.setUp(document.querySelector('form'))
        .on('@submit',e=>this.onSubmit(e.detail))
        .on('@reset',e=>this.onResetForm())

        // 검색결과
        ResultView.setup(document.querySelector('#search-result'))
        this.renderView()

        this.selectedTab = '추천 검색어'
        
        TabView.setActiveTab(this.selectedTab)
    },
    renderView(){
        TabView.setup(document.querySelector('#tabs'))
        
        ResultView.hide()
    },

    onSubmit(input){
        console.log(tag,'onSubmit()',input)

        this.search(input)
    },

    search(query){
        console.log(tag,'search()',query)
        SearchModel.list(query).then(data=>{
            this.onSearchResult(data)
        })
        
    },

    onSearchResult(data){
        ResultView.render(data)
    },

    onResetForm(){
        console.log(tag,'reset()')
        ResultView.hide()
        
    }

}