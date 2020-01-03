<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 联系留言管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="searchKey" placeholder="手机号查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <!-- <el-button class="add-sty" type="primary" icon="el-icon-plus" @click="add()">增加</el-button> -->
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
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="mail" label="电子邮件" align="center"></el-table-column>
                 <el-table-column prop="content" label="留言" align="center"></el-table-column>
                <!-- <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column> -->
                <!-- <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column> -->
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
    </div>
</template>

<script>
import API from '@/api';
export default {
    name: 'message',
    data() {
        return {
            searchKey: '',
            tableData: [],
            page: {
                currentPage: 1,
                pageSize: 10,
                total: 0
            }
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
                phone: this.searchKey
            };
            API.getContactList(params).then(res => {
                if (res.code == 200) {
                    console.log('getList', res);
                    this.tableData = res.data.rows
                    this.page.total = res.data.total
                }
            });
        },
        handleSearch() {
            this.page.currentPage = 1
            this.getList()
        },
        add() {},
        handleSelectionChange() {},
           // 分页导航
        handlePageChange(val) {
            this.page.currentPage = val;
            this.getList();
        },
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
