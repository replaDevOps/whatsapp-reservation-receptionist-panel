import { useState, useRef } from "react";
import { Card, Col, Flex, Row, Typography, Button, Select } from "antd";
import { PlusOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import {
	BasicPlanCard,
	BookingCustomerBarChart,
	BookingLineChart,
	DashboardCards,
	MostBookService,
	MostBookTable,
	ScheduleTable,
	BookingModals,
} from "../../components";
import { useAuth } from "../../hooks";
import { format, parse, addDays, subDays } from "date-fns";

const { Title } = Typography;
const Dashboard = () => {
	const { userType } = useAuth();

	const [selectedDate, setSelectedDate] = useState(format(new Date(), "PPP"));

	const isReceptionist = userType == "receptionist";

	const [bookingToCancel, setBookingToCancel] = useState(null);
	const bookingModalsRef = useRef();

	// Your existing services data
	const services = [
		{ value: "haircut", label: "Hair Cut", duration: 60, price: 25 },
		{ value: "beard", label: "Beard Cut", duration: 30, price: 15 },
		{ value: "facial", label: "Hydra-Facial", duration: 90, price: 45 },
		{ value: "scrub", label: "Head Scrub", duration: 45, price: 30 },
	];

	const serviceProviders = [
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

	const cancellationReasons = [
		"Customer requested",
		"Emergency",
		"Staff unavailable",
		"Equipment issue",
		"Weather conditions",
		"Other",
	];

	const handleDateChange = (direction) => {
		const currentDate = parse(selectedDate, "PPP", new Date());

		const updatedDate =
			direction === "next" ? addDays(currentDate, 1) : subDays(currentDate, 1);

		setSelectedDate(format(updatedDate, "PPP"));
	};

	const handleAddBooking = async (bookingData) => {
		try {
			// Your API call to add booking
			console.log("Adding booking:", bookingData);

			// Example API call:
			// const response = await fetch('/api/bookings', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify(bookingData)
			// });

			// if (!response.ok) throw new Error('Failed to add booking');

			// Refresh your booking data here
			// await fetchBookings();

			// message.success('Booking added successfully!');
		} catch (error) {
			console.error("Error adding booking:", error);
			throw error; // Re-throw to let the modal handle the error
		}
	};

	const handleCancelBooking = async (cancellationData) => {
		try {
			// Your API call to cancel booking
			console.log("Cancelling booking:", cancellationData);

			// Example API call:
			// const response = await fetch(`/api/bookings/${cancellationData.id}/cancel`, {
			//   method: 'PUT',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify({
			//     reason: cancellationData.reason,
			//     notes: cancellationData.notes
			//   })
			// });

			// if (!response.ok) throw new Error('Failed to cancel booking');

			// Refresh your booking data here
			// await fetchBookings();

			// message.success('Booking cancelled successfully!');
		} catch (error) {
			console.error("Error cancelling booking:", error);
			throw error; // Re-throw to let the modal handle the error
		}
	};

	// Function to trigger cancel booking modal with specific booking data
	const handleCancelSpecificBooking = (booking) => {
		setBookingToCancel(booking);
		// Show the cancel modal
		if (bookingModalsRef.current) {
			bookingModalsRef.current.showCancelBookingModal();
		}
	};

	return (
		<div>
			<Flex vertical gap={24}>
				{!isReceptionist && (
					<>
						<Title level={4} className="m-0">
							Hi Business Name!
						</Title>
						<BasicPlanCard />
					</>
				)}
				<DashboardCards />
				<Card
					title="Bookings"
					extra={
						<Button
							type="default"
							icon={<PlusOutlined />}
							onClick={() => bookingModalsRef.current?.showAddBookingModal()}
							style={{ backgroundColor: "#F9FAFB" }}
						>
							Add Booking
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
						<Button
							icon={<LeftOutlined />}
							size="middle"
							style={{ borderRight: "1px solid ##FCFCFD" }}
							onClick={() => handleDateChange("prev")}
						/>
						<span
							style={{
								margin: "0 16px",
								fontWeight: "500",
								fontSize: "14px",
							}}
						>
							{selectedDate}
						</span>
						<Button
							icon={<RightOutlined />}
							size="middle"
							style={{ borderRight: "1px solid ##FCFCFD" }}
							onClick={() => handleDateChange("next")}
						/>
					</div>
					{/* <Title level={4} className="m-0">
						Bookings
					</Title> */}
				</Card>

				<Card>
					<Flex gap={10}>
						<Select
							placeholder="Select Service"
							style={{
								height: 30,
								marginBottom: "16px",
							}}
							size="small"
							options={[
								{
									value: "haircut",
									label: "Hair Cut",
								},
								{
									value: "beard",
									label: "Beard Cut",
								},
								{
									value: "facial",
									label: "Hydra-Facial",
								},
								{
									value: "scrub",
									label: "Head Scrub",
								},
							]}
						/>
						<Select
							placeholder="Select Service Provider"
							style={{ height: 30, marginBottom: "16px" }}
							size="small"
							options={serviceProviders.map((provider) => ({
								value: provider.id,
								label: provider.name,
							}))}
						/>
					</Flex>
					<ScheduleTable onCancelBooking={handleCancelSpecificBooking} />
				</Card>
				{/* <BookingScheduleTable /> */}
				{!isReceptionist && (
					<>
						<BookingLineChart />
						<BookingCustomerBarChart />
						<Row gutter={[24, 24]}>
							<Col xl={{ span: 16 }} lg={{ span: 14 }} span={24}>
								<MostBookTable />
							</Col>
							<Col xl={{ span: 8 }} lg={{ span: 10 }} span={24}>
								<MostBookService />
							</Col>
						</Row>
					</>
				)}
			</Flex>
			<BookingModals
				ref={bookingModalsRef}
				onAddBooking={handleAddBooking}
				onCancelBooking={handleCancelBooking}
				bookingToCancel={bookingToCancel}
				services={services}
				serviceProviders={serviceProviders}
				cancellationReasons={cancellationReasons}
			/>
		</div>
	);
};

export { Dashboard };
