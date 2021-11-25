

<template>

<div>
     <div class="loader overlay"  v-show="loading">
          <img :src="logo" class="rotate" width="100" height="100" />
       </div>
  <div class="flex flex-col flex-1 items-center justify-start w-screen overflow-y-auto overflow-x-hidden z-0 pt-4 sm:pt-8 px-4 md:pt-10 pb-20"><div class="sc-gwVKww sc-daURTG gBShpO"></div>
        <div height="0" class="sc-cQFLBn cThFpX"><div class="sc-gojNiO qxEgk">

        </div>
    </div>
        
<div class="container mx-auto max-w-3xl">
    <div class="bg-dm-secondary w-full rounded p-2">
      <div class="row" style="margin-top: 30px;margin-left: 10px;">
        <div class="col-md-9 text-secondary md:text-white">
          <button @click="back">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-qrIAp jEIQJc text-white"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      </button>
    </div>
        <div class="col-md-3 flex items-center">
          <div class="sc-kLIISr buSGRA text-white">WETH Vault #{{id}}</div>
        </div>
       </div>
       <!-- vif -->
     
<div class="flex flex-col"><div class="flex-1 flex flex-col p-4">
    <div class="flex-col space-y-8">
        <div class="flex-col space-y-2" v-if="!loading_data">
            <div class="flex justify-between">
                <div class="text-xl text-white">Vault Info</div>
            </div>
            <div class="row">
              <div class="col-md-10 text-secondary md:text-white">
                <div class="text-lg text-secondary">Collateral</div>
              </div>
              <div class="col-md-2 flex items-center">
                <div class="sc-kLIISr buSGRA text-white" v-if="isNaN(parseFloat(vaultData.vaultCollateral).toFixed(4))">0 WETH</div>
                <div class="sc-kLIISr buSGRA text-white" v-else>{{parseFloat(vaultData.vaultCollateral).toFixed(4)}} WETH</div>
              </div>
             </div>
             <div class="row">
              <div class="col-md-10 text-secondary md:text-white">
                <div class="text-lg text-secondary">Debt</div>
              </div>
              <div class="col-md-2 flex items-center">
                <div class="text-lg text-white overflow-hidden overflow-ellipsis" v-if="isNaN(parseFloat(vaultData.debt).toFixed(4))">0  gDai </div>
                <div class="text-lg text-white overflow-hidden overflow-ellipsis" v-else>{{parseFloat(vaultData.debt).toFixed(4)}}  gDai </div>
              </div>
             </div>
             <div class="row">
              <div class="col-md-10 text-secondary md:text-white">
                <div class="text-lg text-secondary">Collateral Value</div>
              </div>
              <div class="col-md-2 flex items-center">
                <div class="text-lg text-white overflow-hidden overflow-ellipsis" >  ${{(parseFloat(WETHprice) * parseFloat(vaultData.vaultCollateral)).toFixed(4)}}  </div>
              </div>
             </div>
          
             <div class="row">
              <div class="col-md-10 text-secondary md:text-white">
                <div class="text-lg text-secondary">Debt Value</div>
              </div>
              <div class="col-md-2 flex items-center">
                <div class="text-lg text-white overflow-hidden overflow-ellipsis" v-if="isNaN((parseFloat(gDaiPrice)* parseFloat(vaultData.debt)).toFixed(4))">$0  </div>
                <div class="text-lg text-white overflow-hidden overflow-ellipsis" v-else>${{(parseFloat(gDaiPrice)* parseFloat(vaultData.debt)).toFixed(4)}}  </div>
              </div>
             </div>
            
            
             <div class="row">
              <div class="col-md-10 text-secondary md:text-white">
                <div class="text-lg text-secondary">Collateral to Debt Ratio</div>
              </div>
              <div class="col-md-2 flex items-center">
                <div class="text-lg text-white overflow-hidden overflow-ellipsis" v-if="isNaN(parseFloat(vaultData.ratio).toFixed(4))">0 %</div>
                <div class="text-lg text-white overflow-hidden overflow-ellipsis" v-else>{{parseFloat(vaultData.ratio).toFixed(4)}} %</div>
              </div>
             </div>
            
             <div class="row">
              <div class="col-md-10 text-secondary md:text-white">
                <div class="text-lg text-secondary">Minimum Collateral to Debt Ratio</div>
              </div>
              <div class="col-md-2 flex items-center">
                <div class="text-lg text-white overflow-hidden overflow-ellipsis">150%</div>
              </div>
             </div>
          
             <div class="row">
              <div class="col-md-10 text-secondary md:text-white">
                <div class="text-lg text-secondary">Available to Borrow</div>
              </div>
              <div class="col-md-2 flex items-center">
                <div class="text-lg text-white overflow-hidden overflow-ellipsis" v-if="isNaN(parseFloat(vaultData.availableBorrow).toFixed(4))">0 gDai</div>
                <div class="text-lg text-white overflow-hidden overflow-ellipsis" v-else>{{parseFloat(vaultData.availableBorrow).toFixed(2)}} gDai</div>
              </div>
             </div>
             <div class="row">
              <div class="col-md-9 text-secondary md:text-white">
                
              </div>
              <div class="col-md-3flex items-center">
              <span v-if="parseInt(vaultData.ratio) < 150"><button class="btn btn-danger  float-right" @click="liquidateVault(id)">Liquidate Vault</button></span>
              </div>
             </div>
            
    </div>
    <div v-else>
      <h5 style="text-align: center">loading...</h5>
    </div>
    <div v-if="user.address == vaultData.owner" class="react-tabs" data-tabs="true">
        <div class="flex justify-between mb-2">
            <div class="text-xl text-white">Manage</div>
        </div>
        <ul class="flex rounded bg-white p-1 overflow-auto" role="tablist">
            <li class="flex flex-1 justify-center items-center rounded text-lg text-primary cursor-pointer focus:outline-none select-none px-3 py-4 " role="tab" id="react-tabs-0" aria-selected="true" aria-disabled="false" aria-controls="react-tabs-1" tabindex="0" :class="{ 'bg-dm-primary text-off-white' : activeDeposit}" @click="activate('deposit')" >Deposit</li>
            <li class="flex flex-1 justify-center items-center rounded text-lg text-primary cursor-pointer focus:outline-none select-none px-3 py-4" role="tab" id="react-tabs-2" aria-selected="false" aria-disabled="false" aria-controls="react-tabs-3" :class="{ 'bg-dm-primary text-off-white' : activeWithdraw}"  @click="activate('withdraw')">Withdraw</li>
            <li class="flex flex-1 justify-center items-center rounded text-lg text-primary cursor-pointer focus:outline-none select-none px-3 py-4" role="tab" id="react-tabs-2" aria-selected="false" aria-disabled="false" aria-controls="react-tabs-3" :class="{ 'bg-dm-primary text-off-white' : activeBorrow}"  @click="activate('borrow')">Borrow</li>
            <li class="flex flex-1 justify-center items-center rounded text-lg text-primary cursor-pointer focus:outline-none select-none px-3 py-4" role="tab" id="react-tabs-6" aria-selected="false" aria-disabled="false" aria-controls="react-tabs-7" :class="{ 'bg-dm-primary text-off-white' : activeRepay}"  @click="activate('repay')">Repay</li>
        </ul>
        <div v-if="activeDeposit" class="react-tabs__tab-panel react-tabs__tab-panel--selected" role="tabpanel" id="react-tabs-1" aria-labelledby="react-tabs-0">
            <div>
            <div class="flex items-center justify-between my-4">
                <div class="flex items-center text-base text-secondary">
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline;"><line x1="7" y1="7" x2="17" y2="17"></line><polyline points="17 7 17 17 7 17"></polyline></svg>
                    </span>
                    <span class="mx-2">Deposit collateral</span>
                </div>
                <div class="text-base text-dm-text-primary text-right">Balance: {{ethBalance}} WETH</div>
            </div>
            <div class="flex items-center relative w-full mb-4">
                <input v-model="depositValue" inputmode="decimal" title="Token Amount" autocomplete="off" autocorrect="off" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" min="0" minlength="1" maxlength="79" spellcheck="false" class="sc-fhYwyz gehgmm text-gray-900 w-full p-3 bg-input rounded focus:ring focus:ring-dm-gray" value="">
                <button class="bg-transparent px-2 py-1 flex flex-row items-center justify-center rounded focus:outline-none focus:ring absolute right-4 focus:ring text-xs bg-dm-primary focus:ring-offset-dm-gray opacity-100 disabled:pointer-events-none disabled:opacity-10" style="color: white" @click="depositMax">MAX</button>
            </div>
              <button v-if="depositapprove"  style="background : #f87171 !important"  class="bg-opacity-80 w-full rounded text-base hover:bg-opacity-100 disabled:opacity-20 disabled:cursor-default p-3 flex flex-row items-center justify-center rounded focus:outline-none focus:ring bg-dm-primary text-white opacity-100 disabled:pointer-events-none disabled:opacity-10" @click="approveWeth()">Approve WETH </button>
            <button v-else style="background : #209719 !important" class=" bg-opacity-80 w-full rounded text-base hover:bg-opacity-100 disabled:opacity-20 disabled:cursor-default p-3 flex flex-row items-center justify-center rounded focus:outline-none focus:ring bg-dm-primary text-white opacity-100 disabled:pointer-events-none disabled:opacity-10"  @click="deposit()">Deposit WETH</button>
        </div>
    </div>
    <div v-if="activeWithdraw" class="react-tabs__tab-panel react-tabs__tab-panel--selected" role="tabpanel" id="react-tabs-3" aria-labelledby="react-tabs-2"><div>
        <div class="flex items-center justify-between my-4"><div class="flex items-center text-base text-secondary">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline;"><line x1="17" y1="17" x2="7" y2="7"></line><polyline points="7 17 7 7 17 7"></polyline>
            </svg>
        </span>
        <span class="mx-2">Withdraw collateral</span>
    </div>
    <div class="text-base text-dm-text-primary text-right" v-if="isNaN(parseFloat(vaultData.vaultCollateral).toFixed(4))">Available: 0 WETH</div>
    <div class="text-base text-dm-text-primary text-right" v-else>Available: {{parseFloat(vaultData.vaultCollateral).toFixed(4)}} WETH</div>
