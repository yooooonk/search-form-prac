import View from './View.js'

const TabView = Object.create(View)

TabView.setup = function(el){
    this.init(el)
    this.bindEvent()

    return this
}

TabView.bindEvent = function(){
    Array.from(this.el.children).forEach((li)=>{
        li.addEventListener('click',e=>this.onClickTab(li.innerHTML))
    })
}

TabView.onClickTab = function(tabName){
    this.setActiveTab(tabName)
    this.emit('@change',{tabName})
},

TabView.setActiveTab = function(tabName){
    Array.from(this.el.children).forEach(li=>{
        li.className = li.innerHTML === tabName? 'active':''
    })
    this.show()
}

export default TabView