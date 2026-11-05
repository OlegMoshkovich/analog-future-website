/** Historical estimates from Table 1, pp. 10–11 of the October 24, 2023 #WeCount report. */
export const REPORT_URL = "https://societyfp.org/wp-content/uploads/2023/10/wecount-report-4-june-2023-data.pdf";
export const REPORTS_URL = "https://societyfp.org/research/wecount/wecount-reports/";
export const PERIOD = "April 2022–June 2023";
export type Count = number | "<10";
export type StateSeries = { name: string; imputation: string; values: Count[] };

export const MONTHS = [
  ["Apr", "April", 2022], ["May", "May", 2022], ["Jun", "June", 2022],
  ["Jul", "July", 2022], ["Aug", "August", 2022], ["Sep", "September", 2022],
  ["Oct", "October", 2022], ["Nov", "November", 2022], ["Dec", "December", 2022],
  ["Jan", "January", 2023], ["Feb", "February", 2023], ["Mar", "March", 2023],
  ["Apr", "April", 2023], ["May", "May", 2023], ["Jun", "June", 2023],
].map(([short, name, year]) => ({ short: String(short), name: String(name), year: Number(year), label: `${name} ${year}` }));

// Preserve the source's suppressed cells. "<10" represents an interval of 0–9, not zero.
const rows = `
Alabama|None|650 620 520 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10
Alaska|1–4%|120 120 140 110 150 150 140 140 160 130 130 140 120 140 140
Arizona|5–14%|1330 1470 1170 210 720 610 420 790 820 1120 990 1260 1000 1230 1080
Arkansas|None|290 340 260 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10
California|1–4%|12980 12960 13580 13250 13760 12070 12100 12320 14450 14920 13190 15190 14320 14440 14440
Colorado|1–4%|1580 1700 1780 1940 2190 1970 1940 1940 2100 2290 2040 2350 2220 2240 2220
Connecticut|None|890 920 940 960 920 850 850 880 960 1100 970 1200 1210 1210 1210
Delaware|Less than 1%|190 210 240 220 240 260 260 290 310 240 210 260 230 270 270
District of Columbia|30–44%|910 880 880 890 970 850 900 820 840 910 880 1090 940 940 920
Florida|More than 45%|6000 6000 6540 6540 7280 6770 7470 6890 8060 7970 7870 9020 7830 7870 8890
Georgia|Less than 1%|4260 3970 4180 4150 1850 2120 2220 2520 2260 2470 2240 2790 2420 2340 2340
Hawaii|None|240 210 250 210 300 280 260 280 270 300 260 280 310 260 260
Idaho|1–4%|170 180 190 160 160 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10
Illinois|5–14%|5530 5490 6120 6720 7200 6590 6560 6330 7200 7780 7240 8390 7660 7910 8040
Indiana|15–29%|940 880 890 1110 1090 730 490 690 550 490 690 720 600 680 700
Iowa|None|380 370 390 360 280 320 310 350 370 370 300 390 200 260 260
Kansas|5–14%|970 950 930 930 1280 1150 1260 1130 1310 1660 1560 1700 1560 1650 1670
Kentucky|None|310 380 300 280 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10
Louisiana|None|760 810 540 310 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10
Maine|None|190 230 240 240 240 220 200 190 200 240 210 260 230 250 250
Maryland|15–29%|2630 2610 2650 2550 2720 2780 2840 2870 3330 3360 3370 3350 3320 3660 3620
Massachusetts|5–14%|1590 1470 1570 1600 1610 1570 1530 1500 1660 1690 1450 1860 1600 1690 1730
Michigan|5–14%|2680 2630 2990 3110 3230 3040 3060 2930 3100 3070 2990 3450 3230 3050 3080
Minnesota|Less than 1%|930 920 1030 1160 1220 1220 1260 1290 1230 1230 1100 1410 1230 1350 1370
Mississippi|None|350 350 470 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10
Missouri|None|10 10 10 <10 <10 <10 <10 <10 <10 <10 <10 <10 10 <10 <10
Montana|Less than 1%|170 180 170 160 220 170 200 190 170 210 170 190 180 200 200
Nebraska|None|200 190 210 210 260 230 240 200 170 320 280 250 280 240 240
Nevada|5–14%|1070 1000 1220 1130 1410 1290 1350 1300 1440 1510 1400 1540 1410 1380 1420
New Hampshire|5–14%|210 180 210 200 220 200 190 190 230 200 210 250 250 220 230
New Jersey|30–44%|3840 3900 3980 4080 4510 3910 3980 4210 4510 4520 4170 4780 4480 4880 4730
New Mexico|5–14%|1200 1180 1450 1480 1570 1760 1810 1910 2020 2120 1890 2220 1930 2070 2140
New York|30–44%|8780 9190 9720 9360 10280 9290 9410 7740 9160 8750 8080 9900 9180 9460 9770
North Carolina|15–29%|3250 3240 3210 3900 4360 4060 3840 3680 4070 4510 4120 4730 4220 4580 4700
North Dakota|None|90 110 130 100 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10
Ohio|15–29%|2040 2000 1830 810 780 1080 1510 1510 1800 1830 1810 1970 1610 2390 2020
Oklahoma|None|480 140 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10
Oregon|Less than 1%|840 800 910 870 1070 960 960 950 1010 1050 880 1150 1060 1120 1120
Pennsylvania|Less than 1%|2910 2640 2910 3310 3090 3010 2700 2500 3080 2860 2970 3470 2900 3060 3050
Rhode Island|Less than 1%|310 290 260 280 290 280 310 200 230 260 230 300 200 200 210
South Carolina|1–4%|690 630 490 180 360 790 830 750 850 990 1000 1090 950 930 930
South Dakota|None|20 40 30 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10
Tennessee|Less than 1%|1190 1220 1040 280 250 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10
Texas|Less than 1%|3190 2990 2600 70 <10 <10 <10 10 <10 10 <10 10 <10 <10 10
Utah|None|320 400 360 270 310 320 280 320 340 360 340 400 340 330 330
Vermont|None|100 110 110 110 120 110 100 110 110 120 90 120 120 110 110
Virginia|15–29%|2160 2210 2400 2650 2380 2410 2500 2160 2260 3160 2870 3100 3170 3080 3120
Washington|1–4%|1760 1710 1940 1730 1940 1990 1980 1810 1930 2030 1880 2050 1930 1980 1980
West Virginia|1–4%|90 120 110 30 80 20 <10 <10 <10 <10 <10 <10 <10 <10 <10
Wisconsin|5–14%|590 620 520 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10 <10
Wyoming|None|40 40 50 50 40 60 40 40 50 50 40 50 30 40 40
`;