</div>
<div class="flex items-center relative w-full mb-4">
    <input v-model="withdrawValue" inputmode="decimal" title="Token Amount" autocomplete="off" autocorrect="off" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" min="0" minlength="1" maxlength="79" spellcheck="false" class="sc-fhYwyz gehgmm text-gray-900 w-full p-3 bg-input rounded focus:ring focus:ring-dm-gray" value="">
    <button class="bg-transparent px-2 py-1 flex flex-row items-center justify-center rounded focus:outline-none focus:ring absolute right-4 focus:ring text-xs bg-dm-primary focus:ring-offset-dm-gray opacity-100 disabled:pointer-events-none disabled:opacity-10" style="color: white" @click="withdrawMax">MAX</button>
  </div>
<button style="background : #209719 !important" class=" bg-opacity-80 w-full rounded text-base hover:bg-opacity-100 disabled:opacity-20 disabled:cursor-default p-3 flex flex-row items-center justify-center rounded focus:outline-none focus:ring bg-dm-primary text-white opacity-100 disabled:pointer-events-none disabled:opacity-10"  @click="withdraw()">Withdraw WETH</button>
</div>
</div>
<div v-if="activeBorrow" class="react-tabs__tab-panel react-tabs__tab-panel--selected" role="tabpanel" id="react-tabs-5" aria-labelledby="react-tabs-4">
    <div class="flex flex-col">
        <div class="flex items-center justify-between my-4">
            <div class="flex items-center text-base text-secondary">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline;"><line x1="17" y1="17" x2="7" y2="7"></line><polyline points="7 17 7 7 17 7"></polyline></svg>
                </span>
                <span class="flex items-center ml-2">Borrow gDai<span style="margin-left: 4px;"><div class="sc-bwzfXH kNDdYo">
                    <div class="sc-ifAKCX dCBhOg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    </div>
                </div>
            </span>
        </span>
    </div>
    <div class="text-base text-dm-text-primary text-right" v-if="isNaN(parseFloat(vaultData.availableBorrow).toFixed(4))">Max borrow: 0 gDai</div>
    <div class="text-base text-dm-text-primary text-right" v-else>Max borrow: {{parseFloat(vaultData.availableBorrow).toFixed(4)}} gDai</div>
