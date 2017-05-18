<template>
  <div class="img-box" style="border: 1px solid #d3d3d3;margin: 15px;">
    <!--头部-->
    <div style="padding: 10px;background-color: #f9f9f9;display: flex;justify-content: space-between;padding-right: 150px;">
      <div>
        <Checkbox v-model="single">全选</Checkbox>
        <Button type="info" style="margin-left: 12px;">移动分组</Button>
        <Button type="error" style="margin-left: 12px;">删除</Button>
      </div>
      <div style="width: 300px;">
        <Upload
          show-upload-list="false"
          multiple
          action="//127.0.0.1:3000/add">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
      </div>
    </div>
    <Row>
      <Col span="21" style="border-right:1px solid #d3d3d3;">
      <!--图片列表-->
      <Row>
        <Col span="6" v-for="(item,i) in lists" :key="i">
        <div style="margin: 5px;border: 1px solid #d3d3d3;">
          <div class="img-item" :style="{'background-image':`url(${item.imgUrl})`}"></div>
          <p style="text-align: center;margin: 3px 0;">
            <Checkbox v-model="item.check">{{item.imgName}}</Checkbox>
          </p>
          <div style="display: flex;justify-content: space-around;padding: 8px 20px;background-color: #f0f0f0;">
            <i class="edit-img edit-icon"></i>
            <i class="move-img edit-icon"></i>
            <i class="del-img edit-icon"></i>
          </div>
        </div>
        </Col>
      </Row>
      </Col>
      <Col span="3">
      <ul>
        <li @click="getGroup(-1)" :class="[activeGroup===0?'active':'']" class="group-list group-list-hover">全部图片({{groupList.length}})</li>
        <li @click="getGroup(i)" :class="[activeGroup===(i+1)?'active':'']" class="group-list group-list-hover" v-for="(item,i) in groupList" :key="i">
          <span>{{item.groupName}}</span><span>({{item.count}})</span>
        </li>
        <li :class="[showGroupBox? 'active':'']" class="group-list" style="position: relative">
          <div @click="toggleGroup">
            <i class="add-group" style=""></i>
            <span>新建分组</span>
          </div>
          <div v-show="showGroupBox" class="add-group-input">
            <p style="height: 30px;">创建分组</p>
            <input style="width: 100%;height: 25px;" type="text" v-model="newGroupName">
            <div style="text-align: right;">
              <Button type="success" @click="addGroup" style="margin-right: 20px;">确定</Button>
              <Button @click="showGroupBox=false" type="info">取消</Button>
            </div>
            <i class="arrow-top"></i>
          </div>
        </li>
      </ul>
      </Col>
    </Row>
  </div>
</template>
<script>
  import testimg from './test.jpg'
  export default{
    data(){
      return {
        single: false,
        lists: [
          {
            imgUrl: testimg,
            imgName: '会议标注详情',
            curGroup: 0,
            check: false
          },
          {
            imgUrl: testimg,
            imgName: '会议标注详情',
            curGroup: 0,
            check: false
          },
          {
            imgUrl: testimg,
            imgName: '会议标注详情',
            curGroup: 0,
            check: false
          },
          {
            imgUrl: testimg,
            imgName: '会议标注详情',
            curGroup: 0,
            check: false
          },
          {
            imgUrl: testimg,
            imgName: '会议标注详情',
            curGroup: 0,
            check: false
          },
          {
            imgUrl: testimg,
            imgName: '会议标注详情',
            curGroup: 0,
            check: false
          },
          {
            imgUrl: testimg,
            imgName: '会议标注详情',
            curGroup: 0,
            check: false
          },
          {
            imgUrl: testimg,
            imgName: '会议标注详情',
            curGroup: 0,
            check: false
          },
          {
            imgUrl: testimg,
            imgName: '会议标注详情',
            curGroup: 0,
            check: false
          },
        ],
        groupList: [
          {
            groupId: 0,
            groupName: '未分组',
            count: 19
          },
          {
            groupId: 1,
            groupName: '女生组',
            count: 3
          },
          {
            groupId: 2,
            groupName: '男生组',
            count: 4
          }

        ],
        newGroupName: '',
        activeGroup: 0,
        showGroupBox: false
      }
    },
    props: {},
    methods: {
      getGroup(i){
          this.activeGroup = i+1;
      },
      toggleGroup(){
          this.showGroupBox = !this.showGroupBox
      },
      addGroup(){
        this.showGroupBox = false;
      },
    },
    computed: {},
    mounted(){
    }
  }
</script>
<style scoped>
  .img-item {
    width: 100%;
    padding-bottom: 100%;
    background: url("") no-repeat center center/cover;
  }

  .edit-icon {
    width: 18px;
    height: 18px;
    display: inline-block;
    cursor: pointer;
  }

  .edit-img {
    background: url(../../img/base.png) 0 -4557px no-repeat;
  }

  .edit-img:hover {
    background: url(../../img/base.png) 0 -4579px no-repeat;
  }

  .move-img {
    background: url(../../img/base.png) 0 -4271px no-repeat;
  }

  .move-img:hover {
    background: url(../../img/base.png) 0 -4293px no-repeat;
  }

  .del-img {
    background: url(../../img/base.png) 0 -4007px no-repeat;
  }

  .del-img:hover {
    background: url(../../img/base.png) 0 -4029px no-repeat;
  }

  .group-list {
    line-height: 50px;
    cursor: pointer;
    text-align: left;
    padding-left: 12px;
    font-size: 14px;
  }

  .group-list.active {
    background-color: #f4f5f9;
  }

  .group-list-hover:hover {
    background-color: #f4f5f9;
  }

  .add-group {
    background: url(../../img/base.png) 0 -3094px no-repeat;
    width: 15px;
    height: 15px;
    display: inline-block;
    vertical-align: middle;
  }
  .add-group-input{
    top: 50px;
    right: 0;
    width: 300px;
    padding: 20px;
    border: 1px solid #f4f5f9;
    background-color: #FFFFFF;
    position: absolute;
  }
  .arrow-top{
    position: absolute;
    right: 30px;
    margin-left: -8px;
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
</style>
