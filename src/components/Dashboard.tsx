import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  Clock,
  Plus,
  Mail,
  CreditCard,
  Instagram,
  Chrome,
  AlertTriangle,
  CheckCircle,
  Lock,
  Settings
} from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check session
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (!data.user) navigate("/auth");
    });
  }, [navigate]);

  // Fetch assets (bridge auth.users → profiles → assets)
  const fetchAssets = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Step 1: Get profile ID
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (profileError) throw profileError;
      if (!profile) {
        console.log("No profile found for user.");
        setAssets([]);
        return;
      }

      // Step 2: Fetch assets for that profile
      const { data: assetsData, error: assetsError } = await supabase
        .from("assets")
        .select("id, asset_type, action, username, notes, created_at")
        .eq("user_id", profile.id);

      console.log("Fetched assets:", assetsData);
      console.log("Supabase error:", assetsError);

      if (assetsError) throw assetsError;
      setAssets(assetsData || []);
    } catch (err: any) {
      console.error("Error fetching assets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  // Map asset_type to icons
  const getAssetIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "email":
        return Mail;
      case "banking":
        return CreditCard;
      case "social media":
        return Instagram;
      case "cloud storage":
        return Chrome;
      default:
        return Shield;
    }
  };

  // Default status badge
  const getStatusBadge = () => <Badge variant="success">✅ Safe</Badge>;

  // Count beneficiaries
  const totalBeneficiaries = assets.reduce((sum, a) => sum + (a.beneficiaries?.length || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">LegacyVault</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">{user?.email}</span>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-card">
            <CardContent className="p-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-lighter rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{assets.length}</p>
                <p className="text-muted-foreground text-sm">Digital Assets</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardContent className="p-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-legacy-light rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-legacy-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalBeneficiaries}</p>
                <p className="text-muted-foreground text-sm">Beneficiaries</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardContent className="p-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-success-light rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{assets.filter((a) => a.action?.toLowerCase() === "transfer").length}</p>
                <p className="text-muted-foreground text-sm">Transferable</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardContent className="p-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-trust-light rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-trust" />
              </div>
              <div>
                <p className="text-2xl font-bold">90</p>
                <p className="text-muted-foreground text-sm">Days Trigger</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Digital Assets */}
        <Card className="border-0 shadow-card mb-8">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-xl">Your Digital Assets</CardTitle>
            <Button variant="primary" asChild>
              <Link to="/assets">
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading assets...</p>
            ) : assets.length === 0 ? (
              <p className="text-muted-foreground">No assets yet.</p>
            ) : (
              <div className="space-y-4">
                {assets.map((asset) => {
                  const Icon = getAssetIcon(asset.asset_type || "");
                  return (
                    <div key={asset.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{asset.username}</h3>
                          <p className="text-sm text-muted-foreground">{asset.asset_type}</p>
                          {asset.notes && (
                            <p className="text-xs text-muted-foreground">{asset.notes}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{asset.action}</p>
                          <p className="text-xs text-muted-foreground">
                            Created: {new Date(asset.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        {getStatusBadge()}
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/assets/${asset.id}/edit`)}>
                          Manage
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary-lighter rounded-lg flex items-center justify-center mx-auto mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Add Digital Asset</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Secure another account or file
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/assets">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-legacy-light rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-legacy-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Manage Beneficiaries</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add or update trusted contacts
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/beneficiaries">Manage</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-trust-light rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-trust" />
              </div>
              <h3 className="font-semibold mb-2">Release Settings</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure trigger conditions
              </p>
              <Button variant="outline" size="sm">Configure</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
