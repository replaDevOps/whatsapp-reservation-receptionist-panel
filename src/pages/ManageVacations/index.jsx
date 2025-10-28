import { useState } from "react";
import {
	Card,
	Flex,
	Button,
	Table,
	Dropdown,
	Menu,
	Typography,
	DatePicker,
	Tag,
	Modal,
} from "antd";
import { SearchInput } from "../../components";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { format, addDays } from "date-fns";
import dayjs from "dayjs";

export const ManageVacations = () => {
	const [isAddVacationModalOpen, setIsAddVacationModalOpen] = useState(false);

	const [isDeleteVacationModalOpen, setIsDeleteVacationModalOpen] =
		useState(false);

	const [isEditMode, setIsEditMode] = useState(false);

	const showAddVacationModal = () => {
		setIsAddVacationModalOpen(true);
	};

	const showDeleteVacationModal = () => {
		setIsDeleteVacationModalOpen(true);
	};

	const handleCancel = () => {
		setIsAddVacationModalOpen(false);
	};

	const getRandomDate = (start, end) => {
		return new Date(
			start.getTime() + Math.random() * (end.getTime() - start.getTime())
		);
	};

	const getRandomStatus = () => {
		const statuses = ["Pending", "Approved", "Rejected"];
		return statuses[Math.floor(Math.random() * statuses.length)];
	};

	const data = Array.from({ length: 10 }, (_, i) => {
		const start = getRandomDate(new Date(2024, 0, 1), new Date(2024, 11, 31));
		const end = addDays(start, Math.floor(Math.random() * 30) + 1); // within 1–30 days
		return {
			key: (i + 1).toString(),
			startDate: format(start, "MM/dd/yyyy"),
			endDate: format(end, "MM/dd/yyyy"),
			status: getRandomStatus(),
		};
	});

	const { Text, Title } = Typography;

	// Action menu for each row
	const getActionMenu = (record) => (
		<Menu>
			<Menu.Item key="view">View Details</Menu.Item>
			<Menu.Item
				key="edit"
				onClick={() => {
					showAddVacationModal();
					setIsEditMode(true);
				}}
			>
				Edit Vacation
			</Menu.Item>
			<Menu.Item key="delete" danger onClick={showDeleteVacationModal}>
				Delete Vacation
			</Menu.Item>
		</Menu>
	);

	// Table columns configuration
	const columns = [
		{
			title: "Start Date",
			dataIndex: "startDate",
			key: "startDate",
			sorter: (a, b) => a.startDate.localeCompare(b.startDate),
			filteredValue: null,
			// Example filter:
			// onFilter: (value, record) => record.startDate.includes(value),
		},
		{
			title: "End Date",
			dataIndex: "endDate",
			key: "endDate",
			sorter: (a, b) => a.endDate.localeCompare(b.endDate),
			filteredValue: null,
			// Example filter:
			// onFilter: (value, record) => record.endDate.includes(value),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			sorter: (a, b) => a.status.localeCompare(b.status),
			filters: [
				{ text: "Pending", value: "Pending" },
				{ text: "Approved", value: "Approved" },
				{ text: "Rejected", value: "Rejected" },
			],
			render: (status) => {
				let styles = {};

				if (status === "Pending") {
					styles = {
						backgroundColor: "#EEF2FF", // light indigo background
						color: "#4361EE", // indigo text
						borderColor: "#EEF2FF",
					};
				}
				if (status === "Approved") {
					styles = {
						backgroundColor: "#DCFCE7", // light green background
						color: "#22C55E", // green text
						borderColor: "#DCFCE7",
					};
				}
				if (status === "Rejected") {
					styles = {
						backgroundColor: "#FEE2E2", // light red background
						color: "#EF4444", // red text
						borderColor: "#FEE2E2",
					};
				}

				return (
					<Tag
						style={{ ...styles, borderRadius: "100px", padding: "2px 12px" }}
					>
						{status}
					</Tag>
				);
			},
			onFilter: (value, record) => record.status === value,
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
					title="Manage Vacations"
					extra={
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={() => showAddVacationModal()}
							// style={{ backgroundColor: "#F9FAFB" }}
						>
							Add Vacations
						</Button>
					}
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
						Manage your vacations in our system.
					</div>

					<div
						style={{
							width: "30%",
							display: "flex",
							gap: "10px",
							alignItems: "flex-start",
							// justifyContent: "center",
						}}
					>
						<img
							style={{
								backgroundColor: "#0B6172",
								padding: 10,
								borderRadius: "20%",
							}}
							src="/assets/icons/inclinedArrow.svg"
							width={35}
							height={35}
						/>
						<div>
							<Text color="#777E90">Total vacations (this month)</Text>
							<Title level={3} style={{ margin: 0 }}>
								19
							</Title>
						</div>
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
							background-color: #ffffff !important; /* odd */
						}

						.table-row-dark {
							background-color: #f4f7fe !important; /* even */
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
			<Modal
				title={isEditMode ? "Edit Vacation" : "Add Vacation"}
				open={isAddVacationModalOpen}
				centered
				closable
				onCancel={handleCancel}
				footer={
					<div style={{ display: "flex", gap: 5, justifyContent: "flex-end" }}>
						<Button type="default" onClick={handleCancel}>
							Cancel
						</Button>
						<Button type="primary" onClick={handleCancel}>
							Save
						</Button>
					</div>
				}
			>
				<div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
					<Text>Start Date</Text>
					<DatePicker
						defaultValue={dayjs("2019-09-03", "MM/dd/yyyy")}
						placeholder="Select Date"
					/>
				</div>
				<div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
					<Text>End Date</Text>
					<DatePicker
						defaultValue={dayjs("2019-09-03", "MM/dd/yyyy")}
						placeholder="Select Date"
					/>
				</div>
			</Modal>
			<Modal
				open={isDeleteVacationModalOpen}
				centered
				closable
				onCancel={() => setIsDeleteVacationModalOpen(false)}
				footer={
					<div style={{ display: "flex", gap: 5, justifyContent: "center" }}>
						<Button
							type="default"
							onClick={() => setIsDeleteVacationModalOpen(false)}
						>
							Cancel
						</Button>
						<Button
							color="red"
							style={{
								backgroundColor: "red",
								color: "white",
								borderColor: "red",
							}}
							onClick={() => setIsDeleteVacationModalOpen(false)}
						>
							Confirm
						</Button>
					</div>
				}
			>
				<div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
					<Title level={3}>Are you sure?</Title>
					<Text>
						This action cannot be undone. Are you sure you want to delete this
						vacation?
					</Text>
				</div>
			</Modal>
		</div>
	);
};

export default ManageVacations;
