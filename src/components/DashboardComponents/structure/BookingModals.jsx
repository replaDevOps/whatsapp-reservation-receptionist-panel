import { useState, forwardRef, useImperativeHandle } from "react";
import {
	Form,
	Modal,
	Input,
	Radio,
	Select,
	Button,
	Avatar,
	message,
	Divider,
	DatePicker,
	TimePicker,
} from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

export const BookingModals = forwardRef(
	(
		{
			onAddBooking,
			onCancelBooking,
			bookingToCancel,
			services = [],
			serviceProviders = [],
			// cancellationReasons = [],
		},
		ref
	) => {
		const [addBookingVisible, setAddBookingVisible] = useState(false);
		const [cancelBookingVisible, setCancelBookingVisible] = useState(false);
		const [addBookingForm] = Form.useForm();
		const [cancelBookingForm] = Form.useForm();
		const [bookingType, setBookingType] = useState("byTime"); // 'byTime' or 'byServiceProvider'

		// --- Mock Data ---
		const defaultServices = [
			{ value: "haircut", label: "Hair Cut", duration: 60, price: 25 },
			{ value: "beard", label: "Beard Cut", duration: 30, price: 15 },
			{ value: "facial", label: "Hydra-Facial", duration: 90, price: 45 },
			{ value: "scrub", label: "Head Scrub", duration: 45, price: 30 },
		];

		const defaultServiceProviders = [
			{
				id: 1,
				name: "Sameh Amin",
				avatar: "👨‍💼",
				specialties: ["haircut", "beard"],
			},
			{
				id: 2,
				name: "Muhammad Ali",
				avatar: "👨‍⚕️",
				specialties: ["facial", "scrub"],
			},
			{
				id: 3,
				name: "Mahmdul Hasan",
				avatar: "👨‍🔧",
				specialties: ["haircut", "scrub"],
			},
			{
				id: 4,
				name: "Ali Shaan",
				avatar: "👨‍💻",
				specialties: ["beard", "facial"],
			},
			{ id: 5, name: "Ajit", avatar: "👨‍🎨", specialties: ["haircut", "facial"] },
		];

		// const defaultCancellationReasons = [
		// 	"Customer requested",
		// 	"Emergency",
		// 	"Staff unavailable",
		// 	"Other",
		// ];

		const defaultBookingToCancel = {
			id: "BK001",
			customerName: "John Doe",
			customerPhone: "+1234567890",
			service: "Hair Cut",
			provider: "Sameh Amin",
			date: "2024-01-15",
			time: "14:00",
			duration: 60,
			status: "confirmed",
		};

		// const availableTimeSlots = [
		// 	"09:00",
		// 	"09:30",
		// 	"10:00",
		// 	"10:30",
		// 	"11:00",
		// 	"14:00",
		// 	"14:30",
		// 	"15:00",
		// ];

		// --- Data Handling ---
		const currentServices = services.length > 0 ? services : defaultServices;
		const currentProviders =
			serviceProviders.length > 0 ? serviceProviders : defaultServiceProviders;
		// const currentReasons =
		// 	cancellationReasons.length > 0
		// 		? cancellationReasons
		// 		: defaultCancellationReasons;
		const currentBooking = bookingToCancel || defaultBookingToCancel;

		// --- Functions ---
		const handleAddBooking = async (values) => {
			try {
				const finalValues = {
					...values,
					date: values.date.format("YYYY-MM-DD"),
					time: values.time.format("HH:mm"),
				};
				if (onAddBooking) {
					await onAddBooking(finalValues);
				} else {
					console.log("New booking data:", finalValues);
					message.success("Booking added successfully!");
				}
				closeAddModal();
			} catch (error) {
				console.error("Error adding booking:", error);
				message.error("Failed to add booking. Please try again.");
			}
		};

		const handleCancelBooking = async (values) => {
			try {
				if (onCancelBooking) {
					await onCancelBooking({ ...currentBooking, ...values });
				} else {
					console.log("Cancel booking data:", values);
					message.success("Booking cancelled successfully!");
				}
				closeCancelModal();
			} catch (error) {
				console.error("Error cancelling booking:", error);
				message.error("Failed to cancel booking. Please try again.");
			}
		};

		const getAvailableProviders = (selectedService) => {
			if (!selectedService) return currentProviders;
			return currentProviders.filter(
				(provider) =>
					provider.specialties && provider.specialties.includes(selectedService)
			);
		};

		const showAddBookingModal = () => setAddBookingVisible(true);
		const showCancelBookingModal = () => setCancelBookingVisible(true);

		const closeAddModal = () => {
			setAddBookingVisible(false);
			addBookingForm.resetFields();
			setBookingType("byTime");
		};

		const closeCancelModal = () => {
			setCancelBookingVisible(false);
			cancelBookingForm.resetFields();
		};

		useImperativeHandle(ref, () => ({
			showAddBookingModal,
			showCancelBookingModal,
		}));

		const prefixSelector = (
			<Form.Item name="prefix" noStyle initialValue="+966">
				<Select style={{ width: 70 }}>
					<Option value="+966">+966</Option>
					<Option value="+1">+1</Option>
				</Select>
			</Form.Item>
		);

		return (
			<>
				{/* Add New Booking Modal */}
				<Modal
					title={
						<div
							style={{
								// width: "10%",
								display: "flex",
								alignItems: "center",
								gap: "8px",
							}}
						>
							<PlusOutlined />
							<span>Add New Booking</span>
						</div>
					}
					open={addBookingVisible}
					onCancel={closeAddModal}
					footer={null}
					width={400}
					destroyOnClose
					centered
				>
					<Divider style={{ margin: "12px 0" }} />
					<Form
						form={addBookingForm}
						layout="vertical"
						onFinish={handleAddBooking}
						requiredMark={false}
					>
						<Form.Item name="bookingType" initialValue="byTime">
							<Radio.Group
								onChange={(e) => setBookingType(e.target.value)}
								value={bookingType}
							>
								<Radio value="byTime">By time</Radio>
								<Radio value="byServiceProvider">By service provider</Radio>
							</Radio.Group>
						</Form.Item>

						{/* Common fields for both booking types */}
						<Form.Item
							label="Phone Number"
							name="customerPhone"
							rules={[{ required: true, message: "Please enter phone number" }]}
						>
							<Input
								addonBefore={prefixSelector}
								placeholder="Enter phone number"
								size="large"
							/>
						</Form.Item>
						<Form.Item
							label="Customer Name"
							name="customerName"
							rules={[
								{ required: true, message: "Please enter customer name" },
							]}
						>
							<Input
								prefix={<UserOutlined />}
								placeholder="Enter customer name"
								size="large"
							/>
						</Form.Item>
						<Form.Item
							label="Email Address"
							name="email"
							rules={[
								{ type: "email", message: "The input is not valid E-mail!" },
								{ required: true, message: "Please input your E-mail!" },
							]}
						>
							<Input placeholder="Enter Email Address" size="large" />
						</Form.Item>

						{bookingType === "byTime" && (
							<>
								<Form.Item
									label="Booking Date"
									name="date"
									rules={[
										{ required: true, message: "Please select booking date" },
									]}
								>
									<DatePicker
										style={{ width: "100%" }}
										size="large"
										format="YYYY-MM-DD"
									/>
								</Form.Item>
								<Form.Item
									label="Booking Time"
									name="time"
									rules={[
										{ required: true, message: "Please select booking time" },
									]}
								>
									<TimePicker
										style={{ width: "100%" }}
										size="large"
										format="HH:mm"
										use12Hours
										minuteStep={15}
									/>
								</Form.Item>
							</>
						)}

						{bookingType === "byServiceProvider" && (
							<>
								<Form.Item
									label="Service"
									name="service"
									rules={[
										{ required: true, message: "Please select a service" },
									]}
								>
									<Select
										placeholder="Select service"
										size="large"
										onChange={() =>
											addBookingForm.setFieldsValue({ provider: undefined })
										}
									>
										{currentServices.map((service) => (
											<Option key={service.value} value={service.value}>
												<div
													style={{
														display: "flex",
														justifyContent: "space-between",
													}}
												>
													<span>{service.label}</span>
													<span style={{ color: "#8c8c8c" }}>
														{service.duration}min - ${service.price}
													</span>
												</div>
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item
									label="Service Provider"
									name="provider"
									rules={[
										{ required: true, message: "Please select a provider" },
									]}
								>
									<Select
										placeholder="Select provider"
										size="large"
										disabled={!addBookingForm.getFieldValue("service")}
									>
										{getAvailableProviders(
											addBookingForm.getFieldValue("service")
										).map((provider) => (
											<Option key={provider.id} value={provider.id}>
												<div
													style={{
														display: "flex",
														alignItems: "center",
														gap: "8px",
													}}
												>
													<Avatar size="small">{provider.avatar}</Avatar>
													<span>{provider.name}</span>
												</div>
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item
									label="Booking Date"
									name="date"
									rules={[
										{ required: true, message: "Please select booking date" },
									]}
								>
									<DatePicker
										style={{ width: "100%" }}
										size="large"
										format="YYYY-MM-DD"
									/>
								</Form.Item>
								<Form.Item
									label="Booking Time"
									name="time"
									rules={[
										{ required: true, message: "Please select booking time" },
									]}
								>
									<TimePicker
										style={{ width: "100%" }}
										size="large"
										format="HH:mm"
										use12Hours
										minuteStep={15}
									/>
								</Form.Item>
							</>
						)}

						<Form.Item
							label="Reminder (To notify before booking time)"
							name="reminder"
						>
							<Input
								placeholder="Set Reminder"
								size="large"
								addonAfter={
									<Select defaultValue="minutes" style={{ width: 80 }}>
										<Option value="minutes">Minutes</Option>
										<Option value="hours">Hours</Option>
									</Select>
								}
							/>
						</Form.Item>
						<Form.Item label="Note (Optional)" name="notes">
							<TextArea
								rows={3}
								placeholder="Any special requests or notes..."
							/>
						</Form.Item>

						<Form.Item style={{ marginBottom: 0, marginTop: "24px" }}>
							<div
								style={{
									display: "flex",
									justifyContent: "flex-end",
									gap: "8px",
								}}
							>
								<Button onClick={closeAddModal}>Cancel</Button>
								<Button
									type="primary"
									htmlType="submit"
									icon={<PlusOutlined />}
								>
									Save
								</Button>
							</div>
						</Form.Item>
					</Form>
				</Modal>

				{/* Cancel Booking Modal */}
				<Modal
					title="Cancel Booking"
					open={cancelBookingVisible}
					onCancel={closeCancelModal}
					footer={null}
					width={400}
					destroyOnClose
					centered
				>
					<Divider style={{ margin: "12px 0 24px" }} />
					<Form
						form={cancelBookingForm}
						layout="vertical"
						onFinish={handleCancelBooking}
						requiredMark={false}
					>
						<Form.Item
							label="Reason"
							name="notes"
							rules={[
								{
									required: true,
									message: "Please provide a cancellation reason.",
								},
							]}
						>
							<TextArea
								rows={4}
								placeholder="Please provide a reason for cancelling this booking."
							/>
						</Form.Item>
						<Form.Item style={{ marginBottom: 0, marginTop: "24px" }}>
							<div
								style={{
									display: "flex",
									justifyContent: "flex-end",
									gap: "8px",
								}}
							>
								<Button onClick={closeCancelModal}>Skip</Button>
								<Button type="primary" htmlType="submit">
									Send
								</Button>
							</div>
						</Form.Item>
					</Form>
				</Modal>
			</>
		);
	}
);

export default BookingModals;
