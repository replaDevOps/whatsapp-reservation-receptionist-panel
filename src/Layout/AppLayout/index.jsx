import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import {
	Layout,
	Menu,
	Image,
	Space,
	Divider,
	Card,
	Flex,
	Typography,
	Button,
} from "antd";
import { Notifications, UserDropdown } from "../../components/Header";
// import { Dashboard } from "../Dashboard";
import { SearchInput } from "../../components/Forms";
import { useAuth } from "../../hooks";
// import { CustomersPage } from "../CustomersPage";
// import { SingleViewCustomer } from "../../components";
// import { AddEditBranch, SingleViewCustomer } from '../../components';
// import { BranchPage } from "../BranchPage";
// import { ServicesPage } from "../ServicesPage";
// import { WhatsappSettingPage } from "../WhatsappSettingPage";
// import { SubscriptionPlanPage } from "../SubscriptionPlanPage";

const { Header, Sider, Content } = Layout;
export const AppLayout = (props) => {
	let navigate = useNavigate();
	const location = useLocation();
	const [collapsed, setCollapsed] = useState(false);
	const [currentTab, setCurrentTab] = useState("1");
	const [openKeys, setOpenKeys] = useState([""]);

	const { userType } = useAuth();

	const isReceptionist = userType === "receptionist";

	function getItem(label, key, icon, children) {
		return { key, icon, children, label };
	}

	useEffect(() => {
		let tab = location?.pathname?.split("/")[1];
		tab =
			tab === ""
				? "1"
				: tab === "customers" || tab === "customers/singledetails"
				? "2"
				: tab === "branches" || tab === "addbranch" || tab === "vacations"
				? "3"
				: tab === "services" || tab === "settings"
				? "4"
				: tab === "whatsappsetting"
				? "5"
				: tab === "subscriptionplan"
				? "6"
				: "1";
		setCurrentTab(tab);
	}, [location]);

	const menuItems = useMemo(
		() => [
			{
				type: "group",
				label: "DASHBOARD",
				key: "header",
				className: "heading-menu",
			},
			getItem(
				"Dashboard",
				"1",
				<img src="/assets/icons/dashboard.png" width={"20px"} alt="" />
			),
			{ type: "divider", key: "divider-1", className: "bg-divider my-3" },
			{
				type: "group",
				label: "BUSINESS MANAGEMENT",
				key: "header-1",
				className: "heading-menu",
			},
			getItem(
				"Customers",
				"2",
				<img src="/assets/icons/layout.png" width={"20px"} alt="" />
			),
			getItem(
				"Branches",
				"3",
				<img src="/assets/icons/layout.png" width={"20px"} alt="" />
			),
			getItem(
				"Services",
				"4",
				<img src="/assets/icons/layout.png" width={"20px"} alt="" />
			),
			getItem(
				"WhatsApp Settings",
				"5",
				<img src="/assets/icons/layout.png" width={"20px"} alt="" />
			),
			getItem(
				"Subscription Plan",
				"6",
				<img src="/assets/icons/layout.png" width={"20px"} alt="" />
			),
			getItem(
				"Business Settings",
				"7",
				<img src="/assets/icons/layout.png" width={"20px"} alt="" />
			),
			{ type: "divider", key: "divider-2", className: "bg-divider my-3" },
			{
				type: "group",
				label: "STAFF MANAGEMENT",
				key: "header-2",
				className: "heading-menu",
			},
			getItem(
				"Staffs",
				"8",
				<img src="/assets/icons/layout.png" width={"20px"} alt="" />
			),
			{ type: "divider", key: "divider-3", className: "bg-divider my-3" },
			{
				type: "group",
				label: "BOOKING MANAGEMENT",
				key: "header-3",
				className: "heading-menu",
			},
			getItem(
				"Bookings",
				"9",
				<img src="/assets/icons/layout.png" width={"20px"} alt="" />
			),
			getItem(
				"Reports",
				"10",
				<img src="/assets/icons/layout.png" width={"20px"} alt="" />
			),
			{ type: "divider", key: "divider-4", className: "bg-divider my-3" },
		],
		[]
	);

	const receptionistMenuItems = useMemo(
		() => [
			{
				type: "group",
				label: "BOOKING MANAGEMENT",
				key: "header",
				className: "heading-menu",
			},
			getItem(
				"Bookings",
				"1",
				<img src="/assets/icons/dashboard.png" width={"20px"} alt="" />
			),
			{ type: "divider", key: "divider-1", className: "bg-divider my-3" },
			{
				type: "group",
				label: "CUSTOMER MANAGEMENT",
				key: "header-1",
				className: "heading-menu",
			},
			getItem(
				"Customers",
				"2",
				<img src="/assets/icons/layout.png" width={"20px"} alt="" />
			),
			{ type: "divider", key: "divider-2", className: "bg-divider my-3" },
			{
				type: "group",
				label: "PROFILE LISTING",
				key: "header-2",
				className: "heading-menu",
			},
			getItem(
				"Vacation",
				"3",
				<img src="/assets/icons/layout.png" width={"20px"} alt="" />
			),
			getItem(
				"Setting",
				"4",
				<img src="/assets/icons/layout.png" width={"20px"} alt="" />
			),
		],
		[]
	);

	const handleMenuClick = (e) => {
		const { key } = e;
		switch (key) {
			case "1":
				navigate("/", { replace: true });
				break;
			case "2":
				navigate("/customers", { replace: true });
				break;
			case "3":
				navigate(`${isReceptionist ? "/vacations" : "/branches"}`, {
					replace: true,
				});
				break;
			case "4":
				navigate(`${isReceptionist ? "/settings" : "/services"}`, {
					replace: true,
				});
				break;
			case "5":
				navigate("/whatsappsetting", { replace: true });
				break;
			case "6":
				navigate("/subscriptionplan", { replace: true });
				break;
			default:
				break;
		}
	};

	const onOpenChange = (keys) => {
		setOpenKeys(keys);
		// localStorage.setItem('openKeys', JSON.stringify(keys));
	};
	return (
		<Layout style={{ height: "100vh" }}>
			<Sider
				breakpoint="md"
				collapsedWidth="0"
				width={250}
				onBreakpoint={(broken) => {
					setCollapsed(broken);
				}}
				trigger={null}
				collapsible
				collapsed={collapsed}
				className={collapsed ? "addclass overflowstyle" : "overflowstyle"}
				style={{
					height: "100vh",
					overflowY: "auto",
					borderRight: "1px solid #E3E3E3",
				}}
			>
				<div
					className="logo"
					style={{ display: "flex", justifyContent: "center" }}
				>
					<Image
						style={{ width: collapsed ? "100%" : "100px" }}
						height={"auto"}
						src="/assets/images/logo.png"
						alt="Jusoor Admin Panel"
						preview={false}
					/>
				</div>
				<Divider className="m-0 bg-divider" />
				<Menu
					defaultSelectedKeys={["1"]}
					selectedKeys={[currentTab]}
					mode="inline"
					theme="dark"
					onClick={handleMenuClick}
					onOpenChange={onOpenChange}
					openKeys={openKeys}
					items={isReceptionist ? receptionistMenuItems : menuItems}
					className="listitem"
				/>
				{!isReceptionist && (
					<Card className="card-cs brand-bg mx-3 position-relative">
						<Flex vertical gap={20}>
							<img src="/assets/icons/rocket.png" width={40} alt="" />
							<Flex vertical gap={10}>
								<Typography.Text className="fs-14 text-white">
									Get unlimited access and much more in <strong>PRO</strong>
								</Typography.Text>
								<Button className="btnsave bg-white text-black">
									Upgrade now
								</Button>
							</Flex>
						</Flex>
					</Card>
				)}
			</Sider>
			<Layout className="site-layout">
				<Header
					className="site-layout-background header-mbl-cs"
					style={{
						padding: 0,
						display: "flex",
						paddingLeft: 0,
						justifyContent: "center",
					}}
				>
					<div
						style={{
							width: "98%",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							position: "relative",
							gap: 5,
						}}
					>
						<Space className=" mbl-space">
							<Button
								type="button"
								className="bg-transparent border-0 p-0"
								onClick={() => setCollapsed(!collapsed)}
							>
								<Image
									src="/assets/icons/collapse.png"
									width={"25px"}
									preview={false}
									style={{
										transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
									}}
								/>
							</Button>
							<SearchInput
								prefix={<img src="/assets/icons/search.png" width={20} />}
								placeholder={"search"}
							/>
						</Space>
						<Space size={15} align="center">
							<Notifications />
							<UserDropdown />
						</Space>
					</div>
				</Header>
				<Divider className="border-gray m-0" />
				<Content
					className="scroll-bar"
					style={{
						margin: "24px 10px",
						marginTop: "0",
						padding: "0 15px",
						minHeight: 280,
						overflowY: "auto",
						paddingTop: 24,
					}}
				>
					{props.children}
					{/* <Routes>
						<Route path="/" element={<Dashboard />} />
						{/* <Route path="/customers" element={<CustomersPage />} /> */}
					{/* <Route
							path="/customers/singledetails/:id"
							element={<SingleViewCustomer />}
						/> */}
					{/* <Route path="/branches" element={<BranchPage />} /> */}
					{/* <Route path="/addbranch" element={<AddEditBranch />} /> */}
					{/* <Route path="/branch/editbranch/:id" element={<AddEditBranch />} /> */}
					{/* <Route path="/services" element={<ServicesPage />} /> */}
					{/* <Route path="/whatsappsetting" element={<WhatsappSettingPage />} /> */}
					{/* <Route
							path="/subscriptionplan"
							element={<SubscriptionPlanPage />}
						/> */}
					{/* </Routes>  */}
				</Content>
			</Layout>
		</Layout>
	);
};

export default AppLayout;
