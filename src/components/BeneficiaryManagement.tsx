import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  ArrowLeft,
  Users, 
  Settings,
  Plus,
  Edit,
  Trash,
  Mail,
  Phone,
  Heart,
  UserCheck
} from "lucide-react";
import { Link } from "react-router-dom";

const BeneficiaryManagement = () => {
  const beneficiaries = [
    {
      id: 1,
      name: "Sarah Doe",
      relationship: "Spouse",
      email: "sarah.doe@email.com",
      phone: "+1 (555) 123-4567",
      assets: ["Gmail", "Google Drive", "Bank Account"],
      verified: true,
      trustedContact: true
    },
    {
      id: 2,
      name: "Emma Doe", 
      relationship: "Daughter",
      email: "emma.doe@email.com",
      phone: "+1 (555) 234-5678",
      assets: ["Instagram", "Photo Library"],
      verified: false,
      trustedContact: false
    },
    {
      id: 3,
      name: "Michael Doe",
      relationship: "Son",
      email: "michael.doe@email.com", 
      phone: "+1 (555) 345-6789",
      assets: ["Crypto Wallet"],
      verified: true,
      trustedContact: true
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
          <h1 className="text-3xl font-bold mb-2">Manage Beneficiaries</h1>
          <p className="text-muted-foreground">
            Add and manage the trusted people who will receive your digital assets and legacy messages.
          </p>
        </div>

        {/* Add New Beneficiary Card */}
        <Card className="border-0 shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Beneficiary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="e.g., Sarah Doe" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Input id="relationship" placeholder="e.g., Spouse, Child, Parent, Friend" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="their.email@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-trust-light rounded-lg">
              <UserCheck className="h-5 w-5 text-trust" />
              <div>
                <p className="font-medium">Trusted Contact</p>
                <p className="text-sm text-muted-foreground">
                  This person can help verify your passing and trigger the release of your digital legacy.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="primary">Add Beneficiary</Button>
              <Button variant="outline">Add & Assign Assets</Button>
            </div>
          </CardContent>
        </Card>

        {/* Existing Beneficiaries */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Your Beneficiaries ({beneficiaries.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {beneficiaries.map((beneficiary) => (
                <div key={beneficiary.id} className="p-6 rounded-lg border bg-card/50 hover:shadow-card transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-legacy-light rounded-full flex items-center justify-center">
                        <Heart className="h-6 w-6 text-legacy-foreground" />
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg">{beneficiary.name}</h3>
                          <p className="text-muted-foreground">{beneficiary.relationship}</p>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{beneficiary.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{beneficiary.phone}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Will receive access to:</p>
                          <div className="flex flex-wrap gap-2">
                            {beneficiary.assets.map((asset, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {asset}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {beneficiary.verified ? (
                            <Badge variant="success">✅ Verified</Badge>
                          ) : (
                            <Badge variant="warning">⚠️ Needs Verification</Badge>
                          )}
                          
                          {beneficiary.trustedContact && (
                            <Badge variant="outline" className="bg-trust-light text-trust-foreground border-trust">
                              <UserCheck className="h-3 w-3 mr-1" />
                              Trusted Contact
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Assign Assets
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Contact Info */}
            <div className="mt-8 p-6 bg-primary-lighter rounded-lg">
              <div className="flex items-start gap-3">
                <UserCheck className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">About Trusted Contacts</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Trusted contacts can help verify your passing and trigger the release of your digital legacy. 
                    We recommend having at least 2 trusted contacts for security.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Current trusted contacts: {beneficiaries.filter(b => b.trustedContact).length} of {beneficiaries.length}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BeneficiaryManagement;
