<template>
    <div id="multi-step-form">
        <form class="p-10" @submit.prevent="">
            <!--Step Indicators-->
            <div class="">
                <div class="flex inline-block justify-center space-x-0">
                    <div class="flex inline-block "
                        v-for="step in steps.length" 
                        :key="step">
                        <div class="rounded-full text-center h-10 w-24 mr-4"
                            :class="[
                                step - 1 <= currentStep
                                ? 'border-4 border-orange-500 bg-gray-100 py-1'
                                : 'bg-gray-100 py-2'
                            ]">
                            {{step}}
                        </div>
                        <div v-if="step < 4"
                            class="h-1 w-full rounded border mt-4 mr-4"
                            :class="[
                                step - 1 < currentStep
                                ? 'bg-orange-500 border-orange-500 '
                                : 'bg-gray-400'
                            ]">
                        </div>
                        <div v-else
                            class="h-1 w-full rounded mt-4"
                            :class="[
                                step - 1 < currentStep
                                ? 'bg-orange-500 border-orange-500 '
                                : ''
                            ]">
                        </div>
                    </div>
                </div>
                <!-- Labels -->
                <div class="flex items-stretch gap-2 space-x-8 justify-center">
                    <span v-for="(step, index) in stepLabel" 
                        :key="index"
                        class="mt-4 text-xs"
                        :class="{'text-orange-500 ': index  <= currentStep}">
                        {{step}}
                    </span>
                </div>
            </div>
            <div v-for="(fieldKeys, step) in steps" :key="step">
                <div v-if="currentStep === step">
                    <!--Form Field-->
                    <div v-for="fieldd in fieldKeys" :key="fieldd" class="relative">
                        <div class="form-control">
                            <label class="label">
                                {{field.fields[fieldd].label}}
                                <input
                                class="input input-bordered m-2 w-full"
                                type="text"
                                v-model="field.fields[fieldd].value"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <!--Form Footer (Buttons)-->
            <footer class="flex flex-row-reverse gap-2 justify-start mt-5 p-10">
                <button class="btn btn-primary" 
                    v-if="isLastStep()"
                    @click.prevent="previousStep">
                    Save
                </button>
                <button
                    v-if="!isLastStep()"
                    @click="nextStep"
                    class="px-10">
                    Next
                </button>
                <button class="btn" 
                    v-if="!isFirstStep()"
                    @click.prevent="previousStep">
                    Previous
                </button>
            </footer>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'

let currentStep = ref(0)
const field = ref({
    
    fields: {
        name: {
            label: "Name",
            value: "",
        },
        email: {
            label: "Email",
            value: "",
        },
        address: {
            label: "Address",
            value: "",
        },
        city: {
            label: "City",
            value: "",
        },
        state: {
            label: "State",
            value: "",
        },
        zip: {
            label: "Zip",
            value: "",
        },
        donationAmount: {
            label: "Donation Amount",
            value: "",
        }
    }
})

let steps = [
    ["name", "email"],
    ["address", "city", "state", "zip"],
    ["donationAmount"],
    ["donationAmount"]
]

let stepLabel = [
    'Choose Type',
    'Additional Information',
    'Color & Shape',
    'Download QR Code'
]

function previousStep() {
    if (isFirstStep()) return;
    currentStep.value--;
}
function nextStep() {
    if (isLastStep()) return;
    currentStep.value++;
}

function totalSteps() {
    return steps.length;
}

function isFirstStep() {
    return currentStep.value === 0;
}

function isLastStep() {
    return currentStep.value === totalSteps() - 1;
}
</script>

<style>

</style>