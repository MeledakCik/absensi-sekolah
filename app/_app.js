import '@fortawesome/fontawesome-free/css/all.min.css';
import 'tailwindcss/tailwind.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                    integrity="sha384-DyZ88mC6Up2uqS1NJt6GVmzVVJHgGu3iFkz5j1ZC1t5i8tjFk7U7Bz0QldCBKTze"
                    crossOrigin="anonymous"
                />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
