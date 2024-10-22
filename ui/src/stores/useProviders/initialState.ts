import { Provider } from "stores";

export const initialState: {
    active: Provider[];
    inactive: Provider[];
    blocked: Provider[];
} = {
    active: [],
    inactive: [],
    blocked: [],
};
