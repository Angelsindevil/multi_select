<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view></router-view> -->
    <p>选中的二级选项的id：{{indexArr}}</p>
    <multiSel :multi-list="list"></multiSel>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import multiSel from '@/components/multiSel'
export default {
  name: 'app',
  components: {
    multiSel
  },
  data(){
    return{
      list:[
        {
            "value": '01',
            "label": '学科名称',
            "children": [
              {
              "value": '11',
              "label": '物理学',
              },
              {
              "value": '12',
              "label": '数学',
              },
              {
              "value": '13',
              "label": '化学',
              }
            ]
        },
        {
            "value": '02',
            "label": '学校名称',
            "children": [
              {
              "value": '21',
              "label": '北京大学',
              },
              {
              "value": '22',
              "label": '清华大学',
              },
              {
              "value": '22',
              "label": '中国科学技术大学',
              }
          ]
        }
      ],
      indexArr:[],
    }
  },
  computed: {
    ...mapGetters({
      indexObj: 'indexObj',
    })
  },
  watch:{
    indexObj:{
       handler: function (val, oldVal) {
        var len=val.length;
        var indexObj=val.indexArr;
        this.indexArr=[];
        // console.log(len);
        for (var i=0;i<len;i++) {
          indexObj[i].map(function(value,index){
            this.indexArr.push(value);
          },this)
        }
        // console.log(this.indexArr);
       },
      deep: true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  text-align: left;
  margin-left: 15px;
}
</style>
