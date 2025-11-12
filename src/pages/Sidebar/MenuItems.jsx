import { useMemo } from "react";
import { useTranslation } from "react-i18next";
const getItem = (label, key, icon) => ({
    key,
    icon,
    label,
});

const MenuItems = ({ currentTab }) => {
    const {t,i18n} = useTranslation();
    const menuItems = useMemo(
    () => [
        { type: "group", label: t("DASHBOARD"), key: "header", className: "heading-menu" },
        getItem(
            t("Dashboard Overview"),
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

        {type: 'divider', key: 'divider-3', className: 'bg-divider my-3'},
        {type: 'group', label: t('BOOKING MANAGEMENT'), key: 'header-3', className: 'heading-menu'},
        getItem(
            t("Bookings"),
            "2",
            currentTab === "2" ? (
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
        
        { type: "divider", key: "divider-1", className: "bg-divider my-3" },
        { type: "group", label: t("CUSTOMER MANAGEMENT"), key: "header-1", className: "heading-menu" },
        getItem(
            t("Customers"),
            "3",
            currentTab === "3" ? (
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

        {type: 'divider', key: 'divider-4', className: 'bg-divider my-3'},
        {type: 'group', label: t('PROFILE SETTINGS'), key: 'header-4', className: 'heading-menu'},
        getItem(
            t("Staff Vacations"),
            "4",
            currentTab === "4" ? (
                <img src="/assets/icons/side-icon/vacation-a.webp" width="20px" alt="staff vacation icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/vacation.webp"
                    width="20px"
                    alt="staff vacation gray icon"
                    fetchPriority="high"
                />
            )
        ),
         getItem(
            t("Setting"),
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
    [currentTab,t, i18n.language]
  );
    return menuItems;
};

export { MenuItems };
