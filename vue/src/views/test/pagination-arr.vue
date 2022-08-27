<template>
    <div>
        <div>
            <ul>
                <li v-for="p in content" :key="p">
                {{p.first}} 
                {{p.last}}  
                {{p.suffix}}
                </li>
            </ul>
            <button 
                :disabled="pageNumber === 0" 
                @click="prevPage">
                Previous
            </button>
            {{pageNumber+1}}
            <button 
                :disabled="pageNumber >= pageCnt -1" 
                @click="nextPage">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const pageNumber = ref(0)

const listData = createFakeData()
const size = 10
const content = computed(() => paginatedData())
const pageCnt = computed(() => pageCount())

function nextPage() {
    pageNumber.value++;
}

function prevPage() {
    pageNumber.value--;
}

function pageCount(){
    let l = listData.length,
        s = size;
    return Math.ceil(l/s);
}

function paginatedData(){
    const start = pageNumber.value * size,
        end = start + size;
    return listData.slice(start, end);
}

function createFakeData(){
    let data = [];
    for(let i = 0; i < 100; i++){
        data.push({first: 'John',
                last:'Doe', 
                suffix:'#' + i});
    }
    return data;
}

</script>

<style scoped>
ul{
  padding: 4px 4px;
  border: 1px solid black;
  
}
li{
  list-style-type:none;
  padding:4px 4px;
}
li:hover{
  background-color:#eee;
}
li:nth-child(2n){
  background-color:#ddd;
}
li:nth-child(2n):hover{
  background-color:#ccc;
}

button{
  width:100px;
  height:40px;
  background-color:#eef;
}

button:hover{
  cursor:pointer;
}
button:hover:disabled{
  cursor:not-allowed;
}
</style>