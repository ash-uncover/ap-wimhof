import { Logger } from '@uncover/js-utils-logger'
const LOGGER = new Logger('CONFIG')

const CONFIG: {
  AP_WIMHOF_PUBLIC: string
  AP_WIMHOF_ENVIRONMENT: string
} = {
  AP_WIMHOF_PUBLIC: '',
  AP_WIMHOF_ENVIRONMENT: 'local',
}

// Load config from env
try {
  // This cannot be factorized since webpack simply replace the full process.env.[property] strings
  if (process.env.AP_WIMHOF_PUBLIC) {
    CONFIG.AP_WIMHOF_PUBLIC = process.env.AP_WIMHOF_PUBLIC
  }
  if (process.env.AP_WIMHOF_ENVIRONMENT) {
    CONFIG.AP_WIMHOF_ENVIRONMENT = process.env.AP_WIMHOF_ENVIRONMENT
  }
} catch (error) {
  LOGGER.warn('Failed to load from process.env')
}

console.log('CONFIG')

Object.keys(CONFIG).forEach((confKey: string) => {
  // @ts-ignore
  console.log(` - ${confKey}: '${CONFIG[confKey]}'`)
})

export default CONFIG
