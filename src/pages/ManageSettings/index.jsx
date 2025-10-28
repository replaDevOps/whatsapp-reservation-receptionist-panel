import {
	Card,
	Flex,
	Button,
	Image,
	Col,
	Row,
	Form,
	Input,
	Typography,
	Select,
	Modal,
} from "antd";
import { useState } from "react";

export const ManageSettings = () => {
	const [profileForm] = Form.useForm();

	const { Text } = Typography;

	const availability = [
		{
			day: "Monday",
			start: "09:00 am",
			end: "06:00 pm",
		},
		{
			day: "Tuesday",
			start: "09:00 am",
			end: "06:00 pm",
		},
		{
			day: "Wednesday",
			start: "09:00 am",
			end: "06:00 pm",
		},
		{
			day: "Thursday",
			start: "09:00 am",
			end: "06:00 pm",
		},
		{
			day: "Friday",
			start: "09:00 am",
			end: "06:00 pm",
		},
		{
			day: "Saturday",
			start: "09:00 am",
			end: "06:00 pm",
		},
		{
			day: "Sunday",
			start: "09:00 am",
			end: "06:00 pm",
		},
	];

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const onCloseModal = () => {
		setIsModalVisible(false);
	};

	const [modalType, setModalType] = useState("");

	return (
		<div style={{ padding: "0 8px" }}>
			<Flex vertical gap={24}>
				<Card
					title="General Settings"
					extra={
						<Button
							type="default"
							// icon={<PlusOutlined />}
							onClick={() => {
								setModalType("profile");
								showModal();
							}}
							style={{ backgroundColor: "#F9FAFB" }}
							size="small"
						>
							Edit
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
						style={{
							alignItems: "center",
							justifyContent: "center",
							display: "flex",
						}}
					>
						<Image
							src="/assets/images/penguinProfile.png"
							alt="jusoor Admin Panel"
							preview={false}
							style={{ maxWidth: "100%", height: "auto" }}
						/>
					</div>
					<Form
						layout="vertical"
						form={profileForm}
						requiredMark={false}
						style={{ marginTop: "24px" }}
					>
						<Row gutter={[16, 16]}>
							<Col xs={24} sm={24} md={12} lg={12} xl={12}>
								<Form.Item
									label="First Name"
									name="firstName"
									rules={[
										{ required: true, message: "Please enter first name" },
									]}
								>
									<Input placeholder="Enter first name" size="large" />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12} lg={12} xl={12}>
								<Form.Item label="Last Name" name="lastName">
									<Input placeholder="Enter last name" size="large" />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col xs={24} sm={24} md={12} lg={12} xl={12}>
								<Form.Item
									label="Phone Number"
									name="phoneNumber"
									rules={[
										{ required: true, message: "Please enter phone number" },
									]}
								>
									<Input placeholder="Enter phone number" size="large" />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12} lg={12} xl={12}>
								<Form.Item
									label="Email Address"
									name="email"
									rules={[
										{
											type: "email",
											message: "The input is not valid E-mail!",
										},
										{ required: true, message: "Please input your E-mail!" },
									]}
								>
									<Input placeholder="Enter Email Address" size="large" />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col xs={24} sm={24} md={12} lg={12} xl={12}>
								<Form.Item
									label="Branch Name"
									name="branchName"
									rules={[
										{ required: true, message: "Please enter branch name" },
									]}
								>
									<Input
										disabled
										size="large"
										value="XYZ Salon Riyadh Road"
										placeholder="Enter branch name"
									/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12} lg={12} xl={12}>
								<Form.Item label="Staff Manager" name="staffManager">
									<Input
										disabled
										size="large"
										value="Mohammad Ali"
										placeholder="Enter staff manager name"
									/>
								</Form.Item>
							</Col>
						</Row>
					</Form>
					<div>
						<Text
							style={{
								fontWeight: "bold",
								marginTop: "24px",
								marginBottom: "16px",
								fontSize: window.innerWidth < 576 ? "14px" : "16px",
							}}
						>
							My availablity
						</Text>
						<div
							style={{
								padding: "8px",
								borderRadius: "6px",
							}}
						>
							{availability.map((item, index) => (
								<Row
									key={index}
									gutter={[16, 16]}
									style={{
										gap: window.innerWidth < 576 ? 8 : 16,
										marginBottom: "8px",
									}}
								>
									<Text
										style={{
											fontWeight: "bold",
											fontSize: window.innerWidth < 576 ? "14px" : "16px",
										}}
									>
										{item.day}:{" "}
									</Text>
									<Text
										style={{
											fontSize: window.innerWidth < 576 ? "14px" : "16px",
										}}
									>
										{item.start}
									</Text>
									<Text
										style={{
											fontSize: window.innerWidth < 576 ? "14px" : "16px",
										}}
									>
										{item.end}
									</Text>
								</Row>
							))}
						</div>
					</div>
					{/* <Title level={4} className="m-0">
						Bookings
					</Title> */}
				</Card>
				<Card
					title="Language Settings"
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
					extra={
						<Button
							type="default"
							// icon={<PlusOutlined />}
							onClick={() => {
								setModalType("language");
								showModal();
							}}
							style={{ backgroundColor: "#F9FAFB" }}
							size="small"
						>
							Change
						</Button>
					}
				>
					<div>
						<Text
							style={{
								fontWeight: "bold",
							}}
						>
							Select Language
						</Text>
						<Select
							defaultValue="English"
							style={{ width: "100%", marginTop: "8px" }}
							size="large"
							options={[
								{
									value: "English",
									label: "English",
								},
								{
									value: "Arabic",
									label: "Arabic",
								},
							]}
						/>
					</div>
				</Card>
				<Card
					title="Password Manager"
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
					extra={
						<Button
							type="default"
							// icon={<PlusOutlined />}
							// onClick={() => showAddVacationModal()}
							style={{ backgroundColor: "#F9FAFB" }}
							size="small"
						>
							Save
						</Button>
					}
				>
					<Form
						layout="vertical"
						form={profileForm}
						requiredMark={false}
						style={{ marginTop: "24px" }}
					>
						<Row gutter={[16, 16]}>
							<Col xs={24} sm={24} md={8} lg={8} xl={8}>
								<Form.Item
									label="Old Password"
									name="oldPassword"
									rules={[
										{ required: true, message: "Please enter old password" },
									]}
								>
									<Input.Password size="large" />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={8} lg={8} xl={8}>
								<Form.Item
									label="New Password"
									name="newPassword"
									rules={[
										{ required: true, message: "Please enter new password" },
									]}
								>
									<Input.Password size="large" />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={8} lg={8} xl={8}>
								<Form.Item
									label="Re-type Password"
									name="reTypePassword"
									rules={[
										{ required: true, message: "Please re type password" },
									]}
								>
									<Input.Password size="large" />
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Card>
			</Flex>
			<Modal
				open={isModalVisible}
				onCancel={onCloseModal}
				title={modalType === "profile" ? "General Settings" : "Language"}
				centered
				width={window.innerWidth < 768 ? "90%" : 520}
				footer={
					<div
						style={{
							display: "flex",
							gap: 5,
							justifyContent: "flex-end",
							flexWrap: "wrap",
						}}
					>
						<Button
							type="default"
							onClick={() => setIsModalVisible(false)}
							style={{ minWidth: window.innerWidth < 576 ? "100px" : "auto" }}
						>
							Cancel
						</Button>
						<Button
							type="primary"
							onClick={() => setIsModalVisible(false)}
							style={{ minWidth: window.innerWidth < 576 ? "100px" : "auto" }}
						>
							Save
						</Button>
					</div>
				}
			>
				{modalType === "profile" ? (
					<>
						<div
							style={{
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
							}}
						>
							<Image
								src="/assets/images/penguinProfile.png"
								alt="profile picture"
								preview={false}
								width={100}
								style={{ maxWidth: "100%", height: "auto" }}
							/>
						</div>
						<Form
							layout="vertical"
							form={profileForm}
							requiredMark={false}
							style={{ marginTop: "24px" }}
						>
							<Col span={24}>
								<Form.Item
									label="First Name"
									name="firstName"
									rules={[
										{ required: true, message: "Please enter first name" },
									]}
								>
									<Input placeholder="Enter first name" size="large" />
								</Form.Item>
							</Col>
							<Col span={24}>
								<Form.Item label="Last Name" name="lastName">
									<Input placeholder="Enter last name" size="large" />
								</Form.Item>
							</Col>
							<Col span={24}>
								<Form.Item
									label="Phone Number"
									name="phoneNumber"
									rules={[
										{ required: true, message: "Please enter phone number" },
									]}
								>
									<Input placeholder="Enter phone number" size="large" />
								</Form.Item>
							</Col>
							<Col span={24}>
								<Form.Item
									label="Email Address"
									name="email"
									rules={[
										{
											type: "email",
											message: "The input is not valid E-mail!",
										},
										{ required: true, message: "Please input your E-mail!" },
									]}
								>
									<Input placeholder="Enter Email Address" size="large" />
								</Form.Item>
							</Col>
						</Form>
					</>
				) : (
					<div>
						<Text
							style={{
								fontWeight: "bold",
							}}
						>
							Language
						</Text>
						<Select
							defaultValue="English"
							style={{ width: "100%", marginTop: "8px" }}
							size="large"
							options={[
								{
									value: "English",
									label: "English",
								},
								{
									value: "Arabic",
									label: "Arabic",
								},
							]}
						/>
					</div>
				)}
			</Modal>
		</div>
	);
};

export default ManageSettings;
