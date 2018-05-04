<template>
<div class="student-info-logging">
    <div class="wrapper">
        <div class="header">
            <div class="logo-wrapper">
            </div>
            <div class="about-wrapper">
                <span class="txt">关于我们</span>
            </div>
            <router-link to="/">
                <div class="goback-wrapper">
                    <span class="txt">返回首页</span>
                </div>
            </router-link>
        </div>
        <div class="siderbar">
            <ul>
                <li class="active">学生花名册录入</li>
                <li>学生成绩录入</li>
                <li>特长分录入</li>
                <li>学科评价参数录入</li>
                <li>自定义评价公式</li>
            </ul>
        </div>
        <div class="content-wrapper">
            <input class="file-input" type="file" multiple="false" id="sheetjs-input" accept="xls,xlsx" @change="onchange" />
            <div class="table-wrapper">
                <el-button  class="btn-addRow" @click="addRow">
                    <span>+</span>
                </el-button>
                <el-table
                        class="userlist tb-edit"
                        :highlight-current-row="true"
                        @row-click="handleCurrentChange"
                        :data="userlist.slice((currentPage-1)*pagesize,currentPage*pagesize)">
                    <el-table-column
                            prop="姓名"
                            label="用户名"
                            min-width="80">
                        <template scope="scope">
                            <el-input size="small" v-model="scope.row.姓名"
                                      @change="handleEdit(scope.$index, scope.row)">
                            </el-input>
                            <span>{{ scope.row.姓名}}</span>
                            <!--<el-input  v-model="scope.row.姓名" v-if="scope.row.姓名"-->
                            <!--@blur="loseFcous(scope.$index, scope.row)" > </el-input>-->
                            <!--<span style="margin-left: 10px" v-else>{{ scope.row.姓名 }}</span>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="学号"
                            label="学号"
                            min-width="80">
                        <template scope="scope">
                            <el-input size="small" v-model="scope.row.学号"
                                      @change="handleEdit(scope.$index, scope.row)">
                            </el-input>
                            <span>{{ scope.row.学号}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="班级"
                            label="班级"
                            min-width="80">
                        <template scope="scope">
                            <el-input size="small" v-model="scope.row.班级"
                                      @change="handleEdit(scope.$index, scope.row)">
                            </el-input>
                            <span>{{ scope.row.班级}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="年级"
                            label="年级"
                            min-width="80">
                        <template scope="scope">
                            <el-input size="small" v-model="scope.row.年级"
                                      @change="handleEdit(scope.$index, scope.row)">
                            </el-input>
                            <span>{{ scope.row.年级}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            min-width="80">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click.native.prevent="handleDelete(scope.$index, scope.row, userlist)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="userlist.length"
                        :page-size="pagesize"
                        :current-page.sync = "currentPage"
                        @current-change="current_change">
                </el-pagination>
            </div>
        </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">

//    之前准备用node-xlsx来做，现在直接用js-xlsx
//    import xlsx from 'node-xlsx';
//    const workSheetsFromFile = xlsx.parse('static/chengji.xlsx');
//    console.log('workSheetsFromFile is ',JSON.stringify(workSheetsFromFile))
    import XLSX from 'xlsx'
    import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";
    export default {
        created() {

        },
        components: {ElInput},
        data() {
            return {
                data: [],
                userlist: [],
                currentPage: 1,
                pagesize: 9
            }
        },
        methods: {
            addRow() {
                this.userlist.push({});
                this.currentPage =Math.ceil(this.userlist.length/this.pagesize);
            },
            handleCurrentChange(row, event, column) {
                console.log(row, event, column, event.currentTarget)
            },
            handleDelete(index,row,userlist) {
                userlist.splice(index, 1);
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            current_change(currentPage) {
                this.currentPage = currentPage;
            },
            onchange: function (evt) {
                var file;
                var files = evt.target.files;
                var self = this;

                if (!files || files.length == 0) return;

                file = files[0];

                var reader = new FileReader();
                reader.onload = function (e) {
                    // 数据预处理
                    var binary = "";
                    var bytes = new Uint8Array(e.target.result);
                    var length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }

                    /* 读取 workbook */
                    var wb = XLSX.read(binary, {
                        type: 'binary'
                    });

                    /* 选择第一个sheet */
                    var wsname = wb.SheetNames[0];
                    var ws = wb.Sheets[wsname];

                    /* excel转换json数组,加上{header:1}是普通数组，不写是对象数组 */
                    self.data = XLSX.utils.sheet_to_json(ws);
//          this.$nextTick(() => {
                    self.userlist = self.data;
//          });
                    console.log(self.data);

                    /* 生成html表格 */
                    var HTML = XLSX.utils.sheet_to_html(ws);

                    document.getElementById('out-table').innerHTML = HTML;
                    /* 显示导出Excel按钮 */
                    document.getElementById('export-table').style.visibility = "visible";
                };

                reader.readAsArrayBuffer(file);
            },
            onexportByHtml: function () {
                /* html表格转excel */
                var wb = XLSX.utils.table_to_book(document.getElementById('out-table'));
                /* 生成文件，导出D盘 */
                XLSX.writeFile(wb, "D://sheetjs_html.xlsx");
            },
            onexportByJson: function () {
                /* json数组转换excel */
                var worksheet = XLSX.utils.aoa_to_sheet(this.data);
                var new_workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(new_workbook, worksheet, "sheetjs");
                /* 生成文件，导出D盘 */
                XLSX.writeFile(new_workbook, "D://sheetjs_json.xlsx");
            }
        }
    }
</script>

<style lang="scss" scoped>
.wrapper {
    position: relative;
    width: 1142px;
    height: 700px;
    background: #dce4e7;
    @import '../../common/_partial/header';
    @import '../../common/_partial/siderbar';
    .siderbar {
        .active {
            color:#fff;
            background: #6fcc3f;
        }
    }
    .content-wrapper {
        position: absolute;
        top: 66px;
        left: 220px;
        width: 1142-250px;
        height: 700-66px;
        .table-wrapper {
            .btn-addRow {
                /*position: absolute;*/
                /*top:10px;*/
                /*right:10px;*/
                float: right;
            }
            .tb-edit {
                .el-input {
                    display: none
                }
                .current-row {
                    .el-input {
                        display: block
                    }
                    .el-input+span {
                        display: none
                    }
                }
            }
        }
    }
}
</style>