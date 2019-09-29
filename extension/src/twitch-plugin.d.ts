import { TwitchExtensionHelper } from './twitch-plugin';
declare module 'vue/types/index' {
    interface Vue {
        $twitch: TwitchExtensionHelper
    }
}