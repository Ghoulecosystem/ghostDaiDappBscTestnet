<template>
  <div class="row col-md-6 offset-md-3" style="margin-top:40px">
    <div class="relative bg-dm-tertiary" style="border-radius: 10px; background-image: url(&quot;&quot;); background-repeat: no-repeat; background-size: contain; background-position: center bottom;">
      <div>
          <div class="flex justify-between items-center bg-dm-secondary flex items-center rounded-t px-2 py-4 sm:px-8 sm:py-6">
              <div class="grid grid-cols-2 md:grid-cols-6 gap-2 w-full">
                  <div class="mb-4 md:flex md:mb-0 items-center col-span-4 md:col-span-4">
                      <div class="flex flex-row items-center space-x-2 text-lg whitespace-nowrap">
                          <span style="color:white"> Vault monitor</span>
                          
                          
                      </div>
                  </div>
                
              </div>
              <p>Showing vaults close to liquidation</p>
          </div>
          
          <div class="px-2 py-4 sm:p-8">
             
              <div class="grid grid-cols-4 pb-4 px-4 text-sm  text-secondary "  >
                  <div>Vault ID</div>
                  <div>  Ratio </div>
                  <div class="flex items-center justify-end">Collateral </div>
                  <div class="flex items-center justify-end">Debt </div>
              </div>
  
              <div class="flex-col space-y-2">
                <div class="rounded bg-dm-secondary" v-for="vault  in listedVault" :key="vault.id" @click="openVault(vault.id)">
                  <div  class="grid grid-cols-4 py-4 px-4 cursor-pointer select-none rounded text-sm" @click="expandVault(vault.id)">
                      <div class="flex items-center">
                          <div class="mr-4" style="color:white">Vault #{{vault.id}}  </div>
                      </div>
                      <div class="flex items-center">
                        <div class="mr-4" style="color:white">  <span class="alert alert-warning">{{parseFloat(vault.ratio).toFixed(2)}} %</span></div>
                    </div>
                      <div class="flex justify-end items-center min-w-0">
                          <span class="text-white text-right overflow-ellipsis overflow-hidden">${{parseFloat(vault.vaultCollateral).toFixed(2) }}</span>
                      </div>
                      
                      <div class="flex justify-end items-center">
                        <span class="text-white text-right overflow-ellipsis overflow-hidden">{{parseFloat(vault.debt).toFixed(2) }} gdai</span>
                  </div>
              </div>
             
              </div>
                   <div class="card-footer pb-0 pt-3"></div>

              </div>
              <!-- <div style="color:white;background: #0f1416 ; padding :15px; border-radius: 20px ; margin: 10px;" class="grid grid-cols-4 pb-4 px-4 text-sm  " v-for="vault  in vaults" :key="vault.id"  @click="openVault(vault.id)">
                <div>vault #{{vault.id}}</div>
                <div class="flex items-center justify-end">{{parseFloat(vault.vaultCollateral).toFixed(2) }} </div>
                <div class="flex items-center justify-end">{{parseFloat(vault.debt).toFixed(2) }}</div>
                <div class="flex items-center justify-end">{{parseFloat(vault.ratio).toFixed(2)}}</div>
             </div> -->
             
                  <div v-if="loading" class="flex-col space-y-2"><div class="w-full text-center py-6" style="color: white;">loading...</div></div>
                  <div v-if="vaults.length == 0 && !loading" class="flex-col space-y-2"><div class="w-full text-center py-6" style="color: white;"> no vaults.</div></div>
                   <div class="card-footer pb-0 pt-3">
                  <jw-pagination :items="vaults" @changePage="onChangePage"></jw-pagination>
                 </div>
      </div >
  </div>
  </div>

   </div>
</template>
<script>
export default {
  data(){
    return{
      loading : true,
       vaults  : [],
       listedVault : [],
        headers: [
                      
                        {
                        text: 'Vault ID + Ratio', 
                        sortable: false,
                        value: 'id',
                        },
                        { text: 'Collateral Value', value: 'Collateral' },
                        { text: 'Debt', value: 'Debt' },
        
                    ], 
    }
  },
  mounted(){
    this.loadVault();
  },
         computed: {
    wethPrice : function(){
    return this.$store.state.vault.wethPrice;
    },
    gDaiPrice : function(){
    return this.$store.state.vault.gDaiPrice;
    },
    user : function(){
     return this.$store.state.currentUser.user;
   },
   
    },
  methods : {
       onChangePage(pageOfItems) {
            // update page of items
            this.listedVault = pageOfItems;
    },
    openVault(id){
      this.$router.push("/wethvaultmenu/"+id);
    },
     async loadVault(){
      this.vaults = [];
       
      let vaultcount = await window.wethVaultContract.methods.vaultCount().call();
     console.log("vaultcount");
     console.log(vaultcount);
     for(let index = 0; index < vaultcount; index++){
       let vault = {};
       vault.id = index;
       vault.debt = await window.wethVaultContract.methods.vaultDebt(index).call();
       vault.debt = window.web3.utils.fromWei(vault.debt);
       vault.vaultCollateral = await window.wethVaultContract.methods.vaultCollateral(index).call();
       if(parseFloat(vault.vaultCollateral) == 0){
         continue;
       }
       vault.vaultCollateral = window.web3.utils.fromWei(vault.vaultCollateral);
       vault.vaultCollateral = parseFloat(this.wethPrice) * parseFloat(vault.vaultCollateral);
       vault.debt  = parseFloat(this.gDaiPrice)* parseFloat(vault.debt);
       if(parseFloat(vault.vaultCollateral) == 0 && parseFloat(vault.debt) )
       vault.debtRatio = (parseFloat(vault.vaultCollateral) /  parseFloat(vault.debt) * 100).toFixed(2);
      console.log( typeof( vault.debt))
      if(parseInt(vault.debt) !=0) {   
        vault.ratio = (parseFloat(vault.vaultCollateral)  / (parseFloat(vault.debt) )) * 100;

      }
       else {
        vault.ratio = 0;
       }
// parseFloat(vault.ratio).toFixed(2) > 0 &&
       if(parseFloat(vault.ratio).toFixed(2) > 0 && parseFloat(vault.ratio).toFixed(2) <  200){
          this.vaults.push(vault);
       }

      
       
     }
     this.loading = false;
    },
  }
}
</script>
