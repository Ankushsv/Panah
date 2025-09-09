import { supabase } from './supabase/client';
import { projectId } from './supabase/info';

export async function makeAuthenticatedRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  try {
    // Get the current session to use the access token
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      throw new Error(`Failed to get session: ${error.message}`);
    }
    
    if (!session?.access_token) {
      throw new Error('No access token available - user not authenticated');
    }

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-9c38db96${endpoint}`,
      {
        ...options,
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`API request failed: ${errorData.error || response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error(`API request to ${endpoint} failed:`, error);
    throw error;
  }
}

export async function makePublicRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-9c38db96${endpoint}`,
      {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`API request failed: ${errorData.error || response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error(`Public API request to ${endpoint} failed:`, error);
    throw error;
  }
}