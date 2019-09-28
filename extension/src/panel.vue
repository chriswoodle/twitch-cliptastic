<template>
    <div class="extension">
        <form id="form">
            Would you rather
            <select id="selectA">
                <option>option a</option>
            </select>
            or
            <select id="selectB">
                <option>option b</option>
            </select>
            <input type="submit" id="submit" value="Submit">
        </form>
    </div>
</template>

<script lang="ts">
import debug from 'debug';
const log = debug('ext:panel-vue');
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Panel extends Vue {
    mounted() {
        log('VUE! nutty mounted!!');
    }
}
</script>

<style lang="scss" scoped>
legend {
    color: red;
}
</style>