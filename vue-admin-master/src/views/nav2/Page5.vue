<template>
	<div>
		<el-table ref="singleTable"
			:data="userData"
			highlight-current-row
			border
			style="width: 100%">
			<!-- <el-table-column
				type="index"
				width="100">
			</el-table-column> -->
			<el-table-column
				sortable
				property="Id"
				label="Id"
				width="180">
			</el-table-column>
			<el-table-column
				sortable
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

		<div class="block">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="currentPage3"
				:page-size="20"
				layout="prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</div>
	</div>

</template>

<script>
// import Bus from '../bus.js'
  import Cookies from 'js-cookie'

export default {
	data(){
		return{
			total: 20,
			userData:[],
			dialogTitle:'',
			dialogContent:'',
			centerDialogVisible: false,
			file:[],
			currentPage3: 1
		}
	},
	computed:{
        token(){
            return this.$store.state.token
        }
		},
		
	methods:{
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			let valnum = `${val}` * 20;
			this.$http.get("https://cosplay.it7e.com/v1/posts?access_token=" + this.token + "&reqtype=2&sortby=Id&order=desc&limit=20&offset=" + valnum).then(function(res){
				this.total = res.data.data.pop().recordNum;
				let resdata = Object.assign({},res.data.data)
				res.data.data.map(item => {
					item.Status == 0 ? item.Status = false : item.Status = true;
				})
				this.userData = res.data.data
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
			this.$http.get("https://cosplay.it7e.com/v1/attachlist/?access_token=" + this.token + "&query=Pid%3A" + Id +"&sortby=Id&order=desc").then(function(data){
				data.data.data.map(item => {
					this.file.push("https://cosplay.it7e.com/" + item.File)
				})
			})
		},
		switchChange(val){						//点击修改开关的值
			let st = (val.Status == true ? val.Status = 1 : val.Status = 0)
			this.$http.put("https://cosplay.it7e.com/v1/posts/"+ val.Id +"?access_token=" + this.token,
				{
					"Content":val.Content,
					"Status":st,
					"Title":val.Title
				},
				{
					emulateJSON:true
				}
			).then(function(data){
				if(data.body.code == 0){
					val.Status == 0 ? val.Status = false : val.Status = true;
				}
			})
		}
	},
	created(){
		Cookies.get("token")
		this.$http.get("https://cosplay.it7e.com/v1/posts?access_token=" + this.token + "&reqtype=2&sortby=Id&order=desc&limit=20").then(function(res){
			this.total = res.data.data.pop().recordNum;
			let resdata = Object.assign({},res.data.data)
			res.data.data.map(item => {
				item.Status == 0 ? item.Status = false : item.Status = true;
			})

			this.userData = res.data.data
		})
	}
}
</script>
<style>
	.el-dialog__body>img{
		width: 46%;
		margin: 1.5%;
		padding: 3px;
		background: black;

	}
</style>
