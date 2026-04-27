# Subscription Management Dashboard — Phase 1 MVP Design

**Date:** 2026-04-26  
**Scope:** Phase 1 MVP (Employee, Admin, Finance dashboards + request workflow)  
**Framework:** SAPUI5 with SAP Horizon theme  
**Component Target:** Use 20+ of 25 verified components  
**Output:** HTML5 demo + production-ready JSON

---

## 1. Overview

A **multi-role subscription management application** for enterprises to:
- **Employees** request and track software/service subscriptions
- **Admins** approve requests and manage vendors
- **Finance** track spending, budgets, and cost analysis

**Phase 1 covers:** Role-based dashboards, request workflow, vendor management, cost tracking.  
**Future phases:** Notifications, integrations, advanced reporting, budget forecasting.

---

## 2. Architecture

### 2.1 Application Structure

```
App (root)
├── Page (dynamic content based on role)
│   ├── Sidebar Navigation (role-specific menu)
│   ├── Main Content Area
│   │   ├── Dashboard Section (role-specific KPIs, cards)
│   │   ├── List/Detail Section (subscriptions, requests, approvals)
│   │   └── Form Section (request new, approve, edit vendor)
│   └── Toolbar (action buttons, filters)
└── Global Data Model (JSONModel with all application state)
```

### 2.2 Navigation Strategy

**Role-Based Sidebar Menu:**

| Employee | Admin | Finance |
|----------|-------|---------|
| Dashboard | Dashboard | Dashboard |
| My Subscriptions | All Subscriptions | Cost Analysis |
| Request New | Pending Approvals | Budget Overview |
| My Requests | Vendors | Vendor Payments |

**Role Indicator:** "Logged in as: [Name] ([Role])" at top of sidebar.

### 2.3 Data Model (JSONModel)

```javascript
{
  currentUser: {
    id: "user1",
    name: "John Smith",
    role: "employee", // "employee" | "admin" | "finance"
    department: "Engineering"
  },
  subscriptions: [
    {
      id: "sub1",
      name: "Slack",
      vendor: "Slack Inc",
      cost: 12.50,
      currency: "USD",
      billingCycle: "monthly",
      status: "active", // "active" | "pending" | "expired" | "inactive"
      renewalDate: "2026-05-15",
      department: "Engineering",
      requestedBy: "user1",
      approvedBy: "admin1",
      approvedDate: "2026-03-15"
    }
  ],
  requests: [
    {
      id: "req1",
      requesterId: "user1",
      requesterName: "John Smith",
      subscriptionName: "Jira Cloud",
      vendor: "Atlassian",
      description: "Project management tool for development team",
      justification: "Need for sprint planning and bug tracking",
      department: "Engineering",
      estimatedCost: 25.00,
      currency: "USD",
      status: "pending", // "pending" | "approved" | "rejected"
      requestDate: "2026-04-20",
      approvedDate: null,
      approvedBy: null,
      rejectionReason: null
    }
  ],
  vendors: [
    {
      id: "vendor1",
      name: "Slack Inc",
      contactEmail: "sales@slack.com",
      contactPhone: "+1-415-555-0123",
      contractTerms: "Annual subscription",
      renewalSchedule: "2026-05-15",
      totalAnnualCost: 150.00,
      subscriptionCount: 12
    }
  ],
  budgets: [
    {
      id: "budget1",
      department: "Engineering",
      annualBudget: 50000,
      spent: 18750,
      remaining: 31250,
      utilization: 37.5
    }
  ]
}
```

**Role-Based Data Access:**
- **Employee:** Can see only own subscriptions and requests
- **Admin:** Can see all subscriptions, all requests, all vendors
- **Finance:** Can see all cost data, budgets, vendor payments

---

## 3. Role-Specific Dashboards

### 3.1 Employee Dashboard

**Purpose:** Overview of personal subscriptions and request status

**Components:**
- **KPI Cards (Card):**
  - "Active Subscriptions" (count)
  - "Pending Requests" (count)
  - "Next Renewal" (date)
  - "Total Monthly Cost" (amount)

- **Recent Activity Section (Panel):**
  - Last 3 subscription changes in Table (columns: Subscription, Action, Date)

- **Quick Action Button (Button):**
  - "Request New Subscription" → Opens request form

**Data Binding:** Filter subscriptions where requestedBy = currentUser.id

---

### 3.2 Admin Dashboard

**Purpose:** Overview of all subscriptions and pending approvals

**Components:**
- **KPI Cards (Card):**
  - "Total Subscriptions" (count)
  - "Pending Approvals" (count)
  - "Expiring Soon" (count, next 30 days)
  - "Budget Remaining" (% or amount)

