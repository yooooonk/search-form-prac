export default{
    template : '#search-form',
    props:['value'],
    data(){
        return{
            inputValue: this.value
        }
    },
    watch:{
        value(newVal, oldVal){
            this.inputValue = newVal
        }
    },
    methods:{
        onSubmit(){
            this.$emit('@submit',this.inputValue.trim())
        },
        onClickResetBtn(){
            this.inputValue = ''
            this.$emit('@reset')
        },
        onKeyup(){
            if(this.inputValue.length === 0){
                this.$emit('@reset')
            }
        }
    }
}