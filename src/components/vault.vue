<template>
 <div>
      <div class="loader overlay"  v-show="loading"> 
                <img :src="logo1" class="rotate" width="100" height="100" />   
               </div>
  <div class="relative bg-dm-tertiary" style="border-radius: 10px; background-image: url(&quot;&quot;); background-repeat: no-repeat; background-size: contain; background-position: center bottom;">
    <div>
        <div class="flex justify-between items-center bg-dm-secondary flex items-center rounded-t px-2 py-4 sm:px-8 sm:py-6">
            <div class="grid grid-cols-2 md:grid-cols-6  w-full">
                <div class="mb-4 md:flex md:mb-0 items-center col-span-4 md:col-span-4">
                    <div class="flex flex-row items-center space-x-2 text-lg whitespace-nowrap">
                        <span style="color:white ; margin-top : 11px">Your Vaults</span>
                       
                    </div>
                     <div v-if="search"  style="padding-left : 40px" class="flex flex-row items-center space-x-2 text-lg whitespace-nowrap">
                       <div class="row">
                              
                            <div class="col-7"><input type="number" v-model="valtId" class="form-control" style="height: 40px; border-radius: 20px;margin-right: 30px; color: black" placeholder="Vault ID"></div>
                            <div class="col-5"> 
                                <button class="flex items-center rounded-lg bg-pink-deeper text-sm text-white py-3 px-3 search-button" >
                              <div class="mr-2 ml-2" @click="searchVault()">Go</div>
                          </button></div>
                          </div>
                    </div>
                </div>
                <!-- <button class="btn btn-success">create</button> -->
                <button  style="padding :0px !important" class="bg-transparent p-3 flex flex-row items-center justify-center rounded focus:outline-none focus:ring col-span-1 bg-dm-primary text-white opacity-100 disabled:pointer-events-none disabled:opacity-10" @click="openSearch()" v-if="vaults.length > 10">Search</button>
                <button  style="padding :0px !important" class="bg-transparent p-1 flex flex-row items-center justify-center rounded focus:outline-none focus:ring bg-dm-primary text-white col-span-1 opacity-100 disabled:pointer-events-none disabled:opacity-10"  @click="create" >Create</button>
            </div>
           
        </div>
        
        <div class="px-2 py-4 sm:p-8">
           
            <div class="grid grid-cols-4 pb-4 px-4 text-sm  text-secondary "  >
                <div>Vault ID</div>
                <div class="flex items-center justify-end">Collateral (BNB)</div>
                <div class="flex items-center justify-end">Debt (gDai)</div>
                <div class="flex items-center justify-end">Ratio</div>
            </div>

            <div class="flex-col space-y-2">
           
               <div  v-if="!vaultLoading">
                <div class="rounded bg-dm-secondary" v-for="vault  in vaults" :key="vault.id">
                  <div class="grid grid-cols-4 py-4 px-4 cursor-pointer select-none rounded text-sm" @click="expandVault(vault.id)">
                      <div class="flex items-center">
                          <div class="mr-4" style="color:white">Vault #{{vault.id}}</div>
                      </div>
                      <div class="flex justify-end items-center min-w-0">
                          <span class="text-white text-right overflow-ellipsis overflow-hidden">{{parseFloat(vault.vaultCollateral).toFixed(2) }}</span>
                      </div>
                      <div class="flex justify-end items-center min-w-0">
                          <span class="text-white text-right overflow-ellipsis overflow-hidden">{{parseFloat(vault.debt).toFixed(2) }}</span>
                      </div>
                      <div class="flex justify-end items-center">
                          <div style="color:white">{{parseFloat(vault.ratio).toFixed(2)}} %</div>
                  </div>
              </div>
              <div class="p-4 space-y-4" :id="'vault' + vault.id" style="display: none;">
                  <div class="flex-col space-y-8">
                      <div class="flex-col space-y-2">
                          <div class="row">
                              <div class="col-md-10 text-secondary md:text-white">Collateral</div>
                              <div class="col-md-2 flex items-center">
                                  <div class="text-lg text-white overflow-hidden overflow-ellipsis"><span class="pull-right">{{parseFloat(vault.vaultCollateral).toFixed(2) }} BNB</span></div>
                              </div>
                          </div>
                          <div class="row">
                            <div class="col-md-10 text-secondary md:text-white">Debt</div>
                            <div class="col-md-2 flex items-center">
                                <div class="text-lg text-white overflow-hidden overflow-ellipsis"><span class="pull-right">{{parseFloat(vault.debt).toFixed(2) }} gDai</span></div>
                            </div>
                        </div>
                        <div class="row">
                          <div class="col-md-10 text-secondary md:text-white">Collateral Value</div>
                          <div class="col-md-2 flex items-center">
                              <div class="text-lg text-white overflow-hidden overflow-ellipsis"><span class="pull-right">${{(
                                parseFloat(bnbprice) * parseFloat(vault.vaultCollateral)).toFixed(2)}} USD</span></div>
                          </div>
                      </div>
                      <div class="row">
                        <div class="col-md-10 text-secondary md:text-white">Debt Value</div>
                        <div class="col-md-2 flex items-center">
                            <div class="text-lg text-white overflow-hidden overflow-ellipsis"><span class="pull-right">${{(
                              parseFloat(gDaiPrice)* parseFloat(vault.debt)).toFixed(2)}} USD</span></div>
                        </div>
                       </div>
  
                       <div class="row">
                        <div class="col-md-10 text-secondary md:text-white">Collateral to Debt Ratio</div>
                        <div class="col-md-2 flex items-center">
                            <div class="text-lg text-white overflow-hidden overflow-ellipsis"><span class="pull-right">{{(((parseFloat(bnbprice) * parseFloat(vault.vaultCollateral)) /(parseFloat(gDaiPrice)* parseFloat(vault.debt))) *100).toFixed(2)}} %</span></div>
                        </div>
                       </div>
  
                       <div class="row">
                        <div class="col-md-10 text-secondary md:text-white">Available to Borrow</div>
                        <div class="col-md-2 flex items-center">
                            <div class="text-lg text-white overflow-hidden overflow-ellipsis"><span class="pull-right">{{parseFloat(vault.availableBorrow).toFixed(2)}} gDai</span></div>
                        </div>
                       </div>
                         
                         
                         
                         
                          </div>
                      </div>
                      
                      <button @click="openVault(vault.id)" class="bg-transparent p-3 flex flex-row items-center justify-center rounded focus:outline-none focus:ring text-white w-full bg-dm-primary opacity-100 disabled:pointer-events-none disabled:opacity-10">Manage</button>
                  </div>
              </div>
               </div>
              <div v-if="vaultLoading"><h4 style="text-align: center;">Vault Loading...</h4></div>
            </div>
            <!-- <div style="color:white;background: #0f1416 ; padding :15px; border-radius: 20px ; margin: 10px;" class="grid grid-cols-4 pb-4 px-4 text-sm  " v-for="vault  in vaults" :key="vault.id"  @click="openVault(vault.id)">
              <div>vault #{{vault.id}}</div>
              <div class="flex items-center justify-end">{{parseFloat(vault.vaultCollateral).toFixed(2) }} </div>
              <div class="flex items-center justify-end">{{parseFloat(vault.debt).toFixed(2) }}</div>
              <div class="flex items-center justify-end">{{parseFloat(vault.ratio).toFixed(2)}}</div>
           </div> -->
           
                <div v-if="vaults.length == 0 && !vaultLoading" class="flex-col space-y-2"><div class="w-full text-center py-6" style="color: white;">You have no vaults.</div></div>
                <div class="rounded-lg bg-yellow-400 bg-opacity-20 p-4 mt-4"><span class="text-sm text-white flex flex-row text-center">55,264,387.665 gDai available to mint<span style="margin-left: 4px;">
                    <div class="sc-bwzfXH kNDdYo">
                        <div class="sc-ifAKCX dCBhOg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        </div>
                    </div>
                </span>
            </span>
        </div>
    </div>
