<template> 
    <v-dialog
    persistent
    v-model="depositDialog"
    width="500"
  >
    

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
       Deposit Collateral
      </v-card-title>

      <v-text-field
      style="color: black"
      v-model="depositAmount"
      label="Deposit Amount"
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
          color="primary"
          text
          @click="deposit"
        >
          Deposit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

    export default {
        props: ['id'],
        data(){
            return {
                depositAmount: 0   
            }
        },
        computed : {
            depositDialog : function(){
                return this.$store.state.vault.depositDialog;
            },
            user : function(){
                return this.$store.state.currentUser.user;
            },
        },
        methods : {
         async   deposit(){
                this.$store.dispatch("loading/activateLoader" , true)
        try {     
                 await window.tokenContract.methods.depositCollateral(this.id).send({from: this.user.address , value : window.web3.utils.toBN(window.web3.utils.toWei(this.depositAmount))});
                 this.$toast.success("Collatoral Deposited successfully");
             
                    this.$store.dispatch("loading/activateLoader" , false);
                    this.$store.dispatch("vault/loadVault" , this.id);
                    this.close();
             }
            catch(error){
              this.$toast.error("Transaction Reverted.");
                 this.$store.dispatch("loading/activateLoader" , false)
            } 
            },
            close(){
                this.$store.dispatch("vault/depositDialog" , false);  
            }
        },
        mounted(){

        }
    }
</script>