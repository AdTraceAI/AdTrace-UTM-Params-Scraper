import Head from "next/head";
import { useState } from "react";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [url, setUrl] = useState("");
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedUrl = new URL(url);
    const params = new URLSearchParams(parsedUrl.search);
    const utmData: Record<string, string> = {};

    for (const [key, value] of Array.from(params.entries())) {
      if (key.startsWith("utm_")) {
        utmData[key] = value;
      }
    }

    setUtmParams(utmData);
  };

  return (
    <>
      <Head>
        <title>UTM Scraper Tool</title>
        <meta name="description" content="Free UTM Scraper Tool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>UTM Scraper Tool</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL with UTM parameters"
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Scrape UTM Parameters
          </button>
        </form>
        {Object.keys(utmParams).length > 0 && (
          <div className={styles.results}>
            <h2>UTM Parameters:</h2>
            <ul>
              {Object.entries(utmParams).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </>
  );
}
