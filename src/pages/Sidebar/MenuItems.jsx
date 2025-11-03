import { useMemo } from "react";

const getItem = (label, key, icon) => ({
    key,
    icon,
    label,
});

const MenuItems = ({ currentTab }) => {
    const menuItems = useMemo(
    () => [
        { type: "group", label: "DASHBOARD", key: "header", className: "heading-menu" },
        getItem(
            "Dashboard Overview",
            "1",
            currentTab === "1" ? (
                <img src="/assets/icons/side-icon/dashboard-a.webp" width="20px" alt="dashboard icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/dashboard.webp"
                    width="20px"
                    alt="dashboard gray icon"
                    fetchPriority="high"
                />
            )
        ),

        { type: "divider", key: "divider-1", className: "bg-divider my-3" },
        { type: "group", label: "CUSTOMER MANAGEMENT", key: "header-1", className: "heading-menu" },
        getItem(
            "Customers",
            "2",
            currentTab === "2" ? (
                <img src="/assets/icons/side-icon/customer-a.webp" width="20px" alt="customer icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/customer.webp"
                    width="20px"
                    alt="customer gray icon"
                    fetchPriority="high"
                />
            )
        ),

        {type: 'divider', key: 'divider-3', className: 'bg-divider my-3'},
        {type: 'group', label: 'BOOKING MANAGEMENT', key: 'header-3', className: 'heading-menu'},
        getItem(
            "Bookings",
            "3",
            currentTab === "3" ? (
                <img src="/assets/icons/side-icon/booking-a.webp" width="20px" alt="booking icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/booking.webp"
                    width="20px"
                    alt="booking gray icon"
                    fetchPriority="high"
                />
            )
        ),
        {type: 'divider', key: 'divider-4', className: 'bg-divider my-3'},
        {type: 'group', label: 'PROFILE SETTINGS', key: 'header-4', className: 'heading-menu'},
        getItem(
            "Vacations",
            "4",
            currentTab === "4" ? (
                <img src="/assets/icons/side-icon/vacation-a.webp" width="20px" alt="vacation icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/vacation.webp"
                    width="20px"
                    alt="vacation gray icon"
                    fetchPriority="high"
                />
            )
        ),
         getItem(
            "Setting",
            "5",
            currentTab === "5" ? (
                <img src="/assets/icons/side-icon/setting-a.webp" width="20px" alt="setting icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/setting.webp"
                    width="20px"
                    alt="setting gray icon"
                    fetchPriority="high"
                />
            )
        ),
    ],
    [currentTab]
  );
    return menuItems;
};

export { MenuItems };
