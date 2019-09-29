import debug from 'debug';
const log = debug('twitch-plugin');
log.enabled = true;

import _Vue, { PluginObject } from 'vue';

import { BehaviorSubject } from 'rxjs';
import { first, filter } from 'rxjs/operators'
interface TwitchExtensionHelperOptions {
}

export class TwitchExtensionHelper implements PluginObject<TwitchExtensionHelperOptions> {
    channelId?: string;
    game: BehaviorSubject<string> = new BehaviorSubject('');
    context: BehaviorSubject<TwitchExtContext | null> = new BehaviorSubject<TwitchExtContext | null>(null);
    _token: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    async token() {
        if (this._token.value) return this._token.value;
        // Acts as a lock untill the token is available;
        return new Promise((resolve, reject) => {
            // Only subscribe to first non-null value
            this._token.pipe(filter(n => !!n), first()).subscribe((value) => {
                resolve(value);
            });
        });
    }
    install(Vue: typeof _Vue, options?: TwitchExtensionHelperOptions) {
        Vue.prototype.$twitch = this;
        ((<any>window).Twitch.ext as TwitchExt).onAuthorized((auth) => {
            const { channelId, clientId, token, userId } = auth;
            // Everytime twitch refreshes this token, update the plugin
            this._token.next(token);
            console.log(channelId);
            this.channelId = channelId;
        });

        ((<any>window).Twitch.ext as TwitchExt).onContext((context) => {
            const ctx: any = Object.assign(this.context.value || {}, context);
            this.context.next(ctx);

            if (this.game.value !== context.game) {
                this.game.next(context.game || '');
            }

            if (this.theme.value !== context.theme) {
                this.theme.next(context.theme || 'dark');
            }
        });


    }
}
const helper = new TwitchExtensionHelper();

export default helper;


