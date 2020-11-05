import View from './View.js'

const tag = '[TabView]'

const TabView = Object.create(View)

TabView.setup = function(el){
    console.log(tag,el)
    this.init(el)
    return this
}

TabView.setActiveTab = function(tabName){
    console.log(tag,tabName)
    Array.from(this.el.querySelectorAll('li')).forEach(li=>{
        li.className = li.innerHTML === tabName? 'active':''
    })
}

export default TabView