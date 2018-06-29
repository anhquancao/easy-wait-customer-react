import Loadable from "react-loadable";
import Loading from "../components/Loading";

export const createLoadableComponent = (importModule) => {
    return Loadable({
        loader: importModule,
        loading: Loading,

    });
};