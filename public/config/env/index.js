import devFile from './dev.js'
import proFile from './pro.js'

// let env = devFile
export function appEnv(){
	if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev'){
	    console.log('使用开发环境')
		return devFile
	}else{
		return proFile
	}
}