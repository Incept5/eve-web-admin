<script setup>
import { supabase } from '../supabase'
import { onMounted, ref, toRefs } from 'vue'

const props = defineProps(['session'])
const { session } = toRefs(props)

const loading = ref(true)
const apiKey = ref('')
const expiresAt = ref(null)
const error = ref('')
const copySuccess = ref(false)

onMounted(() => {
    getApiKey()
})

async function getApiKey() {
    try {
        loading.value = true
        const { user } = session.value

        let { data, error: apiError } = await supabase
            .from('hldk_api_keys')
            .select('apikey, expires')
            .eq('user_id', user.id)
            .single()

        if (apiError) throw apiError

        if (data) {
            apiKey.value = data.apikey
            expiresAt.value = data.expires
        } else {
            error.value = "Error: no api key available please email adam@higherleveldev.com"
        }
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

async function signOut() {
    try {
        loading.value = true
        let { error } = await supabase.auth.signOut()
        if (error) throw error
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

function formatDate(date) {
    if (!date) return ''
    return new Date(date).toLocaleString()
}

function copyApiKey() {
    navigator.clipboard.writeText(apiKey.value).then(() => {
        copySuccess.value = true
        setTimeout(() => {
            copySuccess.value = false
        }, 2000)
    }, (err) => {
        console.error('Could not copy text: ', err)
    })
}
</script>

<template>
    <div class="account-widget">
        <div class="logo-container">
                <img src="/robot.png" alt="Eve Horizon Logo" class="logo" />
            </div>
        <div v-if="error" class="error-message">{{ error }}</div>
        <div v-else>
            <div>
                <label for="email">Email</label>
                <input id="email" type="text" :value="session.user.email" disabled />
            </div>
            <div v-if="apiKey" class="api-key-container">
                <label for="apiKey">Eve Horizon API Key</label>
                <div class="input-with-copy">
                    <input id="apiKey" type="text" :value="apiKey" readonly />
                    <button @click="copyApiKey" class="copy-button" :class="{ 'copy-success': copySuccess }">
                        <span v-if="!copySuccess">📋</span>
                        <span v-else>✅</span>
                    </button>
                </div>
            </div>
            <div v-if="expiresAt">
                <label>Expires At</label>
                <p>{{ formatDate(expiresAt) }}</p>
            </div>
        </div>
        <div>
            <button class="button block" @click="signOut" :disabled="loading">
                Sign Out
            </button>
        </div>
    </div>
</template>

<style scoped>
.account-widget {
    max-width: 400px;
    margin: 0 auto;
}

.logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.error-message {
    color: red;
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
}

input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
}

.button {
    width: 100%;
    padding: 0.5rem;
    background-color: #0344F1;
    color: white !important;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: none;
    font-weight: bold;
}

.button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.button span {
    color: white !important;
}

.api-key-container {
    margin-bottom: 1rem;
}

.input-with-copy {
    display: flex;
    align-items: center;
}

.input-with-copy input {
    flex-grow: 1;
    margin-bottom: 0;
}

.copy-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.5rem;
    transition: none;
}

.copy-success {
    color: green;
}
</style>