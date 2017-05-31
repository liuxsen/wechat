<template>
  <div class="cover">
    <div class="box">
      <div class="header">
        <p>选择图片</p>
        <i class="close"></i>
      </div>
      <div class="box-cotent clear">
        <ul class="content-left">
          <li>
            全部图片(18)
          </li>
          <li>
            未分组(12)
          </li>
          <li>
            分组(12)
          </li>
          <li>
            <i></i>
            <span>新建分组</span>
          </li>
        </ul>
        <div class="content-right">
          sdfsdf
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {}
    },
    props: {},
    methods: {},
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
    display: inline-block;
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
  }
  .content-right{
    float: left;
  }
</style>
