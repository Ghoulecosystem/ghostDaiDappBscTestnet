<template>
 <div class="flex flex-row flex-nowrap justify-between w-screen">
                <nav class="w-screen bg-transparent gradiant-border-bottom z-10">
                    <div class="px-4 py-1.5">
                      <div class="flex items-center justify-between h-16">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 text-gray-900">
                            <img :src="logo"  alt="gDai Dao" class="stroke-current h-10 w-auto">
                        </div>
                        <div class="hidden sm:block sm:ml-4">
                          <div class="flex space-x-2">
                            <router-link class="text-baseline text-primary p-2 md:p-3 hover:text-white focus:text-white text-white" to="/" id="vaults-nav-link" aria-current="page" style="font-size: 18px;" >Vaults</router-link>
                            <router-link class="text-baseline text-primary p-2 md:p-3 hover:text-white focus:text-white" to="/swap" id="swap-nav-link" style="font-size: 18px;">Swap</router-link>
                            <router-link class="text-baseline text-primary p-2 md:p-3 hover:text-white focus:text-white" to="/farm" id="swap-nav-link" style="font-size: 18px;">Farm</router-link>
                            <router-link class="text-baseline text-primary p-2 md:p-3 hover:text-white focus:text-white" to="/prifi" id="swap-nav-link" style="font-size: 18px;">PRIFI</router-link>
                            <!-- <a class="text-baseline text-primary p-2 md:p-3 hover:text-white focus:text-white" href="https://kovan.ghoul.finance/" id="swap-nav-link" style="font-size: 18px;">Testnet</a> -->
                            <a class="text-baseline text-primary p-2 md:p-3 hover:text-white focus:text-white" href="https://voice.aragon.org/tokens/info/#/0x3bb86d867a9f3addf994cdadb210fa82f0d4157a" id="swap-nav-link" style="font-size: 18px;" target="_blank">Govern</a>
                          
                            
                          </div>
                        </div>
                    
                   </div>
                <div class="flex flex-row items-center justify-center p-4 fixed left-0 bottom-0 bg-transparent lr:relative lr:p-0 lr:bg-transparent">
                    <div class="flex items-center justify-between sm:justify-end space-x-2 w-full">
                        
                      <div class="hidden md:inline-block">
                        <button class="flex items-center rounded bg-dm-tertiary whitespace-nowrap text-sm font-bold select-none">
                          <img :src="ethlogo"   class="rounded-md mr-2" style="width: 22px; height: 22px;margin-left: 3px;">
                          <div style="margin-right: 10px;" class="grid grid-flow-col  items-center rounded-lg text-sm text-dm-text-primary py-2  pointer-events-auto">
                                ${{parseFloat(ethPrice).toFixed(4)}}
                            </div>
                        </button>
                    </div>
                    <div class="hidden md:inline-block">
                      <button class="flex items-center rounded bg-dm-tertiary whitespace-nowrap text-sm font-bold select-none">
                        <img :src="logo" class="rounded-md mr-2" style="width: 22px; height: 22px;margin-left: 3px;">
                        <div style="margin-right: 10px;" class="grid grid-flow-col  items-center rounded-lg text-sm text-dm-text-primary py-2  pointer-events-auto">
                              ${{gDaiPrice}}
                          </div>
                          
                      </button>
                  </div>    
                        <div  v-if="user.address" class="hidden md:inline-block">
                          <button class="flex items-center rounded bg-dm-tertiary whitespace-nowrap text-sm font-bold select-none">
                            <img :src="guollogo" class="rounded-md mr-2" style="width: 25px; height: 25px;margin-left: 3px;">
                            <div style="margin-right: 10px;" class="grid grid-flow-col  items-center rounded-lg text-sm text-dm-text-primary py-2  pointer-events-auto">
                                  {{parseFloat(goulBalance).toFixed(2)}} GHOUL
                              </div>
                            <img style="margin-right: 10px;" src="@/assets/meta.png" alt="Add to metamask" class=" w-4 h-4" @click="addGoulToMetaMask()" data-toggle="tooltip" data-placement="bottom" title="Add GHOUL To Metamask">

                              
                          </button>
                      </div>
                 
                        <div  v-if="user.address">
                            <button class="flex items-center rounded bg-dm-tertiary whitespace-nowrap text-sm font-bold select-none">
                              <img :src="logo" class="rounded-md mr-2" style="width: 22px; height: 22px;margin-left: 3px;">
                              <div class="grid grid-flow-col auto-cols-max items-center rounded-lg text-sm text-dm-text-primary py-2 pointer-events-auto">
                                   {{gDaiBalance}} gDai
                                </div>
                                <img style="margin-right: 10px;" src="@/assets/meta.png" alt="Add to metamask" class="ml-2 w-4 h-4 "  @click="addGdaiToMetaMask()" data-toggle="tooltip" data-placement="bottom" title="Add gDai To Metamask">
                            </button>
                        </div>
                        <div  v-if="user.address">
                          <button class="flex items-center rounded bg-dm-tertiary whitespace-nowrap text-sm font-bold select-none">
                          <img :src="ethlogo"   class="rounded-md mr-2" style="width: 22px; height: 22px;margin-left: 3px;">
                            <div style="margin-right: 10px;"  class="grid grid-flow-col auto-cols-max items-center rounded-lg text-sm text-dm-text-primary py-2  pointer-events-auto">
                                  {{ethBalance}} BNB
                              </div>
                          </button>
                      </div>
                      <div  v-if="user.id" >
                        <button v-if="validNetwork" style="margin-right: 20px;" @click="dialog = true" class="flex items-center rounded  bg-pink-deeper whitespace-nowrap text-sm font-bold select-none">
                            <div  class="grid grid-flow-col auto-cols-max items-center rounded-lg text-sm  py-2  px-3 pointer-events-auto">
                              {{addressFormated}}
                            </div>
                        </button>
                        <button v-else  @click="dialog = true" class="flex items-center rounded  bg-pink-deeper whitespace-nowrap text-sm font-bold select-none">
                          <div class="grid grid-flow-col auto-cols-max items-center rounded-lg text-sm  py-2  px-3 pointer-events-auto">
                            Wrong Network!
                          </div>
                      </button>
                    </div>
                    <div v-if="!user.id" class="" >
                      <button  @click="onConnect()" class="flex items-center rounded  bg-pink-deeper whitespace-nowrap text-sm font-bold select-none">
                          <div class="grid grid-flow-col auto-cols-max items-center rounded-lg text-sm  py-2 px-3 pointer-events-auto" >
                            connect wallet
                          </div>
                      </button>

                  </div>
                  <button style="margin-right: 2opx !important" @click="MoreOption" class="text-secondary focus:outline-none" id="headlessui-popover-button-1" type="button" aria-expanded="true" aria-controls="headlessui-popover-panel-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-600 inline-flex items-center mr-3 h-5 w-5 group-hover:text-secondary hover:text-high-emphesis" aria-hidden="true"><title>More</title><path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  </button>
                        <!-- <div class="w-auto flex items-center rounded bg-dm-tertiary whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
                         
                          <div id="web3-status-connected" class="flex items-center rounded-lg bg-pink-deeper text-sm text-white py-2 px-3">
                              <div class="mr-2">Connect Wallet</div>
                          </div>
                      </div> -->
                        <!-- <div class="relative">
                            <button class="text-primary "  @click="console.log('here o')">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-400 inline-flex items-center ml-2 h-5 w-5 group-hover:text-secondary hover:text-high-emphesis" aria-hidden="true"><title>More</title><path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </button>
                        </div> -->
                    </div>
                </div>
              
             
            </div>
            <div class="relative" v-if="showmore">
            

        <div class="absolute z-10 bottom-12 md:top-12 left-full transform -translate-x-full mt-3 px-2 w-screen max-w-xs sm:px-0" id="headlessui-popover-panel-2">
        <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div class="relative grid gap-6 bg-pink-deeper px-5 py-6 sm:gap-8 sm:p-8">
        <a target="_blank" rel="noopener noreferrer" href="https://docs.ghoul.finance" class="text-baseline text-primary hover:text-white focus:text-white p-2 md:p-3 -m-3 p-3 block rounded-md hover:bg-pink-deep group-hover transition ease-in-out duration-150">
          <p class="text-base font-medium text-white flex flex-row ">Docs</p>
          <p class="mt-1 text-sm text-white opacity-60">Get to know the insides of Ghoul.finance</p>
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://poltergeistlabs.medium.com" class="text-baseline text-primary hover:text-white focus:text-white p-2 md:p-3 -m-3 p-3 block rounded-md hover:bg-pink-deep group-hover transition ease-in-out duration-150">
          <p class="text-base font-medium text-white flex flex-row ">Medium</p>
          <p class="mt-1 text-sm text-white opacity-60">Visit our Medium Page</p>
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/poltergeistlabs" class="text-baseline text-primary hover:text-white focus:text-white p-2 md:p-3 -m-3 p-3 block rounded-md hover:bg-pink-deep group-hover transition ease-in-out duration-150">
          <p class="text-base font-medium text-white flex flex-row ">Twitter</p>
          <p class="mt-1 text-sm text-white opacity-60">Visit our Twitter Page</p>
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://t.me/poltergeistlabs" class="text-baseline text-primary hover:text-white focus:text-white p-2 md:p-3 -m-3 p-3 block rounded-md hover:bg-pink-deep group-hover transition ease-in-out duration-150">
          <p class="text-base font-medium text-white flex flex-row ">Telegram</p>
          <p class="mt-1 text-sm text-white opacity-60">Visit our Telegram Page</p>
        </a>
        
        </div>
      </div>
        </div>
        </div>
        </div>
        <div  id="headlessui-disclosure-panel-4" v-if="menu">
          <div class="flex flex-col px-4 pt-2 pb-3 space-y-1">
            <router-link class="text-baseline text-primary p-2 md:p-3 hover:text-white focus:text-white text-white" to="/" id="vaults-nav-link" aria-current="page" style="font-size: 18px;" >Vaults</router-link>
            <router-link class="text-baseline text-primary p-2 md:p-3 hover:text-white focus:text-white" to="/swap" id="swap-nav-link" style="font-size: 18px;">Swap</router-link>
            <router-link class="text-baseline text-primary p-2 md:p-3 hover:text-white focus:text-white" to="/farm" id="swap-nav-link" style="font-size: 18px;">Farm</router-link>
            <router-link class="text-baseline text-primary p-2 md:p-3 hover:text-white focus:text-white" to="/prifi" id="swap-nav-link" style="font-size: 18px;">PRIFI</router-link>
            <a class="text-baseline text-primary p-2 md:p-3 hover:text-white focus:text-white" href="https://voice.aragon.org/tokens/info/#/0x3bb86d867a9f3addf994cdadb210fa82f0d4157a" id="swap-nav-link" style="font-size: 18px;" target="_blank">Govern</a>
            </div>
          </div>
    </nav>
    <v-dialog
        v-model="dialog"
        width="500"
        >
        <v-card>
   


