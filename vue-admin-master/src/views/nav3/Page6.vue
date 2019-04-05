<template>
    <div>
        <el-table   ref="singleTable"
            :data = "datatable"
            highlight-current-row
            border
            style="100%"
            >
            <el-table-column prop="Id" label="ID" width="100">            </el-table-column>
            <el-table-column prop="Uid" label="Uid" width="150"></el-table-column>

            <!-- <el-table-column prop="AvatarURL" label="头像"></el-table-column> -->
            <el-table-column label="申请认证" align="right"> 
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.Status"
                        @change="changeVip(scope.row)"
                        active-color="#13ce66"
					    inactive-color="#ff4949"
                        >
                    </el-switch>
 					<el-button @click="selectRow(scope.$index, scope.row)" type="primary" plain>查看</el-button>

                </template>
            </el-table-column>
        </el-table>
		<el-dialog
			:title="dialogTitle"
			:visible.sync="centerDialogVisible"
			width="30%"
			center>
			<span>{{dialogContent}}</span><br>
			<img v-for="(item,index) in file" :key="index" :src="item" alt="" srcset="">
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            datatable:[],
			dialogTitle:'',
			dialogContent:'',
			file:[],
			centerDialogVisible: false,

        }
    },
    computed:{
        token(){
            return this.$store.state.token
        }
    },
    methods:{
        changeVip(row){
			let st = row.Status == true ? -1 : 0
            
            this.$http.put("https://cosplay.it7e.com/v1/superauth/" + row.Id + "?access_token=" + this.token,{
                "Status": st
            }).then(function(data){
                if(data.body.code == 0){
					row.Status == 0 ? row.Status = false : row.Status = true;
                }
            })
        },
        selectRow(val,row){   					//点击显示弹窗
			this.centerDialogVisible = true,
			this.dialogTitle = row.Title,
			this.dialogContent = row.Content;
			this.getpic(row.Id)
		},
		getpic(Id){
			this.file = [];
			// this.$http.get("https://cosplay.it7e.com/v1/attachlist/?access_token=" + this.token + "&query=Pid%3A" + Id +"&sortby=Id&order=desc").then(function(data){
            //     console.log(data);
                
			// 	data.data.data.map(item => {
			// 		this.file.push("https://cosplay.it7e.com/" + item.File)
			// 	})
            // })
            this.datatable.map(item => {
                if(item.Id == Id){
                    this.file.push("https://cosplay.it7e.com/" + item.PhotoURL)
                }
            })
		},
    },
    created(){
        this.$http.get("https://cosplay.it7e.com/v1/superauth/?access_token=" + this.token).then(function(data){
            data.data.data.map(item => {
                item.Status == -1 ? item.Status = true : item.Status = false
            })
            this.datatable = data.data.data;
            
        })
    }
}
</script>