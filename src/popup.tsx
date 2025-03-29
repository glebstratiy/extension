import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";


type Status = "testing" | "done";
const App = () => {
    const [counts, setCounts] = useState<Record<Status, number> | null>(null);
    useEffect(() => {
        chrome.storage.local.get("statusCounts", (data) => {
            if (data.statusCounts) {
                setCounts(data.statusCounts);
            }
        });
    }, []);
    return (
        <div>
            <h1>Информация по тикетам</h1>
            {counts ? (
                <ul>
                    <li>🟧 testing: {counts.testing}</li>
                    <li>🟥 done: {counts.done}</li>
                </ul>
            ) : (
                <p>Данные не загружены</p>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