<v-card-text>
  Current Chain
 </v-card-text>
 <v-divider></v-divider>
 <v-card-text>
   Chain ID : {{chainId}}
 </v-card-text>
 <v-card-text>
  Chain Name : {{chainName}}
</v-card-text>

<v-divider></v-divider>
        <v-card-text>

         Do you want to logout?
        </v-card-text>

        

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            color="warning"
            text
            @click="onDisconnect()"
          >
            logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
<!-- <nav class="navbar navbar-expand-lg  bg-dark" >
        <div class="container-fluid">
            <img :src="logo" alt="" width="3%" class="m-1" style="border-radius: 10px;">
          <a class="navbar-brand" href="#"></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
              <router-link to="/"  class="nav-link active nav-white">Vault</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link nav-white" href="#" >Swap</a>
              </li>
              
            
            </ul>
            <div class="d-flex">
             <button class="nav-button"  ><span style="margin-right: 0; color: white; padding: 6px; padding-left:12px; padding-right:14px">${{bnbprice}}</span><img src="@/assets/meta.png" height="20px" style="margin-top: 10px;margin-left: 0;; padding-right:12px" alt=""></button >
            <button class="nav-button"  ><img :src="logo"  height="20px" style="border-radius: 20px; margin-top: 10px;margin-left: 0; padding-left:12px" alt=""><span style="margin-right: 0; color: white; padding: 8px;">${{gDaiPrice}}</span></button >
              <div v-if="user.id" class="flex items-center rounded-lg bg-pink-deeper text-sm text-white py-2 px-3 connect-button" >
                 <div class="mr-2" @click="dialog = true">{{addressFormated}}</div>
             </div> 
             <button v-if="!user.id"  class="flex items-center rounded-lg bg-pink-deeper text-sm text-white py-2 px-3 connect-button" >
                <div class="mr-2" style="color: orangered;" @click="login()">connect wallet
            </div></button>
            </div>
          </div>
        </div>
        
      </nav> -->
