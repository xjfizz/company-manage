<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 轮播图管理 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button> -->
                <el-select clearable v-model="searchState" placeholder="请选择公司名" class="mr10">
                    <el-option v-for="item in companyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    <!-- <el-option key="2" label="湖南省" value="湖南省"></el-option> -->
                </el-select>
                <!-- <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input> -->
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button class="add-sty" type="primary" icon="el-icon-plus" @click="addImg()">增加</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="state" label="公司名">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.state == 1">江苏二四优递生活服务有限公司</el-tag>
                        <el-tag type="warning" v-else-if="scope.row.state == 2">江苏玥珮物流有限公司</el-tag>
                        <el-tag type="info" v-else-if="scope.row.state == 3">江苏蜗活电子商务有限公司</el-tag>
                        <el-tag type="danger" v-else-if="scope.row.state == 4">重庆二四优递生活服务有限公司</el-tag>
                        <el-tag v-else-if="scope.row.state == 5">江苏华软智能信息科技有限公司</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="content" label="内容"></el-table-column>
                <el-table-column label="轮播图" align="center">
                    <template slot-scope="scope">
                        <el-image class="table-td-thumb" :src="scope.row.img" :preview-src-list="[scope.row.img]"></el-image>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="address" label="地址"></el-table-column> -->
                <!-- <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.state === '成功' ? 'success' : scope.row.state === '失败' ? 'danger' : ''">{{
                            scope.row.state
                        }}</el-tag>
                    </template>
                </el-table-column> -->
               
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="page.currentPage"
                    :page-size="page.pageSize"
                    :total="page.total"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="公司">
                    <el-select v-model="form.state" placeholder="请选择">
                        <el-option v-for="item in companyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="form.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                     <el-input v-model="form.content" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="轮播图">
                    <!-- <el-input v-model="form.img"></el-input> -->
                    <!-- <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :auto-upload="false"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-change="uploadChange">
                    <img v-if="form.img" :src="form.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                    <!-- <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :auto-upload="false"
                            :limit="0"
                            :on-change="uploadChange">
                         <img v-if="form.img" :src="form.img" class="avatar">
                         <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                    <el-upload
                        action="action"
                        :file-list="fileListEdit"
                        :auto-upload="false"
                        list-type="picture-card"
                        :limit="1"
                        :on-change="uploadChange"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!--  增加 -->
        <el-dialog title="增加" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="formAdd" label-width="70px">
                <el-form-item label="公司">
                    <el-select v-model="formAdd.state" placeholder="请选择">
                        <el-option v-for="item in companyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="formAdd.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                     <el-input v-model="formAdd.content" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="轮播图">
                    <el-upload
                        action="action"
                        :file-list="fileListEdit"
                        :auto-upload="false"
                        list-type="picture-card"
                        :limit="1"
                        :on-change="uploadChange"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
import API from '@/api';
export default {
    name: 'banner',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            page: {
                pageSize: 10,
                currentPage: 1,
                total: 0
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            form: {},
            formAdd: {
                state: 1
            },
            searchState: '',
            idx: -1,
            id: -1,
            imageUrl: '',
            fileListEdit: [],
            companyList: [
                {
                    value: 5,
                    label: '江苏华软智能信息科技有限公司'
                },
                {
                    value: 1,
                    label: '江苏二四优递生活服务有限公司'
                },
                {
                    value: 2,
                    label: '江苏玥珮物流有限公司'
                },
                {
                    value: 3,
                    label: '江苏蜗活电子商务有限公司'
                },
                {
                    value: 4,
                    label: '重庆二四优递生活服务有限公司'
                }
            ],
            imgChange: false
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            let param = {
                state: this.searchState,
                page: this.page.currentPage - 1,
                limit: this.page.pageSize
            };
            API.getlunboList(param).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data.rows;
                    this.page.total = res.data.total;
                }
            });
        },
        // 触发搜索按钮
        handleSearch() {
            //  this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.delImg(row.id)
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = JSON.parse(JSON.stringify(row));
            this.fileListEdit = [{ url: this.form.img }];
            this.editVisible = true;
        },
        // 增加轮播图
        addImg() {
            this.addVisible = true;
             this.formAdd =  {}
             this.fileListEdit = []
        },
        // 保存编辑
        saveEdit() {
            // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            // this.$set(this.tableData, this.idx, this.form);
            if(this.imgChange) {
               this.uploadImg(); 
            } else {
                this.imageUrl = this.form.img
                this.formSubmitEdit()
            }
            
        },
        delImg(id) {
            let params = [id]
            
            API.delImg(params).then(res => {
                if(res.code == 200) {
                    this.$message.success('删除成功')
                    this.page.currentPage = 1
                    this.getData()
                }
            })
        },
        // 保存增加
        saveAdd() {
            // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            // this.$set(this.tableData, this.idx, this.form);
            this.uploadImgAdd();
        },
        // 分页导航
        handlePageChange(val) {
            this.page.currentPage = val;
            this.getData();
        },

        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        uploadChange(file, fileList) {
            console.log(file, fileList);
            this.imageUrl = file.raw;
            this.imgChange = true
            //    this.form.img =  this.imageUrl
        },
        // 上传图片
        uploadImg() {
            let formData = new FormData();
            formData.append('id', this.form.id);
            formData.append('file', this.imageUrl);

            API.fileUpLoad(formData).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.$message.success({
                        type: 'warn',
                        message: res.message
                    });

                    this.editVisible = false;
                    this.imageUrl = res.data
                    this.formSubmitEdit();

                  
                } else {
                    this.$message.warning({
                        type: 'warn',
                        message: res.message
                    });
                }
            });
        },
        // 上传图片Add
        uploadImgAdd() {
            let formData = new FormData();
            formData.append('id', this.formAdd.state);
            formData.append('file', this.imageUrl);

            API.fileUpLoad(formData).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.$message.success({
                        type: 'warn',
                        message: res.message
                    });
                    this.addVisible = false;
                    this.imageUrl = res.data
                    this.formSubmitAdd();

                    // this.formAdd = {
                    //     state: 1
                    // };
                    // this.fileListEdit = [];
                    // this.addVisible = false;
                    // this.page = 1;
                    // this.getData();
                } else {
                    this.$message.warning({
                        type: 'warn',
                        message: res.message
                    });
                }
            });
        },
        // 提交表单-add
        formSubmitAdd() {
            let params = {
                img: this.imageUrl,
                state: this.formAdd.state,
                content:this.formAdd.content,
                title: this.formAdd.title
            }
            API.addlunboList(params).then(res => {
                console.log(res)
                if(res.code == 200 ) {
                    this.formAdd = {
                        state: 1
                    };
                    // this.fileListEdit = [];
                    // this.addVisible = false;
                    this.page.currentPage = 1;
                    this.getData();
                }
            })
        },
                // 提交表单-edit
        formSubmitEdit() {
            let params = {
                id: this.form.id,
                img: this.imageUrl,
                state: this.form.state,
                content:this.form.content,
                title: this.form.title
            }
            API.upDatalunboList(params).then(res => {
                console.log(res)
                if(res.code == 200 ) {
                    this.form = {
                        state: 1
                    };
                    // this.fileListEdit = [];
                    // this.addVisible = false;
                     this.editVisible = false;
                    this.imgChange = false
                    this.page.currentPage = 1;
                    this.getData();
                }
            })
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.avatar {
    width: 100%;
    height: 100%;
}
.add-sty {
    float: right;
    margin-right: 50px;
}
</style>
