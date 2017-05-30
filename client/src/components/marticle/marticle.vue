<template>
  <div>
    <div class="herder-box">
      <Breadcrumb>
        <Breadcrumb-item href="/">Home</Breadcrumb-item>
        <Breadcrumb-item href="/components/breadcrumb">Components</Breadcrumb-item>
        <Breadcrumb-item>Breadcrumb</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <div style="display: flex;">
      <ul class="left-list">
        <li :class="[item.active?'active':'']" @click="select(item,i)" v-for="(item,i) in articleList" :key="i">
          <i class="icon_appmsg_thumb"></i>
          <div class="title">{{item.title}}</div>
        </li>
      </ul>
      <div class="edit-box">
        <!-- <VueUEditor ueditorPath="../../static/ueditor/" @ready="editorReady">
          <div><input type="text" placeholder="请输入标题"></div>
          <div><input type="text" placeholder="请输入作者"></div>
        </VueUEditor> -->
      </div>
    </div>

  </div>
</template>
<script>
  // import VueUEditor from 'vue-ueditor'
  // console.log(VueUEditor);
  export default{
    data(){
      return {
        articleList: [
          {
            url: 'aaaa',
            title: '标题',
            active: true
          }, {
            url: 'aaaa',
            title: '标题',
            active: false
          },
          {
            url: 'aaaa',
            title: '标题',
            active: false
          },
          {
            url: 'aaaa',
            title: '标题',
            active: false
          },
        ]
      }
    },
    props: {},
    methods: {
      select(item, i){
        this.articleList.forEach((curItem, i) => {
          curItem.active = false;
        })
        item.active = true;
      },
      editorReady(editor){
//          editor.setContent('hello');
          editor.addListener('contentChange',()=>{
              console.log('编辑内容发生了变化',editor.getContent());
          })
      }
    },
    computed: {},
    components:{
      VueUEditor
    },
    mounted(){
    }
  }
</script>
<style scoped>
  .herder-box {
    padding: 12px 20px;
    border-bottom: 1px solid #d3d3d3;
  }

  .left-list {
    padding: 20px;
    width: 220px;
    box-sizing: border-box;
    background-color: #d3d3d3;
    overflow-y: scroll;
    height: 400px;
  }

  .left-list li {
    padding: 10px;
    background-color: #FFFFFF;
    width: 183px;
    height: 124px;
    position: relative;
    border: 3px solid #fffff;
    cursor: pointer;
  }

  .left-list li:hover {
    border: 3px solid #00c261;
  }

  .left-list li.active {
    border: 3px solid #00c261;
  }
  .left-list .title{
    position: absolute;
    left: 0;
    bottom: 0;
    color: #fff;
    padding: 5px 12px;
    background-color: rgba(0,0,0,.3);
    width: 100%;
  }
  .icon_appmsg_thumb {
    width: 46px;
    height: 34px;
    display: inline-block;
    background: url("../../img/media.png") no-repeat 0 -88px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -17px;
    margin-left: -23px;
  }
  .edit-box{
    width: 765px;
    border: 1px solid red;
  }
</style>
