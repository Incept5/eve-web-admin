import { reactive } from 'vue'

export const store = reactive({
  user: null,
  apiKey: null,
  loading: false,
  error: null,
  
  setUser(user) {
    this.user = user
  },
  
  setApiKey(key) {
    this.apiKey = key
  },
  
  setLoading(status) {
    this.loading = status
  },
  
  setError(error) {
    this.error = error
  },
  
  clearError() {
    this.error = null
  }
})