import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AccountForm from './account-form'


async function Settings(props) {
      const supabase = createRouteHandlerClient({ cookies })


      const {
    data: { session },
    } = await supabase.auth.getSession()
    
    return (
        <div>
            <AccountForm session={session} />
        </div>
    );
}

export default Settings;