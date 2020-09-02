<template>
    <div>
        <van-area 
            :title=titele_name
            :area-list="areaList" 
            value="420000"
            :visible-item-count=8
            @change="areaChangeFn"
            @cancel='closeMaskFn'
            @confirm='selectAreaBtn'
             />
    </div>
</template>

<script>
    import area from '../assets/area'

    export default {
        name:'cityArea',
        data() {
            return {
                msg:'城市地区选择',
                areaList: area,
                titele_name:'请选择城市区'
            }
        },
        methods: {
            //点击取消触发
            closeMaskFn(){
                this.$emit('cityCloseMaskFn')
            },
            //点击城市触发
            areaChangeFn(_d){
                // console.log(_d.getValues());
                let _data = _d.getValues();
                this.titele_name = _data[0].name+'-'+
                                    _data[1].name+'-'+
                                     _data[2].name
            },
            //确认选择城市
            selectAreaBtn(_d){
                // console.log(_d[1].name)
                this.$emit('cityCloseMaskFn',_d[1].name)
            }
        }
    }
</script>