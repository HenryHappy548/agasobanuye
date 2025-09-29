import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, CheckCircle } from 'lucide-react';

export default function CreateAdmin() {
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const { toast } = useToast();

  const createAdminUser = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-admin');
      
      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setCreated(true);
      toast({
        title: 'Success!',
        description: 'Admin user created successfully!',
      });
    } catch (error: any) {
      console.error('Error creating admin:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create admin user',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Setup Admin Account</CardTitle>
          <CardDescription>
            Create the admin account to access the CMS
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {created ? (
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <p className="text-green-600">Admin account created successfully!</p>
              <div className="bg-muted p-4 rounded-lg text-sm">
                <p><strong>Email:</strong> admin@admin.com</p>
                <p><strong>Password:</strong> Henryhappy250</p>
              </div>
              <p className="text-muted-foreground text-sm">
                You can now sign in with these credentials to access the admin panel.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Click the button below to create the admin account with these credentials:
              </p>
              <div className="bg-muted p-4 rounded-lg text-sm">
                <p><strong>Email:</strong> admin@admin.com</p>
                <p><strong>Password:</strong> Henryhappy250</p>
              </div>
              <Button onClick={createAdminUser} disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Admin Account
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}