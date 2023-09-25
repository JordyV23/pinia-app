import {defineStore} from 'pinia'

export const  useCounterOptions = defineStore('counterOptions', {
    state: () => ({
        count: 0,
        lastChanged: undefined,
    }),

    getters: {
        squareCounte: (state) => state.count * state.count,
    },
    
    actions: {

    }
})