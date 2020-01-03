<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 产品管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select clearable v-model="searchKey" placeholder="请选择公司名" class="mr10">
                    <el-option v-for="item in companyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    <!-- <el-option key="2" label="湖南省" value="湖南省"></el-option> -->
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button class="add-sty" type="primary" icon="el-icon-plus" @click="add()">增加</el-button>
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
                <el-table-column prop="id" label="ID" width="100" align="center"></el-table-column>
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
                <el-table-column prop="intro" label="内容" align="center"></el-table-column>
                <!-- <el-table-column prop="time" label="日期" align="center"></el-table-column> -->
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
                    <el-form-item label="简介">
                        <el-input type="textarea" :rows="2" v-model="formAdd.intro" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveAdd">确 定</el-button>
                </span>
            </el-dialog>

            <!--  编辑 -->
            <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
                <el-form ref="form" :model="formEdit" label-width="70px">
                    <el-form-item label="公司">
                        <el-select v-model="formEdit.state" placeholder="请选择">
                            <el-option v-for="item in companyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="formEdit.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input type="textarea" :rows="2" v-model="formEdit.intro" placeholder="请输入内容"></el-input>
                    </el-form-item>
              
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import API from '@/api';
export default {
    name: 'icon',
    data() {
        return {
            searchKey: '',
            tableData: [],
            page: {
                currentPage: 1,
                pageSize: 10,
                total: 0
            },
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
            addVisible: false,
            editVisible: false,
            formAdd: {},
            formEdit: {}
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getList();
        },
        getList() {
            let params = {
                page: this.page.currentPage - 1,
                state: this.searchKey
            };
            API.getProductList(params).then(res => {
                if (res.code == 200) {
                    console.log('getList', res);
                    this.tableData = res.data.rows;
                    this.page.total = res.data.total;
                }
            });
        },
        handleSearch() {
            this.page.currentPage = 1;
            this.getList();
        },
        add() {
            this.addVisible = true;
        },
        handleEdit(index, row) {
            this.formEdit = JSON.parse(JSON.stringify(row));
            this.editVisible = true;
        },
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.del(row.id);
                })
                .catch(() => {});
        },
        del(id) {
            let params = [id];

            API.delProduct(params).then(res => {
                if (res.code == 200) {
                    this.$message.success('删除成功');
                    this.page.currentPage = 1;
                    this.getList();
                }
            });
        },
        handleSelectionChange() {},
        handlePageChange() {},
        saveAdd() {
            let params = {
                state: this.formAdd.state,
                title: this.formAdd.title,
                intro: this.formAdd.intro,
            };
            API.addProduct(params).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.$message.success('操作成功');
                    this.formAdd = {};
                    this.addVisible = false;
                    this.page.currentPage = 1;
                    this.getList();
                }
            });
        },
        saveEdit() {
            let params = {
                id: this.formEdit.id,
                state: this.formEdit.state,
                title: this.formEdit.title,
                intro: this.formEdit.intro,
            
            };
            API.editProduct(params).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.$message.success('操作成功');
                    this.formEdit = {};
                    this.editVisible = false;
                    this.page.currentPage = 1;
                    this.getList();
                }
            });
        }
    },
    computed: {}
};
</script>

<style>
.message-title {
    cursor: pointer;
}
.handle-row {
    margin-top: 30px;
}
.handle-box {
    margin-bottom: 20px;
}
.mr10 {
    margin-right: 10px;
}
.handle-input {
    width: 300px;
    display: inline-block;
}
.add-sty {
    float: right;
    margin-right: 50px;
}
.table {
    width: 100%;
    font-size: 14px;
}
</style>
