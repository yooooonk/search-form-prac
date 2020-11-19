import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

import FormComponent from './components/FormComponent.js'
import ResultComponent from './components/ResultComponent.js'

new Vue({
    el:'#app', // 뷰 인스턴스가 어느 부분에 마운트될것인지 설정
    data:{
        query : '',
        submitted : false,
        searchResult : '',
        tabs :['추천 검색어', '최근 검색어'],
        selectedTab:'',
        recommondList : '',
        historyList:''        
    },
    components:{
        'search-form':FormComponent,
        'search-result':ResultComponent
    },
    methods:{ // DOM과 바인딩한 함수 정의
        fetchRecommend(){
            KeywordModel.list().then(data=>{
                this.recommondList = data
            })
        },
        fetchHistory(){
            HistoryModel.list().then(data=>{
                this.historyList = data
            })
        },
        onSubmit(query){
            this.query = query
            this.search()
        },
        onKeyup(){
            if(!this.query.legnth){
                this.onClickResetBtn()
            }
        },
        onClickResetBtn(){
            this.resetForm()
        },        
        resetForm(){
            this.query = ''
            this.searchResult=''
            this.submitted=false
        },
        search(){
            this.submitted = true;                        
            SearchModel.list().then(data=>{
                
                this.searchResult = data
            })

            HistoryModel.add(this.query)
            this.fetchHistory()
        },
        onClickTab(tab){
            this.selectedTab = tab
        },
        onClickKeyword(keyword){
            this.query = keyword
            this.search()
        },
        onClickHistoryRemoveBtn(history){
                        
            HistoryModel.remove(history)
            this.fetchHistory()
        }

    },
    created(){
        this.selectedTab = this.tabs[0]

        this.fetchRecommend()

        this.fetchHistory()
    }
})