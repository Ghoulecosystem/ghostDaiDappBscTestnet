<template> 
    <v-dialog
    persistent
    v-model="borrowDialog"
    width="500"
  >
    

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
       Borrow Token
      </v-card-title>

      <v-text-field
      v-model="borrowAmount"
      color = "black"
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
          color="primary"
          text
          @click="borrowToken"
        >
          Borrow
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
                borrowAmount: 0   
            }
        },
        computed : {
            borrowDialog : function(){
                return this.$store.state.vault.borrowDialog;
            },
            user : function(){
                return this.$store.state.currentUser.user;
            },
        },
        methods : {
         async   borrowToken(){
                this.$store.dispatch("loading/activateLoader" , true)
        try {     
                 await window.tokenContract.methods.borrowToken(this.id ,window.web3.utils.toBN(window.web3.utils.toWei( this.borrowAmount)) ).send({from: this.user.address});
                 this.$toast.success("Token Borrowed successfully");
             
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
                this.$store.dispatch("vault/borrowDialog" , false);  
            }
        },
        mounted(){

        }
    }
</script>