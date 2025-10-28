import { Table, Tag, Avatar } from "antd";
import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	CloseCircleOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";

export const ScheduleTable = ({ onCancelBooking }) => {
	const serviceProviders = [
		{ id: 1, name: "Sameh Amin", avatar: "👨‍💼" },
		{ id: 2, name: "Muhammad Ali", avatar: "👨‍⚕️" },
		{ id: 3, name: "Mahmdul Hasan", avatar: "👨‍🔧" },
		{ id: 4, name: "Ali Shaan", avatar: "👨‍💻" },
		{ id: 5, name: "Ajit", avatar: "👨‍🎨" },
	];

	const bookingData = [
		{
			timeSlot: "00:00 - 01:00",
			bookings: {
				1: {
					id: "BK001",
					customerName: "John Doe",
					customerPhone: "+1234567890",
					service: "Hair Cut",
					provider: "Sameh Amin",
					date: "2024-01-15",
					time: "00:00 pm - 01:20 pm",
					duration: 80,
					status: "completed",
				},
				3: {
					id: "BK002",
					customerName: "Jane Smith",
					customerPhone: "+1234567891",
					service: "Hair Cut",
					provider: "Mahmdul Hasan",
					date: "2024-01-15",
					time: "00:20 pm - 02:45 pm",
					duration: 145,
					status: "no-show",
				},
				5: {
					id: "BK003",
					customerName: "Peter Jones",
					customerPhone: "+1234567892",
					service: "Head Scrub",
					provider: "Ajit",
					date: "2024-01-15",
					time: "00:00",
					duration: 45,
					status: "pending",
				},
			},
		},
		{
			timeSlot: "01:00 - 02:00",
			bookings: {
				2: {
					id: "BK004",
					customerName: "Mary Williams",
					customerPhone: "+1234567893",
					service: "Hydra-Facial",
					provider: "Muhammad Ali",
					date: "2024-01-15",
					time: "12:00 pm - 02:40 pm",
					duration: 160,
					status: "completed",
				},
			},
		},
		{
			timeSlot: "02:00 - 03:00",
			bookings: {
				1: {
					id: "BK005",
					customerName: "David Brown",
					customerPhone: "+1234567894",
					service: "Beard Cut",
					provider: "Sameh Amin",
					date: "2024-01-15",
					time: "01:40 pm - 02:40 pm",
					duration: 60,
					status: "cancelled",
				},
				3: {
					id: "BK006",
					customerName: "Susan Miller",
					customerPhone: "+1234567895",
					service: "Head Scrub",
					provider: "Mahmdul Hasan",
					date: "2024-01-15",
					time: "02:10 pm - 04:20 pm",
					duration: 130,
					status: "completed",
				},
			},
		},
		{
			timeSlot: "04:00 - 05:00",
			bookings: {
				2: {
					id: "BK007",
					customerName: "Michael Wilson",
					customerPhone: "+1234567896",
					service: "Head Scrub",
					provider: "Muhammad Ali",
					date: "2024-01-15",
					time: "04:00 pm - 05:40 pm",
					duration: 100,
					status: "progress",
				},
			},
		},
		{
			timeSlot: "07:00 - 08:00",
			bookings: {
				1: {
					id: "BK008",
					customerName: "Linda Taylor",
					customerPhone: "+1234567897",
					service: "Hair Cut",
					provider: "Sameh Amin",
					date: "2024-01-15",
					time: "07:00 pm - 08:00 pm",
					duration: 60,
					status: "pending",
				},
				3: {
					id: "BK009",
					customerName: "Robert Anderson",
					customerPhone: "+1234567898",
					service: "Hair Cut",
					provider: "Mahmdul Hasan",
					date: "2024-01-15",
					time: "07:00 pm - 08:00 pm",
					duration: 60,
					status: "pending",
				},
			},
		},
	];

	const columns = [
		{
			dataIndex: "timeSlot",
			key: "timeSlot",
			width: 80,
			render: (timeSlot) => (
				<div
					style={{
						fontWeight: "500",
						color: "#595959",
						fontSize: "12px",
					}}
				>
					{timeSlot}
				</div>
			),
			onCell: () => ({
				style: {
					backgroundColor: "#F1F1F9",
				},
			}),
		},
		...serviceProviders.map((provider) => ({
			title: (
				<div
					style={{
						display: "flex",
						textAlign: "center",
						justifyContent: "center",
						gap: 10,
						height: 80,
						alignItems: "center",
					}}
				>
					<Avatar
						size={32}
						style={{
							backgroundColor: "#1890ff",
							marginBottom: "4px",
						}}
					>
						{provider.avatar}
					</Avatar>
					<div
						style={{
							fontSize: "11px",
							fontWeight: "500",
							color: "#262626",
						}}
					>
						{provider.name}
					</div>
				</div>
			),
			dataIndex: "bookings",
			key: provider.id,
			width: 180,
			render: (bookings) =>
				renderBookingCard(bookings && bookings[provider.id], provider.id),
		})),
	];

	const getStatusConfig = (status) => {
		const configs = {
			completed: {
				color: "#52c41a",
				bgColor: "#f6ffed",
				borderColor: "#b7eb8f",
				icon: <CheckCircleOutlined />,
				text: "Completed",
			},
			pending: {
				color: "#faad14",
				bgColor: "#fffbe6",
				borderColor: "#ffe58f",
				icon: <ClockCircleOutlined />,
				text: "Pending",
			},
			cancelled: {
				color: "#ff4d4f",
				bgColor: "#fff2f0",
				borderColor: "#ffccc7",
				icon: <CloseCircleOutlined />,
				text: "Cancelled",
			},
			progress: {
				color: "#1890ff",
				bgColor: "#f0f5ff",
				borderColor: "#adc6ff",
				icon: <ExclamationCircleOutlined />,
				text: "Progress",
			},
			"no-show": {
				color: "#722ed1",
				bgColor: "#f9f0ff",
				borderColor: "#d3adf7",
				icon: <ExclamationCircleOutlined />,
				text: "No Show",
			},
		};
		return configs[status] || configs.pending;
	};

	const renderBookingCard = (booking, providerId) => {
		if (!booking) return null;

		const statusConfig = getStatusConfig(booking.status);

		return (
			<div
				key={`${providerId}-${booking.service}`}
				onClick={() => onCancelBooking(booking)}
				style={{
					backgroundColor: statusConfig.bgColor,
					borderLeft: `4px solid ${statusConfig.borderColor}`,
					borderRadius: "6px",
					padding: "8px",
					marginBottom: "25px",
					position: "relative",
					cursor: "pointer",
				}}
			>
				<div style={{ display: "flex", gap: 10 }}>
					<div
						style={{
							fontSize: "12px",
							fontWeight: "500",
							color: "#262626",
							marginBottom: "2px",
						}}
					>
						{booking.service}
					</div>
					<Tag
						color={statusConfig.color}
						size="small"
						style={{
							fontSize: "10px",
							lineHeight: "16px",
							height: "18px",
							borderRadius: "100px",
						}}
					>
						{statusConfig.text}
					</Tag>
				</div>
				<div
					style={{
						display: "flex",
						gap: 10,
						justifyContent: "flex-start",
						alignItems: "center",
						marginTop: "4px",
					}}
				>
					<ClockCircleOutlined />
					<div
						style={{
							fontSize: "11px",
							color: "#8c8c8c",
						}}
					>
						{booking.time}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div style={{ backgroundColor: "#fff", overflowX: "auto" }}>
			<style>
				{`
				.ant-table-thead > tr > th {
					background-color: #F1F1F9 !important;
					border-right: none !important;
				}
				.ant-table-thead > tr > th:last-child {
					border-right: 1px solid #f0f0f0 !important;
				}
				.ant-table-tbody > tr > td:first-child {
					position: sticky;
					left: 0;
					z-index: 1;
					background-color: #F1F1F9 !important;
				}
				.ant-table-thead > tr > th:first-child {
					position: sticky;
					left: 0;
					z-index: 2;
				}
				`}
			</style>
			<Table
				columns={columns}
				dataSource={bookingData.map((row, index) => ({ ...row, key: index }))}
				pagination={false}
				size="small"
				bordered
				style={{ backgroundColor: "#fff", minWidth: "100%" }}
				scroll={{ x: "max-content" }}
			/>
		</div>
	);
};

export default ScheduleTable;
