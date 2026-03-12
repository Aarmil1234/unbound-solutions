import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kkorgoaetsenmhnibdad.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtrb3Jnb2FldHNlbm1obmliZGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMjY5NzYsImV4cCI6MjA4ODkwMjk3Nn0.NPzcsWLC-i3BtM3Re-tt_X86Ey84RKcLcr385Kykkjo";

export const supabase = createClient(supabaseUrl, supabaseKey);