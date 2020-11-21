<template>
<div>
  <header>
        <h2 class="container">검색</h2>
  </header>
  <div class="container">
      <search-form :value="query" v-on:@submit="onSubmit" v-on:@reset="resetForm"></search-form>
      <div class="content">       
          <div v-if="submitted">
            <search-result v-bind:data="searchResult" v-bind:query="query"></search-result>
          </div>
          <div v-else>
            <tabs :tab="tabs" :selected="selectedTab" v-on:@click=onClickTab></tabs>
            
            <div v-if="selectedTab === tabs[0]">
                <list :data="keywords" type="keywords" v-on:@click="onClickKeyword"></list>
            </div>
            <div v-else>
                <list :data="history" type="history" v-on:@click="onClickKeyword" v-on:@remove="onClickHistoryRemoveBtn"></list>
            </div> 
            
        </div> 
      </div>
  </div>
</div>


</template>

<script>
import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

import FormComponent from './components/FormComponent.vue'
import ResultComponent from './components/ResultComponent.vue'
import TabComponent from './components/TabComponent.vue'
import ListComponent from './components/ListComponent.vue' 

export default {
  name: 'app',
  components:{
    'search-form':FormComponent,
    'search-result':ResultComponent,
    'tabs':TabComponent,
    'list':ListComponent
   
  },
  data () {
    return {
       query : '',
        submitted : false,
        searchResult : '',
        tabs :['추천 검색어', '최근 검색어'],
        selectedTab:'',
        keywords : '',
        history:'' 
    }
  },
    methods:{ // DOM과 바인딩한 함수 정의
        fetchRecommend(){
            KeywordModel.list().then(data=>{
                this.keywords = data
            })
        },
        fetchHistory(){
            HistoryModel.list().then(data=>{
                this.history = data
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
}
</script>
