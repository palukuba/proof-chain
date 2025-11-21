import { createClient } from '@supabase/supabase-js'


// Load env vars manually since we are running a standalone script
// In a real vite app, vite handles this.
// We will just hardcode the values read from the .env file for this test script 
// to avoid needing dotenv package if it's not installed.

const supabaseUrl = 'https://lzaezyjkuciruthjaxnm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6YWV6eWprdWNpcnV0aGpheG5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MzA1MzksImV4cCI6MjA3OTMwNjUzOX0.929iWQVFdDsidkNN3Ss746X4VuffDMyl2_gUz9QyscA'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
    console.log('Testing connection to:', supabaseUrl)

    try {
        const { data, error } = await supabase.from('students').select('count', { count: 'exact', head: true })

        if (error) {
            console.error('❌ Connection failed:', error.message)
        } else {
            console.log('✅ Connection successful!')
            console.log('Supabase is reachable.')
        }
    } catch (err) {
        console.error('❌ Unexpected error:', err)
    }
}

testConnection()
