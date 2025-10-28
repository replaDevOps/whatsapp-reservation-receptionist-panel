import { Card, Col, Flex, Row, Typography } from "antd";
import { message } from "antd";
import { useAuth } from "../../../hooks";

const { Title, Text } = Typography;
const DashboardCards = () => {
	const [messageApi, contextHolder] = message.useMessage();

	const { userType } = useAuth();

	const isReceptionist = userType == "receptionist";

	const cardsData = [
		{
			id: 1,
			icon: "dummy.png",
			title: "6,784",
			subtitle: "Total Bookings",
		},
		{
			id: 2,
			icon: "dummy.png",
			title: "6,784",
			subtitle: "Cancelled Bookings",
		},
		{
			id: 3,
			icon: "dummy.png",
			title: "6,784",
			subtitle: "Manual Bookings",
		},
		{
			id: 4,
			icon: "dummy.png",
			title: "678",
			subtitle: "WhatsApp Bookings",
		},
	];

	const receptionistCardsData = [
		{
			id: 1,
			icon: "dummy.png",
			title: "140",
			subtitle: "Total Bookings",
		},
		{
			id: 2,
			icon: "dummy.png",
			title: "50",
			subtitle: "Today’s  Manual Bookings ",
		},
		{
			id: 3,
			icon: "dummy.png",
			title: "50",
			subtitle: "Today’s  WhatsApp Bookings ",
		},
		{
			id: 4,
			icon: "dummy.png",
			title: "4",
			subtitle: "Today’s  Cancelled Bookings ",
		},
	];

	return (
		<>
			{contextHolder}
			<Row gutter={[14, 24]} className="h-100">
				{(isReceptionist ? receptionistCardsData : cardsData)?.map(
					(item, index) => (
						<Col
							xs={{ span: 24 }}
							sm={{ span: 24 }}
							md={{ span: 12 }}
							lg={{ span: 6 }}
							key={index}
						>
							<Card
								className={`${
									isReceptionist && index === 0 ? "brand-color" : "card-bg"
								} h-100 border-gray card-cs`}
								style={{
									backgroundColor:
										isReceptionist && index === 0
											? "var(--brand-color)"
											: "#F4F4F4",
								}}
							>
								<Flex gap={8} vertical>
									<div>
										<img
											src={"/assets/icons/" + item?.icon}
											width={45}
											alt=""
										/>
									</div>
									<Text
										className={`fs-14 ${
											isReceptionist && index === 0 ? "text-white" : "text-gray"
										}`}
									>
										{item?.subtitle}
									</Text>
									<Title
										level={5}
										className={`fw-600 ${
											isReceptionist && index === 0
												? "text-white"
												: "text-black"
										}m-0`}
									>
										{item?.title}
									</Title>
								</Flex>
							</Card>
						</Col>
					)
				)}
			</Row>
		</>
	);
};

export { DashboardCards };
