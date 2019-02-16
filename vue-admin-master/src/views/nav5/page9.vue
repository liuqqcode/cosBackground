<template>
    <div>
        <el-table
            ref="singleTable"
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="Date"
                label="日期"
                width="220">
            </el-table-column>
            <el-table-column
                prop="Alipay_account"
                label="交易账号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="username"
                label="发起人"
                width="180">
            </el-table-column>
            <el-table-column
                prop="Trade_no"
                label="单号"
                width="270">
            </el-table-column>
            <el-table-column
                prop="Number"
                label="金额"
                width="180">
            </el-table-column>
            <el-table-column
                prop="Type"
                label="类型"
                width="180">
            </el-table-column>
            <el-table-column
                prop="Title"
                label="说明">
            </el-table-column>
            <el-table-column align="right" label="审核">
				<template  slot-scope="scope">
                    <el-button @click="selectRow(scope.$index, scope.row)" v-if="scope.row.Type == '提现'" type="primary" plain>查看</el-button>
				</template>
			</el-table-column>
        </el-table>

    </div>
</template>
<script>
export default {
    data(){
        return{
            tableData:[],
            dialogTitle:'',
            centerDialogVisible:false,
            // token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxIiwiZXhwIjoiMTU1MDI5NTQzODUyOTg0ODUzMiIsImlhdCI6IjAifQ.oBDxd84M8RuvAdYkxlb84gLzy6-DpWCghcuWOGJmayw"
        }
    },
    computed:{
        token(){
            return this.$store.state.token
        }
    },
    methods:{
        getdata(){
            this.$http.get("https://cosplay.it7e.com/v1/finance/?access_token=" + this.token).then(function(data){
                
                for(let i = 0; i < data.data.data.length; i++){
                    data.data.data[i].Type == 0 ? data.data.data[i].Type = '充值' : data.data.data[i].Type = '提现';
                }
                this.tableData = data.data.data;
                this.tableData.forEach(item => {
                    this.$http.get("https://cosplay.it7e.com/v1/user/" + item.Uid + "?access_token=" + this.token).then(function(data){
                        this.$set(item,'username',data.data.data.username)
                    })
                });
            });
        },
        selectRow(val,row){
            this.$prompt('请输入转账的订单号', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /\S/,
                inputErrorMessage: '格式不正确'
            }).then(({ value }) => {
                this.$http.put("https://cosplay.it7e.com/v1/finance/" + row.Id + "?access_token=" + this.token,
                    {
                        "Status":1,
                        "Trade_no": value
                    }
                ).then(function(data){
                    this.$message({
                        type: 'success',
                        message: '你提交的订单号是: ' + value
                    });
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消操作'
                });       
            });
            
        }
    },
    created(){
        this.getdata();
    }
}
</script>