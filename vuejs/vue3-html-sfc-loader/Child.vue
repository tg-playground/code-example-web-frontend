<template>
    <div>
        <h3>Child</h3>
        <div>Hello {{who}}</div>
        <div v-html="msg"></div>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            who: 'world'
        }
    },
    props: {
        msg: String
    },
}
</script>

<style>
</style>
