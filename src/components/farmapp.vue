<template>
    <div>
        <div class="loader overlay"  v-show="pageloading" style="margin-bottom : 100px">
          <img :src="logo" class="rotate" width="100" height="100" />
          </div>
         <div class="flex flex-col flex-1 items-center justify-start w-screen overflow-y-auto overflow-x-hidden z-0 pt-4 sm:pt-8 px-4 md:pt-10 pb-20">
        <div class="sc-gwVKww sc-daURTG gBShpO">
    
        </div>
        <div height="0" class="sc-cQFLBn cThFpX">
            <div class="sc-gojNiO qxEgk"></div>
        </div>
       
    <div class="absolute top-100 right-0 left-50 overflow-hidden" style="z-index: -1;"></div>
    
    <div class="container max-w-3xl mx-auto px-4 md:px-0">
         
        <div  class="relative bg-dm-tertiary" style="border-radius: 10px; background-image: url(&quot;&quot;); background-repeat: no-repeat; background-size: contain; background-position: center bottom;">
            <div>
               <div class="flex justify-between items-center bg-dm-secondary flex items-center rounded-t px-4 sm:px-8 py-4 sm:py-6">
            <h2 class="mr-4">Reward Instruments</h2>
          
        </div>
        <div class="px-2 py-4 sm:p-8">
         <div class="flex flex-col space-y-2">
            <div class="grid grid-cols-3 px-4">
            <span class="text-secondary">Instrument</span>
            <span class="text-secondary text-right">Pool Stats</span>
            <span class="text-secondary text-right">Your Stats</span>
            
           </div>
          
        <div class="flex flex-col rounded-lg bg-dm-secondary" style="color : white !important" v-for="(pool , count) in pools" :key="count">
            <button class="grid grid-cols-3 gap-4 p-4" @click="expand(count)">
                <div class="col-span-1 flex flex-row items-center">
                    <!-- <img class="sc-cpmLhU epnnMu" src="/static/media/USDC-MAI.46fd8cd3.svg" style="box-shadow: unset;"> -->
                    <span class="text-left overflow-ellipsis overflow-hidden ml-4">{{pool.lpName}} ({{pool.lpSymbol}})</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-right col-span-1">{{pool.depositFeeBP}}%<span class="text-sm opacity-80"> Deposit Fee</span></span>
                    <span class="text-right col-span-1">{{pool.pullAllocationPercentage}}%<span class="text-sm opacity-80"> Pool Allocation</span></span>
                    <!-- <span class="text-right col-span-1">$19,557,067.779 <span class="text-sm opacity-80">TVL</span></span> -->
                </div>
                <div class="flex flex-col">
                    <span class="text-right col-span-1">{{pool.deposited}} {{pool.lpSymbol}} <span class="text-sm opacity-80">STAKED</span></span>
                    <span class="text-right col-span-1">{{pool.pending}} GhoulX <span class="text-sm opacity-80">EARNED</span></span>
                </div>
            </button>
            <div class="flex flex-col md:flex-row" v-if="show && showValue == count">
                <div class="rounded-lg p-4 flex flex-col ">
                <div class="text-center p-4"><div class="mb-2">
                        <!-- <h2 class="text-sm opacity-50 mb-2">$0</h2> -->
                        <h1 class="text-2xl font-bold text-white text-center">{{pool.deposited}} </h1>
                    </div>
                    <h2 class="flex justify-center">
                        <img :src="guollogo" style="width: 24px; height: 24px;">
                        <span class="ml-2">{{pool.lpSymbol}} Deposited </span>
                    </h2>
                    <h2> <span class="text-right col-span-1">{{pool.pending}} GhoulX <span class="text-sm opacity-80">EARNED</span></span></h2>
                    <br><br>
                </div>
                 <div class="flex items-center relative w-full mb-4">
                    <input inputmode="decimal" v-model="withDrawAmount" title="Token Amount" autocomplete="off" autocorrect="off" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" min="0" minlength="1" maxlength="79" spellcheck="false" class="sc-fhYwyz gehgmm text-gray-900 w-full p-3 bg-input rounded focus:ring focus:ring-dm-gray" value="">
                    <button class="bg-transparent px-2 py-1 flex flex-row items-center justify-center rounded focus:outline-none focus:ring absolute right-4 focus:ring text-xs bg-dm-primary focus:ring-offset-dm-gray opacity-100 disabled:pointer-events-none disabled:opacity-10" style="color: white"  @click="withDrawAmount = pool.deposited">MAX</button>
                </div>   
               
                <button style="background : #209719 ; height: 5px !important;"  class=" bg-opacity-80 w-full rounded text-base disabled:opacity-40 p-1 flex flex-row items-center justify-center rounded focus:outline-none focus:ring  opacity-100 disabled:pointer-events-none disabled:opacity-10" @click="withdraw(pool.id)">Withdraw
                </button>
            </div>
            <div class="rounded-lg p-4 flex flex-col">
                <div class="flex text-center p-4 pb-0 flex-grow center justify-center">
                    <div>
                    <div class="mb-2">
                        <!-- <h2 class="text-sm opacity-50 mb-2">$0</h2> -->
                        <h1 class="text-2xl font-bold text-white text-center ">{{pool.lpBalance}}</h1>
                    </div>
                    <h2 class="flex justify-center">
                        <!-- <img class="sc-cpmLhU epnnMu" src="/static/media/USDC-MAI.46fd8cd3.svg" style="box-shadow: unset;"> -->
                        <span class="ml-2">{{pool.lpName}} ({{pool.lpSymbol}}) Balance</span>
                    </h2>
                    <a target="_blank" rel="noopener noreferrer" :href="'https://app.uniswap.org/#/add/v2/'+  pool.lpToken + '/0xd0A1E359811322d97991E03f863a0C30C2cF029C'" class="text-baseline text-primary hover:text-white focus:text-white p-2 md:p-3 text-white mt-4">
                        <button class="bg-dm-gray bg-opacity-80 w-full rounded text-base disabled:opacity-40 px-2 py-1 flex flex-row items-center justify-center rounded focus:outline-none focus:ring text-white opacity-100 disabled:pointer-events-none disabled:opacity-10">Get LP Token<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        </button>
                    </a>
                </div>
            </div>
           <div class="flex items-center relative w-full mb-4">
                    <input inputmode="decimal" v-model="depositAmount" title="Token Amount" autocomplete="off" autocorrect="off" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" min="0" minlength="1" maxlength="79" spellcheck="false" class="sc-fhYwyz gehgmm text-gray-900 w-full p-3 bg-input rounded focus:ring focus:ring-dm-gray" value="">
                    <button class="bg-transparent px-2 py-1 flex flex-row items-center justify-center rounded focus:outline-none focus:ring absolute right-4 focus:ring text-xs bg-dm-primary focus:ring-offset-dm-gray opacity-100 disabled:pointer-events-none disabled:opacity-10" style="color: white" @click="depositAmount = pool.lpBalance" >MAX</button>
                
                </div>   
               
            <div  class="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0 items-center">
                <button  v-if="!approved" style="margin-top: 20px; background : #f87171"  class=" bg-opacity-80 w-full rounded text-base disabled:opacity-40 p-3 flex flex-row items-center justify-center rounded focus:outline-none focus:ring  opacity-100 disabled:pointer-events-none disabled:opacity-10" @click="approveLP(pool.lpToken)">Approve
                </button>
                <button v-else style="margin-top: 20px;background : #209719" class=" bg-opacity-80 w-full rounded text-base disabled:opacity-40 p-3 flex flex-row items-center justify-center rounded focus:outline-none focus:ring  opacity-100 disabled:pointer-events-none disabled:opacity-10" @click="deposit(pool.id)">Deposit
                </button>
            </div>
        </div>
    </div>
    </div>
    <div v-if="loading">
        <h4 style="text-align : center">loading...</h4>
    </div>
      <div v-if="!loading && pools.length == 0">
        <h4 style="text-align : center">No Pools</h4>
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
        import  {lpAbi, farmAddress } from "../store/modules/abi";
    export default {
        data(){
         return {
             approved: false,
             withDrawAmount : 0,
             depositAmount : 0,
             logo : require('@/assets/loogo.png'),
             pageloading : false,
             loading: true,
             show : false,
             showValue : 0,
             pools : [],
             guollogo :  require('@/assets/logog1.png'),
         }
        },
        computed: {
        user : function(){
        return this.$store.state.currentUser.user;
       },
        },
        watch : {
            user : function(newuser){
                console.log(newuser);
                this.loadFarm()
            }
        },
        mounted() {
            if(this.user.address){
               setTimeout(() => {
                this.loadFarm();
               },2000)

            }
        },
        methods :{
        async approveLP(lpToken){
            try{
              this.pageloading = true;
                 let lp =  await new window.web3.eth.Contract( lpAbi , lpToken);
                 await lp.methods.approve(farmAddress ,window.web3.utils.toBN(window.web3.utils.toWei( this.depositAmount))).send({ from : this.user.address}); 
                 this.$toast.success("Approval Successful");
                 this.approved = true;
              this.pageloading = false;

            }catch(err){
              this.pageloading = false;
                 this.$toast.error("Transaction Reverted");
                console.log(err);
            }
        },
            async deposit(id){
                console.log(id)
            console.log(parseFloat(this.depositAmount))
            if(!(parseFloat(this.depositAmount) > 0)){
                 this.$toast.error("Enter Valid Amount");
                 return;
            }
            try{
              this.pageloading = true;
                 await window.farmContract.methods.deposit(id ,window.web3.utils.toBN(window.web3.utils.toWei( this.depositAmount))).send({ from : this.user.address}); 
                 this.$toast.success("Deposit Successful");
                 this.loadFarm();
              this.pageloading = false;

            }catch(err){
              this.pageloading = false;
                 this.$toast.error("Transaction Reverted");
                console.log(err);
            }
        },
        async withdraw(id){
            console.log(parseFloat(this.withDrawAmount))
            if(!(parseFloat(this.withDrawAmount) > 0)){
                 this.$toast.error("Enter Valid Amount");
                 return;
            }
            try{
              this.pageloading = true;
                 await window.farmContract.methods.withdraw(id ,window.web3.utils.toBN(window.web3.utils.toWei( this.withDrawAmount))).send({ from : this.user.address}); 
                 this.$toast.success("Deposit Successful");
                this.loadFarm(); 
              this.pageloading = false;

            }catch(err){
              this.pageloading = false;
                 this.$toast.error("Transaction Reverted");
                console.log(err);
            }
        },
        expand(value){
            console.log(value)
         if(this.showValue == value){
             this.show = !this.show;
         }
         this.showValue = value;
        },
         async loadFarm(){
            try {   
                this.loading = true;
                 let poolLength = await window.farmContract.methods.poolLength().call();
                 console.log(poolLength)
                 this.pools =[];
                 for(let i = 0; i < poolLength ; i++){
                     let info = {};
                  let poolInfo =   await window.farmContract.methods.poolInfo(i).call();
                  console.log(poolInfo);
                  info.id = i;
                   info.deposited =  await window.farmContract.methods.deposited(i , this.user.address).call();
                   info.deposited  = parseFloat(window.web3.utils.fromWei(info.deposited)).toFixed(2);

                   info.pending =  await window.farmContract.methods.pending(i , this.user.address).call();
                   let userinfo =  await window.farmContract.methods.userInfo(i , this.user.address).call();
                   info.amount = userinfo[0];
                   info.rewardDept = userinfo[1];
                   info.lpToken = poolInfo[0];
                   info.allocPoint = poolInfo[1];
                   info.lastRewardBlock = poolInfo[2];
                   info.accERC20PerShare = poolInfo[3];
                   info.depositFeeBP = poolInfo[4];
                   info.depositFeeBP = parseInt(info.depositFeeBP) / 100;
                    let totalAllocation =  await window.farmContract.methods.totalAllocPoint().call();
                    info.pullAllocationPercentage = parseInt(parseInt(info.allocPoint) / parseInt(totalAllocation) * 100);
                   let lp =  await new window.web3.eth.Contract( lpAbi , info.lpToken);
                   info.lpName = await lp.methods.name().call();
                   info.lpSymbol = await lp.methods.symbol().call();
                   info.lpBalance = await lp.methods.balanceOf(this.user.address).call(); 
                   info.lpBalance  = parseFloat(window.web3.utils.fromWei(info.lpBalance )).toFixed(2);
                   console.log(info)
                    this.pools.push(info);     
                 }
                this.loading = false;

             }
            catch(error){
                console.log(error);
                this.loading = false;
            }  
         }  
        },
    }
    </script>