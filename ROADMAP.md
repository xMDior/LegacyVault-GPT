# LeagacyVault – MVP Roadmap

---

## Week 1 – Supabase Integration & Foundation (Milestone 1)
**Goal:** Users can sign up, log in, and access a blank dashboard.

### Tasks
- [ ] Setup Supabase project (auth, DB, storage).
- [ ] Configure `.env` with Supabase URL + anon/public key.
- [ ] Create DB tables:
  - `users`
  - `assets`
  - `beneficiaries`
  - `messages`
- [ ] Connect app to Supabase (frontend & backend).
- [ ] Implement signup/login/logout flow.
- [ ] Create a blank dashboard page shown after login.

---

## Week 2 – Asset & Beneficiary Input (Milestone 2)
**Goal:** Users can add assets and assign beneficiaries.

### Tasks
- [ ] Build "Add Asset" form (asset name, type, description).
- [ ] Create "Assign Beneficiary" step (email, relationship).
- [ ] Store asset + beneficiary mapping in DB.
- [ ] Display list of assets + beneficiaries on dashboard.

---

## Week 3 – Beneficiary Rules (Milestone 3)
**Goal:** Users can define what happens to each asset.

### Tasks
- [ ] Add per-asset action options (Transfer / Delete / Memorialize).
- [ ] Store action rules in DB.
- [ ] Display rules in dashboard list view.

---

## Week 4 – Release Mechanism (Milestone 4)
**Goal:** Vault can trigger release when user misses check-ins.

### Tasks
- [ ] Add "check-in frequency" setting (heartbeat).
- [ ] Create an "I'm Alive" button in dashboard.
- [ ] Setup Supabase scheduled function (cron) to check missed heartbeats.
- [ ] Mark account as "inactive" if no check-in after threshold.

---

## Week 5 – Legacy Messages (Milestone 5)
**Goal:** Users can leave private text messages for beneficiaries.

### Tasks
- [ ] Add text message creation form.
- [ ] Encrypt + store messages in DB.
- [ ] Link messages to specific beneficiaries.
- [ ] Add preview/manage messages UI.

---

## Week 6 – File Support & Messaging Upgrade (Milestone 6)
**Goal:** Users can upload media (audio/video) for beneficiaries.

### Tasks
- [ ] Enable media upload via Supabase storage.
- [ ] Add playback support in frontend.
- [ ] Link uploads to messages.
- [ ] Display uploaded media in dashboard.

---

## Week 7 – Dashboard & Wizard Polish (Milestone 7)
**Goal:** Make onboarding smooth with guided setup.

### Tasks
- [ ] Build setup wizard:
  1. Create account
  2. Add first asset
  3. Assign beneficiary
  4. Pick release method
  5. Done
- [ ] Add status indicators (✅ Complete / ⚠ Missing / ⏳ Pending).
- [ ] Add check-in reminders/notifications.

---

## Week 8 – Demo-Ready MVP (Milestone 8)
**Goal:** Deliver a working demo MVP.

### Tasks
- [ ] Polish UI with Tailwind + icons.
- [ ] Add landing page with demo info.
- [ ] Security pass (basic encryption + Supabase rules).
- [ ] Add “force trigger” demo mode for testing releases.
- [ ] Final bug fixes + deploy MVP.

---

## Post-MVP (Future Ideas)
- Smart estate export (lawyer-ready PDF).
- Blockchain notarization for asset authenticity.
- AI assistant for estate planning advice.
- Multi-language support.
- Mobile app version.
