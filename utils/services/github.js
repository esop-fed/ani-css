const host = 'https://api.github.com';

export const user = {
    api(path) {
        return host + '/users/' + path;
    },
    /**
     * 获取用户信息
     * @param {string} path api
     */
    async get(path) {
        return fetch(this.api(path)).then(res => res.json());
    }
}