</div>
</div>
<div class="text-center m-4">
<h2 class="text-dm-text-tertiary">
    Liquidate undercollateralized vaults in the 
    <span style="color:red ; cursor: pointer;" @click="openMonitor">vault monitor</span>
    !</h2>
</div>
 </div>
<!-- <div class="container" style="height: 70vh; margin-top: 10vh; ">
          <div class="top-bar" >
              <h4 class="top-title">Your Vaults</h4>
              <div class="top-buttons">
                <button class="flex items-center rounded-lg bg-pink-deeper text-sm text-white py-2 px-3 search-button " style="margin-right: 20px">
                    <div class="mr-2 " @click="openSearch" >Search</div>
                </button>
                <button class="flex items-center rounded-lg bg-pink-deeper text-sm text-white py-2 px-3 search-button " >
                    <div class="mr-2 " @click="create" >Create</div>
                </button>
                
              </div>
            
          </div>

          <div v-if="search"  class=" " style=" background: hsl(225, 20%, 4%);; padding-bottom: 20px;">
            <div class="row">
                <div class="col-2"></div>
              <div class="col-7"><input type="number" v-model="valtId" class="form-control" style="height: 40px; border-radius: 20px;" placeholder="Vault ID"></div>
              <div class="col-3"> 
                  <button class="flex items-center rounded-lg bg-pink-deeper text-sm text-white py-2 px-3 search-button" >
                <div class="mr-2 " @click="searchVault()">Go</div>
            </button></div>
            </div>
           
        </div>
          <div class="buttom-container">
             <v-data-table
    :headers="headers"
    :items="vaults"
    :items-per-page="5"
    
    class="elevation-1"
    :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus'
    }"
  >
  
