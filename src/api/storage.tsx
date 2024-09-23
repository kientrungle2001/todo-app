export interface StorageInterface {
    storage?: StorageInterface;
    get: (key: string) => any | null;
    set: (key: string, val: any) => any;
    del: (key: string) => boolean;
    has: (key: string) => boolean;
};

export const storage: StorageInterface = {
    set: function (key: string, val: any) {
        window.localStorage.setItem(key, JSON.stringify(val));
        return val;
    },
    get: function (key: string): any | null {
        var val = null;
        if (null !== (val = window.localStorage.getItem(key))) {
            return JSON.parse(val);
        }
        return null;
    },
    del: function (key: string): boolean {
        return window.localStorage.delItem(key);
    },
    has: function (key: string): boolean {
        return window.localStorage.getItem(key) !== null;
    },
}
