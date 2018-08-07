import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
axios.defaults.baseURL = 'http://localhost:8080/';

export function createStore() {
    return new Vuex.Store({
        state: {
            items: []
        },
        mutations: {
            set_items(state, items) {
                state.items = items;
            }
        },
        actions: {
            set_items({ commit }) {
                return axios.get('api/testing')
                    .then(response => {
                        commit('set_items', response.data);
                    })
                    .catch(err => console.log(err));
            }
        }
    });
}