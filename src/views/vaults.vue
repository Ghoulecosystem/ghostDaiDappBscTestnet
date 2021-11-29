<template>
<div>
<topmenu></topmenu>
<div class="flex flex-col flex-1 items-center justify-start w-screen overflow-y-auto overflow-x-hidden z-0 pt-4 sm:pt-8 px-4 md:pt-10 pb-20">
    <div class="sc-gwVKww sc-daURTG gBShpO">

    </div>
    <div height="0" class="sc-cQFLBn cThFpX">
        <div class="sc-gojNiO qxEgk"></div>
    </div>
   
<div class="absolute top-100 right-0 left-50 overflow-hidden" style="z-index: -1;"></div>

<div class="container max-w-3xl mx-auto px-4 md:px-0">
    <!-- <vault v-if="user.address && chainID == '97'"></vault> -->
      <div  v-if="user.address && chainID == '97'" class="container max-w-5xl mx-auto space-y-2">
      <div class="loader overlay"  v-show="mainloading">
          <img :src="logo" class="rotate" width="100" height="100" />
       </div>
        <div class="flex flex-row items-center justify-between mb-8">
            <div class="flex flex-row items-center">
                <!-- <button class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </button> -->
                <h1 class="ml-4 text-3xl">Create Vault</h1>
            </div>
        </div>
<div class="">
            <div class="space-y-2">
                
                <div class="row  fadeshow1" style="color : gray">
                    <div class="col-md-3">Asset</div>
                    <div class="col-md-3">gDai Available</div>
                    <div class="col-md-3">Min Coll. Ratio</div>
                    <div class="col-md-3"></div>
                </div>
                <div v-if="loading"><h4 style="text-align: center ; margin-top : 50px">loading...</h4></div>
                <div  v-else class="text-white">
                    <div class="md:hidden"   > 
                        <div class="rounded-lg bg-dm-secondary p-4">
                            <div class="flex flex-col space-y-4">
                                <div @click="openBNBVault()" class="flex flex-row items-center">
                                    <div class="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center mr-2">
                                        <img src="/static/media/matic-logo.1140771b.png" class="w-4 h-4" alt="">
                                    </div>
                                    <span class="flex flex-col ml-2 items-start" style="cursor : pointer"> {{bnbVault.name}} 
                                      
                            </span>
                        </div>
                        <div class="flex flex-col space-y-2">
                            <div  @click="openBNBVault()" class="flex flex-row items-center justify-between">
                                <h2 class="text-dm-text-tertiary">gDai Available</h2>
                                <h2>{{bnbVault.gdaiAvailable}} gDai</h2>
                            </div>
                            <div  @click="openBNBVault()" class="flex flex-row items-center justify-between">
                                <h2 class="text-dm-text-tertiary">Minimum Coll. Ratio</h2>
                                <h2>{{bnbVault.minLiquidation}}%</h2>
                            </div>
                            <button class="rounded-lg bg-dm-tertiary w-full py-2 text-center" @click="createBNBVault">Create Vault</button>
                        </div>
                    </div>
                    </div>
                </div>
                <div   style="margin-bottom : 30px" class="row fadeshow1   tems-center bg-dm-secondary rounded-lg gap-8 transition transform hover:scale-x-99">
                    <div  @click="openBNBVault()" class="col-md-3"><span class="text-left overflow-ellipsis overflow-hidden ml-2 flex flex-col items-start" style="cursor : pointer" @click="openBNBVault()">{{bnbVault.name}} </span></div>
                    <div   @click="openBNBVault()" class="col-md-3">{{formatAmount(bnbVault.gdaiAvailable)}} gDai</div>
                    <div   @click="openBNBVault()" class="col-md-3">{{bnbVault.minLiquidation}}%</div>
                    <div class="col-md-3"> <button class="py-1 w-full h-full bg-dm-tertiary rounded-lg" @click="createBNBVault">Create Vault</button></div>
                </div>
                
        </div>

           <div v-if="loading"><h4 style="text-align: center ; margin-top : 50px">loading...</h4></div>
                <div  v-else class="text-white">
                    <div class="md:hidden">
                        <div class="rounded-lg bg-dm-secondary p-4">
                            <div class="flex flex-col space-y-4">
                         <div class="flex flex-row items-center" @click="openwethVault()">
                                    <div class="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center mr-2">
                                        <img src="/static/media/matic-logo.1140771b.png" class="w-4 h-4" alt="">
                                    </div>
                                    <span class="flex flex-col ml-2 items-start"  style="cursor : pointer"> {{wethVault.name}} 
                                      
                            </span>
                        </div>
                        <div class="flex flex-col space-y-2">
                            <div @click="openwethVault()" class="flex flex-row items-center justify-between">
                                <h2 class="text-dm-text-tertiary">gDai Available</h2>
                                <h2>{{wethVault.gdaiAvailable}} gDai</h2>
                            </div>
                            <div @click="openwethVault()" class="flex flex-row items-center justify-between">
                                <h2 class="text-dm-text-tertiary">Minimum Coll. Ratio</h2>
                                <h2>{{wethVault.minLiquidation}}%</h2>
                            </div>
                            <button class="rounded-lg bg-dm-tertiary w-full py-2 text-center" @click="createwethVault">Create Vault</button>
                        </div>
                    </div>
                    </div>
                </div>
                <div style="margin-bottom : 30px"  class="row fadeshow1   tems-center bg-dm-secondary rounded-lg gap-8 transition transform hover:scale-x-99">
                    <div class="col-md-3" @click="openwethVault()" ><span class="text-left overflow-ellipsis overflow-hidden ml-2 flex flex-col items-start" style="cursor : pointer" >{{wethVault.name}} </span></div>
                    <div class="col-md-3" @click="openwethVault()">{{formatAmount(wethVault.gdaiAvailable)}} gDai</div>
                    <div class="col-md-3" @click="openwethVault()">{{wethVault.minLiquidation}}%</div>
                    <div class="col-md-3"> <button class="py-1 w-full h-full bg-dm-tertiary rounded-lg" @click="createwethVault">Create Vault</button></div>
                </div>
                
        </div>
