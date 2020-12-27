<template>
    <div class="snap_dialog">
        <div class="snap_btn">
            <el-button @click="snapshot">截图</el-button>
        </div>
    <el-dialog title="AI事件动态上传" :visible.sync="dialogFormVisible" center="center">
        <el-form :model="form">
            <el-form-item label="图片上传" :label-width="400">
                <div class="viewPhoto">
                    <img v-bind:src="snapshot_url">
                </div>
            </el-form-item>
            <el-form-item label="标题" :label-width="300" >
                <el-select
                        v-model = "chosedCategoryId"
                        @change="refreshRecogTypeList"
                        filterable
                        remote
                        placeholder="请选择AI大类"
                >
                    <el-option
                            v-for="item in AICategory"
                            :key="item.category_id"
                            :label="item.category_type"
                            :value="item.category_id"
                    />
                </el-select>
                <span>-</span>
                <el-select
                        v-model="AIType"
                        @change="refreshRecogType"
                        filterable
                        remote
                        multiple
                        placeholder="请选择对应的上传类型"
                        style="width:60%"
                >
                    <el-option
                            v-for="item in chosedAITypeList"
                            :key="item.recog_id"
                            :label="item.recog_type"
                            :value="item.recog_id"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="uploadResult">确 定</el-button>
        </div>
    </el-dialog>
    </div>
</template>

