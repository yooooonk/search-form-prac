import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

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
    created(){
        this.selectedTab = this.tabs[0]

        this.fetchRecommend()

        this.fetchHistory()
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
        onSubmit(e){
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
        },
        onClickTab(tab){
            this.selectedTab = tab
        },
        onClickKeyword(keyword){
            this.query = keyword
            this.search()
        }

    }
})