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
			let st = row.Status == true ? -1 : 0
            
            this.$http.put("https://cosplay.it7e.com/v1/superauth/" + row.Id + "?access_token=" + this.token,{
                "Status": st
            }).then(function(data){
                if(data.body.code == 0){
					row.Status == 0 ? row.Status = false : row.Status = true;
                }
            })
        }
    },
    created(){
        this.$http.get("https://cosplay.it7e.com/v1/superauth/?access_token=" + this.token).then(function(data){
            console.log(data);
            data.data.data.map(item => {
                item.Status == -1 ? item.Status = true : item.Status = false
                if(item.Status == false){
                    this.datatable.push(item)
                }
            })
        })
    }
}
</script>