
const ExSubA1: React.FC<{ store: any }> = ({ store }) => {
    const addToB1 = () => {
        store.dispatch('action1', {
            num: 10
        });
    };
    return <>
        <h3>Sub A1 <button onClick={() => addToB1()}>Add to B1</button></h3>

    </>
};

export default ExSubA1;