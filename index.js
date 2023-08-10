const timezones = [
    "America/New_York",
    "America/Los_Angeles",
    "America/Chicago",
    "America/Denver",
    "America/Phoenix",
    "America/Caracas",
    "America/La_Paz",
    "America/Mexico_City",
    "America/Halifax",
    "America/Manaus",
    "America/Sao_Paulo",
    "America/Noronha",
    "America/Argentina/Buenos_Aires",
    "America/Argentina/Cordoba",
    "America/Argentina/Salta",
    "America/Argentina/Jujuy",
    "America/Argentina/Tucuman",
    "America/Argentina/Catamarca",
    "America/Argentina/La_Rioja",
    "America/Argentina/San_Juan",
    "America/Argentina/Mendoza",
    "America/Argentina/San_Luis",
    "America/Argentina/Rio_Gallegos",
    "America/Argentina/Ushuaia",
    "Pacific/Easter",
    "America/Bogota",
    "America/Lima",
    "Europe/London",
    "Asia/Jerusalem",
    "Asia/Shanghai",
    "Asia/Tokyo",
    "Asia/Seoul",
    "Asia/Ho_Chi_Minh",
    "Asia/Kuala_Lumpur",
    "Asia/Singapore",
    "Asia/Hong_Kong",
    "Asia/Istanbul",
    "Asia/Tehran",
    "Asia/Dubai",
    "Asia/Muscat",
    "Asia/Riyadh",
    "Asia/Baku",
    "Asia/Yerevan",
    "Asia/Tbilisi",
    "Asia/Kabul",
    "Asia/Yekaterinburg",
    "Asia/Karachi",
    "Asia/Baghdad",
    "Asia/Kuwait",
    "Asia/Vientiane",
    "Asia/Samarkand",
    "Asia/Tashkent",
    "Asia/Kolkata",
    "Asia/Kathmandu",
    "Asia/Almaty",
    "Asia/Dhaka",
    "Asia/Jakarta",
    "Europe/Moscow",
    "Europe/Volgograd",
    "Europe/Minsk",
    "Europe/Simferopol",
    "Europe/Kirov",
    "Europe/Vilnius",
    "Europe/Zaporozhye",
    "Europe/Saratov",
    "Europe/Ulyanovsk",
    "Europe/Samara",
    "Europe/Stockholm",
    "Europe/Astrakhan",
    "Europe/Madrid",
    "Europe/Paris",
    "Europe/Brussels",
    "Europe/Luxembourg",
    "Europe/Malta",
    "Europe/Amsterdam",
    "Europe/Belgrade",
    "Europe/Bratislava",
    "Europe/Budapest",
    "Europe/Copenhagen",
    "Europe/Ljubljana",
    "Europe/Berlin",
    "Europe/Prague",
    "Europe/Rome",
    "Europe/San_Marino",
    "Europe/Vaduz",
    "Europe/Zurich",
    "Europe/Stockholm",
    "Europe/Vienna",
    "Europe/Warsaw",
    "Europe/Zagreb",
];

function changeTimeZone(date, timeZone) {
    if (typeof date === 'string') {
        return new Date(
            new Date(date).toLocaleString('en-US', {
                timeZone,
            }),
        );
    }
    return new Date(
        date.toLocaleString('en-US', {
            timeZone,
        }),
    );
}

let currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
document.querySelector("#timezoneNow").textContent = currentTimezone;
document.querySelector("#timezoneNow").textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
document.querySelector("h1").innerHTML = changeTimeZone(new Date(), currentTimezone).toLocaleTimeString();

document.querySelector("#availableTimezones").innerHTML = "There are <strong>"+timezones.length+"</strong> timezones available";

(() => {
    const zones = [...new Set([...timezones].map(e => e.split("/")[0]))];
    zones.forEach(zone => {
        const allTimes = [...timezones].filter(e => e.startsWith(zone));
        document.querySelector(".content").insertAdjacentHTML("beforeend", `
            <div id="${zone}" class="timezones-list"> 
                <small>${zone}</small>
                <div class="list"></div>
            </div>
        `); 
        allTimes.forEach(time => {
            const item = document.createElement("div");
            item.classList = "clickable timezone";
            item.textContent = time;
            if (time === currentTimezone) {
                item.classList.add("card2");
            }
            item.addEventListener("click", () => {
                currentTimezone = time;
                document.querySelector("#modal").style.display = "none";
                if (document.querySelector(".card2")) {
                    document.querySelector(".card2").classList.remove("card2");
                }
                item.classList.add("card2");
                document.querySelector("#timezoneNow").textContent = currentTimezone;
                document.querySelector("h1").innerHTML = changeTimeZone(new Date(), currentTimezone).toLocaleTimeString();
            })
            document.querySelector(`#${zone} > .list`).insertAdjacentElement("beforeend", item);
        });
    });
})();

document.querySelector("#changeTimezone").addEventListener("click", () => {
    document.querySelector("#modal").style.display = "block";
});

setInterval(() => {
    document.querySelector("#timezoneNow").textContent = currentTimezone;
    document.querySelector("h1").innerHTML = changeTimeZone(new Date(), currentTimezone).toLocaleTimeString();
}, 1000);