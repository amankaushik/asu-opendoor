<template>
    <div id="app">
        <b-navbar toggleable="md" type="dark" variant="dark">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="/">ASU OpenDoor</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item href="/sort">Sort</b-nav-item>
                    <b-nav-item href="/stack">Stack</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <router-view/>
    </div>
</template>
<style>
   .nav {
       font-family: 'Avenir', Helvetica, Arial, sans-serif;
       font-size: 16px;
   }
</style>
<script>
    import Landing from "@/views/Landing";
    export default {
        components: {Landing}
    }
</script>
