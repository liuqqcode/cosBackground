<template>
    <div>
        <el-table   ref="singleTable"
            :data = "datatable"
            highlight-current-row
            border
            style="100%"
            >
            <el-table-column prop="Id" label="ID" width="100">            </el-table-column>
            <el-table-column prop="Username" label="用户名" width="150"></el-table-column>
            <el-table-column prop="Email" label="邮箱" width="180"></el-table-column>
            <el-table-column prop="Super" label="超级会员" width="100"></el-table-column>
            <el-table-column prop="Enounce" label="个性签名" width="200"></el-table-column>
            <!-- <el-table-column prop="AvatarURL" label="头像"></el-table-column> -->
            <el-table-column label="会员禁用" align="right"> 
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.Status"
                        @change="changeVip(scope.row.Status)"
                        active-color="#13ce66"
					    inactive-color="#ff4949"
                        >
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            datatable:[]
        }
    },
    computed:{
        token(){
            return this.$store.state.token
        }
    },
    methods:{
        changeVip(row){
			let st = (row.Status == true ? row.Status = 1 : row.Status = 0)

            this.$http.put("https://cosplay.it7e.com/v1/superauth/" + row.Id,{
                "Status": st
            }).then(function(data){
                if(data.body.code == 0){
					row.Status == 0 ? row.Status = false : row.Status = true;
                }
            })
        }
    },
    created(){
        this.$http.get("https://cosplay.it7e.com/v1/user/?access_token=" + this.token).then(function(data){
            console.log(data);
            data.data.data.map(item => {
                item.Status == 0 ? item.Status = true : item.Status = false
                if(item.Super == 0){
                    this.datatable.push(item);
                }
            })

            
        })
    }
}
</script>