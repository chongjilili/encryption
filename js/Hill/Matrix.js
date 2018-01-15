/*
*矩阵工具类
*
*
*/

var  Matrix = function () {
	 
} 

//加法
Matrix.add = function (m1,m2) {
	 
}

//减法
Matrix.minus = function (m1,m2) {
	 
}

//乘法
Matrix.multiply = function (m1,m2) {
	 if (Matrix.isMatrix(m1) && Matrix.isMatrix(m2)) {
	 	//m1和m2是二维矩阵
	 	if (m1[0].length == m2.length) {
	 		//满足m1的列数等于m2的行数，这样才可以相乘
	 		var resultarr = new Array(m1.length);
	 		for (var i = 0; i < resultarr.length; i++) {
	 			resultarr[i] = new Array(m2[0].length);
	 			for (var j = 0; j < m2[0].length ; j++) {
	 				 // m1的第i行 与 m2的第j列的向量乘积为resultarr[i][j]
	 				 resultarr[i][j] = 0;
	 				 for (var k = 0; k < m2.length; k++) {
	 				 	 resultarr[i][j] += (m1[i][k]*m2[k][j]);//赋值
	 				 }
	 				 resultarr[i][j] = resultarr[i][j].toFixed(10);//保留10位有效数字
	 				  
	 			}
	 		}



	 		return resultarr;

	 	}else{
	 		return false;
	 	}
	 }else{
	 	return false;
	 }
}

//求逆矩阵
Matrix.getInverseMatrix = function (M1) {
	var m1 = deepcopy(M1);
	// console.log(m1);
	if (Matrix.isMatrix(m1)) {
		if (Matrix.calDeterminant(m1, m1.length) != 0) {
			 //主要算法
			var n = m1.length;//方阵的维数
			 //1.创建单位矩阵
			var onematrix = new Array(n);
			for (var i = 0; i < n; i++) {
			 	onematrix[i] = new Array(n);
			 	  
			 	for (var j = 0; j < n; j++) {
			 	 	if (i == j) {
			 	 	 	 
			 	 	 	onematrix[i][j] = 1; 
			 	 	}else{
			 	 	 	onematrix[i][j] = 0;
			 	 	}
			 	 	
			 	}
			}

			
				// 遍历每一列，把这一列变成基限量
				for(var z=0;z<n;z++){


				 	    if(m1[z][z]==0){//对角线等于0，把下面的一行不为0的倍加到这里
			        		for(i=z;m1[z][z]==0;i++)
			                {
			                    {
			                        for(j=0;j<n;j++){
			                        	m1[z][j]=m1[z][j]+m1[i+1][j];//原矩阵倍加
			                        	onematrix[z][j]=onematrix[z][j]+onematrix[i+1][j];//曾广矩阵倍加
			                        }
			                        
			                    }
			                    if(m1[z][z]!=0)break;
			                }
			       		}

			       		if (m1[z][z]!=1)  
			       		{//把m1[z][z]变成1，z行全部除以m1[z][z]
			                kz=m1[z][z];
			                for(j=0;j<n;j++){
			                    m1[z][j]=m1[z][j]/kz;//变1
			                    onematrix[z][j]=onematrix[z][j]/kz;//曾广矩阵相同操作
			                }
			            }

					for(i=0;i<n;i++){
			       		

			            if (i != z) {//把这一列变成基限量
			                k=-m1[i][z]/m1[z][z];
			                for(j=0;j<n;j++){//基向量必须从0开始，因为有不是0的数字，不可以忽略操作
			                    m1[i][j]=k*(m1[z][j])+m1[i][j];//基向量转变
			                    onematrix[i][j]=k*(onematrix[z][j])+onematrix[i][j];//基向量转变
			                }
			            }
			        }




				}
				
				// console.log(onematrix);
				// console.log(m1);
				return onematrix;









		}else{
			//不是N阶可逆矩阵就返回false
			return false;
		}
	}else{
		//不是矩阵
		return false;
	}
	 
}




//求伴随矩阵,伴随矩阵 = 逆矩阵*行列式
Matrix.getAdjointMatrix = function (M1) {
	var m1 = deepcopy(M1);
	/*console.log('原来的key');
	console.log(M1);*/

	var Determinant = Matrix.calDeterminant(m1,m1.length);//行列式
	/*console.log('行列式');
	console.log(Determinant);*/
	var InverseMatrix = Matrix.getInverseMatrix(m1);//逆矩阵
	for (var i = 0; i < InverseMatrix.length; i++) {
		for (var j = 0; j < InverseMatrix[i].length; j++) {
			InverseMatrix[i][j] = Math.round(InverseMatrix[i][j]*Determinant) ;
		}
		
	}
    /*console.log('伴随矩阵');
	console.log(InverseMatrix);*/
	return InverseMatrix;
	 
}






