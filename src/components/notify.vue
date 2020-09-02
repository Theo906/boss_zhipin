<template>
    <div class="notify">
        {{msg}}
        <!-- loading加载 -->
        <van-loading color="#f00" type="spinner" size="24px"/>
    </div>
</template>

<script>
    export default {
        name:'notify',
        data() {
            return {
                msg:'notify提示组件,职位已经更新'
            }
        }
    }
</script>

<style scoped>
.notify{
	width: 100%;height: .5rem;background: #14c1bb;text-align: center;line-height: .5rem;
	color: #fff;font-size: .21rem;
	animation:notify_show .5s;
	animation-delay:.5s;
	animation-fill-mode:forwards;
}

@keyframes notify_show{
	from {height: .5rem;}
	to {height: 0;}
}
</style>