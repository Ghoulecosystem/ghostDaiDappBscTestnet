<template> 
    <v-dialog
    persistent
    v-model="withdrawDialog"
    width="500"
  >
    

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
       Withdraw Collateral   <span style="color:blue ; margin-left: 50px ;cursor: pointer" @click="setMax"> Max</span>
      </v-card-title>

      <v-text-field
      v-model="withdrawAmount"
      label="Withdraw Amount"
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
          @click="withdraw"
        >
          withdraw
        </v-btn>
        
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

    export default {
        props: ['id' , 'colateral'],
        data(){
            return {
                withdrawAmount: 0   
            }
        },
        computed : {
            withdrawDialog : function(){
                return this.$store.state.vault.withdrawDialog;
            },
            user : function(){
                return this.$store.state.currentUser.user;
            },
        },
        methods : {
          setMax(){
            console.log(this.colateral)
            this.withdrawAmount = this.colateral;
          },
         async   withdraw(){
                this.$store.dispatch("loading/activateLoader" , true)
        try {     
                 await window.tokenContract.methods.withdrawCollateral(this.id ,  window.web3.utils.toBN(window.web3.utils.toWei(this.withdrawAmount))).send({from: this.user.address });
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
                this.$store.dispatch("vault/withdrawDialog" , false);  
            }
        },
        mounted(){

        }
    }
</script>