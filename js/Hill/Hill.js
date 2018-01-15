/*

这里主要介绍的是：古典密码之 hill密码加密解密过程的编程实现。
首先，请看对我对hill密码做的简单介绍。
hill密码是古典密码中多表代换密码部分的重要一环，以下的介绍节选自百度，想要深入了解的请查阅书籍补充相关知识。
原理：希尔密码(Hill Password)是运用基本矩阵论原理的替换密码，由Lester S. Hill在1929年发明。每个字母当作26进制数字:
A=0, B=1, C=2... 一串字母当成n维向量，跟一个n×n的矩阵相乘，再将得出的结果模26。
注意用作加密的矩阵(即密匙)在\mathbb_^n必须是可逆的，否则就不可能译码。只有矩阵的行列式和26互质，才是可逆的。

过程：
1）加密：密文=明文*密钥矩阵  （注：明文要被分割成与密钥维数相同的一维行列式）
2）解密：明文=密钥矩阵的逆*密文 （注：要求与加密过程相同）
加密解密过程如下图
如果不够就插入字母k补数

*/



function Hill(HObj) {
	HillObj = {
		text : '',//明文或者密文，默认是明文，准备加密
	 	type : 'E',//默认加密,E加密，D解密
	 	KeyMatrix: [[17,17,5],[21,18,21],[2,2,19]],//默认的key密钥，逆矩阵为[[1,2,-1],[3,4,2],[0,1,-2]]
	 	
	}
	extend(HillObj,HObj);//合并对象
	this.plaintext = '';//明文 
	this.Hilltext = '';//密文. 
    this.type = HillObj.type;//明文或者密文，默认是明文，准备加密
    this.KeyMatrix = HillObj.KeyMatrix;//key矩阵
    this.KeyInverseMatrix = Hill.getHillInverseMatrix(this.KeyMatrix);//伴随矩阵 = 逆矩阵*行列式*数论倒数，去除行列式有小数的情况
    this.bigLetters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.n = this.KeyMatrix.length;//key矩阵的维度，每组字母的长度
	 if (this.type == 'D' ) {
	 	//解密
	 	this.Hilltext = trim(HillObj.text) ;//密文赋值,过滤前后的空格
	 	this.plaintext = '';//清空明文
	 }else  {
	 	this.plaintext = trim(HillObj.text) ; // 明文赋值
	 	this.Hilltext = '';//清空密文
	 }


	 


	//加密
	this.encode = function () {
		 this.Hilltext = '';//清空密文
		 var clearplaintext = this.cleartext(this.plaintext);//清除非数字和字母的字符，然后把数字变成英文单词
		 var hillnumber = '(';
		 for (var i = 0; i < clearplaintext.length; i=i+this.n) {//循环每一个小组



		 	if (i+this.n >=clearplaintext.length ) {
		 		//最后又机会溢出，不够位置的地方填补字母k补数
		 		var grouparr = new Array(this.n);//每一组的字母对应的数字
		 		for (var j = 0; j < this.n ; j++) {//循环每组里面的每个字母
	            	grouparr[j] = new Array(1);
	            	if (typeof(clearplaintext[i+j]) == "undefined"){ 
	            		//溢出，用K来补数
						grouparr[j][0] =  this.bigLetters.indexOf('K');//插入解密组数字，字母化成mod26的数字,这是一个转置矩阵
	            
					}else{
	            		grouparr[j][0] =  this.bigLetters.indexOf(clearplaintext[i+j]);//插入解密组数字，字母化成mod26的数字,这是一个转置矩阵
	            	}

	            }
	             
		 	}else{
		 		var grouparr = new Array(this.n);//每一组的字母对应的数字
	            for (var j = 0; j < this.n ; j++) {//循环每组里面的每个字母
	            	grouparr[j] = new Array(1);
	            	grouparr[j][0] =  this.bigLetters.indexOf(clearplaintext[i+j]);//插入解密组数字，字母化成mod26的数字,这是一个转置矩阵
	            }
	             
	            
		 	}
		 	
		 	var Hillgrouparr = Matrix.multiply(this.KeyMatrix,grouparr);//key * 明文转置矩阵=获得密文转置矩阵，值为数字
	        
	        for (var j = 0; j < this.n ; j++) {
	        	if (j==0&&i==0) {
	        		hillnumber = hillnumber + parseInt(Hillgrouparr[j][0]);
	        	}else{
	        		hillnumber = hillnumber +','+ parseInt(Hillgrouparr[j][0]);

	        	}
	        	
	        	Hillgrouparr[j][0] = Hillgrouparr[j][0]<0 ? (26-Math.abs(Hillgrouparr[j][0])%26) : Math.abs(Hillgrouparr[j][0])%26;//mod26操作
	            this.Hilltext += this.bigLetters[Hillgrouparr[j][0]]  ;//数字转化为字母，插入密文字符串
	        }
	        


            


		 	
		 }
		 hillnumber +=')';
		 this.Hilltext +=hillnumber;
		 // console.log(this.Hilltext);
		 // return this.Hilltext;

	}

	//解密
	this.decode = function () {
		this.plaintext = '';//清空明文
		var clearHilltext = this.cleartext(this.Hilltext);//清除非数字字符，解密必须输入原来的密文数字，mod过的字母可能出错
		// var clearHilltext = this.cleartext2(this.Hilltext);//清除非数字字符，解密必须输入原来的密文数字，mod过的字母可能出错
		// console.log(clearHilltext);
		// try{
			for (var i = 0; i < clearHilltext.length; i=i+this.n) {//循环每一个小组



			  
			 	var grouparr = new Array(this.n);//每一组的字母对应的数字
		        for (var j = 0; j < this.n ; j++) {//循环每组里面的每个字母
		            grouparr[j] = new Array(1);
		            grouparr[j][0] =  this.bigLetters.indexOf(clearHilltext[i+j]);//插入解密组数字，字母化成mod26的数字,这是一个转置矩阵
		        }
		        
			 	var Hillgrouparr = Matrix.multiply(this.KeyInverseMatrix,grouparr);//逆矩阵key * 密文转置矩阵=获得明文转置矩阵，值为数字
		        
		        for (var j = 0; j < this.n ; j++) {
		        	Hillgrouparr[j][0] = Hillgrouparr[j][0]<0 ? (26-Math.abs(Hillgrouparr[j][0])%26)%26 : Math.abs(Hillgrouparr[j][0])%26;//mod26操作
		            
		            this.plaintext += this.bigLetters[Hillgrouparr[j][0]]  ;//数字转化为字母，插入明文字符串
		        }
		        
				

	            


			 	
			 }
			 // console.log(Hillgrouparr);


			 /*for (var i = 0; i < clearHilltext.length; i=i+this.n) {//循环每一个小组



			  
			 	var grouparr = new Array(this.n);//每一组的字母对应的数字
		        for (var j = 0; j < this.n ; j++) {//循环每组里面的每个字母
		            grouparr[j] = new Array(1);
		            grouparr[j][0] =  clearHilltext[i+j];//插入解密组数字，,这是一个转置矩阵
		        }
		        
			 	var Hillgrouparr = Matrix.multiply(this.KeyInverseMatrix,grouparr);//逆矩阵key * 密文转置矩阵=获得明文转置矩阵，值为数字
		        
		        for (var j = 0; j < this.n ; j++) {
		        	Hillgrouparr[j][0] = Hillgrouparr[j][0]<0 ? (26-Math.abs(parseInt(Hillgrouparr[j][0]))%26) : Math.abs(parseInt(Hillgrouparr[j][0]))%26;//mod26操作
		            
		            this.plaintext += this.bigLetters[Hillgrouparr[j][0]]  ;//数字转化为字母，插入明文字符串
		        }
		        
				// console.log(Hillgrouparr);

	            


			 	
			 }
*/
		    
		/*}catch(err){
		 	alert('处理的不符合要求Hill密文，无法破解');
		}*/




	}








	//自动解密加密
	if (this.type == 'D') {
	 	 	//解密
	 	 	this.decode();//解密
	 	 	 
	 	 }else{
	 	 	//加密
	 	 	this.encode();
	 	 	 

	 }

	 //自动进行加密和解密
	 this.run = function () {
	 	 if (this.type == 'D') {
	 	 	//解密
	 	  
	 	 	return this.plaintext;//返回明文
	 	 }else{
	 	 	//加密
	 	 	 
	 	 	return this.Hilltext;//返回密文

	 	 }
	 }




}




