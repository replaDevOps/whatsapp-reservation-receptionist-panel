import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { mystaffData } from "../../../../data";
import { Button, Card, Flex, Image, Typography } from "antd";
import { StaffEventCard } from "./StaffEventCard";
import { NavigationControl } from "./NavigationControl";
import { ModuleTopHeading } from "../../../PageComponent";
import { PlusOutlined } from "@ant-design/icons";
import { AddVacation } from "../modal";
import { DeleteModal } from "../../../Ui";

const localizer = momentLocalizer(moment);
const getCellStatusColor = (date, events) => {
  const current = moment(date).startOf('day');
  const matchedEvent = events.find((ev) => {
    const start = moment(ev.start).startOf('day');
    const end = moment(ev.end).startOf('day');
    return current.isBetween(start, end, null, '[]'); // supports multi-day
  });

  if (!matchedEvent) return {};

  switch (matchedEvent.status) {
    case "accepted":
      return { backgroundColor: "rgba(0,143,23,0.08)" };
    case "rejected":
      return { backgroundColor: "rgba(255,59,48,0.08)" };
    case "pending":
      return { backgroundColor: "rgba(219,110,0,0.08)" };
    default:
      return {};
  }
};

const eventStyleGetter = (event) => {
    let backgroundColor = "";
    switch (event.status) {
        case "accepted":
            backgroundColor = "#E6F4E8";
            break;
        case "rejected":
            backgroundColor = "#FFECEB";
            break;
        case "pending":
            backgroundColor = "#FCF1E6";
            break;
        default:
            backgroundColor = "#05BAB5";
    }

    return {
        style: {
          backgroundColor,
          borderRadius: "6px",
          padding: "2px 6px",
          fontSize: "13px",
          cursor: "pointer",
          width:'100%'
        },
    };
};
const { Title, Text } = Typography
const StaffVacationsSchedule = () => {
    const [events] = useState(mystaffData);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [ visible, setVisible ] = useState(false)
    const [ editevent, setEditEvent ] = useState(null)
    const [ deleteitem, setDeleteItem ] = useState(false)

    const formattedDate = currentDate.toDateString();
    
    return (
      <>
        <Card className='card-bg radius-12 border-gray card-cs'>
          <Flex vertical gap={20}>
            <Flex justify="space-between" align="center" gap={10}>
              <Flex vertical>
                <ModuleTopHeading level={4} name='Staff Vacations' />
                <Text className='text-gray fs-13'>Manage your staff vacations.</Text>
              </Flex>
              <Button className='btncancel' onClick={()=>{setVisible(true)}}> 
                <PlusOutlined /> Add Vacation
              </Button>
            </Flex>
            <Flex gap={15} align='center'>
              <Image src='/assets/icons/newcust-ar.webp' width={40} preview={false} alt='total vacations icon' fetchPriority="high" />
              <Flex vertical>
                  <Text className='text-gray fs-15'>Total vacations  (this month)</Text>
                  <Title className='fw-600 m-0' level={4}>
                      19
                  </Title>
              </Flex>
            </Flex>
            <NavigationControl
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              formattedDate={formattedDate}
            />
            <Calendar
              localizer={localizer}
              events={events}
              date={currentDate}
              onNavigate={setCurrentDate}
              defaultView="month"
              views={["month"]}
              step={60}
              timeslots={1}
              eventPropGetter={eventStyleGetter}
              dayPropGetter={(date) => {
                return {
                  style: {
                    ...getCellStatusColor(date, events),
                    borderRadius: "6px",
                  },
                };
              }}
              popup
              components={{
                event: StaffEventCard
              }}
              showMultiDayTimes={false}
              className="h-700 vacation-calendar"
              toolbar={false}
              selectable={false}  
              onSelectEvent={(event) => {
                if (event.status === "pending") {
                  setEditEvent(event);
                  setVisible(true);
                }
              }}
            />
          </Flex>
        </Card>
        <AddVacation 
          visible={visible}
          edititem={editevent}
          setDeleteItem={setDeleteItem}
          onClose={()=>{setVisible(false);setEditEvent(null)}}
        />
        <DeleteModal 
          visible={deleteitem}
          title={'Are you sure?'}
          subtitle={'This action cannot be undone. Are you sure you want to delete this vacation?'}
          onClose={()=>setDeleteItem(false)}
        />
      </>
    );
};

export { StaffVacationsSchedule };
