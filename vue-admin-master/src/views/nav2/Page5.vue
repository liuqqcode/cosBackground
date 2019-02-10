<template>
	<div>
		<el-table ref="singleTable"
			:data="userData"
			highlight-current-row
			
			style="width: 100%">
			<el-table-column
				type="index"
				width="100">
			</el-table-column>
			<el-table-column
				property="Title"
				label="标题"
				width="180">
			</el-table-column>
			<el-table-column
				property="Content"
				label="内容"
				>
			</el-table-column>

			<el-table-column align="right" label="审核">
				<template  slot-scope="scope">
					<el-switch
					v-model="scope.row.Status"
					@change="switchChange(scope.row)"
					active-color="#13ce66"
					inactive-color="#ff4949">
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
// import Bus from '../bus.js'
export default {
	data(){
		return{
			token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxIiwiZXhwIjoiMTU0OTY3NjEwMjM4NjgxMDM0NSIsImlhdCI6IjAifQ.s3PxaZMlkEHw5XADndesvLaFMhD6MiVOHxAJU4Vqe_8',
			userData:[],
			dialogTitle:'',
			dialogContent:'',
			centerDialogVisible: false,
			file:[]
		}
	},
	methods:{
		selectRow(val,row){   					//显示弹窗
			this.centerDialogVisible = true,
			this.dialogTitle = row.Title,
			this.dialogContent = row.Content,
			this.userData.forEach(item => {
				this.$http.get("https://cosplay.it7e.com/v1/attachlist?access_token=" + this.token + "&query=Pid%3A" + item.Id +"&sortby=Id&order=desc").then(function(data){
					// console.log(data.data.data.File);

					// this.$set(item,'File',data.data.data)
					// this.file = row.File[0]
					for(let i = 0 ; i < data.data.data.length ; i++){
						this.file[i] = "https://cosplay.it7e.com/" + data.data.data[i].File
					}
					
				})
			});

		},
		switchChange(val){						//是否展示的开关
			let st = (val.Status == true ? val.Status = 1 : val.Status = 0)
			this.$http.put("https://cosplay.it7e.com/v1/posts/"+ val.Id +"?access_token=" + this.token,
				{
					"Content":val.Content,
					"Status":st,
					"Title":val.Title
				}
			).then(function(data){
				if(data.body.code == 0){
					val.Status == 0 ? val.Status = false : val.Status = true;
				}
			})
		}
	},
	created(){
		// Bus.$on('val',(data) => {
		// 	console.log(data);
		// 	this.token = data.token;
		// }),
		this.$http.get("https://cosplay.it7e.com/v1/posts?access_token=" + this.token).then(function(res){
			for(let i = 0; i < res.data.data.length; i++){
				if(res.data.data[i].Status == 0){
					res.data.data[i].Status = false;
				}
				else if(res.data.data[i].Status == 1){
					res.data.data[i].Status = true
				}
			}
			this.userData = res.data.data
		})
	}
}
</script>