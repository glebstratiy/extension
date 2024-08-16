    // Функция для получения статуса юзер стори
    function checkUserStoryStatus(userStoryId, ticketElement) {
        const url = `https://tp.traderevolution.com/api/v1/userStories.asmx/${userStoryId}?skip=0&take=999&include=[entityState[name]]`;

        fetch(url, {
            headers: {
                "accept": "application/x-array, */*; q=0.01",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-app-version": "3.6.6.16544",
                "x-page-id": `userstory/${userStoryId}`,
                "x-requested-with": "XMLHttpRequest",
                "x-user-id": "429"
            },
            referrer: "https://tp.traderevolution.com/restui/board.aspx?acid=010755f9554f17f1913c59a290594125",
            referrerPolicy: "strict-origin-when-cross-origin",
            method: "GET",
            mode: "cors",
            credentials: "include"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const entityStateName = data[0][0]; // Достаем статус из ответа
            if (entityStateName.toLowerCase() === "testing") {
                ticketElement.style.border = "2px solid red"; // Красим тикет в красный, если статус "testing"
            }
        })
        .catch(error => {
            console.error("Error fetching user story status:", error);
        });
    }

    // Поиск и обработка всех юзер стори на странице
    function processUserStories() {
        const tickets = document.querySelectorAll('div[role="card"]');

        tickets.forEach(ticket => {
            const userStoryElement = ticket.querySelector('a.tau-board-unit-link.tau-id.tau-board-unit__value');
            const userStoryId = userStoryElement ? userStoryElement.getAttribute('data-entity-id') : null;

            if (userStoryId) {
                checkUserStoryStatus(userStoryId, ticket);
            }
        });
    }

    // Запуск процесса обработки юзер стори с задержкой в 5 секунд
    setTimeout(processUserStories, 10000``);
