<template>
  <div class="cover">
    <div class="box">
      <div class="header">
        <p>选择图片</p>
        <i class="close"></i>
      </div>
      <div class="box-cotent clear">
        <ul style="min-height: 460px;" class="content-left">
          <li @click="select(i)" :class="[activeGroup===i?'active':'']" v-for="(item,i) in groupList" :key="i">
            {{item.groupName}}({{item.num}})
          </li>
        </ul>
        <div class="content-right">
          sdfsdf
        </div>
      </div>
      <div class="box-footer">
        <span style="margin-right: 300px;margin-left: 30px;">已选0个，可选1个</span>
        <el-button type="success">确定</el-button>
        <el-button type="cancle">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
          activeGroup: 0,
          groupList:[
            {
                groupName: '全部图片',
                num: 23
            },
            {
                groupName: '未分组',
                num: 22
            }
          ]
      }
    },
    props: {},
    methods: {
      select(i){
          this.activeGroup = i;
      }
    },
    computed: {},
    mounted(){
    }
  }
</script>
<style scoped>
  p{
    margin: 0;
  }
  .cover {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    z-index: 1000;
  }

  .box {
    width: 850px;
    height: 580px;
    margin-left: -425px;
    margin-top: -290px;
    background-color: #ffffff;
    position: fixed;
    left: 50%;
    top: 50%;
  }
  .clear:after{
    content: "";
    display: block;
    clear: both;
  }

  .header {
    height: 52px;
    background-color: #f4f5f9;
    position: relative;
    padding: 0 30px;
    line-height: 52px;
    border-bottom: 1px solid #dcdcdc;
  }

  .close {
    width: 16px;
    height: 16px;
    display: inline-block;
    background: url(../../img/base.png) 0 -2445px no-repeat;
    right: 30px;
    top: 50%;
    margin-top: -8px;
    position: absolute;
    cursor: pointer;
  }
  .box-cotent{
    border-bottom: 1px solid #dcdcdc;
  }
  .content-left{
    float: left;
    width: 150px;
    border-right: 1px solid #dcdcdc;
  }
  .content-left li{
    line-height: 30px;
    font-size: 14px;
    text-align: left;
    cursor: pointer;
    box-sizing: border-box;
    padding-left: 20px;
  }
  .content-left li.active{
    background-color: #F4F5F9;
  }
  .content-left li:hover{
    background-color: #F4F5F9;
  }
  .content-right{
    float: left;
  }
  .box-footer{
    line-height: 66px;
  }
</style>