</template>
<script>
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;
// Web3modal instance
let web3Modal
import{tokenAbi , tokenAddress ,guolAbi , guolAddress , daiAbi, daiAddress , swapAbi,swapAddress ,farmAbi , farmAddress } from "../store/modules/abi.js"
var Web3 = require('web3');
// Chosen wallet provider given by the dialog window
let provider;

const axios = require("axios");

// Address of the selected account
let selectedAccount;
export default {

  data(){
      return {
        menu : false,
        dialog : false,
        guollogo :  require('@/assets/logog1.png'),
        ethlogo :  require('@/assets/bnblogo.png'),
          logo : require('@/assets/loogo.png'),
         chainName : "",
         chainId: 0 ,
         showmore : false
      }
  },
   computed: {
    validNetwork : function(){
      if(this.chainID == '97'){
        return true;
      }else{
        return false;
      }
    },
    chainID : function(){
      return this.$store.state.vault.chainID;
    },
    goulBalance : function(){
      return this.$store.state.vault.goulBalance;
    },
     ethPrice : function(){
    return this.$store.state.vault.ethPrice;
    },
    gDaiPrice : function(){

    return this.$store.state.vault.gDaiPrice;
    },
    gDaiBalance : function(){
    return this.$store.state.vault.gdaiBalance;
    },
    ethBalance : function(){
    return this.$store.state.vault.EthBalance;
    },
    user : function(){
     return this.$store.state.currentUser.user;
   },
    addressFormated : function(){
     if(!this.user.address) return "No Address";
     
     return this.user.address.substring(0 ,6) + "...." + this.user.address.substring(this.user.address.length -4 ,this.user.address.length)
   },
    },
  mounted(){
    this.init();
    
    if(!this.user.address){
      this.onConnect();
    }
    if(!this.chainId != '97');
  },
  methods : {
    MoreOption(){
      this.showmore =  !this.showmore;
    },
    openMenu(){
    this.menu = !this.menu;
    },
    async  addGoulToMetaMask(){
const tokenAddress = guolAddress;
const tokenSymbol = 'GHOUL';
const tokenDecimals = 18;
const tokenImage = '';

try {
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  const wasAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address: tokenAddress, // The address that the token is at.
        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals: tokenDecimals, // The number of decimals in the token
        image: tokenImage, // A string url of the token logo
      },
    },
  });

  if (wasAdded) {
    console.log('Thanks for your interest!');
  } else {
    console.log('Your loss!');
  }
} catch (error) {
  console.log(error);
}
    },   