//清除非数字和字母的字符，然后把数字变成英文单词
Hill.prototype.cleartext = function(text) {
	// body...
	text = text.replace(/(\s*)/gm,"");//清除空格
	text = text.replace(/\W*/gm,'');//q清除非字母和非数字的字符
	text = text.replace(/1/gm,'one');
	text = text.replace(/2/gm,'tow');
	text = text.replace(/3/gm,'three');
	text = text.replace(/4/gm,'four');
	text = text.replace(/5/gm,'five');
	text = text.replace(/6/gm,'six');
	text = text.replace(/7/gm,'seven');
	text = text.replace(/8/gm,'eight');
	text = text.replace(/9/gm,'nine');
	text = text.replace(/0/gm,'zere');
	text = text.toUpperCase();
	return text;

}

//清除非数字的字符
Hill.prototype.cleartext2 = function(text) {
	// body...
	text = text.replace(/(\s*)/gm,"");//清除空格
	text = text.replace(/([^-.,0-9]*)/gm,'');//q清除非数字非,的字符
	text = text.split(',')
	for (var i = 0; i < text.length; i++) {
		text[i] = parseFloat(text[i]);
	}
	return text;

}

//随机生成行列式与26互质的n阶矩阵
Hill.getInvertibleMatrixofNMOD26is1 = function(n) {
	  var KeyMatrix = [];
	  var yes = true;//判断是否满足条件
	 do{
	 	KeyMatrix = Matrix.getInvertibleMatrixofN(n);//随机生成可逆矩阵
	 	var Det = Matrix.calDeterminant(KeyMatrix,n);//行列式
	 	if (Det!=0 && Det%2 != 0 && Det%13 != 0 ) {//满足互质条件
	 		console.log(Det);
	 		yes = false;
	 	}
	 }while(yes);
	 return KeyMatrix;

}



			 /*
17,17,5
21,18,21
2,2,19
			 */
