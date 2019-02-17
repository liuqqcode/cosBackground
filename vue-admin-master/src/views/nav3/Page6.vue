<template>
    <div>
        <el-table
            :data = "datatable"
            style="100%"
            >
            <el-table-column prop="Id" label="ID" width="100">            </el-table-column>
            <el-table-column prop="Username" label="用户名" width="150"></el-table-column>
            <el-table-column prop="Email" label="邮箱" width="180"></el-table-column>
            <el-table-column prop="Super" label="超级会员" width="100"></el-table-column>
            <el-table-column prop="Enounce" label="个性签名" width="200"></el-table-column>
            <el-table-column prop="AvatarURL" label="头像"></el-table-column>
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
    created(){
        this.$http.get("https://cosplay.it7e.com/v1/user/?access_token=" + this.token).then(function(data){
            
            this.datatable = data.data.data;
            
        })
    }
}
</script>