</div>
<span class="w-full text-red text-center" v-if="parseFloat(vaultData.vaultCollateral) == 0">You must deposit collateral before you can borrow gDai (ghostDai).</span>
</div>
<div  v-if="parseFloat(vaultData.vaultCollateral) != 0">
  <div class="flex items-center relative w-full mb-4">
    <input v-model="borrowValue" inputmode="decimal" title="Token Amount" autocomplete="off" autocorrect="off" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" min="0" minlength="1" maxlength="79" spellcheck="false" class="sc-fhYwyz gehgmm text-gray-900 w-full p-3 bg-input rounded focus:ring focus:ring-dm-gray" value="">
    <button class="bg-transparent px-2 py-1 flex flex-row items-center justify-center rounded focus:outline-none focus:ring absolute right-4 focus:ring text-xs bg-dm-primary focus:ring-offset-dm-gray opacity-100 disabled:pointer-events-none disabled:opacity-10" style="color: white" @click="borrowMax(parseInt(vaultData.availableBorrow))">MAX</button>
  </div>
  <button style="background : #209719 !important" class=" bg-opacity-80 w-full rounded text-base hover:bg-opacity-100 disabled:opacity-20 disabled:cursor-default p-3 flex flex-row items-center justify-center rounded focus:outline-none focus:ring bg-dm-primary text-white opacity-100 disabled:pointer-events-none disabled:opacity-10"  @click="borrow()" >Borrow gDai</button>
  
