import React from 'react';
import { useTranslation } from "react-i18next";

function App() {
    const { t, i18n } = useTranslation()

    return (
        <div className="App">
            <h1 className="text-3xl font-bold">
                NEAR Crowd: {t('hi')}
            </h1>

            <button onClick={() => i18n.changeLanguage("ru")}>ru</button>
            <button onClick={() => i18n.changeLanguage("en")}>en</button>
        </div>
    );
}

export default App;
