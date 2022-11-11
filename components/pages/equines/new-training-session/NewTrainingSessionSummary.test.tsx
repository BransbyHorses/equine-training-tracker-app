import { convertDayJsDateToString } from "./NewTrainingSessionSummary";
import dayjs from "dayjs";

test("will convert day js date to string for request", () => {
	const dateString = "2022-10-10T16:30:11";
	const dayJsDate = dayjs(dateString);
	const formattedDate = convertDayJsDateToString(dayJsDate);
	expect(formattedDate).toBe("2022-10-10 16:30:11");
});

test("will add zero to single digit day value", () => {
	const dateString = "2022-10-09T16:30:11";
	const dayJsDate = dayjs(dateString);
	const formattedDate = convertDayJsDateToString(dayJsDate);
	expect(formattedDate).toBe("2022-10-09 16:30:11");
});

test("will add zero to single digit second value", () => {
	const dateString = "2022-10-10T16:30:09";
	const dayJsDate = dayjs(dateString);
	const formattedDate = convertDayJsDateToString(dayJsDate);
	expect(formattedDate).toBe("2022-10-10 16:30:09");
});
