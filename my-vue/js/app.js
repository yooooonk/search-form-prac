new Vue({
    el:'#app', // 뷰 인스턴스가 어느 부분에 마운트될것인지 설정
    data:{
        query : ''
    },
    methods:{ // DOM과 바인딩한 함수 정의
        onSubmit(e){
            
        },
        onClickResetBtn(){
            this.query = ''
        }
    }
})