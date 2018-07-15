<template>
  <div class="app-container">
<p>{{msg}}</p>
<p>{{ruleForm}}</p>
<el-button id="dialog" type="text" @click="open()" style="visibility: hidden">打开嵌套表单的 Dialog</el-button>
<el-dialog title="填写药品信息" :visible.sync="dialogFormVisible" @close="close()">
  
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :close-on-click-modal="false" >
  <el-form-item label="入库单编号" prop="Innumber">
    <el-input v-model="ruleForm.Innumber"></el-input>
  </el-form-item>
    <el-form-item label="药品名称" prop="Gname">
    <el-input v-model="ruleForm.Gname"></el-input>
  </el-form-item>
   
  <el-form-item label="仓库" prop="jh">
			  <el-select v-model="ruleForm.Hounnumber" placeholder="请选择仓库">
			<el-option label="101房间" value="1"></el-option>
			<el-option label="102房间" value="2"></el-option>
			<el-option label="102房间" value="2"></el-option>
			  </el-select>
  </el-form-item> 
  <el-form-item label="职员编号" prop="jh">
			  <el-select v-model="ruleForm.Empnumber" placeholder="请选择员工">
      <el-option label="01" value="01"></el-option>
      <el-option label="02" value="02"></el-option>
			  </el-select>
  </el-form-item>
      <el-form-item label="入库时间" required>
    <el-col :span="11">
      <el-form-item prop="Indate">
        <el-date-picker type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd" v-model="ruleForm.Indate" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
     </el-form-item>


  <el-form-item label="入库数量" prop="Inliang">
    <el-input v-model="ruleForm.Inliang"></el-input>
  </el-form-item>
 
    

</el-form>




  <div slot="footer" class="dialog-footer">
    <el-button @click="fun1">确定</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">取消</el-button>
  </div>