//求Hill逆矩阵 = 伴随矩阵*（行列式关于26的数论倒数） = 逆矩阵 * 行列式 * （行列式关于26的数论倒数）
Hill.getHillInverseMatrix = function (M1) {
	var m1 = deepcopy(M1);
	/*console.log('原来的key');
	console.log(M1);*/

	var Determinant = Matrix.calDeterminant(m1,m1.length);//行列式
	// Determinant = (26 - Math.abs(Determinant)%26)%26;
	if (Determinant!=0&&Determinant%2!=0&&Determinant%13!=0) {
		//行列式与26互质，求出关于26的数论倒数
		var ntr = invert(   (Determinant > 0 ? Determinant : (26 - Math.abs(Determinant)%26)%26)    ,    26);//关于26的数论倒数


	}
	/*console.log('行列式');
	console.log(Determinant);*/
	 
	var InverseMatrix = Matrix.getAdjointMatrix(m1);//伴随矩阵
	var AdjointMatrix = Matrix.getAdjointMatrix(m1);//伴随矩阵
	for (var i = 0; i < InverseMatrix.length; i++) {
		for (var j = 0; j < InverseMatrix[i].length; j++) {
			InverseMatrix[i][j] = Math.round(InverseMatrix[i][j]*ntr) ;//求Hill逆矩阵 = 伴随矩阵*（行列式关于26的数论倒数） = 逆矩阵 * 行列式 * （行列式关于26的数论倒数）
			InverseMatrix[i][j] = InverseMatrix[i][j] > 0 ? InverseMatrix[i][j]%26 : (26 - Math.abs(InverseMatrix[i][j])%26)%26;
		}
		
	}
	console.log('行列式');
	console.log(Determinant);
	console.log('数论倒数');
	console.log(ntr);
	console.log('伴随矩阵：');
	console.log(AdjointMatrix);
	console.log('Hill逆矩阵');
	console.log(InverseMatrix);
	return InverseMatrix;
	 
}





