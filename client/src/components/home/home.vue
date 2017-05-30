<template>
    <div>
    <!-- 头部消息 -->
        <div class="head_box"> 
          <div class="inner wrp">
            <h1 class="logo">
              <a href=""></a>
            </h1>
          </div>
        </div>
        <!-- 新建图文消息 -->
        <div class="box-content">
          <router-view></router-view> 
        </div>
    </div>
</template>
<script>
  import mImg from '../mImg'
  // import marticle from '../marticle'
  console.log(mImg);
  export default{
      data(){
          return {
            theme3: 'light',
            activeName: '3'
          }
      },
      components:{
          mImg,
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
 .head_box{
    position: relative;
    background-color: #fff;
    border-top: 4px solid #44b549;
    border-bottom: 1px solid #d9dadc;
 }
 .head_box .inner.wrp {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
}
.head_box .inner {
    height: 60px;
}
.head_box .inner:after {
    content: "\200B";
    display: block;
    height: 0;
    clear: both;
}
 .logo {
    float: left;
    padding-top: 10px;
    font-size: 24px;
}
 .logo a {
    display: block;
    width: 250px;
    height: 40px;
    overflow: hidden;
    text-decoration: none;
}
.logo a:before {
    display: inline-block;
    content: url();
}
.box-content{
  width: 1200px;
  border: 1px solid #D9DADC;
  background-color: #ffffff;
  margin: 37px auto;
}
</style>
