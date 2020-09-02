<template>
    <div>
        <van-nav-bar
            :title='msg'
            left-arrow
            @click-left="closeMaskFn"
        />
        <h1 class="titleSty" >管理求职意向</h1>

        <!-- 切换求职按钮状态 -->
        <van-nav-bar
            left-text='求职状态'
            :right-text='rightTxt'
            @click-right="openJobStateFn"
        />

        <!-- 求职状态列表，从下往上升起 -->
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />

        <div class="JobHope">
            求职期望
        </div>
        <div class="jobDescrible">
            求职期望不同，推荐的职位也会不同
        </div>
        <div class="addJobHope">
            添加期望
        </div>
    </div>
</template>

<script>
    export default {
        name:'jobState',
        data() {
            return {
                msg:'求职意向',
                show: false,
                actions: [
                    { name: '离职-随时到岗' }, 
                    { name: '在职-月内到岗' },
                    { name: '在职-考虑机会' },
                    { name: '在职-暂不考虑' }
                ],
                rightTxt:'请选择 > >'
            }
        },
        methods: {
            closeMaskFn(){
                this.$emit('closeMaskFn');
            },
            openJobStateFn(){
                this.show = true;
            },
            onSelect(item) {
                // 默认情况下点击选项时不会自动收起
                // 可以通过 close-on-click-action 属性开启自动收起
                this.show = false;
                this.rightTxt = item.name + ' > >'
            }
        }
    }
</script>

<style scoped>
.titleSty{font-size: .3rem;font-weight: bold;margin-left: .3rem;
	white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}

.div_p{
	font-size: .1rem;color: #969696;margin-left: .25rem;
	white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.jobState{
	white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.jobState_footer{text-align: center;margin: 2rem 0;}
.JobHope{
    width: 1.5rem;
    height: 1rem;
    font-size: 0.25rem;
    background-color: #fff;
    line-height: 1rem;
    text-align: center;
    color: #1989fa;
}
.JobHope:active{
    background: rgb(243, 240, 239);
}
.jobDescrible{
    width: 100%;
    height: 1rem;
    font-size: .2rem;
    padding-left: .3rem;
    color: rgb(177, 176, 171);
    letter-spacing:0.03rem;
}
.addJobHope{
    margin: 0 auto;
    width: 40%;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    font-size: .3rem;
    color:#fff;
    background: rgb(105, 197, 174);
}
.addJobHope:active{
    background: rgb(147, 194, 182);
}
</style>