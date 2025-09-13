import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  ArrowLeft,
  Mail, 
  CreditCard, 
  Instagram, 
  Chrome,
  Lock,
  Users,
  Settings,
  Plus,
  Edit,
  Trash
} from "lucide-react";
import { Link } from "react-router-dom";

const AssetManagement = () => {
  const assets = [
    {
      id: 1,
      name: "Gmail Account",
      type: "Email",
      icon: Mail,
      username: "john.doe@gmail.com",
      notes: "Primary email account with important family photos and documents",
      beneficiaries: ["Sarah Doe"],
      action: "Transfer",
      status: "safe"
    },
    {
      id: 2,
      name: "Bank of America Checking",
      type: "Banking",
      icon: CreditCard,
      username: "john.doe@email.com",
      notes: "Main checking account",
      beneficiaries: [],
      action: "Notify Only",
      status: "warning"
    },
    {
      id: 3,
      name: "Instagram",
      type: "Social Media",
      icon: Instagram,
      username: "@johndoe",
      notes: "Personal social media account with family memories",
      beneficiaries: ["Emma Doe"],
      action: "Memorialize",
      status: "safe"
    }
  ];

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
            <span className="text-muted-foreground">john@example.com</span>
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
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="asset-name">Account/Service Name</Label>
                <Input id="asset-name" placeholder="e.g., Gmail, Bank of America, Instagram" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="asset-type">Asset Type</Label>
                <Select>
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
                <Input id="username" placeholder="Your username or email for this account" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Account password (encrypted)" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes & Instructions</Label>
              <Textarea 
                id="notes" 
                placeholder="Add any important notes, recovery codes, or special instructions for beneficiaries..."
                className="min-h-24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="action">What should happen to this asset?</Label>
              <Select>
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

            <div className="flex gap-4">
              <Button variant="primary">Save Asset</Button>
              <Button variant="outline">Save & Add Another</Button>
            </div>
          </CardContent>
        </Card>

        {/* Existing Assets */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Your Digital Assets ({assets.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assets.map((asset) => (
                <div key={asset.id} className="p-6 rounded-lg border bg-card/50 hover:shadow-card transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <asset.icon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-semibold text-lg">{asset.name}</h3>
                          <p className="text-muted-foreground">{asset.username}</p>
                        </div>
                        
                        <p className="text-sm text-muted-foreground max-w-md">
                          {asset.notes}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{asset.beneficiaries.length > 0 ? `${asset.beneficiaries.length} beneficiaries` : 'No beneficiaries'}</span>
                          </div>
                          <Badge variant="outline">{asset.action}</Badge>
                          {asset.status === 'safe' && <Badge variant="success">✅ Protected</Badge>}
                          {asset.status === 'warning' && <Badge variant="warning">⚠️ Needs Attention</Badge>}
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
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssetManagement;
