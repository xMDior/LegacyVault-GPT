// src/components/AssetManagement.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Shield, Settings, Plus, Users, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type Beneficiary = {
  email: string;
  relationship: string;
};

type Asset = {
  id: string;
  name: string;
  username?: string;
  password?: string;
  notes?: string;
  asset_type: string;
  action: string;
  status?: string;
  beneficiaries: Beneficiary[];
};

const AssetManagement: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState("");
  const [asset_type, setAssetType] = useState("");
  const [action, setAction] = useState("");
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([{ email: "", relationship: "" }]);

  const navigate = useNavigate();

  // Check user session
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return navigate("/auth");
      setUser(data.user);
    });
  }, [navigate]);

  // Get or create profile
  const getOrCreateProfileId = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();
    if (error) throw error;

    if (!data) {
      const { data: newProfile, error: insertError } = await supabase
        .from("profiles")
        .insert([{ user_id: userId }])
        .select("id")
        .single();
      if (insertError) throw insertError;
      return newProfile.id;
    }
    return data.id;
  };

  // Fetch all assets
  const fetchAssets = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const profileId = await getOrCreateProfileId(user.id);
      const { data, error } = await supabase
        .from("assets")
        .select(`
          id,
          name,
          username,
          password,
          notes,
          asset_type,
          action,
          status,
          beneficiaries:beneficiaries(email, relationship)
        `)
        .eq("user_id", profileId);

      if (error) throw error;
      setAssets(data || []);
    } catch (err: any) {
      console.error("Error fetching assets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [user]);

  // Add new asset + beneficiaries
  const handleAddAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in.");

    setLoading(true);
    try {
      const profileId = await getOrCreateProfileId(user.id);

      // Insert asset
      const { data: newAsset, error: assetError } = await supabase
        .from("assets")
        .insert([
          {
            user_id: profileId,
            name,
            username,
            password,
            notes,
            asset_type,
            action,
          },
        ])
        .select()
        .single();

      if (assetError) throw assetError;

      // Insert beneficiaries if provided
      const beneficiariesToInsert = beneficiaries.filter((b) => b.email.trim() !== "");
      if (beneficiariesToInsert.length > 0) {
        const { error: benError } = await supabase.from("beneficiaries").insert(
          beneficiariesToInsert.map((b) => ({
            asset_id: newAsset.id,
            email: b.email,
            relationship: b.relationship,
            user_id: profileId,
          }))
        );
        if (benError) throw benError;
      }

      // Reset form
      setName("");
      setUsername("");
      setPassword("");
      setNotes("");
      setAssetType("");
      setAction("");
      setBeneficiaries([{ email: "", relationship: "" }]);

      // Refetch assets
      fetchAssets();

      // Optional: redirect to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Error adding asset:", err);
      alert(err.message || "Error adding asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">LegacyVault</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">{user?.email || "user@example.com"}</span>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Manage Digital Assets</h1>
          <p className="text-muted-foreground">
            Securely store and manage your digital accounts, passwords, and important files.
          </p>
        </div>

        {/* Add New Asset Card */}
        <Card className="border-0 shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Digital Asset
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-6" onSubmit={handleAddAsset}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="asset-name">Account/Service Name</Label>
                  <Input
                    id="asset-name"
                    placeholder="e.g., Gmail, Bank of America, Instagram"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asset-type">Asset Type</Label>
                  <Select value={asset_type} onValueChange={setAssetType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Account</SelectItem>
                      <SelectItem value="banking">Banking & Finance</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="cloud">Cloud Storage</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="subscription">Subscription Service</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username/Email</Label>
                  <Input
                    id="username"
                    placeholder="Your username or email for this account"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Account password (encrypted)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes & Instructions</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any important notes, recovery codes, or special instructions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="action">What should happen to this asset?</Label>
                <Select value={action} onValueChange={setAction}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transfer">Transfer to beneficiary</SelectItem>
                    <SelectItem value="delete">Delete/Close account</SelectItem>
                    <SelectItem value="memorialize">Memorialize profile</SelectItem>
                    <SelectItem value="notify">Notify only (no access)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Beneficiaries</h4>
                {beneficiaries.map((b, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={b.email}
                      onChange={(e) => {
                        const newBens = [...beneficiaries];
                        newBens[i].email = e.target.value;
                        setBeneficiaries(newBens);
                      }}
                    />
                    <Input
                      type="text"
                      placeholder="Relationship"
                      value={b.relationship}
                      onChange={(e) => {
                        const newBens = [...beneficiaries];
                        newBens[i].relationship = e.target.value;
                        setBeneficiaries(newBens);
                      }}
                    />
                    {i > 0 && (
                      <Button
                        variant="link"
                        size="sm"
                        className="text-red-500"
                        onClick={() =>
                          setBeneficiaries(beneficiaries.filter((_, index) => index !== i))
                        }
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="link"
                  size="sm"
                  className="text-blue-500"
                  onClick={() =>
                    setBeneficiaries([...beneficiaries, { email: "", relationship: "" }])
                  }
                >
                  Add Beneficiary
                </Button>
              </div>

              <div className="flex gap-4 mt-4">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Adding..." : "Save Asset"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Existing Assets */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Your Digital Assets ({assets.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <p>Loading assets...</p>
              ) : assets.length === 0 ? (
                <p className="text-muted-foreground">No assets yet.</p>
              ) : (
                assets.map((asset) => (
                  <div key={asset.id} className="p-6 rounded-lg border bg-card/50 hover:shadow-card transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          {/* Icon placeholder */}
                        </div>

                        <div className="space-y-2">
                          <div>
                            <h3 className="font-semibold text-lg">{asset.name}</h3>
                            <p className="text-muted-foreground">{asset.username}</p>
                          </div>

                          <p className="text-sm text-muted-foreground max-w-md">{asset.notes}</p>

                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {asset.beneficiaries.length > 0
                                  ? `${asset.beneficiaries.length} beneficiaries`
                                  : "No beneficiaries"}
                              </span>
                            </div>
                            <Badge variant="outline">{asset.action}</Badge>
                            {asset.status === "safe" && <Badge variant="success">✅ Protected</Badge>}
                            {asset.status === "warning" && <Badge variant="warning">⚠️ Needs Attention</Badge>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Users className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssetManagement;
