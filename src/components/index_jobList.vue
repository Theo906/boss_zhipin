<template>
    <div>
        <!-- header头部 -->
        <van-sticky>
            <van-nav-bar left-text="高仿Boss直聘" class="bar_sty">
                <template #right>
                    <van-icon @click="jobStateOpen" name="plus" />
                    <van-icon name="search" />
                </template>
            </van-nav-bar>

            <div class="title_menu">
                <van-button class="miniBtn" size="mini" @click="notifyFnBtn" >推荐</van-button>
                <van-button class="miniBtn" size="mini" @click="notifyFnBtn" >最新</van-button>

                <van-button class="filterBtn" size="mini" @click="openFilterCriteriaFn" >筛选</van-button>
                <van-button class="filterBtn" size="mini"  @click="cityOpenMaskFn" >{{defaultCityName}}</van-button>
            </div>

            <!-- notify通知组件 -->
            <notify v-show="notifyShow"></notify>
        </van-sticky>

        <!-- 职位列表 -->
            <div>
                <!-- 下拉刷新 -->
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                        <job_item 
                            v-for="(n,inx) in jobsData" 
                            :itemObj=n 
                            :key="inx"
                                />
                </van-pull-refresh>
            </div>

        <!-- 城市列表 -->
        <div v-show="isCityShow" 
                @touchmove.prevent
                @mousewheel.prevent
                :class="cityMaskClassName">
            <cityArea @cityCloseMaskFn='cityHideMaskFn($event)'></cityArea>
        </div>
        
        <!-- 筛选列表 -->
        <div v-show="is_filter" 
            @touchmove.prevent
            @mousewheel.prevent
            :class="filterClassName" >
            <filterWrap @closeFilterWrap="closeFilterMask"></filterWrap>
        </div>

        <!-- 管理求职意向 -->
        <div v-show="is_jobState" 
            @touchmove.prevent
            @mousewheel.prevent
            :class="jobStateClassName">
               <jobState @closeMaskFn='jobStateClose'></jobState>
        </div>

        <!-- footerBar -->
        <foot_bar></foot_bar>
    </div>
</template>

<script>
    import job_item from './job_item'
    import foot_bar from './foot_bar'
    import notify from './notify'
    import cityArea from './cityArea'
    import filterWrap from './filterWrap'
    import jobState from './jobState'
    import { Toast } from 'vant';

    export default {
        name:"index_jobList",
        components:{job_item,foot_bar,notify,cityArea,filterWrap,jobState},
        data() {
            return {
                msg:'职位列表',
                //管理求职意向
                is_jobState:false,
                //城市列表
                isCityShow:false,
                //筛选类名，用于找到dom节点
                filterClassName:'mask_filter',
                is_filter:false,
                //默认城市名
                defaultCityName:'孝感',
                //用于找到dom节点
                cityMaskClassName:'city_aaa',
                //求职管理状态class名，用于找到dom节点
                jobStateClassName:'mask_animation',
                isLoading:false,
                notifyShow:false,
                jobsData:[{
                    title:'web前端',
                    h2_txt:'牛一科技 未融资',
                    area:['孝感 孝南区','经验不限','本科'],
                    hr:{
                        img_avatar:'',
                        hr_txt:'张三-招聘者'
                    },
                    salary:'5-6K'
                },{
                    title:'软件开发工程师',
                    h2_txt:'牛一科技 未融资',
                    area:['孝感 孝南区','1-3年','学历不限'],
                    hr:{
                        img_avatar:'',
                        hr_txt:'张三-招聘者'
                    },
                    salary:'3-8K'
                },{
                    title:'前端工程师',
                    h2_txt:'牛二科技 未融资',
                    area:['孝感 步行区','经验不限','本科'],
                    hr:{
                        img_avatar:'',
                        hr_txt:'马xx-从事招聘专员'
                    },
                    salary:'5-6K'
                },{
                    title:'前端开发工程师',
                    h2_txt:'牛三科技 未融资',
                    area:['孝感 同升区','3-5年','学历不限'],
                    hr:{
                        img_avatar:'',
                        hr_txt:'杨女士 - 人事'
                    },
                    salary:'5-8K'
                },{
                    title:'前端工程师',
                    h2_txt:'牛四 未融资',
                    area:['孝南 董永区','经验不限','本科'],
                    hr:{
                        img_avatar:'',
                        hr_txt:'马xx-从事招聘专员'
                    },
                    salary:'5-6K'
                },{
                    title:'前端技术经理',
                    h2_txt:'牛四科技 未融资',
                    area:['孝感 槐荫区','5-10年','本科'],
                    hr:{
                        img_avatar:'',
                        hr_txt:'潘舒-CEO'
                    },
                    salary:'6-11K'
                },{
                    title:'web前端',
                    h2_txt:'牛五科技 未融资',
                    area:['孝感 和平区','经验不限','本科'],
                    hr:{
                        img_avatar:'',
                        hr_txt:'李四-招聘者'
                    },
                    salary:'5-6K'
                }]
            }
        },
        methods: {
            // 刷新提示
            notifyFnBtn(){
                this.notifyShow = true;

                let _notify = document.querySelector('.notify');
                _notify.addEventListener('webkitAnimationEnd',()=>{
                     this.notifyShow = false;
                })
            },
            //下拉刷新
            onRefresh(){
                Toast('刷新成功');
                this.isLoading = false;
            },
            //打开城市选择项
            cityOpenMaskFn(){
                // console.log(document.querySelector('.city_aaa'));
                this.isCityShow = true;
                this.cityMaskClassName = 'city_aaa cityChoice_open';

                 //需要监听css3动画执行完后，再显示
                let _mask = document.querySelector('.city_aaa');
                _mask.addEventListener('webkitAnimationEnd',()=>{
                     this.isCityShow = true;
                });
            },
            //关闭城市选择项
            cityHideMaskFn(_selectCityName){
                // console.log(_selectCityName)
                if(_selectCityName){
                    this.defaultCityName = _selectCityName;
                }

                this.cityMaskClassName = 'city_aaa cityChoice_close';

                //需要监听css3动画执行完后，再隐藏
                let _mask = document.querySelector('.city_aaa');
                _mask.addEventListener('webkitAnimationEnd',()=>{
                     this.isCityShow = false;
                });
            },
            //打开筛选面板
            openFilterCriteriaFn(){
                this.is_filter = true;
                this.filterClassName = 'mask_filter filter_open';

                 //需要监听css3动画执行完后，再显示
                let _mask = document.querySelector('.mask_filter');
                _mask.addEventListener('webkitAnimationEnd',()=>{
                     this.is_filter = true;
                });
            },
            //关闭筛选面板
            closeFilterMask(){
                
                this.filterClassName = 'filter_close mask_filter';

                //需要监听css3动画执行完后，再隐藏
                let _mask = document.querySelector('.mask_filter');
                _mask.addEventListener('webkitAnimationEnd',()=>{
                     this.is_filter = false;
                });
            },
            //求职状态Open
            jobStateOpen(){
                this.is_jobState = true ;
                this.jobStateClassName = 'mask_animation animation_open'

                //需要监听css3动画执行完后，再显示
                let _mask = document.querySelector('.mask_animation');
                _mask.addEventListener('webkitAnimationEnd',()=>{
                    this.is_jobState = true ;
                });
            },
            //求职状态Close
            jobStateClose(){
                this.jobStateClassName = 'mask_animation animation_close'

                //需要监听css3动画执行完后，再隐藏
                let _mask = document.querySelector('.mask_animation');
                _mask.addEventListener('webkitAnimationEnd',()=>{
                    this.is_jobState = false ;
                });
            }
        }
    }
