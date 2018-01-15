/*
* 凯撒加密(Caesar cipher)是一种简单的消息编码方式：
*它根据字母表将消息中的每个字母移动常量位k。举个例子如果k等于3，
*则在编码后的消息中，每个字母都会向前移动3位：
*a会被替换为d；b会被替换成e；依此类推。字母表末尾将回卷到字母表开头。于是，w会被替换为z，x会被替换为a
*
*/



function Caesarcipher(CObj) {

	 CaesarcipherObj = {
	 	text : '',//明文或者密文，默认是明文，准备加密
	 	type : 'E',//默认加密,E加密，D解密
	 	key : 3,
	 	smallLetters : "abcdefghijklmnopqrstuvwxyz",
	 	bigLetters   : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	 };
	 extend(CaesarcipherObj,CObj);//合并对象，改变CaesarcipherObj
	 

	
	 this.plaintext = '' ;//明文，
	 this.Caesartext = '';//密文
	 this.Key = CaesarcipherObj.key;
	 this.smallLetters = CaesarcipherObj.smallLetters;//小写字母
	 this.bigLetters   = CaesarcipherObj.bigLetters;//大写字母
	 this.type = CaesarcipherObj.type;//明文或者密文，默认是明文，准备加密
	 
     
     if (this.type == 'D' ) {
	 	//解密
	 	this.Caesartext = trim(CaesarcipherObj.text) ;//密文赋值,过滤前后的空格
	 	this.plaintext = '';//清空明文
	 }else  {
	 	this.plaintext = trim(CaesarcipherObj.text) ; // 明文赋值
	 	this.Caesartext = '';//清空密文
	 }

	 //加密
	 this.encode = function () {
    	 //清空密文
	 	 for (var i = 0 ; i <   this.plaintext.length ; i++) {
	 	 	//this.plaintext.charAt(i);//每一个位置长度为1的字符串
	 	 	if ( this.smallLetters.indexOf(this.plaintext.charAt(i)) >=  0 ) {
	 	 		// 如果是小写字母
	 	 		var index = this.smallLetters.indexOf(this.plaintext.charAt(i));
	 	 		//字母所在的下标，加密的下标是 (index + this.Key)%this.smallLetters.length
	 	 		this.Caesartext = this.Caesartext +   this.bigLetters[((index + this.Key)%this.smallLetters.length)];


	 	 	}else if (this.bigLetters.indexOf(this.plaintext.charAt(i)) >=  0) {
	 	 		//如果是大写字母
	 	 		var index = this.bigLetters.indexOf(this.plaintext.charAt(i));
	 	 		//字母所在的下标，加密的下标是 (index + this.Key)%this.smallLetters.length
	 	 		this.Caesartext = this.Caesartext +   this.bigLetters[((index + this.Key)%this.bigLetters.length)];

	 	 	}else{
	 	 		 //不是字母
	 	 		 this.Caesartext = this.Caesartext + this.plaintext.charAt(i);

	 	 	}
	 	 }
	 }

	 //解密
	 this.decode = function () {
         this.plaintext = '';//清空明文
	 	 for (var i = 0 ; i <   this.Caesartext.length ; i++) {
	 	 	//this.Caesartext.charAt(i);//每一个位置长度为1的字符串
	 	 	if ( this.smallLetters.indexOf(this.Caesartext.charAt(i)) >=  0 ) {
	 	 		// 如果是小写字母
	 	 		var index = this.smallLetters.indexOf(this.Caesartext.charAt(i));
	 	 		//字母所在的下标，加密的下标是 (index + this.Key)%this.smallLetters.length
	 	 		this.plaintext = this.plaintext +   this.bigLetters[((index - this.Key + this.smallLetters.length)%this.smallLetters.length)];


	 	 	}else if (this.bigLetters.indexOf(this.Caesartext.charAt(i)) >=  0) {
	 	 		//如果是大写字母
	 	 		var index = this.bigLetters.indexOf(this.Caesartext.charAt(i));
	 	 		//字母所在的下标，加密的下标是 (index + this.Key)%this.smallLetters.length
	 	 		this.plaintext = this.plaintext +   this.bigLetters[((index - this.Key+this.smallLetters.length)%this.bigLetters.length)];

	 	 	}else{
	 	 		 //不是字母
	 	 		 this.plaintext = this.plaintext + this.Caesartext.charAt(i);

	 	 	}
	 	 }
	 }
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
	 	 	 
	 	 	return this.Caesartext;//返回密文

	 	 }
	 }


}

 
