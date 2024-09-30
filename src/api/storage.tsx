export interface StorageInterface {
    storage?: StorageInterface;
    get: (key: string) => any | null;
    set: (key: string, val: any) => any;
    del: (key: string) => boolean;
    has: (key: string) => boolean;
    clearTokenInfo: () => void;
};

export const storage: StorageInterface = {
    set: function (key: string, val: any) {
        if (typeof window === 'undefined') {
            return null;
        }
        window.localStorage.setItem(key, JSON.stringify(val));
        return val;
    },
    get: function (key: string): any | null {
        if (typeof window === 'undefined') {
            return null;
        }
        var val = null;
        if (null !== (val = window.localStorage.getItem(key))) {
            return JSON.parse(val);
        }
        return null;
    },
    del: function (key: string): boolean {
        if (typeof window === 'undefined') {
            return false;
        }
        window.localStorage.removeItem(key);
        return true;
    },
    has: function (key: string): boolean {
        if (typeof window === 'undefined') {
            return false;
        }
        return window.localStorage.getItem(key) !== null;
    },
    clearTokenInfo: function () : void {
        storage.del('token');
        storage.del('user');
        storage.del('isAuthenticated');
    }
}
