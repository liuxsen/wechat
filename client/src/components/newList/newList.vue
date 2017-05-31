<template>
	<div>
		<div class="page_nav">
			<a class="icon_goback"></a>
			<a>素材库</a>
			<span class="gap">/</span>
			<span>新建图文消息</span>
		</div>
		<div class="edit-box">
			<!-- 图文列表 -->
			<div class="news-list">
				<p class="title">图文列表</p>
				<div id="news-list" style="height: 400px;">
					<div class="news1" @click="selectItem(0)" :class="[activeLists === 0? 'active-border': '']">
						<div class="news1-content">
							<div class="news-thumb" :style="{'background-image':'url(`${lists[0].bgImg}`)','background-position':'0 0'}">
								<i v-if="!lists[0].bgImg"></i>
								<p class="news-title">
									{{lists[0].title}}
								</p>
							</div>
							<div class="bottom-cover">
								<!-- <a class="sort-up"></a> -->
								<a @click="moveDown(0,lists[0],lists[1])" class="sort-down"></a>
								<!-- <a class="sort-del"></a> -->
							</div>
						</div>
					</div>
					<ul>
						<li @click="selectItem(i)" :class="activeLists === i? 'active-border': ''" v-if="i!==0" v-for="(item,i) in lists" :key="i" class="news-content clear">
							<h1>{{item.title}}</h1>
							<div class="thumb" :style="{'background-image':'url(`${item.bgImg}`)','background-position':'0 0'}">
								<i v-if="!item.bgImg"></i>
							</div>
							<div class="bottom-cover">
								<a @click.stop="moveup(i,item,lists[i-1])" class="sort-up"></a>
								<a v-if="lists.length>2&&i!==lists.length-1" @click="moveDown(i,item,lists[i+1])" class="sort-down"></a>
								<a @click.stop="delNews(i)" class="sort-del"></a>
							</div>
						</li>
					</ul>
					<!-- 加号 -->
					<div class="add-box">
						<i></i>
						<div class="add-box-cover">
							<a @click="createNew()" class="add-new-btn">
								<i></i>
								<strong>自建图文</strong>
							</a>
							<a class="add-new-btn add-new-btn-share">
								<i></i>
								<strong>分享图文</strong>
							</a>
						</div>
					</div>
				</div>

			</div>
			<!-- 编辑区域 -->
			<div class="edit-content">
				<div>
					<vue2Ueditor v-bind:value=defaultMsg v-bind:config=config v-on:input="input" v-on:ready="ready"></vue2Ueditor>
          <div class="wx-btn" style="margin-left: 30px;">
            <p style="margin: 15px 0;">发布样式编辑</p>
            <p style="margin:0 0 15px;"><span style="color: #000;">封面</span>大图片建议尺寸： 900像素*500像素</p>
            <p>
              <el-button type="success">从正文选择</el-button>
              <el-button type="success">从图片库选择</el-button>
            </p>
            <p style="margin: 15px 0;">
              <span style="color: #000;">摘要</span>
              <span>选填，如果不填写会默认抓取正文前54个字</span>
            </p>
            <p>
              <textarea id="" cols="30" rows="10"></textarea>
            </p>
            <p style="text-align: right;width: 80%;color: #8d8d8d;">
              0/120
            </p>
          </div>
				</div>
			</div>
			<!--多媒体-->
			<div class="right-pannel" style="padding-bottom: 30px;">
				<p class="title">多媒体</p>
				<ul style="margin-top: 20px;">
					<li class="mt-list mt-list0">
						<i></i>图片
					</li>
					<li class="mt-list mt-list1">
						<i></i>视频
					</li>
					<li class="mt-list mt-list2">
						<i></i>音频
					</li>
					<li class="mt-list mt-list3">
						<i></i>投票
					</li>
				</ul>
			</div>
		</div>
    <div class="bottom-bar">
        <div class="bottom-bar-inner">
          <span><i></i>展开正文</span>
          <span>
            <el-button style="float: right" type="success">保存并群发</el-button>
            <el-button style="float: right;margin: 0 20px;" type="success">预览</el-button>
            <el-button style="float: right" type="success">保存</el-button>
          </span>
        </div>
    </div>
    <selectImg></selectImg>
	</div>
