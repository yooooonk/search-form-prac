<template>
    <div v-if="data.length">
        <ul class="list">
            <li v-for="(item, index in data" @click=onClickList(item.keyword)>
                <span class="number" v-if="keywordType">{{index+1}}</span> 
                {{item.keyword}}
                <span class="date" v-if="historyType">{{item.date}}</span> 
                <button class="btn-remove" v-if="historyType" @click.stop="onRemoveList(item.keyword)"></button>
            </li>
        </ul>
    </div>
    <div v-else>
        <span v-if="keywordType">추천 검색어가 없습니다</span>
        <span v-if="historyType">최근 검색어가 없습니다</span>
    </div>
</template>

<script>
export default {
    props:['data','type'],
    computed:{
        keywordType(){
            return this.type === 'keywords'
        },
        historyType(){
            return this.type === 'history'
        }
    },
    methods :{
        onClickList(keyword){
            this.$emit('@click',keyword)
        },
        onRemoveList(keyword){
            this.$emit('@remove',keyword)
        }
    }
}
</script>