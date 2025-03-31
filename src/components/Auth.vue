<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const loading = ref(false)
const email = ref('')
const showSuccessMessage = ref(false)

const handleLogin = async () => {
    try {
        loading.value = true
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), 120000) // 2 minutes timeout
        )

        // Use the current origin and path for the redirect
        const redirectTo = window.location.href.split('?')[0].split('#')[0];
        console.log('redirectTo', redirectTo);
        const authPromise = supabase.auth.signInWithOtp({ email: email.value, options: {emailRedirectTo: redirectTo} })
        
        const { error } = await Promise.race([authPromise, timeoutPromise])
        if (error) throw error
        showSuccessMessage.value = true
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message)
        }
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <form class="row flex-center flex" @submit.prevent="handleLogin">
        <div class="col-6 form-widget">
            <div class="logo-container">
                <img src="/eve_logo.png" alt="Eve Horizon Logo" class="logo" style="width: 200px;" />
            </div>
            <h1 class="header centered">Eve Horizon Access</h1>
            <p class="description centered" v-if="!showSuccessMessage">Please enter your email below to get access to Eve Horizon which is available <a href="https://github.com/HigherLevelDev/hldk" target="_blank">here</a></p>
            <p class="success-message centered" v-if="showSuccessMessage">
                Please check your email for instructions on how you can access Eve Horizon
            </p>
            <div v-if="!showSuccessMessage">
                <input class="inputField" type="email" placeholder="Your email" v-model="email" autocomplete="email" />
            </div>
            <div v-if="!showSuccessMessage">
                <button type="submit" class="button block" :disabled="loading">
                    <span v-if="!loading">Sign up to get access</span>
                    <div v-else class="spinner"></div>
                </button>
            </div>
        </div>
    </form>
</template>

<style scoped>
.logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.logo {
    width: 100px;
    height: auto;
}

.centered {
    text-align: center;
}

.success-message {
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    text-align: center;
}

.spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #ffffff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
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
</style>