<template v-slot:item="row">
          <tr @click="openVault(row.item.id)">
              <td>{{row.item.id}}</td>
              <td>{{row.item.vaultCollateral}}</td>
              <td>
              <span >{{row.item.debt}}</span>
              </td>
              
              <td>
                 {{row.item.ratio}}
              </td>
              
          </tr>
      </template>
  </v-data-table>
            
       </div>  
      </div> -->
</template>


<script>
export default {
  data(){
      return {
        logo1 : require('@/assets/loogo.png'),
        valtId : '',
        search: false,
        dialog : false,
        loading :false,
          logo : require('@/assets/image.png'),
             headers: [
                      
                        {
                        text: 'Vault ID', 
                        sortable: false,
                        value: 'id',
                        },
                        { text: 'Collateral (BNB)', value: 'Collateral' },
                        { text: 'Debt gDai', value: 'Debt' },
                        { text: 'Ratio(%)', value: 'ratio' },
        
                    ], 
      }
  },
   computed: {
    bnbprice : function(){
    return this.$store.state.vault.ethPrice;
    },
    vaultLoading : function(){
    return this.$store.state.vault.vaultLoading;
    },
    gDaiPrice : function(){
    return this.$store.state.vault.gDaiPrice;
    },
    user : function(){
     return this.$store.state.currentUser.user;
   },
   vaults : function(){
    return this.$store.state.vault.vaults;
   }
    },
  watch: {
    // user : function(newuser){
    //   console.log("heloo")
    //  if(newuser.id){
    //   this.rescanVaults();
    //   // this.loadVault();
    //  }
    // }
  },
  mounted(){
  //  setInterval(() => {
  //    if(this.user.address){
  //     console.log("heloioooo")
  //     this.rescanVaults();
  //     // this.loadVault();
  //    }
  //  }, 1000);

  },
  methods : {
  
    openMonitor(){
      this.$router.push({ path: "/monitor" })
     },
     expandVault(id){
     if(document.querySelector("#vault" + id).style.display == "block" ){
      document.querySelector("#vault" + id).style.display = "none";
     }else{
      document.querySelector("#vault" + id).style.display = "block"
     }
     },
   async searchVault(){
    this.loading= true;
      if(this.valtId == ''){
        this.$toast.error("Enter Vault ID");
         this.loading=  false;
        return;
      }

      let valid = await window.tokenContract.methods.vaultExistence(this.valtId).call();
      if(valid){
         this.loading=  false;
        this.$router.push("/vaultmenu/"+this.valtId);
      }else{
        this.$toast.error("Enter a Valid Vault ID");
         this.loading=  false;
      }
      
    },
    openSearch(){
      this.search =  !this.search;
    },
    openVault(id){

      this.$router.push("/vaultmenu/"+id);
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
       vault.vaultCollateral = window.web3.utils.fromWei(vault.vaultCollateral);
      console.log( typeof( vault.debt))
     
      vault.availableBorrow = (((parseFloat(vault.vaultCollateral) * parseFloat(this.ethPrice) ) / (150 * parseFloat( this.gDaiPrice))) * 100) - parseFloat(vault.debt);
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
     async rescanVaults(){
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
           localStorage.setItem(this.user.address.toLowerCase(),JSON.stringify(array));
        }
       }
    
        
     },
     async create(){
       this.loading=  true;

      this.$store.dispatch("vault/createVault").then(
        (vaultID) =>{
          let vaultIDs =  localStorage.getItem(this.user.address) != null ? JSON.parse(localStorage.getItem(this.user.address))  : []
            vaultIDs.push(vaultID)
             localStorage.setItem(this.user.address,JSON.stringify(vaultIDs));
             this.$store.dispatch("vault/setVaultLoading" , true);
             this.loadVault();
          this.$toast.success("vault created successfully");
         
          this.loading=  false;
        }
      ).catch( error => {
        this.$toast.error("transaction reverted");
        console.log(error)
         this.loading=  false;
      });
      

        
        //  this.$store.dispatch("vault/createVault" ).then(
        //    response => {
        //      console.log(response);
        //    }
        //  ).catch(error => {
        //    console.log(error);
        //  })
      }
  }
}
</script>