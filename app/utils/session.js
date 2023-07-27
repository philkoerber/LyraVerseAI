import supabase from "./supabase"

const {
    data: { session },
} = await supabase.auth.getSession()
    
export default session