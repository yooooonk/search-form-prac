export default{
    template:'#tabs',
    props:['tab','selected'],
    methods:{
        onClickTab(tab){
            
            this.$emit('@click',tab)
        }
    },
    mounted(){
        console.log(this.tab)
    }
}