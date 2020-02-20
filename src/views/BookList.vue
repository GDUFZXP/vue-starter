<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="id"
                    label="序号"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="书籍名称"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="author"
                    label="作者"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页的current-change 方法-->

        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
                @current-change="page">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        methods: {
            edit(row) {
                this.$router.push({
                    path:"/bookEdit",
                    query: {
                        id:row.id
                    }
                });
            },
            del(row) {
                const _this = this;
                this.$confirm('是否删除该记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get("http://localhost:8081/book/del/"+row.id).then(function (resp) {
                        if(resp.data == "success"){
                            _this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            window.location.reload();
                        }else{
                            _this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            page(currentPage){
                const _this = this;
                axios.get('http://localhost:8081/book/list/'+(currentPage-1)+'/5').then(function (resp) {
                    console.log(resp)
                    console.log(resp.data.content)
                    _this.tableData = resp.data.content;
                    _this.pageSize = resp.data.size;
                    _this.total = resp.data.totalElements;
                })
            }
        },

        data() {
            return {
                pageSize:5,
                total:0,
                tableData: []
            }
        },

        created() {
            const _this = this;
            axios.get('http://localhost:8081/book/list/0/5').then(function (resp) {
                console.log(resp)
                console.log(resp.data.content)
                _this.tableData = resp.data.content;
                _this.pageSize = resp.data.size;
                _this.total = resp.data.totalElements;
            })
        }
    }
</script>