- **Pending Approvals Section (Panel):**
  - Table with columns: Requester, Subscription, Department, Requested Date, Cost
  - Row actions: "View Details", "Approve", "Reject"
  - DetailPanel on row click showing full request + inline approve/reject buttons

- **Vendor Alert Section (Panel):**
  - Simple list or table of vendors with renewal dates < 30 days
  - Status color-coded (ObjectStatus): Success (>30 days), Warning (7-30 days), Error (<7 days)

---

### 3.3 Finance Dashboard

**Purpose:** Cost tracking, budget monitoring, spending trends

**Components:**
- **KPI Cards (Card):**
  - "Annual Spend" (sum of all subscription costs × 12 or actual)
  - "Monthly Burn Rate" (average or current month)
  - "Budget Utilization %" (total spent / total budgets)
  - "Vendor Count" (number of active vendors)

- **Spending by Department (Panel with Table):**
  - Columns: Department, Annual Budget, Spent YTD, Remaining, % Utilized
  - ProgressBar (via styling) showing budget utilization
  - Click department → drills down to subscriptions for that department

- **Top Vendors (Panel with Table):**
  - Columns: Vendor, Annual Cost, Subscription Count, Renewal Date
  - Sorted by cost (descending)

- **Budget Status (Panel with Cards or Table):**
  - One Card per department showing budget health
  - Color: Green (under 75%), Yellow (75-90%), Red (>90%)

---

## 4. Key Workflows

### 4.1 Employee Request Workflow

**Flow:**
1. Employee clicks "Request New Subscription"
2. Form opens (Panel with form fields):
   - **Subscription Name** (Input, required)
   - **Description** (TextArea or Text, required)
   - **Vendor** (ComboBox with typeahead search, required)
   - **Justification** (TextArea, required, 100+ chars)
   - **Department** (Select, pre-filled, required)
   - **Estimated Cost** (Input numeric, required)
   - **Estimated Renewal Date** (DatePicker, optional)
3. Validation: All required fields, cost > 0, justification length check
4. On submit:
   - Add request to requests array with status="pending"
   - MessageToast: "Request submitted successfully"
   - Form clears
5. Employee can view request in "My Requests" with status badge (ObjectStatus)

---

### 4.2 Admin Approval Workflow

**Flow:**
1. Admin views "Pending Approvals" section on dashboard
2. Table shows all pending requests
3. Admin clicks request row → Detail view opens (Panel)
   - Full request details
   - Requester info (Link to requester details if needed)
   - Vendor info (Link to vendor details)
4. Admin can:
   - **Approve:** Button action
     - Updates request.status = "approved"
     - Adds to subscriptions list (creates new subscription record)
     - MessageBox confirmation: "Approve this subscription?"
     - MessageToast: "Subscription approved and activated"
   - **Reject:** Button action
     - Opens TextArea for rejection reason (optional)
     - Updates request.status = "rejected", stores rejection reason
     - MessageBox warning: "This will reject the request. Continue?"
     - MessageToast: "Request rejected"
5. Request no longer appears in "Pending Approvals"
6. Requester can see rejection reason in "My Requests"

---

### 4.3 Vendor Management

**Admin Only — Workflow:**

1. Admin navigates to "Vendors" section
2. **View Vendors Table:**
   - Columns: Vendor Name, Contact Email, Contact Phone, Renewal Date, Annual Cost, # Subscriptions
   - Action icons: "View Details" (Link), "Edit" (Button)
3. **View Details:**
   - Panel shows vendor info (name, email, phone, contract terms, renewal schedule)
   - Button: "Edit Vendor" (opens form)
4. **Edit Vendor:**
   - Form with editable fields (Name, Email, Phone, Contract Terms, Renewal Date)
   - Save/Cancel buttons
   - MessageToast: "Vendor updated"

---

## 5. SAPUI5 Component Usage

**Target: 20+ of 25 verified components**

| Component | Usage | Count |
|-----------|-------|-------|
| **Layout** | | |
| App | Root container | 1 |
| Page | Main content area | 1 |
| VBox | Vertical layouts (dashboards, forms) | 4-6 |
| HBox | Horizontal layouts (KPI card rows) | 2-3 |
| Panel | Dashboard sections, form containers | 6-8 |
| Toolbar | Action buttons, filters | 2-3 |
| **Data Display** | | |
| Table | Subscriptions, requests, approvals, vendors | 5-6 |
| Column | Table columns | 15-20 |
| ColumnListItem | Table rows with data binding | 5-6 |
| List | Request history, activity feed | 2 |
| ObjectListItem | Styled list items | 2 |
| Card | KPI cards on dashboards | 8-10 |
| ObjectStatus | Status badges (Active, Pending, Approved, Rejected) | 5-8 |
| **Input & Forms** | | |
| Input | Text fields (subscription name, vendor name, email) | 5-7 |
| ComboBox | Vendor selection with search | 1-2 |
| Select | Department, status filters, role selector | 3-4 |
| DatePicker | Renewal dates, request dates | 2-3 |
| CheckBox | Optional filters (e.g., "Show inactive") | 1-2 |
| SearchField | Search subscriptions, vendors | 1-2 |
| TextArea | Justification, rejection reason (via Input extended) | 2 |
| **Actions & Navigation** | | |
| Button | Approve, reject, request, save, edit, delete | 10+ |
| Link | Navigation to details, drill-down | 3-5 |
| Icon | Status indicators, visual markers | 3-5 |
| Image | Vendor logos (optional) | 1-2 |
| **Feedback** | | |
| MessageBox | Confirmations (approve, reject) | 2-3 calls |
| MessageToast | Success, error messages | 5-8 calls |

