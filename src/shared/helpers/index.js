import dayjs from "dayjs"
import { useEffect, useState } from "react";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const utcDateTimeToLocal= (dateTime)=>{
    return dayjs.utc(dateTime).local().format("YYYY-MM-DD hh:mm A")
}
const utcTimeToLocal= (dateTime)=>{
    return dayjs.utc(dateTime).local().format("hh:mm A")
}
const utcDateToLocal = (dateTime) => {
    return dayjs.utc(dateTime).local().format("YYYY-MM-DD");
};
const greaterThanEqualTo = (expiry)=> {
    if (dayjs().isSameOrAfter(expiry)) 
        return true
    return false
}

const handleApolloError = (apolloError, messageApi) => {
    const errorMessage =
        apolloError?.graphQLErrors?.[0]?.message ||
        apolloError?.message ||
        "Something went wrong!";

    messageApi.error(errorMessage);
};


const capitalizeTranslated = (value, t) => {
  if (value === null || value === undefined) return "";

  // Convert value to string first
  let str = String(value);

  // If t is a function, translate it
  if (typeof t === "function") {
    str = String(t(value));
  }

  // Capitalize first letter, rest lowercase
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};


// function formatTime24to12(timeStr) {
//     if (!timeStr) return "";

//     // Example input: "09:00 am" or "05:00 pm"
//     const [time, modifier] = timeStr.toLowerCase().split(" ");
//     if (!time || !modifier) return "";

//     let [hours, minutes] = time.split(":");
//     hours = Number(hours);
//     minutes = Number(minutes);

//     if (modifier === "pm" && hours !== 12) {
//         hours += 12;
//     }
//     if (modifier === "am" && hours === 12) {
//         hours = 0;
//     }

//     // Now convert back to 12-hour display format
//     const period = hours >= 12 ? "PM" : "AM";
//     const hour12 = hours % 12 === 0 ? 12 : hours % 12;

//     return `${hour12.toString().padStart(2, "0")}:${minutes
//         .toString()
//         .padStart(2, "0")} ${period}`;
// }

function formatTime24to12(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return ''; // invalid date check

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // convert 0 to 12
  const minutesStr = minutes.toString().padStart(2, '0');

  return hours + ':' + minutesStr + ' ' + ampm;
}

const useDebounce = (value, delay = 500)=> {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}


const notifySuccess = (api, message, description, onClose) => {
    api.success({
        message,
        description,
        showProgress: true,
        pauseOnHover: true,
        onClose,
        duration: 2,
    });
};

const notifyError = (api, error) => {
    api.error({
        message: "Error",
        description: error?.message || "Something went wrong",
        showProgress: true,
        pauseOnHover: true,
        duration:1
    });
};

const FieldMerger = ({ object, fields = [], separator = " " }) => {
    if (!object || !fields.length) return "--"; // fallback if empty
    return fields
        .map(field => object[field])       // extract each field
        .filter(value => value !== undefined && value !== null && value !== "") // remove empty
        .join(separator);                  // join with separator
};

const getInitials = (name) => {
  if (typeof name !== "string" || !name.trim()) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};


export {utcDateTimeToLocal, greaterThanEqualTo, handleApolloError, capitalizeTranslated, formatTime24to12, useDebounce, notifySuccess, notifyError,FieldMerger,utcDateToLocal,utcTimeToLocal,getInitials}
export * from "./TableLoader"
export * from "./SmLoader"
