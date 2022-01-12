import PageLayout from '../layouts/PageLayout';
import { useTranslation } from 'react-i18next';

function DocsPage() {
    const { t } = useTranslation();

    return (
        <PageLayout>
            <div>
                <p>{t('docs.welcome-message')}</p>

                <h1 className="text-5xl font-bold">{t('docs.how-it-works')}</h1>

                <section>
                    <h2 className="text-3xl font-medium">
                        {t('docs.basics.title')}
                    </h2>
                    <p>{t('docs.basics.description')}</p>
                </section>

                <section>
                    <h2 className="text-3xl font-medium">
                        {t('docs.challenges.title')}
                    </h2>
                    <p>{t('docs.challenges.description')}</p>
                </section>

                <section>
                    <h2 className="text-3xl font-medium">
                        {t('docs.honeypots.title')}
                    </h2>
                    <p>{t('docs.honeypots.description')}</p>
                </section>

                <section>
                    <h2 className="text-3xl font-medium">
                        {t('docs.withdrawing.title')}
                    </h2>
                    <p>{t('docs.withdrawing.description')}</p>
                </section>

                <section>
                    <h2 className="text-3xl font-medium">
                        {t('docs.afterword.title')}
                    </h2>
                    <p>{t('docs.afterword.description')}</p>
                </section>
            </div>
        </PageLayout>
    );
}

export default DocsPage;
