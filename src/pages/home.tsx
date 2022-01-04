import React from 'react';
import { useTranslation } from "react-i18next";

export default function HomePage() {
    const { t, i18n } = useTranslation();

    return (
        <div className="HomePage">
            <h1>
                NEAR Crowd homepage ({t('hi')})
            </h1>

            <button onClick={() => i18n.changeLanguage("ru")}>ru</button>
            <button onClick={() => i18n.changeLanguage("en")}>en</button>
        </div>
    );
}
