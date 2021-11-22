<template>
    <div>
        <div class="loader overlay"  v-show="loading">
            <img :src="logo" class="rotate" width="100" height="100" />
         </div>
         <div class="flex flex-col flex-1 items-center justify-start w-screen overflow-y-auto overflow-x-hidden z-0 pt-4 sm:pt-8 px-4 md:pt-10 pb-20">
            <div class="sc-gwVKww sc-daURTG gBShpO"></div>
            <div height="0" class="sc-cQFLBn cThFpX">
                <div class="sc-gojNiO qxEgk"></div>
            </div>
           
            <div class="z-0 flex flex-col items-start w-full">
                <main class="flex flex-col items-center justify-start flex-grow w-full h-full" style="height: max-content;">
                    <div class="px-4 py-4 md:py-8 lg:py-12 max-w-7xl w-full">
                        <div class="mb-2 grid grid-cols-12 gap-4">
                            <div class="flex justify-center col-span-12 lg:col-span-3 lg:justify-start"></div>
                            <div class="flex items-end col-span-12 lg:col-span-9">
                                <nav class="flex items-center justify-between w-full">
                                    <div class="flex"></div><div class="flex pr-2 sm:pr-4"></div>
                                </nav>
                            </div>
                        </div>
                        <div class="grid grid-cols-12 gap-4 min-h-1/2">
                            
                                <div class="col-span-12 lg:col-span-12 h-full" style="min-height: 40rem;">
                                    <div class="relative w-full bg-dm-tertiary mx-auto" style="border-radius: 10px; background-image: url(&quot;&quot;); background-repeat: no-repeat; background-size: contain; background-position: center bottom;">
                                        <div>
                                            <div class="flex justify-between items-center bg-dm-secondary flex items-center rounded-t px-4 sm:px-8 py-4 sm:py-6">
                                                <h2 class="mr-2" >Mint gDai with Dai </h2>
                                                <p><span style="font-size: 13px;" class="pull-right" >Static fee of 1% </span></p>
                                                
                                               
                                                <!-- <p class="text-sm">Static fee of 1%</p> -->
                                            </div>
                                         
                                            <div class="px-2 py-4 sm:p-8">
                                                <div class="flex flex-col items-center p-2">
                                                    <div class="flex flex-col items-center space-y-4 w-full">
                                           <div class="w-full">
                                                <div class="flex items-center justify-between sm:ml-12 mb-4">
                                  <div class="flex items-center text-base text-secondary">
                                      <span>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline;"><line x1="7" y1="7" x2="17" y2="17"></line><polyline points="17 7 17 17 7 17"></polyline></svg>
                                      </span>
                                      <span  v-if="toGdai" class="mx-2" >Deposit Dai</span>
                                      <span  v-else class="mx-2" >Deposit gDai</span>
                                  </div>
                                  <div v-if="toGdai" class="text-base text-dm-text-primary text-right">Dai Balance: {{DaiBalance}}</div>
                                  <div v-else class="text-base text-dm-text-primary text-right">gDai Balance: {{gDaiBalance}}</div>
                                                </div>
                                                <div class="flex flex-row w-full items-center">
                                  <img v-if="toGdai" class="hidden sm:block w-8 h-8 rounded-lg mr-4" :src="dailogo" alt="">
                                  <img v-else class="hidden sm:block w-8 h-8 rounded-lg mr-4" :src="logo" alt="">
        
                                  <div class="flex items-center relative w-full mb-4">
                                  <input  v-model="swapValue" inputmode="decimal" type="number" title="Token Amount" autocomplete="off" autocorrect="off"  pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" min="0" minlength="1" maxlength="79" spellcheck="false" class="sc-fhYwyz gehgmm text-gray-900 w-full p-3 bg-input rounded focus:ring focus:ring-dm-gray" value="">
                                      
                                    <button class="bg-transparent px-2 py-1 flex flex-row items-center justify-center rounded focus:outline-none focus:ring absolute right-4 focus:ring text-xs bg-dm-primary focus:ring-offset-dm-gray opacity-100 disabled:pointer-events-none disabled:opacity-10" style="color: white" @click="setMax()">MAX</button>
                                  </div>        
                                </div>
                                            </div>
                                            <button style="color: white;" @click="flip">
                                                <div class="p-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                                                </div>
                                            </button>
                                            <div class="w-full">
                                                <div class="flex flex-row w-full items-center">
                                                   
                                                    <img v-if="toGdai" class="hidden sm:block w-8 h-8 rounded-lg mr-4" :src="logo" alt="">
                                                    <img v-else class="hidden sm:block w-8 h-8 rounded-lg mr-4" :src="dailogo" alt="">
                                                    
                                                <input disabled="" v-model="recieveValue" inputmode="decimal" title="Token Amount" autocomplete="off" autocorrect="off" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" min="0" minlength="1" maxlength="79" spellcheck="false" class="sc-fhYwyz gehgmm text-gray-500 w-full p-3 bg-input rounded focus:ring  focus:ring-dm-gray" value="0">
                                                </div>
                                                <div class="flex items-center justify-between sm:ml-12 mt-4"><div class="flex items-center text-base text-secondary">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline;"><line x1="17" y1="17" x2="7" y2="7"></line><polyline points="7 17 7 7 17 7"></polyline>
                                                </svg>
                                            </span>
                                            <span  v-if="toGdai" class="mx-2">Receive gDai</span>
                                            <span  v-else class="mx-2">Receive Dai</span>
                                                </div>
                                                <div v-if="toGdai" class="text-base text-secondary text-right">Available gDai: {{gDaiReserve}}</div>
                                                <div v-else class="text-base text-secondary text-right">Available Dai: {{daiReserve}}</div>
        
                                            </div>
                                        </div>
                                        <div  v-if="!validValues" class="block w-full rounded text-sm p-4 bg-red bg-opacity-25 text-white ">
                                            <div class="flex">
                                                <div class="flex-shrink-0">
                                                    <svg class="h-5 w-5 text-red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg></div>
                                             <div class="ml-3">
                                                 <p v-if="toGdai">Not enough Dai balance.</p>
                                                 <p v-if="!toGdai">Not enough gDai balance.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div  v-if="!validReserves" class="block w-full rounded text-sm p-4 bg-red bg-opacity-25 text-white ">
                                            <div class="flex">
                                                <div class="flex-shrink-0">
                                                    <svg class="h-5 w-5 text-red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg></div>
                                             <div class="ml-3">
                                                 <p v-if="toGdai">Not enough Dai in reserve.</p>
                                                 <p v-else>Not enough gDai in reserve.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <button v-if="!approved && toGdai" class="bg-dm-gray bg-opacity-80 w-full rounded text-base disabled:opacity-40 p-3 flex flex-row items-center justify-center rounded focus:outline-none focus:ring text-white mt-8 opacity-100 disabled:pointer-events-none disabled:opacity-10"  style="background : #f87171 !important" @click="approve()">Approve Dai
                                    </button>
                                    <button v-if="!approved && !toGdai " class="bg-dm-gray bg-opacity-80 w-full rounded text-base disabled:opacity-40 p-3 flex flex-row items-center justify-center rounded focus:outline-none focus:ring text-white mt-8 opacity-100 disabled:pointer-events-none disabled:opacity-10"  style="background : #f87171 !important"  @click="approve()">Approve gDai
                                    </button> 
                                    <button v-if="approved " class="bg-dm-gray bg-opacity-80 w-full rounded text-base disabled:opacity-40 p-3 flex flex-row items-center justify-center rounded focus:outline-none focus:ring text-white mt-8 opacity-100 disabled:pointer-events-none disabled:opacity-10"  @click="swap()" style="background : #209719 !important">Swap
                                    </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        
    </div>