//随机生成n阶可逆矩阵
/*
1）生成单位阵
2）用随机数替换单位阵中的1 生成一条对角线有数据的矩阵
3）随机对该矩阵进行初等变换 。 
从1）以后生成的矩阵，实际上都是随机的，而且都是可逆的。
所以还可以有个随机选择。从1）开始的步数。

*/
Matrix.getInvertibleMatrixofN = function (n) {
	 //1.创建单位矩阵2.用随机数替换单位阵中的1 生成一条对角线有数据的矩阵
	 var m1 = new Array(n);
	 for (var i = 0; i < n; i++) {
	 	 m1[i] = new Array(n);
	 	  
	 	 for (var j = 0; j < n; j++) {
	 	 	 if (i == j) {
	 	 	 	 // m1[i].push(parseInt(Math.random()*100,10));
	 	 	 	 m1[i][j] = parseInt(Math.random()*10+1,10);//0~100的随机数
	 	 	 }else{
	 	 	 	 m1[i][j] = 0;
	 	 	 }
	 	 	
	 	 }
	 }
	  

	 //进行十次随机的倍加操作（初等变换）
	 var r = new Array(10);//10次初等变换的记录
	 for (var k = 0; k < 10; k++) {
	 	//r[k] = [i,j,k] ; 代表把第i行的数字乘以k 加到第j组上面去
	 	r[k] = [Math.floor(Math.random()*n),Math.floor(Math.random()*n),Math.floor(Math.random()*10)];//0~n之间的随机整数，包括0不包括n
	 }

	 for (var k = 0; k < r.length; k++) {
	 	 var rowi = r[k][0];//行数1
	 	 var rowj = r[k][1];//行数2
	 	 var dk = r[k][2];//倍数k
	 	 for (var q = 0; q < n; q++) {
	 	 	 //遍历一行，操作两行
	 	 	 m1[rowj][q] += m1[rowi][q] *dk;//代表把第i行的数字乘以k 加到第j组上面去
	 	 }

	 }
	 // console.log(m1);
	 return m1;//可逆数组

}



//随机生成行列式=1或者-1的矩阵key,太卡，不可用

Matrix.getInvertibleMatrixofNAndDeterminantOne = function (n) {
	 
	do{
		var keyMatrix = Matrix.getInvertibleMatrixofN(n);
   		console.log(keyMatrix);
    }while(Matrix.calDeterminant(keyMatrix) != 1 && Matrix.calDeterminant(keyMatrix) != -1);
    return keyMatrix;
}




//计算n阶行列式a的值,不是n阶矩阵就返回false
Matrix.calDeterminant = function (M1,n) {
	 var m1 = deepcopy(M1);

	 if (Matrix.isMatrixofN(m1, n)) {
	 		 var z,j,i;
			 var Del=1.0;
			 var k;
			 for(z=0;z<n-1;z++){
			 	for(i=z;i<n-1;i++)
		        {    if(m1[z][z]==0)
		                for(i=z;m1[z][z]==0;i++)
		                {
		                    {
		                        for(j=0;j<n;j++)
		                        m1[z][j]=m1[z][j]+m1[i+1][j];
		                    }
		                    if(m1[z][z]!=0)break;
		                }
		                    {
		                        k=-m1[i+1][z]/m1[z][z];
		                        for(j=z;j<n;j++)
		                        m1[i+1][j]=k*(m1[z][j])+m1[i+1][j];
		                    }
		        }
			 }

			 for(z=0;z<n;z++){

		         Del=Del*(m1[z][z]);
			 }
			 // console.log(Math.round(Del));
			 return Math.round(Del);
	 }else{
	 	return false;
	 }

	 
        

     

}







//判断m1是否是二维矩阵,1.二维数组，2.全为数组
Matrix.isMatrix = function (m1) {
	 if (m1 instanceof Array) {
	 	//起码是一维数组
	 	if (m1[0] instanceof Array) {
	 		var rownum = m1.length;//行数
		 	var columnnum = m1[0].length;//列数,以第一行的为标准
		 	for (var i=0;i<rownum;i++){
		 		if(m1[i] instanceof Array){
		 			if (m1[i].length == columnnum) {
						for (var j = 0; j < m1[i].length; j++) {
							if (typeof m1[i][j] != "number") {
								return false;
							}
		 					 
		 				}
		 			}else{
		 				return false;
		 			}
		 			
		 		}else{
		 			return false;
		 		}
		 	}
	 	}else{
	 		return false;
	 	}

		return true;
	 }else{
	 	return false;
	 }
}

//判断是否是n阶矩阵
Matrix.isMatrixofN = function (m1,n) {
	 if (Matrix.isMatrix(m1)) {
	 	
	    
	 	if (m1.length == n && m1[0].length == n ) {

	 		return true;
	 		 
	 	}

	 }

	 return  false;
}




