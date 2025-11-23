export type Language = "en" | "ar";

export const translations = {
  en: {
    common: {
      home: "Home",
      stores: "Stores",
      topProducts: "Top Products",
      deals: "Deals",
      login: "Log in",
      signup: "Sign up",
      register: "Register",
      favorites: "Favorites",
      cart: "Cart",
      account: "Account",
      notifications: "Notifications",
      settings: "Settings",
      logout: "Log out",
      search: "Search",
      dashboard: "Dashboard",
      theme: "Theme",
      language: "Language",
      english: "English",
      arabic: "Arabic",
      guest: "Guest User",
      guestDesc: "Sign in to access all features",
      signIn: "Sign In",
      createAccount: "Create account",
      pages: "Pages",
      contact: "Contact",
      checkout: "Checkout",
      subtotal: "Subtotal",
      viewAll: "View all",
      goDashboard: "Go to dashboard",
      accountOverview: "Account overview",
      workspaceSettings: "Workspace settings",
      quickLogin: "Quick login",
      quickReg: "Quick registration",
      email: "Email",
      password: "Password",
      fullName: "Full name",
      yourWorkspace: "Your workspace",
      yourAccount: "Your account",
      access: "access",
      emailOrPhone: "Email or Phone",
      phone: "Phone",
      firstName: "First Name",
      lastName: "Last Name",
      confirmPassword: "Confirm Password",
      emailAlerts: "Email alerts",
      marketplaceTips: "Marketplace tips",
      darkMode: "Dark mode",
      newRfqActivity: "New RFQ activity",
      buyersSearching: "Buyers are searching in Electronics.",
      supplierAccepted: "Supplier accepted",
      techHubConfirmed: "TechHub Electronics confirmed interest.",
      trialReminder: "Trial reminder",
      activatePlan: "Activate your plan to keep analytics.",
      brandName: "TajirJomla Hub",
    },
    footer: {
      subscribeTitle: "Subscribe to our newsletter",
      subscribeDesc:
        "Your trusted multi-vendor marketplace connecting buyers with quality stores worldwide.",
      subscribeBtn: "Subscribe",
      emailPlaceholder: "Enter your email",
      company: "Company",
      helpCenter: "Help Center",
      legal: "Legal",
      aboutUs: "About Us",
      services: "Services",
      careers: "Careers",
      press: "Press",
      customerSupport: "Customer Support",
      shippingInfo: "Shipping Info",
      faqs: "FAQs",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      cookiePolicy: "Cookie Policy",
      sellerAgreement: "Seller Agreement",
      returnsRefunds: "Returns & Refunds",
      rightsReserved: "All rights reserved.",
    },
    nav: {
      home: "Home",
      stores: "Stores",
      topProducts: "Top Products",
      deals: "Deals",
    },
    auth: {
      login: {
        emailOrPhone: "Email or Phone",
        password: "Password",
        signingIn: "Signing in...",
        signIn: "Sign In",
        dontHaveAccount: "Don't have an account?",
        createAccount: "Create account",
      },
      register: {
        firstName: "First Name",
        lastName: "Last Name",
        phone: "Phone",
        confirmPassword: "Confirm Password",
        iWantTo: "I want to",
        sellProducts: "Sell Products (Supplier)",
        buyProducts: "Buy Products (Trader)",
        businessName: "Business Name",
        businessType: "Business Type",
        creatingAccount: "Creating account...",
        register: "Register",
        alreadyHaveAccount: "Already have an account?",
        signIn: "Sign in",
      },
    },
    home: {
      hero: {
        title: "Discover Extraordinary Products",
        description:
          "Connect with top-tier suppliers and discover unique items from around the world. Secure payments, verified sellers, and seamless logistics.",
        placeholder: "Search products, stores, brands...",
        quickFilters: "Quick Filters",
      },
      requestItem: "Request Item",
      stats: {
        activeUsers: "Active Users",
        verifiedSellers: "Verified Sellers",
        productsListed: "Products Listed",
      },
      featuredStores: {
        title: "Featured Stores",
        description: "Shop from our most trusted and top-rated sellers",
        viewAll: "View All Stores",
        visitStore: "Visit Store",
      },
      bestSellers: {
        title: "Best Sellers",
        description: "Top-rated products flying off the shelves",
        viewAll: "View All Products",
      },
      trust: {
        title: "Trusted by Businesses Worldwide",
      },
      categories: {
        title: "Browse by Category",
        "cat-electronics": "Electronics",
        "cat-fashion": "Fashion",
        "cat-home": "Home",
        "cat-sports": "Sports",
        "cat-beauty": "Beauty",
        "cat-gaming": "Gaming",
        "cat-books": "Books",
      },
      storesPage: {
        hero: {
          title: "Discover Amazing Stores",
          description:
            "Explore a curated collection of independent stores, brands, and creators. Find unique products and support small businesses.",
        },
        searchPlaceholder: "Search stores by name, category, or description...",
        featuredStore: "Featured Store",
        visitStore: "Visit Store",
        filters: {
          all: "All Stores",
          topRated: "Top Rated",
          newest: "Newest",
          showing: "Showing",
          stores: "stores",
        },
        visit: "Visit",
        noStores: {
          title: "No stores found",
          description:
            "We couldn't find any stores matching your search. Try checking for typos or using different keywords.",
          clear: "Clear filters",
        },
        cta: {
          title: "Start your own store today",
          description:
            "Join thousands of merchants growing their business on {brandName}. Setup is easy and takes less than 5 minutes.",
          becomeSeller: "Become a Seller",
          learnMore: "Learn More",
        },
      },
      topProductsPage: {
        hero: {
          title: "Top Performing Products",
          description:
            "Discover high-demand inventory with real-time market signals. Source smarter with data-driven insights.",
        },
        filters: "Filters",
        clearFilters: "Clear all",
        showingResults: "Showing {count} of {total} results",
        by: "by",
        filterLabels: {
          category: "Category",
          allCategories: "All Categories",
          momentum: "Momentum",
          allMomentum: "All Momentum",
          brand: "Brand",
          allBrands: "All Brands",
          minPrice: "Min Price",
          minPricePlaceholder: "0",
          maxPrice: "Max Price",
          maxPricePlaceholder: "No limit",
        },
        momentum: {
          surging: "Surging",
          emerging: "Emerging",
          steady: "Steady",
        },
        cta: {
          title: "Turn these signals into purchase orders",
          description:
            "MarketHub surfaces marketplace intelligence so you can move fast. Activate your account to receive tailored recommendations and RFQ flows.",
          createAccount: "Create Free Account",
          viewSubscriptions: "View Subscriptions",
        },
      },
      plansPage: {
        mostPopular: "MOST POPULAR",
        compareFeatures: "Compare Features",
        plans: {
          free: {
            name: "Free Preview",
            description:
              "Browse public marketplace teasers and evaluate {brandName} before subscribing.",
          },
          supplier: {
            name: "Supplier Plan",
            description:
              "Operational workspace for suppliers to manage catalogs, orders, and analytics.",
          },
          trader: {
            name: "Trader Plan",
            description:
              "End-to-end workspace for traders managing sourcing, stores, and inventory.",
          },
        },
        table: {
          feature: "Feature",
          free: "Free",
          supplier: "Supplier",
          trader: "Trader",
          features: {
            marketplaceAccess: "Marketplace Access",
            productSearch: "Product Search",
            viewPricing: "View Pricing",
            inventoryManagement: "Inventory Management",
            rfqResponses: "RFQ Responses",
            bulkOrdering: "Bulk Ordering",
            prioritySupport: "Priority Support",
            apiAccess: "API Access",
          },
          status: {
            limited: "Limited",
            full: "Full",
          },
        },
        card: {
          free: "Free",
          perMonth: "/mo",
          startTrialDays: "Start {days}-day trial",
          startTrial: "Start trial",
          currentPlan: "Current plan",
          activateAfterTrial: "Activate after trial",
          activatePlan: "Activate plan",
          startingTrial: "Starting trial...",
          activating: "Activating...",
          included: "Included for all accounts",
          trialActive: "Trial active",
          ends: "Ends",
          badges: {
            active: "Active",
            trialActive: "Trial active",
            trialExpired: "Trial expired",
          },
        },
        features: {
          free: {
            feature1: "Access to public landing pages",
            feature2: "Featured categories preview",
            feature3: "Featured stores carousel",
            feature4: "Best sellers teaser data",
          },
          supplier: {
            feature1: "Supplier dashboard & analytics",
            feature2: "Product catalog management (CRUD)",
            feature3: "Order pipeline with status updates",
            feature4: "Real-time order notifications",
            feature5: "Access to trader inquiries",
          },
          trader: {
            feature1: "Trader dashboard & analytics",
            feature2: "Multi-store management",
            feature3: "Inventory sync across suppliers",
            feature4: "Order tracking & team collaboration",
            feature5: "Supplier performance insights",
          },
        },
      },
      searchPage: {
        showingResultsFor: "Showing results for",
        noResults: {
          title: "No results found",
          description:
            'We couldn\'t find anything matching "{query}". Try adjusting your search or filters.',
          defaultDescription:
            "Try searching for products, stores, or categories",
          browseCategories: "Browse Categories",
          viewAllStores: "View All Stores",
        },
        filters: {
          title: "Filters",
          clearAll: "Clear all",
          category: "Category: {category}",
        },
        results: {
          found: "Found {products} products, {stores} stores",
          foundIn: "Found {products} products in {category}",
          sortBy: "Sort by:",
          sortOptions: {
            relevance: "Relevance",
            priceAsc: "Price: Low to High",
            priceDesc: "Price: High to Low",
          },
          related: "Related:",
          products: "Products",
          stores: "Stores",
          categories: "Categories",
          visitStore: "Visit Store",
          rating: "{rating} rating",
        },
        badges: {
          surging: "Surging",
        },
      },
      cartPage: {
        title: "Shopping Cart",
        description: "Review your selected items and proceed to checkout",
        item: "item",
        items: "items",
        itemsCount: "in your cart",
        showingItems: "Showing {shown} of {total} items",
        totalInCart: "({total} total in cart)",
        each: "each",
        empty: {
          title: "Your cart is empty",
          description: "Browse our products and add items to your cart",
          browseProducts: "Browse Products",
        },
        filters: {
          title: "Filters",
          clearAll: "Clear all",
          noMatch: {
            title: "No items match your filters",
            description: "Try adjusting your filter criteria",
          },
          category: {
            label: "Category",
            all: "All Categories",
          },
          brand: {
            label: "Brand",
            all: "All Brands",
          },
          minPrice: {
            label: "Min Price",
            placeholder: "0",
          },
          maxPrice: {
            label: "Max Price",
            placeholder: "No limit",
          },
        },
        orderSummary: {
          title: "Order Summary",
          items: "Items ({count})",
          subtotal: "Subtotal",
          taxesNote:
            "Taxes and shipping costs are calculated at checkout based on supplier confirmation",
        },
        buttons: {
          proceedToCheckout: "Proceed to Checkout",
          moveToFavorites: "Move to Favorites",
          clearCart: "Clear Cart",
        },
        ariaLabels: {
          decreaseQuantity: "Decrease quantity",
          increaseQuantity: "Increase quantity",
          removeFromCart: "Remove from cart",
        },
      },
      favoritesPage: {
        title: "My Favorites",
        description: "{products} products and {stores} stores saved",
        emptySubtitle:
          "Save your favorite products and stores for quick access",
        loading: "Loading favorites...",
        supplierLabel: "Supplier",
        empty: {
          title: "No favorites yet",
          description:
            "Start adding products and stores to your favorites to see them here",
          browseProducts: "Browse Products",
          browseStores: "Browse Stores",
        },
        filters: {
          title: "Filters",
          clearAll: "Clear all",
          noMatch: {
            title: "No results match your filters",
            description: "Try adjusting your filter criteria",
          },
          type: {
            label: "Type",
            all: "All Types",
            productsOnly: "Products Only",
            storesOnly: "Stores Only",
          },
          category: {
            label: "Category",
            all: "All Categories",
          },
          rating: {
            label: "Minimum Rating",
            all: "All Ratings",
            option45: "4.5+ Stars",
            option40: "4.0+ Stars",
            option35: "3.5+ Stars",
          },
        },
        sections: {
          products: {
            title: "Favorite Products",
          },
          stores: {
            title: "Favorite Stores",
          },
        },
        buttons: {
          browseProducts: "Browse Products",
          browseStores: "Browse Stores",
          viewStore: "View Store",
        },
      },
      productPage: {
        description: "Product Description",
        marketSignals: "Market Signals",
        brand: "Brand:",
        reviews: "{rating} ({count} reviews)",
        securePayment: "Secure Payment",
        fastShipping: "Fast Shipping",
        freeReturns: "Free Returns",
        soldBy: "Sold by {name}",
        storeRating: "{rating} ({sales} sales)",
        visitStore: "Visit Store",
        supplierLabel: "Supplier",
        availabilityLabel: "Availability",
        actions: {
          inquiryMessage:
            "This product is available for inquiry. Contact the supplier for pricing.",
          inCart: "In cart",
        },
      },
      storePage: {
        reviews: "({count} reviews)",
        contactStore: "Contact Store",
        about: "About {name}",
        featuredProducts: "Featured Products",
        viewAll: "View all",
        storeInfo: "Store Information",
        website: "Website",
        verification: "Verification",
        verifiedSeller: "Verified Seller",
        rating: "Rating",
        sendMessage: "Send Message",
        productsFrom: "Products from {name}",
        location: "New York, USA",
      },
      accountPage: {
        guestPlan: "Guest plan",
        account: "Account",
        workspace: "workspace",
        memberSince: "Member since",
        role: {
          supplier: "Supplier",
          trader: "Trader",
        },
        signInRequired: {
          title: "Sign in to view your account",
          description:
            "Access your profile, manage subscriptions, and view your account details",
          signIn: "Sign in",
          createAccount: "Create Account",
          viewPlans: "View Plans →",
        },
        buttons: {
          openDashboard: "Open Dashboard",
          viewPlans: "View Plans",
        },
        profile: {
          title: "Profile Information",
          description: "Personal details and business information",
          edit: "Edit",
          updating: "Updating...",
          saveChanges: "Save Changes",
          cancel: "Cancel",
          fields: {
            fullName: "Full name",
            email: "Email",
            phone: "Phone",
            role: "Role",
            business: "Business",
            businessType: "Business type",
          },
        },
        subscription: {
          status: {
            freePreview: "Free preview",
            trialActive: "Trial active",
            trialEnded: "Trial ended",
            active: "Active subscription",
            expired: "Trial expired",
            canceled: "Canceled",
          },
          accessLevel: "Access level",
          trialEnds: "Trial ends",
          activated: "Activated",
          loading: "Subscription details will appear here shortly.",
          whatsIncluded: "What's Included",
          buttons: {
            activate: "Activate Full Access",
            activating: "Activating...",
            cancel: "Cancel Plan",
            canceling: "Canceling...",
            restartTrial: "Restart 1-day Trial",
            startingTrial: "Starting trial...",
          },
        },
        features: {
          guest: {
            feature1: "Marketplace browsing preview",
            feature2: "Saved stores and products",
            feature3: "Weekly highlights email",
          },
          supplier: {
            feature1: "Supplier dashboard overview",
            feature2: "Product catalog insights",
            feature3: "Order tracking previews",
            feature4: "RFQ highlights",
            feature5: "Team collaboration basics",
          },
          trader: {
            feature1: "Trader dashboard overview",
            feature2: "Store management preview",
            feature3: "Inventory tracking highlights",
            feature4: "Supplier shortlisting",
            feature5: "Order workflow insights",
          },
        },
        help: {
          title: "Need Help?",
          description:
            "Reach out to our team if you need to adjust your plan, add more teammates, or connect supplier analytics to your CRM stack.",
          contactSupport: "Contact Support",
          comparePlans: "Compare Plans",
        },
        errors: {
          signInRequired: "You need to sign in to manage your subscription.",
          loadSubscriptionFailed:
            "Something went wrong while loading your subscription.",
          updateSubscriptionFailed:
            "Unable to update your subscription right now.",
          updateProfileFailed: "Failed to update profile. Please try again.",
        },
        messages: {
          activated: "Subscription activated. Enjoy full workspace access!",
          canceled: "Subscription canceled. You're back on the free preview.",
          trialRestarted: "Trial restarted for another day.",
          trialEnded:
            "Your trial ended. Activate your plan to keep full access.",
          profileUpdated: "Profile updated successfully!",
        },
      },
      settingsPage: {
        title: "Settings",
        description:
          "Manage your notification preferences and privacy settings",
        communication: {
          title: "Communication",
          description:
            "Choose how MarketHub keeps you in the loop about RFQ activity and supplier responses.",
          emailAlerts: "Email alerts",
          weeklyDigest: "Weekly marketplace digest",
          smsNotifications: "SMS notifications",
        },
        privacy: {
          title: "Privacy",
          description:
            "Control who can view your sourcing activity and saved lists.",
          displayProfile: "Display profile to suppliers",
          allowMessages: "Allow message requests",
          shareSignals: "Share anonymous demand signals",
        },
        upgrade: {
          title: "Need more control?",
          description:
            "Advanced analytics, team roles, and single sign-on settings become available once you upgrade to a paid plan.",
          viewPlans: "View Plans",
        },
      },
      dashboard: {
        nav: {
          dashboard: "Dashboard",
          stores: "Stores",
          inventory: "Inventory",
          orders: "Orders",
        },
        mobileNav: {
          toggleMenu: "Toggle menu",
          user: "User",
          supplierAccount: "Supplier Account",
          traderAccount: "Trader Account",
          accountSettings: "Account Settings",
          signOut: "Sign Out",
        },
        gate: {
          errors: {
            verifySubscription: "Unable to verify your subscription.",
            verifyAccess: "Something went wrong while verifying access.",
          },
          loading: {
            title: "Checking your access",
            description: "Hang tight while we confirm your subscription details.",
          },
          unauthenticated: {
            title: "Sign in required",
            description: "Log in to unlock your supplier or trader workspace.",
            signIn: "Sign in",
            startTrial: "Start free trial",
          },
          planLabels: {
            supplier: "Supplier Plan",
            trader: "Trader Plan",
          },
          planRequired: {
            title: "{plan} required",
            manageSubscription: "Manage subscription",
            comparePlans: "Compare plans",
          },
          trialExpired: {
            description: "Your trial is over. Activate your plan to keep your analytics, workflow automations, and saved pipelines.",
          },
          planMismatch: {
            description: "Activate the correct plan to unlock this workspace. Your current subscription doesn't include access.",
          },
          trialCallout: {
            title: "Trial in progress",
            description: "You're previewing the {workspace}. Activate your plan to keep uninterrupted access once the trial ends.",
            supplierWorkspace: "Supplier workspace",
            traderWorkspace: "Trader workspace",
            ends: "Ends",
          },
        },
      },
      supplier: {
        dashboard: {
          title: "Supplier Dashboard",
          description: "Manage your products and orders",
          metrics: {
            totalProducts: "Total Products",
            totalProductsDesc: "Across all active categories",
            pendingOrders: "Pending Orders",
            pendingOrdersDesc: "Awaiting confirmation",
            inProcessing: "In Processing",
            inProcessingDesc: "Being prepared or shipped",
            revenue30d: "Revenue (30d)",
            revenue30dDesc: "From fulfilled orders",
          },
          buttons: {
            addProduct: "Add Product",
            reviewOrders: "Review Orders",
            viewAnalytics: "View Analytics",
            manage: "Manage",
            viewAllOrders: "View All Orders",
          },
          sections: {
            salesTrend: "Sales Trend",
            salesTrendDesc: "Revenue and shipment volume (last 6 months)",
            productHealth: "Product Health",
            productHealthDesc: "Quick view of catalog readiness",
            recentOrders: "Recent Orders",
            recentOrdersDesc: "Monitor progress and next fulfillment steps",
          },
          notifications: {
            liveUpdates: "Live order updates:",
            orderFulfilled: "Order {id} fulfilled",
            orderUpdated: "Order {id} updated to {status}",
          },
          table: {
            order: "Order",
            customer: "Customer",
            total: "Total",
            status: "Status",
            placed: "Placed",
          },
          status: {
            pending: "Pending",
            processing: "Processing",
            fulfilled: "Fulfilled",
            active: "Active",
            draft: "Draft",
          },
        },
        products: {
          title: "Products",
          description: "Manage your product catalog",
          editProduct: "Edit Product",
          createProduct: "Create Product",
          updateProduct: "Update product",
          createProductButton: "Create product",
          productList: "Product List",
          itemsCount: "{shown} item(s) • {total} total",
          filters: {
            allStatuses: "All statuses",
            activeOnly: "Active only",
            draftOnly: "Draft only",
          },
          status: {
            active: "Active",
            draft: "Draft",
          },
          sku: "SKU",
          inventory: "{count} units",
          category: "Category:",
          updated: "Updated",
          buttons: {
            edit: "Edit",
            delete: "Delete",
          },
          emptyState:
            "No products match this filter. Adjust the status or create a new product.",
          form: {
            labels: {
              productName: "Product name",
              sku: "SKU",
              category: "Category",
              inventory: "Inventory",
              status: "Status",
              description: "Description",
            },
            placeholders: {
              productName: "Enter product name",
              sku: "Enter SKU",
              category: "Enter category",
              inventory: "Enter inventory",
              description: "Enter description",
            },
            status: {
              active: "Active",
              draft: "Draft",
            },
            buttons: {
              cancel: "Cancel",
              saving: "Saving...",
            },
          },
        },
        orders: {
          title: "Orders",
          description: "Manage and track your orders",
          revenue30d: "30-Day Revenue",
          stats: {
            total: "Total",
            pending: "Pending",
            processing: "Processing",
            fulfilled: "Fulfilled",
          },
          filters: {
            allStatuses: "All statuses",
          },
          status: {
            pending: "Pending",
            processing: "Processing",
            fulfilled: "Fulfilled",
            cancelled: "Cancelled",
          },
          table: {
            order: "Order",
            buyer: "Buyer",
            product: "Product",
            quantity: "Quantity",
            total: "Total",
            shipDate: "Ship Date",
            status: "Status",
          },
          messages: {
            orderSynced: "Order {id} synced successfully.",
            updateFailed: "Unable to update order {id}.",
            retry: "Unable to update order. Please retry.",
          },
          errors: {
            loadFailed: "Unable to load orders. Refresh or try again shortly.",
          },
          updated: "Updated",
          syncing: "Syncing changes…",
          emptyState:
            "No orders in this status. Adjust the filter to view other orders.",
        },
        analytics: {
          title: "Analytics",
          description: "Detailed performance metrics and insights",
          metrics: {
            totalRevenue: "Total Revenue (6m)",
            totalRevenueDesc: "Across all channels",
            ordersProcessed: "Orders Processed",
            ordersProcessedDesc: "Confirmed and shipped",
            avgOrderValue: "Average Order Value",
            avgOrderValueDesc: "6-month moving average",
            peakMonth: "Peak Month",
            peakMonthDesc: "Highest blended revenue",
          },
          charts: {
            revenueVsOrders: "Revenue vs Orders",
            revenueVsOrdersDesc:
              "Track top-line revenue against shipment volume",
            topProductContribution: "Top Product Contribution",
            topProductContributionDesc: "Blend of revenue across lead SKUs",
          },
          revenueByRegion: {
            title: "Revenue by Region",
            description:
              "Where demand is accelerating for your current catalogue",
            viewActivity: "View buyer activity →",
          },
        },
      },
      trader: {
        dashboard: {
          title: "Trader Dashboard",
          description: "Manage your stores and inventory",
          metrics: {
            activeSubStores: "Active Sub-Stores",
            activeSubStoresDesc: "Manage customized assortments",
            integratedSuppliers: "Integrated Suppliers",
            integratedSuppliersDesc: "Analytics tracked for each",
            pendingOrders: "Pending Orders",
            pendingOrdersDesc: "Awaiting supplier confirmation",
            spend30d: "Spend (30d)",
            spend30dDesc: "Across all sourcing channels",
          },
          buttons: {
            createSubStore: "Create Sub-Store",
            reviewOrders: "Review Orders",
            manageInventory: "Manage Inventory",
            viewAllOrders: "View All Orders",
          },
          sections: {
            spendTrend: "Spend Trend",
            spendTrendDesc: "Month-over-month spend vs profit margins",
            supplierContribution: "Supplier Contribution",
            supplierContributionDesc: "Share of revenue influenced by each partner",
            viewTerms: "View contractual terms & lead times",
            latestOrders: "Latest Sourcing Orders",
            latestOrdersDesc: "Track fulfillment and communication with suppliers",
            inventorySnapshot: "Inventory Snapshot",
            inventorySnapshotDesc: "Auto-refreshing stock levels across suppliers",
          },
          notifications: {
            realTimeUpdates: "Real-time inventory updates:",
            restocked: "{product} restocked by {delta}",
            sold: "{product} sold {delta} units",
          },
          table: {
            order: "Order",
            store: "Store",
            supplier: "Supplier",
            value: "Value",
            status: "Status",
          },
          status: {
            pending: "Pending",
            confirmed: "Confirmed",
            inTransit: "In Transit",
            delivered: "Delivered",
          },
          sku: "SKU",
          units: "{count} units",
        },
        store: {
          title: "Stores",
          description: "Create and manage your sub-stores",
          createTitle: "Create New Sub-Store",
          createDescription: "Segment buyers by channel, geography, or assortment strategy.",
          existingStores: "Existing Stores",
          itemsCount: "{shown} store(s) • {total} total",
          created: "Created",
          operatingRegion: "🌍 Operating region:",
          connectSuppliers: "Connect suppliers to this store from the inventory console.",
          buttons: {
            delete: "Delete",
          },
          filters: {
            allChannels: "All channels",
          },
          form: {
            labels: {
              storeName: "Store Name",
              channel: "Channel",
              region: "Region",
              focus: "Focus",
            },
            placeholders: {
              storeName: "e.g. Northwind Retail EU",
              region: "e.g. Europe, APAC",
              focus: "What products or buyer needs does this store address?",
            },
            channels: {
              marketplace: "Marketplace",
              wholesale: "Wholesale",
              directRetail: "Direct Retail",
            },
            buttons: {
              creating: "Creating...",
              createStore: "Create Store",
            },
          },
          emptyState: "No stores match this filter. Adjust the channel or create a new store.",
          errors: {
            networkError: "Network error. Please retry.",
          },
        },
        inventory: {
          title: "Inventory",
          description: "Monitor and manage your stock levels",
          metrics: {
            totalUnits: "Total Units",
            healthySKUs: "Healthy SKUs",
            lowStockSKUs: "Low Stock SKUs",
            criticalSKUs: "Critical SKUs",
          },
          notifications: {
            liveUpdates: "Live updates:",
            replenished: "{product} replenished by {delta} units",
            sold: "{product} sold {delta} units",
          },
          filters: {
            allSuppliers: "All suppliers",
            allStores: "All stores",
          },
          realTimeNote: "💡 Real-time updates reflect supplier confirmations",
          table: {
            product: "Product",
            supplier: "Supplier",
            store: "Store",
            sku: "SKU",
            stock: "Stock",
            reorderPoint: "Reorder Point",
            actions: "Actions",
          },
          status: {
            healthy: "Healthy",
            low: "Low",
            critical: "Critical",
          },
          statusMessages: {
            critical: "⚠️ Action required: escalate supplier restock",
            low: "⏰ Monitor demand closely",
            healthy: "✅ Inventory is within safe range",
          },
          buttons: {
            restock: "Restock +25",
            allocate: "Allocate -20",
          },
          units: "{count} units",
          emptyState: "No inventory items match this view. Adjust supplier or store filters.",
        },
        orders: {
          title: "Orders",
          description: "Track and manage sourcing orders",
          stats: {
            totalSpend: "Total Spend",
            total: "Total",
            pending: "Pending",
            confirmed: "Confirmed",
            inTransit: "In transit",
            delivered: "Delivered",
            cancelled: "Cancelled",
          },
          filters: {
            allStatuses: "All statuses",
          },
          status: {
            pending: "Pending",
            confirmed: "Confirmed",
            inTransit: "In transit",
            delivered: "Delivered",
            cancelled: "Cancelled",
          },
          table: {
            order: "Order",
            store: "Store",
            supplier: "Supplier",
            products: "Products",
            quantity: "Quantity",
            value: "Value",
            eta: "ETA",
            status: "Status",
          },
          placed: "Placed",
          syncing: "Syncing with supplier…",
          emptyState: "No orders in this status. Adjust the filter to view other orders.",
          errors: {
            syncError: "Unable to sync changes. Please retry.",
          },
        },
      },
      contactPage: {
        title: "Get in Touch",
        subtitle:
          "Have questions about our marketplace? Our team is ready to assist you.",
        info: {
          email: { title: "Email Us", sub: "We'll respond within 24 hours." },
          phone: { title: "Call Us", sub: "Mon-Fri from 8am to 5pm EST." },
          visit: { title: "Visit Us" },
          hours: {
            title: "Business Hours",
            days: "Monday - Friday",
            time: "9:00 AM - 6:00 PM",
          },
        },
        form: {
          title: "Send us a message",
          subtitle:
            "Fill out the form below and we'll get back to you as soon as possible.",
          labels: {
            name: "Full Name",
            email: "Email Address",
            phone: "Phone Number",
            subject: "Subject",
            message: "Message",
          },
          placeholders: {
            name: "John Doe",
            email: "john@example.com",
            phone: "+1 (555) 000-0000",
            message: "How can we help you?",
          },
          options: {
            select: "Select a topic",
            general: "General Inquiry",
            support: "Technical Support",
            sales: "Sales & Partnerships",
            billing: "Billing Question",
          },
          submit: "Send Message",
          sending: "Sending...",
          success: {
            title: "Message Sent!",
            message:
              "Thank you for reaching out. We've received your message and will get back to you shortly.",
            button: "Send Another Message",
          },
          error: "Failed to send message. Please try again later.",
        },
      },
      servicesPage: {
        hero: {
          title: "Services that Scale with You",
          description:
            "Comprehensive tools and services designed to help suppliers, traders, and businesses succeed in the global marketplace.",
          getStarted: "Get Started",
          contactSales: "Contact Sales",
        },
        services: {
          marketplace: {
            title: "Multi-Vendor Marketplace",
            description:
              "Access a global network of verified suppliers and traders. List your products, discover new opportunities, and grow your business.",
          },
          analytics: {
            title: "Advanced Analytics",
            description:
              "Get insights into market trends, product performance, and business metrics with our powerful analytics dashboard.",
          },
          inventory: {
            title: "Inventory Management",
            description:
              "Streamline your inventory operations with our comprehensive management tools designed for traders and suppliers.",
          },
          secure: {
            title: "Secure Transactions",
            description:
              "Trade with confidence knowing your transactions are protected by industry-leading security measures and verification systems.",
          },
          search: {
            title: "Advanced Search",
            description:
              "Find exactly what you're looking for with our intelligent search system that filters products, stores, and suppliers.",
          },
          tools: {
            title: "Supplier & Trader Tools",
            description:
              "Specialized dashboards and tools for suppliers and traders to manage their operations, orders, and analytics.",
          },
          insights: {
            title: "Market Insights",
            description:
              "Stay ahead of the competition with real-time market signals, trends, and momentum indicators for your products.",
          },
          support: {
            title: "24/7 Support",
            description:
              "Get help whenever you need it with our round-the-clock customer support team ready to assist you.",
          },
          logistics: {
            title: "Global Logistics",
            description:
              "Integrated shipping and logistics solutions to help you reach customers worldwide with ease and efficiency.",
          },
        },
        cta: {
          title: "Ready to Transform Your Business?",
          description:
            "Join thousands of businesses already growing with {brandName}. Start your free trial today.",
          createAccount: "Create Account",
          contactSales: "Contact Sales",
        },
      },
      careersPage: {
        hero: {
          title: "Join Our Team",
          description:
            "Help us build the future of global trade. We're looking for passionate individuals who want to make an impact.",
        },
        whyWork: {
          title: "Why Work at {brandName}?",
          description:
            "We're building a platform that connects businesses worldwide. Join us in creating meaningful impact.",
        },
        benefits: {
          compensation: {
            title: "Competitive Compensation",
            description:
              "We offer competitive salaries and comprehensive benefits packages.",
          },
          health: {
            title: "Health & Wellness",
            description:
              "Medical, dental, and vision insurance plus wellness programs.",
          },
          learning: {
            title: "Learning & Development",
            description:
              "Continuous learning opportunities and professional development support.",
          },
          flexible: {
            title: "Flexible Work",
            description:
              "Remote work options and flexible hours to support work-life balance.",
          },
          impact: {
            title: "Global Impact",
            description: "Work on products that connect businesses worldwide.",
          },
          innovation: {
            title: "Innovation Culture",
            description:
              "Be part of a team that values creativity and innovation.",
          },
        },
        values: {
          title: "Our Values",
          innovation: "Innovation and continuous improvement",
          transparency: "Transparency and open communication",
          workLifeBalance: "Work-life balance and employee wellbeing",
          diversity: "Diversity, equity, and inclusion",
          customerFirst: "Customer-first mindset",
          collaboration: "Collaboration and teamwork",
        },
        openPositions: {
          title: "Open Positions",
          description:
            "Explore our current openings and find the perfect role for you.",
          applyNow: "Apply Now",
        },
        positions: {
          seniorDeveloper: {
            title: "Senior Full Stack Developer",
            department: "Engineering",
            location: "Remote / San Francisco, CA",
            type: "Full-time",
          },
          productManager: {
            title: "Product Manager",
            department: "Product",
            location: "Remote / New York, NY",
            type: "Full-time",
          },
          uxDesigner: {
            title: "UX Designer",
            department: "Design",
            location: "Remote / London, UK",
            type: "Full-time",
          },
          businessDev: {
            title: "Business Development Manager",
            department: "Sales",
            location: "Dubai, UAE",
            type: "Full-time",
          },
          customerSuccess: {
            title: "Customer Success Specialist",
            department: "Support",
            location: "Remote",
            type: "Full-time",
          },
          dataAnalyst: {
            title: "Data Analyst",
            department: "Analytics",
            location: "Remote / Berlin, Germany",
            type: "Full-time",
          },
        },
        process: {
          title: "Application Process",
          steps: {
            apply: {
              title: "Apply",
              description:
                "Submit your application through our careers portal or email us your resume and cover letter.",
            },
            review: {
              title: "Initial Review",
              description:
                "Our team reviews your application and qualifications. We'll reach out if there's a match.",
            },
            interview: {
              title: "Interview",
              description:
                "Selected candidates will go through interviews with the team, including technical and cultural fit assessments.",
            },
            offer: {
              title: "Offer",
              description:
                "Successful candidates receive an offer with details about compensation, benefits, and start date.",
            },
          },
        },
        contact: {
          title: "Don't See a Role That Fits?",
          description:
            "We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.",
          contactUs: "Contact Us",
        },
      },
      pressPage: {
        hero: {
          title: "Press & Media",
          description:
            "Latest news, press releases, and resources for journalists and media professionals.",
        },
        releases: {
          title: "Press Releases",
          description:
            "Stay updated with our latest company news and announcements.",
          readMore: "Read More",
          release1: {
            date: "March 15, 2024",
            title: "{brandName} Launches Global Expansion Initiative",
            excerpt:
              "Company announces plans to expand operations to 20 new countries, connecting more businesses worldwide.",
            category: "Company News",
          },
          release2: {
            date: "February 28, 2024",
            title:
              "New Analytics Dashboard Helps Businesses Make Data-Driven Decisions",
            excerpt:
              "Platform introduces advanced analytics tools providing real-time insights into market trends and business performance.",
            category: "Product Update",
          },
          release3: {
            date: "January 10, 2024",
            title: "{brandName} Reaches 10,000 Active Business Milestone",
            excerpt:
              "Marketplace celebrates significant growth milestone with over 10,000 active businesses using the platform.",
            category: "Milestone",
          },
          release4: {
            date: "December 5, 2023",
            title: "Partnership with Leading Logistics Providers Announced",
            excerpt:
              "New partnerships enable faster shipping and better logistics solutions for platform users.",
            category: "Partnership",
          },
        },
        facts: {
          title: "Company Facts",
          founded: { label: "Founded", value: "2020" },
          headquarters: { label: "Headquarters", value: "San Francisco, CA" },
          businesses: { label: "Active Businesses", value: "10,000+" },
          countries: { label: "Countries Served", value: "50+" },
          team: { label: "Team Members", value: "150+" },
          products: { label: "Products Listed", value: "500,000+" },
        },
        mediaKit: {
          title: "Media Kit",
          description:
            "Download resources and assets for your articles and coverage.",
          logo: {
            title: "Company Logo & Brand Assets",
            description:
              "High-resolution logos, brand guidelines, and visual assets",
            action: "Download Assets",
          },
          factSheet: {
            title: "Company Fact Sheet",
            description:
              "Key facts, statistics, and company information in PDF format",
            action: "Download PDF",
          },
          bios: {
            title: "Executive Bios",
            description: "Biographies and photos of company leadership team",
            action: "View Bios",
          },
          screenshots: {
            title: "Product Screenshots",
            description:
              "High-quality screenshots of the platform and key features",
            action: "Download Images",
          },
        },
        about: {
          title: "About {brandName}",
          paragraph1:
            "{brandName} is a leading multi-vendor marketplace platform that connects businesses worldwide. We provide a comprehensive ecosystem where suppliers, traders, and businesses can discover, connect, and transact with confidence.",
          paragraph2:
            "Our platform combines advanced technology, secure transactions, and global logistics to simplify international trade. With over 10,000 active businesses and operations spanning 50+ countries, we're building the future of global commerce.",
          paragraph3:
            "Founded in 2020, {brandName} has quickly become a trusted partner for businesses looking to expand their reach and streamline their supply chain operations.",
        },
        contact: {
          title: "Press Inquiries",
          description:
            "For media inquiries, interview requests, or additional information, please contact our press team.",
          contactForm: "Contact Form",
          info: {
            title: "Press Contact Information",
            email: { label: "Email", value: "press@tajirjomlahub.com" },
            phone: { label: "Phone", value: "+1 (555) 123-4567" },
            address: {
              label: "Address",
              value: "123 Market Street, Suite 456, San Francisco, CA 94105",
            },
            responseTime: {
              label: "Response Time",
              value: "We typically respond to press inquiries within 24 hours.",
            },
          },
        },
      },
      customerSupportPage: {
        hero: {
          title: "How can we help you?",
          description:
            "Search our help center or contact our support team for assistance.",
          searchPlaceholder: "Search for help...",
        },
        contact: {
          email: {
            title: "Email Support",
            description: "Send us an email and we'll respond within 24 hours",
            contact: "support@tajirjomlahub.com",
          },
          phone: {
            title: "Phone Support",
            description:
              "Call us for immediate assistance during business hours",
            contact: "+1 (555) 123-4567",
          },
          chat: {
            title: "Live Chat",
            description: "Chat with our support team in real-time",
            contact: "Available 24/7",
          },
          response: {
            title: "Response Times",
            description: "We aim to respond to all inquiries quickly",
            contact: "Within 24 hours",
          },
        },
        commonQuestions: {
          title: "Common Questions",
          viewAll: "View all FAQs",
        },
        questions: {
          question1: {
            q: "How do I create an account?",
            a: "Click on the 'Register' button in the top navigation, fill in your details, and verify your email address.",
          },
          question2: {
            q: "How do I reset my password?",
            a: "Go to the login page and click 'Forgot Password'. Enter your email address and follow the instructions sent to your inbox.",
          },
          question3: {
            q: "How do I place an order?",
            a: "Browse products, add items to your cart, and proceed to checkout. You'll need an active subscription plan to complete purchases.",
          },
          question4: {
            q: "How do I track my order?",
            a: "Go to your account dashboard and navigate to the 'Orders' section. You'll find tracking information for all your orders there.",
          },
        },
        resources: {
          title: "Helpful Resources",
          faq: {
            title: "FAQs",
            description: "Find answers to frequently asked questions",
          },
          shipping: {
            title: "Shipping Info",
            description: "Learn about our shipping policies and options",
          },
          returns: {
            title: "Returns & Refunds",
            description: "Understand our return policy and process",
          },
          seller: {
            title: "Seller Agreement",
            description: "Read our terms for selling on {brandName}",
          },
        },
      },
      shippingInfoPage: {
        hero: {
          title: "Shipping & Delivery",
          description:
            "Everything you need to know about how we get your products to you.",
        },
        features: {
          fast: {
            title: "Fast Delivery",
            description:
              "We partner with top-tier logistics providers to ensure your orders arrive on time, every time.",
          },
          global: {
            title: "Global Shipping",
            description:
              "We ship to over 50 countries worldwide with reliable tracking and customs handling.",
          },
          secure: {
            title: "Secure Packaging",
            description:
              "All items are carefully packaged to ensure they arrive in perfect condition.",
          },
        },
        methods: {
          title: "Shipping Methods & Rates",
          table: {
            method: "Method",
            deliveryTime: "Delivery Time",
            cost: "Cost",
          },
          standard: {
            method: "Standard Shipping",
            deliveryTime: "5-7 Business Days",
            cost: "Free on orders over $50",
          },
          express: {
            method: "Express Shipping",
            deliveryTime: "2-3 Business Days",
            cost: "$15.00",
          },
          overnight: {
            method: "Overnight Shipping",
            deliveryTime: "Next Business Day",
            cost: "$35.00",
          },
          international: {
            method: "International Standard",
            deliveryTime: "7-14 Business Days",
            cost: "Calculated at checkout",
          },
        },
        timeline: {
          title: "How It Works",
          processing: {
            title: "Order Processing",
            description:
              "Once you place your order, our suppliers confirm availability and prepare your items for shipment. This usually takes 1-2 business days.",
          },
          quality: {
            title: "Quality Check",
            description:
              "Items undergo a quality inspection to ensure they meet our standards before being packed.",
          },
          shipped: {
            title: "Shipped & Tracked",
            description:
              "Your package is handed over to the carrier. You'll receive a tracking number via email to monitor its journey.",
          },
          delivery: {
            title: "Delivery",
            description:
              "The carrier delivers your package to your doorstep or specified delivery location.",
          },
        },
      },
      policyPages: {
        lastUpdated: "Last updated",
      },
      breadcrumbs: {
        home: "Home",
        dashboard: "Dashboard",
        supplier: "Supplier",
        trader: "Trader",
        products: "Products",
        orders: "Orders",
        analytics: "Analytics",
        inventory: "Inventory",
        store: "Store",
        contact: "Contact",
        plans: "Plans",
        search: "Search",
        stores: "Stores",
        cart: "Cart",
        account: "Account",
        favorites: "Favorites",
        settings: "Settings",
        login: "Login",
        register: "Register",
        about: "About",
        services: "Services",
        customerSupport: "Customer Support",
        shippingInfo: "Shipping Info",
        faq: "FAQs",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
        cookiePolicy: "Cookie Policy",
        sellerAgreement: "Seller Agreement",
        returnsRefunds: "Returns & Refunds",
        topProducts: "Top Products",
        careers: "Careers",
        press: "Press",
      },
      privacyPolicyPage: {
        title: "Privacy Policy",
        description:
          "We value your privacy and are committed to protecting your personal data.",
        sections: {
          introduction: {
            title: "1. Introduction",
            content:
              "At {brandName}, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our marketplace platform. Please read this policy carefully to understand our practices regarding your personal data.",
          },
          informationWeCollect: {
            title: "2. Information We Collect",
            content:
              "We collect information that you provide directly to us, including:\n• Account information (name, email address, password)\n• Profile information (business details, preferences)\n• Transaction information (order history, payment details)\n• Communication data (messages, support tickets)\n• Usage data (how you interact with our platform)\n• Device information (IP address, browser type, device identifiers)",
          },
          howWeUse: {
            title: "3. How We Use Your Information",
            content:
              "We use the information we collect to:\n• Provide, maintain, and improve our services\n• Process transactions and send related information\n• Send you technical notices and support messages\n• Respond to your comments and questions\n• Monitor and analyze trends and usage\n• Detect, prevent, and address technical issues\n• Personalize your experience on our platform",
          },
          informationSharing: {
            title: "4. Information Sharing",
            content:
              "We do not sell your personal information. We may share your information in the following circumstances:\n• With service providers who assist us in operating our platform\n• When required by law or to protect our rights\n• In connection with a business transfer or merger\n• With your consent or at your direction",
          },
          dataSecurity: {
            title: "5. Data Security",
            content:
              "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.",
          },
          yourRights: {
            title: "6. Your Rights",
            content:
              "You have the right to:\n• Access and receive a copy of your personal data\n• Rectify inaccurate or incomplete data\n• Request deletion of your personal data\n• Object to processing of your personal data\n• Request restriction of processing\n• Data portability\n• Withdraw consent at any time",
          },
          cookies: {
            title: "7. Cookies and Tracking Technologies",
            content:
              "We use cookies and similar tracking technologies to track activity on our platform and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our platform.",
          },
          childrensPrivacy: {
            title: "8. Children's Privacy",
            content:
              "Our platform is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.",
          },
          changes: {
            title: "9. Changes to This Policy",
            content:
              'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.',
          },
          contact: {
            title: "10. Contact Us",
            content:
              "If you have any questions about this Privacy Policy, please contact us at:\n\nEmail: privacy@tajirjomlahub.com\nAddress: 123 Market Street, Suite 456, San Francisco, CA 94105\nPhone: +1 (555) 123-4567",
          },
        },
      },
      termsOfServicePage: {
        title: "Terms of Service",
        description:
          "Please read these terms carefully before using our platform.",
        sections: {
          acceptance: {
            title: "1. Acceptance of Terms",
            content:
              "By accessing or using {brandName}, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
          },
          useLicense: {
            title: "2. Use License",
            content:
              "Permission is granted to temporarily download one copy of the materials (information or software) on {brandName}'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:\n• Modify or copy the materials;\n• Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);\n• Attempt to decompile or reverse engineer any software contained on {brandName}'s website;\n• Remove any copyright or other proprietary notations from the materials; or\n• Transfer the materials to another person or \"mirror\" the materials on any other server.",
          },
          userAccounts: {
            title: "3. User Accounts",
            content:
              "To access certain features of the platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.",
          },
          marketplaceRules: {
            title: "4. Marketplace Rules",
            content:
              "As a user of our marketplace, you agree not to:\n• Post false, inaccurate, misleading, defamatory, or libelous content;\n• Violate any laws, third party rights, or our policies;\n• Distribute or post spam, unsolicited, or bulk electronic communications;\n• Distribute viruses or any other technologies that may harm {brandName} or the interests or property of {brandName} users;\n• Harvest or otherwise collect information about users, including email addresses, without their consent.",
          },
          disclaimer: {
            title: "5. Disclaimer",
            content:
              "The materials on {brandName}'s website are provided on an 'as is' basis. {brandName} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
          },
          limitations: {
            title: "6. Limitations",
            content:
              "In no event shall {brandName} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on {brandName}'s website, even if {brandName} or a {brandName} authorized representative has been notified orally or in writing of the possibility of such damage.",
          },
          governingLaw: {
            title: "7. Governing Law",
            content:
              "These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which {brandName} operates and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.",
          },
          changes: {
            title: "8. Changes to Terms",
            content:
              "{brandName} reserves the right, at its sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
          },
          contact: {
            title: "9. Contact Us",
            content:
              "If you have any questions about these Terms, please contact us at:\n\nEmail: legal@tajirjomlahub.com\nAddress: 123 Market Street, Suite 456, San Francisco, CA 94105",
          },
        },
      },
      sellerAgreementPage: {
        title: "Seller Agreement",
        description: "Terms and conditions for selling on {brandName}.",
        sections: {
          introduction: {
            title: "1. Introduction",
            content:
              'This Seller Agreement ("Agreement") is between you ("Seller") and {brandName} ("Company") and governs your use of the {brandName} marketplace to sell products or services. By registering as a seller, you agree to be bound by this Agreement.',
          },
          obligations: {
            title: "2. Seller Obligations",
            content:
              "As a Seller on {brandName}, you agree to:\n• Provide accurate and complete information about your products or services.\n• Fulfill orders in a timely and professional manner.\n• Comply with all applicable laws and regulations.\n• Maintain high standards of customer service.\n• Respect the intellectual property rights of others.",
          },
          fees: {
            title: "3. Fees and Payments",
            content:
              "{brandName} charges a commission on each sale made through the platform. The current commission rates are set forth in our Fee Schedule. Payments to Sellers are processed according to our Payment Policy, typically on a bi-weekly basis, subject to any hold periods for returns or disputes.",
          },
          prohibitedItems: {
            title: "4. Prohibited Items",
            content:
              "You may not sell any items that are illegal, counterfeit, dangerous, or violate our Prohibited Items Policy. {brandName} reserves the right to remove any listing that violates this policy and to suspend or terminate the account of any Seller who repeatedly violates this policy.",
          },
          intellectualProperty: {
            title: "5. Intellectual Property",
            content:
              "You represent and warrant that you own or have the necessary licenses, rights, consents, and permissions to use and authorize {brandName} to use all intellectual property rights in and to your content and products.",
          },
          termination: {
            title: "6. Termination",
            content:
              "Either party may terminate this Agreement at any time with written notice. Upon termination, you must fulfill any outstanding orders and pay any outstanding fees. {brandName} may retain a portion of your funds to cover potential chargebacks or refunds for a period of up to 90 days.",
          },
          indemnification: {
            title: "7. Indemnification",
            content:
              "You agree to indemnify and hold harmless {brandName}, its affiliates, and their respective officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses arising from your use of the platform or your violation of this Agreement.",
          },
          contact: {
            title: "8. Contact Us",
            content:
              "If you have any questions about this Seller Agreement, please contact us at:\n\nEmail: sellers@tajirjomlahub.com\nAddress: 123 Market Street, Suite 456, San Francisco, CA 94105",
          },
        },
      },
      returnsRefundsPage: {
        title: "Returns & Refunds",
        description: "Our commitment to your satisfaction.",
        sections: {
          overview: {
            title: "1. Return Policy Overview",
            content:
              "We want you to be completely satisfied with your purchase. If you are not satisfied, you may return most items within 30 days of delivery for a full refund, subject to the terms and conditions below.",
          },
          eligibility: {
            title: "2. Eligibility for Returns",
            content:
              "To be eligible for a return, your item must be:\n• Unused and in the same condition that you received it.\n• In the original packaging with all tags and labels attached.\n• Accompanied by the receipt or proof of purchase.\n\nCertain items are non-returnable, including:\n• Perishable goods (e.g., food, flowers)\n• Personalized or custom-made items\n• Digital downloads\n• Intimate or sanitary goods",
          },
          process: {
            title: "3. Return Process",
            content:
              'To initiate a return:\n1. Log in to your account and go to "My Orders".\n2. Select the order and item you wish to return.\n3. Follow the instructions to print a return shipping label.\n4. Pack the item securely and attach the shipping label.\n5. Drop off the package at the designated carrier location.',
          },
          refunds: {
            title: "4. Refunds",
            content:
              "Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.\nIf approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within 5-7 business days.",
          },
          shipping: {
            title: "5. Return Shipping",
            content:
              "If the return is due to our error (e.g., you received an incorrect or defective item), we will cover the return shipping costs.\nIf you are returning an item for other reasons (e.g., changed your mind), you will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.",
          },
          exchanges: {
            title: "6. Exchanges",
            content:
              "We only replace items if they are defective or damaged. If you need to exchange it for the same item, please contact our support team.",
          },
          contact: {
            title: "7. Contact Us",
            content:
              "If you have any questions about our Returns & Refunds Policy, please contact us at:\n\nEmail: returns@tajirjomlahub.com\nAddress: 123 Market Street, Suite 456, San Francisco, CA 94105",
          },
        },
      },
      faqPage: {
        title: "Frequently Asked Questions",
        description:
          "Find answers to common questions about our platform, services, and policies.",
        categories: {
          account: {
            category: "Account & Registration",
            questions: {
              createAccount: {
                title: "How do I create an account?",
                content:
                  "Click on the 'Register' button in the top navigation bar. Fill in your email address, create a password, and verify your email address through the confirmation link we send you.",
              },
              payToCreate: {
                title: "Do I need to pay to create an account?",
                content:
                  "No, creating an account is completely free. However, to access certain features like viewing product prices and placing orders, you'll need an active subscription plan.",
              },
              resetPassword: {
                title: "How do I reset my password?",
                content:
                  "Go to the login page and click on 'Forgot Password'. Enter your email address, and we'll send you a link to reset your password. Make sure to check your spam folder if you don't see the email.",
              },
              multipleAccounts: {
                title: "Can I have multiple accounts?",
                content:
                  "Each email address can only be associated with one account. If you need separate accounts for different purposes, you'll need to use different email addresses.",
              },
            },
          },
          orders: {
            category: "Orders & Purchases",
            questions: {
              placeOrder: {
                title: "How do I place an order?",
                content:
                  "Browse our marketplace, add products to your cart, and proceed to checkout. You'll need an active subscription plan to complete purchases. Follow the checkout process to enter your shipping and payment information.",
              },
              cancelOrder: {
                title: "Can I cancel my order?",
                content:
                  "You can cancel your order within 24 hours of placing it, as long as it hasn't been shipped yet. Go to your account dashboard, find the order, and click 'Cancel Order'.",
              },
              trackOrder: {
                title: "How do I track my order?",
                content:
                  "Once your order ships, you'll receive a tracking number via email. You can also track your order from your account dashboard under the 'Orders' section.",
              },
              paymentMethods: {
                title: "What payment methods do you accept?",
                content:
                  "We accept all major credit cards (Visa, Mastercard), digital payment methods (Apple Pay, Mada, STC Pay, Mobily Pay, Tabbey, Tamara), bank transfers, and cash on delivery in select regions.",
              },
            },
          },
          shipping: {
            category: "Shipping & Delivery",
            questions: {
              shippingOptions: {
                title: "What are your shipping options?",
                content:
                  "We offer standard shipping (5-7 business days, free on orders over $50), express shipping (2-3 business days), and overnight shipping (next business day). Shipping costs are calculated at checkout.",
              },
              internationalShipping: {
                title: "Do you ship internationally?",
                content:
                  "Yes, we ship to most countries worldwide. International orders typically take 7-14 business days. Please note that international orders may be subject to customs fees and import duties.",
              },
              damagedPackage: {
                title: "What if my package is damaged or lost?",
                content:
                  "If your package arrives damaged or is lost in transit, please contact our customer support team immediately. We'll work with you to resolve the issue, which may include a replacement or refund.",
              },
              changeAddress: {
                title:
                  "Can I change my shipping address after placing an order?",
                content:
                  "You can change your shipping address within 24 hours of placing your order, as long as it hasn't been shipped. Contact our support team or update it from your order details page.",
              },
            },
          },
          subscriptions: {
            category: "Subscriptions & Plans",
            questions: {
              availablePlans: {
                title: "What subscription plans are available?",
                content:
                  "We offer multiple subscription plans including Free, Basic, Pro, and Enterprise tiers. Each plan has different features and benefits. Visit our Plans page to see detailed comparisons and pricing.",
              },
              upgradeDowngrade: {
                title: "Can I upgrade or downgrade my plan?",
                content:
                  "Yes, you can change your subscription plan at any time from your account settings. Upgrades take effect immediately, while downgrades take effect at the end of your current billing cycle.",
              },
              cancelSubscription: {
                title: "How do I cancel my subscription?",
                content:
                  "You can cancel your subscription from your account settings. Your subscription will remain active until the end of your current billing period, after which you'll lose access to premium features.",
              },
              refunds: {
                title: "Do you offer refunds for subscriptions?",
                content:
                  "We offer a 30-day money-back guarantee for new subscriptions. If you're not satisfied within the first 30 days, contact our support team for a full refund.",
              },
            },
          },
        },
        stillHaveQuestions: {
          title: "Still have questions?",
          description:
            "Can't find the answer you're looking for? Our support team is here to help.",
          contactSupport: "Contact Support",
        },
      },
      aboutPage: {
        hero: {
          title: "Building the Future of Global Trade",
          description:
            "We're revolutionizing the way businesses discover and connect with suppliers and traders worldwide.",
        },
        mission: {
          title: "Connecting the World Through Commerce",
          paragraph1:
            "Founded with a vision to simplify global commerce, {brandName} has grown into a trusted ecosystem where businesses of all sizes can thrive. We believe that geography shouldn't be a barrier to growth.",
          paragraph2:
            "Our platform combines cutting-edge technology with human-centric support to create seamless connections between buyers and sellers. Whether you're a local artisan or a multinational distributor, we provide the tools you need to succeed.",
          stats: {
            countries: {
              value: "50+",
              label: "Countries Served",
            },
            businesses: {
              value: "10k+",
              label: "Active Businesses",
            },
          },
        },
        values: {
          title: "Our Mission & Values",
          description:
            "We are driven by a shared purpose to make trade accessible, secure, and profitable for everyone.",
          cards: {
            trust: {
              title: "Trust & Transparency",
              description:
                "We prioritize honesty in every transaction, ensuring you have the information needed to make confident decisions.",
            },
            customer: {
              title: "Customer First",
              description:
                "Your success is our success. We continuously evolve our platform based on your feedback and needs.",
            },
            innovation: {
              title: "Innovation",
              description:
                "Leveraging AI and data analytics to provide smarter search, real-time insights, and seamless logistics.",
            },
            excellence: {
              title: "Excellence",
              description:
                "We strive for perfection in user experience, support, and platform reliability.",
            },
          },
        },
        whyChoose: {
          title: "Why Choose {brandName}?",
          description:
            "Join thousands of businesses that trust us for their sourcing and selling needs.",
          features: {
            globalReach: {
              title: "Global Reach",
              desc: "Connect with partners in over 50 countries.",
            },
            verifiedPartners: {
              title: "Verified Partners",
              desc: "Strict vetting process for all suppliers.",
            },
            securePayments: {
              title: "Secure Payments",
              desc: "Escrow protection for peace of mind.",
            },
            support: {
              title: "24/7 Support",
              desc: "Round-the-clock assistance in multiple languages.",
            },
            analytics: {
              title: "Smart Analytics",
              desc: "Data-driven insights to grow your business.",
            },
            shipping: {
              title: "Fast Shipping",
              desc: "Integrated logistics for reliable delivery.",
            },
          },
        },
      },
    },
  },
  ar: {
    common: {
      home: "الرئيسية",
      stores: "المتاجر",
      topProducts: "أفضل المنتجات",
      deals: "العروض",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      register: "تسجيل",
      favorites: "المفضلة",
      cart: "السلة",
      account: "حسابي",
      notifications: "الإشعارات",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      search: "بحث",
      dashboard: "لوحة التحكم",
      theme: "المظهر",
      language: "اللغة",
      english: "الإنجليزية",
      arabic: "العربية",
      guest: "زائر",
      guestDesc: "سجل دخولك للوصول إلى جميع الميزات",
      signIn: "تسجيل الدخول",
      createAccount: "إنشاء حساب",
      contact: "اتصل بنا",
      checkout: "إتمام الشراء",
      subtotal: "المجموع الفرعي",
      viewAll: "عرض الكل",
      goDashboard: "الذهاب للوحة التحكم",
      accountOverview: "نظرة عامة على الحساب",
      workspaceSettings: "إعدادات مساحة العمل",
      pages: "الصفحات",
      quickLogin: "دخول سريع",
      quickReg: "تسجيل سريع",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      fullName: "الاسم الكامل",
      yourWorkspace: "مساحة العمل الخاصة بك",
      yourAccount: "حسابك",
      access: "وصول",
      emailOrPhone: "البريد الإلكتروني أو الهاتف",
      phone: "الهاتف",
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      confirmPassword: "تأكيد كلمة المرور",
      emailAlerts: "تنبيهات البريد الإلكتروني",
      marketplaceTips: "نصائح السوق",
      darkMode: "الوضع الداكن",
      newRfqActivity: "نشاط طلب عرض أسعار جديد",
      buyersSearching: "المشترون يبحثون في الإلكترونيات.",
      supplierAccepted: "تم قبول المورد",
      techHubConfirmed: "تأكدت TechHub Electronics من الاهتمام.",
      trialReminder: "تذكير التجربة",
      activatePlan: "قم بتنشيط خطتك للاحتفاظ بالتحليلات.",
      brandName: "تاجر جملة هب",
    },
    footer: {
      subscribeTitle: "اشترك في نشرتنا البريدية",
      subscribeDesc:
        "سوقك الموثوق متعدد البائعين الذي يربط المشترين بمتاجر عالية الجودة حول العالم.",
      subscribeBtn: "اشترك",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      company: "الشركة",
      helpCenter: "مركز المساعدة",
      legal: "قانوني",
      aboutUs: "من نحن",
      services: "خدماتنا",
      careers: "وظائف",
      press: "الصحافة",
      customerSupport: "خدمة العملاء",
      shippingInfo: "معلومات الشحن",
      faqs: "الأسئلة الشائعة",
      privacyPolicy: "سياسة الخصوصية",
      termsOfService: "شروط الخدمة",
      cookiePolicy: "سياسة ملفات تعريف الارتباط",
      sellerAgreement: "اتفاقية البائع",
      returnsRefunds: "الإرجاع والاسترداد",
      rightsReserved: "جميع الحقوق محفوظة.",
    },
    nav: {
      home: "الرئيسية",
      stores: "المتاجر",
      topProducts: "أفضل المنتجات",
      deals: "العروض",
    },
    auth: {
      login: {
        emailOrPhone: "البريد الإلكتروني أو الهاتف",
        password: "كلمة المرور",
        signingIn: "جاري تسجيل الدخول...",
        signIn: "تسجيل الدخول",
        dontHaveAccount: "ليس لديك حساب؟",
        createAccount: "إنشاء حساب",
      },
      register: {
        firstName: "الاسم الأول",
        lastName: "اسم العائلة",
        phone: "الهاتف",
        confirmPassword: "تأكيد كلمة المرور",
        iWantTo: "أريد أن",
        sellProducts: "بيع المنتجات (مورد)",
        buyProducts: "شراء المنتجات (تاجر)",
        businessName: "اسم العمل",
        businessType: "نوع العمل",
        creatingAccount: "جاري إنشاء الحساب...",
        register: "تسجيل",
        alreadyHaveAccount: "لديك حساب بالفعل؟",
        signIn: "تسجيل الدخول",
      },
    },
    home: {
      hero: {
        title: "اكتشف منتجات استثنائية",
        description:
          "تواصل مع موردين من الدرجة الأولى واكتشف عناصر فريدة من جميع أنحاء العالم. مدفوعات آمنة، بائعون موثوقون، وخدمات لوجستية سلسة.",
        placeholder: "بحث المنتجات، المتاجر، العلامات التجارية...",
        quickFilters: "بحث سريع",
      },
      requestItem: "طلب منتج",
      stats: {
        activeUsers: "مستخدم نشط",
        verifiedSellers: "بائع موثوق",
        productsListed: "منتج معروض",
      },
      featuredStores: {
        title: "متاجر مميزة",
        description: "تسوق من البائعين الأكثر ثقة وتقييمًا لدينا",
        viewAll: "عرض جميع المتاجر",
        visitStore: "زيارة المتجر",
      },
      bestSellers: {
        title: "الأكثر مبيعًا",
        description: "المنتجات الأعلى تقييمًا والتي تباع بسرعة",
        viewAll: "عرض جميع المنتجات",
      },
      trust: {
        title: "موثوق به من قبل الشركات حول العالم",
      },
      categories: {
        title: "تصفح حسب الفئة",
        "cat-electronics": "إلكترونيات",
        "cat-fashion": "أزياء",
        "cat-home": "منزل",
        "cat-sports": "رياضة",
        "cat-beauty": "جمال",
        "cat-gaming": "ألعاب",
        "cat-books": "كتب",
      },
      storesPage: {
        hero: {
          title: "اكتشف متاجر مذهلة",
          description:
            "استكشف مجموعة مختارة من المتاجر المستقلة والعلامات التجارية والمبدعين. اعثر على منتجات فريدة وادعم الشركات الصغيرة.",
        },
        searchPlaceholder: "ابحث عن المتاجر بالاسم أو الفئة أو الوصف...",
        featuredStore: "متجر مميز",
        visitStore: "زيارة المتجر",
        filters: {
          all: "كل المتاجر",
          topRated: "الأعلى تقييمًا",
          newest: "الأحدث",
          showing: "عرض",
          stores: "متاجر",
        },
        visit: "زيارة",
        noStores: {
          title: "لم يتم العثور على متاجر",
          description:
            "لم نتمكن من العثور على أي متاجر تطابق بحثك. حاول التحقق من الأخطاء المطبعية أو استخدام كلمات رئيسية مختلفة.",
          clear: "مسح المرشحات",
        },
        cta: {
          title: "ابدأ متجرك الخاص اليوم",
          description:
            "انضم إلى آلاف التجار الذين ينمون أعمالهم على {brandName}. الإعداد سهل ويستغرق أقل من 5 دقائق.",
          becomeSeller: "كن بائعًا",
          learnMore: "تعرف على المزيد",
        },
      },
      topProductsPage: {
        hero: {
          title: "المنتجات الأفضل أداءً",
          description:
            "اكتشف المخزون عالي الطلب مع إشارات السوق في الوقت الفعلي. احصل على مصادر أذكى مع رؤى تعتمد على البيانات.",
        },
        filters: "تصفية",
        clearFilters: "مسح الكل",
        showingResults: "عرض {count} من {total} نتيجة",
        by: "بواسطة",
        filterLabels: {
          category: "الفئة",
          allCategories: "جميع الفئات",
          momentum: "الزخم",
          allMomentum: "جميع الزخم",
          brand: "العلامة التجارية",
          allBrands: "جميع العلامات التجارية",
          minPrice: "أقل سعر",
          minPricePlaceholder: "0",
          maxPrice: "أعلى سعر",
          maxPricePlaceholder: "بدون حد",
        },
        momentum: {
          surging: "متصاعد",
          emerging: "ناشئ",
          steady: "مستقر",
        },
        cta: {
          title: "حول هذه الإشارات إلى أوامر شراء",
          description:
            "تظهر ماركت هب ذكاء السوق حتى تتمكن من التحرك بسرعة. قم بتنشيط حسابك لتلقي توصيات مخصصة وتدفقات طلبات عروض الأسعار.",
          createAccount: "إنشاء حساب مجاني",
          viewSubscriptions: "عرض الاشتراكات",
        },
      },
      plansPage: {
        mostPopular: "الأكثر شعبية",
        compareFeatures: "مقارنة الميزات",
        plans: {
          free: {
            name: "معاينة مجانية",
            description:
              "تصفح عروض السوق العامة وتقييم تاجير جملة هب قبل الاشتراك.",
          },
          supplier: {
            name: "خطة المورد",
            description:
              "مساحة عمل تشغيلية للموردين لإدارة الكتالوجات والطلبات والتحليلات.",
          },
          trader: {
            name: "خطة التاجر",
            description:
              "مساحة عمل شاملة للتجار لإدارة المصادر والمتاجر والمخزون.",
          },
        },
        table: {
          feature: "الميزة",
          free: "مجاني",
          supplier: "مورد",
          trader: "تاجر",
          features: {
            marketplaceAccess: "الوصول إلى السوق",
            productSearch: "البحث عن المنتجات",
            viewPricing: "عرض الأسعار",
            inventoryManagement: "إدارة المخزون",
            rfqResponses: "الردود على طلبات عروض الأسعار",
            bulkOrdering: "الطلب بالجملة",
            prioritySupport: "دعم ذو أولوية",
            apiAccess: "الوصول إلى API",
          },
          status: {
            limited: "محدود",
            full: "كامل",
          },
        },
        card: {
          free: "مجاني",
          perMonth: "/شهر",
          startTrialDays: "ابدأ تجربة {days} يوم",
          startTrial: "ابدأ التجربة",
          currentPlan: "الخطة الحالية",
          activateAfterTrial: "تفعيل بعد التجربة",
          activatePlan: "تفعيل الخطة",
          startingTrial: "جاري بدء التجربة...",
          activating: "جاري التفعيل...",
          included: "مشمول لجميع الحسابات",
          trialActive: "التجربة نشطة",
          ends: "ينتهي",
          badges: {
            active: "نشط",
            trialActive: "تجربة نشطة",
            trialExpired: "انتهت التجربة",
          },
        },
        features: {
          free: {
            feature1: "الوصول إلى صفحات الهبوط العامة",
            feature2: "معاينة الفئات المميزة",
            feature3: "عرض المتاجر المميزة",
            feature4: "بيانات أفضل البائعين",
          },
          supplier: {
            feature1: "لوحة تحكم المورد والتحليلات",
            feature2: "إدارة كتالوج المنتجات (CRUD)",
            feature3: "خط أنابيب الطلبات مع تحديثات الحالة",
            feature4: "إشعارات الطلبات في الوقت الفعلي",
            feature5: "الوصول إلى استفسارات التجار",
          },
          trader: {
            feature1: "لوحة تحكم التاجر والتحليلات",
            feature2: "إدارة متاجر متعددة",
            feature3: "مزامنة المخزون عبر الموردين",
            feature4: "تتبع الطلبات والتعاون مع الفريق",
            feature5: "رؤى أداء الموردين",
          },
        },
      },
      searchPage: {
        showingResultsFor: "عرض النتائج لـ",
        noResults: {
          title: "لم يتم العثور على نتائج",
          description:
            'لم نتمكن من العثور على أي شيء يطابق "{query}". حاول تعديل البحث أو عوامل التصفية.',
          defaultDescription: "حاول البحث عن المنتجات أو المتاجر أو الفئات",
          browseCategories: "تصفح الفئات",
          viewAllStores: "عرض جميع المتاجر",
        },
        filters: {
          title: "تصفية",
          clearAll: "مسح الكل",
          category: "الفئة: {category}",
        },
        results: {
          found: "تم العثور على {products} منتجات، {stores} متاجر",
          foundIn: "تم العثور على {products} منتجات في {category}",
          sortBy: "ترتيب حسب:",
          sortOptions: {
            relevance: "الصلة",
            priceAsc: "السعر: من الأقل إلى الأعلى",
            priceDesc: "السعر: من الأعلى إلى الأقل",
          },
          related: "ذات صلة:",
          products: "منتجات",
          stores: "متاجر",
          categories: "فئات",
          visitStore: "زيارة المتجر",
          rating: "تقييم {rating}",
        },
        badges: {
          surging: "متصاعد",
        },
      },
      cartPage: {
        title: "سلة التسوق",
        description: "راجع العناصر المحددة وتابع إلى الدفع",
        item: "عنصر",
        items: "عناصر",
        itemsCount: "في سلة التسوق الخاصة بك",
        showingItems: "عرض {shown} من {total} عنصر",
        totalInCart: "({total} إجمالي في السلة)",
        each: "لكل",
        empty: {
          title: "سلة التسوق الخاصة بك فارغة",
          description: "تصفح منتجاتنا وأضف العناصر إلى سلة التسوق",
          browseProducts: "تصفح المنتجات",
        },
        filters: {
          title: "عوامل التصفية",
          clearAll: "مسح الكل",
          noMatch: {
            title: "لا توجد عناصر تطابق المرشحات الخاصة بك",
            description: "حاول تعديل معايير التصفية",
          },
          category: {
            label: "الفئة",
            all: "جميع الفئات",
          },
          brand: {
            label: "العلامة التجارية",
            all: "جميع العلامات التجارية",
          },
          minPrice: {
            label: "الحد الأدنى للسعر",
            placeholder: "0",
          },
          maxPrice: {
            label: "الحد الأقصى للسعر",
            placeholder: "لا يوجد حد",
          },
        },
        orderSummary: {
          title: "ملخص الطلب",
          items: "العناصر ({count})",
          subtotal: "المجموع الفرعي",
          taxesNote:
            "يتم حساب الضرائب وتكاليف الشحن عند الدفع بناءً على تأكيد المورد",
        },
        buttons: {
          proceedToCheckout: "المتابعة إلى الدفع",
          moveToFavorites: "نقل إلى المفضلة",
          clearCart: "مسح السلة",
        },
        ariaLabels: {
          decreaseQuantity: "تقليل الكمية",
          increaseQuantity: "زيادة الكمية",
          removeFromCart: "إزالة من السلة",
        },
      },
      favoritesPage: {
        title: "مفضلتي",
        description: "{products} منتجات و {stores} متاجر محفوظة",
        emptySubtitle: "احفظ منتجاتك ومتاجرك المفضلة للوصول السريع",
        loading: "جاري تحميل المفضلة...",
        supplierLabel: "المورد",
        empty: {
          title: "لا توجد مفضلات بعد",
          description: "ابدأ بإضافة المنتجات والمتاجر إلى مفضلاتك لرؤيتها هنا",
          browseProducts: "تصفح المنتجات",
          browseStores: "تصفح المتاجر",
        },
        filters: {
          title: "عوامل التصفية",
          clearAll: "مسح الكل",
          noMatch: {
            title: "لا توجد نتائج تطابق المرشحات الخاصة بك",
            description: "حاول تعديل معايير التصفية",
          },
          type: {
            label: "النوع",
            all: "جميع الأنواع",
            productsOnly: "المنتجات فقط",
            storesOnly: "المتاجر فقط",
          },
          category: {
            label: "الفئة",
            all: "جميع الفئات",
          },
          rating: {
            label: "التقييم الأدنى",
            all: "جميع التقييمات",
            option45: "4.5+ نجوم",
            option40: "4.0+ نجوم",
            option35: "3.5+ نجوم",
          },
        },
        sections: {
          products: {
            title: "المنتجات المفضلة",
          },
          stores: {
            title: "المتاجر المفضلة",
          },
        },
        buttons: {
          browseProducts: "تصفح المنتجات",
          browseStores: "تصفح المتاجر",
          viewStore: "عرض المتجر",
        },
      },
      productPage: {
        description: "وصف المنتج",
        marketSignals: "إشارات السوق",
        brand: "العلامة التجارية:",
        reviews: "{rating} ({count} مراجعة)",
        securePayment: "دفع آمن",
        fastShipping: "شحن سريع",
        freeReturns: "إرجاع مجاني",
        soldBy: "يباع بواسطة {name}",
        storeRating: "{rating} ({sales} مبيعات)",
        visitStore: "زيارة المتجر",
        supplierLabel: "المورد",
        availabilityLabel: "التوفر",
        actions: {
          inquiryMessage:
            "هذا المنتج متاح للاستفسار. اتصل بالمورد للحصول على السعر.",
          inCart: "في السلة",
        },
      },
      storePage: {
        reviews: "({count} مراجعة)",
        contactStore: "تواصل مع المتجر",
        about: "عن {name}",
        featuredProducts: "منتجات مميزة",
        viewAll: "عرض الكل",
        storeInfo: "معلومات المتجر",
        website: "الموقع الإلكتروني",
        verification: "التحقق",
        verifiedSeller: "بائع موثق",
        rating: "التقييم",
        sendMessage: "إرسال رسالة",
        productsFrom: "منتجات من {name}",
        location: "نيويورك، الولايات المتحدة",
      },
      accountPage: {
        guestPlan: "خطة الضيف",
        account: "حساب",
        workspace: "مساحة العمل",
        memberSince: "عضو منذ",
        role: {
          supplier: "مورد",
          trader: "تاجر",
        },
        signInRequired: {
          title: "قم بتسجيل الدخول لعرض حسابك",
          description:
            "الوصول إلى ملفك الشخصي وإدارة الاشتراكات وعرض تفاصيل حسابك",
          signIn: "تسجيل الدخول",
          createAccount: "إنشاء حساب",
          viewPlans: "عرض الخطط →",
        },
        buttons: {
          openDashboard: "فتح لوحة التحكم",
          viewPlans: "عرض الخطط",
        },
        profile: {
          title: "معلومات الملف الشخصي",
          description: "التفاصيل الشخصية ومعلومات العمل",
          edit: "تعديل",
          updating: "جاري التحديث...",
          saveChanges: "حفظ التغييرات",
          cancel: "إلغاء",
          fields: {
            fullName: "الاسم الكامل",
            email: "البريد الإلكتروني",
            phone: "الهاتف",
            role: "الدور",
            business: "العمل",
            businessType: "نوع العمل",
          },
        },
        subscription: {
          status: {
            freePreview: "معاينة مجانية",
            trialActive: "تجربة نشطة",
            trialEnded: "انتهت التجربة",
            active: "اشتراك نشط",
            expired: "انتهت التجربة",
            canceled: "ملغى",
          },
          accessLevel: "مستوى الوصول",
          trialEnds: "تنتهي التجربة",
          activated: "تم التفعيل",
          loading: "ستظهر تفاصيل الاشتراك هنا قريباً.",
          whatsIncluded: "ما المدرج",
          buttons: {
            activate: "تفعيل الوصول الكامل",
            activating: "جاري التفعيل...",
            cancel: "إلغاء الخطة",
            canceling: "جاري الإلغاء...",
            restartTrial: "إعادة تشغيل تجربة لمدة يوم واحد",
            startingTrial: "بدء التجربة...",
          },
        },
        features: {
          guest: {
            feature1: "معاينة تصفح السوق",
            feature2: "المتاجر والمنتجات المحفوظة",
            feature3: "نشرة أسبوعية",
          },
          supplier: {
            feature1: "نظرة عامة على لوحة تحكم المورد",
            feature2: "رؤى كتالوج المنتجات",
            feature3: "معاينات تتبع الطلبات",
            feature4: "أبرز طلبات عروض الأسعار",
            feature5: "أساسيات التعاون الجماعي",
          },
          trader: {
            feature1: "نظرة عامة على لوحة تحكم التاجر",
            feature2: "معاينة إدارة المتاجر",
            feature3: "أبرز تتبع المخزون",
            feature4: "قائمة قصيرة للموردين",
            feature5: "رؤى سير عمل الطلبات",
          },
        },
        help: {
          title: "تحتاج مساعدة؟",
          description:
            "تواصل مع فريقنا إذا كنت بحاجة إلى تعديل خطتك أو إضافة المزيد من أعضاء الفريق أو ربط تحليلات الموردين بمكدس CRM الخاص بك.",
          contactSupport: "اتصل بالدعم",
          comparePlans: "مقارنة الخطط",
        },
        errors: {
          signInRequired: "تحتاج إلى تسجيل الدخول لإدارة اشتراكك.",
          loadSubscriptionFailed: "حدث خطأ أثناء تحميل اشتراكك.",
          updateSubscriptionFailed: "تعذر تحديث اشتراكك الآن.",
          updateProfileFailed:
            "فشل تحديث الملف الشخصي. يرجى المحاولة مرة أخرى.",
        },
        messages: {
          activated:
            "تم تفعيل الاشتراك. استمتع بالوصول الكامل إلى مساحة العمل!",
          canceled: "تم إلغاء الاشتراك. عدت إلى المعاينة المجانية.",
          trialRestarted: "تم إعادة تشغيل التجربة ليوم آخر.",
          trialEnded: "انتهت تجربتك. قم بتفعيل خطتك للحفاظ على الوصول الكامل.",
          profileUpdated: "تم تحديث الملف الشخصي بنجاح!",
        },
      },
      settingsPage: {
        title: "الإعدادات",
        description: "إدارة تفضيلات الإشعارات وإعدادات الخصوصية",
        communication: {
          title: "الاتصالات",
          description:
            "اختر كيف يبقيك MarketHub على اطلاع حول نشاط طلبات عروض الأسعار وردود الموردين.",
          emailAlerts: "تنبيهات البريد الإلكتروني",
          weeklyDigest: "نشرة السوق الأسبوعية",
          smsNotifications: "إشعارات الرسائل النصية",
        },
        privacy: {
          title: "الخصوصية",
          description: "تحكم في من يمكنه عرض نشاط التوريد والقوائم المحفوظة.",
          displayProfile: "عرض الملف الشخصي للموردين",
          allowMessages: "السماح بطلبات الرسائل",
          shareSignals: "مشاركة إشارات الطلب المجهولة",
        },
        upgrade: {
          title: "تحتاج إلى مزيد من التحكم؟",
          description:
            "تصبح التحليلات المتقدمة وأدوار الفريق وإعدادات تسجيل الدخول الموحد متاحة بمجرد ترقية إلى خطة مدفوعة.",
          viewPlans: "عرض الخطط",
        },
      },
      dashboard: {
        nav: {
          dashboard: "لوحة التحكم",
          stores: "المتاجر",
          inventory: "المخزون",
          orders: "الطلبات",
        },
        mobileNav: {
          toggleMenu: "تبديل القائمة",
          user: "المستخدم",
          supplierAccount: "حساب المورد",
          traderAccount: "حساب التاجر",
          accountSettings: "إعدادات الحساب",
          signOut: "تسجيل الخروج",
        },
        gate: {
          errors: {
            verifySubscription: "تعذر التحقق من اشتراكك.",
            verifyAccess: "حدث خطأ أثناء التحقق من الوصول.",
          },
          loading: {
            title: "التحقق من وصولك",
            description: "انتظر بينما نؤكد تفاصيل اشتراكك.",
          },
          unauthenticated: {
            title: "يجب تسجيل الدخول",
            description: "سجل الدخول لفتح مساحة عمل المورد أو التاجر الخاصة بك.",
            signIn: "تسجيل الدخول",
            startTrial: "ابدأ تجربة مجانية",
          },
          planLabels: {
            supplier: "خطة المورد",
            trader: "خطة التاجر",
          },
          planRequired: {
            title: "يتطلب {plan}",
            manageSubscription: "إدارة الاشتراك",
            comparePlans: "مقارنة الخطط",
          },
          trialExpired: {
            description: "انتهت تجربتك. قم بتفعيل خطتك للاحتفاظ بتحليلاتك وأتمتة سير العمل وخطوط الأنابيب المحفوظة.",
          },
          planMismatch: {
            description: "قم بتفعيل الخطة الصحيحة لفتح مساحة العمل هذه. اشتراكك الحالي لا يتضمن الوصول.",
          },
          trialCallout: {
            title: "التجربة قيد التقدم",
            description: "أنت تعرض {workspace}. قم بتفعيل خطتك للحفاظ على الوصول غير المنقطع بعد انتهاء التجربة.",
            supplierWorkspace: "مساحة عمل المورد",
            traderWorkspace: "مساحة عمل التاجر",
            ends: "ينتهي",
          },
        },
      },
      supplier: {
        dashboard: {
          title: "لوحة تحكم المورد",
          description: "إدارة منتجاتك وطلباتك",
          metrics: {
            totalProducts: "إجمالي المنتجات",
            totalProductsDesc: "في جميع الفئات النشطة",
            pendingOrders: "الطلبات المعلقة",
            pendingOrdersDesc: "في انتظار التأكيد",
            inProcessing: "قيد المعالجة",
            inProcessingDesc: "قيد التحضير أو الشحن",
            revenue30d: "الإيرادات (30 يومًا)",
            revenue30dDesc: "من الطلبات المكتملة",
          },
          buttons: {
            addProduct: "إضافة منتج",
            reviewOrders: "مراجعة الطلبات",
            viewAnalytics: "عرض التحليلات",
            manage: "إدارة",
            viewAllOrders: "عرض جميع الطلبات",
          },
          sections: {
            salesTrend: "اتجاه المبيعات",
            salesTrendDesc: "الإيرادات وحجم الشحنات (آخر 6 أشهر)",
            productHealth: "صحة المنتج",
            productHealthDesc: "نظرة سريعة على جاهزية الكتالوج",
            recentOrders: "الطلبات الأخيرة",
            recentOrdersDesc: "مراقبة التقدم وخطوات التنفيذ التالية",
          },
          notifications: {
            liveUpdates: "تحديثات الطلب المباشرة:",
            orderFulfilled: "تم تنفيذ الطلب {id}",
            orderUpdated: "تم تحديث الطلب {id} إلى {status}",
          },
          table: {
            order: "الطلب",
            customer: "العميل",
            total: "المجموع",
            status: "الحالة",
            placed: "تاريخ الطلب",
          },
          status: {
            pending: "معلق",
            processing: "قيد المعالجة",
            fulfilled: "مكتمل",
            active: "نشط",
            draft: "مسودة",
          },
        },
        products: {
          title: "المنتجات",
          description: "إدارة كتالوج المنتجات الخاص بك",
          editProduct: "تعديل المنتج",
          createProduct: "إنشاء منتج",
          updateProduct: "تحديث المنتج",
          createProductButton: "إنشاء منتج",
          productList: "قائمة المنتجات",
          itemsCount: "{shown} عنصر • {total} إجمالي",
          filters: {
            allStatuses: "جميع الحالات",
            activeOnly: "النشطة فقط",
            draftOnly: "المسودة فقط",
          },
          status: {
            active: "نشط",
            draft: "مسودة",
          },
          sku: "رمز المنتج",
          inventory: "{count} وحدة",
          category: "الفئة:",
          updated: "تم التحديث",
          buttons: {
            edit: "تعديل",
            delete: "حذف",
          },
          emptyState:
            "لا توجد منتجات تطابق هذا المرشح. قم بتعديل الحالة أو إنشاء منتج جديد.",
          form: {
            labels: {
              productName: "اسم المنتج",
              sku: "رمز المنتج",
              category: "الفئة",
              inventory: "المخزون",
              status: "الحالة",
              description: "الوصف",
            },
            placeholders: {
              productName: "أدخل اسم المنتج",
              sku: "أدخل رمز المنتج",
              category: "أدخل الفئة",
              inventory: "أدخل المخزون",
              description: "أدخل الوصف",
            },
            status: {
              active: "نشط",
              draft: "مسودة",
            },
            buttons: {
              cancel: "إلغاء",
              saving: "جاري الحفظ...",
            },
          },
        },
        orders: {
          title: "الطلبات",
          description: "إدارة وتتبع طلباتك",
          revenue30d: "الإيرادات (30 يومًا)",
          stats: {
            total: "الإجمالي",
            pending: "معلق",
            processing: "قيد المعالجة",
            fulfilled: "مكتمل",
          },
          filters: {
            allStatuses: "جميع الحالات",
          },
          status: {
            pending: "معلق",
            processing: "قيد المعالجة",
            fulfilled: "مكتمل",
            cancelled: "ملغي",
          },
          table: {
            order: "الطلب",
            buyer: "المشتري",
            product: "المنتج",
            quantity: "الكمية",
            total: "المجموع",
            shipDate: "تاريخ الشحن",
            status: "الحالة",
          },
          messages: {
            orderSynced: "تم مزامنة الطلب {id} بنجاح.",
            updateFailed: "تعذر تحديث الطلب {id}.",
            retry: "تعذر تحديث الطلب. يرجى المحاولة مرة أخرى.",
          },
          errors: {
            loadFailed:
              "تعذر تحميل الطلبات. قم بالتحديث أو حاول مرة أخرى قريبًا.",
          },
          updated: "تم التحديث",
          syncing: "جاري المزامنة…",
          emptyState:
            "لا توجد طلبات في هذه الحالة. قم بتعديل المرشح لعرض طلبات أخرى.",
        },
        analytics: {
          title: "التحليلات",
          description: "مقاييس الأداء والرؤى التفصيلية",
          metrics: {
            totalRevenue: "إجمالي الإيرادات (6 أشهر)",
            totalRevenueDesc: "في جميع القنوات",
            ordersProcessed: "الطلبات المعالجة",
            ordersProcessedDesc: "المؤكدة والمشحونة",
            avgOrderValue: "متوسط قيمة الطلب",
            avgOrderValueDesc: "متوسط متحرك لـ 6 أشهر",
            peakMonth: "الشهر الذروة",
            peakMonthDesc: "أعلى إيرادات مختلطة",
          },
          charts: {
            revenueVsOrders: "الإيرادات مقابل الطلبات",
            revenueVsOrdersDesc: "تتبع إيرادات الخط العلوي مقابل حجم الشحنة",
            topProductContribution: "مساهمة المنتج الأعلى",
            topProductContributionDesc:
              "مزيج الإيرادات عبر رموز المنتجات الرائدة",
          },
          revenueByRegion: {
            title: "الإيرادات حسب المنطقة",
            description: "حيث يتسارع الطلب على كتالوجك الحالي",
            viewActivity: "عرض نشاط المشتري →",
          },
        },
      },
      trader: {
        dashboard: {
          title: "لوحة تحكم التاجر",
          description: "إدارة متاجرك والمخزون",
          metrics: {
            activeSubStores: "المتاجر الفرعية النشطة",
            activeSubStoresDesc: "إدارة تشكيلات مخصصة",
            integratedSuppliers: "الموردون المتكاملون",
            integratedSuppliersDesc: "تحليلات متتبعة لكل مورد",
            pendingOrders: "الطلبات المعلقة",
            pendingOrdersDesc: "في انتظار تأكيد المورد",
            spend30d: "الإنفاق (30 يومًا)",
            spend30dDesc: "عبر جميع قنوات التوريد",
          },
          buttons: {
            createSubStore: "إنشاء متجر فرعي",
            reviewOrders: "مراجعة الطلبات",
            manageInventory: "إدارة المخزون",
            viewAllOrders: "عرض جميع الطلبات",
          },
          sections: {
            spendTrend: "اتجاه الإنفاق",
            spendTrendDesc: "الإنفاق الشهري مقابل هوامش الربح",
            supplierContribution: "مساهمة المورد",
            supplierContributionDesc: "حصة الإيرادات المتأثرة بكل شريك",
            viewTerms: "عرض الشروط التعاقدية وأوقات التسليم",
            latestOrders: "أحدث طلبات التوريد",
            latestOrdersDesc: "تتبع التنفيذ والتواصل مع الموردين",
            inventorySnapshot: "لقطة المخزون",
            inventorySnapshotDesc: "مستويات المخزون التي يتم تحديثها تلقائيًا عبر الموردين",
          },
          notifications: {
            realTimeUpdates: "تحديثات المخزون في الوقت الفعلي:",
            restocked: "تم تجديد {product} بمقدار {delta}",
            sold: "تم بيع {delta} وحدة من {product}",
          },
          table: {
            order: "الطلب",
            store: "المتجر",
            supplier: "المورد",
            value: "القيمة",
            status: "الحالة",
          },
          status: {
            pending: "معلق",
            confirmed: "مؤكد",
            inTransit: "قيد العبور",
            delivered: "تم التسليم",
          },
          sku: "رمز المنتج",
          units: "{count} وحدة",
        },
        store: {
          title: "المتاجر",
          description: "إنشاء وإدارة متاجرك الفرعية",
          createTitle: "إنشاء متجر فرعي جديد",
          createDescription: "تقسيم المشترين حسب القناة أو الجغرافيا أو استراتيجية التشكيل.",
          existingStores: "المتاجر الموجودة",
          itemsCount: "{shown} متجر(ات) • {total} إجمالي",
          created: "تم الإنشاء",
          operatingRegion: "🌍 منطقة التشغيل:",
          connectSuppliers: "قم بربط الموردين بهذا المتجر من لوحة التحكم بالمخزون.",
          buttons: {
            delete: "حذف",
          },
          filters: {
            allChannels: "جميع القنوات",
          },
          form: {
            labels: {
              storeName: "اسم المتجر",
              channel: "القناة",
              region: "المنطقة",
              focus: "التركيز",
            },
            placeholders: {
              storeName: "مثال: متجر نورث ويند التجزئة أوروبا",
              region: "مثال: أوروبا، آسيا والمحيط الهادئ",
              focus: "ما المنتجات أو احتياجات المشترين التي يلبيها هذا المتجر؟",
            },
            channels: {
              marketplace: "السوق",
              wholesale: "الجملة",
              directRetail: "تجارة التجزئة المباشرة",
            },
            buttons: {
              creating: "جاري الإنشاء...",
              createStore: "إنشاء متجر",
            },
          },
          emptyState: "لا توجد متاجر تطابق هذا الفلتر. قم بتعديل القناة أو إنشاء متجر جديد.",
          errors: {
            networkError: "خطأ في الشبكة. يرجى إعادة المحاولة.",
          },
        },
        inventory: {
          title: "المخزون",
          description: "مراقبة وإدارة مستويات المخزون لديك",
          metrics: {
            totalUnits: "إجمالي الوحدات",
            healthySKUs: "رموز المنتجات الصحية",
            lowStockSKUs: "رموز المنتجات منخفضة المخزون",
            criticalSKUs: "رموز المنتجات الحرجة",
          },
          notifications: {
            liveUpdates: "التحديثات الحية:",
            replenished: "تم تجديد {product} بمقدار {delta} وحدة",
            sold: "تم بيع {delta} وحدة من {product}",
          },
          filters: {
            allSuppliers: "جميع الموردين",
            allStores: "جميع المتاجر",
          },
          realTimeNote: "💡 تعكس التحديثات الفورية تأكيدات الموردين",
          table: {
            product: "المنتج",
            supplier: "المورد",
            store: "المتجر",
            sku: "رمز المنتج",
            stock: "المخزون",
            reorderPoint: "نقطة إعادة الطلب",
            actions: "الإجراءات",
          },
          status: {
            healthy: "صحي",
            low: "منخفض",
            critical: "حرج",
          },
          statusMessages: {
            critical: "⚠️ إجراء مطلوب: تصعيد إعادة تجديد المورد",
            low: "⏰ مراقبة الطلب عن كثب",
            healthy: "✅ المخزون ضمن النطاق الآمن",
          },
          buttons: {
            restock: "تجديد +25",
            allocate: "تخصيص -20",
          },
          units: "{count} وحدة",
          emptyState: "لا توجد عناصر مخزون تطابق هذا العرض. قم بتعديل فلاتر المورد أو المتجر.",
        },
        orders: {
          title: "الطلبات",
          description: "تتبع وإدارة طلبات التوريد",
          stats: {
            totalSpend: "إجمالي الإنفاق",
            total: "الإجمالي",
            pending: "معلق",
            confirmed: "مؤكد",
            inTransit: "قيد العبور",
            delivered: "تم التسليم",
            cancelled: "ملغى",
          },
          filters: {
            allStatuses: "جميع الحالات",
          },
          status: {
            pending: "معلق",
            confirmed: "مؤكد",
            inTransit: "قيد العبور",
            delivered: "تم التسليم",
            cancelled: "ملغى",
          },
          table: {
            order: "الطلب",
            store: "المتجر",
            supplier: "المورد",
            products: "المنتجات",
            quantity: "الكمية",
            value: "القيمة",
            eta: "الوقت المتوقع للوصول",
            status: "الحالة",
          },
          placed: "تم الطلب",
          syncing: "جاري المزامنة مع المورد…",
          emptyState: "لا توجد طلبات بهذه الحالة. قم بتعديل الفلتر لعرض طلبات أخرى.",
          errors: {
            syncError: "تعذر مزامنة التغييرات. يرجى إعادة المحاولة.",
          },
        },
      },
      contactPage: {
        title: "تواصل معنا",
        subtitle: "هل لديك أسئلة حول سوقنا؟ فريقنا مستعد لمساعدتك.",
        info: {
          email: { title: "راسلنا", sub: "سنرد خلال 24 ساعة." },
          phone: {
            title: "اتصل بنا",
            sub: "من الاثنين إلى الجمعة من 8 صباحًا إلى 5 مساءً بتوقيت شرق الولايات المتحدة.",
          },
          visit: { title: "زرنا" },
          hours: {
            title: "ساعات العمل",
            days: "الاثنين - الجمعة",
            time: "9:00 ص - 6:00 م",
          },
        },
        form: {
          title: "أرسل لنا رسالة",
          subtitle: "املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن.",
          labels: {
            name: "الاسم الكامل",
            email: "البريد الإلكتروني",
            phone: "رقم الهاتف",
            subject: "الموضوع",
            message: "الرسالة",
          },
          placeholders: {
            name: "فلان الفلاني",
            email: "example@domain.com",
            phone: "+966 50 000 0000",
            message: "كيف يمكننا مساعدتك؟",
          },
          options: {
            select: "اختر موضوعًا",
            general: "استفسار عام",
            support: "الدعم الفني",
            sales: "المبيعات والشراكات",
            billing: "سؤال الفواتير",
          },
          submit: "إرسال الرسالة",
          sending: "جاري الإرسال...",
          success: {
            title: "تم إرسال الرسالة!",
            message:
              "شكرًا لتواصلك معنا. لقد استلمنا رسالتك وسنرد عليك قريبًا.",
            button: "إرسال رسالة أخرى",
          },
          error: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقًا.",
        },
      },
      servicesPage: {
        hero: {
          title: "خدمات تنمو معك",
          description:
            "أدوات وخدمات شاملة مصممة لمساعدة الموردين والتجار والشركات على النجاح في السوق العالمية.",
          getStarted: "ابدأ الآن",
          contactSales: "اتصل بالمبيعات",
        },
        services: {
          marketplace: {
            title: "سوق متعدد البائعين",
            description:
              "الوصول إلى شبكة عالمية من الموردين والتجار الموثوقين. ادرج منتجاتك واكتشف فرصًا جديدة ونم عملك.",
          },
          analytics: {
            title: "تحليلات متقدمة",
            description:
              "احصل على رؤى حول اتجاهات السوق وأداء المنتجات ومقاييس الأعمال مع لوحة التحليلات القوية الخاصة بنا.",
          },
          inventory: {
            title: "إدارة المخزون",
            description:
              "بسط عمليات المخزون الخاصة بك باستخدام أدوات الإدارة الشاملة المصممة للتجار والموردين.",
          },
          secure: {
            title: "معاملات آمنة",
            description:
              "تداول بثقة مع العلم أن معاملاتك محمية بإجراءات أمنية رائدة في الصناعة وأنظمة التحقق.",
          },
          search: {
            title: "بحث متقدم",
            description:
              "اعثر على ما تبحث عنه بالضبط باستخدام نظام البحث الذكي الخاص بنا الذي يرشح المنتجات والمتاجر والموردين.",
          },
          tools: {
            title: "أدوات المورد والتاجر",
            description:
              "لوحات تحكم وأدوات متخصصة للموردين والتجار لإدارة عملياتهم وطلباتهم وتحليلاتهم.",
          },
          insights: {
            title: "رؤى السوق",
            description:
              "ابق متقدمًا على المنافسة مع إشارات السوق في الوقت الفعلي والاتجاهات ومؤشرات الزخم لمنتجاتك.",
          },
          support: {
            title: "دعم على مدار الساعة",
            description:
              "احصل على المساعدة متى احتجتها مع فريق دعم العملاء على مدار الساعة جاهز لمساعدتك.",
          },
          logistics: {
            title: "خدمات لوجستية عالمية",
            description:
              "حلول شحن ولوجستية متكاملة لمساعدتك على الوصول إلى العملاء في جميع أنحاء العالم بسهولة وكفاءة.",
          },
        },
        cta: {
          title: "هل أنت مستعد لتحويل عملك؟",
          description:
            "انضم إلى آلاف الشركات التي تنمو بالفعل مع تاجير جملة هب. ابدأ تجربتك المجانية اليوم.",
          createAccount: "إنشاء حساب",
          contactSales: "اتصل بالمبيعات",
        },
      },
      careersPage: {
        hero: {
          title: "انضم إلى فريقنا",
          description:
            "ساعدنا في بناء مستقبل التجارة العالمية. نبحث عن أفراد شغوفين يريدون إحداث تأثير.",
        },
        whyWork: {
          title: "لماذا تعمل في تاجير جملة هب؟",
          description:
            "نحن نبني منصة تربط الشركات حول العالم. انضم إلينا في خلق تأثير ذي معنى.",
        },
        benefits: {
          compensation: {
            title: "تعويضات تنافسية",
            description: "نقدم رواتب تنافسية وحزم مزايا شاملة.",
          },
          health: {
            title: "الصحة والعافية",
            description: "تأمين طبي وأسنان ورؤية بالإضافة إلى برامج العافية.",
          },
          learning: {
            title: "التعلم والتطوير",
            description: "فرص التعلم المستمر ودعم التطوير المهني.",
          },
          flexible: {
            title: "عمل مرن",
            description:
              "خيارات العمل عن بُعد وساعات مرنة لدعم التوازن بين العمل والحياة.",
          },
          impact: {
            title: "تأثير عالمي",
            description: "اعمل على منتجات تربط الشركات حول العالم.",
          },
          innovation: {
            title: "ثقافة الابتكار",
            description: "كن جزءًا من فريق يقدر الإبداع والابتكار.",
          },
        },
        values: {
          title: "قيمنا",
          innovation: "الابتكار والتحسين المستمر",
          transparency: "الشفافية والتواصل المفتوح",
          workLifeBalance: "التوازن بين العمل والحياة ورفاهية الموظفين",
          diversity: "التنوع والإنصاف والشمول",
          customerFirst: "عقلية العميل أولاً",
          collaboration: "التعاون والعمل الجماعي",
        },
        openPositions: {
          title: "الوظائف الشاغرة",
          description:
            "استكشف الوظائف المتاحة حالياً واعثر على الدور المثالي لك.",
          applyNow: "تقدم الآن",
        },
        positions: {
          seniorDeveloper: {
            title: "مطور Full Stack كبير",
            department: "الهندسة",
            location: "عن بُعد / سان فرانسيسكو، كاليفورنيا",
            type: "دوام كامل",
          },
          productManager: {
            title: "مدير المنتج",
            department: "المنتج",
            location: "عن بُعد / نيويورك، نيويورك",
            type: "دوام كامل",
          },
          uxDesigner: {
            title: "مصمم تجربة المستخدم",
            department: "التصميم",
            location: "عن بُعد / لندن، المملكة المتحدة",
            type: "دوام كامل",
          },
          businessDev: {
            title: "مدير تطوير الأعمال",
            department: "المبيعات",
            location: "دبي، الإمارات العربية المتحدة",
            type: "دوام كامل",
          },
          customerSuccess: {
            title: "أخصائي نجاح العملاء",
            department: "الدعم",
            location: "عن بُعد",
            type: "دوام كامل",
          },
          dataAnalyst: {
            title: "محلل بيانات",
            department: "التحليلات",
            location: "عن بُعد / برلين، ألمانيا",
            type: "دوام كامل",
          },
        },
        process: {
          title: "عملية التقديم",
          steps: {
            apply: {
              title: "تقديم",
              description:
                "قدم طلبك من خلال بوابة الوظائف الخاصة بنا أو أرسل لنا سيرتك الذاتية وخطاب التغطية عبر البريد الإلكتروني.",
            },
            review: {
              title: "المراجعة الأولية",
              description:
                "يراجع فريقنا طلبك ومؤهلاتك. سنتواصل معك إذا كان هناك تطابق.",
            },
            interview: {
              title: "المقابلة",
              description:
                "سيخضع المرشحون المختارون للمقابلات مع الفريق، بما في ذلك تقييمات الملاءمة التقنية والثقافية.",
            },
            offer: {
              title: "العرض",
              description:
                "يتلقى المرشحون الناجحون عرضاً مع تفاصيل حول التعويضات والمزايا وتاريخ البدء.",
            },
          },
        },
        contact: {
          title: "لا تجد دوراً يناسبك؟",
          description:
            "نحن نبحث دائمًا عن أفراد موهوبين. أرسل لنا سيرتك الذاتية وسنضعك في الاعتبار للفرص المستقبلية.",
          contactUs: "اتصل بنا",
        },
      },
      pressPage: {
        hero: {
          title: "الصحافة والإعلام",
          description:
            "أحدث الأخبار والبيانات الصحفية والموارد للصحفيين ومهنيي الإعلام.",
        },
        releases: {
          title: "البيانات الصحفية",
          description: "ابق على اطلاع بأحدث أخبار الشركة وإعلاناتنا.",
          readMore: "اقرأ المزيد",
          release1: {
            date: "15 مارس 2024",
            title: "تاجير جملة هب تطلق مبادرة التوسع العالمي",
            excerpt:
              "تعلن الشركة عن خطط لتوسيع العمليات إلى 20 دولة جديدة، وربط المزيد من الشركات حول العالم.",
            category: "أخبار الشركة",
          },
          release2: {
            date: "28 فبراير 2024",
            title:
              "لوحة التحليلات الجديدة تساعد الشركات على اتخاذ قرارات مدفوعة بالبيانات",
            excerpt:
              "تقدم المنصة أدوات تحليلية متقدمة توفر رؤى في الوقت الفعلي حول اتجاهات السوق وأداء الأعمال.",
            category: "تحديث المنتج",
          },
          release3: {
            date: "10 يناير 2024",
            title: "تاجير جملة هب تصل إلى معلم 10,000 شركة نشطة",
            excerpt:
              "يحتفل السوق بمعلم نمو كبير مع أكثر من 10,000 شركة نشطة تستخدم المنصة.",
            category: "معلم",
          },
          release4: {
            date: "5 ديسمبر 2023",
            title: "إعلان شراكة مع مزودي الخدمات اللوجستية الرائدين",
            excerpt:
              "تمكن الشراكات الجديدة من شحن أسرع وحلول لوجستية أفضل لمستخدمي المنصة.",
            category: "شراكة",
          },
        },
        facts: {
          title: "حقائق الشركة",
          founded: { label: "تأسست", value: "2020" },
          headquarters: {
            label: "المقر الرئيسي",
            value: "سان فرانسيسكو، كاليفورنيا",
          },
          businesses: { label: "الشركات النشطة", value: "10,000+" },
          countries: { label: "الدول المخدومة", value: "50+" },
          team: { label: "أعضاء الفريق", value: "150+" },
          products: { label: "المنتجات المدرجة", value: "500,000+" },
        },
        mediaKit: {
          title: "الحزمة الإعلامية",
          description: "قم بتنزيل الموارد والأصول لمقالاتك وتغطيتك.",
          logo: {
            title: "شعار الشركة والأصول التجارية",
            description:
              "شعارات عالية الدقة وإرشادات العلامة التجارية والأصول المرئية",
            action: "تنزيل الأصول",
          },
          factSheet: {
            title: "نشرة حقائق الشركة",
            description: "حقائق وإحصائيات رئيسية ومعلومات الشركة بتنسيق PDF",
            action: "تنزيل PDF",
          },
          bios: {
            title: "السير الذاتية للمديرين",
            description: "السير الذاتية وصور فريق قيادة الشركة",
            action: "عرض السير الذاتية",
          },
          screenshots: {
            title: "لقطات شاشة المنتج",
            description: "لقطات شاشة عالية الجودة للمنصة والميزات الرئيسية",
            action: "تنزيل الصور",
          },
        },
        about: {
          title: "عن تاجير جملة هب",
          paragraph1:
            "تاجير جملة هب هي منصة سوق متعدد البائعين الرائدة التي تربط الشركات حول العالم. نوفر نظامًا بيئيًا شاملاً حيث يمكن للموردين والتجار والشركات اكتشاف والتواصل والتداول بثقة.",
          paragraph2:
            "تجمع منصتنا بين التكنولوجيا المتقدمة والمعاملات الآمنة والخدمات اللوجستية العالمية لتبسيط التجارة الدولية. مع أكثر من 10,000 شركة نشطة وعمليات تمتد عبر 50+ دولة، نحن نبني مستقبل التجارة العالمية.",
          paragraph3:
            "تأسست في عام 2020، أصبحت تاجير جملة هب بسرعة شريكًا موثوقًا للشركات التي تتطلع إلى توسيع نطاقها وتبسيط عمليات سلسلة التوريد الخاصة بها.",
        },
        contact: {
          title: "الاستفسارات الصحفية",
          description:
            "للاستفسارات الإعلامية أو طلبات المقابلات أو معلومات إضافية، يرجى الاتصال بفريق الصحافة لدينا.",
          contactForm: "نموذج الاتصال",
          info: {
            title: "معلومات الاتصال بالصحافة",
            email: {
              label: "البريد الإلكتروني",
              value: "press@tajirjomlahub.com",
            },
            phone: { label: "الهاتف", value: "+1 (555) 123-4567" },
            address: {
              label: "العنوان",
              value:
                "123 شارع السوق، جناح 456، سان فرانسيسكو، كاليفورنيا 94105",
            },
            responseTime: {
              label: "وقت الاستجابة",
              value: "عادة ما نرد على الاستفسارات الصحفية خلال 24 ساعة.",
            },
          },
        },
      },
      customerSupportPage: {
        hero: {
          title: "كيف يمكننا مساعدتك؟",
          description:
            "ابحث في مركز المساعدة لدينا أو اتصل بفريق الدعم للحصول على المساعدة.",
          searchPlaceholder: "ابحث عن المساعدة...",
        },
        contact: {
          email: {
            title: "دعم البريد الإلكتروني",
            description: "أرسل لنا بريدًا إلكترونيًا وسنرد خلال 24 ساعة",
            contact: "support@tajirjomlahub.com",
          },
          phone: {
            title: "دعم الهاتف",
            description: "اتصل بنا للحصول على مساعدة فورية خلال ساعات العمل",
            contact: "+1 (555) 123-4567",
          },
          chat: {
            title: "الدردشة المباشرة",
            description: "تحدث مع فريق الدعم لدينا في الوقت الفعلي",
            contact: "متاح على مدار الساعة",
          },
          response: {
            title: "أوقات الاستجابة",
            description: "نهدف إلى الرد على جميع الاستفسارات بسرعة",
            contact: "خلال 24 ساعة",
          },
        },
        commonQuestions: {
          title: "الأسئلة الشائعة",
          viewAll: "عرض جميع الأسئلة الشائعة",
        },
        questions: {
          question1: {
            q: "كيف يمكنني إنشاء حساب؟",
            a: "انقر على زر 'تسجيل' في شريط التنقل العلوي، واملأ تفاصيلك، وتحقق من عنوان بريدك الإلكتروني.",
          },
          question2: {
            q: "كيف يمكنني إعادة تعيين كلمة المرور؟",
            a: "انتقل إلى صفحة تسجيل الدخول وانقر على 'نسيت كلمة المرور'. أدخل عنوان بريدك الإلكتروني واتبع التعليمات المرسلة إلى صندوق الوارد الخاص بك.",
          },
          question3: {
            q: "كيف يمكنني تقديم طلب؟",
            a: "تصفح المنتجات وأضف العناصر إلى سلة التسوق الخاصة بك وانتقل إلى الدفع. ستحتاج إلى خطة اشتراك نشطة لإكمال المشتريات.",
          },
          question4: {
            q: "كيف يمكنني تتبع طلبي؟",
            a: "انتقل إلى لوحة تحكم حسابك وانتقل إلى قسم 'الطلبات'. ستجد معلومات التتبع لجميع طلباتك هناك.",
          },
        },
        resources: {
          title: "موارد مفيدة",
          faq: {
            title: "الأسئلة الشائعة",
            description: "ابحث عن إجابات للأسئلة المتكررة",
          },
          shipping: {
            title: "معلومات الشحن",
            description: "تعرف على سياسات وخيارات الشحن الخاصة بنا",
          },
          returns: {
            title: "الإرجاع والاسترداد",
            description: "افهم سياسة وإجراءات الإرجاع الخاصة بنا",
          },
          seller: {
            title: "اتفاقية البائع",
            description: "اقرأ شروطنا للبيع على تاجير جملة هب",
          },
        },
      },
      shippingInfoPage: {
        hero: {
          title: "الشحن والتسليم",
          description: "كل ما تحتاج لمعرفته حول كيفية وصول منتجاتك إليك.",
        },
        features: {
          fast: {
            title: "تسليم سريع",
            description:
              "نتعاون مع مزودي الخدمات اللوجستية من الدرجة الأولى لضمان وصول طلباتك في الوقت المحدد، في كل مرة.",
          },
          global: {
            title: "الشحن العالمي",
            description:
              "نشحن إلى أكثر من 50 دولة حول العالم مع تتبع موثوق ومعالجة الجمارك.",
          },
          secure: {
            title: "تغليف آمن",
            description:
              "يتم تغليف جميع العناصر بعناية لضمان وصولها في حالة مثالية.",
          },
        },
        methods: {
          title: "طرق ومعدلات الشحن",
          table: {
            method: "الطريقة",
            deliveryTime: "وقت التسليم",
            cost: "التكلفة",
          },
          standard: {
            method: "الشحن القياسي",
            deliveryTime: "5-7 أيام عمل",
            cost: "مجاني للطلبات التي تزيد عن 50 دولارًا",
          },
          express: {
            method: "الشحن السريع",
            deliveryTime: "2-3 أيام عمل",
            cost: "15.00 دولار",
          },
          overnight: {
            method: "الشحن بين عشية وضحاها",
            deliveryTime: "اليوم التالي",
            cost: "35.00 دولار",
          },
          international: {
            method: "معايير دولية",
            deliveryTime: "7-14 يوم عمل",
            cost: "محسوب عند الدفع",
          },
        },
        timeline: {
          title: "كيف يعمل",
          processing: {
            title: "معالجة الطلب",
            description:
              "بمجرد تقديم طلبك، يؤكد موردونا التوافر ويجهزون العناصر الخاصة بك للشحن. عادة ما يستغرق هذا 1-2 يوم عمل.",
          },
          quality: {
            title: "فحص الجودة",
            description:
              "تخضع العناصر لفحص جودة لضمان تلبيتها لمعاييرنا قبل التعبئة.",
          },
          shipped: {
            title: "الشحن والتتبع",
            description:
              "يتم تسليم طردك إلى الناقل. ستحصل على رقم تتبع عبر البريد الإلكتروني لمراقبة رحلته.",
          },
          delivery: {
            title: "التسليم",
            description:
              "يقوم الناقل بتسليم طردك إلى باب منزلك أو موقع التسليم المحدد.",
          },
        },
      },
      policyPages: {
        lastUpdated: "آخر تحديث",
      },
      breadcrumbs: {
        home: "الرئيسية",
        dashboard: "لوحة التحكم",
        supplier: "المورد",
        trader: "التاجر",
        products: "المنتجات",
        orders: "الطلبات",
        analytics: "التحليلات",
        inventory: "المخزون",
        store: "المتجر",
        contact: "اتصل بنا",
        plans: "الخطط",
        search: "بحث",
        stores: "المتاجر",
        cart: "السلة",
        account: "الحساب",
        favorites: "المفضلة",
        settings: "الإعدادات",
        login: "تسجيل الدخول",
        register: "إنشاء حساب",
        about: "من نحن",
        services: "الخدمات",
        customerSupport: "دعم العملاء",
        shippingInfo: "معلومات الشحن",
        faq: "الأسئلة الشائعة",
        privacyPolicy: "سياسة الخصوصية",
        termsOfService: "شروط الخدمة",
        cookiePolicy: "سياسة ملفات تعريف الارتباط",
        sellerAgreement: "اتفاقية البائع",
        returnsRefunds: "الإرجاع والاسترداد",
        topProducts: "أفضل المنتجات",
        careers: "الوظائف",
        press: "الصحافة",
      },
      privacyPolicyPage: {
        title: "سياسة الخصوصية",
        description: "نحن نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية.",
        sections: {
          introduction: {
            title: "1. مقدمة",
            content:
              "في تاجير جملة هب، نحن ملتزمون بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وكشف وحماية معلوماتك عند استخدام منصة السوق الخاصة بنا. يرجى قراءة هذه السياسة بعناية لفهم ممارساتنا فيما يتعلق ببياناتك الشخصية.",
          },
          informationWeCollect: {
            title: "2. المعلومات التي نجمعها",
            content:
              "نجمع المعلومات التي تقدمها لنا مباشرة، بما في ذلك:\n• معلومات الحساب (الاسم وعنوان البريد الإلكتروني وكلمة المرور)\n• معلومات الملف الشخصي (تفاصيل الأعمال والتفضيلات)\n• معلومات المعاملات (سجل الطلبات وتفاصيل الدفع)\n• بيانات الاتصال (الرسائل وتذاكر الدعم)\n• بيانات الاستخدام (كيفية تفاعلك مع منصتنا)\n• معلومات الجهاز (عنوان IP ونوع المتصفح ومعرفات الجهاز)",
          },
          howWeUse: {
            title: "3. كيفية استخدام معلوماتك",
            content:
              "نستخدم المعلومات التي نجمعها من أجل:\n• توفير وصيانة وتحسين خدماتنا\n• معالجة المعاملات وإرسال المعلومات ذات الصلة\n• إرسال إشعارات فنية ورسائل دعم\n• الرد على تعليقاتك وأسئلتك\n• مراقبة وتحليل الاتجاهات والاستخدام\n• اكتشاف ومنع ومعالجة المشاكل التقنية\n• تخصيص تجربتك على منصتنا",
          },
          informationSharing: {
            title: "4. مشاركة المعلومات",
            content:
              "نحن لا نبيع معلوماتك الشخصية. قد نشارك معلوماتك في الحالات التالية:\n• مع مقدمي الخدمات الذين يساعدوننا في تشغيل منصتنا\n• عندما يتطلب القانون ذلك أو لحماية حقوقنا\n• فيما يتعلق بنقل الأعمال أو الاندماج\n• بموافقتك أو بتوجيه منك",
          },
          dataSecurity: {
            title: "5. أمان البيانات",
            content:
              "ننفذ التدابير التقنية والتنظيمية المناسبة لحماية معلوماتك الشخصية ضد الوصول غير المصرح به أو التعديل أو الكشف أو التدمير. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت آمنة بنسبة 100%، ولا يمكننا ضمان الأمان المطلق.",
          },
          yourRights: {
            title: "6. حقوقك",
            content:
              "لديك الحق في:\n• الوصول والحصول على نسخة من بياناتك الشخصية\n• تصحيح البيانات غير الدقيقة أو غير المكتملة\n• طلب حذف بياناتك الشخصية\n• الاعتراض على معالجة بياناتك الشخصية\n• طلب تقييد المعالجة\n• نقل البيانات\n• سحب الموافقة في أي وقت",
          },
          cookies: {
            title: "7. ملفات تعريف الارتباط وتقنيات التتبع",
            content:
              "نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة لتتبع النشاط على منصتنا وتخزين معلومات معينة. يمكنك تعليم متصفحك برفض جميع ملفات تعريف الارتباط أو للإشارة عند إرسال ملف تعريف الارتباط. ومع ذلك، إذا لم تقبل ملفات تعريف الارتباط، فقد لا تتمكن من استخدام بعض أجزاء منصتنا.",
          },
          childrensPrivacy: {
            title: "8. خصوصية الأطفال",
            content:
              "منصتنا ليست مخصصة للأطفال دون سن 18 عامًا. نحن لا نجمع عن قصد معلومات شخصية من الأطفال. إذا كنت أحد الوالدين أو الوصي وتعتقد أن طفلك قد قدم لنا معلومات شخصية، يرجى الاتصال بنا.",
          },
          changes: {
            title: "9. التغييرات على هذه السياسة",
            content:
              'قد نحدّث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات عن طريق نشر سياسة الخصوصية الجديدة على هذه الصفحة وتحديث تاريخ "آخر تحديث". يُنصح بمراجعة سياسة الخصوصية هذه بشكل دوري لأي تغييرات.',
          },
          contact: {
            title: "10. اتصل بنا",
            content:
              "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على:\n\nالبريد الإلكتروني: privacy@tajirjomlahub.com\nالعنوان: 123 شارع السوق، جناح 456، سان فرانسيسكو، كاليفورنيا 94105\nالهاتف: +1 (555) 123-4567",
          },
        },
      },
      termsOfServicePage: {
        title: "شروط الخدمة",
        description: "يرجى قراءة هذه الشروط بعناية قبل استخدام منصتنا.",
        sections: {
          acceptance: {
            title: "1. قبول الشروط",
            content:
              "من خلال الوصول إلى تاجير جملة هب أو استخدامها، فإنك توافق على الالتزام بشروط الخدمة هذه وجميع القوانين واللوائح المعمول بها. إذا كنت لا توافق على أي من هذه الشروط، فأنت ممنوع من استخدام هذا الموقع أو الوصول إليه.",
          },
          useLicense: {
            title: "2. ترخيص الاستخدام",
            content:
              'يُمنح الإذن لتنزيل نسخة واحدة مؤقتة من المواد (المعلومات أو البرامج) على موقع تاجير جملة هب للعرض المؤقت الشخصي وغير التجاري فقط. هذا هو منح ترخيص وليس نقل ملكية، وتحت هذا الترخيص قد لا:\n• تعديل أو نسخ المواد؛\n• استخدام المواد لأي غرض تجاري، أو لأي عرض عام (تجاري أو غير تجاري)؛\n• محاولة فك التشفير أو الهندسة العكسية لأي برنامج موجود على موقع تاجير جملة هب؛\n• إزالة أي حقوق طبع ونشر أو إشعارات ملكية أخرى من المواد؛ أو\n• نقل المواد إلى شخص آخر أو "نسخ" المواد على أي خادم آخر.',
          },
          userAccounts: {
            title: "3. حسابات المستخدمين",
            content:
              "للوصول إلى ميزات معينة في المنصة، قد يُطلب منك إنشاء حساب. أنت مسؤول عن الحفاظ على سرية حسابك وكلمة المرور وتقييد الوصول إلى جهاز الكمبيوتر الخاص بك. أنت توافق على قبول المسؤولية عن جميع الأنشطة التي تحدث تحت حسابك أو كلمة المرور الخاصة بك.",
          },
          marketplaceRules: {
            title: "4. قواعد السوق",
            content:
              "كمستخدم لسوقنا، أنت توافق على عدم:\n• نشر محتوى كاذب أو غير دقيق أو مضلل أو قذف أو تشهير؛\n• انتهاك أي قوانين أو حقوق أطراف ثالثة أو سياساتنا؛\n• توزيع أو نشر بريد عشوائي أو اتصالات إلكترونية غير مطلوبة أو مجمعة؛\n• توزيع فيروسات أو أي تقنيات أخرى قد تضر بتاجير جملة هب أو مصالح أو ممتلكات مستخدمي تاجير جملة هب؛\n• حصاد أو جمع معلومات حول المستخدمين، بما في ذلك عناوين البريد الإلكتروني، دون موافقتهم.",
          },
          disclaimer: {
            title: "5. إخلاء المسؤولية",
            content:
              'يتم تقديم المواد على موقع تاجير جملة هب على أساس "كما هي". لا تقدم تاجير جملة هب أي ضمانات، صريحة أو ضمنية، وتنفي صراحة جميع الضمانات الأخرى بما في ذلك، دون حصر، الضمانات الضمنية أو شروط القابلية للتسويق أو الملاءمة لغرض معين، أو عدم انتهاك حقوق الملكية الفكرية أو انتهاك آخر للحقوق.',
          },
          limitations: {
            title: "6. القيود",
            content:
              "في أي حال من الأحوال لن تكون تاجير جملة هب أو موردوها مسؤولين عن أي أضرار (بما في ذلك، دون حصر، الأضرار الناتجة عن فقدان البيانات أو الربح، أو بسبب انقطاع الأعمال) الناشئة عن استخدام أو عدم القدرة على استخدام المواد على موقع تاجير جملة هب، حتى لو تم إخطار تاجير جملة هب أو ممثل مفوض من تاجير جملة هب شفهيًا أو كتابيًا بإمكانية حدوث مثل هذه الأضرار.",
          },
          governingLaw: {
            title: "7. القانون الحاكم",
            content:
              "هذه الشروط والأحكام تحكمها وتفسر وفقًا لقوانين الولاية القضائية التي تعمل فيها تاجير جملة هب وتخضع بشكل لا رجعة فيه للولاية القضائية الحصرية للمحاكم في تلك الولاية أو الموقع.",
          },
          changes: {
            title: "8. التغييرات على الشروط",
            content:
              "تحتفظ تاجير جملة هب بالحق، وفقًا لتقديرها الخاص، بتعديل أو استبدال هذه الشروط في أي وقت. إذا كان التنقيح مهمًا، فسنسعى لتوفير إشعار قبل 30 يومًا على الأقل قبل سريان أي شروط جديدة. سيتم تحديد ما يشكل تغييرًا مهمًا وفقًا لتقديرنا الخاص.",
          },
          contact: {
            title: "9. اتصل بنا",
            content:
              "إذا كان لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا على:\n\nالبريد الإلكتروني: legal@tajirjomlahub.com\nالعنوان: 123 شارع السوق، جناح 456، سان فرانسيسكو، كاليفورنيا 94105",
          },
        },
      },
      sellerAgreementPage: {
        title: "اتفاقية البائع",
        description: "الشروط والأحكام للبيع على تاجير جملة هب.",
        sections: {
          introduction: {
            title: "1. مقدمة",
            content:
              'هذه اتفاقية البائع ("الاتفاقية") هي بينك ("البائع") وتاجير جملة هب ("الشركة") وتنظم استخدامك لسوق تاجير جملة هب لبيع المنتجات أو الخدمات. من خلال التسجيل كبائع، أنت توافق على الالتزام بهذه الاتفاقية.',
          },
          obligations: {
            title: "2. التزامات البائع",
            content:
              "كبائع على تاجير جملة هب، أنت توافق على:\n• تقديم معلومات دقيقة وكاملة حول منتجاتك أو خدماتك.\n• تنفيذ الطلبات بطريقة في الوقت المناسب ومهنية.\n• الامتثال لجميع القوانين واللوائح المعمول بها.\n• الحفاظ على معايير عالية من خدمة العملاء.\n• احترام حقوق الملكية الفكرية للآخرين.",
          },
          fees: {
            title: "3. الرسوم والمدفوعات",
            content:
              "تتقاضى تاجير جملة هب عمولة على كل عملية بيع تتم من خلال المنصة. معدلات العمولة الحالية محددة في جدول الرسوم الخاص بنا. تتم معالجة المدفوعات للبائعين وفقًا لسياسة الدفع الخاصة بنا، عادة على أساس كل أسبوعين، مع مراعاة أي فترات احتجاز للإرجاع أو النزاعات.",
          },
          prohibitedItems: {
            title: "4. العناصر المحظورة",
            content:
              "لا يجوز لك بيع أي عناصر غير قانونية أو مقلدة أو خطيرة أو تنتهك سياسة العناصر المحظورة الخاصة بنا. تحتفظ تاجير جملة هب بالحق في إزالة أي إدراج ينتهك هذه السياسة وتعليق أو إنهاء حساب أي بائع ينتهك هذه السياسة بشكل متكرر.",
          },
          intellectualProperty: {
            title: "5. الملكية الفكرية",
            content:
              "أنت تمثل وتضمن أنك تمتلك أو لديك التراخيص والحقوق والموافقات والأذونات اللازمة لاستخدام وتفويض تاجير جملة هب لاستخدام جميع حقوق الملكية الفكرية في محتواك ومنتجاتك.",
          },
          termination: {
            title: "6. الإنهاء",
            content:
              "قد ينهي أي طرف هذه الاتفاقية في أي وقت بإشعار كتابي. عند الإنهاء، يجب عليك تنفيذ أي طلبات معلقة ودفع أي رسوم مستحقة. قد تحتفظ تاجير جملة هب بجزء من أموالك لتغطية أي رسوم مرتجعة أو استردادات محتملة لفترة تصل إلى 90 يومًا.",
          },
          indemnification: {
            title: "7. التعويض",
            content:
              "أنت توافق على تعويض وإبراء ذمة تاجير جملة هب وشركاتها التابعة ومسؤوليها ومديريها وموظفيها ووكلائها من وضد أي مطالبات وأضرار والتزامات وخسائر ومسؤوليات وتكاليف ومصروفات ناشئة عن استخدامك للمنصة أو انتهاكك لهذه الاتفاقية.",
          },
          contact: {
            title: "8. اتصل بنا",
            content:
              "إذا كان لديك أي أسئلة حول اتفاقية البائع هذه، يرجى الاتصال بنا على:\n\nالبريد الإلكتروني: sellers@tajirjomlahub.com\nالعنوان: 123 شارع السوق، جناح 456، سان فرانسيسكو، كاليفورنيا 94105",
          },
        },
      },
      returnsRefundsPage: {
        title: "الإرجاع والاسترداد",
        description: "التزامنا برضاك.",
        sections: {
          overview: {
            title: "1. نظرة عامة على سياسة الإرجاع",
            content:
              "نريدك أن تكون راضيًا تمامًا عن شرائك. إذا لم تكن راضيًا، يمكنك إرجاع معظم العناصر خلال 30 يومًا من التسليم للحصول على استرداد كامل، وفقًا للشروط والأحكام أدناه.",
          },
          eligibility: {
            title: "2. الأهلية للإرجاع",
            content:
              "لتكون مؤهلاً للإرجاع، يجب أن يكون العنصر الخاص بك:\n• غير مستخدم وفي نفس الحالة التي استلمتها بها.\n• في العبوة الأصلية مع جميع العلامات والملصقات المرفقة.\n• مصحوبًا بالإيصال أو إثبات الشراء.\n\nبعض العناصر غير قابلة للإرجاع، بما في ذلك:\n• السلع القابلة للتلف (مثل الطعام والزهور)\n• العناصر المخصصة أو المصنوعة حسب الطلب\n• التنزيلات الرقمية\n• السلع الحميمة أو الصحية",
          },
          process: {
            title: "3. عملية الإرجاع",
            content:
              'لبدء الإرجاع:\n1. سجل الدخول إلى حسابك وانتقل إلى "طلباتي".\n2. اختر الطلب والعنصر الذي ترغب في إرجاعه.\n3. اتبع التعليمات لطباعة ملصق شحن الإرجاع.\n4. لف العنصر بشكل آمن وأرفق ملصق الشحن.\n5. اسقط الطرد في موقع الناقل المحدد.',
          },
          refunds: {
            title: "4. الاسترداد",
            content:
              "بمجرد استلام وإجراء فحص لإرجاعك، سنرسل لك بريدًا إلكترونيًا لإعلامك أننا استلمنا العنصر المرتجع. سنخطرك أيضًا بالموافقة أو الرفض على استردادك.\nإذا تمت الموافقة، سيتم معالجة استردادك، وسيتم تطبيق الرصيد تلقائيًا على بطاقة الائتمان الخاصة بك أو طريقة الدفع الأصلية، في غضون 5-7 أيام عمل.",
          },
          shipping: {
            title: "5. شحن الإرجاع",
            content:
              "إذا كان الإرجاع بسبب خطأنا (على سبيل المثال، استلمت عنصرًا غير صحيح أو معيبًا)، فسنغطي تكاليف شحن الإرجاع.\nإذا كنت ترجع عنصرًا لأسباب أخرى (على سبيل المثال، غيرت رأيك)، فستكون مسؤولاً عن دفع تكاليف الشحن الخاصة بك لإرجاع العنصر الخاص بك. تكاليف الشحن غير قابلة للاسترداد.",
          },
          exchanges: {
            title: "6. التبادلات",
            content:
              "نقوم باستبدال العناصر فقط إذا كانت معيبة أو تالفة. إذا كنت بحاجة إلى استبدالها بنفس العنصر، يرجى الاتصال بفريق الدعم لدينا.",
          },
          contact: {
            title: "7. اتصل بنا",
            content:
              "إذا كان لديك أي أسئلة حول سياسة الإرجاع والاسترداد الخاصة بنا، يرجى الاتصال بنا على:\n\nالبريد الإلكتروني: returns@tajirjomlahub.com\nالعنوان: 123 شارع السوق، جناح 456، سان فرانسيسكو، كاليفورنيا 94105",
          },
        },
      },
      faqPage: {
        title: "الأسئلة الشائعة",
        description:
          "ابحث عن إجابات للأسئلة الشائعة حول منصتنا وخدماتنا وسياساتنا.",
        categories: {
          account: {
            category: "الحساب والتسجيل",
            questions: {
              createAccount: {
                title: "كيف يمكنني إنشاء حساب؟",
                content:
                  "انقر على زر 'تسجيل' في شريط التنقل العلوي. املأ عنوان بريدك الإلكتروني، وأنشئ كلمة مرور، وتحقق من عنوان بريدك الإلكتروني من خلال رابط التأكيد الذي نرسله لك.",
              },
              payToCreate: {
                title: "هل أحتاج إلى الدفع لإنشاء حساب؟",
                content:
                  "لا، إنشاء حساب مجاني تمامًا. ومع ذلك، للوصول إلى ميزات معينة مثل عرض أسعار المنتجات ووضع الطلبات، ستحتاج إلى خطة اشتراك نشطة.",
              },
              resetPassword: {
                title: "كيف يمكنني إعادة تعيين كلمة المرور؟",
                content:
                  "انتقل إلى صفحة تسجيل الدخول وانقر على 'نسيت كلمة المرور'. أدخل عنوان بريدك الإلكتروني، وسنرسل لك رابطًا لإعادة تعيين كلمة المرور. تأكد من التحقق من مجلد الرسائل غير المرغوب فيها إذا لم تر البريد الإلكتروني.",
              },
              multipleAccounts: {
                title: "هل يمكنني الحصول على حسابات متعددة؟",
                content:
                  "يمكن ربط كل عنوان بريد إلكتروني بحساب واحد فقط. إذا كنت بحاجة إلى حسابات منفصلة لأغراض مختلفة، فستحتاج إلى استخدام عناوين بريد إلكتروني مختلفة.",
              },
            },
          },
          orders: {
            category: "الطلبات والمشتريات",
            questions: {
              placeOrder: {
                title: "كيف يمكنني تقديم طلب؟",
                content:
                  "تصفح سوقنا، أضف المنتجات إلى سلة التسوق الخاصة بك، وانتقل إلى الدفع. ستحتاج إلى خطة اشتراك نشطة لإكمال المشتريات. اتبع عملية الدفع لإدخال معلومات الشحن والدفع الخاصة بك.",
              },
              cancelOrder: {
                title: "هل يمكنني إلغاء طلبي؟",
                content:
                  "يمكنك إلغاء طلبك خلال 24 ساعة من تقديمه، طالما أنه لم يتم شحنه بعد. انتقل إلى لوحة تحكم حسابك، وابحث عن الطلب، وانقر على 'إلغاء الطلب'.",
              },
              trackOrder: {
                title: "كيف يمكنني تتبع طلبي؟",
                content:
                  "بمجرد شحن طلبك، ستحصل على رقم تتبع عبر البريد الإلكتروني. يمكنك أيضًا تتبع طلبك من لوحة تحكم حسابك في قسم 'الطلبات'.",
              },
              paymentMethods: {
                title: "ما هي طرق الدفع التي تقبلونها؟",
                content:
                  "نقبل جميع بطاقات الائتمان الرئيسية (Visa، Mastercard)، وطرق الدفع الرقمية (Apple Pay، مدى، STC Pay، موبايلي باي، تابي، تمارا)، والتحويلات المصرفية، والدفع نقدًا عند الاستلام في مناطق محددة.",
              },
            },
          },
          shipping: {
            category: "الشحن والتسليم",
            questions: {
              shippingOptions: {
                title: "ما هي خيارات الشحن المتاحة لديكم؟",
                content:
                  "نوفر الشحن القياسي (5-7 أيام عمل، مجاني للطلبات التي تزيد عن 50 دولارًا)، والشحن السريع (2-3 أيام عمل)، والشحن بين عشية وضحاها (اليوم التالي). يتم حساب تكاليف الشحن عند الدفع.",
              },
              internationalShipping: {
                title: "هل تشحنون دوليًا؟",
                content:
                  "نعم، نشحن إلى معظم البلدان حول العالم. عادة ما تستغرق الطلبات الدولية 7-14 يوم عمل. يرجى ملاحظة أن الطلبات الدولية قد تخضع لرسوم الجمارك ورسوم الاستيراد.",
              },
              damagedPackage: {
                title: "ماذا لو كانت طردي تالفًا أو مفقودًا؟",
                content:
                  "إذا وصل طردك تالفًا أو فُقد أثناء النقل، يرجى الاتصال بفريق دعم العملاء لدينا على الفور. سنعمل معك لحل المشكلة، والتي قد تشمل الاستبدال أو الاسترداد.",
              },
              changeAddress: {
                title: "هل يمكنني تغيير عنوان الشحن بعد تقديم الطلب؟",
                content:
                  "يمكنك تغيير عنوان الشحن الخاص بك خلال 24 ساعة من تقديم طلبك، طالما أنه لم يتم شحنه. اتصل بفريق الدعم لدينا أو قم بتحديثه من صفحة تفاصيل الطلب.",
              },
            },
          },
          subscriptions: {
            category: "الاشتراكات والخطط",
            questions: {
              availablePlans: {
                title: "ما هي خطط الاشتراك المتاحة؟",
                content:
                  "نوفر خطط اشتراك متعددة بما في ذلك مستويات مجانية وأساسية ومهنية ومؤسسية. كل خطة لها ميزات وفوائد مختلفة. زر صفحة الخطط لرؤية المقارنات والأسعار التفصيلية.",
              },
              upgradeDowngrade: {
                title: "هل يمكنني ترقية أو تخفيض خطتي؟",
                content:
                  "نعم، يمكنك تغيير خطة الاشتراك الخاصة بك في أي وقت من إعدادات حسابك. تأخذ الترقيات مفعولها على الفور، بينما تأخذ التخفيضات مفعولها في نهاية دورة الفوترة الحالية.",
              },
              cancelSubscription: {
                title: "كيف يمكنني إلغاء اشتراكي؟",
                content:
                  "يمكنك إلغاء اشتراكك من إعدادات حسابك. سيبقى اشتراكك نشطًا حتى نهاية فترة الفوترة الحالية، وبعد ذلك ستفقد الوصول إلى الميزات المميزة.",
              },
              refunds: {
                title: "هل تقدمون استردادًا للاشتراكات؟",
                content:
                  "نوفر ضمان استرداد الأموال لمدة 30 يومًا للاشتراكات الجديدة. إذا لم تكن راضيًا خلال أول 30 يومًا، اتصل بفريق الدعم لدينا للحصول على استرداد كامل.",
              },
            },
          },
        },
        stillHaveQuestions: {
          title: "لا تزال لديك أسئلة؟",
          description:
            "لا يمكنك العثور على الإجابة التي تبحث عنها؟ فريق الدعم لدينا هنا لمساعدتك.",
          contactSupport: "اتصل بالدعم",
        },
      },
      aboutPage: {
        hero: {
          title: "بناء مستقبل التجارة العالمية",
          description:
            "نحن نحدث ثورة في طريقة اكتشاف الشركات والتواصل مع الموردين والتجار حول العالم.",
        },
        mission: {
          title: "ربط العالم من خلال التجارة",
          paragraph1:
            "تأسست برؤية لتبسيط التجارة العالمية، نمت تاجير جملة هب لتصبح نظامًا بيئيًا موثوقًا حيث يمكن للشركات من جميع الأحجام أن تزدهر. نعتقد أن الجغرافيا لا ينبغي أن تكون عائقًا أمام النمو.",
          paragraph2:
            "تجمع منصتنا بين التكنولوجيا المتطورة والدعم المرتكز على الإنسان لإنشاء روابط سلسة بين المشترين والبائعين. سواء كنت حرفيًا محليًا أو موزعًا متعدد الجنسيات، نوفر لك الأدوات التي تحتاجها للنجاح.",
          stats: {
            countries: {
              value: "50+",
              label: "دولة يتم خدمتها",
            },
            businesses: {
              value: "10k+",
              label: "شركة نشطة",
            },
          },
        },
        values: {
          title: "مهمتنا وقيمنا",
          description:
            "نحن مدفوعون بهدف مشترك لجعل التجارة في متناول الجميع وآمنة ومربحة للجميع.",
          cards: {
            trust: {
              title: "الثقة والشفافية",
              description:
                "نعطي الأولوية للصدق في كل معاملة، مما يضمن أن لديك المعلومات اللازمة لاتخاذ قرارات واثقة.",
            },
            customer: {
              title: "العميل أولاً",
              description:
                "نجاحك هو نجاحنا. نتطور باستمرار منصتنا بناءً على ملاحظاتك واحتياجاتك.",
            },
            innovation: {
              title: "الابتكار",
              description:
                "الاستفادة من الذكاء الاصطناعي وتحليلات البيانات لتوفير بحث أذكى ورؤى في الوقت الفعلي وخدمات لوجستية سلسة.",
            },
            excellence: {
              title: "التميز",
              description:
                "نسعى للكمال في تجربة المستخدم والدعم وموثوقية المنصة.",
            },
          },
        },
        whyChoose: {
          title: "لماذا تختار تاجير جملة هب؟",
          description:
            "انضم إلى آلاف الشركات التي تثق بنا لاحتياجات التوريد والبيع الخاصة بهم.",
          features: {
            globalReach: {
              title: "الوصول العالمي",
              desc: "تواصل مع شركاء في أكثر من 50 دولة.",
            },
            verifiedPartners: {
              title: "شركاء موثقون",
              desc: "عملية فحص صارمة لجميع الموردين.",
            },
            securePayments: {
              title: "مدفوعات آمنة",
              desc: "حماية الضمان للراحة البال.",
            },
            support: {
              title: "دعم على مدار الساعة",
              desc: "مساعدة على مدار الساعة بعدة لغات.",
            },
            analytics: {
              title: "تحليلات ذكية",
              desc: "رؤى مدعومة بالبيانات لتنمية عملك.",
            },
            shipping: {
              title: "شحن سريع",
              desc: "خدمات لوجستية متكاملة لتسليم موثوق.",
            },
          },
        },
      },
    },
  },
};
