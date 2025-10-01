import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BeneficiaryManagement = () => {
  const [user, setUser] = useState<any>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBeneficiaries, setNewBeneficiaries] = useState<
    { email: string; relationship: string }[]
  >([{ email: "", relationship: "" }]);
  const navigate = useNavigate();

  // Check session
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (!data.user) navigate("/auth");
    });
  }, [navigate]);

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

  // Fetch assets + beneficiaries
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
          beneficiaries:beneficiaries(id, email, relationship)
        `)
        .eq("profile_id", profileId);

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

  // Add beneficiary to asset
  const handleAddBeneficiaries = async (assetId: string) => {
    try {
      const toInsert = newBeneficiaries
        .filter((b) => b.email.trim() !== "")
        .map((b) => ({ ...b, asset_id: assetId, user_id: user.id }));

      if (toInsert.length === 0) return;

      const { error } = await supabase.from("beneficiaries").insert(toInsert);
      if (error) throw error;

      setNewBeneficiaries([{ email: "", relationship: "" }]);
      fetchAssets();
    } catch (err: any) {
      console.error("Error adding beneficiaries:", err);
    }
  };

  // Remove a beneficiary
  const handleRemoveBeneficiary = async (id: string) => {
    try {
      const { error } = await supabase.from("beneficiaries").delete().eq("id", id);
      if (error) throw error;
      fetchAssets();
    } catch (err: any) {
      console.error("Error removing beneficiary:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Manage Beneficiaries</h1>

      {loading ? (
        <p>Loading assets...</p>
      ) : assets.length === 0 ? (
        <p>No assets found.</p>
      ) : (
        <div className="space-y-6">
          {assets.map((asset) => (
            <div key={asset.id} className="border rounded-lg p-4">
              <h2 className="font-semibold mb-2">{asset.name}</h2>
              <ul className="mb-2">
                {asset.beneficiaries?.map((b: any) => (
                  <li key={b.id} className="flex justify-between">
                    <span>
                      {b.email} ({b.relationship})
                    </span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveBeneficiary(b.id)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>

              <div className="space-y-2">
                {newBeneficiaries.map((b, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Email"
                      value={b.email}
                      onChange={(e) => {
                        const copy = [...newBeneficiaries];
                        copy[i].email = e.target.value;
                        setNewBeneficiaries(copy);
                      }}
                      className="border p-1 flex-1"
                    />
                    <input
                      type="text"
                      placeholder="Relationship"
                      value={b.relationship}
                      onChange={(e) => {
                        const copy = [...newBeneficiaries];
                        copy[i].relationship = e.target.value;
                        setNewBeneficiaries(copy);
                      }}
                      className="border p-1 flex-1"
                    />
                  </div>
                ))}
                <div className="flex gap-2 mt-2">
                  <Button
                    onClick={() =>
                      setNewBeneficiaries([
                        ...newBeneficiaries,
                        { email: "", relationship: "" },
                      ])
                    }
                  >
                    Add Another
                  </Button>
                  <Button
                    onClick={() => handleAddBeneficiaries(asset.id)}
                    variant="primary"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BeneficiaryManagement;