</div>

</div>
<div v-if="activeRepay" class="react-tabs__tab-panel react-tabs__tab-panel--selected" role="tabpanel" id="react-tabs-7" aria-labelledby="react-tabs-6">
    <div>
        <div class="flex items-center justify-between my-4">
            <div class="flex items-center text-base text-secondary">
                <span><svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline;"><line x1="7" y1="7" x2="17" y2="17"></line><polyline points="17 7 17 17 7 17"></polyline></svg>
                </span>
                <span class="mx-2">Repay gDai debt</span>
            </div>
            <div class="text-base text-primary text-right">Balance: {{gDaiBalance}} gDai</div>
        </div>
        
        <div class="flex items-center relative w-full mb-4">
            <input inputmode="decimal" v-model="repayValue" title="Token Amount" autocomplete="off" autocorrect="off" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" min="0" minlength="1" maxlength="79" spellcheck="false" class="sc-fhYwyz gehgmm text-gray-900 w-full p-3 bg-input rounded focus:ring focus:ring-dm-gray" value="">
            <button class="bg-transparent px-2 py-1 flex flex-row items-center justify-center rounded focus:outline-none focus:ring absolute right-4 focus:ring text-xs bg-dm-primary focus:ring-offset-dm-gray opacity-100 disabled:pointer-events-none disabled:opacity-10" style="color: white;" @click="allGdaiBalance">ALL</button>
        </div>
        <button v-if="approve"  style="background : #f87171 !important"  class="bg-opacity-80 w-full rounded text-base hover:bg-opacity-100 disabled:opacity-20 disabled:cursor-default p-3 flex flex-row items-center justify-center rounded focus:outline-none focus:ring bg-dm-primary text-white opacity-100 disabled:pointer-events-none disabled:opacity-10" @click="approveToken()">Approve gDai </button>
        <button v-else style="background : #209719 !important" class="bg-pink bg-opacity-80 w-full rounded text-base hover:bg-opacity-100 disabled:opacity-20 disabled:cursor-default p-3 flex flex-row items-center justify-center rounded focus:outline-none focus:ring bg-dm-primary text-white opacity-100 disabled:pointer-events-none disabled:opacity-10" @click="repayToken()">Repay gDai </button>
    </div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
   
</div>

</template>
<script>
   import  {tokenAddress ,wethVaultAddress} from "../store/modules/abi";
