
import TabView from '../views/TabView.js'
import FormView from '../views/FormView.js'
import HistoryView from '../views/HistoryView.js'
import ResultView from '../views/ResultView.js'

const apiKey = '08f47c215f89ea20492b07610fc231dc'
let query = ''
export default{ 
    

    init(){
        this.selectedTab = '최근 검색어'        

        FormView.setup(document.querySelector('form'))
                .on('@submit',e=>this.onSubmit(e.detail.keyword))
                .on('@reset',e=>this.onResetForm())

        TabView.setup(document.querySelector('#tabs'))
                .on('@change',e=>this.onChangeTab(e.detail.tabName))
                
        HistoryView.setup(document.querySelector('#history-list'))
                    .on('@click',e=>this.onSubmit(e.detail.keyword))
                    .on('@remove',e=>this.onRemove(e.detail.keyword))
        ResultView.setup(document.querySelector('#search-result'))  
                    .on('@click',e=>this.search(this.query,e.detail.page))
        
        this.renderView()
        
    },

    onSubmit(keyword){
        this.query = keyword
        FormView.setForm(keyword)
                
        this.search(keyword)
        
        TabView.hide()        
        HistoryView.hide() 

    },
    search(keyword,page=1){
        HistoryView.saveHistory(keyword)
        console.log('서치서치')
        axios.get('https://dapi.kakao.com/v3/search/book',{
            params: {
                query: keyword,
                page:page
                
            },
            headers: {                
                Authorization: `KakaoAK ${apiKey}`
            }}
        ).then(res=>{
                ResultView.render(res.data,page)
        })
    },
    
    onResetForm(){
        this.selectedTab = '최근 검색어'
        FormView.showResetBtn(false)
        ResultView.resetResult()
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
            HistoryView.hide()
        }    
        
        ResultView.hide()
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