</template>
<script>
	import ps from 'perfect-scrollbar'
	import '../../../static/perfect-scrollbar.min.css'
	import vue2Ueditor from '../vueUditor'
  import selectImg from '../selectImg'

	export default {
		components:{
			vue2Ueditor,selectImg
		},
		data(){
			return {
        activeLists: 0,
				lists:[
					{
						title: '头图',
						bgImg: 'lsdjfslkjf',
            thumb_media_id: '', //封面素材id
            author: '',
            digest: '', //摘要
            show_cover_pic: 1, //是否显示封面
            content: '初始文本', //图文内容
            content_source_url:'' //图文消息的原文地址
					}
				],

        config: {
          initialFrameWidth: null,
          initialFrameHeight: 200,
        }
			}
		},
		computed:{
      defaultMsg(){
          return this.lists[this.activeLists].content;
      }
    },
		methods:{
      createNew(){
//          创建图文
        let obj = {
            title: '头图',
            bgImg: 'lsdjfslkjf',
            thumb_media_id: '', //封面素材id
            author: '',
            digest: '', //摘要
            show_cover_pic: 1, //是否显示封面
            content: '', //图文内容
            content_source_url:'' //图文消息的原文地址
          };
        this.lists.push(obj);
      },
      selectItem(i){
          this.activeLists = i;
      },
			delNews(i){
				this.lists.splice(i,1);
			},
			moveup(i,item1,item2){
				// if(i===0) return;
				this.lists.splice(i-1,1,item1);
				this.lists.splice(i,1,item2);
			},
			moveDown(i,item1,item2){
				// if(i===0) return;
				this.lists.splice(i+1,1,item1);
				this.lists.splice(i,1,item2);
			},
			ready(editor){
				console.log(editor)
			},
			input(obj){
				console.log(obj);
				this.lists[this.activeLists].content = obj.content;
			}
		},
		mounted(){
			// let container = this.$refs['news-list'];
			let container = document.getElementById('news-list')
			console.log(container);
			ps.initialize(container,{
			  wheelSpeed: 2,
			  wheelPropagation: true,
			  minScrollbarLength: 20
			});
		}
	}
