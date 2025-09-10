import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { createClient } from "@supabase/supabase-js";
import * as kv from "@/utils/supabase/functions/server/kv_store";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize Supabase client for server operations
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Health check endpoint
app.get("/make-server-c67e10e0/health", (c) => {
  return c.json({ status: "ok" });
});

// Register new user with role
app.post("/make-server-c67e10e0/register", async (c) => {
  try {
    const { email, password, name, role } = await c.req.json();
    
    if (!email || !password || !name || !role) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    if (!["admin", "user"].includes(role)) {
      return c.json({ error: "Invalid role. Must be 'admin' or 'user'" }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name,
        role : role || 'user',
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Registration error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      message: "User created successfully", 
      user: {
        id: data.user.id,
        email: data.user.email,
        role: data.user.user_metadata.role
      }
    });
  } catch (error) {
    console.log(`Registration error: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get user profile with role
app.get("/make-server-c67e10e0/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Profile fetch error: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    return c.json({
      id: user.id,
      email: user.email,
      name: user.user_metadata.name,
      role: user.user_metadata.role
    });
  } catch (error) {
    console.log(`Profile error: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default app;