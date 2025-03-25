
import { useEffect, useState } from "react";

interface TickerProps {
    symbol : string;
}

const Ticker = ({symbol} : TickerProps) => {
    const [price, setPrice] = useState<number | null>(null);

    useEffect(() => {
        const eventSource = new EventSource(`/api/wsHandler?symbol=${symbol}`);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setPrice(data.price);
        };
        eventSource.onerror = (event) => {
            console.error("Err with SSE con" + event);
        }

        return () => {
            eventSource.close();
        };
    }, [symbol]);

    return (
        <div className="font-bold rounded">
            <h2>{symbol}</h2>
            <p>{price ? `${price.toFixed(2)}` : 'price unavail.'}</p>
        </div>
    )
}

export default Ticker;