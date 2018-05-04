<template>
  <div id="wrapper">
    <input type="file" multiple="false" id="sheetjs-input" accept="xls,xlsx" @change="onchange" />
    <br/>
    <button type="button" id="export-table" v-show="data.length>0" @click="onexportByHtml">根据Html导出Excel</button>
    <br/>
    <button type="button" id="export-table" v-show="data.length>0" @click="onexportByJson">根据Json导出Excel</button>
    <br/>
    <!--<div id="out-table"></div>-->
    <div class="table-wrapper">
      <el-button @click="addRow">
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
                min-width="100">
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
                min-width="100">
          <template scope="scope">
          <el-input size="small" v-model="scope.row.年级"
                    @change="handleEdit(scope.$index, scope.row)">
          </el-input>
          <span>{{ scope.row.年级}}</span>
          </template>
        </el-table-column>
        <el-table-column
                label="操作"
                min-width="100">
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
  
</template>

<script>
  import XLSX from 'xlsx'
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
  export default {
      components: {ElInput},
      data(){
      return{
          data:[],
          userlist: [],
          currentPage:1,
          pagesize:10
      }
    },
    methods: {
        addRow() {
//            this.userlist.push({
//                姓名:'',
//                学号: 0,
//                班级: 0,
//                年级: 0
//            })
//            先遍历userlist[0]对象的属性，再将这些属性，复制到新对象中，
//            let obj = {};
//            for(let key in this.userlist[0]) {
//                switch (typeof key) {
//                    case 'String' : obj.key = '';break;
//                    case 'Number' : obj.key = -1;break;
//                }
//            }
//            console.log('add new obj',obj);
//            this.userlist.push(obj);
            this.userlist.push({});
            //这样页面是可以跳转的。但是分页的高亮图标不会随着跳转
//            this.current_change(Math.ceil(this.userlist.length/this.pagesize))
            //想得
//            console.log(this.$refs.pagination)
            this.currentPage =Math.ceil(this.userlist.length/this.pagesize);
        },
        handleCurrentChange(row, event, column) {
            console.log(row, event, column, event.currentTarget)
        },
        handleDelete(index,row,userlist) {

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
  };
</script>

<style scoped>
  .tb-edit .el-input {
    display: none
  }
  .tb-edit .current-row .el-input {
    display: block
  }
  .tb-edit .current-row .el-input+span {
    display: none
  }
</style>