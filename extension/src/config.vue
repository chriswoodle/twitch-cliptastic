<template>
    <div class="extension">
        <form id="form">
            <fieldset>
                <legend>Dilemma Options</legend>Select options that you would like the viewers to be able to choose from:
                <br />
                <div>
                    <input type="checkbox" id="one" name="option" value="lose the ability to read" checked />
                    <label for="one">lose the ability to read</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="two"
                        name="option"
                        value="eat nothing but ketchup for the rest of your life"
                        checked />
                    <label for="two">eat nothing but ketchup for the rest of your life</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="three"
                        name="option"
                        value="be dumb but always listened to"
                        checked />
                    <label for="three">be dumb but always listened to</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="four"
                        name="option"
                        value="be alone for your entire life"
                        checked />
                    <label for="four">be alone for your entire life</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="five"
                        name="option"
                        value="turn every person you look at into stone"
                        checked />
                    <label for="five">turn every person you look at into stone</label>
                </div>
            </fieldset>
            <input type="submit" value="Submit" onclick="updateConfig()" />
        </form>
    </div>
</template>

<script lang="ts">
import debug from 'debug';
const log = debug('ext:panel-vue');

import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Config extends Vue {

}
</script>

<style lang="scss" scoped>
legend {
    color: red;
}
</style>