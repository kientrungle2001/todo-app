import ExSubA1 from "./ExSubA1";
import ExSubA2 from "./ExSubA2";

const ExChildA: React.FC<{ store: any }> = ({ store }) => {
    return <>
        <h2>Child A</h2>
        <ExSubA1 store={store}></ExSubA1>
        <ExSubA2 store={store}></ExSubA2>
    </>
};

export default ExChildA;