import type { Locale } from "react-date-object";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import gregorianEn from "react-date-object/locales/gregorian_en";

/** Afghans use two calendars side by side: Solar Hijri (Afghan month names) and Gregorian. */
export type CalendarType = "afghan" | "gregorian";

const faDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const faWeekDays: [string, string][] = [
  ["شنبه", "ش"],
  ["یکشنبه", "ی"],
  ["دوشنبه", "د"],
  ["سه‌شنبه", "س"],
  ["چهارشنبه", "چ"],
  ["پنجشنبه", "پ"],
  ["جمعه", "ج"],
];
const meridiems: [string, string][] = [
  ["قبل از ظهر", "ق.ظ"],
  ["بعد از ظهر", "ب.ظ"],
];

/** Solar Hijri — Afghan (Dari) month names */
export const afghanDari: Locale = {
  name: "afghan_fa",
  months: [
    ["حمل", "حمل"],
    ["ثور", "ثور"],
    ["جوزا", "جوزا"],
    ["سرطان", "سرطان"],
    ["اسد", "اسد"],
    ["سنبله", "سنبله"],
    ["میزان", "میزان"],
    ["عقرب", "عقرب"],
    ["قوس", "قوس"],
    ["جدی", "جدی"],
    ["دلو", "دلو"],
    ["حوت", "حوت"],
  ],
  weekDays: faWeekDays,
  digits: faDigits,
  meridiems,
};

/** Solar Hijri — Pashto month names */
export const afghanPashto: Locale = {
  name: "afghan_ps",
  months: [
    ["وری", "وری"],
    ["غویی", "غویی"],
    ["غبرګولی", "غبرګولی"],
    ["چنګاښ", "چنګاښ"],
    ["زمری", "زمری"],
    ["وږی", "وږی"],
    ["تله", "تله"],
    ["لړم", "لړم"],
    ["لیندۍ", "لیندۍ"],
    ["مرغومی", "مرغومی"],
    ["سلواغه", "سلواغه"],
    ["کب", "کب"],
  ],
  weekDays: faWeekDays,
  digits: faDigits,
  meridiems,
};

/** Gregorian with the month names used in Afghanistan */
export const gregorianDari: Locale = {
  name: "gregorian_af",
  months: [
    ["جنوری", "جنو"],
    ["فبروری", "فبر"],
    ["مارچ", "مار"],
    ["اپریل", "اپر"],
    ["می", "می"],
    ["جون", "جون"],
    ["جولای", "جول"],
    ["اگست", "اگس"],
    ["سپتمبر", "سپت"],
    ["اکتوبر", "اکت"],
    ["نومبر", "نوم"],
    ["دسمبر", "دسم"],
  ],
  weekDays: faWeekDays,
  digits: faDigits,
  meridiems,
};

export function getCalendarSetup(type: CalendarType, lang: "fa" | "en" | "ps") {
  if (type === "afghan") {
    return {
      calendar: persian,
      locale: lang === "ps" ? afghanPashto : afghanDari,
      format: "YYYY/MM/DD",
    };
  }
  return {
    calendar: gregorian,
    locale: lang === "en" ? gregorianEn : gregorianDari,
    format: "DD/MM/YYYY",
  };
}
