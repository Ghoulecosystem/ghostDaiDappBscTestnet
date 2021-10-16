<template> 
    <v-dialog
    persistent
    v-model="transferVaultDialog"
    width="500"
  >
    

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
       Transfer Vault
      </v-card-title>

      <v-text-field
      v-model="address"
      label="Recipient Address"
      type="text"
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
          @click="transferVault"
        >
          Transfer
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
                address: ""   
            }
        },
        computed : {
            bnbprice : function(){
            return this.$store.state.constant.bnbprice;
            },
            gDaiPrice : function(){
            return this.$store.state.constant.gDaiPrice;
            },
            transferVaultDialog : function(){
                return this.$store.state.vault.transferVaultDialog;
            },
            user : function(){
                return this.$store.state.currentUser.user;
            },
        },
        methods : {
         async   transferVault(){
                this.$store.dispatch("loading/activateLoader" , true)
        try {     
                 await window.tokenContract.methods.transferVault(this.id , this.address).send({from: this.user.address});
                 this.$toast.success("vault Transferred successfully");
             
                    this.$store.dispatch("loading/activateLoader" , false);
                    this.$store.dispatch("vault/loadVault" , this.id);
                    this.close();
             }
            catch(error){
                this.$toast.error("Transaction Reverted."); 
                // console.log(JSON.parse(error.message.split('Transaction has been reverted by the EVM:')[1]));
                
                 this.$store.dispatch("loading/activateLoader" , false)
            } 
            },
            close(){
                this.$store.dispatch("vault/transferVaultDialog" , false);  
            }
        },
        mounted(){

        }
    }
</script>