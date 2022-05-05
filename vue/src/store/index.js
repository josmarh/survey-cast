import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
    {
        id: 100,
        title: "The codeholic youtube channel content",
        slug: "the-codeholic-youtube-channel-content",
        status: "draft",
        image: 
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        description: "My name is Joshua. <br> I am a web developer with 4 years of experience, free education consultant",
        created_at: "2021-12-20 18:00:00",
        updated_at: "2021-12-20 18:00:00",
        expire_at: "2021-12-20 18:00:00",
        questions: [
            {
                id: 1,
                type: "select",
                question: "From which country are you?",
                description: null,
                data: {
                    options: [
                        {uuid: "fudjhs-wjjwk389-sjjdheu-282992", text: "USA"},
                        {uuid: "fudjhs-wjjwk389-sjjdheu-282992", text: "Gorgia"},
                        {uuid: "fudjhs-wjjwk389-sjjdheu-282992", text: "Germany"},
                        {uuid: "fudjhs-wjjwk389-sjjdheu-282992", text: "India"},
                        {uuid: "fudjhs-wjjwk389-sjjdheu-282992", text: "United Kingdom"},

                    ]
                }
            },
            {
                id: 2,
                type: "checkbox",
                question: "Which language video do you want to see on my channel?",
                description: "Lorem Ipsum constitute ortheiru",
                data: {
                    options: [
                        {uuid: "fudjhs-wjjwk389-sjjdheu-282992", text: "JavaScript"},
                        {uuid: "fudjhs-wjjwk389-sjjdheu-282992", text: "PHP"},
                        {uuid: "fudjhs-wjjwk389-sjjdheu-282992", text: "HTML + CSS"},
                        {uuid: "fudjhs-wjjwk389-sjjdheu-282992", text: "Everything i think would be good"},
                        {uuid: "fudjhs-wjjwk389-sjjdheu-282992", text: "All of the Above"},
                        
                    ]
                }
            },
            {
                id: 3,
                type: "text",
                question: "What is your favourite youtube channel?",
                description: null,
                data: {}
            },
            {
                id: 4,
                type: "textarea",
                question: "What do you think about TheCodeholic channel?",
                description: "Write you honest opinion, everything is anonymous.",
                data: {}
            }
        ]
    }
];

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN')
        },
        surveys: [...tmpSurveys],
    },
    getters: {},
    actions: {
        register({ commit }, user){
            return axiosClient.post('/register', user)
                .then(({data}) => {
                    commit('setUser', data)
                    return data;
                })
        },
        login({ commit }, user){
            return axiosClient.post('/login', user)
                .then(({data}) => {
                    commit('setUser', data)
                    return data;
                })
        },
        logout({ commit }){
            return axiosClient.post('/logout')
                .then(response => {
                    commit('logout')
                    sessionStorage.clear();
                    return response;
                })
        }
    },
    mutations: {
        logout: state => {
            state.user.data = {};
            state.user.token = null;
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token)
        }
    },
    modules: {}
})

export default store;