</template>


<script>
     import  {swapAddress } from "../store/modules/abi";
export default {

  data(){
      return {
        swapValue : 0,
        recieveValue :  0,
        daiReserve : 0,
        gDaiReserve : 0,
        daiRate : 0,
        gdaiRate : 0,
        gdaiAllowance : 0,
        daiAllowance : 0,
        validValues: true,
        validReserves : true,
        toGdai : true,
        approved : false,
        logo1 : require('@/assets/loogo.png'),
        valtId : '',
        search: false,
        dialog : false,
        loading :false,
          logo : require('@/assets/loogoicon.png'),
          dailogo : require('@/assets/dai.png')
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
   gDaiBalance : function(){
    return this.$store.state.vault.gdaiBalance;
    },
    DaiBalance : function(){
    return this.$store.state.vault.daiBalance;
    },
   vaults : function(){
    return this.$store.state.vault.vaults;
   }
    },
  watch: {
    swapValue : function(newval){
        if(newval == ""){
            this.recieveValue = 0;
            this.validValues = true;
            this.validReserves =  true;
            return;
        }
         
        if(this.toGdai){
            console.log(parseInt(this.daiAllowance))
            console.log(parseInt(newval))
              if(parseInt(this.daiAllowance) >= parseInt(newval)){
                  console.log("approved")
                    this.approved = true;
                }else{
                    console.log("not approved");
                     this.approved = false;
                }
        }else{
             console.log(parseInt(this.gdaiAllowance))
            console.log(parseInt(newval))
            if(parseInt(this.gdaiAllowance) >= parseInt(newval)){
                    this.approved = true;
                  console.log("approved")
                   
                }else{
                    this.approved = false;
                    console.log("not approved");
                }
        }
        if(parseInt(newval) == 0){
           
            this.recieveValue = 0;
            this.validValues = true;
            this.validReserves =  true;
            return;
        }

        
        if(this.toGdai){
            console.log(parseInt(this.daiAllowance))
            console.log(parseInt(newval))
              if(parseInt(this.daiAllowance) >= parseInt(newval)){
                  console.log("approved")
                    this.approved = true;
                }else{
                    this.approved = false;
                    console.log("not approved");
                }
            this.recieveValue = (parseFloat(newval) * parseFloat(this.daiRate) / 100).toFixed(2);
            this.recieveValue = this.recieveValue - (this.recieveValue *(1/100));

            if(parseFloat(this.DaiBalance) >= parseFloat(newval)){
                this.validValues = true;
            }else{
                this.validValues =  false;
            }

            if(parseFloat(this.recieveValue) <= parseFloat(this.gDaiReserve)){
                this.validReserves =  true;
            }else{
                this.validReserves =  false;
            }
        }else{
             console.log(parseInt(this.gdaiAllowance))
            console.log(parseInt(newval))
            if(parseInt(this.gdaiAllowance) >= parseInt(newval)){
                    this.approved = true;
                  console.log("approved")
                   
                }else{
                    this.approved = false;
                    console.log("not approved");
                }
            this.recieveValue = (parseFloat(newval) * parseFloat(this.gdaiRate) / 100).toFixed(2);
            this.recieveValue = this.recieveValue - (this.recieveValue *(1/100));
            if(parseFloat(this.gDaiBalance) >= parseFloat(newval)){
                this.validValues = true;
            }else{
                this.validValues =  false;
            } 

            if(parseFloat(this.recieveValue) <= parseFloat(this.daiReserve)){
                this.validReserves =  true;
            }else{
                this.validReserves =  false;
            }
        }
    
    }
  },
  mounted(){
      this.loading = true;
    setTimeout(()=> {
  if(this.toGdai){
            console.log(parseInt(this.daiAllowance))
            console.log(parseInt(this.swapValue))
              if(parseInt(this.daiAllowance) >= parseInt(this.swapValue)){
                  console.log("approved")
                    this.approved = true;
                }else{
                    console.log("not approved");
                     this.approved = false;
                }
        }else{
             console.log(parseInt(this.gdaiAllowance))
            console.log(parseInt(this.swapValue))
            if(parseInt(this.gdaiAllowance) >= parseInt(this.swapValue)){
                    this.approved = true;
                  console.log("approved")
                   
                }else{
                    this.approved = false;
                    console.log("not approved");
                }
        }
    },2000)
    this.loadReserves();
    this.$store.dispatch("vault/getPriceData" );
    this.$store.dispatch("vault/loadBalances" ).then(()=>{
        this.loading = false;
    });
  },
  methods : {
    setMax(){
    if(this.toGdai){
        this.swapValue = this.DaiBalance;

    }else{
        this.swapValue = this.gDaiBalance;

    }
    },
    flip() {
        this.toGdai = !this.toGdai ; 
        this.swapValue = 0 ; 
        this.recieveValue = 0;
        this.validReserves = true;
        this.validValues = true;

    },
    async approve(){
        if(this.swapValue == ''){
            this.$toast.error("enter a valid swap value");
            return;
        }
      if(this.toGdai){
          if(parseFloat(this.swapValue) > 0 && this.validValues && this.validReserves){
              this.loading = true;
            try {
          await window.daiContract.methods.approve(swapAddress ,window.web3.utils.toBN(window.web3.utils.toWei('1000000000000000'))).send({from: this.user.address});
          this.$toast.success("Dai approval successful");
          this.approved = true;        
          this.loading = false;
      }catch(err){
        console.log(err);
        this.loading = false;
        this.$toast.error("transaction reverted");
      } 
          }else{
            this.$toast.error("error");
          }
      }else{
          if(parseFloat(this.swapValue) > 0 && this.validValues && this.validReserves){
            this.loading = true;
            try {
          await window.tokenContract.methods.approve(swapAddress , window.web3.utils.toBN(window.web3.utils.toWei( this.swapValue))).send({from: this.user.address});
          this.$toast.success("gDai approval successful");
          this.approved = true;        
          this.loading = false;     
      }catch(err){
        this.loading = false;
        console.log(err);
        this.$toast.error("transaction reverted");
      } 
          }else{
            this.$toast.error("error");
          }
      }
    },
    async swap(){
        this.loading = true;
        if(this.toGdai){

            try {
          
          await window.swapContract.methods.swapFrom( window.web3.utils.toBN(window.web3.utils.toWei( this.swapValue))).send({from: this.user.address}); 
          this.$toast.success("Swap successful");
          this.$store.dispatch("vault/getPriceData" );
          this.$store.dispatch("vault/loadBalances" );
          this.loadReserves();
          this.loading = false;
          this.swapValue = 0;
      }catch(err){
        console.log(err);
        this.loading = false;
        this.$toast.error("transaction reverted");
      } 
          }else{
            try {
         await window.swapContract.methods.swapTo( window.web3.utils.toBN(window.web3.utils.toWei( this.swapValue))).send({from: this.user.address}); 
          this.$toast.success("Swap successful");
          this.$store.dispatch("vault/getPriceData" );
          this.$store.dispatch("vault/loadBalances" );
          this.loadReserves();
          this.swapValue = 0;
          this.loading = false;
      }catch(err){
        console.log(err);
        this.loading = false;
        this.$toast.error("transaction reverted");
      } 
          }
           
    },
    async loadReserves(){
        try {

        this.gdaiAllowance = await window.tokenContract.methods.allowance(this.user.address , swapAddress).call();
        this.gdaiAllowance =  window.web3.utils.fromWei(this.gdaiAllowance);  
         this.daiAllowance = await window.daiContract.methods.allowance(this.user.address , swapAddress).call();
        this.daiAllowance =  window.web3.utils.fromWei(this.daiAllowance); 

     
        let reserve = await window.swapContract.methods.getReserves().call();
        let daiRate = await window.swapContract.methods.daiRate().call();
        let gdaiRate = await window.swapContract.methods.ghostdaiRate().call();
        console.log(reserve)
        this.daiRate = daiRate;
        this.gdaiRate = gdaiRate;
        console.log(this.daiRate)
        console.log(this.gdaiRate)
        this.gDaiReserve =  parseFloat(window.web3.utils.fromWei(reserve[0])).toFixed(2);
        this.gDaiReserve =  parseFloat(window.web3.utils.fromWei(reserve[0])).toFixed(2);
        this.daiReserve =   parseFloat(window.web3.utils.fromWei(reserve[1])).toFixed(2);
            
      }catch(err){
        console.log(err);
        
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
      

    
      }
  }
}
</script>