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
          <div class="menu">
            <Menu :theme="theme3" :active-name="activeName" @on-select="onselect">
              <Menu-group title="内容管理">
                  <Menu-item name="1" @click="activeName=1">
                      <Icon type="document-text"></Icon>
                      素材管理
                  </Menu-item>
                  <Menu-item name="2" @click="activeName=2">
                      <Icon type="chatbubbles"></Icon>
                      用户管理
                  </Menu-item>
              </Menu-group>
              <Menu-group title="统计分析">
                  <Menu-item name="3" @click="activeName=3">
                      <Icon type="heart"></Icon>
                      用户留存
                  </Menu-item>
                  <Menu-item name="4" @click="activeName=4">
                      <Icon type="heart-broken"></Icon>
                      流失用户
                  </Menu-item>
              </Menu-group>
            </Menu>
          </div>
          <div class="content">
            <m-img v-if="activeName==='1'"></m-img>
          </div>
        </div>
    </div>
</template>
<script>
  import mImg from '../mImg'
  console.log(mImg);
  export default{
      data(){
          return {
            theme3: 'light',
            activeName: '1'
          }
      },
    components:{
        mImg
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
    display: flex;
  }
  .content{
    margin: 20px;
    width: 920px;
    border: 1px solid #d3d3d3;
  }
</style>
