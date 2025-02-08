import ExSubB1 from "./ExSubB1";
import ExSubB2 from "./ExSubB2";

const ExChildB: React.FC<{ store: any }> = ({ store }) => {
    return <>
        <h2>Child B</h2>
        <ExSubB1 store={store}></ExSubB1>
        <ExSubB2 store={store}></ExSubB2>
    </>
};

export default ExChildB;