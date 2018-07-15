<template>
<div>

 <p style= "text-align: center;">调配界面</p>
<p>搜索数据{{search}}</p>
<el-form :inline="true" :model="search" :rules="rules" ref="ruleForm" class="demo-ruleForm" :close-on-click-modal="false" >

   <el-form-item style="margin-left:200px" label="化学品名" prop="cas">
    <el-input v-model="search.sname"></el-input>
  </el-form-item>
<span class="demonstration">选择时间</span>
      <el-date-picker 
      placeholder="选择日期"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd" style="width:390px" v-model="search.sdate" type="daterange" align="right" unlink-panels range-separator="到" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
    </el-date-picker>

    <br/>
   <el-form-item style="margin-left:200px" label="条形码" prop="cas">
    <el-input v-model="search.stiaocode"></el-input>
  </el-form-item>

  <span class="demonstration">库位</span>
    <el-select v-model="search.skuwei" filterable="" remote="" reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
    <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
 <el-button type="primary" @click="doFilter">搜索</el-button>
 <el-button type="primary" @click="openData">展示数据</el-button>
</el-form>

 <el-input v-model="tableDataName" placeholder="请输入姓名" style="width:240px"></el-input>
 <el-button type="primary" @click="doFilter">搜索</el-button>
 <el-button type="primary" @click="openData">展示数据</el-button>
  <el-table :data="tableDataEnd" border style="width: 100%">
        <el-table-column type="selection" width="55">
    </el-table-column>
        <el-table-column  prop="cas" label="cas号" width="120">
    </el-table-column>
            <el-table-column  prop="kw" label="库位" width="120">
    </el-table-column>
        <el-table-column prop="name" label="药品名" width="120">
    </el-table-column>
        <el-table-column prop="wxx" label="危险性" width="120">
    </el-table-column>
        <el-table-column prop="nd" label="浓度" width="120">
    </el-table-column>
        <el-table-column prop="jh" label="级号" width="120">
    </el-table-column>
        <el-table-column prop="hl" label="含量" width="120">
    </el-table-column>
        <el-table-column prop="ph" label="批号" width="120">
         </el-table-column>
                <el-table-column fixed="left" prop="rkdata" label="入库时间" width="120">
    </el-table-column>
     <el-table-column prop="kc" label="库存" width="120">
      </el-table-column>
           <el-table-column prop="ysy" label="已使用" width="120">
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
        </template>
    </el-table-column>
    </el-table>
   
 <el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="currentPage"
  :page-sizes="[1, 2, 3, 4]"
  :page-size="pageSize"
  layout="total, sizes, prev, pager, next, jumper"
  :total="totalItems">
 </el-pagination>
  <p>{{tableDataEnd}}</p>
 <br/>
 <p>{{tableDataName}}</p>
 <br/>
  <p>{{tableDataEnd}}</p>
</div>

</template>
<script>
export default {
  data() {
    return {
//搜索数据

search: {
sname:'',
sdate:'',
stiaocode:'',
skuwei:''
},
      //时间选择器

              pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },

      //远程库位
        options4: [],
        list: [],
        loading: false,
        states: ['有机实验室','无机实验室','六号实验室','九号实验室'],
      //表格内容  
        ruleForm: {
         cas: '',
          name:'',
          wxx: '',
          nd: '',
          type: [],
          jh: '',
          hl: '',
          cj: '',
          ph: '',
          sl: '',
        },
      content: '',
      //过滤表格
            tableDataBegin: [
        {
          cas: "1",
          name: "三聚氰胺",
          wxx: "高",
          nd: "97%",
          jh: "2019级",
          hl: "500ml",
          cj: "杭州xx",
          ph: "200",
          kc: "100",
          ysy: "20",
          rkdata: "2018-6-5",
          kw: "1"
        
        },
        {
          cas: "3",
          name: "六聚氰胺",
          wxx: "高",
          nd: "97%",
          jh: "2019级",
          hl: "500ml",
          cj: "杭州xx",
          ph: "200",
          kc: "100",
          ysy: "20",
          rkdata: "2018-6-5",
          kw: "2"
        },
        {
          cas: "4",
          name: "五聚氰胺",
          wxx: "高",
          nd: "97%",
          jh: "2019级",
          hl: "500ml",
          cj: "杭州xx",
          ph: "200",
          kc: "100",
          ysy: "20",
          rkdata: "2018-6-5",
          kw: "3"
        },
        {
          cas: "5",
          name: "四聚氰胺",
          wxx: "高",
          nd: "97%",
          jh: "2019级",
          hl: "500ml",
          cj: "杭州xx",
          ph: "200",
          kc: "100",
          ysy: "20",
          rkdata: "2018-6-5",
          kw: "4"

        }
      ],
      
  
  tableDataName: "",
  tableDataEnd: [],
  currentPage: 4,
  pageSize: 2,
  totalItems: 0,
  filterTableDataEnd:[],
  flag:false
    }
  },
  
    mounted() {
    /*         this.axios.post("http://rap2api.taobao.org/app/mock/15053/msg").then(body => {this.content = body.data; });    */
  this.axios.get("https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin/table/list").then(body => {this.content = body.data;
 });
 //在创建的时候获取远程库位
       this.list = this.states.map(item => {
        return { value: item, label: item };
      });                                                     
        }
  ,
  created() {
    this.totalItems = this.tableDataBegin.length
    if (this.totalItems > this.pageSize) {
      for (let index = 0; index < this.pageSize; index++) {
        this.tableDataEnd.push(this.tableDataBegin[index])
      }
    } else {
      this.tableDataEnd = this.tableDataBegin
    }
  },

  methods: {
    // 前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    // 用两个变量接收currentChangePage函数的参数
    doFilter() {
      if (this.tableDataName == '') {
        this.$message.warning('查询条件不能为空！')
        return
      }
      this.tableDataEnd = []
      // 每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = []
      this.tableDataBegin.forEach((value, index) => {
        if (value.name) {
          if (value.name.indexOf(this.tableDataName) >= 0) {
            this.filterTableDataEnd.push(value)
          }
        }
      })
      // 页面数据改变重新统计数据数量和当前页
      this.currentPage = 1
      this.totalItems = this.filterTableDataEnd.length
      // 渲染表格,根据值
      this.currentChangePage(this.filterTableDataEnd)
      // 页面初始化数据需要判断是否检索过
      this.flag = true
    },
    openData() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.handleCurrentChange(this.currentPage)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      // 需要判断是否检索
      if (!this.flag) {
        this.currentChangePage(this.tableDataEnd)
      } else {
        this.currentChangePage(this.filterTableDataEnd)
      }
    }, // 组件自带监控当前页码
    currentChangePage(list) {
      let from = (this.currentPage - 1) * this.pageSize
      const to = this.currentPage * this.pageSize
      this.tableDataEnd = []
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from])
        }
      }
    },

    //远程库位搜索的方法
          remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options4 = [];
        }
      }
  }
}
</script>