</script>

<style  scoped>
    div.bar_sty{
        background: #14c1bb;
    }
    .van-icon-plus:before{
        color: #fff;font-size: .4rem;margin-right: .1rem;
        border-right: 1px solid #c1c1c1;padding-right: .1rem;
    }
    .van-icon-search:before{
        color: #fff;font-size: .4rem;
    }
    .van-nav-bar__text{
        font-size: .35rem;color: #fff;
    }
    .miniBtn{
        border:0;margin:.1rem 0 0 0;float: left;
    }
    .filterBtn{
        float: right;border:0;margin:.1rem .1rem 0 0;
        background: #f2f3f5;
    }
    .title_menu{background: #fff;height: .6rem;padding: 0 0 .1rem .1rem;}
    .cityChoice_open{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #fff;
        z-index: 3333;
        animation: cityChoiceAnimation_open .7s;
    }
    .cityChoice_close{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #fff;
        z-index: 3333;
        animation: cityChoiceAnimation_close .7s;
    }
    @keyframes cityChoiceAnimation_open {
        from {
            height: 0;
        }
        to{
            height: 100%;
        }
    }
    @keyframes cityChoiceAnimation_close {
        from {
            height: 100%;
        }
        to{
            height: 0;
        }
    }

    .filter_open{
        width: 100%;height: 100%;background: #fff;position: absolute;left: 0;bottom: 0;
        z-index: 3333;animation: cityEditWrapObjAnimation_open .7s;
    }
    .filter_close{
        width: 100%;height: 100%;background: #fff;position: absolute;left: 0;bottom: 0;
        z-index: 3333;animation: cityEditWrapObjAnimation_close .7s;
    }
    @keyframes cityEditWrapObjAnimation_open{
	from {height:0;}
	to {height:100%;}
    }
    @keyframes cityEditWrapObjAnimation_close{
        from {height:100%;}
        to {height:0;}
    }

    .mask_animation{
        width: 100%;height: 100%;background: #fff;
        position: absolute;left: 0;bottom: 0;
        z-index: 3333;
    }
    .animation_open{
        animation: open_Animation .7s;
    }
    .animation_close{
        animation: close_Animation .7s;
    }

    @keyframes open_Animation{
        from {width:0;left:100%;}
        to {width:100%;left:0;}
    }
    @keyframes close_Animation{
        from {width:100%;left:0;}
        to {width:0;left:100%;}
    }
</style>