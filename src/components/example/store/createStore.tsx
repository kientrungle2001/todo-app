const store: any = {
    stateA: {
        stateA1: 1,
        stateA2: 2,
    },
    stateB: {
        stateB1: 3,
        stateB2: 4,
    },
    events: {},
    dispatch: (action: string, params: any) => {
        if (action == 'action1') {
            store.stateB.stateB1 = store.stateB.stateB1 + params.num;
            let handlers = store.events[action] ?? [];
            handlers.forEach((handler: (value: any) => void) => {
                handler(store.stateB.stateB1);
            });
        }
    },
    listen: (action: string, handler: (value: any) => void) => {
        store.events[action] = store.events[action] ?? [];
        store.events[action].push(handler);
    }
};
const createStore = () => {
    return store;
};

export default createStore;