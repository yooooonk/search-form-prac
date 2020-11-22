
import TabView from '../views/TabView.js'
import FormView from '../views/FormView.js'
import HistoryView from '../views/HistoryView.js'

const apiKey = '08f47c215f89ea20492b07610fc231dc'

export default{ 

    init(){
        this.selectedTab = '최근 검색어'        

        FormView.setup(document.querySelector('form'))
                .on('@submit',e=>this.onSubmit(e.detail.keyword))
                .on('@reset',e=>this.onResetForm())

        TabView.setup(document.querySelector('#tabs'))
                .on('@change',e=>this.onChangeTab(e.detail.tabName))
                
        HistoryView.setup(document.querySelector('#history-list'))
                    .on('@click',e=>this.search(e.detail.keyword))
                    .on('@remove',e=>this.onRemove(e.detail.keyword))
                
        this.renderView()
        
    },

    onSubmit(keyword){
        this.search(keyword)
    },
    search(keyword){        
        HistoryView.saveHistory(keyword)

        axios.get('https://dapi.kakao.com/v3/search/book',{
            params: {
                query: keyword
            },
            headers: {                
                Authorization: `KakaoAK ${apiKey}`
            }}).then(res=>{
            console.log(res)
        })
    },
    
    onResetForm(){
        this.selectedTab = '최근 검색어'
        FormView.showResetBtn(false)
        this.renderView()
    },
    onChangeTab(e){
        this.selectedTab = e;
        this.renderView()
    },
    renderView(){
        TabView.setActiveTab(this.selectedTab)

        if(this.selectedTab === '최근 검색어'){
            this.fetchHistoryList()
        }else{
            this.fetchFavoriteList()
        }        
    },
    fetchHistoryList(){
        HistoryView.render()
    },
    fetchFavoriteList(){
        console.log('즐겨찾기쓰')
    },
    onRemove(keyword){
        HistoryView.removeHistory(keyword)
        this.renderView()
    }
}