async  addGdaiToMetaMask(){
const tokenAddress = tokenAddress;
const tokenSymbol = 'gDai';
const tokenDecimals = 18;
const tokenImage = '';

try {
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  const wasAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address: tokenAddress, // The address that the token is at.
        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals: tokenDecimals, // The number of decimals in the token
        image: tokenImage, // A string url of the token logo
      },
    },
  });

  if (wasAdded) {
    console.log('Thanks for your interest!');
  } else {
    console.log('Your loss!');
  }
} catch (error) {
  console.log(error);
}
    },
    async init() {
      console.log("Initializing example");
        console.log("WalletConnectProvider is", WalletConnectProvider);
        console.log("Fortmatic is", Fortmatic);
        console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);
        
        // Check that the web page is run in a secure context,
        // as otherwise MetaMask won't be available
        // if(location.protocol !== 'https:') {
        //   // https://ethereum.stackexchange.com/a/62217/620
        //   const alert = document.querySelector("#alert-error-https");
        //   alert.style.display = "block";
        //   document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
        //   return;
        // }

        // Tell Web3modal what providers we have available.
        // Built-in web browser provider (only one can exist as a time)
        // like MetaMask, Brave or Opera is added automatically by Web3modal
        const providerOptions = {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              // Mikko's test key - don't copy as your mileage may vary
              infuraId: "d2ae878adfc8418fb4f4d73eefa31332",
            }
          },

         
        };

        web3Modal = new Web3Modal({
          cacheProvider: false, // optional
          providerOptions, // required
          disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
        });

        console.log("Web3Modal instance is", web3Modal);
    },
    async onConnect() {

  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
     

     
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    console.log(accounts);
    this.fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    console.log(chainId);
    this.fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    console.log(networkId);
    this.fetchAccountData();
  });

  await this.refreshAccountData();
},
async  refreshAccountData() {

  // If any current data is displayed when
  // the user is switching acounts in the wallet
  // immediate hide this data
  // document.querySelector("#connected").style.display = "none";
  // document.querySelector("#prepare").style.display = "block";

  // Disable button while UI is loading.
  // fetchAccountData() will take a while as it communicates
  // with Ethereum node via JSON-RPC and loads chain data
  // over an API call.
  // document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
  await this.fetchAccountData(provider);
  // document.querySelector("#btn-connect").removeAttribute("disabled")
},
async  onDisconnect() {

  console.log("Killing the wallet connection", provider);

  // TODO: Which providers have close method?
  if(provider.close) {
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }

        selectedAccount = null;
        
        localStorage.removeItem("user");
         this.$store.dispatch("currentUser/logout" );
         this.dialog = false
      },
      logout(){
         localStorage.removeItem("user");
         this.$store.dispatch("currentUser/logout" );
         this.dialog = false
      },
      login(){
        this.$store.dispatch('metamask/innitaliseWeb3').then(
            response =>{
              console.log(response);
              this.$store.dispatch('metamask/validateMetamaskAvailable')
              .then(
            response =>{
              console.log(response);
              this.$store.dispatch('metamask/loginMetaMask').then(
              () =>  {
                    this.$toast.success("login successful");
                    this.$store.dispatch("currentUser/setUser" , localStorage.getItem("user") != null ? JSON.parse(localStorage.getItem("user"))  : {});
              }) 
            }
            ).catch (
                error => {
                    this.$toast.error(error);
                }
            )
            }
        ).catch (
            error => {
                this.$toast.error(error);
            }
        )
        },
 async  fetchAccountData() {

// Get a Web3 instance for the wallet
const web3 = new Web3(provider);

console.log("Web3 instance is", web3);
window.tokenContract   =  await new web3.eth.Contract( tokenAbi ,tokenAddress);
window.goulContract   =  await new web3.eth.Contract( guolAbi ,guolAddress);
window.daiContract   =  await new web3.eth.Contract( daiAbi ,daiAddress);
window.swapContract   =  await new web3.eth.Contract( swapAbi ,swapAddress);
window.farmContract   =  await new web3.eth.Contract( farmAbi , farmAddress);

window.web3 = web3;
// Get connected chain id from Ethereum node
const chainId = await web3.eth.getChainId();
// Load chain information over an HTTP API
const chainData = evmChains.getChain(chainId);
this.chainId = chainId;
this.chainName = chainData.name;


this.$store.dispatch("vault/setChainID" , chainId);
// document.querySelector("#network-name").textContent = chainData.name;
console.log(chainData)
// Get list of accounts of the connected wallet
const accounts = await web3.eth.getAccounts();

// MetaMask does not give you all accounts, only the selected account
console.log("Got accounts", accounts);
selectedAccount = accounts[0];
console.log(selectedAccount)
        let user = {};
        user.id  =  Math.floor(Math.random() * 1000) + 1;
        user.address = accounts[0];
        this.$store.dispatch("currentUser/setUser" , user);

// Get a handl
// const template = document.querySelector("#template-balance");
// const accountContainer = document.querySelector("#accounts");

// Purge UI elements any previously loaded accounts
// accountContainer.innerHTML = '';

// Go through all accounts and get their ETH balance
const rowResolvers = accounts.map(async (address) => {
  const balance = await web3.eth.getBalance(address);
  // ethBalance is a BigNumber instance
  // https://github.com/indutny/bn.js/
  const ethBalance = web3.utils.fromWei(balance, "ether");
  console.log("ethBalance")
  console.log(ethBalance)
  const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
  
  this.$store.dispatch("vault/getPriceData" );
  this.$store.dispatch("vault/loadBalances" );
  console.log(humanFriendlyBalance);
  console.log("vaultcount 1");

      let useraddress = user.address.toLowerCase();
      let body =  { 
                query: `
                    query {
                        users(where : {id : "${useraddress}"}){
                          id
                            vaults {
                              id
                            }
                        }
                    }
                `, 
                variables: {}
            }
      const result =  await axios.post("https://api.thegraph.com/subgraphs/name/blockifi/ghoulfinancebsc" ,body
      )
      console.log(result);
      let users = result.data.data.users;
   

  if(users.length > 0){
    
    let vaultIDs = users[0].vaults;
    let vaults = [];
    for(let index = 0; index < vaultIDs.length ; index++){
       let vault = {};
       vault.id = vaultIDs[index].id;
       vault.debt = await window.tokenContract.methods.vaultDebt(vaultIDs[index].id).call();
       vault.debt = window.web3.utils.fromWei(vault.debt);
       vault.vaultCollateral = await window.tokenContract.methods.vaultCollateral(vaultIDs[index].id).call();
       vault.vaultCollateral = window.web3.utils.fromWei(vault.vaultCollateral);
      console.log( typeof( vault.debt))
     
      vault.availableBorrow = (((parseFloat(vault.vaultCollateral) * parseFloat(this.ethPrice) ) / (150 * parseFloat( this.gDaiPrice))) * 100) - parseFloat(vault.debt);
      if(parseInt(vault.debt) !=0) {   
        vault.ratio = (parseFloat(vault.vaultCollateral) * parseFloat(this.ethPrice) / (parseFloat(vault.debt) *parseFloat( this.gDaiPrice))) * 100;

      }
       else {
        vault.ratio = 0;
       }
     
       vaults.push(vault);
     }
     this.$store.dispatch("vault/setVaults" ,vaults).then(()=> {
      this.$store.dispatch("vault/setVaultLoading" , false);
  })

}
  else{
    this.$store.dispatch("vault/setVaultLoading" , false);
  }
      
    
    
  // Fill in the templated row and put in the document
  // const clone = template.content.cloneNode(true);
  // clone.querySelector(".address").textContent = address;
  // clone.querySelector(".balance").textContent = humanFriendlyBalance;
  // accountContainer.appendChild(clone);
});

// Because rendering account does its own RPC commucation
// with Ethereum node, we do not want to display any results
// until data for all accounts is loaded
await Promise.all(rowResolvers);

}
  }

}
</script>