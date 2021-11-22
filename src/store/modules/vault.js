
const state = {
    depositDialog : false,
    withdrawDialog: false,
    borrowDialog :false,
    vaultOwner :false,
    rapayDialog : false,
    transferVaultDialog : false,
    vault : {},
    gdaiBalance : 0,
    EthBalance: 0,
    daiBalance : 0,
    vaults : [],
    ethPrice : 0,
    gDaiPrice : 0,
    chainID : 0,
    goulBalance : 0,
    vaultLoading : true
}

const getters = {}
const actions = {
   setVaultLoading({commit} , status){
    commit("setVaultLoading" , status);
   },
  setChainID({commit} , id){
      commit("setChainID" , id) ;
  },
  async getPriceData({commit}){
    let ethPrice = await window.tokenContract.methods.getEthPriceSource().call();
    let gDaiPrice = await window.tokenContract.methods.getTokenPriceSource().call();
    ethPrice = window.web3.utils.fromWei(ethPrice ,"Gwei");
    gDaiPrice = window.web3.utils.fromWei(gDaiPrice ,"Gwei");
    ethPrice = parseFloat(ethPrice) * 10;
    gDaiPrice = parseFloat(gDaiPrice) * 10;

    commit("setEthPrice" , ethPrice);
    commit("setgDaiPrice" , gDaiPrice);


  } ,
  async  loadVaults({commit} ){
        let vaultcount = await window.tokenContract.methods.vaultCount().call();
      
        var array = [];
            for(let index = 0 ; index < vaultcount; index++){
              let vaultOwner =  await window.tokenContract.methods.vaultOwner(index).call();
              console.log(vaultOwner);
             if(vaultOwner.toLowerCase() == this.user.address.toLowerCase()){
                array.push(index);
             }
            }
            let vaults = [];
            console.log(array);
            for(let index = 0; index < array.length ; index++){
            let vault = {};
            vault.id = array[index];
            vault.debt = await window.tokenContract.methods.vaultDebt(array[index]).call();
            vault.debt = window.web3.utils.fromWei(vault.debt);
            vault.vaultCollateral = await window.tokenContract.methods.vaultCollateral(array[index]).call();
            vault.vaultCollateral = window.web3.utils.fromWei(vault.vaultCollateral);
           
            
           // if(vault.debt != '0') {   
           //   vault.ratio = await  window.web3.utils.toBN(vault.vaultCollateral).div(window.web3.utils.toBN(vault.debt)).toString();
           // }
           //  else {
           //   vault.ratio = 0;
           //  }
           vault.ratio = 0;
            vaults.push(vault);
          }
          
          commit("setVaults" , vaults);   
    },
    setVaults({commit} , vaults) {
        commit("setVaults" , vaults);
    },
    async loadBalances({commit}){
      let  gdaiBalance = await window.tokenContract.methods.balanceOf(this.state.currentUser.user.address).call();
      let  goulBalance = await window.goulContract.methods.balanceOf(this.state.currentUser.user.address).call();
      let  daiBalance = await window.daiContract.methods.balanceOf(this.state.currentUser.user.address).call();


      let EthBalance = await window.web3.eth.getBalance(this.state.currentUser.user.address);
      goulBalance = window.web3.utils.fromWei(goulBalance, "ether");  
      daiBalance = window.web3.utils.fromWei(daiBalance, "ether");  

     EthBalance = window.web3.utils.fromWei(EthBalance, "ether");
     gdaiBalance = window.web3.utils.fromWei(gdaiBalance, "ether");
     EthBalance = parseFloat(EthBalance).toFixed(4);
     gdaiBalance = parseFloat(gdaiBalance).toFixed(4);
     daiBalance = parseFloat(daiBalance).toFixed(4);
        commit("setGdaiBalance" ,gdaiBalance);
        commit("setEthBalance" ,EthBalance);
        commit("setGoulBalance" ,goulBalance);
        commit("setdaiBalance" ,daiBalance);

    },
    async loadVault({state ,commit} , id ){
        let owner = await window.tokenContract.methods.vaultOwner(id).call();
        if(this.state.currentUser.user.address.toLowerCase() == owner.toLowerCase()){
            commit("setIsOwner" , true);
        }
      
      
       
       let vault = {};
       vault.debt = await window.tokenContract.methods.vaultDebt(id).call();
       vault.debt = window.web3.utils.fromWei(vault.debt);
       vault.owner = await window.tokenContract.methods.vaultOwner(id).call();
       vault.vaultCollateral = await window.tokenContract.methods.vaultCollateral(id).call();
       vault.vaultCollateral = window.web3.utils.fromWei(vault.vaultCollateral);
       vault.availableBorrow = (((parseFloat(vault.vaultCollateral) * parseFloat(state.ethPrice) ) / (150 * parseFloat( state.gDaiPrice))) * 100) - parseFloat(vault.debt);
       if(parseFloat(vault.debt) !=0) {   
         vault.ratio = (parseFloat(vault.vaultCollateral) * parseFloat(state.ethPrice) / (parseFloat(vault.debt) *parseFloat( state.gDaiPrice))) * 100;
 
       }
        else {
         vault.ratio = 0;
        }
       
       commit("setVaultData" , vault);
    },
    transferVaultDialog({commit} , status){
        commit("setTransferVaultDialog" , status);
    },
    rapayDialog({commit} , status){
        commit("setrapayDialog" , status);
    },
    borrowDialog({commit} , status){
        commit("setborrowDialog" , status);
    },
    depositDialog({commit} , status){
        commit("setdepositDialog" , status);
    },
    withdrawDialog({commit} , status){
        commit("setwithdrawDialog" , status);
    },
    async createBNBVault(){
        await window.tokenContract.methods.createVault().send({from: this.state.currentUser.user.address}).then(function(result ){
           
             return new Promise( (resolve) => {
                resolve(result.events.CreateVault.returnValues.vaultID);
             })
        }).catch( function(error){
            return new Promise( (_,reject) => {
                reject(error);
             }) 
        })
},
async createWethVault(){
    await window.wethVaultContract.methods.createVault().send({from: this.state.currentUser.user.address}).then(function(result ){
           
        return new Promise( (resolve) => {
           resolve(result.events.CreateVault.returnValues.vaultID);
        })
   }).catch( function(error){
       return new Promise( (_,reject) => {
           reject(error);
        }) 
   })
}
};
const mutations = {
    setVaultLoading(state , status){
      state.vaultLoading = status;  
    },
    setGoulBalance(state , goulBalance){
     state.goulBalance = goulBalance;
    },
    setdaiBalance(state , daiBalance){
        state.daiBalance = daiBalance;
       },
    setChainID(state , id){
        state.chainID= id;
    },
    setEthPrice(state , ethPrice){
        state.ethPrice = ethPrice;
    },
    setgDaiPrice(state , gDaiPrice){
        state.gDaiPrice = gDaiPrice;
    },
    setVaults(state , vaults){
     state.vaults =  vaults;
    },
    setGdaiBalance(state  , gdaiBalance){
        state.gdaiBalance  = gdaiBalance;
    },
    setEthBalance(state  ,EthBalance){
        state.EthBalance  = EthBalance;
    },
    setTransferVaultDialog(state , status){
        state.transferVaultDialog  = status;
       },
    setrapayDialog(state , status){
        state.rapayDialog  = status;
       },
    setborrowDialog(state , status){
     state.borrowDialog = status;
    },
    setVaultData(state , data){
     state.vault = data;
    },
    setIsOwner(state, status){
        state.vaultOwner = status;
    },
    setwithdrawDialog(state , status){
        state.withdrawDialog = status;
    },
    setdepositDialog(state , status){
        state.depositDialog = status;
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}