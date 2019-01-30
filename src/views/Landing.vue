<template>
    <b-container>
        <b-row align-h="center" align-v="center">
            <b-card class="text-center" border-variant="white"
                    img-src="https://s3.amazonaws.com/hamburg-images/asu_university_horiz_rgb_maroongold_600.png"
                    img-top style="max-width: 50rem;">
                <h1>
                    <b-badge class="mb-2 mr-sm-2 mb-sm-0" href="/sort" variant="dark">Sort</b-badge>
                    <b-link href="#" class="mb-2 mr-sm-2 mb-sm-0" disabled>|</b-link>
                    <b-badge class="mb-2 mr-sm-2 mb-sm-0" href="/stack" variant="dark">Stack</b-badge>
                </h1>
            </b-card>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "landing"
    }
</script>

<style scoped>

</style>
