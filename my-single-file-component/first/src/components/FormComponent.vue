<template>
    <form @submit.prevent="onSubmit">
        <input type="text" v-model="inputValue" placeholder="검색어를 입력하세요" autofocus @keyup="onKeyup">
        <button type="reset" @click="onClickResetBtn" v-show="inputValue.length" class="btn-reset"></button>
    </form>
</template>

<script>
export default {
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
</script>