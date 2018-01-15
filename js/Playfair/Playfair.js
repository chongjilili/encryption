/*
Playfair密码（英文：Playfair cipher 或 Playfair square）是一种替换密码，

加密编辑
编制密码表
第一步是编制密码表。在这个5*5的密码表中，共有5行5列字母。第一列（或第一行）是密钥,其余按照字母顺序。密钥是一个单词或词组，若有重复字母，可将后面重复的字母去掉。当然也要把使用频率最少的字母去掉。如：密钥是Live and learn,去掉后则为liveandr。如果密钥过长可占用第二列或行。
如密钥crazy dog，可编制成
 
C    D    F    M    T
R    O    H    N    U
A    G    I(J) P    V
Z    B    K    Q    W
Y    E    L    S    X

整理明文
第二步整理明文。将明文每两个字母组成一对。如果成对后有两个相同字母紧挨或最后一个字母是单个的，就插入一个字母K。
如，communist，应成为co,mx,mu,ni,st。
编写密文
最后编写密文。对明文加密规则如下：
1 若p1 p2在同一行，对应密文c1 c2分别是紧靠p1 p2 右端的字母。其中第一列被看做是最后一列的右方。如，按照前表，ct对应dc
2 若p1 p2在同一列，对应密文c1 c2分别是紧靠p1 p2 下方的字母。其中第一行被看做是最后一行的下方。
3 若p1 p2不在同一行，不在同一列，则c1 c2是由p1 p2确定的矩形的其他两角的字母（至于横向替换还是纵向替换要事先约好，或自行尝试）。如，按照前表，wh对应ku或uk。
4 若分组到最后只有一个字母，填补k
如，依照上表，明文where there is life,there is hope.
可先整理为：WH ER ET HE RE IS LI FE TH ER EI SH OP EK
然后密文为：KU YO XD OL OY PL FK DL FU YO LG LN NG LB
将密文变成大写，然后几个字母一组排列。
如5个一组就是KUYOX DOLOY PLFKD LFUYO LGLNN GLY



Playfair解密算法首先将密钥填写在一个5*5的矩阵中（去Q留Z），矩阵中其它未用到的字母按顺序填在矩阵剩余位置中，根据替换矩阵由密文得到明文。
对密文解密规则如下：
1 若c1 c2在同一行，对应明文p1 p2分别是紧靠c1 c2 左端的字母。其中最后一列被看做是第一列的左方。
2 若c1 c2在同一列，对应明文p1 p2分别是紧靠c1 c2 上方的字母。其中最后一行被看做是第一行的上方。
3 若c1 c2不在同一行，不在同一列，则p1 p2是由c1 c2确定的矩形的其他两角的字母。
其实就是反其道而行之。



*/



