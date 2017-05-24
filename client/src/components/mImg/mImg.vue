<template>
  <div class="img-box">
    <!--头部-->
    <div style="padding: 10px;background-color: #f9f9f9;display: flex;justify-content: space-between;padding-right: 150px;">
      <div>
        <Checkbox @on-change="handleCheckAll" v-model="checkall">全选</Checkbox>
        <Button type="info" style="margin-left: 12px;">移动分组</Button>
        <Button type="error" style="margin-left: 12px;">删除</Button>
      </div>
      <div>
        <Upload
          multiple
          :show-upload-list = "false"
          :on-success="handleSuccess"
          action="//127.0.0.1:3000/material/uploadImg">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
      </div>
    </div>
    <Row>
        <Col span="20" style="border-right:1px solid #d3d3d3;padding: 20px;">
          <Row :gutter="16">
            <Col v-for="(item,i) in lists" :key="i" span="6">
              <div style="border: 1px solid #d3d3d3;margin-bottom: 20px;">
                <div class="img-item" :style="{'background-image':`url(${item.img_url})`}"></div>
                <p style="text-align: center;margin: 3px 0;">
                  <Checkbox @on-change="check(item)" v-model="item.check">
                    <span class="text-point">{{item.img_name}}</span>
                  </Checkbox>
                </p>
                <div style="display: flex;justify-content: space-around;padding: 8px 20px;background-color: #f0f0f0;">
                  <span class="edit-img edit-icon" @click.stop="showEdit(i,item)">
                    <i-edit
                      labelName="修改图片名字"
                      @sure="editSure"
                      @cancel="editCancel(item)"
                      @closeAll = "closeAllEdit"
                      :show="item.onEdit"></i-edit>
                  </span>
                  <span class="move-img edit-icon"></span>
                  <span @click="delImg(i,item)" class="del-img edit-icon"></span>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span="4">
          <ul>
            <li :class="[activeGroup===0?'active':'']" class="group-list">
              全部图片({{allImgCount}})
            </li>
            <li @click="getGroupImg(item)" class="group-list group-list-hover" v-for="(item,i) in groupList">
              <span>{{item.group_name}}</span><span>({{item.groupNum}})</span>
            </li>
          </ul>
        </Col>
    </Row>
  </div>
</template>
<script>
  import testimg from './test.jpg'
  import iEdit from '../edit'
  export default{
    data(){
      return {
        checkall: false,
        activeList: 0,
        lists: [
          {
            imgUrl: testimg,
            imgName: '会议标注详情',
            curGroup: 0,
            check: false,
            onEdit: false
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
//        获得相应组的图片
      getGroupImg(item){
          console.log(item);
          let groupId = item.id;
          axios.post('/wechat/material/img',{
              type: 7,
            groupId: groupId
          }).then((data)=>{
            console.log(data);
            data = data.data;
            data.forEach((item,i)=>{
              item.curGroup = 0;
              item.check = false;
              item.onEdit = false;
            });
            this.lists = data;
          })
      },
        /**
         * 删除图片
         */
      delImg(i,item){
          console.log(item);
          this.lists.splice(i,1);
          axios.post('/wechat/material/img',{
              type: 3,
              imgId: item.id
          }).then((data)=>{
              console.log(1);
          })
      },
      getGroup(i){
          this.activeGroup = i+1;
      },
      toggleGroup(){
          this.showGroupBox = !this.showGroupBox
      },
      closeAllEdit(){
        this.lists.map((item,i)=>{
          item.onEdit = false;
        });
      },
      handleCheckAll(){
          this.lists.map((item,i)=>{
              if(!this.checkall){
                  this.checkall = false;
                  this.lists.map((item,i)=>{
                      item.check = false;
                  })
              }else{
                this.checkall = true;
                this.lists.map((item,i)=>{
                  item.check = true;
                })
              }
          })
      },
      check(curItem){
          let num = 0;
          let length = this.lists.length;
        this.lists.map((item,i)=>{
            if(item.check){
                num++;
            }
        });
        if(num === length && length!==0){
            this.checkall = true;
        }else{
          this.checkall = false;
        }
      },
      addGroup(){
        this.showGroupBox = false;
      },
      handleSuccess(res,file){
          console.log(file);
          console.log(res[0]);
          let img = {
            imgUrl: res.url,
            imgName: res.imgName,
            curGroup: 0,
            check: false
        };
        this.lists.unshift(res[0]);
        this.check();
      },
      /**
       * 修改图片的名称
       * @param value
       * @param i
       */
      editSure(text){
          this.lists[this.activeList].img_name = text;
          this.lists[this.activeList].onEdit = false;
          console.log(this.lists[this.activeList]);
          let curItem = this.lists[this.activeList]
          axios.post('/wechat/add/imgsinfo',{
              type: 0,
              imgId: curItem.id,
              newName: text
          }).then((data)=>{
          })
      },
      editCancel(item){
        item.onEdit = false;
      },
      showEdit(i,item){
          this.lists.map((item,i)=>{
              item.onEdit = false;
          });
          this.activeList = i;
          item.onEdit = true;
      }
    },
    computed: {
      allImgCount(){
        let num=0;
        this.groupList.forEach((item,i)=>{
          num+=item.groupNum;
        })
        return num;
      },
      allImgName(){
        let arr =[];
        arr = this.groupList.map((item,i)=>{
          return item.imgName;
        })
        return arr;
      }
    },
    components:{
      iEdit
    },
    mounted(){
      axios.post('/wechat/material/img',{
        type: 1
      })
        .then((data)=>{
          data = data.data;
          data.allimgs.forEach((item,i)=>{
              item.curGroup = 0;
              item.check = false;
              item.onEdit = false;
          });
          this.lists = data.allimgs;
           this.groupList = data.allGroups;
          console.log(data);
        })
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
    position: relative;
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
  .text-point{
    overflow: hidden;
    display: inline-block;
    width: 120px;
    vertical-align: middle;
    text-align: left;
    white-space: nowrap;
  }
</style>
