import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Clock, Heart, Lock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary-lighter/20">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">LegacyVault</span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" asChild>
            <Link to="/auth">Sign In</Link>
          </Button>
          <Button variant="primary" asChild>
            <Link to="/dashboard">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-foreground mb-6">
          Your Digital Legacy,
          <br />
          <span className="bg-gradient-to-r from-primary to-trust bg-clip-text text-transparent">
            Safely Preserved
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Securely manage what happens to your digital accounts, passwords, and precious memories. 
          Your data is encrypted — only you and your chosen people can ever unlock it.
        </p>
        <div className="flex gap-4 justify-center mb-12">
          <Button variant="hero" size="lg" className="text-lg px-8 py-4" asChild>
            <Link to="/dashboard">Start Protecting Your Legacy</Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4">
            Learn More
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex justify-center items-center gap-8 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <span>Bank-Grade Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span>Zero-Access Architecture</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>GDPR Compliant</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">How LegacyVault Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-6 border-0 shadow-card">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary-lighter rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Storage</h3>
              <p className="text-muted-foreground">
                Store your digital accounts, passwords, and important files with military-grade encryption.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-0 shadow-card">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-legacy-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-legacy-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose Beneficiaries</h3>
              <p className="text-muted-foreground">
                Assign trusted people to receive specific accounts, files, or messages when the time comes.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-0 shadow-card">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-trust-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-trust" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Automated Release</h3>
              <p className="text-muted-foreground">
                Set up time-based or contact-verified triggers to ensure your legacy reaches the right people.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Digital Legacy?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of people who trust LegacyVault to protect what matters most to them and their loved ones.
          </p>
          <Button variant="hero" size="lg" className="text-lg px-8 py-4" asChild>
            <Link to="/dashboard">Get Started for Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">LegacyVault</span>
          </div>
          <p>Protecting digital legacies with trust and security.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;