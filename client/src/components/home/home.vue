<template>
    <div>
        <header>
          <div style="border:1px solid red;height: 100%;width: 1200px;margin: 0 auto;display: flex;justify-content: space-between;">
            <div>
            </div>
            <div style="line-height: 60px;">
              退出
            </div>
          </div>
        </header>

      <div class="box">
        <div class="menu" :class="">
          <Menu mode="horizontal" @on-select="onselect" :theme="theme3" active-name="1">
            <Menu-item name="1">
              <Icon type="ios-paper"></Icon>
              内容管理
            </Menu-item>
            <Menu-item name="2">
              <Icon type="ios-people"></Icon>
              文章管理
            </Menu-item>
            <Menu-item name="3">
              <Icon type="settings"></Icon>
              综合设置
            </Menu-item>
          </Menu>
        </div>
          <div class="content">
            <m-img v-if="activeName==='1'"></m-img>
            <marticle v-if="activeName==='2'"></marticle>
          </div>
        </div>
    </div>
</template>
<script>
  import mImg from '../mImg'
  import marticle from '../marticle'
  console.log(mImg);
  export default{
      data(){
          return {
            theme3: 'light',
            activeName: '3'
          }
      },
      components:{
          mImg,marticle
      },
      props: {},
      methods: {
        onselect(name){
          console.log(name);
          this.activeName = name;
        }
      },
      computed: {},
      mounted(){
      }
  }
</script>
<style scoped>
  header{
    height: 60px;
    width: 100%;
    background-color: #FFFFFF;
  }
  .box{
    width: 1200px;
    background-color: #FFFFFF;
    border-color: #aaaaaa;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    /*display: flex;*/
  }
  .content{
    margin: 20px;
    width: 1160px;
    border: 1px solid #d3d3d3;
  }
</style>
