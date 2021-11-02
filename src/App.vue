<template>
  <div id="app">
   <loader></loader>
  </div>
</template>

<script>

export default {
  mounted(){
    
  }
}
</script>

<style>
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
.theme--dark.v-input, .theme--dark.v-input input, .theme--dark.v-input textarea {
  color:#263238;
}
textarea {
  color:#263238;
}
blockquote, dd, dl, figure, h1, h2, h3, h4, h5, h6, hr, p, pre {
    color:white;
}
.overlay {
      position: fixed;
    
    z-index:111199;

}

</style>
