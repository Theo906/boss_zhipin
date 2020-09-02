<template>
    <div>
        <van-nav-bar title="筛选组件">
            <template #left>
              <van-icon name="cross" size=".4rem" @click="closeFilterWrap"/>
            </template>
        </van-nav-bar>

        <div class="gridTitle">学历要求</div>
        <van-grid :column-num="3" :gutter="10">
            <van-grid-item @click="itemBtnClick($event)" text="全部" />
            <van-grid-item @click="itemBtnClick($event)" text="大专" />
            <van-grid-item @click="itemBtnClick($event)" text="本科" />
            <van-grid-item @click="itemBtnClick($event)" text="研究生" />
            <van-grid-item @click="itemBtnClick($event)" text="博士" />
        </van-grid>

        <div class="gridTitle">薪资待遇</div>
        <van-grid :column-num="3" :gutter="10">
            <van-grid-item @click="itemBtnClick($event)"  text="全部" />
            <van-grid-item @click="itemBtnClick($event)"  text="8k" />
            <van-grid-item @click="itemBtnClick($event)"  text="10k" />
            <van-grid-item @click="itemBtnClick($event)"  text="15k" />
            <van-grid-item @click="itemBtnClick($event)"  text="20k" />
        </van-grid>

        <div class="filter_footer">
            <van-button plain type="default">清除</van-button>
            <van-button plain type="info" @click="confirmBtn">确认</van-button>
        </div>
    </div>
</template>

<script>
    import '@/assets/reset_vant.css'
    
    export default {
        name:'filterWrap',
        data() {
            return {
                msg:'filterWrap筛选选择',
                filter_result:[]
            }
        },
        methods: {
            closeFilterWrap(){
                this.$emit('closeFilterWrap')
            },
            itemBtnClick($e){
                let _txt = $e.target.innerText ;
                let _cls = $e.target.getAttribute('class');
                // console.log(_cls)
                // console.log(_cls.split(' '))
                let _clsArr = _cls.split(' ');
                let _is = false ;
                //判断当前按钮有没有选中的css样式
                for(let i=0; i<_clsArr.length ; i++){
                    if(_clsArr[i] == 'van-grid-item_focus'){
                        //如果有该样式 就删除
                        _clsArr.splice(i,1);
                        _is = true ;
                        break;
                    }
                    _is = false ;
                }
                //没有就要添加van-grid-item_focus 样式，该样式在reset_vant.css
                if(_is){
                    //如果有就删除
                    for(let i=0; i<this.filter_result.length; i++){
                        if(this.filter_result[i] == _txt){
                            this.filter_result.splice(i,1);
                        }
                    }
                }else{
                    //没有就添加class选中样式
                    _clsArr.push('van-grid-item_focus')
                    //没有就添加内容，到filter_result中
                    this.filter_result.push(_txt)
                }

                //再将该数组转为字符，添加到class中
                let _clsTxt = _clsArr.join(' ');
                $e.target.setAttribute('class',_clsTxt);

            },
            confirmBtn(){
                console.log(this.filter_result);
            }
        }
    }
</script>

<style scoped>
    .gridTitle{
        padding: .2rem .2rem;clear: both;font-size: .3rem;font-weight: bold;
    }
    .gridTitle label{font-weight: normal;font-size: .2rem;padding: 0 10px;}
    .filter_footer{
        text-align: center;margin-top: 1rem;
        width: 100%;
    }
</style>