</el-dialog>
		<div>
			<div style="text-align:center;margin-top: 16%">
				<h1>请扫描条形码</h1>
			</div>
			<div>
				<input v-model="msg" id="barCode" value="" type="text" placeholder="stay focus">
			</div>
			<div>
				<div id="info" style="width: 500px;margin: 0 auto">
				<h3>注：如果条形码受损，手动输入条形后请按回车建确认输入</h3>
				</div>
			</div>
			<div>
				<div id="info" style="width: 500px;margin: 0 auto">
					<el-button id="goon" style="visibility: hidden">  继续扫码  </el-button>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  data() {
    return { 
			 ruleForm: {
			Innumber:'',
			Gname: 'test',
			Hounnumber:'',
			Empnumber:'',
			Inliang:'',
			Indate:''
				},
				 rules: {
        	cas:[
            { required: true, message: '不能为空'},
  
        
          ],
          name: [
            { required: true, message: '请输入化学品名称', trigger: 'blur' },
            
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { required: true,type: 'date', message: '请选择日期', trigger: 'change' }
          ],
          
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          sl: [
            { required: true,type:"string",required: true, message: '请输入数量'},
          ],
        },
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
		msg: ' ',
      list: null,
			listLoading: true,

		
    }
  },
  created() {
   
  },
  methods: {
		//打开入库表单open()

		open(){
this.dialogFormVisible = true;
/* this.ruleForm.Gname = this.Gname; */


		},
	close(){	
			this.dialogFormVisible = false;
			},
		fun1(){$("#goon").click();
		this.msg = '';//清空输入框
		this.$message({
            type: 'info',
            message: '入库成功'
			}); 
this.axios.post('http://127.0.0.1:8080/Inlist',this.ruleForm)
.then(function() {
console.log("发送入库");
})
.catch(function(error) {
console.log(error);
});
			this.dialogFormVisible = false;
			console.log(this.ruleForm)
	}
  },	  
   mounted:function(){
		 var that = this;
		 var layer = this.$layer;//vue-layer和这个代码兼容
		 console.log(this.ruleForm.Gname);
		 var Gcode;
		 var Gname;
		Gname = this.ruleForm.Gname;
   this.dialogFormVisible;
		 //在下面的匿名函数中this指向的不是vue的实例，所以访问不到dialogFormVisible，我们将this.dialogFormVisible赋值给一个变量

     (function ($) {
console.log('获取到外部的属性'+Gname);
	var barcode = {

		listenerObj: null,
		letter: false,
		number: true,
		check: true,//是否禁止手动输入

		oneKeyTime: '',
		/* 一次按键时间间隔 */
		twoKeyTime: '',
		/* 两次按键时间间隔 */
		keyDownTime: '',
		/* 键按下的时间    */
		barcodeLen: 13,
		/* 条形码长度      */
		spanTime: 70,
		/* 一次按键按下到释放的时间间隔 */
		zerokeyVal: 48,
		/* 零的key值      */
		ninekeyVal: 57,
		/* 数字9的key值   */
		akeyVal: 65,
		/* a的key值      */
		zkeyVal: 90,
		/* z的key值      */

		show: function () {},

		checkHandInput: function () {
			console.log(this.oneKeyTime);

			if ((this.oneKeyTime > this.spanTime)) {
				return true;
			} else {
				return false;
			}
		},
		on_key_down: function () {
			var that = this;
		
			this.listenerObj.keydown(function (e) {

				if (e.which !== 13 && !(that.in_range(e.which))) {
					$(that.listenerObj).val('');
					return;
				}
				var d = new Date();
				var curTime = parseInt(d.getTime());
				if (that.keyDownTime !== '' && that.keyDownTime !== NaN) {
					that.twoKeyTime = curTime - that.keyDownTime;
				}
				that.keyDownTime = curTime;
			});
		},
		on_key_up: function () {
			var that = this;
			this.listenerObj.keyup(function (e) {
				var d = new Date();
				var keyUpTime = d.getTime();

				that.oneKeyTime = parseInt(keyUpTime) - parseInt(that.keyDownTime);

				var isHand = that.checkHandInput();

				if (that.check && isHand && that.in_range(e.which)) {
					layer.msg('禁止手动输入');
					$(that.listenerObj).val("");
				}
			})
		},
		on_key_press: function () {
			var that = this;
			this.listenerObj.keypress(function (e) {
				if (e.which == 13 && that.check_barcode()) {
					that.createListEl();
				}
			});
		},
		check_barcode: function () {
			var code = $(this.listenerObj).val();

			if (code.length !== this.barcodeLen) {
				$(this.listenerObj).val("").focus();
				layer.msg('条形码不合法');
			} else {
				return true;
			}
		},
		//判断按下的键是否在字母加数字这个范围
		in_range: function (key) {

			var isLegal = false;
			if (this.number) {
				isLegal = this.is_number(key);
			}
			if (this.letter) {
				isLegal = this.is_letter(key);
			}
			if (this.number && this.letter) {
				isLegal = (this.is_number || this.is_letter) ? true : false;
			}
			return isLegal;
		},
		is_number: function (key) {
			if (key > this.ninekeyVal || key < this.zerokeyVal) {
				return false;
			} else {
				return true;
			}
		},
		is_letter: function (key) {
			if (key > this.zkeyVal || key < this.akeyVal) {
				return false;
			} else {
				return true;
			}
		},
		check_network: function () {
			return (navigator.onLine) ? true : false;
		},
		createListEl: function () {
			if (typeof this.show == 'function') {
				this.show(this.listenerObj.val());
			/* 	layer.msg('扫描成功',{time:1000}); */
			} else {
				layer.msg('no callback function');
			}
			this.listenerObj.val("").focus();
		},
		keepFocusInput: function () {
			this.listenerObj.blur(function () {
				var that = $(this);
				setTimeout(function () {
					that.focus().select();
				}, 300);
			});
		},
		startListen: function (listenerObj, settings) {
			for (var member in settings) {
				if (typeof barcode[member] !== 'undefined') {
					barcode[member] = settings[member];
				}
			}
			barcode.listenerObj = listenerObj;

			this.on_key_down();
			this.on_key_up();
			this.on_key_press();
			this.keepFocusInput();
			this.listenerObj.focus().select();
		}

	};
	$.fn.startListen = function (options) {
		var settings = $.extend({
			barcodeLen: 13,
			letter: false, //条码不包含字母
			number: true, //条码为数字
		}, options);
		barcode.startListen(this, settings);
	}

})(jQuery);

     $("#barCode").startListen({
				barcodeLen :13,
				letter : true,
				number : true,
				check  : false,
		/* 		show : function(code){
					layer.msg(code);
				} */
				show: function (code) {
						Gcode = code;
					/*  layer.msg("扫码成功");  */
					 tiao();
					$('#dialog').click();
					console.log("码是多少"+code);
					console.log("药品名"+ Gname);
				
layer.msg(code);

 $('#barCode').hide();

				}
			});
			function tiao(){
		
console.log('Gcode'+Gcode);
if(Gcode=="6908085000264"){
	that.ruleForm.Gname = '炎热清颗粒';

		console.log("相等")
}else{
	console.log("不相等")
}
	console.log("药品名2"+ Gname);
}

 $("#goon").click(function () {
 $('#barCode').show();
 setTimeout(function () {
 $('#barCode').focus().select();
	 }, 300);
				});
				

  },
}
</script>

<style scoped>
	#barCode {
		width: 500px;height: 45px;border-radius: 1px solid #ddd;
		display: block;
		margin : 0 auto;
		padding: 0px 5px;
		outline: none;
	}
	
</style>