function Playfair(PObj) {

	PlayfairObj = {
	 	text : '',//明文或者密文，默认是明文，准备加密
	 	key : 'monarchy',
	 	type : 'E',//默认加密,E加密，D解密
	 	samevalue : ''
	 	/*KeyMatrix : {
	 		'M':[1,1],
	 		'O':[1,2],
	 		'N':[1,3],
	 		'A':[1,4],
	 		'R':[1,5],
	 		'C':[2,1],
	 		'H':[2,2],
	 		'Y':[2,3],
	 		'B':[2,4],
	 		'D':[2,5],
	 		'E':[3,1],
	 		'F':[3,2],
	 		'G':[3,3],
	 		'I':[3,4],
	 		'J':[3,4],
	 		'K':[3,5],
	 		'L':[4,1],
	 		'P':[4,2],
	 		'Q':[4,3],
	 		'S':[4,4],
	 		'T':[4,5],
	 		'U':[5,1],
	 		'V':[5,2],
	 		'W':[5,3],
	 		'X':[5,4],
	 		'Z':[5,5],

	 	}*///矩阵




	 	/*[
			['M' ,   'O'  ,  'N'  ,  'A'   , 'R'],
			['C' ,   'H'  ,  'Y'  ,  'B'   , 'D'],
			['E' ,   'F'  ,  'G'  ,['I','J'],'K'],
			['L' ,   'P'  ,  'Q'  ,  'S'   , 'T'],
			['U' ,   'V'  ,  'W'  ,  'X'   , 'Z']
	    ],
	    */
	 	 
	 	 
	 };
	extend(PlayfairObj,PObj);//合并对象，改变PlayfairObj

	this.KeyMatrix =this.makeKeyMatrix(PlayfairObj.key,PlayfairObj.samevalue);
    

	this.plaintext = '';//明文 例如we are discovered save yourself
	this.Playfairtext = '';//密文. 例如UGRMKCSXHMUFMKBTOXGCMVATLUGE
    this.type = PlayfairObj.type;//明文或者密文，默认是明文，准备加密

	 if (this.type == 'D' ) {
	 	//解密
	 	this.Playfairtext = trim(PlayfairObj.text) ;//密文赋值,过滤前后的空格
	 	this.plaintext = '';//清空明文
	 }else  {
	 	this.plaintext = trim(PlayfairObj.text) ; // 明文赋值
	 	this.Playfairtext = '';//清空密文
	 }

	//加密
	this.encode = function () {
		 this.Playfairtext = '';//清空密文
		 var clearplaintext = this.cleartext(this.plaintext);//清除非数字和字母的字符，然后把数字变成英文单词
		 
		 for (var i = 0; i < clearplaintext.length; ) {
		 	var l1 = clearplaintext.charAt(i) ;//成对的第一个字母
		 	var l2 = clearplaintext.charAt(i+1) ;//成对的第二个字母
		 	if ( ( l1 == l2 ) || ( (i + 1)  >= clearplaintext.length ) ) {
		 		//成对的是相同，插入一个 'k',到了最后一个，没有下一个的时候也是插入一个k
		 		l2 = "K";
		 		 
		 		i++;//相同只是用了一个字母

		 	}else{
		 		//两个字母不相同
			    
		 		i = i + 2;//用了两个字母


		 	}

		 	    var pos1 = this.KeyMatrix[l1];//坐标1
		 		var pos2 = this.KeyMatrix[l2];//坐标2
		 		var npos1 = pos1.concat([]);//新坐标,克隆数组
		 		var npos2 = pos2.concat([]);//新坐标,克隆数组
		 		var newletter1 = ''; //加密的第一个字母
		 		var newletter2 = ''; //加密的第二个字母
		 		if (pos1[0] == pos2[0] ) {
		 			//同一行
		 			npos1[1] = ((pos1[1] +1) % 5) == 0 ? 5 :  ((pos1[1] +1) % 5) ;//向右循环移动一位
		 			npos2[1] = ((pos2[1] +1) % 5) == 0 ? 5 :  ((pos2[1] +1) % 5) ;//向右循环移动一位
		 			 

		 		}else if (pos1[1] == pos2[1]) {
		 			//同一列
		 			npos1[0] = ((pos1[0] +1) % 5) == 0 ? 5 : ((pos1[0] +1) % 5);//向下循环移动一位
		 			npos2[0] = ((pos2[0] +1) % 5) == 0 ? 5 : ((pos2[0] +1) % 5);//向下循环移动一位
		 			
		 		}else{
		 			//不同行也不同列
		 			
		 			npos1[1] = pos2[1];//行不变，交互列，对角数字
		 			npos2[1] = pos1[1];//行不变，交互列，对角数字
		 			

		 		}
		 		newletter1 = this.getKeyByValue(this.KeyMatrix,npos1);//新坐标的字母，就是key
		 		newletter2 = this.getKeyByValue(this.KeyMatrix,npos2);//新坐标的字母，就是key
		 		console.log(newletter1);
		 		console.log(newletter2);
		 		 

		 		this.Playfairtext = this.Playfairtext + newletter1 + newletter2;

		 }
	}

	//解密
	this.decode = function () {
		 this.plaintext = '';//清空明文
		 var clearPlayfairtext = this.cleartext(this.Playfairtext);//清除非数字和字母的字符，然后把数字变成英文单词
		 try{
		 		for (var i = 0; i < clearPlayfairtext.length; i = i + 2 ) {
			 		var l1 = clearPlayfairtext.charAt(i) ;//成对的第一个字母
			 		var l2 = clearPlayfairtext.charAt(i+1) ;//成对的第二个字母
			 	 

			 	    //只有一种情况，不可能是奇数个，也不可能有相邻重复

			 	    var pos1 = this.KeyMatrix[l1];//坐标1
			 		var pos2 = this.KeyMatrix[l2];//坐标2
			 		var npos1 = pos1.concat([]);//新坐标,克隆数组
			 		var npos2 = pos2.concat([]);//新坐标,克隆数组
			 		var newletter1 = ''; //加密的第一个字母
			 		var newletter2 = ''; //加密的第二个字母
			 		if (pos1[0] == pos2[0] ) {
			 			//同一行
			 			npos1[1] = ((pos1[1] -1 + 5) % 5) == 0 ? 5 :  ((pos1[1] -1+5) % 5) ;//向右循环移动一位
			 			npos2[1] = ((pos2[1] -1 + 5) % 5) == 0 ? 5 :  ((pos2[1] -1+5) % 5) ;//向右循环移动一位
			 			 

			 		}else if (pos1[1] == pos2[1]) {
			 			//同一列
			 			npos1[0] = ((pos1[0] -1+5) % 5) == 0 ? 5 : ((pos1[0] -1+5) % 5);//向下循环移动一位
			 			npos2[0] = ((pos2[0] -1+5) % 5) == 0 ? 5 : ((pos2[0] -1+5) % 5);//向下循环移动一位
			 			
			 		}else{
			 			//不同行也不同列
			 			
			 			npos1[1] = pos2[1];//行不变，交互列，对角数字
			 			npos2[1] = pos1[1];//行不变，交互列，对角数字
			 			

			 		}
			 		newletter1 = this.getKeyByValue(this.KeyMatrix,npos1);//新坐标的字母，就是key
			 		newletter2 = this.getKeyByValue(this.KeyMatrix,npos2);//新坐标的字母，就是key
			 		 
			 		 

			 		this.plaintext = this.plaintext + newletter1 + newletter2;

			 }
		 }catch(err){
		 	alert('处理的不符合要求Playfair');
		 }

		 


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
	 	 	 
	 	 	return this.Playfairtext;//返回密文

	 	 }
	 }


	 
}


