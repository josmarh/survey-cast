<template>
    <page-component>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ model.id ? model.title : "Create a Survey"}}
                </h1>
            </div>
        </template>

        <form @submit.prevent="saveSurvey">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <!-- image  -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <div class="mt-1 flex items-center">
                            <img v-if="model.image" 
                                :src="model.image" 
                                :alt="model.title" 
                                class="w-64 h-48 object-cover"
                            />
                            <span v-else
                                class="flex item-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-[80%] w-[80%] text-gray-300" fill="none" viewBox="0 0 24 24" 
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" 
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <button type="button" class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300
                                rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none
                                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            <input type="file" class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer">
                            Change
                            </button>
                        </div>
                    </div>
                    <!-- title  -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input type="text" id="title" name="title" v-model="model.title" autocomplete="survey_title"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500
                                block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>
                    <!-- description  -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <div class="mt-1">
                            <textarea name="description" id="description" rows="3" v-model="model.description"
                                autocomplete="survey_description" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500
                                mt-1 block w-full sm:text-sm border border-gray-300 rounded-sm"
                                placeholder="Describe your survey"></textarea>
                        </div>
                    </div>
                    <!-- expired date  -->
                    <div>
                         <label class="block text-sm font-medium text-gray-700">
                            Expire Date
                        </label>
                        <input type="date" id="expire_date" name="expire_date" v-model="model.expire_date"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500
                                block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>
                    <!-- status  -->
                    <div class="flex items-start">
                        <div class="flex items-center">
                            <input type="checkbox" id="status" name="status" v-model="model.status" 
                                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="status" class="font-medium text-gray-700">Active</label>
                        </div>
                    </div>
                    <!-- questions -->
                    <div class="py-5 px-4 bg-white space-y-6 sm:p-6">
                        <h3 class="text-2xl font-semibold flex items-center justify-between">
                            Questions

                            <button type="button" @click="addQuestion()" 
                                class="flex text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Question
                            </button>
                        </h3>
                        <div v-if="!model.questions.length" class="text-center text-gray-600">
                            You don't have any questions created
                        </div>
                        <div v-for="(question, index) in model.questions" :key="question.id">
                            <QuestionEditor
                                :question="question"
                                :index="index"
                                @change="questionChange"
                                @addQuestion="addQuestion"
                                @deleteQuestion="deleteQuestion"
                            />
                        </div>
                    </div>
                    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm
                            text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none
                            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </page-component>
</template>

<script setup>
import store from '../store';
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import PageComponent from '../components/PageComponent.vue';
import QuestionEditor from '../components/editors/QuestionEditor.vue'

const route = useRoute();

let model = ref({
    title: "",
    status: false,
    descritpion: null,
    image: null,
    expire_date: null,
    questions: []
})

// if route has params id 
if (route.params.id) {
    model.value = store.state.surveys.find(
        (s) => s.id === parseInt(route.params.id)
    );
}

function addQuestion(index) {
    const newQuestion = {
        id: uuidv4(),
        type: "text",
        question: "",
        description: null,
        data: {},
    };

    model.value.questions.splice(index, 0, newQuestion)
}

function deleteQuestion(question) {
    model.value.questions = model.value.questions.filter(
        (q) => q !== question
    );
}
</script>

<style>

</style>