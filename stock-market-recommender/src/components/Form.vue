<template>
  <div class="form content-area">
    <div><label>Stock symbol: </label> <input type="text" /></div>
    <div><label>Social media type: </label> <input type="text" /></div>
    <label>Time window:</label>
    <section class="time-window">
      <div><label>Start date:</label> <input type="date" /></div>
      <div><label>End date: </label><input type="date" /></div>
    </section>
    <input type="submit" value="Submit" />
  </div>
</template>

<script>
export default {
  name: "Form",
  components: {},
  props: {
    msg: String
  }
};
</script>
