<template>
     <ul class="tabs">
        <li v-for="(tab,idx) in tab" 
            :class="{active:tab===selected}" 
            @click="onClickTab(tab)"
            :value=idx>
            {{tab}}
        </li>
    </ul>
</template>

<script>
export default {
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
</script>