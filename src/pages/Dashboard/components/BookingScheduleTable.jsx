import React, { useState } from "react";
import {
	Table,
	Tag,
	Avatar,
	Button,
	DatePicker,
	Select,
	Card,
	Row,
	Col,
	Space,
	Tooltip,
	Badge,
} from "antd";
import {
	UserOutlined,
	PlusOutlined,
	LeftOutlined,
	RightOutlined,
	CheckCircleOutlined,
	ClockCircleOutlined,
	CloseCircleOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;

export const BookingScheduleTable = () => {
	const [selectedDate, setSelectedDate] = useState("August, 08, 2025");

	// Mock data for service providers
	const serviceProviders = [
		{ id: 1, name: "Sameh Amin", avatar: "👨‍💼" },
		{ id: 2, name: "Muhammad Ali", avatar: "👨‍⚕️" },
		{ id: 3, name: "Mahmdul Hasan", avatar: "👨‍🔧" },
		{ id: 4, name: "Ali Shaan", avatar: "👨‍💻" },
		{ id: 5, name: "Ajit", avatar: "👨‍🎨" },
	];

	// Mock booking data
	const bookingData = [
		{
			timeSlot: "00:00 - 01:00",
			bookings: {
				1: {
					service: "Hair Cut",
					status: "completed",
					time: "00:00 pm - 01:20 pm",
				},
				3: {
					service: "Hair Cut",
					status: "no-show",
					time: "00:20 pm - 02:45 pm",
				},
				5: { service: "Head Scrub", status: "pending", time: "00:00" },
			},
		},
		{
			timeSlot: "01:00 - 02:00",
			bookings: {
				2: {
					service: "Hydra-Facial",
					status: "completed",
					time: "12:00 pm - 02:40 pm",
				},
			},
		},
		{
			timeSlot: "02:00 - 03:00",
			bookings: {
				1: {
					service: "Beard Cut",
					status: "cancelled",
					time: "01:40 pm - 02:40 pm",
				},
				3: {
					service: "Head Scrub",
					status: "completed",
					time: "02:10 pm - 04:20 pm",
				},
			},
		},
		{
			timeSlot: "04:00 - 05:00",
			bookings: {
				2: {
					service: "Head Scrub",
					status: "progress",
					time: "04:00 pm - 05:40 pm",
				},
			},
		},
		{
			timeSlot: "07:00 - 08:00",
			bookings: {
				1: {
					service: "Hair Cut",
					status: "pending",
					time: "07:00 pm - 08:00 pm",
				},
				3: {
					service: "Hair Cut",
					status: "pending",
					time: "07:00 pm - 08:00 pm",
				},
			},
		},
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
				style={{
					backgroundColor: statusConfig.bgColor,
					border: `1px solid ${statusConfig.borderColor}`,
					borderRadius: "6px",
					padding: "8px",
					marginBottom: "4px",
					position: "relative",
				}}
			>
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
				<div
					style={{
						fontSize: "11px",
						color: "#8c8c8c",
						marginBottom: "4px",
					}}
				>
					{booking.time}
				</div>
				<Tag
					color={statusConfig.color}
					size="small"
					icon={statusConfig.icon}
					style={{
						fontSize: "10px",
						lineHeight: "16px",
						height: "18px",
					}}
				>
					{statusConfig.text}
				</Tag>
			</div>
		);
	};

	const columns = [
		{
			title: "Time Slot",
			dataIndex: "timeSlot",
			key: "timeSlot",
			width: 120,
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
		},
		...serviceProviders.map((provider) => ({
			title: (
				<div style={{ textAlign: "center" }}>
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
				renderBookingCard(bookings[provider.id], provider.id),
		})),
	];

	const stats = [
		{ label: "Total Bookings", value: 104, color: "#13c2c2" },
		{ label: "Today's Manual Bookings", value: 50, color: "#52c41a" },
		{ label: "Today's WhatsApp Bookings", value: 50, color: "#13c2c2" },
		{ label: "Today's Cancelled Bookings", value: 4, color: "#13c2c2" },
	];

	return (
		<div
			style={{
				padding: "24px",
				backgroundColor: "#f5f5f5",
				minHeight: "100vh",
			}}
		>
			{/* Stats Cards */}
			<Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
				{stats.map((stat, index) => (
					<Col xs={24} sm={12} md={6} key={index}>
						<Card
							size="small"
							style={{
								background: index === 0 ? stat.color : "#fff",
								color: index === 0 ? "#fff" : "#262626",
							}}
						>
							<div style={{ textAlign: "center" }}>
								<div
									style={{
										fontSize: "24px",
										fontWeight: "bold",
										marginBottom: "4px",
									}}
								>
									{stat.value}
								</div>
								<div
									style={{
										fontSize: "12px",
										opacity: index === 0 ? 0.9 : 0.7,
									}}
								>
									{stat.label}
								</div>
							</div>
						</Card>
					</Col>
				))}
			</Row>

			{/* Main Schedule Table */}
			<Card
				title="Bookings"
				extra={
					<Button
						type="primary"
						icon={<PlusOutlined />}
						style={{ backgroundColor: "#13c2c2", borderColor: "#13c2c2" }}
					>
						Add Booking
					</Button>
				}
				style={{ backgroundColor: "#fff" }}
			>
				<div
					style={{ marginBottom: "16px", fontSize: "13px", color: "#8c8c8c" }}
				>
					See all the Schedule Bookings in your system
				</div>

				{/* Date Navigation */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						marginBottom: "24px",
					}}
				>
					<Button type="text" icon={<LeftOutlined />} size="small" />
					<span
						style={{
							margin: "0 16px",
							fontWeight: "500",
							fontSize: "14px",
						}}
					>
						{selectedDate}
					</span>
					<Button type="text" icon={<RightOutlined />} size="small" />
				</div>

				{/* Filters */}
				<Row gutter={16} style={{ marginBottom: "16px" }}>
					<Col>
						<Select
							placeholder="Select Service"
							style={{ width: 140 }}
							size="small"
						>
							<Option value="haircut">Hair Cut</Option>
							<Option value="beard">Beard Cut</Option>
							<Option value="facial">Hydra-Facial</Option>
							<Option value="scrub">Head Scrub</Option>
						</Select>
					</Col>
					<Col>
						<Select
							placeholder="Select Service Provider"
							style={{ width: 180 }}
							size="small"
						>
							{serviceProviders.map((provider) => (
								<Option key={provider.id} value={provider.id}>
									{provider.name}
								</Option>
							))}
						</Select>
					</Col>
				</Row>

				{/* Schedule Table */}
				<Table
					columns={columns}
					dataSource={bookingData.map((row, index) => ({ ...row, key: index }))}
					pagination={false}
					size="small"
					bordered
					style={{ backgroundColor: "#fff" }}
					scroll={{ x: 800 }}
				/>
			</Card>
		</div>
	);
};

export default BookingScheduleTable;
