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
import { Link } from "react-router-dom";

const Dashboard = () => {
  const assets = [
    {
      name: "Gmail Account",
      type: "Email",
      icon: Mail,
      status: "safe",
      beneficiaries: ["spouse@email.com"],
      action: "Transfer"
    },
    {
      name: "Bank of America",
      type: "Banking",
      icon: CreditCard,
      status: "warning",
      beneficiaries: [],
      action: "Needs Beneficiary"
    },
    {
      name: "Instagram",
      type: "Social Media",
      icon: Instagram,
      status: "safe",
      beneficiaries: ["child@email.com"],
      action: "Memorialize"
    },
    {
      name: "Google Drive",
      type: "Cloud Storage",
      icon: Chrome,
      status: "locked",
      beneficiaries: ["spouse@email.com", "child@email.com"],
      action: "Transfer"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "locked":
        return <Lock className="h-4 w-4 text-muted-foreground" />;
      default:
        return <CheckCircle className="h-4 w-4 text-success" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "safe":
        return <Badge variant="success">✅ Safe</Badge>;
      case "warning":
        return <Badge variant="warning">⚠️ Needs Attention</Badge>;
      case "locked":
        return <Badge variant="secondary">🔒 Locked</Badge>;
      default:
        return <Badge variant="success">✅ Safe</Badge>;
    }
  };

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
            <span className="text-muted-foreground">john@example.com</span>
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
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-lighter rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-muted-foreground text-sm">Digital Assets</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-legacy-light rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-legacy-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-muted-foreground text-sm">Beneficiaries</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success-light rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-muted-foreground text-sm">Protected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-trust-light rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-trust" />
                </div>
                <div>
                  <p className="text-2xl font-bold">90</p>
                  <p className="text-muted-foreground text-sm">Days Trigger</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Digital Assets */}
        <Card className="border-0 shadow-card mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Your Digital Assets</CardTitle>
              <Button variant="primary" asChild>
                <Link to="/assets">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Asset
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assets.map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <asset.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{asset.name}</h3>
                      <p className="text-sm text-muted-foreground">{asset.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{asset.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {asset.beneficiaries.length} beneficiary(ies)
                      </p>
                    </div>
                    {getStatusBadge(asset.status)}
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
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