**Design Tokens Applied:**
- **sapUiSizeCompact** on Page (density)
- **sapUiContentPadding** on Page content
- **sapUiSmallMarginBottom** on Panels, Cards
- **Theme:** sap_horizon (blue #0a6ed1, grays, semantic colors)

---

## 6. Form Validations & Error Handling

**Request Form Validation:**
- Subscription Name: Required, non-empty
- Vendor: Required, must select from list
- Justification: Required, min 20 characters
- Cost: Required, must be > 0, numeric only
- Department: Required, pre-filled but selectable

**Vendor Edit Form Validation:**
- Name: Required, non-empty
- Email: Optional, must be valid email format (regex)
- Phone: Optional, basic format check
- Renewal Date: Optional, must be future date

**Error Messages:**
- MessageBox for validation errors: "Please fill in all required fields"
- Field-level error indicators (via Input's valueState property)

**Success Feedback:**
- MessageToast on successful submit/approve/reject
- Form clears and table refreshes

---

## 7. Sample Data

**3 users (simulated login via role selector):**
1. John Smith (Employee, Engineering)
2. Alice Chen (Admin, IT)
3. Bob Davis (Finance, Finance)

**5 sample subscriptions:**
- Slack (active, $150/month, Engineering)
- Jira Cloud (pending approval, $50/month, Engineering)
- GitHub Pro (active, $21/month, Engineering)
- Figma (active, $30/month, Design)
- Zoom (active, $199.99/month, shared)

**3 pending requests:**
- Notion (John Smith, $10/month, pending approval)
- Asana (Jane Doe, $30/month, pending approval)
- Linear (Mike Johnson, $20/month, pending approval)

**3 vendors:**
- Slack Inc, Atlassian, GitHub

**Budget by department:**
- Engineering: $5000 annual, $1200 spent (24%)
- Design: $2000 annual, $720 spent (36%)
- Finance: $1000 annual, $200 spent (20%)

---

## 8. Output Format

**Two deliverables:**

1. **JSON Structure** (`subscription-app-phase1.json`):
   - ui_tree: Complete component hierarchy
   - sapui5.xml_view: XML markup for SAPUI5
   - sapui5.controller_js: Controller with workflows
   - meta: Design system metadata

2. **HTML5 Demo** (`subscription-app-demo.html`):
   - CSS/HTML replica for preview/presentation
   - Fully functional interactivity (role switching, form submission, approvals)
   - SAP Horizon styling

---

## 9. Success Criteria (Phase 1)

✅ **Validation:**
- JSON schema compliant
- All components from verified registry
- Zero hallucinations
- Design token compliance (sapUiSizeCompact, sapUiContentPadding, sap_horizon)
- Validation score ≥ 90/100

✅ **Functionality:**
- All 3 dashboards render correctly
- Request workflow end-to-end (submit → approve → reject)
- Vendor management (view, edit)
- Role-based data filtering working
- Form validations functional
- MessageBox/MessageToast confirmations working

✅ **UX:**
- Clear navigation by role
- Responsive layout (VBox/HBox)
- Professional SAP styling
- Intuitive workflows

---

## 10. Future Phases (Out of Scope for Phase 1)

- **Phase 2:** Notifications (email on approval), integrations (sync to finance systems)
- **Phase 3:** Advanced reporting (PDF export, charts), audit trail
- **Phase 4:** Budget forecasting, predictive analytics, multi-company support

---

## 11. Assumptions & Constraints

**Assumptions:**
- Single session (no real authentication; role switched via UI)
- Data in memory (JSONModel; no backend calls)
- HTML5 demo environment (SAPUI5 CDN unavailable)

**Constraints:**
- Phase 1 limited to 3 roles (employee, admin, finance)
- No real backend integration
- Sample data hardcoded
- No user account creation (pre-seeded users)

---

**Design approved and ready for implementation planning.**
