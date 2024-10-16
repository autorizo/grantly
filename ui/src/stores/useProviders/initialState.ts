import { Provider } from "stores";

export const initialState: {
    active: Provider[];
    inactive: Provider[];
} = {
    active: [],
    inactive: []
};
