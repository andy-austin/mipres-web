import axios from "axios";

const actions = {
    doAddressing: (event, data) => {
        return axios.post('/addressing', {...data});
    },
};

export default {actions};
