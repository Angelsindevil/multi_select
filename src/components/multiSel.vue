<template>
	<div class="second_list el-select">
		<el-input
      disabled
			class="index_input"
      icon="arrow-down"
      v-model="indexholder"
      :on-icon-click="handleIconClick"
      @click="handleIconClick"
      >
    </el-input>
		<ul v-show="menuShow" @click="menuClick" id="menu">
			<li v-for="(item, index1) in list" @click="changeSub(index1,$event)">
				<span :data-id="item.value">
					<el-checkbox class="checkAll" @change="checkSub(index1,$event)" v-model="outCheck[index1]"></el-checkbox>
					<span class="">{{item.label}}</span>
					<!-- <i class="el-icon-arrow-right"></i> -->
				</span>
				<ul v-show="ulShow[index1]">
					<li v-for="(ele, index2) in item.children">
						<span :data-id="ele.value">
							<el-checkbox class="checkAll" v-model="ulCheck[index1][index2]" @change="ulChange(index1,index2,$event)"></el-checkbox>
							<span>{{ele.label}}</span>
						</span>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
  name: 'second_list',
  props:['multiList'],
  data(){
  	return{
  	  input2:'',
      list:this.multiList,
      ulShow:[],
      ulCheck:[],
      innerCheck:[],
      outCheck:[],
      indexid:[],
      indexObj:{},
      menuShow:false,
      testCheck:[],
      indexholder:"下拉查看已选项目",
  	}
  },
  watch:{
  	ulCheck:{
    	handler: function (val, oldVal) {
    	}
 	},
  },
  methods:{
  	changeSub(index,e){//子表块弹出
  		this.ulShow=this.ulShow.map(function(value,index){
  			return false;
  		})
  		this.ulShow[index]=true;
  	},
  	checkSub(index,e){
  		e.stopPropagation();
  		if(event.target.checked){
  			var trueArr=this.ulCheck[index].map(function(value,index1){
  				return true;
  			},this);
  			this.$set(this.ulCheck,index,trueArr);

  			var indexid=this.list[index].children;
	  		this.indexid=indexid.map(function(value,index){
	  			return value.value;
	  			// this.indexid.push(value.value);
	  		},this)
	  		this.$set(this.indexObj,index,this.indexid);
  		}
  		else{
  			var falseArr=this.ulCheck[index].map(function(value,index1){
  				return false;
  			},this);
  			this.$set(this.ulCheck,index,falseArr);
  			this.$set(this.indexObj,index,[]);
  		}
  	},
  	ulChange(index1,index2,event){
  		var indexid=this.list[index1].children[index2].value;
  		if(event.target.checked){
  			this.indexObj[index1].push(indexid);
        if(this.indexObj[index1].length==this.list[index1].children.length){
          this.$set(this.outCheck,index1,true);
        }
        else{
        }
  		}
  		else{
        this.$set(this.outCheck,index1,false);
  			var index_=this.indexObj[index1].indexOf(indexid);
  			if(index_!=-1){// 已勾选
  				this.indexObj[index1].splice(index_,1);
  			}
  		}
  	},
  	handleIconClick(e){
  		var that=this;
  		e.stopPropagation();
  		this.$nextTick(function(){
  			$("#menu").show();
  			$(document).one("click", function(){
		        $("#menu").hide();
		        var flag;
			    var count=0;
			    for (var i=0;i<that.list.length;i++) {
		     		if(that.indexObj[i].length>0){
		     			flag=true;
		     		}
		     		else{
		     			count++;
		     		}
			    }
			    if(flag){
			    	that.indexholder="下拉查看已选项目";
			    }
			    else if(count==that.list.length){
			    	that.indexholder="请先选择项目";
			    }
			    else{}
		    });
		    that.$store.dispatch('changeIndexObj',{"indexObj":that.indexObj,"length":that.list.length}).then(function(resp){});
  		})
  	},
  	menuClick(e){
  		e.stopPropagation();
  	},
  	copyArr(arr){
	    return arr.map((e)=>{
	        if(typeof e === 'object'){
	            return Object.assign({},e)
	        }else{
	            return e
	        }
	    })
	},
  	getIndexArr(){
      var that=this;
      if(this.list.length>0){
        this.ulShow=this.list.map(function(value,index){
          if(index==0){
            return true;
          }
          else{
            return false;
          }
        })
        this.outCheck=this.list.map(function(value,index){
          return true;
        })
        this.list.map(function(value,index){
          this.innerCheck=value.children.map(function(value1,index1){
            return true;
          })
          var idArr=value.children.map(function(value1,index1){
            return value1.value;
          })
          this.$set(this.indexObj,index,idArr);
          this.$set(this.ulCheck,index,this.innerCheck);
        },this)
        this.$store.dispatch('changeIndexObj',{"indexObj":this.indexObj,"length":this.list.length}).then(function(resp){});
      }
    },
  },
  created(){
  	this.getIndexArr();
  }
}
</script>
<style lang="less">
  .second_list{
    width: 180px;
    position: relative;
    li{
      list-style:none;
    }
    label{
      width:auto!important;
    }
    .checkAll .el-checkbox__input.is-checked .el-checkbox__inner{
      background-color: rgba(85,217,233,.1);
      border-color: rgba(85,217,233,.2);
      &:after{
        border-color:#55d9e9;
      }
    }
    .el-input .el-input__icon{
      color: #55d9e9!important;
      border-left: none;
      &:before{
        content: "\E603";
      }
    }
    .el-input.is-disabled .el-input__inner {
      background-color: #fff;
      border-color: #55d9e9;
      color: #333;
      cursor: default;
    }
    .index_input{
      i{
        text-align: left;
          padding: 0 10px;
          width: 100%;
      }
    }
    .el-input__icon{
      border-left:none;
    }
    >ul{
      padding:10px 0;
      position: absolute;
      width:180px;
      background-color: #fff;
      z-index: 2;
      white-space: nowrap;
        margin: 5px 0;
        border: 1px solid #d1dbe5;
        height: 300px;
      >li{
        padding:8px 15px;
        // position: relative;
        cursor:pointer;
        &:hover,&:active{
          background-color: #f2f2f2;
        }
        >ul{
          padding:10px 0;
          border: 1px solid #d1dbe5;
          border-left:none;
          min-width:200px;
          position: absolute;
          left:181px;
          top:-1px;
          // display:none;
          height: 300px;
          overflow:auto;
          background-color: #fff;
          >li{
            color:#454545;
            padding:8px 15px;
          }
        }
        &:after{
          font-family: element-icons;
            content: "\E606";
            font-size: 12px;
            transform: scale(.8);
            color: #bfcbd9;
            position: absolute;
            right: 10px;
            margin-top: 1px;
            // top:8px;
        }
      }
      li{
        font-size: 14px;
        label{
          width:auto!important;
          margin-right:10px;
        }
        .checkAll{
          padding:0;
          .el-checkbox__input{
            line-height: 0;
            vertical-align: bottom;
          }
        }
      }
    }
  }
</style>