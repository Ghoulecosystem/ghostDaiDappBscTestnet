<template>
  <div>
    <topmenu></topmenu>
    
    <div  v-if="user.address">
        <farmapp></farmapp>
        </div>
        <div v-else class="alert alert-warninng "><h4 style="text-align:center; color : white">Please connect your wallet </h4></div>
        </div>
    <!-- <div  v-if="user.address">
    <vault></vault>
    <h6 style="text-align: center;padding-top: 30px;">Liquidate undercollateralized vaults in the <span style="color:blue; cursor: pointer;" @click="openMonitor"> vault monitor!</span></h6>
    </div>
    <div v-else class="alert alert-warninng "><h4 style="text-align:center; color : white">Please connect your wallet </h4></div> -->
    
    </template>

    <script>
        
    export default {
        data(){
         return {
             guollogo :  require('@/assets/logog1.png'),
         }
        },
        computed: {
        user : function(){
        return this.$store.state.currentUser.user;
       },
        },
  
        mounted() {
            
        },
        methods :{
        }
    }
    </script>