export const STATES: StateSeries[] = rows.trim().split("\n").map((row) => {
  const [name, imputation, counts] = row.split("|");
  return { name, imputation, values: counts.split(" ").map((n) => n === "<10" ? "<10" : Number(n)) };
});

export const NATIONAL: StateSeries = {
  name: "United States", imputation: "18% overall",
  values: [82420, 81810, 84660, 78270, 80950, 75490, 76300, 73930, 82610, 86200, 80120, 92680, 84480, 87710, 88840],
};

export function countBounds(count: Count): [number, number] {
  return count === "<10" ? [0, 9] : [count, count];
}

export function changeBounds(series: StateSeries, month: number): [number, number] {
  const [lo, hi] = countBounds(series.values[month]);
  const [baseLo, baseHi] = countBounds(series.values[0]);
  return [lo - baseHi, hi - baseLo];
}

export const formatNumber = (n: number) => new Intl.NumberFormat("en-US").format(n);
export const formatCount = (n: Count) => n === "<10" ? "<10" : formatNumber(n);
export const signedNumber = (n: number) => n === 0 ? "0" : `${n < 0 ? "−" : "+"}${formatNumber(Math.abs(n))}`;
export const formatChange = (bounds: [number, number]) => bounds[0] === bounds[1] ? signedNumber(bounds[0]) : `${signedNumber(bounds[0])} to ${signedNumber(bounds[1])}`;
