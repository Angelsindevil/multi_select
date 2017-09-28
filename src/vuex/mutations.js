
export const changeIndexObj= (state,payload) => {//将参数mes赋值给state的变量subjectid 
	state.indexObj.indexArr=payload.indexArr;
	state.indexObj.length=payload.length;
}