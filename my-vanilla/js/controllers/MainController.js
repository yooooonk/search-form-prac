import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js'
import HistoryView from '../views/HistoryView.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'
import HistoryModel from '../models/HistoryModel.js'

const tag = '[MainController]'

export default{
    init(){
        // 검색 폼
        FormView.setUp(document.querySelector('form'))
        .on('@submit',e=>this.onSubmit(e.detail))
        .on('@reset',e=>this.onResetForm())

        // 검색결과        
        ResultView.setup(document.querySelector('#search-result'))
        
        // 탭
        TabView.setup(document.querySelector('#tabs'))
                .on('@change',e=>this.onChangeTab(e.detail.tabName))
        
        this.selectedTab = '최근 검색어'
        
        // 추천검색어
        KeywordView.setup(document.querySelector('#search-keyword'))
                    .on('@click',e=>this.onClickKeyword(e.detail.keyword))

        // 최근검색어
        HistoryView.setup(document.querySelector('#search-history'))
                    .on('@click',e=>this.onClickHistory(e.detail.keyword))
        
        this.renderView()
        
    },
    renderView(){        
        TabView.setActiveTab(this.selectedTab)

        if(this.selectedTab === '추천 검색어'){
            this.fetchSearchKeyword()
            
        }else{
            this.fetchSearchHistory()
        }
        ResultView.hide()
    },

    onSubmit(input){
        console.log(tag,'onSubmit()',input)

        this.search(input)
    },

    search(query){
        FormView.setValue(query)
        SearchModel.list(query).then(data=>{
            this.onSearchResult(data)
        })
        
    },

    onSearchResult(data){
        TabView.hide()
        KeywordView.hide()
        ResultView.render(data)
    },

    onResetForm(){
        console.log(tag,'reset()')
        this.renderView()
        
    },

    onChangeTab(tabName){
        console.log(tabName)
    },

    fetchSearchKeyword(){
        KeywordModel.list().then(data=>{
            KeywordView.render(data)
        })
    },

    fetchSearchHistory(){
        HistoryModel.list().then(data=>{
            HistoryView.render(data)
        })
    },

    onClickKeyword(keyword){
        
        this.search(keyword)
    },

    onClickHistory(keyword){
        
        this.search(keyword)
    }
}