export default {
 props: ['id'], 
 data(){
     return {
       loading_data : true,
      logo : require('@/assets/loogo.png'),
      activeDeposit:true,
      activeBorrow : false,
      activeWithdraw : false,
      activeRepay : false,
      depositValue : 0,
      withdrawValue : 0,
      repayValue: 0,
      borrowValue : 0 ,
      allowance : 0,
      owner: "",
      depositapprove: true,
      approve : true,
      loading: false,
      depositallowance : 0
     }
     //0xb95C80FaE7285EeCb5B8ad252d1af0B21d351AE7
 },
 mounted(){

    //  setInterval(() => {
    //     if(this.user.address.toLowerCase() == this.owner.toLowerCase()){
    //       this.vaultOwner = true; 
    //    }
    //  }, 1000);
       setTimeout(() => {
         this.getAllowance();
        this.loadData();
        
   },1000)
     
    console.log(this.$route.params.id);
 },
 watch : {
repayValue :async function(newvalue){
  console.log(newvalue)
  await this.getAllowance();
  if(parseFloat(this.allowance )>= parseFloat(newvalue)){
     this.approve = false;
  }else{
     this.approve = true;
  }
},
depositValue : async function(newvalue){
    console.log(newvalue)
    await this.getAllowance();
    if(parseFloat(this.depositallowance )>= parseFloat(newvalue)){
     this.depositapprove = false;
  }else{
     this.depositapprove = true;
  }
}
 },
 computed : {
  gDaiBalance : function(){
    return this.$store.state.vault.gdaiBalance;
    },
    ethBalance : function(){
    return this.$store.state.vault.wEthBalance;
    },
   WETHprice : function(){
    return this.$store.state.vault.wethPrice;
    },
    gDaiPrice : function(){
    return this.$store.state.vault.gDaiPrice;
    },
    vaultData : function(){
        return this.$store.state.vault.wethvault;

    },
    vaultOwner:function(){
        return this.$store.state.vault.wethvaultOwner;
    },
     user : function(){
     return this.$store.state.currentUser.user;
   },

 },
 methods : {
   async   getAllowance(){
     this.allowance = await window.tokenContract.methods.allowance(this.user.address , tokenAddress).call();
     this.depositallowance = await window.wethContract.methods.allowance(this.user.address , wethVaultAddress).call();
     this.allowance =  window.web3.utils.fromWei(this.allowance);
     this.depositallowance =  window.web3.utils.fromWei(this.depositallowance);
     console.log("allowance")
     console.log(this.allowance)
   },
   async approveWeth(){
            this.loading = true
        try {     
                 await window.wethContract.methods.approve(wethVaultAddress , window.web3.utils.toBN(window.web3.utils.toWei("100000000000"))).send({from: this.user.address});
                 this.$toast.success("Weth Approved successfully");
             
                   this.loading = false;
                    this.$store.dispatch("vault/loadWethVault" , this.id);
                    this.approve = false;
             }
            catch(error){
                this.$toast.error("error approving token"); 
                console.log(error);
                this.loading = false
            } 
   },
  async   approveToken(){
               this.loading = true
        try {     
                 await window.tokenContract.methods.approve(wethVaultAddress , window.web3.utils.toBN(window.web3.utils.toWei( this.repayValue))).send({from: this.user.address});
                 this.$toast.success("Token Approved successfully");
             
                   this.loading = false;
                    this.$store.dispatch("vault/loadWethVault" , this.id);
                    this.approve = false;
             }
            catch(error){
                this.$toast.error("error approving token"); 
                console.log(error);
                this.loading = false
            } 
            },
         async   repayToken(){
               this.loading = true
        try {     
                 await window.wethVaultContract.methods.payBackToken(this.id ,window.web3.utils.toBN(window.web3.utils.toWei( this.repayValue))).send({from: this.user.address});
                 this.$toast.success("Token Repayed successfully");
              
                   this.loading = false;
                    this.$store.dispatch("vault/loadWethVault" , this.id);
                    this.$store.dispatch("vault/getPriceData" );
                      this.$store.dispatch("vault/loadBalances" );
                    this.approve = true;
                    
             }
            catch(error){
                
                 this.$toast.error("Transaction Reverted."); 
                console.log(JSON.parse(error));
                
                this.loading = false
            } 
            },
borrowMax(val){
  this.borrowValue = ""+val;
},
  async borrow(){
    this.loading = true;
    try {     
                 await window.wethVaultContract.methods.borrowToken(this.id ,window.web3.utils.toBN(window.web3.utils.toWei( this.borrowValue)) ).send({from: this.user.address});
                 this.$toast.success("Token Borrowed successfully");
                 this.loading = false;
                    this.$store.dispatch("vault/loadWethVault" , this.id);
                    this.$store.dispatch("vault/getPriceData" );
                      this.$store.dispatch("vault/loadBalances" );
             }
            catch(error){
                this.$toast.error("Transaction Reverted.");
                this.loading = false;
            }
  },
   async withdraw(){
       console.log(this.id)
    if(this.withdrawValue == 0 ){
      this.$toast.error("enter withdraw value");
      return;
    }
   this.loading = true
        try {     
                 await window.wethVaultContract.methods.withdrawCollateral(this.id ,  window.web3.utils.toBN(window.web3.utils.toWei(this.withdrawValue))).send({from: this.user.address });
                 this.$toast.success("Collateral Withdrawn successfully");
             
                   this.loading = false;
                    this.$store.dispatch("vault/loadWethVault" , this.id);
                    this.$store.dispatch("vault/getPriceData" );
                    this.$store.dispatch("vault/loadBalances" );

             }
            catch(error){
                  this.$toast.error("Transaction Reverted.");
                this.loading = false
            } 
   },
   async loadVault(){
      console.log("vaultcount 1");
      let vaultcount = await window.tokenContract.methods.vaultCount().call();
   console.log("vaultcount");
   console.log("count "+vaultcount);
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
       vault.vaultCollateral = 
      console.log( typeof( vault.debt))
     
      vault.availableBorrow = (((parseFloat(vault.vaultCollateral) * parseFloat(this.ethPrice) ) / (150 * parseFloat( this.gDaiPrice))) * 100) -window.web3.utils.fromWei(vault.vaultCollateral); parseFloat(vault.debt);
      if(parseInt(vault.debt) !=0) {   
        vault.ratio = (parseFloat(vault.vaultCollateral) * parseFloat(this.ethPrice) / (parseFloat(vault.debt) *parseFloat( this.gDaiPrice))) * 100;

      }
       else {
        vault.ratio = 0;
       }
     
       vaults.push(vault);
     }
     this.$store.dispatch("vault/setVaults" ,vaults).then(()=> {
      this.$store.dispatch("vault/setVaultLoading" , false);
     });
 
    },
  async   deposit(){
    if(this.depositValue == 0 ){
      this.$toast.error("enter deposit value");
      return;
    }
               this.loading = true
        try {     
                 await window.wethVaultContract.methods.depositCollateral(this.id , window.web3.utils.toBN(window.web3.utils.toWei(this.depositValue))).send({from: this.user.address});
                 this.$toast.success("Collatoral Deposited successfully");
             
                   this.loading = false;
                    this.$store.dispatch("vault/loadWethVault" , this.id);
                    this.$store.dispatch("vault/getPriceData" );
                    this.$store.dispatch("vault/loadBalances" );
                    
                    
             }
            catch(error){
              console.log(error);
              this.$toast.error("Transaction Reverted.");
              this.loading = false
            } 
            },
  depositMax(){
    let val = parseFloat(this.ethBalance) - 0.00009;
    this.depositValue = ""+ val + ""; 
  },
  withdrawMax(){
    this.withdrawValue = parseFloat(this.vaultData.vaultCollateral).toFixed(4);

  },
  allGdaiBalance(){
    if(parseFloat(this.gDaiBalance) > parseFloat(this.vaultData.debt)){
      this.repayValue = parseFloat(this.vaultData.debt).toString();
    }else{
      this.repayValue = parseFloat(this.gDaiBalance).toFixed(3).toString();
    }
  },
 activate(type){
  this.offAll();
  if(type == 'deposit'){
    this.activeDeposit = true;
  }else if(type == 'withdraw'){
    this.activeWithdraw = true;
  }
  else if(type == 'borrow'){
    this.activeBorrow = true;
  }
  else if(type == 'repay'){
    this.activeRepay = true;
  }
 },
   offAll(){
    this.activeDeposit = false;
    this.activeBorrow = false;
    this.activeWithdraw = false;
    this.activeRepay = false;
   },
  back(){
    this.$router.push({ path: "/" })
  },
  async destroyVolt(){
   this.loading = true;
      try {
        await window.tokenContract.methods.destroyVault(this.id).send({from: this.user.address});
        this.$toast.success("vault destroyed successfully");
      
      this.$router.push({ path: "/" })
      }catch(err){
        console.log(err);
        this.$toast.error("transaction reverted");
        
      }
      
  },
  async liquidateVault(id){
     this.loading = true;
      try {
        await window.wethVaultContract.methods.liquidateVault(id).send({from: this.user.address});
        this.$toast.success("vault Liquidated successfully");
      this.loading = false;
      this.$router.push({ path: "/wethvault" })
      }catch(err){
        console.log(err);
        this.loading = false;
        this.$toast.error("transaction reverted");
        
      }
  },
   openTransferModal(){
        this.$store.dispatch("vault/transferVaultDialog" , true);
     },
    openborrowModal(){
        this.$store.dispatch("vault/borrowDialog" , true);
     },
     openrepayModal(){
        this.$store.dispatch("vault/rapayDialog" , true);
     },
     openDeopsitModal(){
        this.$store.dispatch("vault/depositDialog" , true);
     },
     openWithdrawModal(){
        this.$store.dispatch("vault/withdrawDialog" , true);
     },
   async loadData(){
     
    this.$store.dispatch("vault/loadWethVault" , this.id).then( () => {
      this.loading_data = false;
    });
     }
 }
}
</script>
<style scoped>
  .col, .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col-auto, .col-lg, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-auto, .col-md, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md-auto, .col-sm, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-auto {
    width: 100%;
    padding: 2px;
}
</style>

