<template>
<div class="student-info-logging">
    <div class="control-wrapper">
        <input class="file-input" type="file" multiple="false" id="sheetjs-input" accept="xls,xlsx" @change="onchange" />
        <!--<el-input class="file-input" type="file" multiple="false" id="sheetjs-input" accept="xls,xlsx" @change="onchange"></el-input>-->
        <button id="save-dialog" v-show="userlist.length>0" @click="saveExcel">保存表格到指定位置</button>
        <span class="search">
            <el-input width="50" v-model="searchClass" placeholder="选择班级"></el-input>
        </span>
        <span class="search">
            <el-input width="50" v-model="searchStudentNum" placeholder="选择学号"></el-input>
        </span>
        <span class="search">
            <el-input width="50" v-model="searchStudentName" placeholder="选择姓名"></el-input>
        </span>
        <span class="search">
            <el-input width="50" v-model="searchGrade" placeholder="选择年级"></el-input>
        </span>
    </div>
    <div class="table-wrapper">
        <el-button  class="btn-addRow" @click="addRow">
            <span>+</span>
        </el-button>
        <el-table
                id="tb-edit"
                class="userlist"
                border
                size="small"
                :highlight-current-row="true"
                @row-click="handleCurrentChange"
                :data="filterDated.slice((currentPage-1)*pagesize,currentPage*pagesize)">
            <el-table-column
                    prop="姓名"
                    label="用户名"
                    min-width="80">
                <template slot-scope="scope">
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
                <template slot-scope="scope">
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
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.班级"
                              @change="handleEdit(scope.$index, scope.row)">
                    </el-input>
                    <span>{{ scope.row.班级}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="年级"
                    label="年级"
                    min-width="80"
                    :filters="[{text: '七年级', value: '7'}, {text: '八年级', value: '8'}, {text: '九年级', value: '9'}]"
                    :filter-method="filterGradeHandler">
                <template slot-scope="scope">
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
                            @click.native.prevent="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="filterDated.length"
            :page-size="pagesize"
            :current-page.sync = "currentPage"
            @current-change="current_change">
        </el-pagination>
    </div>
    <!--<div id="out-table" v-show="false"></div>-->
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
        components: {ElInput},
        data() {
            return {
                userlist: [],
                currentPage: 1,
                pagesize: 9,
                searchClass: '',
                searchStudentNum: '',
                searchStudentName: '',
                searchGrade: '',
            }
        },
        computed: {
            filterDated() {
                console.log(this.userlist);
                return this.userlist.filter((item) => {
                    return !this.searchStudentName || this.searchStudentName === item.姓名;
                }).filter((item)=>{
                    return !this.searchClass || this.searchClass === item.班级;
                }).filter((item)=>{
                    return !this.searchGrade || this.searchGrade === item.年级;
                }).filter((item)=>{
                    return !this.searchStudentNum || this.searchStudentNum === item.学号;
                })
            }
        },

        methods: {
            filterGradeHandler(value, row, column) {
                console.log('value is ',value);
                console.log('row is ',row);
                console.log('column is ',column);
                const property = column['property'];
                return row[property] === value;
            },
            addRow() {
                this.$nextTick(()=>{
                    this.userlist.push({__rowNum__: this.userlist.length+1 });
                    this.currentPage =Math.ceil(this.userlist.length/this.pagesize);
                })
            },
            handleCurrentChange(row, event, column) {
//                console.log(row, event, column, event.currentTarget)
            },
            handleDelete(index,row) {
//                console.log('delete: now index is ',index);
//                console.log('delete: now row is ',row);
//                console.log('delete: now row.__rowNum__ is ',row.__rowNum__);
//                console.log('delete: now this.currentPage*index is',(this.currentPage-1)*this.pagesize+(index+1))
//                console.log('delete: now this.userlist is ',this.userlist);
                let location = (this.currentPage-1)*this.pagesize+(index+1);
                this.userlist.splice(location-1, 1);
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            current_change(currentPage) {
                this.currentPage = currentPage;
                console.log('currentPage is ',currentPage);
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

                    /* excel转换json数组,加上{pagehead:1}是普通数组，不写是对象数组 */
                    self.userlist = XLSX.utils.sheet_to_json(ws);

                    /* 生成html表格 --> 改用json*/
//                    var HTML = XLSX.utils.sheet_to_html(ws);
//                    document.getElementById('out-table').innerHTML = HTML;
                };
                reader.readAsArrayBuffer(file);
            },
            saveExcel:function () {
                //还需要对变动进行一下保存。。。 写dom html的方式不好跟踪变化，用了json的方式
                const ipc = require('electron').ipcRenderer

                const saveBtn = document.getElementById('save-dialog')

                saveBtn.addEventListener('click', function (event) {
                    ipc.send('save-dialog')
                })

                ipc.on('saved-file',  (event, path)=> {
                    if (!path) path = '无路径'
                    /* 测试： 打印数组长度*/
                    console.log('now userlist lenght is '+this.userlist.length);

                    /* generate a worksheet */
                    var ws = XLSX.utils.json_to_sheet(this.userlist);

                    /* add to workbook */
                    var wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, "chengjiTest");
//                    var wb = XLSX.utils.table_to_book(document.getElementById('out-table'));
                    /* 生成文件，导出D盘 */
                    XLSX.writeFile(wb, path);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.control-wrapper {
    width: 100%;
    height: 120px;
    background: #fff;
    .search {
        display: inline-block;
        width: 100px;
        height:50px;
    }
    .file-input {
        display: inline-block;
        width: 100px;
        height:50px;
    }
}
.table-wrapper {
    padding: 0 18px;
    .btn-addRow {
        float: right;
    }
    #tb-edit {
        font-size: 12px;
        .el-table {
            font-size: 12px;
        }
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
</style>