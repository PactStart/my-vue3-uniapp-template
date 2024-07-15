import * as Pinia from 'pinia'
import { useUserStore } from './user/index.js'

export default {
    install(app) {
        app.use(Pinia.createPinia())
        app.config.globalProperties.$store = {
            user : useUserStore()
        }
    }
}
