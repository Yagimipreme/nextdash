import { useEffect, useState } from "react";

//The reuseable component, taking the fetched article data as props
interface NewsProps {
    title: string | null;
    //description: string;
    link: string | null;
    //content: string;
}

const News = ( { }: NewsProps) => {
    const [title, setTitle] = useState<string | null>(null)
    const [link, setLink] = useState<string | null>(null)

    useEffect(() => {
        const eventSource = new EventSource(`/api/scraper`);

        eventSource.onmessage = (event) => {
            console.log(event.data)
            const data = JSON.parse(event.data)
            setTitle(data.title)
            setLink(data.link)
        }

        eventSource.onerror = (event) => {
            console.error(event)
        }
        return () => {
            eventSource.close();
        };
    }, []);
    return(
        <div>
            <h1>{title}</h1>
            <p>{link}</p>
        </div>
    );
} 

export default News;
