<template>
  <div @click.stop v-if="show" class="box edit-box">
    <p>{{labelName}}</p>
    <input class="text" v-model="text" type="text">
    <div class="button-box" style="">
      <div class="sure" @click="sure">确定</div>
      <div class="cancel" @click="cancel">取消</div>
    </div>
    <div class="arrow-top"></div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        text: ''
      }
    },
    props: {
      labelName: {
        type: String,
        default: function () {
          return '备注名称'
        }
      },
      show: {
          type: Boolean,
          default: function(){
              return false;
          }
      },
      eValue:{
          type: String,
          default: function(){
              return '';
          }
      }
    },
    computed:{
    },
    methods: {
      sure(){
          this.$emit('sure',this.text);
      },
      cancel(){
          this.$emit('cancel');
      }
    },
    computed: {},
    mounted(){
        window.addEventListener('click',(e)=>{
          var obj = e.target || e.srcElement;
          if ( obj.className.toLowerCase() != 'box edit-box'){
            this.$emit('closeAll')
          }
        })
    }
  }
</script>
<style scoped>
  .box {
    width: 300px;
    box-sizing: border-box;
    padding: 30px;
    border: 1px solid #d3d3d3;
    position: absolute;
    left: 50%;
    margin-left: -150px;
    z-index: 1;
    background-color: #ffffff;
    top: 24px;
    cursor: auto;
  }

  .text {
    width: 231px;
    height: 32px;
    padding: 8px 10px;
    box-sizing: border-box;
    border: 1px solid #d3d3d3;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .arrow-top {
    position: absolute;
    left: 50%;
    margin-left: -10px;
    margin-top: -8px;
    display: inline-block;
    width: 0;
    height: 0;
    border-width: 8px;
    border-style: dashed;
    border-color: transparent;
    border-top-width: 0;
    border-bottom-color: #d9dadc;
    border-bottom-style: solid;
    border-bottom-color: #fff;
    top: 1px;
    z-index: 3;
  }

  .button-box {
    display: flex;
    justify-content: space-around;
  }
  .button-box>div{
    width: 105px;
    line-height: 33px;
    text-align: center;
    cursor: pointer;
    border-radius: 10px;
  }
  .sure{
    background-color: #00c261;
    color: #fff;
  }
  .cancel{
    border: 1px solid #d3d3d3;
    color: #000000;
  }
</style>
