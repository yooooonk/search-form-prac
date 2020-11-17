import SearchModel from './models/SearchModel.js'

new Vue({
    el:'#app', // 뷰 인스턴스가 어느 부분에 마운트될것인지 설정
    data:{
        query : '',
        submitted : false,
        searchResult : ''
        
    },
    methods:{ // DOM과 바인딩한 함수 정의
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
        }
    }
})