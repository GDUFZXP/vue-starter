<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="书籍名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="书籍作者" prop="author">
            <el-input v-model="ruleForm.author"></el-input>
        </el-form-item>
        <el-form-item label="书籍id" v-show="false" prop="author">
            <el-input v-model="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="bookList()">返回列表</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    author: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入书籍名称', trigger: 'blur' }
                    ],
                    author: [
                        { required: true, message: '请输入书籍作者', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('http://localhost:8081/book/save', _this.ruleForm).then(function (response) {
                            if(response.data == "success"){
                                _this.$refs[formName].resetFields();
                                _this.$message({
                                    showClose: true,
                                    message: '添加成功',
                                    type: 'success'
                                });
                            }else{
                                _this.$message.error('添加失败');
                            }
                        })
                    } else {
                        this.$message({
                            showClose: true,
                            message: '请检查填写内容',
                            type: 'warning'
                        });
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            bookList(){
                this.$router.push("/bookList")
            }
        },
        created() {
            const _this = this;
            var id = this.$route.query.id;
            axios.get("http://localhost:8081/book/get/"+id).then(function (resp) {
                console.log(resp);
                if(resp){
                    _this.ruleForm=resp.data;
                }else{
                    _this.$message.error('书籍新信息为空');
                }
            })
        }
    }
</script>