</script>
<style scoped>
.title{
	padding-top: 10px;
}
	p,ul,li{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.page_nav {
	    margin: 0;
	    padding: 6px 20px;
	    border-bottom: 1px solid #e7e7eb;
	    font-si
	    ze: 14px;
	}
	.page_nav a, .page_nav .gap {
    	color: #8d8d8d;
	}
	.icon_goback {
    background: url(../../img/base.png) 0 -2244px no-repeat;
    width: 26px;
    height: 26px;
    vertical-align: middle;
    display: inline-block;
    line-height: 100px;
    overflow: hidden;
}
.page_nav .gap {
    margin: 0 .35em;
}
.edit-box{
	font-size: 14px;
	position: relative;

}

.news-list{
	position: absolute;
	left: -1px;
	top: 0;
	width: 250px;
	border-right: 1px solid #dcdcdc;
	background-color: #F8F8F8;
	padding: 0 20px;
	box-sizing: border-box;
}
.right-pannel{
	position: absolute;
	right: -1px;
	width: 210px;
	top: 0;
	border-left: 1px solid #dcdcdc;
	background-color: #F8F8F8;
	padding: 0 20px;
	box-sizing: border-box;
}
.edit-content{
	margin-left: 250px;
	margin-right: 211px;
}
.news1{
	border: 1px solid #dcdcdc;
	padding: 10px;
	background: #ffffff;
	margin-top: 15px;
}
.news1-content{
	background: #ECECEC;
	height: 120px;
	position: relative;
}
.news-thumb{
	width: 100%;
	height: 100%;
	position: relative;
}
.news-thumb i{
	width: 44px;
	height: 34px;
	display: block;
	position: absolute;
	left: 50%;
	top: 40%;
	margin-left: -22px;
	margin-top: -17px;
    background: url(../../img/media.png) 0 -88px no-repeat;
    overflow: hidden;
}
.news-title{
	position: absolute;
	z-index: 2;
	bottom: 0;
	left: 0;
	width: 100%;
	color: #ffffff;
	padding-left: 18px;
	background: rgba(0,0,0,.6);
	height: 33px;
	line-height: 33px;
	box-sizing: border-box;
}
.clear:after{
	content: '';
	display: block;
	clear: both;
}
/*二级 子图文*/
.news-content{
	border: 1px solid #dcdcdc;
	padding: 10px;
	border-top: 0;
	position: relative;
}
.news-content h1{
	max-height: 48px;
	overflow: hidden;
	font-weight: 400;
	font-size: 14px;
	word-wrap: break-word;
	word-break: break-all;
	color: #222;
	width: 92px;
	display: inline-block;
}
.news-content .thumb{
	width: 78px;
	height: 78px;
	float: right;
	position: relative;
	background-color: #ECECEC;
}
.news-content .thumb i{
	width: 44px;
	height: 34px;
	display: block;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -22px;
	margin-top: -17px;
    background: url(../../img/media.png) 0 -88px no-repeat;
    overflow: hidden
}
/*添加news*/
.add-box{
	border: 1px dashed #dcdcdc;
	border-top: 0;
	text-align: center;
	position: relative;
	height: 90px;
	box-sizing: border-box;
	padding-top: 30px;
}
.add-box i{
	display: inline-block;
	width: 35px;
	height: 35px;
    background: url(../../img/base.png) 0 -2509px no-repeat;
}
.add-box:hover .add-box-cover{
	display: block;
}
.add-box-cover{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: #ECECEC;
	padding-top: 30px;
	box-sizing: border-box;
	display: none;
}
.add-new-btn{

}
.add-new-btn{
	display: inline-block;
	width: 63px;
	margin-left: 10px;
	margin-right: 10px;
	cursor: pointer;
}
.add-new-btn strong{
	font-size: 14px;
	font-weight: 400;
}
.add-new-btn i{
	 width: 24px;
    height: 24px;
    vertical-align: middle;
    display: block;
    margin: 0 auto;
    background: url(../../img/base2.png) 0 -20px no-repeat;
}
.add-new-btn:hover i{
	background: url(../../img/base2.png) 0 -76px no-repeat;
}
.add-new-btn.add-new-btn-share i{
	background: url(../../img/base2.png) 0 -48px no-repeat;
}
.add-new-btn.add-new-btn-share:hover i{
	background: url(../../img/base2.png) 0 -104px no-repeat;
}
.news-content:hover .bottom-cover{
	display: block;
}
.news1-content:hover .bottom-cover{
	display: block;
}
/*底部按钮开始*/
.bottom-cover{
	background-color: rgba(0,0,0,.7);
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	height: 30px;
	padding-top: 12px;
	display: none;
	z-index: 4;
}
.sort-up,.sort-down,.sort-del{
	width: 20px;
	height: 20px;
	display: inline-block;
	margin-left: 8px;
	margin-right: 8px;
	cursor: pointer;
}
.sort-up{
	background: url(../../img/base.png) 0 -4804px no-repeat
}
.sort-down{
	background: url(../../img/base.png) 0 -4828px no-repeat
}
.sort-del{
	float: right;
	background: url(../../img/base.png) 0 -4852px no-repeat
}
/*底部按钮结束*/
/*媒体选项*/
.mt-list{
	line-height: 50px;
	padding-left: 20px;
	border: 1px solid #dcdcdc;
	border-top: 0;
	cursor: pointer;
}
.mt-list i{
	width: 22px;
	height: 22px;
	margin-right: 1em;
	background: url(../../img/base2.png) 0 -132px no-repeat;
	display: inline-block;
	vertical-align: middle;
}
.mt-list:hover{
	border: 1px solid #0DD340;
	margin-top: -1px;
}
.mt-list0:hover{
	border: 1px solid #6FE59D;
	margin-top: 0;
}
.mt-list0{
	border-top: 1px solid #dcdcdc;
}
.mt-list1 i{
	background: url(../../img/base2.png) 0 -158px no-repeat;
}
.mt-list2 i{
	background: url(../../img/base2.png) 0 -184px no-repeat;
}
.mt-list3 i{
	background: url(../../img/base2.png) 0 -262px no-repeat;
}
  /*操作微信按钮*/
  .wx-btn{
    margin-top: 20px;
    color: #333333;
  }
.wx-btn textarea{
  background-color: #ffffff;
  color: #222222;
  border: 1px solid #dcdcdc;
  width: 80%;
  height: 110px;
  outline: none;
  font-size: 15px;
}
  .bottom-bar{
    /*height:*/
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    width: 100%;
  }
  .bottom-bar-inner{
    /*width: 737px;*/
    /*margin-left: 251px;*/
    width: 1200px;
    margin: 0 auto;
    padding-left: 251px;
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 350px;
  }
  .active-border{
    border: 2px solid #00c261;
  }
</style>
