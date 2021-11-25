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
    <wethvault v-if="user.address && chainID == '97'"></wethvault>
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
<!-- <div  v-if="user.address">
<vault></vault>
<h6 style="text-align: center;padding-top: 30px;">Liquidate undercollateralized vaults in the <span style="color:blue; cursor: pointer;" @click="openMonitor"> vault monitor!</span></h6>
</div>
<div v-else class="alert alert-warninng "><h4 style="text-align:center; color : white">Please connect your wallet </h4></div> -->
</div>
</template>
<script>
    export default {
        data() {
            return {
               
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
        
            openMonitor(){
                this.$router.push({ path: "/monitor" })
            }
        },
        mounted(){
            
        }
    }
</script>