<script>
    import * as OSS from "ali-oss";
    import {baseUrl} from "../env";
    import config from "../config/config";
    import eventBus from "../config/EventBus";

    export default {
    name: "snapshotDialog",
    data() {
        return{
            shipInfoList: [],
            shipNum: null,
            currentShip: {},
            snapshot_url:'',
            dialogFormVisible: false,
            client: null,
            AICategory:[
                {'category_id':0,'category_type':'目标识别'},
                {'category_id':1,'category_type':'行为识别'},
                {'category_id':2,'category_type':'其他'},
            ],
            AITypes:[
                [
                    {'recog_id':'1','recog_type':'垃圾'},
                    {'recog_id':'15','recog_type':'水葫芦'},
                    {'recog_id':'3','recog_type':'树枝'},
                    {'recog_id':'16','recog_type':'浮萍'},
                    {'recog_id':'17','recog_type':'蓝藻'},
                    {'recog_id':'7','recog_type':'油污'},

                    {'recog_id':'4','recog_type':'死鱼'},
                    {'recog_id':'9','recog_type':'非法船只'},
                    {'recog_id':'21','recog_type':'飞禽尸体'},
                    {'recog_id':'22','recog_type':'家禽尸体'},
                    {'recog_id':'23','recog_type':'其他尸体'},

                ],
                [
                    {'recog_id':'24','recog_type':'钓鱼'},
                    {'recog_id':'25','recog_type':'挖沙'},
                    {'recog_id':'10','recog_type':'倒垃圾'},
                    {'recog_id':'11','recog_type':'人员落水/游泳'},
                ],
                [
                    {'recog_id':'26','recog_type':'出水明管'},
                    {'recog_id':'27','recog_type':'无水明管'},
                    {'recog_id':'28','recog_type':'船只偏航'},
                    {'recog_id':'29','recog_type':'堤坝缺陷'},
                    {'recog_id':'8','recog_type':'河道侵占'},
                ]
            ],
            chosedCategoryId:"",
            chosedAITypeList:[],
            AIType:0
        }
    },
    methods: {
        refreshRecogTypeList() {
            console.log("chosedCategoryId:"+this.chosedCategoryId)
            this.chosedAITypeList = this.AITypes[this.chosedCategoryId]
            console.log(this.chosedAITypeList)
        },
        uploadResult() {
            this.record()
            this.uploadImag(this.snapshot_url)
            this.chosedCategoryId = ""
            this.chosedAITypeList = []
            this.dialogFormVisible = false
        },
        initOssInfo :function(){
            let OSS = require('ali-oss');
            let _this = this
            this.$axios.get(`http://47.114.52.47/app/upload/image/`, {}).then((response) => {
                console.log(response)
                _this.client = new OSS({
                    region: response.data.ossUrl.split('.aliyuncs.com')[0],
                    accessKeyId: response.data.accessKey,
                    accessKeySecret: response.data.accessSecret,
                    bucket: response.data.bucketName,
                });
            })
        },
        getFileBlob :function (url,file_type) {
            let _this = this;
            var axios = require('axios');
            var qs = require('qs');
            var data = qs.stringify({

            });
            console.log("prepare to download:"+url)
            var config = {
                method: 'get',
                url: url,
                headers: { },
                data : data,
                responseType : 'arraybuffer'
            };

            axios(config)
                .then(function (response) {
                    console.log(response)
                    const data = new OSS.Buffer(response);
                    _this.putObject(data,file_type)
                })
                .catch(function (error) {
                    console.log(error);
                    setTimeout(function () {
                        _this.getFileBlob(url);
                    },3000)

                });
        },

        putObject: async function(data,file_type) {
            try {
                if (file_type === 0){
                    console.log("start to upload snapshot to aliyun_oss")
                    // object-key可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
                    let result = await this.client.put('river/' + (new Date().getTime() + 1000) + '.png', data);
                    console.log(result);
                    this.uploadRecognizeResult(result.url)
                }else{
                    console.log("start to upload record to aliyun_oss")
                    let result = await this.client.put('river/' + (new Date().getTime() + 1000) + '.mp4', data);
                    console.log(result);
                    this.uploadRecognizeResult(result.url)
                }

            } catch (e) {
                console.log(e);
            }
        },
        uploadImag: function(url){
            let download_url = url
            let _this = this
            setTimeout(function () {
                _this.getFileBlob(download_url,0)
            },3000)

        },
        uploadRecord: function(url){
            let download_url = baseUrl+url
            let _this = this
            setTimeout(function () {
                _this.getFileBlob(download_url,1)
            },3000)

        },
        snapshot: function(){
            let url = '/api/v1/Snapshot'
            let _this = this
            this.$axios.get(url, {
                params: {
                    token:process.env.NODE_ENV === 'production'?_this.currentShip.shipNum:'test',
                    // token:_this.currentShip.shipNum
                }
            }).then(function (response) {
                if(response.bStatus === true){
                    var filepath = response.strUrl
                    console.log("截图filepath:"+filepath)
                    // filepath = "http://localhost:8080/mediastore/snapshot/token1/2020-08-10TZ08/111.png"
                    setTimeout(function () {
                        _this.snapshot_url = baseUrl+filepath
                        _this.dialogFormVisible = true
                    },1000)
                    // _this.record()
                    // _this.uploadImag(filepath)
                }else{
                    console.log("截图失败")
                    _this.$message.error("截图失败");
                }

            }).catch(function (error) {
                console.log(error)
            })
        },
        recordStop: function(filePath){
            let url = baseUrl+'/api/v1/ManualRecordStop'
            let _this = this
            this.$axios.get(url,{
                params:{
                    token:process.env.NODE_ENV === 'production'?_this.currentShip.shipNum:'test',
                    // token:_this.currentShip.shipNum
                }
            }).then(function (response) {
                if(response.bStatus === true){
                    console.log("停止录像,准备上传")
                    _this.uploadRecord(filePath)
                }else{
                    console.log("停止录像失败")
                }
            }).catch(function (error) {
                console.log("停止录像失败"+error)
            })
        },
        record: function () {
            let url = baseUrl+'/api/v1/ManualRecordStart';
            let _this = this;
            this.$axios
                .get(url, {
                    params: {
                        token:process.env.NODE_ENV === 'production'?_this.currentShip.shipNum:'test',
                    },
                })
                .then(function (response) {
                    if (response.bStatus === true) {
                        var filepath = response.strUrl;
                        console.log('录频路径:' + filepath);
                        setTimeout(function () {
                            _this.recordStop(filepath)
                        },30 * 1000);
                    } else {
                        console.log('录制失败');
                        _this.$message.error("录制失败");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        uploadRecognizeResult: function (file_url) {
            if (this.AITypes.length === 0) {
                console.log('不需标注数据，不上传');
                return;
            }
            let url = config.ROOT_API_URL + '/pc/ship/screen/';
            let _this = this;
            let paramlist = [];
            for (let i = 0;i < this.AIType.length;i++){
                let param = {
                    type:this.AIType[i],
                    count:1
                }
                paramlist.push(param);
            }
            let data = {
                shipNum: _this.shipNum,
                url: file_url,
                longitude: _this.currentShip.longitude,
                latitude: _this.currentShip.latitude,
                paramsList: paramlist,
            };
            this.$axios
                .post(url, data)
                .then(function (response) {
                    if (response.retCode === 0) {
                        console.log('上传后台成功，response=', response);
                        _this.$message({
                            message: '上传成功！',
                            type: 'success',
                        });
                    } else {
                        _this.$message.error(response.retMsg);
                    }
                })
                .catch(function (error) {
                    console.log('上传截屏信息失败,error= ' + error);
                });
        },
    },
    mounted() {
        this.initOssInfo();
        eventBus.$on('shipInfoList', (value) => {
            if (value.length > 0) {
                this.shipInfoList = value;
                if (this.shipNum === null && this.shipInfoList.length > 0) {
                    this.currentShip = this.shipInfoList[0];
                    this.shipNum = this.currentShip.shipNum;
                } else {
                    for (let i = 0; i < this.shipInfoList.length; i++) {
                        if (this.shipInfoList[i].shipNum === this.shipNum) {
                            this.currentShip = this.shipInfoList[i];
                            this.shipNum = this.currentShip.shipNum;
                            break;
                        }
                    }
                }
            }
        });
        eventBus.$on('chooseShipNum', (value) => {
            // console.log("三屏右屏监听地图选择", value);
            for (let i = 0; i < this.shipInfoList.length; i++) {
                if (this.shipInfoList[i].shipNum === value) {
                    this.currentShip = this.shipInfoList[i];
                    this.shipNum = this.currentShip.shipNum;
                    break;
                }
            }
        });
    }
}

</script>

<style scoped>

</style>