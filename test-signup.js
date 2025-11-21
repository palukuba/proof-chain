import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lzaezyjkuciruthjaxnm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6YWV6eWprdWNpcnV0aGpheG5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MzA1MzksImV4cCI6MjA3OTMwNjUzOX0.929iWQVFdDsidkNN3Ss746X4VuffDMyl2_gUz9QyscA'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testSignup() {
    const email = `test_${Date.now()}@example.com`
    const password = 'password123'

    console.log(`Attempting to sign up user: ${email}`)

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    institution_name: 'Test School',
                    website: 'https://example.com'
                }
            }
        })

        if (error) {
            console.error('❌ Signup failed:', error.message)
            console.error('Status:', error.status)
        } else {
            console.log('✅ Signup successful! User ID:', data.user?.id)
        }
    } catch (err) {
        console.error('❌ Unexpected error:', err)
    }
}

testSignup()
