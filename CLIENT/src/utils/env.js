export default (envKey) => import.meta.env['VITE_' + envKey] || ''