</div>
        
</div>
  </div>
 <div v-if="user.address && chainID != '97'" class="relative bg-dm-tertiary" style="border-radius: 10px; background-image: url(&quot;&quot;); background-repeat: no-repeat; background-size: contain; background-position: center bottom;">
        <div>
            
            <div class="px-2 py-4 sm:p-8">
               
                
                    <div class="flex-col space-y-2">
                        <div class="w-full text-center py-6">
                            <h2 class="alert alert-danger" style="text-align:center; color : black">Wrong Network!!! Please connect to BSC Testnet Network!</h2></div></div>
                   
        </div>
    </div>
</div>
    <div v-if="!user.address " class="relative bg-dm-tertiary" style="border-radius: 10px; background-image: url(&quot;&quot;); background-repeat: no-repeat; background-size: contain; background-position: center bottom;">
        <div>
            
            <div class="px-2 py-4 sm:p-8">
               
                
                    <div class="flex-col space-y-2">
                        <div class="w-full text-center py-6">
                            <h2 class="" style="text-align:center; color : white">Please connect your wallet!</h2></div></div>
                   
        </div>
    </div>
</div>


</div>
</div>

</div>
</template>
<script>
import{wethVaultAddress } from "../store/modules/abi.js"

    export default {
        data() {
            return {
                logo : require('@/assets/loogo.png'),
                mainloading : false,
                loading : true,
               bnbVault : {
                   
                   name : "",
                   gdaiAvailable : 0,
                   minLiquidation : 0,
               } ,
                wethVault : {
                   
                   name : "",
                   gdaiAvailable : 0,
                   minLiquidation : 0,
               } 
            }
        },
         computed: {
    user : function(){
     return this.$store.state.currentUser.user;
   },
   chainID : function(){
       return this.$store.state.vault.chainID;
   }
    },
        methods:{
            openBNBVault() {
                this.$router.push({ path: "/bnbvault" })
            },
            openwethVault(){
               this.$router.push({ path: "/wethvault" }) 
            },
           formatAmount(amount) {
               let dollarUSLocale = Intl.NumberFormat('en-US');
              return  dollarUSLocale.format(parseFloat(amount));
           },
           async loadBNBVault() {
            this.bnbVault.name = "BNB Vault";
            this.bnbVault.minLiquidation = "150";
            let maxsupply  =  await window.tokenContract.methods.debtCeiling().call();
            let totalSupply  = await window.tokenContract.methods.totalSupply().call();
            maxsupply =  window.web3.utils.fromWei(maxsupply);
            totalSupply =  window.web3.utils.fromWei(totalSupply);
            this.bnbVault.gdaiAvailable = (parseFloat(maxsupply) - parseFloat(totalSupply)).toFixed(2);
            console.log(this.bnbVault.gdaiAvailable)
            this.loading =false;
            
           },
           async  loadWethVault() {
               this.loading = true;
            this.wethVault.name = "WETH Vault";
            this.wethVault.minLiquidation = await  window.wethVaultContract.methods._minimumCollateralPercentage().call();
            this.wethVault.gdaiAvailable  =  await window.tokenContract.methods.balanceOf(wethVaultAddress).call();
            this.wethVault.gdaiAvailable =  window.web3.utils.fromWei(this.wethVault.gdaiAvailable);
           
            this.loading =false;
           },

           createwethVault(){
       this.mainloading =  true;

      this.$store.dispatch("vault/createWethVault").then(
        (vaultID) =>{
        //   let vaultIDs =  localStorage.getItem(this.user.address) != null ? JSON.parse(localStorage.getItem(this.user.address))  : []
        //     vaultIDs.push(vaultID)
            console.log(vaultID)
            //  localStorage.setItem(this.user.address,JSON.stringify(vaultIDs));
          this.$toast.success("vault created successfully");
         
          this.mainloading=  false;
        }
      ).catch( error => {
        this.$toast.error("transaction reverted");
        console.log(error)
         this.mainloading=  false;
      });
           },
           async createBNBVault() {
            
       this.mainloading =  true;

      this.$store.dispatch("vault/createBNBVault").then(
        (vaultID) =>{
          let vaultIDs =  localStorage.getItem(this.user.address) != null ? JSON.parse(localStorage.getItem(this.user.address))  : []
            vaultIDs.push(vaultID)
             localStorage.setItem(this.user.address,JSON.stringify(vaultIDs));
          this.$toast.success("vault created successfully");
         
          this.mainloading=  false;
          this.openBNBVault();
        }
      ).catch( error => {
        this.$toast.error("transaction reverted");
        console.log(error)
         this.mainloading=  false;
      });
      

        
        //  this.$store.dispatch("vault/createVault" ).then(
        //    response => {
        //      console.log(response);
        //    }
        //  ).catch(error => {
        //    console.log(error);
        //  })
      }
           
        },
        mounted(){
        setInterval(() => {
           this.loadBNBVault();   
           this.loadWethVault();
          }, 10000);  
           setTimeout(() => {
           this.loadBNBVault();   
           this.loadWethVault();
          }, 2000);  
        }
    }
</script>
<style scoped>
@media only screen and (max-width: 526px) {
    .fadeshow1 {
        display: none;
    }
}
</style>