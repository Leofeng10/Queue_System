<template>
    <div style="width: 30%;">
        <span>Queuing list</span>
        <!-- The Queuing List Starts -->
        <div v-for="item in qArray" v-bind:key="item.index">
            <div class="info">
                <div style="display: flex;">
                    <div>{{ item.gender ? 'Mr.' : 'Ms.' }}</div>
                    <div>{{ item.name }}</div>
                    <div>{{ item.size }}</div>
                    <img src="../../public/img/icons/person_dark.svg" alt="people"/>
                </div>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            qArray: [
                {
                    // index: 0,
                    name: "Tay",
                    gender: true, // Male is true, Female is false
                    tel: null,
                    size: 0 // Number of people
                },
                {
                    name: "Tay",
                    gender: true,
                    tel: "8888 8888",
                    size: 2
                },
                {
                    name: "Tay",
                    gender: true,
                    tel: "6666 6666",
                    size: 4
                },
                {
                    name: "Tay",
                    gender: true,
                    tel: "1111 1111",
                    size: 6
                },
            ]
        }
    }
}

</script>
<style scoped>
.info {

}
.info img {
    width: 17px;
    height: 20px;
}
</style>