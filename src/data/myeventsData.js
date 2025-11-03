const myeventsData = [
    {
        id: 1,
        start: new Date(2025, 8, 15, 0, 0),
        end: new Date(2025, 8, 15, 1, 0),
        resourceId: 1,
        booking: [
            {
                name:'Muhammad Hamza',
                phoneno:'+966 798 328 129',
                duration:'25 minutes',
                amount:'SAR 40',
                email: 'hamza@gmail.com',
                off:'SAR 50',
                offer:'OFF20',
                service: "Hair Cut",
                status: "completed",
                time: "00:00 pm - 02:00 pm",
                date: "22/08/2025",
                description:'Lorem Ipsum. "Neque porro quisquam est qui dolorem',
                reason:null
            },
        ]
    },
    {
        id: 2,
        start: new Date(2025, 8, 15, 2, 0),
        end: new Date(2025, 8, 15, 3, 0),
        resourceId: 2,
        booking:[
            {
                name:'Ahmed Bilal',
                phoneno:'+966 798 328 129',
                duration:'15 minutes',
                amount:'SAR 40',
                email: 'bilal@gmail.com',
                off: null,
                offer:null,
                service: "Beard Cut",
                status: "cancelled",
                time: "02:00 pm - 03:00 pm",
                date: "22/08/2025",
                description: 'Lorem Ipsum. "Neque porro quisquam est qui dolorem',
                reason: 'Lorem Ipsum. "Neque porro quisquam est qui dolorem'
            }
        ]
    },
    {
        id: 3,
        start: new Date(2025, 8, 15, 4, 0),
        end: new Date(2025, 8, 15, 6, 0),
        resourceId: 3,
        booking:[
            {
                name:'Zubair Khan',
                phoneno:'+966 798 328 129',
                duration:'15 minutes',
                amount:'SAR 40',
                email: 'zubair@gmail.com',
                off: null,
                offer:null,
                service: "Head Scrub",
                status: "in-progress",
                time: "04:00 pm - 05:40 pm",
                date: "22/08/2025",
                description: 'Lorem Ipsum. "Neque porro quisquam est qui dolorem',
                reason:null
            }
        ]
    },
    {
        id: 4,
        start: new Date(2025, 8, 15, 7, 0),
        end: new Date(2025, 8, 15, 8, 0),
        resourceId: 1,
        booking:[
            { 
                name:'Muhammad Ali',
                phoneno:'+966 798 328 129',
                duration:'25 minutes',
                amount:'SAR 40',
                email: 'ali@gmail.com',
                off: null,
                offer:null,
                service: "Head Scrub", 
                status: "pending", 
                time: "00:20 pm - 02:45 pm", 
                date: "22/08/2025",
                description: 'Lorem Ipsum. "Neque porro quisquam est qui dolorem',
                reason:null
            }
        ]
    },
    {
        id: 5,
        start: new Date(2025, 8, 15, 9, 0),
        end: new Date(2025, 8, 15, 12, 0),
        resourceId: 3,
        booking:[
            {
                name:'Muhammad Hamza',
                phoneno:'+966 798 328 129',
                duration:'25 minutes',
                amount:'SAR 40',
                email: 'hamza@gmail.com',
                off: null,
                offer:null,
                service: "Hair Cut",
                status: "no-show",
                time: "00:20 pm - 02:45 pm",
                date: "22/08/2025",
                description: null,
                reason:null
            }
        ]
    },

    {
        id: 6,
        start: new Date(2025, 8, 15, 9, 0),
        end: new Date(2025, 8, 15, 12, 0),
        resourceId: 2,
        booking:[
            {
                name:'Muhammad Hamza',
                phoneno:'+966 798 328 129',
                duration:'25 minutes',
                amount:'SAR 40',
                email: 'hamza@gmail.com',
                off: null,
                offer:null,
                service: "Hair Cut",
                status: "no-show",
                time: "00:20 pm - 02:45 pm",
                date: "22/08/2025",
                description: null,
                reason:null
            },
        ]
    },

    {
        id: 7,
        start: new Date(2025, 8, 15, 9, 0),
        end: new Date(2025, 8, 15, 12, 0),
        resourceId: 4,
        booking:[
            {
                name:'Abbas Ali',
                phoneno:'+966 798 328 129',
                duration:'25 minutes',
                amount:'SAR 40',
                email: 'hamza@gmail.com',
                off:'SAR 50',
                offer:'OFF20',
                service: "Face Treatment",
                status: "completed",
                time: "00:00 pm - 02:00 pm",
                date: "22/08/2025",
                description:'Lorem Ipsum. "Neque porro quisquam est qui dolorem',
                reason:null
            },
        ]
    },
];

const mystaffData = [
    {
        id: 1,
        start: new Date(2025, 10, 2, 0, 0),
        end: new Date(2025, 10, 2, 1, 0),
        img:'/assets/images/av-3.webp',
        name:'Muhammad Hamza',
        type: 'Service Provider',
        service: ["Hair Cut A","Hair Cut B"],
        status: "accepted",
    },
    {
        id: 3,
        start: new Date(2025, 10, 13, 4, 0),
        end: new Date(2025, 10, 14, 6, 0),
        img:'/assets/images/av-2.webp',
        name:'Bilal Ali Khan',
        type: 'Service Provider',
        service: ["Beard Cut"],
        status: "rejected",  
    },
    {
        id: 5,
        start: new Date(2025, 10, 18, 4, 0),
        end: new Date(2025, 10, 18, 6, 0),
        img:'/assets/images/av-2.webp',
        name:'Muhammad Ali',
        type: 'Service Provider',
        service: ["Head Scrub"],
        status: "accepted",
    },
    {
        id: 7,
        start: new Date(2025, 10, 23, 7, 0),
        end: new Date(2025, 10, 26, 8, 0),
        img:'/assets/images/av-3.webp',
        name:'Ali Abbas',
        type: 'Service Provider',
        service: ["Facial","Scrub"], 
        status: "pending",
    },
];

export { myeventsData, mystaffData }