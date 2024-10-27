"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/components/auth-provider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, PlayCircle, Settings, CreditCard } from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard-header";
import { SubscriptionStatus } from "@/components/subscription-status";

interface UserData {
  subscriptionStatus: string;
  subscriptionEnd: string | null;
  plan?: string;
}

export default function DashboardPage() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <DashboardHeader />
      <div className="container py-8">
        <div className="grid gap-8">
          <SubscriptionStatus userData={userData} />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5" />
                  Quick Access
                </CardTitle>
                <CardDescription>Continue watching or start new content</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/browse">Browse Content</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Billing
                </CardTitle>
                <CardDescription>Manage your subscription and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/billing">View Billing History</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>Update your profile and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/settings">Manage Settings</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}