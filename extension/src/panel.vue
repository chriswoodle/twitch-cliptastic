<template>
    <div class="extension">
        <div>
            <h1 class='header'>Related clips</h1>
        </div>
        <div v-for='clip in clips' :key='clip.id'>
            <p class="clip-title">{{clip.title}}</p>
            <iframe :src="`https://clips.twitch.tv/embed?clip=${clip.id}`">
            </iframe>
        </div>

    </div>
</template>

<script lang="ts">
import debug from 'debug';
const log = debug('ext:panel-vue');
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { replaceArray } from './utils';

import twitch from './twitch-plugin';

import axois from 'axios';

@Component
export default class Panel extends Vue {
    clips: any[] = [];

    async mounted() {
        log('VUE! nutty mounted!!');
        const token = await twitch.token();
        // log(context);

        twitch.game.subscribe((game) => {
            if (!game) {
                replaceArray(this.clips, []);
                return;
            }
            axois.get(
                `http://127.0.0.1:8080/clips/${twitch.channelId}`, {
                headers: {
                    authorization: 'Bearer ' + token
                },
                params: {
                    game_id: game
                }
            })
                .then((response) => {
                    // handle success
                    console.log(response);
                    replaceArray(this.clips, response.data.items);
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })
        });
    }
}
</script>

<style lang="scss" scoped>
.extension {
}

.header {
    color: #e3e3e3;
}

.clip-title {
    color: #e3e3e3;
}
</style>