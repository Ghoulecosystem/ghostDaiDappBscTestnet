<template> 
    <v-dialog
    v-model="rapayDialog"
    persistent
    width="500"
  >
    

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
       Repay Token
      </v-card-title>

      <v-text-field
      v-model="repayAmount"
      label="Token Amount"
      type="number"
      required
    ></v-text-field>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="close"
        >
          cancel
        </v-btn>
        <v-btn
          v-if="approve"
          color="primary"
          text
          @click="approveToken"
        >
          Approve
        </v-btn>
        <v-btn
          v-else
          color="primary"
          text
          @click="repayToken"
        >
          Repay
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
 import  {tokenAddress } from "../store/modules/abi";
    export default {
        props: ['id'],
        data(){
            return {
                approve : true,
                repayAmount: 0   
            }
        },
        computed : {
            rapayDialog : function(){
                return this.$store.state.vault.rapayDialog;
            },
            user : function(){
                return this.$store.state.currentUser.user;
            },
        },
        methods : {
             async   approveToken(){
                this.$store.dispatch("loading/activateLoader" , true)
        try {     
                 await window.tokenContract.methods.approve(tokenAddress , window.web3.utils.toBN(window.web3.utils.toWei( this.repayAmount))).send({from: this.user.address});
                 this.$toast.success("Token Approved successfully");
             
                    this.$store.dispatch("loading/activateLoader" , false);
                    this.$store.dispatch("vault/loadVault" , this.id);
                    this.approve = false;
             }
            catch(error){
                this.$toast.error("error approving token"); 
                console.log(error);
                 this.$store.dispatch("loading/activateLoader" , false)
            } 
            },
         async   repayToken(){
                this.$store.dispatch("loading/activateLoader" , true)
        try {     
                 await window.tokenContract.methods.payBackToken(this.id ,window.web3.utils.toBN(window.web3.utils.toWei( this.repayAmount))).send({from: this.user.address});
                 this.$toast.success("Token Repayed successfully");
             
                    this.$store.dispatch("loading/activateLoader" , false);
                    this.$store.dispatch("vault/loadVault" , this.id);
                    this.approve = true;
                    this.close();
             }
            catch(error){
                
                 this.$toast.error("Transaction Reverted."); 
                console.log(JSON.parse(error));
                
                 this.$store.dispatch("loading/activateLoader" , false)
            } 
            },
            close(){
                this.$store.dispatch("vault/rapayDialog" , false);  
            }
        },
        mounted(){

        }
    }
</script>