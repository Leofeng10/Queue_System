<template>
    <div id="app">
      	<router-view/>
    </div>
</template>

<script>
document.addEventListener('dblclick', function (e) {
	e.preventDefault();
})
		
export default {
	mounted(){
		this.appInitMethod()
	},
	computed:{
		lang(){
			return this.$store.state.language
		}
	},
	data(){
		return{
			loadingText: 'Loading...',
			toastLoading: null
		}
	},
	methods:{
		async appInitMethod(){
			await this.goLoginPage()
			await this.startLoading()
			await this.getLocalLanguageSetting()
			await this.getSysSettingInfo()
			await this.endLoading()
		},
		goLoginPage(){
			return new Promise(async resolve =>{
				this.$router.push('/login')
				resolve(true)
			})
		},
		getLocalLanguageSetting(){
			return new Promise(async resolve => {
				this.loadingText = '加载语言...'
				this.toastLoading = await this.startLoading()
				let language = localStorage.getItem('language')
				if(!language){
					localStorage.setItem('language', this.$store.state.language)
				}else{
					this.$store.dispatch('setLanguage', language)
				}
				resolve(true)
			})
		},
		getSysSettingInfo(){
			return new Promise(async resolve =>{
				let systemInfo = await this.$axios.post(this.$sysConfig.server + '/setup/get')
				if(systemInfo.data.code === 0){
					this.$store.dispatch('setSystemInfo', systemInfo.data.doc)
					localStorage.setItem('setSystemInfo',JSON.stringify(systemInfo.data.doc))
				}
				resolve(systemInfo)
			})
		},
		startLoading(){
			return new Promise( resolve =>{
				this.toastLoading = this.$toast.loading(this.loadingText,{
					coverColor: "rgba(0,0,0,0.5)"
				})
				resolve(this.toastLoading)
			})	
		},
		endLoading(){
			return new Promise( resolve =>{
				this.toastLoading.hide();
				resolve(true)
			})	
		}
	}
}
</script>