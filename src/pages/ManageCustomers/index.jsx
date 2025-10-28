import { Card, Flex, Button, Table, Dropdown, Menu } from "antd";
import { SearchInput } from "../../components";
import { MoreOutlined } from "@ant-design/icons";

export const ManageCustomers = () => {
	const data = [
		{
			key: "1",
			customerName: "Fayez Ali",
			phoneNumber: "+966 324 464 232",
			totalBookings: 0,
			lastBooking: "-",
		},
		{
			key: "2",
			customerName: "Mohammed Danesh",
			phoneNumber: "+966 330 766 62",
			totalBookings: 0,
			lastBooking: "-",
		},
		{
			key: "3",
			customerName: "Jihad Bakr",
			phoneNumber: "+966 137 033 326",
			totalBookings: 0,
			lastBooking: "-",
		},
		{
			key: "4",
			customerName: "Fahd Bakr",
			phoneNumber: "+966 637 333 626",
			totalBookings: 0,
			lastBooking: "-",
		},
		{
			key: "5",
			customerName: "Salim Al Tajir",
			phoneNumber: "+966 351 425 116",
			totalBookings: 1,
			lastBooking: "27/02/2020 2:45 PM",
		},
		{
			key: "6",
			customerName: "Nadeem Abbas",
			phoneNumber: "+966 137 033 326",
			totalBookings: 2,
			lastBooking: "26/02/2020 3:12 PM",
		},
		{
			key: "7",
			customerName: "Samah Amin",
			phoneNumber: "+966 642 323 134",
			totalBookings: 34,
			lastBooking: "27/02/2020 6:22 AM",
		},
		{
			key: "8",
			customerName: "Zuhair Hafees",
			phoneNumber: "+966 623 267 738",
			totalBookings: 23,
			lastBooking: "27/02/2020 10:32 AM",
		},
		{
			key: "9",
			customerName: "Ziyad Abdullah",
			phoneNumber: "+966 798 328 429",
			totalBookings: 22,
			lastBooking: "27/02/2020 3:08 PM",
		},
		{
			key: "10",
			customerName: "Sajid Hussain",
			phoneNumber: "+966 192 133 087",
			totalBookings: 0,
			lastBooking: "-",
		},
	];

	// Action menu for each row
	const getActionMenu = (record) => (
		<Menu>
			<Menu.Item key="view">View Details</Menu.Item>
			<Menu.Item key="edit">Edit Customer</Menu.Item>
			<Menu.Item key="delete" danger>
				Delete Customer
			</Menu.Item>
		</Menu>
	);

	// Table columns configuration
	const columns = [
		{
			title: "Customer Name",
			dataIndex: "customerName",
			key: "customerName",
			sorter: (a, b) => a.customerName.localeCompare(b.customerName),
			filteredValue: null,
			// filteredValue: searchText ? [searchText] : null,
			onFilter: (value, record) =>
				record.customerName.toLowerCase().includes(value.toLowerCase()) ||
				record.phoneNumber.toLowerCase().includes(value.toLowerCase()),
		},
		{
			title: "Phone Number",
			dataIndex: "phoneNumber",
			key: "phoneNumber",
		},
		{
			title: "Total Bookings",
			dataIndex: "totalBookings",
			key: "totalBookings",
			align: "center",
			sorter: (a, b) => a.totalBookings - b.totalBookings,
		},
		{
			title: "Last Booking",
			dataIndex: "lastBooking",
			key: "lastBooking",
			align: "center",
		},
		{
			title: "Action",
			key: "action",
			align: "center",
			render: (_, record) => (
				<Dropdown
					overlay={getActionMenu(record)}
					trigger={["click"]}
					placement="bottomRight"
				>
					<Button
						type="text"
						icon={<MoreOutlined />}
						style={{ border: "none", boxShadow: "none" }}
					/>
				</Dropdown>
			),
		},
	];

	return (
		<div>
			<Flex vertical gap={24}>
				<Card
					title="Customers"
					styles={{
						backgroundColor: "#fff",
						header: {
							borderBottom: "none",
							paddingBottom: 0,
						},
						body: {
							paddingTop: 0,
						},
					}}
				>
					<div
						style={{ marginBottom: "16px", fontSize: "13px", color: "#8c8c8c" }}
					>
						Manage all the Customers in your system
					</div>

					<div style={{ width: "30%" }}>
						<SearchInput
							prefix={<img src="/assets/icons/search.png" width={20} />}
							placeholder={"Search by Phone Number / Customer Name"}
						/>
					</div>

					<div style={{ marginTop: "16px" }}>
						<Table
							columns={columns}
							dataSource={data}
							pagination={{
								pageSize: 10,
								showSizeChanger: true,
								showQuickJumper: true,
								showTotal: (total, range) =>
									`Rows per page: ${range[1] - range[0] + 1}`,
								style: { marginTop: "16px" },
							}}
							style={{
								backgroundColor: "white",
							}}
							scroll={{ x: 800 }}
							rowClassName={(record, index) =>
								index % 2 === 0 ? "table-row-light" : "table-row-dark"
							}
						/>
					</div>

					<style jsx>{`
						.ant-table-thead > tr > th {
							background-color: #14b8a6 !important;
							color: white !important;
							font-weight: 600 !important;
							border-bottom: none !important;
						}

						.ant-table-thead > tr > th::before {
							display: none !important;
						}

						.table-row-light {
							background-color: #ffffff;
						}

						.table-row-dark {
							background-color: #f9fafb;
						}

						.ant-table-tbody > tr:hover > td {
							background-color: #f0fdfa !important;
						}

						.ant-pagination-item-active {
							background-color: #14b8a6 !important;
							border-color: #14b8a6 !important;
						}

						.ant-pagination-item-active a {
							color: white !important;
						}

						.ant-table-cell {
							border-bottom: 1px solid #f3f4f6 !important;
						}
					`}</style>

					{/* <Title level={4} className="m-0">
						Bookings
					</Title> */}
				</Card>
			</Flex>
		</div>
	);
};

export default ManageCustomers;
