<template>
    <b-container>
        <b-row align-h="center" align-v="center">
            <b-card class="text-center" border-variant="white"
                    img-src="https://s3.amazonaws.com/hamburg-images/asu_university_horiz_rgb_maroongold_600.png"
                    img-top style="max-width: 50rem;">
                <b-link href="/sort" class="card-link">Sort</b-link>
                <b-link href="#" class="card-link" disabled>|</b-link>
                <b-link href="/stack" class="card-link">Stack</b-link>
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