//清除非数字和字母的字符，然后把数字变成英文单词
Playfair.prototype.cleartext = function(text) {
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

};


//在json里面，通过value，找出第一个符合的key
Playfair.prototype.getKeyByValue = function(json,value) {
	// body...
	for (var key in json)
    {
        // alert(key); alert(json[key]);
        if (json[key].toString()  == value.toString() ) {
        	//值相同
        	return key;//返回key
        }
        
    }
};

//由关键字自动生成key矩阵
//key,关键字
//samevalue 相同值例如（I，J），是一个数组
Playfair.prototype.makeKeyMatrix = function () {
	// body...

	var key =  arguments[0] ?  arguments[0] : 'monarchy';//默认是书本的那个例子
	
	if (typeof key == "string") {
		if (key.match(/[^a-zA-Z]/gm) != null ) {
			//找到非字母的字符串
			alert('这里有非字母的非法字符，请重新输入！');
			key = 'monarchy';
		}else{
			if (key.length > 10) {
				alert('关键字只用前10个字母');
				key = key.substr(0,10);//截取前10位
		    }
			key = key.toUpperCase();//变成大写
			//生成矩阵
			var KeyMatrix={};
			var bigletters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			var index = 1;//计数，用来计算下标

			for (var i = 0; i < key.length; i++) {

				 KeyMatrix[key.charAt(i)] = [Math.ceil(index/5), index%5 == 0 ? 5 : index%5 ];
				 index++;
				 //去除bigletters里面关键字里面出现过的字母
				 bigletters = bigletters.replace(key.charAt(i),'');

			}

			//默认以第一个为重叠值
			 console.log(arguments[1]);
			 var samevalue =  arguments[1] ?  arguments[1] : [bigletters.charAt(0),bigletters.charAt(1)];
			 //如果你输入的重叠字符与关键字重复了，就为默认值，输入无效
			 if (key.indexOf(samevalue[0]) >= 0 || key.indexOf(samevalue[1]) >= 0 ) {
			 	console.log('重叠字符不可以在关键字里面出现');
			 	samevalue = [bigletters.charAt(0),bigletters.charAt(1)];
			 }
			 //把剩下字母的给矩阵
			 for (var i = 0; i < bigletters.length; i++) {
			 	 KeyMatrix[bigletters.charAt(i)] = [Math.ceil(index/5), index%5 == 0 ? 5 : index%5 ];
			 	 if (bigletters.charAt(i) == samevalue[0] ) {
			 	 	//什么都不做
			 	 }else{
			 	 	 index++;
			 	 }
			 	
			 }

			 return KeyMatrix;


		}
		

	}
	

} 




















